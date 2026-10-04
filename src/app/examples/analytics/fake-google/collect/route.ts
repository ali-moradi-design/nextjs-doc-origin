import type { NextRequest } from "next/server";
import { listHits, saveHit, type GoogleHit } from "../../_lib/google-store";

// Plays the role of https://www.google-analytics.com/g/collect.
// Like GA4, the hit is in the query string, not in the body.
export function POST(request: NextRequest) {
  const query = request.nextUrl.searchParams;
  const params: GoogleHit["params"] = {};
  for (const [key, value] of query) {
    if (key.startsWith("ep.")) params[key.slice(3)] = value;
    if (key.startsWith("epn.")) params[key.slice(4)] = Number(value);
  }

  const name = query.get("en");
  if (!name) return Response.json({ error: "Missing en" }, { status: 400 });

  saveHit({
    name,
    page: new URL(query.get("dl") ?? "/", request.url).pathname,
    title: query.get("dt") ?? "",
    clientId: query.get("cid") ?? "",
    measurementId: query.get("tid") ?? "",
    params,
    receivedAt: Date.now(),
  });
  return new Response(null, { status: 204 });
}

// Not part of GA: lets the example page show what "Google" received.
export function GET() {
  return Response.json(listHits());
}
