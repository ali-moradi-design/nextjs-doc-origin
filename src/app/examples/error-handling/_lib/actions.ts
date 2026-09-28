"use server";

import { refresh } from "next/cache";
import { addProduct, getProducts } from "./data";

export type ProductFormState = { error?: string; message?: string };

// Expected errors are returned as values, not thrown.
export async function createProduct(
  _prevState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));

  if (!name) {
    return { error: "Name is required." };
  }
  if (!Number.isFinite(price) || price <= 0) {
    return { error: "Price must be a positive number." };
  }
  const taken = getProducts().some(
    (product) => product.name.toLowerCase() === name.toLowerCase(),
  );
  if (taken) {
    return { error: `A product named "${name}" already exists.` };
  }

  const product = addProduct(name, price);
  refresh();
  return { message: `Created "${product.name}" with id ${product.id}.` };
}
