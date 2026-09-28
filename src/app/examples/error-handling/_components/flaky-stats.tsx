import { getFlakyStats } from "../_lib/data";

// An uncaught exception in a Server Component. The nearest error boundary
// (the ErrorBoundary around it in page.tsx) shows its fallback instead.
export async function FlakyStats() {
  const stats = await getFlakyStats();

  return (
    <p className="text-sm text-emerald-700 dark:text-emerald-400">
      {stats.visitors} visitors today (server call #{stats.call}).
    </p>
  );
}
