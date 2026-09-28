import { getStockLevel } from "../_lib/data";
import { Card } from "@/src/app/_components/ui/card";

export async function StockLevel() {
  const { inStock, loadedAt } = await getStockLevel();
  return (
    <Card kind="cached" title="Stock level (revalidate: 10s)">
      <p className="text-2xl font-semibold tabular-nums">{inStock} left</p>
      <p className="text-zinc-500">
        Loaded at <span className="font-mono">{loadedAt}</span>
      </p>
    </Card>
  );
}
