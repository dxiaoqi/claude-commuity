import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "@/i18n/config";

const LOCALE_SET = new Set<string>(locales);

function pickLocaleFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const parts = header.split(",").map((p) => p.trim().split(";")[0]);
  for (const raw of parts) {
    if (LOCALE_SET.has(raw)) return raw as Locale;
    const lower = raw.toLowerCase();
    if (lower.startsWith("zh")) {
      if (lower.includes("tw") || lower.includes("hk") || lower.includes("hant")) return "zh-TW";
      return "zh-CN";
    }
    if (lower.startsWith("ja")) return "ja";
    if (lower.startsWith("en")) return "en";
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const pathnameHasLocale = locales.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`)
  );

  if (pathnameHasLocale) {
    const currentLocale = pathname.split("/")[1] as Locale;
    const res = NextResponse.next();
    res.headers.set("x-locale", currentLocale);
    return res;
  }

  const target = pickLocaleFromAcceptLanguage(req.headers.get("accept-language"));
  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${target}` : `/${target}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|opengraph-image|admin|.*\\..*).*)",
  ],
};
