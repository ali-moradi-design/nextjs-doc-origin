"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signup } from "../_lib/actions";
import { signupSchema, type SignupInput } from "../_lib/definitions";
import { PasswordRules } from "./password-rules";
import { Button } from "./ui/button";
import { Field } from "./ui/field";
import { FormError } from "./ui/form-error";

export function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignupInput>({
    // Same schema as the server: instant errors in the browser.
    resolver: zodResolver(signupSchema),
    mode: "onTouched",
    defaultValues: { name: "", email: "", password: "" },
  });

  async function onSubmit(data: SignupInput) {
    try {
      // On success the action redirects, and the router leaves this page.
      const result = await signup(data);
      for (const [field, messages] of Object.entries(result?.errors ?? {})) {
        setError(field as keyof SignupInput, { message: messages?.[0] });
      }
      if (result?.form) setError("root", { message: result.form });
    } catch {
      setError("root", { message: "Something went wrong. Try again." });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <Field
        id="name"
        label="Name"
        autoComplete="name"
        {...register("name")}
        error={errors.name?.message}
      />
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        {...register("email")}
        error={errors.email?.message}
      />
      <div className="space-y-2">
        <Field
          id="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          {...register("password")}
          error={errors.password?.message}
        />
        <PasswordRules control={control} />
      </div>
      <FormError message={errors.root?.message} />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Sign up"}
      </Button>
    </form>
  );
}
