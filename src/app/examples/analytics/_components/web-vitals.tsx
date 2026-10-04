"use client";

import { useReportWebVitals } from "next/web-vitals";
import { track } from "../_lib/events";
import { sendWebVital } from "../_lib/gtag";

type Metric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];

// Defined outside the component so the reference never changes: a new
// function would be called again with all metrics so far (duplicates).
function reportMetric(metric: Metric) {
  const value =
    metric.name === "CLS"
      ? metric.value.toFixed(3)
      : `${Math.round(metric.value)} ms`;
  track({
    type: "web-vital",
    label: metric.name,
    detail: `${value} (${metric.rating}, ${metric.navigationType})`,
  });
  sendWebVital(metric);
}

export function WebVitals() {
  useReportWebVitals(reportMetric);
  return null;
}
