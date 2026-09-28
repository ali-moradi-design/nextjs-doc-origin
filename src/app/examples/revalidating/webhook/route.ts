import { revalidateTag } from "next/cache";
import type { NextRequest } from "next/server";
import { tags } from "../_lib/constants";

const allowedTags: string[] = Object.values(tags);

// What a CMS calls after content changes: POST /examples/revalidating/webhook?tag=headline
// A real webhook must also check a secret sent by the CMS.
// updateTag is not allowed here: it only works in Server Actions.
export async function POST(request: NextRequest) {
  const tag = request.nextUrl.searchParams.get("tag");

  if (!tag || !allowedTags.includes(tag)) {
    return Response.json(
      { revalidated: false, message: "Unknown tag" },
      { status: 400 },
    );
  }

  revalidateTag(tag, "max");
  return Response.json({ revalidated: true, tag, at: Date.now() });
}
