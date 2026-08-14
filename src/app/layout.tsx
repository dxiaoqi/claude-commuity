import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Analytics } from "@/components/analytics";
import { siteConfig } from "@/lib/site";
import { defaultLocale, htmlLangAttr, isLocale, locales, type Locale } from "@/i18n/config";
import "./globals.css";

const baseUrl = siteConfig.url;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Claude Community — Field notes for Claude builders", template: "%s — Claude Community" },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  alternates: {
    canonical: "/",
    languages: Object.fromEntries([
      ...locales.map((l) => [l, `/${l}`] as const),
      ["x-default", `/${defaultLocale}`] as const,
    ]),
  },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "Claude Community — Build better with Claude",
    description: siteConfig.description,
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Claude Community" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Claude Community — Build better with Claude",
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
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

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const h = await headers();
  const localeHeader = h.get("x-locale") || "";
  const locale: Locale = isLocale(localeHeader) ? localeHeader : defaultLocale;
  return (
    <html lang={htmlLangAttr[locale]}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
