import { Card } from "@/src/app/_components/ui/card";
import { getPosts } from "../_lib/data";
import { LoadedAt } from "./loaded-at";

export async function PostList() {
  const { posts, loadedAt } = await getPosts();
  return (
    <Card kind="cached" title='Posts, cacheTag("posts")'>
      <ul className="list-inside list-disc">
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <LoadedAt time={loadedAt} />
    </Card>
  );
}
