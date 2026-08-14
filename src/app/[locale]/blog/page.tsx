import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  return {
    title: "Blog — Claude Code guides, comparisons, and workflows",
    description:
      "In-depth guides on Claude Code, CLAUDE.md, hooks, comparisons with Cursor and Copilot, and practical workflows for engineers using Claude.",
    alternates: {
      canonical: `/${locale}/blog`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `/${l}/blog`] as const),
        ["x-default", `/${defaultLocale}/blog`] as const,
      ]),
    },
    openGraph: {
      title: "Blog — Claude Community",
      description: "Field-tested Claude Code guides, comparisons, and workflows.",
    },
  };
}

export default async function BlogPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const dict = getDictionary(locale);
  const posts = getAllPosts({ locale, fallback: true, kind: "blog" });
  const dateLocale = locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : locale === "zh-TW" ? "zh-TW" : "ja-JP";

  return (
    <main id="main" className="blog-shell shell-width">
      <header className="blog-header">
        <p className="section-label">{dict.blog.listSectionLabel}</p>
        <h1>{dict.blog.listTitleLine1}<br /><span>{dict.blog.listTitleLine2}</span></h1>
        <p className="blog-header-sub">{dict.blog.listSubtitle}</p>
      </header>

      <div className="blog-grid">
        {posts.map((post) => (
          <Link className="blog-card" href={`/${locale}/blog/${post.slug}`} key={post.slug}>
            <div className="blog-card-top">
              <div className="blog-tags">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="blog-tag">{dict.blog.tagLabels[tag] ?? tag}</span>
                ))}
              </div>
              <span className="blog-read-time">{post.readTime}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div className="blog-card-footer">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
              </time>
              <span className="blog-read-more">{dict.blog.readMore} →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
