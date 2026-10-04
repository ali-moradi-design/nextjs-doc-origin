// Shared by the browser (react-hook-form) and the server (the actions).
// The same rules run twice: in the browser for instant feedback, on the
// server for safety (anyone can call a Server Action with any data).
import { z } from "zod";
import type { Role } from "./constants";

export const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters long."),
  email: z.email("Please enter a valid email.").trim(),
  password: z
    .string()
    .min(8, "Be at least 8 characters long.")
    .regex(/[a-zA-Z]/, "Contain at least one letter.")
    .regex(/[0-9]/, "Contain at least one number.")
    .regex(/[^a-zA-Z0-9]/, "Contain at least one special character."),
});

// Login only checks that the fields are filled in. Showing the password
// rules here would tell an attacker which passwords can't exist.
export const loginSchema = z.object({
  email: z.email("Please enter a valid email.").trim(),
  password: z.string().min(1, "Password is required."),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

// What a form action returns when it does not redirect.
// `form` is an error for the whole form (e.g. wrong email or password).
export type FormResult<T> = {
  errors?: Partial<Record<keyof T, string[]>>;
  form?: string;
};

// The JWT payload: the minimum needed by later requests. No email, no name,
// no password: the cookie can be read (not changed) by anyone who has it.
export type SessionPayload = {
  userId: string;
  role: Role;
};
