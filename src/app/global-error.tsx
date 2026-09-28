"use client"; // Error boundaries must be Client Components

// Replaces the root layout when the root layout itself throws, so it must
// render its own <html> and <body>. Only active in production builds.
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "sans-serif", padding: 32 }}>
        <h2>Something went wrong!</h2>
        <p>{error.message}</p>
        <button onClick={() => retry()}>Try again</button>
      </body>
    </html>
  );
}
