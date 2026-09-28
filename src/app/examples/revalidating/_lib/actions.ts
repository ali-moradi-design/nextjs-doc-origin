"use server";

import { refresh, revalidatePath, revalidateTag, updateTag } from "next/cache";
import { pagePath, tags } from "./constants";
import { increasePrice, insertPost, nextHeadline } from "./store";

// updateTag: the cache is expired right away, so the page this action
// sends back already shows the new post (read-your-own-writes).
export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  if (!title) return;

  insertPost(title);
  updateTag(tags.posts);
}

// revalidateTag with "max": the cache is only marked stale. The next
// render still gets the old price and a fresh one is made in the
// background. revalidateTag doesn't re-render the page: nothing changes
// on screen until the next request.
export async function raisePrice() {
  increasePrice();
  revalidateTag(tags.price, "max");
}

// Simulates an editor changing content in a CMS. The data changes but
// nothing is invalidated: refresh() only re-renders the page, and the
// cached headline stays the same.
export async function editHeadlineInCms() {
  nextHeadline();
  refresh();
}

// revalidatePath: everything cached for this route, whatever its tag.
export async function revalidateWholePage() {
  revalidatePath(pagePath);
}
