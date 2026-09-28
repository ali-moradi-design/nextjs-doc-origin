import { ImageInspector } from "./image-inspector";

// unoptimized: the file is served as-is, no /_next/image and no srcset.
// SVG files (src ending in .svg) are unoptimized automatically.
export function UnoptimizedImages() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <ImageInspector
        src="/images/dog.jpg"
        alt="Dog, unoptimized"
        width={1500}
        height={2000}
        unoptimized
        className="h-auto w-40 rounded-lg"
        caption="unoptimized"
      />
      <ImageInspector
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={37}
        className="dark:invert"
        caption="SVG (unoptimized automatically)"
      />
    </div>
  );
}
