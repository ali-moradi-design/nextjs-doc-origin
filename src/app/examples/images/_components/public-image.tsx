import { ImageInspector } from "./image-inspector";

// A string path points into /public. Next.js cannot read the file at build
// time, so width and height are required. Without sizes, the srcset is
// built from width (1x and 2x), so a width far above the rendered size
// downloads a far bigger file than needed.
export function PublicImage() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <ImageInspector
        src="/images/dog.jpg"
        alt="A dog looking at the camera"
        width={1500}
        height={2000}
        className="h-auto w-48 rounded-lg"
        caption="width={1500} height={2000}, shown at 192px"
      />
      <ImageInspector
        src="/images/dog.jpg"
        alt="The same dog, sized for 192px"
        width={192}
        height={256}
        className="h-auto w-48 rounded-lg"
        caption="width={192} height={256}, shown at 192px"
      />
    </div>
  );
}
