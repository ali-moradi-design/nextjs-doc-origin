import { Suspense } from "react";
import { DestinationHeader } from "../_components/destination-header";
import { LiveViewers } from "../_components/live-viewers";
import { Skeleton } from "@/src/app/_components/ui/skeleton";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <DestinationHeader title="Live">
        Real-time content would be stale by the click, so there is nothing to
        prefetch: the shell is instant and the number streams in after you
        arrive (its server time is later than your arrival time).
      </DestinationHeader>
      <Suspense fallback={<Skeleton title="Live viewers" />}>
        <LiveViewers />
      </Suspense>
    </main>
  );
}
