import Image from "next/image";
import mountains from "../_assets/mountains.jpg";

const fits = ["object-cover", "object-contain", "object-fill"] as const;

// fill: the image takes the size of its parent, so the parent needs a size
// and position: relative. object-fit decides how it is cropped or scaled.
export function FillImages() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {fits.map((fit) => (
        <figure key={fit} className="space-y-2">
          <div className="relative h-40 rounded-lg bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={mountains}
              alt="Mountains"
              fill
              sizes="(max-width: 640px) 100vw, 240px"
              className={`rounded-lg ${fit}`}
            />
          </div>
          <figcaption className="text-sm font-medium">{fit}</figcaption>
        </figure>
      ))}
    </div>
  );
}
