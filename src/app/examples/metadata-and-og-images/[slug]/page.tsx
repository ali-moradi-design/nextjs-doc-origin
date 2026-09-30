import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostArticle } from "../_components/post-article";
import { getPost, getPosts } from "../_lib/data";

type Props = PageProps<"/examples/metadata-and-og-images/[slug]">;

// All posts are known at build time, so these pages (and their metadata)
// are prerendered: the tags are in <head>, nothing is streamed.
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  // openGraph is replaced as a whole, not deep-merged with the layout's.
  // Read the parent's resolved metadata to keep its siteName.
  const previous = await parent;

  return {
    // Becomes "<post title> · Metadata example" through the layout template.
    title: post.title,
    description: post.description,
    openGraph: {
      siteName: previous.openGraph?.siteName,
      type: "article",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Link href="/examples/metadata-and-og-images" className="text-sm">
        ← Back
      </Link>
      <PostArticle
        post={post}
        ogImage={`/examples/metadata-and-og-images/${slug}/opengraph-image`}
      />
    </>
  );
}
