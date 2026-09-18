export const analyticsEvents = {
  pageView: "page_view",
  languageChange: "language_change",
  serviceSelect: "service_select",
  caseSelect: "case_select",
  clientSelect: "client_select",
  scheduleOpen: "schedule_open",
  scheduleBooked: "schedule_booked",
  whatsappClick: "whatsapp_click",
  sceneError: "scene_error",
  consentUpdate: "consent_update",
} as const;

export type AnalyticsEvent = (typeof analyticsEvents)[keyof typeof analyticsEvents];
export type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_ID ?? "";

let analyticsEnabled = false;

export function setAnalyticsEnabled(enabled: boolean) {
  analyticsEnabled = enabled;
  if (typeof window === "undefined" || !gaMeasurementId) return;
  (window as unknown as Record<string, boolean>)[`ga-disable-${gaMeasurementId}`] = !enabled;
}

export function trackEvent(event: string, params: AnalyticsParams = {}) {
  if (!analyticsEnabled || typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
