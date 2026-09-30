const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Sends the body in pieces. The client can read each line as it arrives
// instead of waiting for the whole response.
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 1; i <= 5; i++) {
        controller.enqueue(encoder.encode(`Line ${i} of 5\n`));
        await delay(600);
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
