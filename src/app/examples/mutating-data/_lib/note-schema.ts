// Shared by the browser (react-hook-form) and the server (the action).
// No "use client" / "use server": both sides can import it, so the rules
// are written once and can never drift apart.
import { z } from "zod";

export const noteSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required.")
    .max(40, "Title must be 40 characters or less."),
  content: z.string().trim().max(120, "Details must be 120 characters or less."),
});

export type NoteInput = z.infer<typeof noteSchema>;

export type NoteResult =
  | { ok: true }
  | { ok: false; errors: Partial<Record<keyof NoteInput, string[]>> };
