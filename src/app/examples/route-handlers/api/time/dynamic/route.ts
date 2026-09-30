// The default: no caching, so this runs on every request.
export async function GET() {
  return Response.json({ generatedAt: new Date().toISOString() });
}
