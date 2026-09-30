import type { MetadataRoute } from "next";
import { siteUrl } from "./_lib/site";
import { getPosts } from "./examples/metadata-and-og-images/_lib/data";

const examples = [
  "linking-and-navigating",
  "server-and-client-components",
  "fetching-data",
  "mutating-data",
  "error-handling",
  "css",
  "images",
  "fonts",
  "metadata-and-og-images",
];

// Served as /sitemap.xml. Lists the pages crawlers should know about, with
// optional hints (last change, how often it changes, relative priority).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const lastModified = new Date();

  return [
    { url: siteUrl, lastModified, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteUrl}/examples`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...examples.map((example) => ({
      url: `${siteUrl}/examples/${example}`,
      lastModified,
      priority: 0.5,
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/examples/metadata-and-og-images/${post.slug}`,
      lastModified,
      priority: 0.3,
    })),
  ];
}
