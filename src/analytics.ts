import posthog from "posthog-js";

export type AnalyticsConsent = "granted" | "denied";

const CONSENT_STORAGE_KEY = "just-bread-analytics-consent";
const projectApiKey = import.meta.env.VITE_POSTHOG_KEY;
const apiHost = import.meta.env.VITE_POSTHOG_HOST ?? "https://eu.i.posthog.com";

let isInitialized = false;

export function getAnalyticsConsent(): AnalyticsConsent | null {
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  return value === "granted" || value === "denied" ? value : null;
}

export function setAnalyticsConsent(consent: AnalyticsConsent) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, consent);

  if (consent === "granted") {
    if (isInitialized) {
      posthog.opt_in_capturing();
    }
    initializeAnalytics();
    capturePageView(window.location.hash.slice(1) || "/");
    return;
  }

  if (isInitialized) {
    posthog.opt_out_capturing();
  }
}

export function initializeAnalytics() {
  if (isInitialized || !projectApiKey || getAnalyticsConsent() !== "granted") {
    return;
  }

  posthog.init(projectApiKey, {
    api_host: apiHost,
    defaults: "2026-05-30",
    capture_pageview: false,
    capture_pageleave: true,
  });
  isInitialized = true;
}

export function capturePageView(path: string) {
  if (!isInitialized) {
    return;
  }

  posthog.capture("$pageview", {
    $current_url: window.location.href,
    path,
  });
}

export function captureEvent(eventName: string, properties?: Record<string, string>) {
  if (!isInitialized) {
    return;
  }

  posthog.capture(eventName, properties);
}