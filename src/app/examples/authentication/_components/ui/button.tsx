const variants = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300",
  outline:
    "border border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800",
  danger: "bg-red-600 text-white hover:bg-red-500",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: React.ComponentProps<"button"> & { variant?: keyof typeof variants }) {
  return (
    <button
      {...props}
      className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50 ${variants[variant]} ${className}`}
    />
  );
}
