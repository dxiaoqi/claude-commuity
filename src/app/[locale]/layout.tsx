import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { defaultLocale, isLocale, locales, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const canonical = `/${locale}`;
  return {
    alternates: {
      canonical,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `/${l}`] as const),
        ["x-default", `/${defaultLocale}`] as const,
      ]),
    },
    openGraph: { locale: ogLocale[locale], url: canonical, siteName: siteConfig.name },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const dict = getDictionary(locale);
  return (
    <>
      <a className="skip-link" href="#main">{dict.common.skipToContent}</a>
      <SiteHeader locale={locale} dict={dict} />
      {children}
      <SiteFooter locale={locale} dict={dict} />
    </>
  );
}
