import type { Product } from "../_lib/data";

export function ProductList({ products }: { products: Product[] }) {
  return (
    <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
      {products.map((product) => (
        <li key={product.id} className="flex justify-between py-1">
          <span>{product.name}</span>
          <span className="font-mono text-zinc-500">${product.price}</span>
        </li>
      ))}
    </ul>
  );
}
