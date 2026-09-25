import { getCart, getMaskedApiKey } from "../_lib/data";
import Boundary from "./boundary";

// A Server Component that uses server-only code. It is rendered inside
// <Modal> (a Client Component), yet it still runs only on the server,
// because the page passes it to Modal as `children` instead of Modal
// importing it.
export default async function Cart() {
  const items = await getCart();

  return (
    <Boundary kind="server" name="Cart">
      <ul className="space-y-1 text-sm">
        {items.map((item) => (
          <li key={item.name} className="flex justify-between">
            <span>{item.name}</span>
            <span className="font-mono text-zinc-500">×{item.quantity}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-zinc-500">
        Loaded with API key <span className="font-mono">{getMaskedApiKey()}</span>
      </p>
    </Boundary>
  );
}
