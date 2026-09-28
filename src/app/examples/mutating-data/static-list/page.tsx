import Link from "next/link";
import * as db from "../_lib/store";

// No cookies(), no searchParams, no connection(): this page is STATIC.
// It is rendered once (at build time) and the result is cached. It only
// changes when something calls revalidatePath() for this path.
export default function Page() {
  const notes = db.getNotes();
  const renderedAt = new Date().toLocaleTimeString("en-US");

  return (
    <main className="mx-auto w-full max-w-xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <Link
        href="/examples/mutating-data"
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
      >
        ← Back to notes
      </Link>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">Static list</h1>
        <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-mono text-xs text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
          rendered at {renderedAt}
        </span>
      </div>
      <p className="text-zinc-600 dark:text-zinc-400">
        This page is cached. If the time above didn&apos;t change and your new
        note is missing, the cache was not revalidated. Only visible in
        production: <code>pnpm build</code> then <code>pnpm start</code>.
      </p>

      <ul className="divide-y divide-zinc-100 rounded-2xl border border-zinc-200 px-4 dark:divide-zinc-800 dark:border-zinc-800">
        {notes.map((note) => (
          <li key={note.id} className="py-2 text-sm">
            {note.text}
          </li>
        ))}
        {notes.length === 0 && <li className="py-2 text-sm text-zinc-500">No notes.</li>}
      </ul>

      <Link
        href="/examples/mutating-data/new"
        className="inline-block rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
      >
        Add another note →
      </Link>
    </main>
  );
}
