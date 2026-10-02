// Shared by src/instrumentation-client.ts and the client components.
// The events live on window (not in module state) so every bundle that
// imports this file sees the same list.

export const COLLECT_URL = "/examples/analytics/api/collect";
const CHANGE_EVENT = "analytics:change";

export type AnalyticsEvent = {
  type: "init" | "navigation" | "web-vital" | "error";
  label: string;
  detail: string;
  time: number;
};

declare global {
  interface Window {
    __analyticsEvents?: AnalyticsEvent[];
  }
}

const EMPTY: AnalyticsEvent[] = [];

export function getEvents() {
  return typeof window === "undefined"
    ? EMPTY
    : (window.__analyticsEvents ?? EMPTY);
}

export function getServerEvents() {
  return EMPTY;
}

export function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  return () => window.removeEventListener(CHANGE_EVENT, callback);
}

export function track(event: Omit<AnalyticsEvent, "time">) {
  const full = { ...event, time: Math.round(performance.now()) };
  // A new array each time, so useSyncExternalStore sees a change.
  window.__analyticsEvents = [...getEvents(), full];
  window.dispatchEvent(new Event(CHANGE_EVENT));
  send(full);
}

// sendBeacon keeps working while the page unloads; fetch with keepalive
// is the fallback.
function send(event: AnalyticsEvent) {
  const body = JSON.stringify(event);
  if (navigator.sendBeacon) {
    navigator.sendBeacon(COLLECT_URL, body);
  } else {
    fetch(COLLECT_URL, { body, method: "POST", keepalive: true });
  }
}
