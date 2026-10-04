"use client";

import { gtag } from "../_lib/gtag";

export function SignUpButton() {
  return (
    <button
      // sign_up is one of GA4's recommended event names.
      onClick={() => gtag("event", "sign_up", { method: "demo-button" })}
      className="rounded-lg border border-zinc-200 px-3 py-1.5 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
    >
      Sign up (custom event)
    </button>
  );
}
