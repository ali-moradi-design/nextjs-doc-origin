import { spaceMono } from "../_lib/fonts";

// Two files, one family: the browser picks the file by font-weight.
export function LocalFont() {
  return (
    <div className={`space-y-1 ${spaceMono.className}`}>
      <p>Space Mono 400: const answer = 42;</p>
      <p className="font-bold">Space Mono 700: const answer = 42;</p>
    </div>
  );
}
