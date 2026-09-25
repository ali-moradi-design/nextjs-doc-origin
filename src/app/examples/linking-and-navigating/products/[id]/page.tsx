import { notFound } from "next/navigation";
import ProductDetails from "../../_components/product-details";
import { getProduct, products } from "../../_lib/products";

// Only the ids returned below exist. Any other id is a 404.
export const dynamicParams = false;

// Tells Next.js which [id] values to prerender at build time,
// so this dynamic segment becomes a fully static (and fully prefetchable) route.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function Page({
  params,
}: PageProps<"/examples/linking-and-navigating/products/[id]">) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return (
    <ProductDetails
      product={product}
      mode="Static"
      note="Prerendered at build time with generateStaticParams. In production the 'Rendered at' time never changes, even after a refresh."
    />
  );
}
