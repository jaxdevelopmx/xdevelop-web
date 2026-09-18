"use client";

import Script from "next/script";

export function GoogleAnalytics({ measurementId, onReady }: { measurementId: string; onReady: () => void }) {
  return (
    <>
      <Script id="ga-bootstrap" strategy="afterInteractive" onReady={onReady}>
        {`window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${measurementId}',{send_page_view:false,anonymize_ip:true});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
    </>
  );
}
