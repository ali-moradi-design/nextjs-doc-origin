export function Skeleton({ title }: { title: string }) {
  return (
    <div
      aria-busy="true"
      aria-label={`Loading ${title}`}
      className="space-y-2 rounded-xl border border-dashed border-zinc-300 p-4 dark:border-zinc-700"
    >
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-medium text-zinc-400">{title}</h3>
        <span className="animate-pulse font-mono text-[11px] text-zinc-500">
          streaming…
        </span>
      </div>
      <div className="h-10 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
    </div>
  );
}
