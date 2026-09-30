export type DeployOption = {
  name: string;
  support: string;
  command: string;
};

export const deployOptions: DeployOption[] = [
  {
    name: "Node.js server",
    support: "All",
    command: "pnpm build && pnpm start",
  },
  {
    name: "Standalone",
    support: "All",
    command: "pnpm build && pnpm start:standalone",
  },
  {
    name: "Docker",
    support: "All",
    command:
      "docker build -t doc-origin . && docker run -p 3000:3000 doc-origin",
  },
  {
    name: "Static export",
    support: "Limited (no server)",
    command: 'output: "export" → out/ folder',
  },
  {
    name: "Adapters",
    support: "Varies by platform",
    command: "Vercel, Bun (verified); Netlify, Cloudflare, ...",
  },
];

export type ExportFinding = { feature: string; result: string };

// What next build reported when this project was built with
// output: "export" (in a scratch copy). The build stops at the first
// error, so each one was removed and the build run again.
export const staticExportFindings: ExportFinding[] = [
  {
    feature: "Route Handlers, robots.ts, sitemap.ts, opengraph-image",
    result:
      'Error: dynamic = "force-static" / revalidate not configured on route',
  },
  {
    feature: "Dynamic routes ([id]) without generateStaticParams",
    result: 'Error: Page is missing "generateStaticParams()"',
  },
  {
    feature: "Server Actions",
    result: "Error: Server Actions are not supported with static export",
  },
  {
    feature: "connection(), cookies(), headers(), searchParams",
    result: 'Error: dynamic = "error" couldn\'t be rendered statically',
  },
  {
    feature: "proxy.ts",
    result: "Only a warning: the build passes, but nothing runs it",
  },
  {
    feature: "next/image with the default loader",
    result:
      "No error: the HTML points to /_next/image, which answers 404 on a plain file server",
  },
];
