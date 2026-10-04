"use client";

import { useState } from "react";
import { COLLECT_URL, type AnalyticsEvent } from "../_lib/events";

type Result =
  | { status: "ok"; events: AnalyticsEvent[] }
  | { status: "error"; message: string };

export function ServerEvents() {
  const [result, setResult] = useState<Result | null>(null);

  async function load() {
    try {
      const response = await fetch(COLLECT_URL);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setResult({ status: "ok", events: await response.json() });
    } catch (error) {
      // A blocked request (ad blocker) rejects with a TypeError, like a
      // network error; the response never reaches the page.
      setResult({
        status: "error",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return (
    <div className="space-y-3">
      <button
        onClick={load}
        className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
      >
        Load events from the server
      </button>
      {result?.status === "ok" && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          The server received {result.events.length} events (last 50 kept):{" "}
          {result.events
            .slice(-10)
            .map((event) => event.label)
            .join(", ")}
        </p>
      )}
      {result?.status === "error" && (
        <p className="text-sm text-red-700 dark:text-red-400">
          Request failed ({result.message}). An ad blocker or a network error
          stopped it: check DevTools &gt; Network.
        </p>
      )}
    </div>
  );
}
