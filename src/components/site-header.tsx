import Link from "next/link";
import { Icon } from "./icon";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { LocaleSwitcher } from "./locale-switcher";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export function SiteHeader({ locale, dict }: Props) {
  const base = `/${locale}`;
  const nav = [
    [`${base}/blog`, dict.nav.blog],
    [`${base}/lab`, dict.nav.lab],
    [`${base}/papers`, dict.nav.papers],
    [`${base}/claude-code`, dict.nav.claudeCode],
    [`${base}/claude`, dict.nav.claude],
  ] as const;
  return (
    <header className="site-header">
      <div className="header-inner shell-width">
        <Link className="brand" href={base} data-track="brand">
          <span className="brand-mark"><Icon name="terminal" size={17} /></span>
          <span>claude<span className="brand-dim">community</span></span>
        </Link>
        <nav aria-label="Main navigation">
          {nav.map(([href, label]) => <Link href={href} key={href} data-track={String(label).toLowerCase().replace(" ", "-")}>{label}</Link>)}
        </nav>
        <div className="header-right">
          <LocaleSwitcher currentLocale={locale} />
          <Link className="header-cta" href={`${base}#join`} data-track="join-waitlist">{dict.nav.joinCta} <Icon name="arrow" size={14} /></Link>
        </div>
      </div>
    </header>
  );
}
