# Learning progress

Where we are in the Next.js docs, so a new session can continue from here.
Update this file at the end of every lesson.

## Setup

- Next.js 16.3.6, React 19.2, Tailwind v4, pnpm. Work and push on `main`.
- `cacheComponents` is OFF on `main` (the previous caching model).
  The Cache Components version of the project (setting ON, all examples
  migrated, plus the `/examples/caching` example) lives on the branch
  `cache-components`. It stays a separate branch: do NOT merge it into
  `main` unless the user asks.
- Site-wide theme (light / dark / system) lives in `src/app/_components`
  and `src/app/_lib/theme.ts`, applied by an inline script in the root layout.
- Extra packages: `react-hook-form`, `zod`, `@hookform/resolvers`.

## Lessons done (docs: Getting Started)

| #   | Docs page                                                    | Example                                         |
| --- | ------------------------------------------------------------ | ----------------------------------------------- |
| 4   | Linking and Navigating (incl. Server Rendering, Prefetching) | `/examples/linking-and-navigating`              |
| 5   | Server and Client Components                                 | `/examples/server-and-client-components`        |
| 6   | Fetching Data (incl. Preloading)                             | `/examples/fetching-data`                       |
| 7   | Mutating Data (+ react-hook-form, pros/cons guide)           | `/examples/mutating-data`                       |
| 8   | Caching (Cache Components)                                   | `/examples/caching` (branch `cache-components`) |
| 10  | Error Handling (catchError, error.tsx, not-found, global)    | `/examples/error-handling`                      |
| 11  | CSS (Tailwind v4, CSS Modules, global CSS, cssChunking)      | `/examples/css`                                 |

## Next lesson

9. Revalidating: `node_modules/next/dist/docs/01-app/01-getting-started/09-revalidating.md`
   (skipped for now; lessons 10 and 11 were done first). After it: 12. Images.

## Things learned the hard way

- `revalidatePath` only matters for cached pages; dynamic pages have no cache.
- Cache Components notes (branch `cache-components`): navigating away keeps
  the old page mounted but hidden (`<Activity>`); streamed `<Suspense>`
  content needs JavaScript; `use cache` entries survive a `pnpm start`
  restart until the next build.
- React Compiler is on: use `useWatch` instead of react-hook-form's `watch()`.
- The user reads explanations in the chat only: no screenshots.
- Tailwind v4: config is in CSS (`@theme`, `@utility`, `@custom-variant`,
  `@source`), no `tailwind.config.js`. Example tokens live in `globals.css`.
- A global CSS file imported by one page stays loaded after client-side
  navigation (until a full reload).
- `experimental.cssChunking`: with Turbopack only `true` (default) and
  `'graph'` apply. Here `'graph'` gave the same chunks as `true`;
  `{ type: "graph", requestCost: 0 }` split `/examples/css` from 2 to 7
  CSS files.
- Error boundaries in 16.3 get `retry` (re-fetches from the server) and
  `reset` (no re-fetch). `catchError` from `next/error` types `error` as
  `unknown`. In production, a Server Component error reaches the client as
  a generic message (React error #441) plus `digest`.
