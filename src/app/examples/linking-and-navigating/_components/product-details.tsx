import type { Product } from "../_lib/products";

export default function ProductDetails({
  product,
  mode,
  note,
}: {
  product: Product;
  mode: "Static" | "Dynamic";
  note: string;
}) {
  // For static pages this time is frozen at build time.
  // For dynamic pages it changes on every request.
  const renderedAt = new Date().toLocaleTimeString("en-US");

  return (
    <article className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
      <div className={`h-40 ${product.color}`} />
      <div className="space-y-3 p-6">
        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              mode === "Static"
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300"
                : "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300"
            }`}
          >
            {mode} route
          </span>
          <span className="text-xs text-zinc-500">Rendered at {renderedAt}</span>
        </div>
        <h2 className="text-2xl font-semibold">{product.name}</h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          ${product.price}
        </p>
        <p className="text-sm text-zinc-500">{note}</p>
      </div>
    </article>
  );
}
