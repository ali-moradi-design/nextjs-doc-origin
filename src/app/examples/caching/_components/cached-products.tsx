import { getProducts } from "../_lib/data";
import { ProductList } from "./product-list";
import { Card } from "./ui/card";

export async function CachedProducts() {
  const { products, loadedAt } = await getProducts();
  return (
    <Card kind="cached" title='getProducts() with "use cache"'>
      <ProductList products={products} />
      <p className="text-zinc-500">
        Loaded at <span className="font-mono">{loadedAt}</span>. Refresh: this
        time doesn&apos;t change.
      </p>
    </Card>
  );
}
