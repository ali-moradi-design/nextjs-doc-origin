import Link from "next/link";
import { Suspense } from "react";
import SubmitButton from "../_components/submit-button";
import { createNoteAndRedirect } from "../_lib/actions";

// The action redirects back here with ?error=… if the input is invalid.
// searchParams is request-time data, so with Cache Components it is read
// inside <Suspense> instead of at the top of the page.
async function ErrorMessage({
  searchParams,
}: Pick<PageProps<"/examples/mutating-data/new">, "searchParams">) {
  const { error } = await searchParams;
  if (typeof error !== "string") return null;
  return <p className="text-sm text-red-600 dark:text-red-400">{error}</p>;
}

export default function Page({ searchParams }: PageProps<"/examples/mutating-data/new">) {

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
        After saving, the action redirects you to a static (cached) list.
        Try it once with the box checked and once without, in production
        (<code>pnpm build</code> then <code>pnpm start</code>).
      </p>

      <form action={createNoteAndRedirect} className="space-y-3">
        <input
          name="text"
          placeholder="What's on your mind?"
          aria-label="Note"
          autoFocus
          className="w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 outline-none focus:border-zinc-500 dark:border-zinc-700"
        />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="revalidate" defaultChecked className="size-4" />
          Call <code>revalidatePath()</code> for the static list
        </label>
        <Suspense>
          <ErrorMessage searchParams={searchParams} />
        </Suspense>
        <SubmitButton />
      </form>
    </main>
  );
}
