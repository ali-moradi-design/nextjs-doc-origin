import Link from "next/link";
import { getProducts } from "../_lib/data";

export function ProductList() {
  const products = getProducts();

  return (
    <ul className="divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
      {products.map((product) => (
        <li key={product.id} className="flex justify-between py-2">
          <Link
            href={`/examples/error-handling/products/${product.id}`}
            className="hover:underline"
          >
            {product.name}
          </Link>
          <span className="font-mono text-zinc-500">${product.price}</span>
        </li>
      ))}
    </ul>
  );
}
