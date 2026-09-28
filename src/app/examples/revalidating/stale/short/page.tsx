import { getCounterShortStale } from "../../_lib/data";
import { CounterValue } from "../../_components/counter-value";
import { StaleNav } from "../../_components/stale-nav";

export default async function Page() {
  const { value, loadedAt } = await getCounterShortStale();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Page A</h1>
      <StaleNav />
      <CounterValue value={value} loadedAt={loadedAt} stale="30 seconds" />
    </main>
  );
}
