const base = "/examples/fetching-data";

export const experiments = [
  {
    href: `${base}/blocking`,
    label: "1. Blocking",
    description: "Three independent awaits, one after another. Nothing shows until all are done.",
    expected: "~4.5s",
  },
  {
    href: `${base}/parallel`,
    label: "2. Parallel",
    description: "Same three requests started together with Promise.all.",
    expected: "~2s",
  },
  {
    href: `${base}/streaming`,
    label: "3. Streaming",
    description: "Each request in its own <Suspense>. The page appears at once and cards stream in.",
    expected: "0s, then 1s / 1.5s / 2s",
  },
  {
    href: `${base}/sequential`,
    label: "4. Sequential",
    description: "Playlists need the artist id, so they must wait. loading.tsx covers the first wait.",
    expected: "1s, then 2.5s",
  },
  {
    href: `${base}/use-api`,
    label: "5. use() in Client",
    description: "The server starts the query and passes the Promise to an interactive Client Component.",
    expected: "0s, then 1.5s",
  },
  {
    href: `${base}/cache`,
    label: "6. React.cache",
    description: "Six components ask for the same user. With cache, only one query runs.",
    expected: "~0.3s",
  },
  {
    href: `${base}/preload`,
    label: "7. Preloading",
    description: "Start a request early, before other blocking work, and reuse it later.",
    expected: "2.5s → 1.5s",
  },
];
