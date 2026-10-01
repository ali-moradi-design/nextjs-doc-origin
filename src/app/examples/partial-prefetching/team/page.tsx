import { Suspense } from "react";
import { DestinationHeader } from "../_components/destination-header";
import { TeamSwitcher } from "../_components/team-switcher";
import { TeamTopics } from "../_components/team-topics";
import { Skeleton } from "@/src/app/_components/ui/skeleton";

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <DestinationHeader title="Team topics">
        Session content. cookies() varies per session, not per link, so the
        cached topics are part of this session&apos;s App Shell: a default link
        prefetches them.
      </DestinationHeader>
      <TeamSwitcher />
      <Suspense fallback={<Skeleton title="Topics" />}>
        <TeamTopics />
      </Suspense>
    </main>
  );
}
