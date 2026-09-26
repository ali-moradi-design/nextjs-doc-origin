import Link from "next/link";
import { DataCard, PageIntro } from "../_components/ui";
import { checkIsAvailable, elapsed, getRequestStart } from "../_lib/db";
import Item, { preload } from "./item";

const modes = {
  none: {
    label: "No preload",
    expected: "~2.5s",
    note: "The item query starts only after the availability check: 1s + 1.5s.",
  },
  preload: {
    label: "Preload + React.cache",
    expected: "~1.5s",
    note: "Both start at 0ms and run side by side. Total = the slower one.",
  },
  "no-cache": {
    label: "Preload without cache",
    expected: "~2.5s",
    note: "The preload is wasted: Item starts a second query. Look for two queryItem lines in the terminal.",
  },
} as const;

type Mode = keyof typeof modes;

function parseMode(value: string | string[] | undefined): Mode {
  return typeof value === "string" && value in modes ? (value as Mode) : "none";
}

// This page blocks on purpose (that's the lesson). Cache Components would
// reject a blocking page, so this segment opts out of that check.
export const instant = false;

export default async function Page({
  searchParams,
}: PageProps<"/examples/fetching-data/preload">) {
  // Reading searchParams already makes this page dynamic.
  const mode = parseMode((await searchParams).mode);
  getRequestStart();
  const id = "1";

  // The id is known right now, so the item request *could* start now.
  if (mode !== "none") preload(id, mode === "preload");

  // Blocking work: the page must know this before deciding what to render.
  const isAvailable = await checkIsAvailable(id);
  const checkedAt = elapsed();

  return (
    <div className="space-y-6">
      <PageIntro title="Preloading" expected={modes[mode].expected}>
        <p>{modes[mode].note}</p>
      </PageIntro>

      <div className="flex flex-wrap gap-2">
        {(Object.keys(modes) as Mode[]).map((key) => (
          <Link
            key={key}
            href={`?mode=${key}`}
            aria-current={key === mode ? "page" : undefined}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              key === mode
                ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                : "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            }`}
          >
            {modes[key].label}
          </Link>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <DataCard title="Availability check" readyAt={checkedAt}>
          <p className="text-sm">{isAvailable ? "In stock" : "Sold out"}</p>
        </DataCard>
        {isAvailable && <Item id={id} cached={mode !== "no-cache"} />}
      </div>
    </div>
  );
}
