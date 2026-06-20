"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function Analytics() {
  const src = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  const hostUrl = src?.replace(/\/script\.js(?:\?.*)?$/, "");

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href") || "";
      const name = link.dataset.track;
      if (name) track("nav_click", { name, href });
      if (href.startsWith("http") && !href.startsWith(window.location.origin)) {
        track("outbound_click", { href });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!src || !websiteId) return null;
  return <Script defer src={src} data-host-url={hostUrl} data-website-id={websiteId} data-domains={new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.claudecommunity.com").hostname} />;
}
