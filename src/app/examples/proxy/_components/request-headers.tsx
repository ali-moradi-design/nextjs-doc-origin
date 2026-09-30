import { headers } from "next/headers";
import { PATH_HEADER, TIME_HEADER } from "../_lib/constants";

// Reads the request headers that proxy.ts added before this page rendered.
export async function RequestHeaders() {
  const headerStore = await headers();
  const rows = [
    [PATH_HEADER, headerStore.get(PATH_HEADER)],
    [TIME_HEADER, headerStore.get(TIME_HEADER)],
  ];

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-sm">
      {rows.map(([name, value]) => (
        <div key={name} className="contents">
          <dt className="text-zinc-500">{name}</dt>
          <dd>{value ?? "(missing)"}</dd>
        </div>
      ))}
    </dl>
  );
}
