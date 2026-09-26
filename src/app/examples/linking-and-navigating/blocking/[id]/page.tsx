import { notFound } from "next/navigation";
import { connection } from "next/server";
import ProductDetails from "../../_components/product-details";
import { getProduct, sleep } from "../../_lib/products";

// Same as /slow/[id], but deliberately WITHOUT a loading.tsx file.
// Cache Components would reject a page that blocks like this. This demo
// blocks on purpose, so it opts out of that check.
export const instant = false;

export default async function Page({
  params,
}: PageProps<"/examples/linking-and-navigating/blocking/[id]">) {
  await connection();
  const { id } = await params;

  await sleep(2000);
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <ProductDetails
      product={product}
      mode="Dynamic"
      note="Rendered on every request (2s delay) with no loading.tsx. The old page stayed on screen until this one was ready; only the useLinkStatus dot told you something was happening."
    />
  );
}
