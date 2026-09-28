# Learning progress

Where we are in the Next.js docs, so a new session can continue from here.
Update this file at the end of every lesson.

## Setup

- Next.js 16.3.6, React 19.2, Tailwind v4, pnpm. Work and push on `main`.
- `cacheComponents` is OFF on `main` (the previous caching model).
  The Cache Components version of the project (setting ON, all examples
  migrated, plus the `/examples/caching` example) lives on the branch
  `cache-components`. The Caching lesson is NOT understood yet: explain it
  again, simply and step by step, before merging that branch.
- Site-wide theme (light / dark / system) lives in `src/app/_components`
  and `src/app/_lib/theme.ts`, applied by an inline script in the root layout.
- Extra packages: `react-hook-form`, `zod`, `@hookform/resolvers`.

## Lessons done (docs: Getting Started)

| # | Docs page | Example |
| - | --------- | ------- |
| 4 | Linking and Navigating (incl. Server Rendering, Prefetching) | `/examples/linking-and-navigating` |
| 5 | Server and Client Components | `/examples/server-and-client-components` |
| 6 | Fetching Data (incl. Preloading) | `/examples/fetching-data` |
| 7 | Mutating Data (+ react-hook-form, pros/cons guide) | `/examples/mutating-data` |
| 8 | Caching: explained once, not understood yet | branch `cache-components` |

## Next lesson

Re-explain Caching (lesson 8) in a simpler way. Then:
9. Revalidating: `node_modules/next/dist/docs/01-app/01-getting-started/09-revalidating.md`

## Things learned the hard way

- `revalidatePath` only matters for cached pages; dynamic pages have no cache.
- Cache Components notes (branch `cache-components`): navigating away keeps
  the old page mounted but hidden (`<Activity>`); streamed `<Suspense>`
  content needs JavaScript; `use cache` entries survive a `pnpm start`
  restart until the next build.
- React Compiler is on: use `useWatch` instead of react-hook-form's `watch()`.
- The user reads explanations in the chat only: no screenshots.
