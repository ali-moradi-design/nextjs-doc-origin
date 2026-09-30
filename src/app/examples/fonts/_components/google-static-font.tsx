import { pacifico } from "../_lib/fonts";

// Pacifico only has weight 400. There is no bold file, so font-bold makes
// the browser fake it by thickening the letters (faux bold).
export function GoogleStaticFont() {
  return (
    <div className={`space-y-1 text-2xl ${pacifico.className}`}>
      <p>Pacifico, weight 400</p>
      <p className="font-bold">Pacifico, font-bold (faux bold)</p>
    </div>
  );
}
