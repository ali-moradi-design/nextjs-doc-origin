import "server-only";
import type { AnalyticsEvent } from "./events";

// A fake analytics database: an in-memory list, reset on server restart.
const received: AnalyticsEvent[] = [];
const MAX_EVENTS = 50;

export function saveEvent(event: AnalyticsEvent) {
  received.push(event);
  if (received.length > MAX_EVENTS) received.shift();
}

export function listEvents() {
  return received;
}
