import "server-only";

export type Product = { id: string; name: string; price: number };

// Fake database, kept in memory while the server runs.
const products: Product[] = [
  { id: "1", name: "Keyboard", price: 49 },
  { id: "2", name: "Mouse", price: 19 },
  { id: "3", name: "Monitor", price: 199 },
];

export function getProducts() {
  return products;
}

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}

export function addProduct(name: string, price: number) {
  const product = { id: String(products.length + 1), name, price };
  products.push(product);
  return product;
}

// A fake API that returns an error response instead of throwing.
export async function fetchExchangeRate() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { ok: false as const, status: 503 };
}

// Fails on every other call, so "Try again" can succeed.
let flakyCalls = 0;

export async function getFlakyStats() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  flakyCalls++;
  if (flakyCalls % 2 === 1) {
    throw new Error(`Stats service crashed (call #${flakyCalls})`);
  }
  return { visitors: 1200 + flakyCalls, call: flakyCalls };
}

// Same idea, with its own counter, for the /crash page.
let reportCalls = 0;

export async function getReport() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  reportCalls++;
  if (reportCalls % 2 === 1) {
    throw new Error(`Report database timed out (call #${reportCalls})`);
  }
  return { title: "Monthly sales report", call: reportCalls };
}
