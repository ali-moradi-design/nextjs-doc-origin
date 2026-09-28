import { currencies } from "../_lib/data";

// Plain <a> on purpose: a <Link> navigation re-renders the whole page and
// waits for its slowest part (the uncached 1.5s query in section 2), which
// would hide the effect of the cache.
export function CurrencyLinks() {
  return (
    <div className="flex gap-2">
      {currencies.map((currency) => (
        <a
          key={currency}
          href={`?currency=${currency}`}
          className="rounded-full border border-zinc-300 px-4 py-1.5 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
        >
          {currency}
        </a>
      ))}
    </div>
  );
}
