import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { PostArticle } from "../_components/post-article";
import { getPost } from "../_lib/data";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// connection() makes this page dynamic (rendered per request), so its
// metadata is streamed: the page shows first, the tags arrive ~2 s later
// at the end of <body>. HTML-limited bots (e.g. Twitterbot) still wait
// and get the tags in <head>.
export async function generateMetadata(): Promise<Metadata> {
  await connection();
  await delay(2000);
  const post = await getPost("hello-metadata");

  return {
    title: `Streamed: ${post?.title}`,
    description: "This description was streamed after the page.",
  };
}

export default async function Page() {
  await connection();
  const post = await getPost("hello-metadata");
  if (!post) return null;

  return (
    <>
      <Link href="/examples/metadata-and-og-images" className="text-sm">
        ← Back
      </Link>
      <PostArticle
        post={post}
        ogImage="/examples/metadata-and-og-images/opengraph-image"
      />
    </>
  );
}
