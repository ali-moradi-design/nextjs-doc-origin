import { DataCard } from "../_components/ui";
import { elapsed, getItem, getItemUncached } from "../_lib/db";

// The preload function lives next to the component that needs the data,
// so if you move or delete <Item>, you see its preload right here.
export function preload(id: string, cached: boolean) {
  // `void` = "start this Promise, I don't need the result here".
  void (cached ? getItem(id) : getItemUncached(id));
}

export default async function Item({ id, cached }: { id: string; cached: boolean }) {
  // Same call as in preload(). With React.cache it returns the request that
  // is already running; without it, a brand new query starts now.
  const item = await (cached ? getItem(id) : getItemUncached(id));

  return (
    <DataCard title="Item" readyAt={elapsed()}>
      <p className="text-2xl font-semibold">{item.name}</p>
      <p className="text-sm text-zinc-500">
        ${item.price} · <span className="font-mono">query {item.queryId}</span>
      </p>
    </DataCard>
  );
}
