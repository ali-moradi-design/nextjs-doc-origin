import { notFound } from "next/navigation";
import { connection } from "next/server";
import ProductDetails from "../../_components/product-details";
import { getProduct, sleep } from "../../_lib/products";

export default async function Page({
  params,
}: PageProps<"/examples/linking-and-navigating/slow/[id]">) {
  // Opts this page into dynamic rendering: it runs on every request.
  await connection();
  const { id } = await params;

  await sleep(2000);
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <ProductDetails
      product={product}
      mode="Dynamic"
      note="Rendered on every request (2s delay). Thanks to loading.tsx next to this page, the skeleton was prefetched and shown instantly."
    />
  );
}
