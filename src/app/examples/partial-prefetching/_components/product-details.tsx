import { notFound } from "next/navigation";
import { getProduct } from "../_lib/data";
import { LoadedAt } from "./loaded-at";
import { Card } from "@/src/app/_components/ui/card";

// Receives the params promise and awaits it INSIDE the Suspense boundary,
// so the App Shell outside stays the same for every product.
export async function ProductDetails({
  params,
}: Pick<PageProps<"/examples/partial-prefetching/products/[id]">, "params">) {
  const { id } = await params;
  const { product, loadedAt } = await getProduct(id);
  if (!product) notFound();

  return (
    <Card kind="cached" title={`Product #${product.id} (cached, URL data)`}>
      <p className="text-lg font-medium">{product.name}</p>
      <p>${product.price}</p>
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
