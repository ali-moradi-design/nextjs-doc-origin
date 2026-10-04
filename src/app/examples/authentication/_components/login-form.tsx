"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { login } from "../_lib/actions";
import { loginSchema, type LoginInput } from "../_lib/definitions";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { FormError } from "./ui/form-error";

// `from` is the page the proxy sent us away from (from the URL).
export function LoginForm({ from }: { from?: string }) {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: LoginInput) {
    try {
      const result = await login(data, from);
      for (const [field, messages] of Object.entries(result?.errors ?? {})) {
        setError(field as keyof LoginInput, { message: messages?.[0] });
      }
      if (result?.form) {
        setError("root", { message: result.form });
        // Clear the password, keep the email.
        setValue("password", "");
      }
    } catch {
      setError("root", { message: "Something went wrong. Try again." });
    }
  }

  function fill(email: string, password: string) {
    setValue("email", email);
    setValue("password", password);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="flex flex-wrap gap-2 text-xs">
        <span className="text-zinc-500">Demo accounts:</span>
        <button
          type="button"
          onClick={() => fill("admin@example.com", "Admin123!")}
          className="underline"
        >
          admin@example.com
        </button>
        <button
          type="button"
          onClick={() => fill("bob@example.com", "User123!")}
          className="underline"
        >
          bob@example.com
        </button>
      </div>
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <Field
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        {...register("password")}
        error={errors.password?.message}
      />
      <FormError message={errors.root?.message} />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
