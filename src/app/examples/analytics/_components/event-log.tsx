"use client";

import { useSyncExternalStore } from "react";
import { getEvents, getServerEvents, subscribe } from "../_lib/events";

const typeColors = {
  init: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  navigation: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300",
  "web-vital":
    "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300",
  error: "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300",
};

export function EventLog() {
  const events = useSyncExternalStore(subscribe, getEvents, getServerEvents);

  if (events.length === 0) {
    return <p className="text-sm text-zinc-500">No events yet.</p>;
  }

  return (
    <ul className="space-y-1 font-mono text-xs">
      {events.map((event, index) => (
        <li key={index} className="flex flex-wrap items-center gap-2">
          <span className="w-16 text-zinc-500">{event.time} ms</span>
          <span className={`rounded px-1.5 py-0.5 ${typeColors[event.type]}`}>
            {event.type}
          </span>
          <span className="font-semibold">{event.label}</span>
          <span className="text-zinc-600 dark:text-zinc-400">
            {event.detail}
          </span>
        </li>
      ))}
    </ul>
  );
}
