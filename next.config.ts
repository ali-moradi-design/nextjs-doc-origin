import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components: pages are prerendered into a static shell by default.
  // Uncached or request-time data must be cached with "use cache" or
  // wrapped in <Suspense>. See /examples/caching.
  cacheComponents: true,
  // Partial Prefetching: a <Link> prefetches one shared App Shell per route
  // (static + cached content that doesn't depend on the URL).
  // prefetch={true} adds cached URL data. See /examples/partial-prefetching.
  partialPrefetching: true,
};

export default nextConfig;
