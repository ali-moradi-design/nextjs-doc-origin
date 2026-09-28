import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components: pages are prerendered into a static shell by default.
  // Uncached or request-time data must be cached with "use cache" or
  // wrapped in <Suspense>. See /examples/caching.
  cacheComponents: true,

  async headers() {
    return [
      {
        // The stale example must only show the router cache (cacheLife
        // stale). Next.js sends "s-maxage, stale-while-revalidate" for CDNs,
        // and Chrome applies stale-while-revalidate to its own HTTP cache
        // too: it would answer a navigation with an old response and fetch
        // the new one in the background, a second cache on top of stale.
        // no-cache makes the browser ask the server every time it needs a
        // response.
        source: "/examples/revalidating/stale/:path*",
        headers: [{ key: "Cache-Control", value: "private, no-cache" }],
      },
    ];
  },
};

export default nextConfig;
