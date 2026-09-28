import mountains from "../_assets/mountains.jpg";
import { ImageInspector } from "./image-inspector";

// Without sizes: srcset has 1x / 2x only. With sizes: srcset lists many
// widths (w descriptors) and the browser picks one from sizes.
export function SizesComparison() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <ImageInspector
        src={mountains}
        alt="Mountains without sizes"
        className="h-auto w-full rounded-lg"
        caption="without sizes"
      />
      <ImageInspector
        src={mountains}
        alt="Mountains with sizes"
        sizes="(max-width: 640px) 100vw, 340px"
        className="h-auto w-full rounded-lg"
        caption='sizes="(max-width: 640px) 100vw, 340px"'
      />
    </div>
  );
}
