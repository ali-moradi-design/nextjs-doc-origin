import { ImageResponse } from "next/og";
import { OgCard } from "./_components/og-card";
import { ogContentType, ogSize } from "./_lib/og";

// These exports become og:image:alt, og:image:width/height and og:image:type.
export const alt = "Metadata and OG images example";
export const size = ogSize;
export const contentType = ogContentType;

// No params and no request-time APIs, so this PNG is generated once at
// build time. It is used by every page in this folder that has no
// opengraph-image of its own.
export default function Image() {
  return new ImageResponse(
    <OgCard
      eyebrow="Next.js docs examples"
      title="Metadata and OG images"
      description="This image was drawn from JSX by ImageResponse."
      color="#7c3aed"
    />,
    size,
  );
}
