import { Card } from "@/src/app/_components/ui/card";
import { getClock } from "../_lib/data";
import { LoadedAt } from "./loaded-at";

export async function ClockCard() {
  const { loadedAt } = await getClock();
  return (
    <Card kind="cached" title="cacheLife({ revalidate: 20 })">
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
