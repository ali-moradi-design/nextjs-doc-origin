import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { OgCard } from "../_components/og-card";
import { getPost, getPosts } from "../_lib/data";
import { ogContentType, ogSize } from "../_lib/og";

export const alt = "Post preview";
export const size = ogSize;
export const contentType = ogContentType;

// Same slugs as the page, so each post image is also built ahead of time.
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

// Deeper than ../opengraph-image.tsx, so it wins for the post pages.
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return new ImageResponse(
    <OgCard
      eyebrow="Blog post"
      title={post.title}
      description={post.description}
      color={post.color}
    />,
    size,
  );
}
