import Image from "next/image";
import { REMOTE_BASE } from "../_lib/constants";

// Allowed by images.remotePatterns in next.config.ts. The server downloads
// and optimizes it; the browser only talks to /_next/image. width and
// height match the rendered size (2800 × 1900 scaled to 256px wide).
export function RemoteImage() {
  return (
    <div className="flex flex-wrap gap-4">
      <Image
        src={`${REMOTE_BASE}/mountains.jpg`}
        alt="Mountains, loaded from GitHub"
        width={256}
        height={174}
        className="h-auto w-64 rounded-lg"
      />
      <p className="max-w-xs text-xs text-zinc-600 dark:text-zinc-400">
        A URL that does not match remotePatterns is rejected: an error in
        development, a 400 from /_next/image in production.
      </p>
    </div>
  );
}
