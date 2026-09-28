import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "../../_lib/data";

export default async function Page({
  params,
}: PageProps<"/examples/error-handling/products/[id]">) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    // Stops rendering here and shows the nearest not-found.tsx.
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-4 px-4 py-8 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
      <p className="font-mono text-zinc-500">${product.price}</p>
      <Link
        href="/examples/error-handling"
        className="text-sm font-medium text-fuchsia-600 hover:underline dark:text-fuchsia-400"
      >
        ← Back to Error Handling
      </Link>
    </main>
  );
}
