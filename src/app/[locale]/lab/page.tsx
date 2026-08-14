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
    title: dict.lab.metaTitle,
    description: dict.lab.metaDescription,
    alternates: {
      canonical: `/${locale}/lab`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `/${l}/lab`] as const),
        ["x-default", `/${defaultLocale}/lab`] as const,
      ]),
    },
    openGraph: {
      title: dict.lab.metaTitle,
      description: dict.lab.metaDescription,
    },
  };
}

export default async function LabPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const dict = getDictionary(locale);
  const posts = getAllPosts({ locale, fallback: true, kind: "lab" });
  const dateLocale = locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : locale === "zh-TW" ? "zh-TW" : "ja-JP";

  const ordered = [...posts].reverse();

  return (
    <main id="main" className="blog-shell shell-width">
      <header className="blog-header">
        <p className="section-label">{dict.lab.listSectionLabel}</p>
        <h1>{dict.lab.listTitleLine1}<br /><span>{dict.lab.listTitleLine2}</span></h1>
        <p className="blog-header-sub">{dict.lab.listSubtitle}</p>
        <p style={{ marginTop: 20 }}>
          <Link
            href={`/${locale}/lab/mini-claude-code`}
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
            → {dict.mccSeries.ctaSecondary} · {dict.mccSeries.statLocValue} LOC
          </Link>
        </p>
      </header>

      <div className="blog-grid">
        {ordered.map((post, i) => (
          <Link className="blog-card" href={`/${locale}/lab/${post.slug}`} key={post.slug}>
            <div className="blog-card-top">
              <div className="blog-tags">
                <span className="blog-tag">{dict.lab.episodePrefix} {String(i + 1).padStart(2, "0")}</span>
                {post.tags.filter((t) => t !== "series" && t !== "mini-claude-code").slice(0, 1).map((tag) => (
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
