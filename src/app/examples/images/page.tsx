import { BlurDataUrlPreview } from "./_components/blur-data-url-preview";
import { DynamicImportImage } from "./_components/dynamic-import-image";
import { FallbackImage } from "./_components/fallback-image";
import { FillImages } from "./_components/fill-images";
import { PlaceholderDemo } from "./_components/placeholder-demo";
import { PublicImage } from "./_components/public-image";
import { QualityComparison } from "./_components/quality-comparison";
import { RemoteImage } from "./_components/remote-image";
import { SizesComparison } from "./_components/sizes-comparison";
import { StaticImportImage } from "./_components/static-import-image";
import { Section } from "./_components/ui/section";
import { UnoptimizedImages } from "./_components/unoptimized-images";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Images</h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          next/image in practice. Open DevTools → Network → Img to see the
          /_next/image requests and their sizes.
        </p>
      </header>

      <Section
        title='1. Static import + placeholder="blur" + preload'
        description="The import is an object with src, width, height and blurDataURL. This is the hero image, so it is preloaded."
      >
        <StaticImportImage />
      </Section>

      <Section
        title="2. Local image from /public"
        description="A string src needs width and height. Compare the downloaded size: without sizes, width decides the srcset. The details come from onLoad."
      >
        <PublicImage />
      </Section>

      <Section
        title="3. Dynamic import() in a Server Component"
        description="The file name is a runtime value, but width, height and blurDataURL still come from the build."
      >
        <DynamicImportImage fileName="cat.jpg" />
      </Section>

      <Section
        title="4. Remote image"
        description="Needs width and height (or fill) and a matching remotePatterns entry."
      >
        <RemoteImage />
      </Section>

      <Section
        title="5. fill + object-fit"
        description="The parent is relative and has a fixed height; the image fills it."
      >
        <FillImages />
      </Section>

      <Section
        title="6. sizes and srcset"
        description="Compare the srcset of the two images and which width the browser downloaded."
      >
        <SizesComparison />
      </Section>

      <Section
        title="7. quality"
        description="Same image, same width, different quality. Compare the downloaded size."
      >
        <QualityComparison />
      </Section>

      <Section
        title="8. onError"
        description="The src does not exist, so a Client Component shows a fallback."
      >
        <FallbackImage />
      </Section>

      <Section
        title="9. unoptimized and SVG"
        description="currentSrc is the original file, not /_next/image."
      >
        <UnoptimizedImages />
      </Section>

      <Section
        title="10. What a blurDataURL is"
        description="A tiny image (8 × 5 px here) embedded in the page as text, so it shows before any request for the real image."
      >
        <BlurDataUrlPreview />
      </Section>

      <Section
        title="11. placeholder while loading"
        description="A custom loader delays every image by 2 seconds so you can watch the placeholders. Press Reload to watch again."
      >
        <PlaceholderDemo />
      </Section>
    </main>
  );
}
