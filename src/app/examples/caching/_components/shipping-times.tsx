import { Card } from "./ui/card";

// Module constants and pure computations give the same result every time,
// so they are prerendered automatically. No directive needed.
const shippingRules = [
  { region: "Europe", days: 3 },
  { region: "Americas", days: 5 },
  { region: "Asia", days: 7 },
];
const averageDays =
  shippingRules.reduce((sum, rule) => sum + rule.days, 0) /
  shippingRules.length;

export function ShippingTimes() {
  return (
    <Card kind="static" title="Shipping times">
      <ul>
        {shippingRules.map((rule) => (
          <li key={rule.region}>
            {rule.region}: {rule.days} days
          </li>
        ))}
      </ul>
      <p className="text-zinc-500">
        Average: {averageDays} days (computed at build time).
      </p>
    </Card>
  );
}
