import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components: pages are prerendered into a static shell by default.
  // Uncached or request-time data must be cached with "use cache" or
  // wrapped in <Suspense>. See /examples/caching.
  cacheComponents: true,
};

export default nextConfig;
