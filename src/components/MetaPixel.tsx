"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

import { FB_PIXEL_ID, pageview } from "@/lib/fpixel";
import { getFbc, getFbp, newEventId, sendCapiEvent } from "@/lib/meta-capi";

export default function MetaPixel() {
  const pathname = usePathname();

  useEffect(() => {
    // Se usuario chegou de anuncio Meta, a URL tem ?fbclid=...
    // Precisamos persistir como cookie _fbc (90 dias) para usar em eventos posteriores.
    if (typeof window !== "undefined" && !document.cookie.includes("_fbc=")) {
      const fbclid = new URLSearchParams(window.location.search).get("fbclid");
      if (fbclid) {
        const fbc = `fb.1.${Date.now()}.${fbclid}`;
        const maxAge = 90 * 24 * 60 * 60; // 90 dias
        document.cookie = `_fbc=${fbc}; path=/; max-age=${maxAge}; SameSite=Lax; Secure`;
      }
    }

    // PageView hibrido: Pixel + CAPI com mesmo event_id (deduplicacao 48h)
    const eventId = newEventId("PageView");
    pageview(eventId);
    void sendCapiEvent({
      eventName: "PageView",
      eventId,
      eventSourceUrl: window.location.href,
      fbp: getFbp(),
      fbc: getFbc(),
    });
  }, [pathname]);

  return (
    <>
      <Script
        id="fb-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
          `,
        }}
      />
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
