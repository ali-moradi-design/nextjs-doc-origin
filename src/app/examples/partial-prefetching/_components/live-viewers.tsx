import { getLiveViewers } from "../_lib/data";
import { LoadedAt } from "./loaded-at";
import { Card } from "@/src/app/_components/ui/card";

export async function LiveViewers() {
  const { viewers, loadedAt } = await getLiveViewers();
  return (
    <Card kind="request" title="Live viewers (real-time)">
      <p>{viewers} people are watching right now</p>
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
