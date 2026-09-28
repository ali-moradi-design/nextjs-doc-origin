import { headers } from "next/headers";
import { Card } from "./ui/card";

export async function RequestInfo() {
  const userAgent = (await headers()).get("user-agent") ?? "unknown";
  return (
    <Card kind="request" title="headers() is different for every visitor">
      <p className="font-mono text-xs break-all text-zinc-500">{userAgent}</p>
    </Card>
  );
}
