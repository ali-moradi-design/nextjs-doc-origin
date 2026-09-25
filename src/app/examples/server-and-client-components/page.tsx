import AccentPicker from "./_components/accent-picker";
import AccentPreview from "./_components/accent-preview";
import AccentProvider from "./_components/accent-provider";
import Boundary from "./_components/boundary";
import Cart from "./_components/cart";
import ClientInfo from "./_components/client-info";
import LikeButton from "./_components/like-button";
import Modal from "./_components/modal";
import Rating from "./_components/rating";
import Search from "./_components/search";
import ServerInfo from "./_components/server-info";
import { getMaskedApiKey, getPost } from "./_lib/data";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <div className="space-y-1">
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      {children}
    </section>
  );
}

// Pages are Server Components by default, so this one can be async and
// call server-only code directly.
export default async function Page() {
  const post = await getPost();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">
          Server and Client Components
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            Green
          </span>{" "}
          boxes are Server Components,{" "}
          <span className="font-semibold text-sky-600 dark:text-sky-400">
            blue
          </span>{" "}
          boxes are Client Components. Keep the terminal and the browser
          console open side by side.
        </p>
      </header>

      <Section
        title="1. Where does the code run?"
        description={
          <>
            Refresh the page. <code>[server]</code> logs run only in the
            terminal (in dev, Next.js also replays them in the browser console
            with a grey &quot;Server&quot; badge). <code>[client]</code> logs
            run in the terminal (server render to HTML) and again in the
            browser (hydration, then every re-render).
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ServerInfo />
          <ClientInfo />
        </div>
      </Section>

      <Section
        title="2. Passing data from Server to Client"
        description="The page fetches the post on the server, then passes only the number of likes to the interactive button as a prop."
      >
        <Boundary kind="server" name="Page">
          <p className="mb-4 font-medium">{post.title}</p>
          <LikeButton likes={post.likes} />
        </Boundary>
      </Section>

      <Section
        title="3. Reducing JS bundle size"
        description="Mark only the interactive leaf as a Client Component. The rest of the toolbar ships zero JavaScript."
      >
        <Boundary kind="server" name="Toolbar">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="shrink-0 text-lg font-bold tracking-tight">
              ◆ Acme
            </span>
            <div className="flex-1">
              <Search />
            </div>
          </div>
        </Boundary>
      </Section>

      <Section
        title="4. Interleaving: a Server Component inside a Client Component"
        description="Modal holds the open/closed state. Cart reads server-only data. The page passes <Cart /> as children, so Cart is rendered on the server and Modal just shows or hides the result."
      >
        <Modal title="cart">
          <Cart />
        </Modal>
      </Section>

      <Section
        title="5. Context providers"
        description="createContext does not work in Server Components, so AccentProvider is a Client Component that wraps children. It is rendered as deep as possible: around this section only."
      >
        <AccentProvider>
          <div className="space-y-4">
            <AccentPicker />
            <Boundary kind="server" name="StaticText">
              <p className="text-sm">
                I am a Server Component inside the provider. I cannot read the
                context, but the Client Components around me can.
              </p>
            </Boundary>
            <AccentPreview />
          </div>
        </AccentProvider>
      </Section>

      <Section
        title="6. Third-party components"
        description="acme-rating uses useState but has no 'use client'. Importing it straight into this page would fail, so _components/rating.tsx re-exports it behind a 'use client' directive."
      >
        <Boundary kind="client" name="Rating">
          <Rating />
        </Boundary>
      </Section>

      <Section
        title="7. Preventing environment poisoning"
        description={
          <>
            <code>_lib/data.ts</code> starts with{" "}
            <code>import &quot;server-only&quot;</code>, so importing it into a
            Client Component is a build error. Its env variable has no{" "}
            <code>NEXT_PUBLIC_</code> prefix, so it never reaches the browser.
          </>
        }
      >
        <Boundary kind="server" name="Page">
          <p className="text-sm">
            Secret used on the server:{" "}
            <span className="font-mono">{getMaskedApiKey()}</span>
          </p>
        </Boundary>
      </Section>
    </main>
  );
}
