import { lora } from "../_lib/fonts";

const weights = ["font-normal", "font-medium", "font-semibold", "font-bold"];

// One variable font file covers every weight in its range.
export function GoogleVariableFont() {
  return (
    <div className={`space-y-1 text-xl ${lora.className}`}>
      {weights.map((weight) => (
        <p key={weight} className={weight}>
          Lora, {weight}: The quick brown fox jumps over the lazy dog.
        </p>
      ))}
    </div>
  );
}
