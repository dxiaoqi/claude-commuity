import Link from "next/link";
import type { ComponentProps } from "react";
import { locales, type Locale } from "@/i18n/config";

const LOCALE_PREFIXES = locales.map((l) => `/${l}/`);
const LOCALE_PREFIX_REGEX = new RegExp(`^/(${locales.join("|")})/`);

const INTERNAL_PATHS = ["/blog/", "/lab/", "/papers/", "/claude-code", "/claude", "/privacy"];

function isInternalPath(href: string): boolean {
  if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("//")) {
    return false;
  }
  if (LOCALE_PREFIXES.some((p) => href.startsWith(p))) {
    return true;
  }
  return INTERNAL_PATHS.some((p) => href === p || href.startsWith(p));
}

function rewriteHrefToLocale(href: string, locale: Locale): string {
  if (!isInternalPath(href)) {
    return href;
  }

  if (LOCALE_PREFIX_REGEX.test(href)) {
    return href.replace(LOCALE_PREFIX_REGEX, `/${locale}/`);
  }

  if (href.startsWith("/")) {
    return `/${locale}${href}`;
  }

  return href;
}

type AnchorProps = ComponentProps<"a">;

export function createMdxComponents(locale: Locale) {
  function LocaleAwareAnchor({ href, children, ...rest }: AnchorProps) {
    if (!href) {
      return <a {...rest}>{children}</a>;
    }

    const rewritten = rewriteHrefToLocale(href, locale);

    if (isInternalPath(href)) {
      return (
        <Link href={rewritten} {...rest}>
          {children}
        </Link>
      );
    }

    return (
      <a href={rewritten} {...rest}>
        {children}
      </a>
    );
  }

  return {
    a: LocaleAwareAnchor,
  };
}
