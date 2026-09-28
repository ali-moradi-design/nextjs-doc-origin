import Image from "next/image";
import mountains from "../_assets/mountains.jpg";

// A static import is an object: Next.js reads the file at build time and
// fills in width, height and blurDataURL for us.
export function StaticImportImage() {
  return (
    <div className="space-y-3">
      <Image
        src={mountains}
        alt="Mountains under a cloudy sky"
        placeholder="blur"
        preload
        sizes="(max-width: 768px) 100vw, 720px"
        className="h-auto w-full rounded-lg"
      />
      <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-900">
        {JSON.stringify(
          {
            ...mountains,
            blurDataURL: `${mountains.blurDataURL?.slice(0, 40)}…`,
          },
          null,
          2,
        )}
      </pre>
    </div>
  );
}
