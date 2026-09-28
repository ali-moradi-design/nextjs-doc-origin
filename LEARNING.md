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

## Next lesson

9. Revalidating: `node_modules/next/dist/docs/01-app/01-getting-started/09-revalidating.md`

## Things learned the hard way

- `revalidatePath` only matters for cached pages; dynamic pages have no cache.
- With Cache Components, navigating away keeps the old page mounted but
  hidden (`<Activity>`): form inputs keep their values.
- Content streamed inside `<Suspense>` needs JavaScript to appear.
- `use cache` entries survive a `pnpm start` restart; a new build resets them.
- A `<Link>` navigation waits for the slowest part of the new page, which can
  hide a fast cached part (see the currency links in `/examples/caching`).
- React Compiler is on: use `useWatch` instead of react-hook-form's `watch()`.
- The user reads explanations in the chat only: no screenshots.
