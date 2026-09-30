// Opts this GET into caching: it runs once at build time and every request
// gets the same response until the next build.
export const dynamic = "force-static";

export async function GET() {
  return Response.json({ generatedAt: new Date().toISOString() });
}
