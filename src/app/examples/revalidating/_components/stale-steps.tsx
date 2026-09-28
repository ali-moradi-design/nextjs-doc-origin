const steps = [
  "Open Page A and Page B once. Both show the same counter.",
  "Come back here and change the counter on the server.",
  "Open Page A: still the old value. The browser didn't ask the server (Network tab: no request).",
  "Wait 30 seconds after you first opened Page A, then open it again: one request, and the new value.",
  "Open Page B: still the old value, until 5 minutes after you first opened it.",
  "Press F5 on any page: the browser forgets every page it kept, so Page B shows the new value too.",
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
