import "server-only";
import { cache } from "react";

export type Post = {
  slug: string;
  title: string;
  description: string;
  color: string;
};

const posts: Post[] = [
  {
    slug: "hello-metadata",
    title: "Hello, metadata",
    description: "The title and description come from generateMetadata.",
    color: "#2563eb",
  },
  {
    slug: "og-images-with-jsx",
    title: "OG images with JSX",
    description: "ImageResponse turns JSX and inline styles into a PNG.",
    color: "#16a34a",
  },
  {
    slug: "sitemaps-and-robots",
    title: "Sitemaps and robots",
    description: "Two special files that tell crawlers what to read.",
    color: "#db2777",
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// One object per request (React.cache resets for every request), so the
// page can show how many times the fake database was really queried.
const requestStats = cache(() => ({ queries: 0 }));

export function getQueryCount() {
  return requestStats().queries;
}

export async function getPosts() {
  await delay(100);
  return posts;
}

// Called by generateMetadata, the page and opengraph-image.tsx, but
// React.cache runs it only once per request for the same slug.
export const getPost = cache(async (slug: string) => {
  requestStats().queries++;
  await delay(300);
  return posts.find((post) => post.slug === slug);
});
