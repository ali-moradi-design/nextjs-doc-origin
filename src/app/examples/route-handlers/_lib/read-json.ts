import "server-only";

// request.json() throws on an empty or broken body; turn that into null
// so the handler can answer 400 instead of crashing with a 500.
export async function readJson(request: Request): Promise<unknown> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}
