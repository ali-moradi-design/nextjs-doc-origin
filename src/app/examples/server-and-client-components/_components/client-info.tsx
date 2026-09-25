"use client";

import { useState, useSyncExternalStore } from "react";
import Boundary from "./boundary";

function subscribe(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

export default function ClientInfo() {
  // On a direct visit this logs twice: once in the terminal (server render
  // to HTML) and once in the browser console (hydration).
  console.log(
    `[client] <ClientInfo /> rendered ${
      typeof window === "undefined" ? "on the server" : "in the browser"
    }`,
  );

  const [clicks, setClicks] = useState(0);

  // The server has no window, so the server snapshot is null. After
  // hydration React switches to the real browser value.
  const width = useSyncExternalStore(
    subscribe,
    () => window.innerWidth,
    () => null,
  );

  return (
    <Boundary kind="client" name="ClientInfo">
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        <dt className="text-zinc-500">Window width</dt>
        <dd className="font-mono">
          {width === null ? "unknown on the server" : `${width}px`}
        </dd>
        <dt className="text-zinc-500">State</dt>
        <dd>
          <button
            type="button"
            onClick={() => setClicks((c) => c + 1)}
            className="rounded-full border border-zinc-300 px-3 py-0.5 font-mono tabular-nums transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            clicks: {clicks}
          </button>
        </dd>
      </dl>
    </Boundary>
  );
}
