import { Card } from "@/src/app/_components/ui/card";
import { BrowserClock } from "./browser-clock";

export function CounterValue({
  value,
  loadedAt,
  stale,
}: {
  value: number;
  loadedAt: string;
  stale: string;
}) {
  return (
    <Card kind="cached" title={`Counter, stale: ${stale}`}>
      <p className="font-mono text-4xl">{value}</p>
      <p className="text-zinc-500">
        Server made this at <span className="font-mono">{loadedAt}</span>
      </p>
      <p className="text-zinc-500">
        Browser time now: <BrowserClock />
      </p>
    </Card>
  );
}
