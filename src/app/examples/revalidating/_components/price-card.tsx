import { Card } from "@/src/app/_components/ui/card";
import { getPrice } from "../_lib/data";
import { LoadedAt } from "./loaded-at";

export async function PriceCard() {
  const { price, loadedAt } = await getPrice();
  return (
    <Card kind="cached" title='Price, cacheTag("price")'>
      <p className="font-mono text-2xl">${price}</p>
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
