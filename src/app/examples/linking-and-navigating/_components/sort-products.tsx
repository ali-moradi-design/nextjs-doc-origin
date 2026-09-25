"use client";

import { useSearchParams } from "next/navigation";
import { products } from "../_lib/products";

export default function SortProducts() {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const sorted = [...products].sort((a, b) => {
    if (sort === "asc") return a.price - b.price;
    if (sort === "desc") return b.price - a.price;
    return 0;
  });

  // pushState adds a history entry: the Back button returns to the previous sort.
  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", sortOrder);
    window.history.pushState(null, "", `?${params.toString()}`);
  }

  // replaceState overwrites the current entry: Back skips over it.
  function clearSorting() {
    window.history.replaceState(null, "", window.location.pathname);
  }

  const buttonClass = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      active
        ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
        : "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
    }`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => updateSorting("asc")}
          className={buttonClass(sort === "asc")}
        >
          Price: low to high
        </button>
        <button
          type="button"
          onClick={() => updateSorting("desc")}
          className={buttonClass(sort === "desc")}
        >
          Price: high to low
        </button>
        <button
          type="button"
          onClick={clearSorting}
          className={buttonClass(false)}
        >
          Clear (replaceState)
        </button>
      </div>

      <ul className="divide-y divide-zinc-200 rounded-2xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
        {sorted.map((product) => (
          <li key={product.id} className="flex items-center gap-4 p-4">
            <span className={`size-8 rounded-lg ${product.color}`} />
            <span className="flex-1 font-medium">{product.name}</span>
            <span className="tabular-nums text-zinc-600 dark:text-zinc-400">
              ${product.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
