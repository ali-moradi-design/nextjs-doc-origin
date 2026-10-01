import { getCategories } from "../_lib/data";
import { LoadedAt } from "./loaded-at";
import { Card } from "@/src/app/_components/ui/card";

// Cached and URL-independent: rendered into the App Shell, shared by every
// link to /products/[id].
export async function Categories() {
  const { categories, loadedAt } = await getCategories();
  return (
    <Card kind="cached" title="Categories (same for every product)">
      <p>{categories.join(" · ")}</p>
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
