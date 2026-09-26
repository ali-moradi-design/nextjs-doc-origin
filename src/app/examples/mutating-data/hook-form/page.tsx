import Link from "next/link";
import HookForm from "../_components/hook-form";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <Link
        href="/examples/mutating-data"
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
      >
        ← Back to notes
      </Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          react-hook-form + Server Action
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          One zod schema (<code>_lib/note-schema.ts</code>) validates in the
          browser while you type, and again on the server before saving.
        </p>
      </header>

      <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
        <li>Click into Title, then out of it: the browser shows the error.</li>
        <li>Type more than 120 characters in Details: the counter turns red.</li>
        <li>
          Save a note titled <q>Server Actions run on the server</q>: only the
          server knows it already exists.
        </li>
        <li>Click the second button: bad data skips the browser, the server still refuses it.</li>
      </ol>

      <section className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <HookForm />
      </section>
    </main>
  );
}
