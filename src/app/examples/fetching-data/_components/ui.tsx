// Small presentational pieces shared by every page. No hooks, no
// "use client": they render on the server and ship no JavaScript.

export function PageIntro({
  title,
  expected,
  children,
}: {
  title: string;
  expected: string;
  children: React.ReactNode;
}) {
  return (
    <header className="space-y-2">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 font-mono text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
          expected: {expected}
        </span>
      </div>
      <div className="space-y-2 text-zinc-600 dark:text-zinc-400">{children}</div>
    </header>
  );
}

export function DataCard({
  title,
  readyAt,
  children,
}: {
  title: string;
  readyAt: number;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-zinc-200 p-5 dark:border-zinc-800">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold">{title}</h2>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 font-mono text-xs text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
          ready at {readyAt}ms
        </span>
      </div>
      {children}
    </section>
  );
}

export function CardSkeleton({ title }: { title: string }) {
  return (
    <section
      aria-busy="true"
      aria-label={`Loading ${title}`}
      className="space-y-3 rounded-2xl border border-dashed border-zinc-300 p-5 dark:border-zinc-700"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold text-zinc-400 dark:text-zinc-500">
          {title}
        </h2>
        <span className="animate-pulse rounded-full bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500 dark:bg-zinc-800">
          streaming…
        </span>
      </div>
      <div className="animate-pulse space-y-2">
        <div className="h-4 w-3/4 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-1/2 rounded bg-zinc-200 dark:bg-zinc-800" />
      </div>
    </section>
  );
}

export function List({ items }: { items: { id: string; label: string; meta: string }[] }) {
  return (
    <ul className="divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
      {items.map((item) => (
        <li key={item.id} className="flex justify-between gap-4 py-1.5">
          <span>{item.label}</span>
          <span className="font-mono text-zinc-500">{item.meta}</span>
        </li>
      ))}
    </ul>
  );
}
