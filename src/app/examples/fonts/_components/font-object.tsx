import { lora, spaceMono } from "../_lib/fonts";

// What a font loader returns: plain strings, generated at build time.
export function FontObject() {
  return (
    <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-900">
      {JSON.stringify({ lora, spaceMono }, null, 2)}
    </pre>
  );
}
