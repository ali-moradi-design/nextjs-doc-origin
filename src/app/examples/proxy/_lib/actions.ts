"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { isVariant, PATHS, SESSION_COOKIE, VARIANT_COOKIE } from "./constants";

// Server Actions are POST requests to the page that uses them,
// so they go through the proxy too (when the matcher covers that page).

export async function login() {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "demo-user", {
    httpOnly: true,
    path: "/",
  });
  redirect(PATHS.dashboard);
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect(PATHS.login);
}

export async function switchVariant() {
  const cookieStore = await cookies();
  const current = cookieStore.get(VARIANT_COOKIE)?.value;
  const next = isVariant(current) && current === "a" ? "b" : "a";
  cookieStore.set(VARIANT_COOKIE, next, { path: PATHS.ab });
  // The proxy ran on this POST before the action, with the old cookie, so
  // re-rendering now would show the old variant. A redirect makes a new
  // request, and the proxy reads the new cookie.
  redirect(PATHS.ab);
}
