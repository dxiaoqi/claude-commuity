import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { defaultLocale, type Locale } from "@/i18n/config";

const CONTENT_DIR = path.join(process.cwd(), "src/content/blog");

export type PostKind = "blog" | "lab" | "paper";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
  pinned?: boolean;
  locale: Locale;
  kind: PostKind;
}

export interface Post extends PostMeta {
  content: string;
}

export function classifyKind(tags: string[] | undefined): PostKind {
  if (!Array.isArray(tags)) return "blog";
  if (tags.includes("paper")) return "paper";
  return tags.includes("series") ? "lab" : "blog";
}

function stripExt(filename: string) {
  return filename.replace(/\.mdx?$/, "");
}

// slug format: "<slug>" for default locale, "<slug>.<locale>" for others
function parseFilename(filename: string): { slug: string; locale: Locale } {
  const base = stripExt(filename);
  const dot = base.lastIndexOf(".");
  if (dot > 0) {
    const suffix = base.slice(dot + 1);
    // If suffix looks like a locale, split
    if (suffix === "en" || suffix === "zh-CN" || suffix === "zh-TW" || suffix === "ja") {
      return { slug: base.slice(0, dot), locale: suffix as Locale };
    }
  }
  return { slug: base, locale: defaultLocale };
}

interface ReadOptions {
  locale: Locale;
  fallback?: boolean;
  kind?: PostKind;
}

export function getAllPosts(options: ReadOptions = { locale: defaultLocale, fallback: true }): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));

  // Group by slug
  const bySlug = new Map<string, { file: string; locale: Locale }[]>();
  for (const file of files) {
    const parsed = parseFilename(file);
    const arr = bySlug.get(parsed.slug) ?? [];
    arr.push({ file, locale: parsed.locale });
    bySlug.set(parsed.slug, arr);
  }

  const posts: PostMeta[] = [];
  for (const [slug, entries] of bySlug) {
    let chosen = entries.find((e) => e.locale === options.locale);
    if (!chosen && options.fallback !== false) {
      chosen = entries.find((e) => e.locale === defaultLocale) ?? entries[0];
    }
    if (!chosen) continue;
    const raw = fs.readFileSync(path.join(CONTENT_DIR, chosen.file), "utf-8");
    const { data } = matter(raw);
    const meta = data as Omit<PostMeta, "slug" | "locale" | "kind">;
    const kind = classifyKind(meta.tags);
    if (options.kind && kind !== options.kind) continue;
    posts.push({ slug, locale: chosen.locale, kind, ...meta });
  }

  return posts.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getPost(slug: string, locale: Locale = defaultLocale, fallback = true): Post | null {
  const candidates = [
    path.join(CONTENT_DIR, `${slug}.${locale}.mdx`),
    path.join(CONTENT_DIR, `${slug}.${locale}.md`),
  ];
  if (locale === defaultLocale) {
    candidates.push(path.join(CONTENT_DIR, `${slug}.mdx`), path.join(CONTENT_DIR, `${slug}.md`));
  } else if (fallback) {
    candidates.push(path.join(CONTENT_DIR, `${slug}.mdx`), path.join(CONTENT_DIR, `${slug}.md`));
  }
  const file = candidates.find((p) => fs.existsSync(p));
  if (!file) return null;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  const parsed = parseFilename(path.basename(file));
  const meta = data as Omit<PostMeta, "slug" | "locale" | "kind">;
  return { slug, locale: parsed.locale, kind: classifyKind(meta.tags), content, ...meta };
}

export function getAvailableLocalesForSlug(slug: string): Locale[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));
  const locales: Locale[] = [];
  for (const f of files) {
    const parsed = parseFilename(f);
    if (parsed.slug === slug) locales.push(parsed.locale);
  }
  return locales;
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));
  return Array.from(new Set(files.map((f) => parseFilename(f).slug)));
}

export function getSlugsByKind(kind: PostKind): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => /\.mdx?$/.test(f));
  const bySlug = new Map<string, string>();
  for (const file of files) {
    const parsed = parseFilename(file);
    if (parsed.locale === defaultLocale && !bySlug.has(parsed.slug)) {
      bySlug.set(parsed.slug, file);
    }
  }
  // fill in any slug without a default-locale file, using first available
  for (const file of files) {
    const parsed = parseFilename(file);
    if (!bySlug.has(parsed.slug)) bySlug.set(parsed.slug, file);
  }
  const result: string[] = [];
  for (const [slug, file] of bySlug) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data } = matter(raw);
    const meta = data as { tags?: string[] };
    if (classifyKind(meta.tags) === kind) result.push(slug);
  }
  return result;
}
