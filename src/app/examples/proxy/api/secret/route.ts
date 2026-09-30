// Runs only when proxy.ts let the request through (x-api-key was right).
export function GET() {
  return Response.json({ secret: "42", from: "route.ts" });
}
