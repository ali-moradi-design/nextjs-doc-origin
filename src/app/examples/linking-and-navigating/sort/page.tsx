import { Suspense } from "react";
import SortProducts from "../_components/sort-products";

export default function Page() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Native History API
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Sorting updates the URL with <code>pushState</code> without a
          navigation. Sort a few times, then press the browser Back button.
          &quot;Clear&quot; uses <code>replaceState</code>, so Back skips it.
        </p>
      </header>
      {/* useSearchParams in a static page must be inside a Suspense boundary */}
      <Suspense fallback={<p className="text-zinc-500">Loading products…</p>}>
        <SortProducts />
      </Suspense>
    </div>
  );
}
