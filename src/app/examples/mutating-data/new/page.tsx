import Link from "next/link";
import SubmitButton from "../_components/submit-button";
import { createNoteAndRedirect } from "../_lib/actions";

export default async function Page({
  searchParams,
}: PageProps<"/examples/mutating-data/new">) {
  // The action redirects back here with ?error=… if the input is invalid.
  const { error } = await searchParams;

  return (
    <main className="mx-auto w-full max-w-xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <Link
        href="/examples/mutating-data"
        className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
      >
        ← Back to notes
      </Link>
      <h1 className="text-3xl font-semibold tracking-tight">New note</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        After saving, the action calls revalidatePath() and then redirect().
        You land on the list with your note already in it.
      </p>

      <form action={createNoteAndRedirect} className="space-y-3">
        <input
          name="text"
          placeholder="What's on your mind?"
          aria-label="Note"
          autoFocus
          className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 outline-none focus:border-zinc-500 dark:border-zinc-700"
        />
        {typeof error === "string" && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        <SubmitButton />
      </form>
    </main>
  );
}
