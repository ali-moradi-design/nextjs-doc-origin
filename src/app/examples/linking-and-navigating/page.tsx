import Link from "next/link";
import HoverPrefetchLink from "./_components/hover-prefetch-link";

const base = "/examples/linking-and-navigating";

const linkClass =
  "inline-flex rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 dark:bg-white dark:text-zinc-900";

function Experiment({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      <div className="flex flex-wrap gap-2">{children}</div>
    </section>
  );
}

export default function Page() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Linking and Navigating
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Click the counter in the nav a few times, then try each link below.
          Open DevTools → Network to watch prefetch requests. Prefetching only
          runs in production: <code>pnpm build</code> then{" "}
          <code>pnpm start</code>.
        </p>
      </header>

      <Experiment
        title="1. <Link> vs <a>"
        description="<Link> does a client-side transition: the layout (and the counter) stays. <a> does a full page load: the counter resets to 0."
      >
        <Link href={`${base}/products/2`} className={linkClass}>
          Open with &lt;Link&gt;
        </Link>
        <a href={`${base}/products/2`} className={linkClass}>
          Open with &lt;a&gt;
        </a>
      </Experiment>

      <Experiment
        title="2. Prefetch strategies"
        description="Default: prefetched when visible in the viewport. prefetch={false}: fetched only on click. Hover: prefetched only when the mouse enters the link."
      >
        <Link href={`${base}/products/3`} className={linkClass}>
          Default (viewport)
        </Link>
        <Link href={`${base}/products/4`} prefetch={false} className={linkClass}>
          prefetch=&#123;false&#125;
        </Link>
        {/* Each link here points to a product no other link uses. If another
            visible <Link> already prefetched the same URL, hovering would
            find it in the cache and send no request. */}
        <HoverPrefetchLink href={`${base}/products/5`} className={linkClass}>
          Prefetch on hover
        </HoverPrefetchLink>
      </Experiment>

      <Experiment
        title="3. Dynamic routes: with and without loading.tsx"
        description="Both pages take 2 seconds on the server. With loading.tsx you see a skeleton instantly. Without it the screen freezes, so the nav link shows a useLinkStatus hint (the pulsing dot)."
      >
        <Link href={`${base}/slow/2`} className={linkClass}>
          With loading.tsx
        </Link>
        <Link href={`${base}/blocking/2`} prefetch={false} className={linkClass}>
          Without loading.tsx
        </Link>
      </Experiment>
    </div>
  );
}
