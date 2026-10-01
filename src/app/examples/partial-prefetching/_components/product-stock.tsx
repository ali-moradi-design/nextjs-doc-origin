import { getStock } from "../_lib/data";
import { LoadedAt } from "./loaded-at";
import { Card } from "@/src/app/_components/ui/card";

// Uncached: streams in after navigation, even for <Link prefetch={true}>.
export async function ProductStock({
  params,
}: Pick<PageProps<"/examples/partial-prefetching/products/[id]">, "params">) {
  const { id } = await params;
  const { inStock, loadedAt } = await getStock(id);
  return (
    <Card kind="request" title="Stock (uncached)">
      <p>{inStock} left</p>
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
