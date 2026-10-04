import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // next build also writes .next/standalone: a minimal server.js plus only
  // the node_modules files it needs. Used by the Dockerfile and by
  // pnpm start:standalone. pnpm start still works here, but it warns that
  // it does not use the standalone output.
  output: "standalone",
  images: {
    // Only this folder of the Next.js repo may be optimized as a remote image.
    remotePatterns: [
      new URL(
        "https://raw.githubusercontent.com/vercel/next.js/canary/examples/image-component/public/**",
      ),
    ],
    // Allowed values for the quality prop. Next.js 16 default: [75].
    qualities: [25, 75, 100],
  },
  async rewrites() {
    return [
      // Ad blockers match URLs like /analytics or /collect. The browser only
      // sees this neutral first-party path; the server maps it to the real
      // route handler, so the blocker never sees the real URL.
      { source: "/_e", destination: "/examples/analytics/api/collect" },
      // The fake Google Analytics: gtag.js and its collect endpoint.
      {
        source: "/_g/t.js",
        destination: "/examples/analytics/fake-google/gtag",
      },
      {
        source: "/_g/c",
        destination: "/examples/analytics/fake-google/collect",
      },
    ];
  },
};

export default nextConfig;
