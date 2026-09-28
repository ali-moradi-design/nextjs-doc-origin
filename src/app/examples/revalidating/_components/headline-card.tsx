import { Card } from "@/src/app/_components/ui/card";
import { getHeadline } from "../_lib/data";
import { LoadedAt } from "./loaded-at";

export async function HeadlineCard() {
  const { headline, loadedAt } = await getHeadline();
  return (
    <Card kind="cached" title='Headline, cacheTag("headline")'>
      <p className="font-medium">{headline}</p>
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
