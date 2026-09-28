const steps = [
  "Open Page A and Page B once. Both show the same counter.",
  "Come back here and change the counter on the server.",
  "Open Page A: still the old value. The browser didn't ask the server (check the Network tab: no request).",
  "Wait 30 seconds, then open Page A again: the new value. The 30 seconds count from when the browser got the page, which can be earlier than your click: links prefetch pages as soon as they are visible.",
  "Open Page B: still the old value, for up to 5 minutes.",
  "On Page B, press F5: the new value right away. A full reload always asks the server.",
];

export function StaleSteps() {
  return (
    <ol className="list-inside list-decimal space-y-1 text-sm">
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}
