"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, localeLabels, isLocale, type Locale } from "@/i18n/config";

interface Props {
  currentLocale: Locale;
}

const shortLabels: Record<Locale, string> = {
  en: "EN",
  "zh-CN": "简",
  "zh-TW": "繁",
  ja: "日",
};

const englishNames: Record<Locale, string> = {
  en: "English",
  "zh-CN": "Chinese (Simplified)",
  "zh-TW": "Chinese (Traditional)",
  ja: "Japanese",
};

function swapLocaleInPath(pathname: string, next: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return `/${next}`;
  if (isLocale(parts[0])) {
    parts[0] = next;
  } else {
    parts.unshift(next);
  }
  return "/" + parts.join("/");
}

export function LocaleSwitcher({ currentLocale }: Props) {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="locale-switcher" ref={rootRef}>
      <button
        type="button"
        className="locale-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => setOpen((v) => !v)}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </svg>
        <span className="locale-trigger-label">{shortLabels[currentLocale]}</span>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={open ? "locale-chevron open" : "locale-chevron"}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="locale-menu" role="listbox" aria-label="Language">
          <div className="locale-menu-head">Language</div>
          {locales.map((l) => {
            const target = swapLocaleInPath(pathname, l);
            const active = l === currentLocale;
            return (
              <Link
                key={l}
                href={target}
                hrefLang={l}
                role="option"
                aria-selected={active}
                className={active ? "locale-item active" : "locale-item"}
                onClick={() => setOpen(false)}
              >
                <span className="locale-item-code">{shortLabels[l]}</span>
                <span className="locale-item-body">
                  <span className="locale-item-native">{localeLabels[l]}</span>
                  <span className="locale-item-en">{englishNames[l]}</span>
                </span>
                {active && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="locale-item-check">
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
