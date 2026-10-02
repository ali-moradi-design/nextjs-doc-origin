"use client";

import { useState } from "react";
import { COLLECT_URL, type AnalyticsEvent } from "../_lib/events";

export function ServerEvents() {
  const [events, setEvents] = useState<AnalyticsEvent[] | null>(null);

  async function load() {
    const response = await fetch(COLLECT_URL);
    setEvents(await response.json());
  }

  return (
    <div className="space-y-3">
      <button
        onClick={load}
        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
      >
        Load events from the server
      </button>
      {events && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          The server received {events.length} events (last 50 kept):{" "}
          {events
            .slice(-10)
            .map((event) => event.label)
            .join(", ")}
        </p>
      )}
    </div>
  );
}
