import { Suspense } from "react";
import { DestinationHeader } from "../_components/destination-header";
import { Inventory } from "../_components/inventory";
import { Card } from "@/src/app/_components/ui/card";
import { Skeleton } from "@/src/app/_components/ui/skeleton";

// Reached through a <Link prefetch={true}>. Before Partial Prefetching
// that was a full prefetch, uncached content included. Now it only loads
// the App Shell: the inventory streams in after the click.
export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <DestinationHeader title="Uncached destination">
        You came through prefetch=&#123;true&#125;, but the uncached inventory
        is no longer part of the prefetch: its server time is later than your
        arrival time. To have it ready before the click, cache it with &quot;use
        cache&quot; (then prefetch=&#123;true&#125; is not needed).
      </DestinationHeader>
      <Card kind="static" title="Static content">
        <p>Part of the prerendered page.</p>
      </Card>
      <Suspense fallback={<Skeleton title="Inventory (uncached)" />}>
        <Inventory />
      </Suspense>
    </main>
  );
}
