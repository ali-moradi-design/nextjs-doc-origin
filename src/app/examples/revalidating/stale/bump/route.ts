import { revalidateTag } from "next/cache";
import { tags } from "../../_lib/constants";
import { increaseCounter } from "../../_lib/store";

// Changes the value on the server, like a CMS webhook would. It's a Route
// Handler, not a Server Action, so the browser's router cache is NOT
// cleared: pages the browser already holds keep showing the old value
// until their stale time runs out.
export async function POST() {
  const value = increaseCounter();
  // { expire: 0 }: no stale-while-revalidate on the server, so the next
  // request to the server gets the new value right away.
  revalidateTag(tags.counter, { expire: 0 });
  return Response.json({ value });
}
