import { getInventory } from "../_lib/data";
import { LoadedAt } from "./loaded-at";
import { Card } from "@/src/app/_components/ui/card";

export async function Inventory() {
  const { inStock, loadedAt } = await getInventory();
  return (
    <Card kind="request" title="Inventory (uncached)">
      <p>{inStock} items in the warehouse</p>
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
