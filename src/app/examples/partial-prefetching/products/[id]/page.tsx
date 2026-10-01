import { Suspense } from "react";
import { Categories } from "../../_components/categories";
import { DestinationHeader } from "../../_components/destination-header";
import { ProductDetails } from "../../_components/product-details";
import { ProductStock } from "../../_components/product-stock";
import { Skeleton } from "@/src/app/_components/ui/skeleton";

// Not async: params is passed down as a promise and only awaited inside
// <Suspense>, so the App Shell is the same for every product.
export default function Page({
  params,
}: PageProps<"/examples/partial-prefetching/products/[id]">) {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <DestinationHeader title="Product">
        The header and categories are the App Shell, shared by every product
        link. The product depends on params: it streams in after a default link,
        but is ready before the click with prefetch=&#123;true&#125; because it
        is cached. The stock is uncached and always streams in.
      </DestinationHeader>
      <Categories />
      <div className="grid gap-4 sm:grid-cols-2">
        <Suspense fallback={<Skeleton title="Product (URL data)" />}>
          <ProductDetails params={params} />
        </Suspense>
        <Suspense fallback={<Skeleton title="Stock (uncached)" />}>
          <ProductStock params={params} />
        </Suspense>
      </div>
    </main>
  );
}
