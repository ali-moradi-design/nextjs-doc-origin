// "use server" at the top of the file: every export is a Server Function.
// Client Components can import these; the code itself never ships to the
// browser. Only async functions may be exported from this file.
"use server";

import { refresh, revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as db from "./store";

// ⚠️ A real app must check authentication and authorization at the top of
// every Server Function: they can be called with a direct POST request, not
// only from your UI. This demo has no users, so it only validates input.

export type NoteFormState = { error?: string; message?: string };

// Used with useActionState: receives the previous state first, then the
// FormData, and returns the next state (shown by the form).
export async function addNote(
  _prevState: NoteFormState,
  formData: FormData,
): Promise<NoteFormState> {
  await db.sleep();

  const result = db.parseNoteText(formData.get("text"));
  if (result.error !== undefined) return { error: result.error };

  db.addNote(result.text);
  // Re-render the current page on the server so the list shows the new note.
  refresh();
  return { message: `Added "${result.text}"` };
}

export async function deleteNote(formData: FormData) {
  await db.sleep(400);
  const id = formData.get("id");
  if (typeof id !== "string") return;

  db.removeNote(id);
  refresh();
}

// Called from an onClick handler; the return value goes back to the client.
export async function incrementLike() {
  await db.sleep(300);
  return db.incrementLikes();
}

// Called from useEffect when the component mounts.
export async function incrementViews() {
  return db.incrementViews();
}

export async function saveName(formData: FormData) {
  const name = formData.get("name");
  const cookieStore = await cookies();

  if (typeof name === "string" && name.trim()) {
    cookieStore.set("demo-name", name.trim().slice(0, 30));
  } else {
    cookieStore.delete("demo-name");
  }
  // No refresh() needed: setting a cookie re-renders the page automatically.
}

export async function createNoteAndRedirect(formData: FormData) {
  await db.sleep();

  const result = db.parseNoteText(formData.get("text"));
  if (result.error !== undefined) {
    redirect(`/examples/mutating-data/new?error=${encodeURIComponent(result.error)}`);
  }

  db.addNote(result.text);
  // Mark the list page as stale first, then leave. redirect() throws, so
  // any code after it would never run.
  revalidatePath("/examples/mutating-data");
  redirect("/examples/mutating-data");
}
