// Importing a module that starts with "server-only" from a Client Component is
// a build error. Try it: import getPost in _components/like-button.tsx.
import "server-only";

export type Post = {
  title: string;
  likes: number;
};

export type CartItem = {
  name: string;
  quantity: number;
};

// Not prefixed with NEXT_PUBLIC_, so Next.js never puts it in the browser
// bundle. Set DEMO_API_KEY in .env.local to replace the fallback.
function getApiKey() {
  return process.env.DEMO_API_KEY ?? "sk_demo_1234567890";
}

// Pretend this calls a database or a private API with the secret key.
export async function getPost(): Promise<Post> {
  const apiKey = getApiKey();
  console.log(`[server] getPost() called with key ${apiKey.slice(0, 7)}…`);

  return { title: "Server Components in 5 minutes", likes: 42 };
}

export async function getCart(): Promise<CartItem[]> {
  return [
    { name: "Aurora Lamp", quantity: 1 },
    { name: "Prism Vase", quantity: 2 },
  ];
}

// Safe to show: only the first characters of the key.
export function getMaskedApiKey() {
  return `${getApiKey().slice(0, 7)}••••••••`;
}
