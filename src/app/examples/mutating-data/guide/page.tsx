import Link from "next/link";

// A static notes page: the pros and cons of Server Actions, collected from
// the lesson. No data, no actions, so it ships no JavaScript of its own.

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      {children}
    </section>
  );
}

function Points({
  kind,
  items,
}: {
  kind: "pro" | "con" | "info";
  items: { title: string; body: React.ReactNode }[];
}) {
  const icon = { pro: "✓", con: "✕", info: "•" }[kind];
  const color = {
    pro: "text-emerald-600 dark:text-emerald-400",
    con: "text-red-600 dark:text-red-400",
    info: "text-zinc-500",
  }[kind];

  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.title} className="flex gap-3">
          <span aria-hidden className={`mt-0.5 font-bold ${color}`}>
            {icon}
          </span>
          <div>
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.body}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="overflow-x-auto rounded-xl bg-zinc-100 p-4 text-sm leading-relaxed dark:bg-zinc-900">
      <code>{children}</code>
    </pre>
  );
}

const apiActionCode = `"use server"

import { cookies } from "next/headers"
import { refresh } from "next/cache"

export async function createNote(formData: FormData) {
  const text = formData.get("text")
  // 1. Validate input before it reaches your API
  if (typeof text !== "string" || !text.trim()) {
    return { error: "Write something first." }
  }

  // 2. Read the user's token from an httpOnly cookie
  const token = (await cookies()).get("token")?.value

  // 3. Server-to-server request: no CORS, the URL and token stay secret
  const res = await fetch(\`\${process.env.API_URL}/notes\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${token}\`,
    },
    body: JSON.stringify({ text }),
  })

  // 4. Never show raw backend errors to the user
  if (!res.ok) return { error: "Could not save the note." }

  // 5. Re-render the page with fresh data
  refresh()
}`;

const oldWayCode = `"use client"

async function handleSubmit(event) {
  event.preventDefault()
  await fetch("/api/notes", { method: "POST", body: ... })
  // ...then fetch the list again, update state, handle errors
}`;

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-10 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <Link
          href="/examples/mutating-data"
          className="text-sm text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
        >
          ← Back to notes
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight">
          Server Actions: pros and cons
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Notes from the lesson: why mutations run on the server, when the form
          should be a Client Component, and how to work with a separate API.
        </p>
      </header>

      <Section title="1. Two different things">
        <Points
          kind="info"
          items={[
            {
              title: "The form UI (inputs, button)",
              body: "Can live in a Server Component or a Client Component. On the notes page, form 1 is in a Server Component and form 2 is in a Client Component.",
            },
            {
              title: "The action (saving the data)",
              body: "Always runs on the server, as a Server Action. Both forms above call one.",
            },
          ]}
        />
      </Section>

      <Section title="2. Why the action runs on the server">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          The old way, before Server Actions:
        </p>
        <Code>{oldWayCode}</Code>
        <Points
          kind="pro"
          items={[
            {
              title: "Security",
              body: "Database passwords and API keys never reach the browser. Anything that runs in the browser can be read and changed by the user.",
            },
            {
              title: "Less code",
              body: "No separate API route, no fetch, no JSON parsing, no second request for the new list. One function passed to <form action>.",
            },
            {
              title: "One round trip",
              body: "The new data and the updated UI come back in the same response (with refresh() or revalidatePath()).",
            },
            {
              title: "Works without JavaScript",
              body: "A form in a Server Component uses plain HTML form submission, so it works before JavaScript loads (progressive enhancement). Caveat: content streamed with <Suspense> needs JavaScript to appear, so data shown inside a Suspense boundary won't update without it.",
            },
            {
              title: "Less JavaScript",
              body: "A form in a Server Component ships zero JavaScript to the browser.",
            },
          ]}
        />
      </Section>

      <Section title="3. When the form UI should be a Client Component">
        <Points
          kind="info"
          items={[
            { title: "Pending state", body: 'A button that says "Adding…" while the action runs (useActionState, useFormStatus).' },
            { title: "Messages from the action", body: "Showing the error or success message the action returns." },
            { title: "Live validation", body: "Checking input while the user types, like a character counter." },
            { title: "Browser-only steps", body: "A confirm dialog before submitting, like the Clear all button." },
          ]}
        />
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Even then, the saving still happens in a Server Action. Only the form
          UI moves to the browser.
        </p>
      </Section>

      <Section title="4. When you only have an API (no direct database access)">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Still use a Server Action. It calls your API with fetch instead of
          querying a database. This pattern is called Backend for Frontend:
        </p>
        <Code>{"Browser  →  Next.js server (Server Action)  →  Your API  →  Database"}</Code>
        <Code>{apiActionCode}</Code>
        <Points
          kind="pro"
          items={[
            { title: "Secrets stay secret", body: "The API URL and keys live in process.env on the server, never in browser code." },
            { title: "No CORS problems", body: "Server-to-server requests are not limited by the browser's CORS rules." },
            { title: "Safer login tokens", body: "Keep the token in an httpOnly cookie. Browser JavaScript can't read it, so injected scripts can't steal it. The action reads it with cookies()." },
            { title: "Everything else still works", body: "No-JavaScript forms, refresh() / revalidatePath(), pending states with useActionState." },
          ]}
        />
      </Section>

      <Section title="5. When the browser should call the API directly">
        <Points
          kind="con"
          items={[
            { title: "Large file uploads", body: "Server Action request bodies are limited to 1MB by default (serverActions.bodySizeLimit in next.config can raise it). For big files, upload straight from the browser to a storage service." },
            { title: "Upload progress bars", body: "When the user needs to see upload percentage." },
            { title: "Real-time connections", body: "Chat, live notifications, WebSockets." },
            { title: "Public APIs with no secrets", body: "When the API is designed for browsers and nothing needs hiding." },
            { title: "Fetching data", body: "Server Actions run one at a time and are meant for changes. To read data, fetch it in a Server Component instead." },
          ]}
        />
      </Section>

      <Section title="6. Security checklist for every Server Action">
        <Points
          kind="info"
          items={[
            { title: "Anyone can call it", body: "Server Actions are reachable with a direct POST request, not only through your UI." },
            { title: "Check who is calling", body: "Verify authentication (logged in?) and authorization (allowed to do this?) at the top of every action." },
            { title: "Validate input on the server", body: "Client-side validation is only for convenience. Users can bypass it." },
            { title: "Hide internal errors", body: "Return a friendly message instead of the raw error from your database or API." },
          ]}
        />
      </Section>
    </main>
  );
}
