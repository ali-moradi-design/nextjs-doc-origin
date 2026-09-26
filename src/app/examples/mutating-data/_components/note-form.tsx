"use client";

import { useActionState } from "react";
import { addNote, type NoteFormState } from "../_lib/actions";

const initialState: NoteFormState = {};

export default function NoteForm() {
  // state: whatever addNote returned last time (error or message)
  // formAction: a wrapped version of addNote to pass to <form action>
  // pending: true while the Server Action is running
  const [state, formAction, pending] = useActionState(addNote, initialState);

  return (
    <form action={formAction} className="space-y-2">
      <div className="flex gap-2">
        <input
          name="text"
          placeholder="Write a note…"
          aria-label="Note"
          aria-invalid={state.error ? true : undefined}
          className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50 dark:bg-white dark:text-zinc-900"
        >
          {pending ? "Adding…" : "Add"}
        </button>
      </div>
      <p aria-live="polite" className="min-h-5 text-sm">
        {state.error && <span className="text-red-600 dark:text-red-400">{state.error}</span>}
        {state.message && !state.error && (
          <span className="text-emerald-600 dark:text-emerald-400">{state.message}</span>
        )}
      </p>
    </form>
  );
}
