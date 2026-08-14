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
  const dict = getDictionary(locale);
  return {
    title: dict.papers.metaTitle,
    description: dict.papers.metaDescription,
    alternates: {
      canonical: `/${locale}/papers`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `/${l}/papers`] as const),
        ["x-default", `/${defaultLocale}/papers`] as const,
      ]),
    },
    openGraph: {
      title: dict.papers.metaTitle,
      description: dict.papers.metaDescription,
    },
  };
}

export default async function PapersPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const dict = getDictionary(locale);
  const posts = getAllPosts({ locale, fallback: true, kind: "paper" });
  const dateLocale = locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : locale === "zh-TW" ? "zh-TW" : "ja-JP";

  return (
    <main id="main" className="blog-shell shell-width">
      <header className="blog-header">
        <p className="section-label">{dict.papers.listSectionLabel}</p>
        <h1>{dict.papers.listTitleLine1}<br /><span>{dict.papers.listTitleLine2}</span></h1>
        <p className="blog-header-sub">{dict.papers.listSubtitle}</p>
        <p style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href={`/${locale}/papers/rss.xml`}
            style={{
              display: "inline-flex",
              gap: 8,
              padding: "10px 16px",
              background: "var(--ink)",
              color: "var(--white)",
              borderRadius: 3,
              font: "11px var(--mono)",
              letterSpacing: ".07em",
              textTransform: "uppercase",
            }}
          >
            {dict.papers.rssLink}
          </a>
        </p>
      </header>

      {posts.length === 0 ? (
        <p style={{ marginTop: 40, color: "var(--ink-dim)" }}>{dict.papers.empty}</p>
      ) : (
        <div className="blog-grid">
          {posts.map((post) => (
            <Link className="blog-card" href={`/${locale}/papers/${post.slug}`} key={post.slug}>
              <div className="blog-card-top">
                <div className="blog-tags">
                  {post.tags.filter((t) => t !== "paper").slice(0, 2).map((tag) => (
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
      )}
    </main>
  );
}
