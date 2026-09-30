import Link from "next/link";

const curl = `curl -s localhost:3000/examples/metadata-and-og-images/streaming
curl -s -A Twitterbot localhost:3000/examples/metadata-and-og-images/streaming`;

export function StreamingDemo() {
  return (
    <div className="space-y-3 text-sm">
      <p>
        <Link
          href="/examples/metadata-and-og-images/streaming"
          className="font-medium underline"
        >
          Open the streaming page
        </Link>{" "}
        and watch the tab title: it changes about two seconds after the page
        shows. After a full reload, the tags box marks the streamed tags
        &quot;in body&quot;.
      </p>
      <p>
        Compare a browser with a bot. For Twitterbot the response waits for the
        metadata and puts the tags in &lt;head&gt;:
      </p>
      <pre className="overflow-x-auto rounded-lg bg-zinc-100 p-3 text-xs dark:bg-zinc-900">
        {curl}
      </pre>
    </div>
  );
}
