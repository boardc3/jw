/**
 * First-party event tracking.
 * - Client: window.jwTrack(event, props) → forwards to Vercel Analytics `track()` if installed,
 *   GA4 `gtag` if present, and always to /api/track for first-party logging.
 * - Server: /go/<slug> logs outbound clicks before redirecting.
 */
export type TrackEvent =
  | "outbound_click"
  | "cta_click"
  | "newsletter_subscribe"
  | "checkout_start"
  | "quiz_start"
  | "quiz_complete"
  | "code_copied"
  | "contact_submit";

export interface TrackPayload {
  event: TrackEvent;
  slug?: string;
  source?: string;
  tier?: string;
  value?: number;
  path?: string;
  meta?: Record<string, string | number | boolean>;
}

export function trackClient(payload: TrackPayload) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    va?: (type: string, name: string, props?: Record<string, unknown>) => void;
    gtag?: (...args: unknown[]) => void;
  };
  const props = { ...payload, path: payload.path ?? window.location.pathname };
  try {
    w.va?.("event", payload.event, props);
    w.gtag?.("event", payload.event, props);
    const body = JSON.stringify(props);
    if (navigator.sendBeacon) navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
    else fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "content-type": "application/json" } });
  } catch {
    /* tracking must never break the UI */
  }
}

/** Server-side: forward to an optional webhook (Zapier/Make/Slack/Sheets) and log. */
export async function trackServer(payload: TrackPayload & { ip?: string; ua?: string; referer?: string }) {
  const webhook = process.env.CLICK_WEBHOOK_URL;
  const record = { ...payload, ts: new Date().toISOString() };
  if (webhook) {
    try {
      await fetch(webhook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(record) });
    } catch {
      /* ignore */
    }
  }
  if (process.env.NODE_ENV !== "production") console.info("[track]", record);
}

/** Append UTM parameters to an outbound URL so partners' dashboards attribute correctly too. */
export function withUtm(url: string, source: string, medium = "website", campaign?: string) {
  try {
    const u = new URL(url);
    // Don't clobber affiliate params; only add utm_* if absent.
    if (!u.searchParams.has("utm_source")) u.searchParams.set("utm_source", "juliawarter.com");
    if (!u.searchParams.has("utm_medium")) u.searchParams.set("utm_medium", medium);
    if (!u.searchParams.has("utm_content")) u.searchParams.set("utm_content", source);
    if (campaign && !u.searchParams.has("utm_campaign")) u.searchParams.set("utm_campaign", campaign);
    return u.toString();
  } catch {
    return url;
  }
}
