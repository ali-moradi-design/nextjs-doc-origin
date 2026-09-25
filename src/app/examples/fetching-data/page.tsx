import Link from "next/link";
import { experiments } from "./_lib/experiments";

export default function Page() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Fetching Data</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Every experiment reads from a fake database with slow queries (see{" "}
          <code>_lib/db.ts</code>). Each card shows when its data was ready,
          counted from the start of the request. The terminal logs when each
          query starts.
        </p>
      </header>

      <ul className="grid gap-3 sm:grid-cols-2">
        {experiments.map((experiment) => (
          <li key={experiment.href}>
            <Link
              href={experiment.href}
              className="block h-full space-y-2 rounded-2xl border border-zinc-200 p-5 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-semibold">{experiment.label}</h2>
                <span className="font-mono text-xs text-zinc-500">
                  {experiment.expected}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {experiment.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
