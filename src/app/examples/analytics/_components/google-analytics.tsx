import Script from "next/script";
import { GA_ID, GTAG_SRC } from "../_lib/gtag";

// What <GoogleAnalytics gaId="..." /> from @next/third-parties/google
// renders, written by hand so the script URL can point to the fake Google.
export function GoogleAnalytics() {
  return (
    <>
      <Script src={GTAG_SRC} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
