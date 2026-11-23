import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const measurementId = "G-TEST123456";

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv("VITE_GA_MEASUREMENT_ID", measurementId);
  vi.stubEnv("VITE_POSTHOG_KEY", "");
  window.localStorage.clear();
  delete window.dataLayer;
  delete window.gtag;
  delete window[`ga-disable-${measurementId}`];
});

afterEach(() => {
  document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]').forEach((script) => script.remove());
  vi.unstubAllEnvs();
});

describe("Google Analytics consent", () => {
  it("queues Google-compatible commands only after consent", async () => {
    const analytics = await import("./analytics");

    analytics.initializeAnalytics();
    expect(window.dataLayer).toBeUndefined();
    expect(document.querySelector('script[src*="googletagmanager.com/gtag/js"]')).toBeNull();

    analytics.setAnalyticsConsent("granted");

    const commands = window.dataLayer ?? [];
    expect(commands).toHaveLength(3);
    expect(commands.every((command) => Object.prototype.toString.call(command) === "[object Arguments]")).toBe(true);
    expect(commands.map((command) => Array.from(command as IArguments))).toEqual([
      ["js", expect.any(Date)],
      ["config", measurementId, { send_page_view: false }],
      ["event", "page_view", expect.objectContaining({ page_path: "/" })],
    ]);
    expect(document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')).toHaveLength(1);
  });

  it("re-enables Google Analytics when consent is granted again", async () => {
    const analytics = await import("./analytics");

    analytics.setAnalyticsConsent("granted");
    analytics.setAnalyticsConsent("denied");
    expect(window[`ga-disable-${measurementId}`]).toBe(true);

    analytics.setAnalyticsConsent("granted");
    expect(window[`ga-disable-${measurementId}`]).toBe(false);
    expect(document.querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')).toHaveLength(1);
  });
});
