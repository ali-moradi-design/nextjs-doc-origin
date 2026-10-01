import { cookies } from "next/headers";
import { getTopics, teams, type Team } from "../_lib/data";
import { LoadedAt } from "./loaded-at";
import { Card } from "@/src/app/_components/ui/card";

// cookies() is read here, outside the cached function, and the value is
// passed in. Session data is allowed in the App Shell (it is cached per
// session on the client), so this card is prefetched by a default link.
export async function TeamTopics() {
  const cookie = (await cookies()).get("team")?.value;
  const team: Team = teams.find((t) => t === cookie) ?? "design";
  const { topics, loadedAt } = await getTopics(team);

  return (
    <Card kind="cached" title={`Topics for the ${team} team`}>
      <ul className="list-inside list-disc">
        {topics.map((topic) => (
          <li key={topic}>{topic}</li>
        ))}
      </ul>
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
