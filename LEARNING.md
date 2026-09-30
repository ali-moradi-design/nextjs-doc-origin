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
| 14  | Metadata and OG images (+ robots.txt, sitemap.xml)           | `/examples/metadata-and-og-images`                   |
| 15  | Route Handlers                                               | `/examples/route-handlers`                           |
| 16  | Proxy (headers, redirect, rewrite, auth check, 401)          | `/examples/proxy` (+ `src/proxy.ts`)                 |
| 17  | Deploying (standalone, Docker, static export, env variables) | `/examples/deploying` (+ `Dockerfile`)               |

## Next lesson

18. Upgrading: `node_modules/next/dist/docs/01-app/01-getting-started/18-upgrading.md`

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
- Metadata: `title.template` in a layout applies to child segments only,
  not to the `page.tsx` of the same folder (that page gets
  `title.default`). `openGraph` from a child replaces the parent's
  `openGraph` as a whole (read `parent` to keep fields like `siteName`).
  Next.js fills `og:title`/`og:description` and the `twitter:*` tags from
  `title`, `description` and `opengraph-image` when they are not set.
- `metadataBase` is set in the root layout from `src/app/_lib/site.ts`
  (`http://localhost:3000`); `robots.ts` and `sitemap.ts` use the same URL.
- Streaming metadata (checked with curl on `/streaming`): a browser gets
  the page at ~0.3 s and the `<title>` at the end of `<body>` ~2 s later;
  `Twitterbot` waits ~2 s and gets it in `<head>`. On a client-side
  navigation the title is updated in `<head>`.
- `opengraph-image.tsx` in a `[slug]` folder can export
  `generateStaticParams`, so each post image is prerendered at build time.
- Route Handlers (checked with curl on `pnpm start`): a method that is not
  exported answers 405; `OPTIONS` (204 + `Allow` header) and `HEAD` are
  added automatically. A plain `GET` is dynamic (`ƒ`) and runs on every
  request; `dynamic = "force-static"` makes it `○`, built once
  (`x-nextjs-cache: HIT`). `request.json()` throws on a broken body, so
  catch it and answer 400. The browser hides `Set-Cookie` from `fetch()`.
- Stopping the server from a script: `pkill -f` / `pgrep -f` with the
  server's name also match the shell running that command and kill it.
  Stop it by the PID shown by `ss -ltnp` for port 3000 instead.
- Proxy: `src/proxy.ts` (next to `app`), one per project; its logic lives
  in `src/app/examples/proxy/_lib/proxy/*`, each module returns a response
  or `undefined`. The matcher `/examples/proxy/:path*` keeps it off other
  pages (checked with curl: no `x-proxy` header there). A Server Action is
  a POST to the page, and the proxy runs on it BEFORE the action: a rewrite
  that depends on a cookie the action changes shows the old page, so the
  action must `redirect()` to make a new request.
- There is no `ss` in the container: find the server PID from
  `/proc/*/cmdline` (`next-server`).
- Deploying: `output: "standalone"` is on in `next.config.ts`.
  `.next/standalone` (~52 MB vs 472 MB `node_modules`) has `server.js` but
  not `public/` or `.next/static/`: `pnpm start:standalone`
  (`scripts/start-standalone.mjs`) copies them first. `pnpm start` still
  works but warns. `NEXT_PUBLIC_*` is inlined by `next build` (changing it
  at runtime does nothing); a server variable is read at runtime only on a
  dynamic page (`connection()`), a static page keeps the build value.
- Docker in this cloud container: start `dockerd` by hand. `docker build`
  cannot reach npm (proxy CA): build with a scratch copy of the Dockerfile
  that adds `COPY --from=ca ca-bundle.crt` + `NODE_EXTRA_CA_CERTS`, and
  `--network host --build-context ca=/root/.ccr --build-arg HTTPS_PROXY`.
  The committed Dockerfile stays clean. Final image: 54 MB app on
  `node:22-alpine`, runs as the `nextjs` user.
- `output: "export"` on this project (scratch copy) fails on: route
  handlers / robots / sitemap / OG images without `force-static`, `[id]`
  without `generateStaticParams`, Server Actions, request-time APIs.
  `proxy.ts` is only a warning; `next/image` builds but points to
  `/_next/image`, which is a 404 on a plain file server.
- Stopping a server: list `/proc/*/cmdline` entries starting with
  `next-server` and kill that PID (the cmdline is padded with spaces);
  a pattern like `*server.js*` also matches (and kills) the calling shell.
