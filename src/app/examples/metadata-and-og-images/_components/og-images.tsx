import Image from "next/image";
import { getPosts } from "../_lib/data";

const base = "/examples/metadata-and-og-images";

export async function OgImages() {
  const posts = await getPosts();
  const images = [
    { src: `${base}/opengraph-image`, label: "opengraph-image.tsx" },
    ...posts.map((post) => ({
      src: `${base}/${post.slug}/opengraph-image`,
      label: `[slug]/opengraph-image.tsx, slug = ${post.slug}`,
    })),
  ];

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {images.map((image) => (
        <li key={image.src} className="space-y-1">
          <a href={image.src}>
            {/* unoptimized: the route already returns a sized PNG. */}
            <Image
              src={image.src}
              alt={image.label}
              width={1200}
              height={630}
              unoptimized
              className="rounded-lg border border-zinc-200 dark:border-zinc-800"
            />
          </a>
          <p className="font-mono text-xs text-zinc-500">{image.label}</p>
        </li>
      ))}
    </ul>
  );
}
