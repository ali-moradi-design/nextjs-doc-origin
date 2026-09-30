import type { Metadata } from "next";
import { HeadTags } from "./_components/head-tags";

// Static metadata. It merges with the root layout's metadata; for the same
// field the deeper segment wins.
export const metadata: Metadata = {
  title: {
    // Used by child segments that set their own title, e.g. a post page.
    template: "%s · Metadata example",
    // Used by segments without a title, including this folder's page.tsx
    // (a template never applies to the page of its own segment).
    default: "Metadata and OG images",
  },
  description: "Static metadata, generateMetadata and generated OG images.",
  openGraph: {
    siteName: "Next.js docs examples",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function Layout({
  children,
}: LayoutProps<"/examples/metadata-and-og-images">) {
  return (
    <div className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      {children}
      <HeadTags />
    </div>
  );
}
