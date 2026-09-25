import Boundary from "./boundary";

// A Server Component: no directive needed, it is the default.
// This code never reaches the browser, so it can use Node.js APIs like `process`.
export default function ServerInfo() {
  console.log("[server] <ServerInfo /> rendered");

  return (
    <Boundary kind="server" name="ServerInfo">
      <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
        <dt className="text-zinc-500">typeof window</dt>
        <dd className="font-mono">{typeof window}</dd>
        <dt className="text-zinc-500">Node.js version</dt>
        <dd className="font-mono">{process.version}</dd>
        <dt className="text-zinc-500">JS sent to browser</dt>
        <dd className="font-mono">0 KB</dd>
      </dl>
    </Boundary>
  );
}
