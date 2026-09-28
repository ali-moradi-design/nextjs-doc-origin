import { cacheLife } from "next/cache";
import { Card } from "./ui/card";

export async function SharedId() {
  "use cache";
  cacheLife("days");
  return (
    <Card kind="cached" title="Random, but cached">
      <p className="font-mono">{crypto.randomUUID().slice(0, 8)}</p>
      <p className="text-zinc-500">
        &quot;use cache&quot;. The same for everyone until it expires.
      </p>
    </Card>
  );
}
