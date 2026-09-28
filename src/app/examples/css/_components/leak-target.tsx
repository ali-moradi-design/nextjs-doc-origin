// global-leak/leak.css styles .leak-target. This page never imports it, so
// the box looks plain until you have visited /examples/css/global-leak.
export function LeakTarget() {
  return (
    <p className="leak-target rounded-lg border border-zinc-300 p-4 text-sm dark:border-zinc-700">
      .leak-target: plain here, unless leak.css is still loaded.
    </p>
  );
}
