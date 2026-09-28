import Link from "next/link";
import { LeakTarget } from "../_components/leak-target";
import "./leak.css";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Global CSS leak</h1>
      <p className="text-zinc-600 dark:text-zinc-400">
        This page imports leak.css, so the box below has a red outline. Go back
        with the link (client-side navigation) and look at the same box on the
        CSS page.
      </p>
      <LeakTarget />
      <Link
        href="/examples/css"
        className="inline-block text-sm font-medium text-fuchsia-600 hover:underline dark:text-fuchsia-400"
      >
        ← Back to CSS (client-side)
      </Link>
    </main>
  );
}
