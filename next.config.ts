import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
