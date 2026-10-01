# Learning progress

Where we are in the Next.js docs, so a new session can continue from here.
Update this file at the end of every lesson.

## Setup

- Next.js 16.3.6, React 19.2, Tailwind v4, pnpm. Work and push on `main`.
- `cacheComponents: true` is ON in `next.config.ts` (enabled in the Caching
  lesson). All examples follow the Cache Components model: uncached or
  request-time data goes in `<Suspense>` or `"use cache"`; pages that block
  on purpose export `instant = false`.
- Site-wide theme (light / dark / system) lives in `src/app/_components`
  and `src/app/_lib/theme.ts`, applied by an inline script in the root layout.
- Extra packages: `react-hook-form`, `zod`, `@hookform/resolvers`.

## Lessons done (docs: Getting Started)

| #   | Docs page                                                    | Example                                  |
| --- | ------------------------------------------------------------ | ---------------------------------------- |
| 4   | Linking and Navigating (incl. Server Rendering, Prefetching) | `/examples/linking-and-navigating`       |
| 5   | Server and Client Components                                 | `/examples/server-and-client-components` |
| 6   | Fetching Data (incl. Preloading)                             | `/examples/fetching-data`                |
| 7   | Mutating Data (+ react-hook-form, pros/cons guide)           | `/examples/mutating-data`                |
| 8   | Caching                                                      | `/examples/caching`                      |
| G1  | Guide: Adopting Partial Prefetching                          | `/examples/partial-prefetching`          |

## Next lesson

10. The next page after Revalidating in
    `node_modules/next/dist/docs/01-app/01-getting-started/`.

## Things learned the hard way

- `revalidatePath` only matters for cached pages; dynamic pages have no cache.
- With Cache Components, navigating away keeps the old page mounted but
  hidden (`<Activity>`): form inputs keep their values.
- Content streamed inside `<Suspense>` needs JavaScript to appear.
- `use cache` entries survive a `pnpm start` restart; a new build resets them.
- A `<Link>` navigation waits for the slowest part of the new page, which can
  hide a fast cached part (see the currency links in `/examples/caching`).
- Revalidating (branch `cache-components`): `revalidateTag` in a Server
  Action does not re-render the page, while `updateTag`, `revalidatePath`
  and `refresh()` do. With `"max"` a reload can still show the stale value
  once. Shared UI (`Card`, `Section`, `Skeleton`, `Tag`) now lives in
  `src/app/_components/ui`.
- React Compiler is on: use `useWatch` instead of react-hook-form's `watch()`.
- The user reads explanations in the chat only: no screenshots.
- Partial Prefetching (`partialPrefetching: true` in `next.config.ts`,
  checked in a production build with Playwright request logs): one App
  Shell request (`next-router-prefetch: 3`) is shared by all links to
  `/products/[id]`; only `prefetch={true}` links add a per-link request
  (`next-router-prefetch: 2`) that resolves cached URL data. Uncached
  content is never prefetched any more, even with `prefetch={true}`.
  Session content (cookie read outside a `use cache` lookup) is in the
  shell. Links prefetch only when visible: scroll before measuring.
- In 16.3.6, a per-route `export const prefetch = "partial"` with the
  global flag off made DEFAULT links do per-link prefetches too (unlike
  the docs); with the global flag on it matches the docs.
- The live nextjs.org page (canary) is newer than the docs in
  `node_modules`: it adds `prefetch()` from `next/cache`, an
  `@next/playwright` `instant()` test and "exclude content from a
  prefetch", which 16.3.6 doesn't have. `nextjs.org` is blocked in the
  cloud container: read the source from
  `raw.githubusercontent.com/vercel/next.js/canary/docs/...` instead.
- Killing `*next dev*` by cmdline also kills the calling shell.
