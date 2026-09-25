export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="flex justify-center items-center h-16 bg-cyan-500 text-cyan-950">
        blog layout
      </h2>
      {children}
    </section>
  );
}
