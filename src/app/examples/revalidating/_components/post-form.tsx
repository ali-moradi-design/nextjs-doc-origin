import { createPost } from "../_lib/actions";
import { SubmitButton } from "./submit-button";

export function PostForm() {
  return (
    <form action={createPost} className="flex flex-wrap gap-2">
      <input
        name="title"
        required
        placeholder="New post title"
        className="min-w-0 flex-1 rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm dark:border-zinc-700"
      />
      <SubmitButton label="Add post (updateTag)" />
    </form>
  );
}
