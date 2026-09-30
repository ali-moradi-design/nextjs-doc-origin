// JSX for ImageResponse (satori), not for the browser: only inline styles,
// flexbox and a subset of CSS work. Tailwind classes and grid do not.
// Every element with more than one child needs display: "flex".
export function OgCard({
  eyebrow,
  title,
  description,
  color,
}: {
  eyebrow: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "white",
        borderTop: `24px solid ${color}`,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ fontSize: 32, color, textTransform: "uppercase" }}>
        {eyebrow}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div style={{ fontSize: 80, fontWeight: 700, color: "#18181b" }}>
          {title}
        </div>
        <div style={{ fontSize: 36, color: "#52525b" }}>{description}</div>
      </div>
    </div>
  );
}
