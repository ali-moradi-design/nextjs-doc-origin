"use client";

import { useState, useTransition } from "react";

// Calls the Route Handler with fetch. This doesn't touch the router cache,
// so the pages you already visited are not refreshed.
export function BumpButton() {
  const [value, setValue] = useState<number | null>(null);
  const [pending, startTransition] = useTransition();

  function bump() {
    startTransition(async () => {
      const response = await fetch("/examples/revalidating/stale/bump", {
        method: "POST",
      });
      const data: { value: number } = await response.json();
      setValue(data.value);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={bump}
        disabled={pending}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50 dark:bg-white dark:text-zinc-900"
      >
        {pending ? "Changing…" : "Change the counter on the server"}
      </button>
      {value !== null && (
        <p className="text-sm">
          The server now has <span className="font-mono">{value}</span>
        </p>
      )}
    </div>
  );
}
