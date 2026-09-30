"use client";

import { useState } from "react";

// Reads process.env in the browser on click (not during render: on the
// server APP_ENV_NAME exists, so rendering it would not match hydration).
export function BrowserEnv() {
  const [rows, setRows] = useState<[string, string][] | null>(null);

  function read() {
    setRows([
      ["NEXT_PUBLIC_BUILD_LABEL", String(process.env.NEXT_PUBLIC_BUILD_LABEL)],
      ["APP_ENV_NAME", String(process.env.APP_ENV_NAME)],
    ]);
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={read}
        className="rounded-lg bg-zinc-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        Read in the browser
      </button>
      {rows && (
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm">
          {rows.map(([name, value]) => (
            <div key={name} className="contents">
              <dt className="text-zinc-500">{name}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}
