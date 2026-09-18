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

export function setAnalyticsEnabled(_enabled: boolean) {}

export function trackEvent(_event: string, _params: AnalyticsParams = {}) {}
