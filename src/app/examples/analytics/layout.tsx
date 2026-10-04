import { GoogleAnalytics } from "./_components/google-analytics";
import { WebVitals } from "./_components/web-vitals";

// The docs put <WebVitals /> in the root layout to measure every page.
// Here it is scoped to this example.
export default function Layout({
  children,
}: LayoutProps<"/examples/analytics">) {
  return (
    <>
      <WebVitals />
      {children}
      <GoogleAnalytics />
    </>
  );
}
