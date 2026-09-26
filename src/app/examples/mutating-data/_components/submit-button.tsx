"use client";

import { useFormStatus } from "react-dom";

// useFormStatus reads the status of the <form> this button is inside, so
// the page itself can stay a Server Component.
export default function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50 dark:bg-white dark:text-zinc-900"
    >
      {pending ? "Saving…" : "Save and go back"}
    </button>
  );
}
