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

| #   | Docs page                                                    | Example                                              |
| --- | ------------------------------------------------------------ | ---------------------------------------------------- |
| 4   | Linking and Navigating (incl. Server Rendering, Prefetching) | `/examples/linking-and-navigating`                   |
| 5   | Server and Client Components                                 | `/examples/server-and-client-components`             |
| 6   | Fetching Data (incl. Preloading)                             | `/examples/fetching-data`                            |
| 7   | Mutating Data (+ react-hook-form, pros/cons guide)           | `/examples/mutating-data`                            |
| 8   | Caching (Cache Components)                                   | `/examples/caching` (branch `cache-components`)      |
| 9   | Revalidating                                                 | `/examples/revalidating` (branch `cache-components`) |
| 10  | Error Handling (catchError, error.tsx, not-found, global)    | `/examples/error-handling`                           |
| 11  | CSS (Tailwind v4, CSS Modules, global CSS, cssChunking)      | `/examples/css`                                      |
| 12  | Images (next/image, all props, remotePatterns, qualities)    | `/examples/images`                                   |
| 13  | Fonts (next/font google + local, variable, fallback)         | `/examples/fonts`                                    |

## Next lesson

14. Metadata and OG images: `node_modules/next/dist/docs/01-app/01-getting-started/14-metadata-and-og-images.md`

## Things learned the hard way

- `revalidatePath` only matters for cached pages; dynamic pages have no cache.
- Cache Components notes (branch `cache-components`): navigating away keeps
  the old page mounted but hidden (`<Activity>`); streamed `<Suspense>`
  content needs JavaScript; `use cache` entries survive a `pnpm start`
  restart until the next build.
- Revalidating (branch `cache-components`): `revalidateTag` in a Server
  Action does not re-render the page, while `updateTag`, `revalidatePath`
  and `refresh()` do. With `"max"` a reload can still show the stale value
  once. On that branch, shared UI (`Card`, `Section`, `Skeleton`, `Tag`)
  lives in `src/app/_components/ui`.
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
- Images: `qualities` in `next.config.ts` is an allowlist (Next.js 16
  default `[75]`); a `quality` outside it is served as the closest value.
  Without `sizes`, the `srcset` is `1x`/`2x` of the `width` prop, so a
  `width` much larger than the rendered size downloads a much bigger file.
  `priority` is deprecated in 16: use `preload` (or `loading="eager"`).
- `blurDataURL` is a tiny (8 × 5 px) base64 image inlined in the HTML;
  `placeholder="blur"` paints it as a blurred SVG `background-image` on the
  `<img>` until `onLoad`. `/examples/images` slows images down with a
  custom `loader` + route handler so the placeholder is visible.
- Fonts: next/font options must be literals (read at build time); define
  fonts once in a fonts file. The CSS variable from `variable` only exists
  inside the element that has `font.variable`; Tailwind v4 reads it with
  `font-(family-name:--font-x)`. The generated "X Fallback" face uses
  `local("Times New Roman")`/`local(Arial)` + `size-adjust`, so it only
  helps where that system font is installed. The root layout loads Geist,
  but `body { font-family: Arial }` in `globals.css` overrides it.
- `next/font/local`: use one `.woff2` per weight/style (each `src` entry is
  its own `@font-face` with one URL, so extra formats are not fallbacks).
  `path` is relative to the calling file, with `/`, exact case (Linux is
  case-sensitive: a wrong case builds on Windows/macOS but fails on Linux),
  no `@/` alias. Tips are on `/examples/fonts` section 9.
