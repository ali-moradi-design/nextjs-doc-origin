import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import ProductDetails from "../../_components/product-details";
import { getProduct, products } from "../../_lib/products";

// Tells Next.js which [id] values to prerender at build time,
// so this dynamic segment becomes a fully static (and fully prefetchable) route.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export default async function Page({
  params,
}: PageProps<"/examples/linking-and-navigating/products/[id]">) {
  "use cache";
  // Cache Components: the whole page output is cached, including the
  // "Rendered at" time. "max" keeps it until the next build, like before.
  cacheLife("max");

  const { id } = await params;
  const product = getProduct(id);
  // Unknown ids are a 404. (With Cache Components, `dynamicParams = false`
  // is no longer allowed; notFound() does the job.)
  if (!product) notFound();

  return (
    <ProductDetails
      product={product}
      mode="Static"
      note="Prerendered at build time with generateStaticParams. In production the 'Rendered at' time never changes, even after a refresh."
    />
  );
}
