// Next.js wraps page.tsx in <Suspense fallback={<Loading />}> automatically.
// Because this file exists, the skeleton is prefetched and shown immediately.
export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading product"
      className="animate-pulse overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800"
    >
      <div className="h-40 bg-zinc-200 dark:bg-zinc-800" />
      <div className="space-y-3 p-6">
        <div className="h-5 w-40 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-8 w-56 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-6 w-20 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </div>
  );
}
