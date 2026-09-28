import { getProductsUncached } from "../_lib/data";
import { ProductList } from "./product-list";
import { Card } from "./ui/card";

export async function UncachedProducts() {
  const { products, loadedAt } = await getProductsUncached();
  return (
    <Card kind="request" title="Same query, no cache">
      <ProductList products={products} />
      <p className="text-zinc-500">
        Loaded at <span className="font-mono">{loadedAt}</span>. Refresh: 1.5s
        wait and a new time, every time.
      </p>
    </Card>
  );
}
