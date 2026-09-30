type Tip = { title: string; points: React.ReactNode[] };

const tips: Tip[] = [
  {
    title: "File format",
    points: [
      <>
        Use <code>.woff2</code> only. Every current browser supports it and it
        is the smallest.
      </>,
      <>
        <code>localFont</code> accepts <code>woff2</code>, <code>woff</code>,{" "}
        <code>ttf</code>, <code>otf</code> and <code>eot</code>. Anything else
        fails with &quot;Unexpected file&quot;.
      </>,
      <>
        Do not list several formats of the same weight. Each <code>src</code>{" "}
        entry becomes its own <code>@font-face</code> with one URL, so the
        browser uses only the last one and every file is still preloaded.
      </>,
      <>
        One <code>.woff2</code> file per weight and style. Convert{" "}
        <code>.ttf</code> / <code>.otf</code> once before adding them.
      </>,
    ],
  },
  {
    title: "File path",
    points: [
      <>
        <code>path</code> is relative to the file that calls{" "}
        <code>localFont</code>: start it with <code>./</code> or{" "}
        <code>../</code>.
      </>,
      <>
        Always use forward slashes <code>/</code>, also on Windows. A path with
        backslashes fails the build.
      </>,
      <>
        Match the file name case exactly. Windows and macOS ignore case, Linux
        (Ubuntu, Vercel, CI) does not, so a wrong case builds locally and fails
        on the server. Use lowercase kebab-case names, e.g.{" "}
        <code>space-mono-bold.woff2</code>.
      </>,
      <>
        No absolute paths and no <code>@/</code> alias: the alias fails with
        &quot;Font file not found&quot;.
      </>,
      <>
        Keep font files next to the code (e.g. <code>_fonts/</code>), not in{" "}
        <code>public/</code>. <code>next/font</code> copies them to{" "}
        <code>/_next/static/media</code> itself.
      </>,
      <>
        Call <code>localFont</code> in one fonts file and import the font object
        from there; only that file contains the paths.
      </>,
    ],
  },
];

// Rules for next/font/local that avoid build errors on any OS.
export function LocalFontTips() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {tips.map((tip) => (
        <div key={tip.title} className="space-y-2">
          <h3 className="text-sm font-semibold">{tip.title}</h3>
          <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
            {tip.points.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
