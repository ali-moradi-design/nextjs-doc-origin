"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { createNoteFromHookForm } from "../_lib/actions";
import { noteSchema, type NoteInput, type NoteResult } from "../_lib/note-schema";

const fieldClass =
  "w-full rounded-lg border bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500";

export default function HookForm() {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    // Same schema as the server: instant errors in the browser.
    resolver: zodResolver(noteSchema),
    // Validate a field when it loses focus, then on every change.
    mode: "onTouched",
    defaultValues: { title: "", content: "" },
  });
  const [success, setSuccess] = useState("");

  // Show the server's field errors under the right inputs.
  function showServerErrors(result: NoteResult) {
    if (result.ok) return;
    for (const [field, messages] of Object.entries(result.errors)) {
      setError(field as keyof NoteInput, { message: messages?.[0] });
    }
  }

  async function onSubmit(data: NoteInput) {
    setSuccess("");
    try {
      // isSubmitting stays true until this await finishes.
      const result = await createNoteFromHookForm(data);
      if (!result.ok) return showServerErrors(result);
      setSuccess(`Saved "${data.title}"`);
      reset(); // Only on success: on errors the user keeps their text.
    } catch {
      setError("root", { message: "Something went wrong. Try again." });
    }
  }

  // Pretend to be an attacker who skips the form and posts bad data.
  async function sendInvalidData() {
    setSuccess("");
    const result = await createNoteFromHookForm({ title: "", content: "x".repeat(200) });
    showServerErrors(result);
  }

  // useWatch (not watch()) re-renders only when this field changes, and is
  // safe with the React Compiler.
  const contentLength = useWatch({ control, name: "content" })?.length ?? 0;

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="hf-title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="hf-title"
          {...register("title")}
          aria-invalid={errors.title ? true : undefined}
          className={`${fieldClass} ${errors.title ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"}`}
        />
        {errors.title && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <label htmlFor="hf-content" className="text-sm font-medium">
            Details <span className="font-normal text-zinc-500">(optional)</span>
          </label>
          <span
            className={`font-mono text-xs ${contentLength > 120 ? "text-red-600 dark:text-red-400" : "text-zinc-500"}`}
          >
            {contentLength}/120
          </span>
        </div>
        <textarea
          id="hf-content"
          rows={2}
          {...register("content")}
          aria-invalid={errors.content ? true : undefined}
          className={`${fieldClass} ${errors.content ? "border-red-500" : "border-zinc-300 dark:border-zinc-700"}`}
        />
        {errors.content && (
          <p className="text-sm text-red-600 dark:text-red-400">{errors.content.message}</p>
        )}
      </div>

      {errors.root && (
        <p className="text-sm text-red-600 dark:text-red-400">{errors.root.message}</p>
      )}
      <p aria-live="polite" className="min-h-5 text-sm text-emerald-600 dark:text-emerald-400">
        {success}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity disabled:opacity-50 dark:bg-white dark:text-zinc-900"
        >
          {isSubmitting ? "Saving…" : "Save note"}
        </button>
        <button
          type="button"
          onClick={sendInvalidData}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          Send invalid data (skip browser checks)
        </button>
      </div>
    </form>
  );
}
