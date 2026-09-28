import Image, { type StaticImageData } from "next/image";

// When the file name is only known at runtime, a dynamic import() in a
// Server Component still gives width, height and blurDataURL. Every file
// under the static prefix ../_assets/gallery/ is bundled.
export async function DynamicImportImage({ fileName }: { fileName: string }) {
  const { default: image }: { default: StaticImageData } = await import(
    `../_assets/gallery/${fileName}`
  );

  return (
    <div className="space-y-2">
      <Image
        src={image}
        alt="A cat"
        placeholder="blur"
        className="h-auto w-48 rounded-lg"
      />
      <p className="text-xs text-zinc-600 dark:text-zinc-400">
        {fileName}: {image.width} × {image.height}, blurDataURL included
      </p>
    </div>
  );
}
