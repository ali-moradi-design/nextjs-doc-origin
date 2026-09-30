import mountains from "../_assets/mountains.jpg";

// The blurDataURL is a tiny image written into the page as text. Shown
// here at its real size, scaled up with sharp pixels, and scaled up with
// a blur, which is roughly what <Image placeholder="blur"> does.
export function BlurDataUrlPreview() {
  const { blurDataURL = "", blurWidth, blurHeight } = mountains;

  return (
    <div className="space-y-4">
      <p className="text-xs break-all text-zinc-600 dark:text-zinc-400">
        {blurWidth} × {blurHeight} px, {blurDataURL.length} characters:{" "}
        <code>{blurDataURL.slice(0, 80)}…</code>
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <figure className="space-y-2">
          <div className="flex h-24 items-center justify-center rounded-lg bg-zinc-100 dark:bg-zinc-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={blurDataURL} alt="" />
          </div>
          <figcaption className="text-sm font-medium">Real size</figcaption>
        </figure>
        <figure className="space-y-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blurDataURL}
            alt=""
            className="h-24 w-full rounded-lg object-cover [image-rendering:pixelated]"
          />
          <figcaption className="text-sm font-medium">
            Scaled up, pixelated
          </figcaption>
        </figure>
        <figure className="space-y-2">
          <div className="h-24 overflow-hidden rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={blurDataURL}
              alt=""
              className="h-full w-full scale-110 object-cover blur-md"
            />
          </div>
          <figcaption className="text-sm font-medium">
            Scaled up, blurred
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
