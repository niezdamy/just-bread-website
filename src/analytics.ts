import posthog from "posthog-js";

export type AnalyticsConsent = "granted" | "denied";

const CONSENT_STORAGE_KEY = "just-bread-analytics-consent";
const projectApiKey = import.meta.env.VITE_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_POSTHOG_HOST ?? "https://eu.i.posthog.com";
const googleAnalyticsMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

let isInitialized = false;
let isGoogleAnalyticsInitialized = false;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...arguments_: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export function getAnalyticsConsent(): AnalyticsConsent | null {
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  return value === "granted" || value === "denied" ? value : null;
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);
  window.dispatchEvent(new CustomEvent("analytics-consent-changed", { detail: consent }));

  if (consent === "granted") {
    initializeAnalytics();
    if (isInitialized) {
      posthog.opt_in_capturing();
    }
    capturePageView(window.location.hash.slice(1) || "/");
    return;
  }

  if (isInitialized) {
    posthog.opt_out_capturing();
  }

  if (googleAnalyticsMeasurementId) {
    window[`ga-disable-${googleAnalyticsMeasurementId}`] = true;
  }
}

export function initializeAnalytics() {
  if (getAnalyticsConsent() !== "granted") {
    return;
  }

  if (!isInitialized && projectApiKey) {
    posthog.init(projectApiKey, {
      api_host: apiHost,
      defaults: "2026-05-30",
      capture_pageview: false,
      capture_pageleave: true,
    });
    isInitialized = true;
  }

  initializeGoogleAnalytics();
}

function initializeGoogleAnalytics() {
  if (isGoogleAnalyticsInitialized || !googleAnalyticsMeasurementId) {
    return;
  }

  window.dataLayer ??= [];
  window.gtag ??= (...arguments_: unknown[]) => {
    window.dataLayer?.push(arguments_);
  };
  window[`ga-disable-${googleAnalyticsMeasurementId}`] = false;
  window.gtag("js", new Date());
  window.gtag("config", googleAnalyticsMeasurementId, { send_page_view: false });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsMeasurementId)}`;
  document.head.append(script);
  isGoogleAnalyticsInitialized = true;
}

export function capturePageView(path: string) {
  if (isInitialized) {
    posthog.capture("$pageview", {
      $current_url: window.location.href,
      path,
    });
  }

  if (isGoogleAnalyticsInitialized && googleAnalyticsMeasurementId) {
    window.gtag?.("event", "page_view", {
      page_location: window.location.href,
      page_path: path,
    });
  }
}

export function captureEvent(eventName: string, properties?: Record<string, string>) {
  if (isInitialized) {
    posthog.capture(eventName, properties);
  }

  if (isGoogleAnalyticsInitialized && googleAnalyticsMeasurementId) {
    window.gtag?.("event", eventName, properties);
  }
}