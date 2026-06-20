export type AnalyticsEvent =
  | "nav_click"
  | "hero_cta_click"
  | "newsletter_view"
  | "newsletter_submit"
  | "newsletter_success"
  | "newsletter_error"
  | "content_card_click"
  | "outbound_click";

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string | number | boolean>) => void };
  }
}

export function track(event: AnalyticsEvent, data?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  window.umami?.track(event, data);
}
