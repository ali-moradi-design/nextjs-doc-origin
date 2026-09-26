import Link from "next/link";
import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { connection } from "next/server";
import { Suspense } from "react";
import ClearButton from "./_components/clear-button";
import LikeButton from "./_components/like-button";
import NoteForm from "./_components/note-form";
import ViewCount from "./_components/view-count";
import { deleteNote, saveName } from "./_lib/actions";
import * as db from "./_lib/store";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="space-y-1">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

const inputClass =
  "min-w-0 flex-1 rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-zinc-500 dark:border-zinc-700";
const buttonClass =
  "rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800";

// ─── Request-time pieces ──────────────────────────────────────────────
// Cache Components: anything that reads a cookie or data that changes
// (our in-memory store) must run at request time, inside <Suspense>.
// Everything else on the page is prerendered into the static shell.

async function Greeting() {
  const name = (await cookies()).get("demo-name")?.value;
  return name ? <>Hi {name}! </> : null;
}

async function NotesSection({ clearAll }: { clearAll: () => Promise<void> }) {
  // The store can change at any time, so read it per request, not at build.
  await connection();
  const notes = db.getNotes();

  return (
    <Section
      title={`Notes (${notes.length})`}
      description="This list is rendered on the server. After each change, refresh() re-renders it with the new data."
    >
      <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
        {notes.map((note) => (
          <li key={note.id} className="flex items-center justify-between gap-4 py-2 text-sm">
            <span>
              {note.text}{" "}
              <span className="font-mono text-xs text-zinc-500">{note.createdAt}</span>
            </span>
            {/* formAction on a button: this button calls deleteNote
                instead of the form's own action. */}
            <form>
              <input type="hidden" name="id" value={note.id} />
              <button
                formAction={deleteNote}
                aria-label={`Delete "${note.text}"`}
                className="text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
              >
                ✕
              </button>
            </form>
          </li>
        ))}
        {notes.length === 0 && (
          <li className="py-2 text-sm text-zinc-500">No notes yet.</li>
        )}
      </ul>
      <div className="flex justify-end">
        <ClearButton clearAction={clearAll} />
      </div>
    </Section>
  );
}

async function Likes() {
  await connection();
  return <LikeButton initialLikes={db.getLikes()} />;
}

async function Views() {
  await connection();
  return <ViewCount initialViews={db.getViews()} />;
}

function NameFormView({ name }: { name?: string }) {
  return (
    <form action={saveName} className="flex gap-2">
      <input
        name="name"
        defaultValue={name}
        placeholder="Your name (empty to delete)"
        aria-label="Your name"
        className={inputClass}
      />
      <button type="submit" className={buttonClass}>
        Save
      </button>
    </form>
  );
}

async function NameForm() {
  const name = (await cookies()).get("demo-name")?.value;
  return <NameFormView name={name} />;
}

const loading = <p className="text-sm text-zinc-500">Loading…</p>;

// ─── The page: no await at the top, so it has a static shell ───────────

export default function Page() {
  // Server Actions defined inline, inside a Server Component.
  // "use server" as the first line of the function body.
  async function quickAdd(formData: FormData) {
    "use server";
    const result = db.parseNoteText(formData.get("text"));
    if (result.error !== undefined) return;
    db.addNote(result.text);
    refresh();
  }

  async function clearAll() {
    "use server";
    db.clearNotes();
    refresh();
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Mutating Data</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          <Suspense>
            <Greeting />
          </Suspense>
          Every button on this page calls a Server
          Action. Open DevTools → Network: each one is a POST request to this
          same URL.
        </p>
        <Link
          href="/examples/mutating-data/guide"
          className="inline-block text-sm font-medium text-fuchsia-600 hover:underline dark:text-fuchsia-400"
        >
          Read the pros and cons of Server Actions →
        </Link>
      </header>

      <Suspense
        fallback={
          <Section title="Notes" description="Loading notes…">
            <div className="h-16 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-900" />
          </Section>
        }
      >
        <NotesSection clearAll={clearAll} />
      </Suspense>

      <Section
        title="1. Form in a Server Component"
        description="No 'use client', no JavaScript needed: with JavaScript disabled the form still submits and saves (progressive enhancement). But the notes list streams in with <Suspense>, and showing streamed content needs JavaScript, so without it the list stays on its loading state."
      >
        <form action={quickAdd} className="flex gap-2">
          <input name="text" placeholder="Quick note…" aria-label="Quick note" className={inputClass} />
          <button type="submit" className={buttonClass}>
            Add
          </button>
        </form>
      </Section>

      <Section
        title="2. Form in a Client Component with useActionState"
        description="Same idea, plus a pending state and messages returned by the action. Submit it empty to see the validation error."
      >
        <NoteForm />
      </Section>

      <Section
        title="3. Event handler (onClick)"
        description="The button calls the action like a normal async function and uses its return value."
      >
        <Suspense fallback={loading}>
          <Likes />
        </Suspense>
      </Section>

      <Section
        title="4. useEffect"
        description="Called automatically when the component mounts, no click needed. Refresh the page to count another view."
      >
        <Suspense fallback={loading}>
          <Views />
        </Suspense>
      </Section>

      <Section
        title="5. Cookies"
        description="The action sets a cookie. Next.js re-renders the page automatically, so the greeting in the header updates."
      >
        <Suspense fallback={<NameFormView />}>
          <NameForm />
        </Suspense>
      </Section>

      <Section
        title="6. revalidatePath and redirect"
        description="A separate page whose action saves the note, optionally revalidates a static (cached) list, then redirects to it. Compare with and without revalidatePath."
      >
        <div className="flex flex-wrap gap-2">
          <Link href="/examples/mutating-data/new" className={buttonClass}>
            Open the new-note page →
          </Link>
          <Link href="/examples/mutating-data/static-list" className={buttonClass}>
            Open the static list →
          </Link>
        </div>
      </Section>

      <Section
        title="7. react-hook-form + Server Action"
        description="For bigger forms: react-hook-form validates in the browser, the Server Action validates again with the same zod schema and saves."
      >
        <Link href="/examples/mutating-data/hook-form" className={`inline-block ${buttonClass}`}>
          Open the react-hook-form page →
        </Link>
      </Section>
    </main>
  );
}
