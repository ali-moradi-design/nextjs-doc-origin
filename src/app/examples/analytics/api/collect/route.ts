import { listEvents, saveEvent } from "../../_lib/store";

// The analytics endpoint. sendBeacon posts the event as a text body.
export async function POST(request: Request) {
  try {
    saveEvent(JSON.parse(await request.text()));
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
  return new Response(null, { status: 204 });
}

export async function GET() {
  return Response.json(listEvents());
}
