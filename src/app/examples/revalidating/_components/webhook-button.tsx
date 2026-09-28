"use client";

import { useState, useTransition } from "react";

// Plays the part of the CMS: it calls the webhook Route Handler.
export function WebhookButton() {
  const [result, setResult] = useState("");
  const [pending, startTransition] = useTransition();

  function callWebhook() {
    startTransition(async () => {
      const response = await fetch(
        "/examples/revalidating/webhook?tag=headline",
        { method: "POST" },
      );
      setResult(JSON.stringify(await response.json()));
    });
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={callWebhook}
        disabled={pending}
        className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-opacity disabled:opacity-50 dark:border-zinc-700"
      >
        {pending ? "Calling…" : "CMS calls the webhook"}
      </button>
      {result && <p className="font-mono text-xs text-zinc-500">{result}</p>}
    </div>
  );
}
