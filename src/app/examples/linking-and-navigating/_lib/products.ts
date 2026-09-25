export type Product = {
  id: string;
  name: string;
  price: number;
  color: string;
};

// Folders starting with "_" are private: Next.js never turns them into routes.
export const products: Product[] = [
  { id: "1", name: "Aurora Lamp", price: 89, color: "bg-amber-400" },
  { id: "2", name: "Nebula Chair", price: 249, color: "bg-violet-500" },
  { id: "3", name: "Orbit Speaker", price: 129, color: "bg-cyan-500" },
  { id: "4", name: "Prism Vase", price: 39, color: "bg-rose-500" },
  { id: "5", name: "Halo Mirror", price: 179, color: "bg-emerald-500" },
];

export function getProduct(id: string) {
  return products.find((product) => product.id === id);
}

// Simulates a slow database or API call.
export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
