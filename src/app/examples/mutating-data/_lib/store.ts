// A fake in-memory database. Real apps would use a database or an API.
// Data lives in server memory, so it resets when the server restarts.
import "server-only";

export type Note = { id: string; text: string; createdAt: string };

type Store = { notes: Note[]; likes: number; views: number };

// Kept on globalThis so it survives hot reloads during `pnpm dev`.
const globalStore = globalThis as typeof globalThis & { mutatingStore?: Store };

const store = (globalStore.mutatingStore ??= {
  notes: [
    { id: "1", text: "Server Actions run on the server", createdAt: "09:00" },
    { id: "2", text: "Forms work even before JavaScript loads", createdAt: "09:05" },
  ],
  likes: 0,
  views: 0,
});

// Slow down every write a little so pending states are visible.
export function sleep(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getNotes() {
  return store.notes;
}

export function addNote(text: string) {
  store.notes.push({
    id: crypto.randomUUID(),
    text,
    createdAt: new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });
}

export function removeNote(id: string) {
  store.notes = store.notes.filter((note) => note.id !== id);
}

export function clearNotes() {
  store.notes = [];
}

export function getLikes() {
  return store.likes;
}

export function incrementLikes() {
  return ++store.likes;
}

export function getViews() {
  return store.views;
}

export function incrementViews() {
  return ++store.views;
}

// Anyone can call a Server Action with a hand-made POST request, so never
// trust the input. Returns the cleaned text, or an error message.
export function parseNoteText(value: FormDataEntryValue | null) {
  const text = typeof value === "string" ? value.trim() : "";
  if (text.length === 0) return { error: "Write something first." };
  if (text.length > 80) return { error: "Keep it under 80 characters." };
  return { text };
}
