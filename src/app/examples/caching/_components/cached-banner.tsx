import { cacheLife } from "next/cache";
import { Card } from "./ui/card";

// "use cache" on a component: its whole rendered output is stored.
export async function CachedBanner() {
  "use cache";
  cacheLife("days");

  const renderedAt = new Date().toLocaleTimeString("en-US");
  return (
    <Card kind="cached" title='A component with "use cache"'>
      <p>🎉 Free shipping on orders over $100 this week.</p>
      <p className="text-zinc-500">
        Rendered at <span className="font-mono">{renderedAt}</span> (frozen for
        a day).
      </p>
    </Card>
  );
}
