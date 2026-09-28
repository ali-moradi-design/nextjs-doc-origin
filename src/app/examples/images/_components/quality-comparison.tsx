import mountains from "../_assets/mountains.jpg";
import { ImageInspector } from "./image-inspector";

// next.config.ts allows qualities [25, 75, 100]. 80 is not in the list,
// so it is served as the closest allowed value, 75.
const qualities = [25, 75, 80, 100];

export function QualityComparison() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {qualities.map((quality) => (
        <ImageInspector
          key={quality}
          src={mountains}
          alt={`Mountains at quality ${quality}`}
          quality={quality}
          width={320}
          className="h-auto w-full rounded-lg"
          caption={`quality={${quality}}`}
        />
      ))}
    </div>
  );
}
