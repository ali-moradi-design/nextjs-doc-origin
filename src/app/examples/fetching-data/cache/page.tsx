import { Suspense } from "react";
import { PageIntro } from "../_components/ui";
import { getRequestStart, getUser, getUserUncached } from "../_lib/db";

// Imagine these live in different files: a header, a sidebar and a footer.
// Each one fetches the user itself instead of receiving it as a prop.
async function CachedBadge({ place }: { place: string }) {
  const user = await getUser("1");
  return <Badge place={place} name={user.name} queryId={user.queryId} />;
}

async function UncachedBadge({ place }: { place: string }) {
  const user = await getUserUncached("1");
  return <Badge place={place} name={user.name} queryId={user.queryId} />;
}

function Badge({ place, name, queryId }: { place: string; name: string; queryId: string }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 px-4 py-2 text-sm dark:border-zinc-800">
      <span>
        <span className="text-zinc-500">{place}:</span> {name}
      </span>
      <span className="font-mono text-xs text-zinc-500">query {queryId}</span>
    </li>
  );
}

const places = ["Header", "Sidebar", "Footer"];

export default function Page() {
  // No `await connection()` here: with Cache Components, waiting at the top
  // would block the whole page. The slow queries below sit inside
  // <Suspense>, so they already run at request time.
  getRequestStart();

  return (
    <div className="space-y-6">
      <PageIntro title="React.cache" expected="~0.3s">
        <p>
          Three components ask for user 1 without React.cache, and three with
          it. Compare the query ids, then count the <code>queryUser</code>{" "}
          lines in the terminal: 4 per refresh, not 6.
        </p>
      </PageIntro>

      <div className="grid gap-4 sm:grid-cols-2">
        <section className="space-y-3">
          <h2 className="font-semibold">Without React.cache</h2>
          <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
            <ul className="space-y-2">
              {places.map((place) => (
                <UncachedBadge key={place} place={place} />
              ))}
            </ul>
          </Suspense>
          <p className="text-sm text-red-600 dark:text-red-400">
            3 different query ids = 3 database queries.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold">With React.cache</h2>
          <Suspense fallback={<p className="text-sm text-zinc-500">Loading…</p>}>
            <ul className="space-y-2">
              {places.map((place) => (
                <CachedBadge key={place} place={place} />
              ))}
            </ul>
          </Suspense>
          <p className="text-sm text-emerald-600 dark:text-emerald-400">
            Same query id everywhere = 1 database query, shared.
          </p>
        </section>
      </div>

      <p className="text-sm text-zinc-500">
        Refresh: the cached id changes. React.cache only lasts for one request;
        it is not a cache between users or page loads.
      </p>
    </div>
  );
}
