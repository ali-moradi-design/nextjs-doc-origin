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
};

export default nextConfig;
