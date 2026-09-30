import Link from "next/link";
import { getPosts } from "../_lib/data";

export async function PostList() {
  const posts = await getPosts();

  return (
    <ul className="space-y-2 text-sm">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/examples/metadata-and-og-images/${post.slug}`}
            className="font-medium underline"
          >
            {post.title}
          </Link>
          <span className="text-zinc-600 dark:text-zinc-400">
            {" "}
            — {post.description}
          </span>
        </li>
      ))}
    </ul>
  );
}
