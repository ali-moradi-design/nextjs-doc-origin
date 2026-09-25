"use client";

import { useState } from "react";

// Lives in the shared layout. Its state survives <Link> navigations
// (client-side transition) but resets on <a> navigations (full page load).
export default function VisitCounter() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setCount((c) => c + 1)}
      className="rounded-full border border-zinc-300 px-3 py-1.5 text-sm tabular-nums text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      Layout state: <span className="font-semibold">{count}</span> (click me)
    </button>
  );
}
