import { lora, spaceMono } from "../_lib/fonts";

// Three ways to apply a font. The CSS variable is only defined inside the
// element that has lora.variable / spaceMono.variable.
export function ApplyStyles() {
  return (
    <div className="space-y-3">
      <p className={lora.className}>1. className={"{lora.className}"}</p>
      <p style={lora.style}>2. style={"{lora.style}"}</p>
      <div className={`${lora.variable} ${spaceMono.variable} space-y-1`}>
        <p className="font-(family-name:--font-lora)">
          3. CSS variable: font-(family-name:--font-lora)
        </p>
        <p className="font-(family-name:--font-space-mono)">
          3. CSS variable: font-(family-name:--font-space-mono)
        </p>
      </div>
      <p className="font-(family-name:--font-lora)">
        Outside the wrapper, --font-lora is undefined, so this falls back to the
        inherited font.
      </p>
    </div>
  );
}
