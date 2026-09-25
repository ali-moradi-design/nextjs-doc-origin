import { CardSkeleton } from "../_components/ui";

// Wraps page.tsx in <Suspense> automatically. Shown while the page awaits
// getArtist(), before any of the page's own UI exists.
export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-9 w-48 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="grid gap-4 sm:grid-cols-2">
        <CardSkeleton title="Artist" />
        <CardSkeleton title="Playlists" />
      </div>
    </div>
  );
}
