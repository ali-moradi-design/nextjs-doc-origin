import { connection } from "next/server";
import { Card } from "@/src/app/_components/ui/card";
import { readHeadline, readPrice } from "../_lib/store";

const readers = {
  price: () => `$${readPrice()}`,
  headline: readHeadline,
};

// Reads the store with no cache on every request, to compare with the
// cached card next to it. Needs <Suspense> around it.
export async function LiveValue({ field }: { field: keyof typeof readers }) {
  await connection();
  return (
    <Card kind="request" title="Database right now">
      <p className="font-medium">{readers[field]()}</p>
      <p className="text-zinc-500">No cache: read on every request.</p>
    </Card>
  );
}
