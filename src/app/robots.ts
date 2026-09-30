import type { MetadataRoute } from "next";
import { siteUrl } from "./_lib/site";

// Served as /robots.txt. Tells crawlers which URLs they may visit.
// A request, not a lock: well-behaved bots follow it, others can ignore it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // A page that throws on purpose, no need to index it.
        disallow: "/examples/error-handling/crash",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
