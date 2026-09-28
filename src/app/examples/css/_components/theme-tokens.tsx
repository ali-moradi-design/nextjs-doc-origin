// Every class here comes from @theme and @utility in globals.css.
export function ThemeTokens() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="rounded-lg bg-brand px-4 py-2 text-sm font-medium text-white">
        bg-brand
      </span>
      <span className="rounded-lg border-2 border-brand bg-brand-soft px-4 py-2 text-sm text-brand">
        border-brand bg-brand-soft
      </span>
      <span className="font-display text-2xl text-brand">font-display</span>
      <span className="rounded-lg border border-zinc-300 px-4 py-2 text-sm transition-colors hover:striped dark:border-zinc-700">
        Hover me: hover:striped
      </span>
    </div>
  );
}
