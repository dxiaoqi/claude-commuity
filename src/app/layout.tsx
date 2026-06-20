import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/analytics";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: "Claude Community — Field notes for Claude builders", template: "%s — Claude Community" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: siteConfig.name, title: "Claude Community — Build better with Claude", description: siteConfig.description, url: "/", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Claude Community" }] },
  twitter: { card: "summary_large_image", title: "Claude Community — Build better with Claude", description: siteConfig.description, images: ["/opengraph-image"] },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.BING_SITE_VERIFICATION || "",
      "baidu-site-verification": process.env.BAIDU_SITE_VERIFICATION || "",
    },
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#141412", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
