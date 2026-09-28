import { currencies, getRate } from "../_lib/data";
import { Card } from "./ui/card";

// Not cached: reads searchParams (runtime data), then passes the plain
// value to a cached function. The currency becomes part of the cache key.
export async function Prices({
  searchParams,
}: {
  searchParams: PageProps<"/examples/caching">["searchParams"];
}) {
  const { currency: raw } = await searchParams;
  const currency =
    typeof raw === "string" && currencies.includes(raw) ? raw : "USD";
  const { rate, loadedAt } = await getRate(currency);

  return (
    <Card kind="cached" title={`Aurora Lamp in ${currency}`}>
      <p className="text-2xl font-semibold tabular-nums">
        {(89 * rate).toFixed(2)} {currency}
      </p>
      <p className="text-zinc-500">
        Rate for {currency} loaded at{" "}
        <span className="font-mono">{loadedAt}</span>
      </p>
    </Card>
  );
}
