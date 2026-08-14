export const locales = ["en", "zh-CN", "zh-TW", "ja"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "English",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
};

export const htmlLangAttr: Record<Locale, string> = {
  en: "en",
  "zh-CN": "zh-CN",
  "zh-TW": "zh-TW",
  ja: "ja",
};

export const ogLocale: Record<Locale, string> = {
  en: "en_US",
  "zh-CN": "zh_CN",
  "zh-TW": "zh_TW",
  ja: "ja_JP",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
