import { cookies } from "next/headers";
import ThemeToggle from "./_components/theme-toggle";
import { THEME_COOKIE } from "./_lib/theme";

function Tag({ kind }: { kind: "server" | "client" }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold ${
        kind === "server"
          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
          : "bg-sky-100 text-sky-800 dark:bg-sky-900/60 dark:text-sky-300"
      }`}
    >
      {kind === "server" ? "Server Component" : "Client Component"}
    </span>
  );
}

const cardClass =
  "space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900";

const steps = [
  {
    title: "Server reads the cookie",
    body: "layout.tsx calls cookies() and finds theme=dark (or light, or nothing).",
  },
  {
    title: "Server passes it as a prop",
    body: "<ThemeProvider initialTheme=\"dark\"> gets a plain string. Strings are serializable.",
  },
  {
    title: "The first HTML already has the class",
    body: "The provider renders <div class=\"dark\">, so the page never flashes white.",
  },
  {
    title: "CSS does the rest",
    body: "Every dark:bg-… class inside that div switches. Server Components never need to know the theme.",
  },
  {
    title: "Clicking saves a new cookie",
    body: "The toggle updates React state (instant) and the cookie (for the next request).",
  },
];

export default async function Page() {
  // Pages can read cookies too. Refresh after switching themes to see it.
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get(THEME_COOKIE)?.value ?? "(not set)";
  const renderedAt = new Date().toLocaleTimeString("en-US");

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight">
            Theme Provider
          </h1>
          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            A client-side provider holds the theme. Everything else on this
            page is a Server Component styled with <code>dark:</code> classes.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <article className={cardClass}>
          <Tag kind="server" />
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-violet-500 text-lg font-semibold text-white dark:bg-violet-400 dark:text-violet-950">
              SL
            </div>
            <div>
              <p className="font-semibold">Sam Lee</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Learning Next.js
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            I have no hooks and no &quot;use client&quot;. I don&apos;t know
            which theme is active. My colors change because of CSS alone.
          </p>
        </article>

        <article className={cardClass}>
          <Tag kind="server" />
          <p className="font-semibold">What the server saw</p>
          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-zinc-500">Cookie</dt>
            <dd className="font-mono">
              {THEME_COOKIE}={cookieValue}
            </dd>
            <dt className="text-zinc-500">Rendered at</dt>
            <dd className="font-mono">{renderedAt}</dd>
          </dl>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Switch the theme, then refresh. The cookie value updates, and the
            page loads in the right theme with no flash.
          </p>
        </article>

        <article className="space-y-2 rounded-2xl border border-amber-300 bg-amber-50 p-6 text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200 sm:col-span-2">
          <Tag kind="server" />
          <p className="font-semibold">Why a cookie and not localStorage?</p>
          <p className="text-sm">
            The server cannot read localStorage. With localStorage the server
            would render the light theme, then the browser would switch to
            dark after hydration: a white flash on every load. A cookie is sent
            with every request, so the server renders the right theme from the
            start.
          </p>
        </article>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">How it works</h2>
        <ol className="space-y-3">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-4">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-white dark:text-zinc-900">
                {index + 1}
              </span>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
