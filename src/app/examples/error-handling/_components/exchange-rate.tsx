import { fetchExchangeRate } from "../_lib/data";

// An expected error in a Server Component: check the response and render a
// message. Nothing is thrown, so no error boundary is involved.
export async function ExchangeRate() {
  const res = await fetchExchangeRate();

  if (!res.ok) {
    return (
      <p className="text-sm text-amber-700 dark:text-amber-400">
        Exchange rates are unavailable right now (status {res.status}). Prices
        are shown in USD.
      </p>
    );
  }

  return <p className="text-sm">Rates loaded.</p>;
}
