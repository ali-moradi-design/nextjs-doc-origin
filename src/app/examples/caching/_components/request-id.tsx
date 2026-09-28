import { connection } from "next/server";
import { Card } from "@/src/app/_components/ui/card";

export async function RequestId() {
  await connection(); // "make this at request time", then random is allowed
  return (
    <Card kind="request" title="Random per request">
      <p className="font-mono">{crypto.randomUUID().slice(0, 8)}</p>
      <p className="text-zinc-500">
        connection() + Suspense. Changes on every refresh.
      </p>
    </Card>
  );
}
