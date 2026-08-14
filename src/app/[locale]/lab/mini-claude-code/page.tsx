import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

const SERIES_TAG = "mini-claude-code";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = getDictionary(locale);
  return {
    title: dict.mccSeries.metaTitle,
    description: dict.mccSeries.metaDescription,
    alternates: {
      canonical: `/${locale}/lab/mini-claude-code`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `/${l}/lab/mini-claude-code`] as const),
        ["x-default", `/${defaultLocale}/lab/mini-claude-code`] as const,
      ]),
    },
    openGraph: {
      title: dict.mccSeries.metaTitle,
      description: dict.mccSeries.metaDescription,
      type: "website",
    },
  };
}

export default async function MccSeriesPage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const dict = getDictionary(locale);
  const posts = getAllPosts({ locale, fallback: true, kind: "lab" })
    .filter((p) => p.tags.includes(SERIES_TAG))
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const firstSlug = posts[0]?.slug;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: "Mini Claude Code",
    description: dict.mccSeries.metaDescription,
    url: `${siteConfig.url}/${locale}/lab/mini-claude-code`,
    inLanguage: locale,
    numberOfEpisodes: posts.length,
    hasPart: posts.map((p, i) => ({
      "@type": "Article",
      position: i + 1,
      name: p.title,
      url: `${siteConfig.url}/${locale}/lab/${p.slug}`,
      datePublished: p.date,
    })),
  };

  return (
    <main id="main" className="mcc-shell shell-width">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="mcc-hero">
        <p className="section-label">{dict.mccSeries.kicker}</p>
        <h1 className="mcc-hero-title">
          {dict.mccSeries.heroLine1}
          <br />
          <span>{dict.mccSeries.heroLine2}</span>
        </h1>
        <p className="mcc-hero-sub">{dict.mccSeries.heroSub}</p>
        <div className="mcc-cta-row">
          <a
            className="mcc-cta-primary"
            href={siteConfig.githubMcc}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.mccSeries.ctaPrimary} ↗
          </a>
          {firstSlug && (
            <Link className="mcc-cta-secondary" href={`/${locale}/lab/${firstSlug}`}>
              {dict.mccSeries.ctaSecondary} →
            </Link>
          )}
        </div>
        <p className="mcc-hint">{dict.mccSeries.githubHint}</p>
      </section>

      <section className="mcc-stats">
        <h2 className="mcc-h2">{dict.mccSeries.statsHeading}</h2>
        <div className="mcc-stat-grid">
          <div className="mcc-stat"><div className="mcc-stat-num">{dict.mccSeries.statLocValue}</div><div className="mcc-stat-label">{dict.mccSeries.statLoc}</div></div>
          <div className="mcc-stat"><div className="mcc-stat-num">{dict.mccSeries.statFilesValue}</div><div className="mcc-stat-label">{dict.mccSeries.statFiles}</div></div>
          <div className="mcc-stat"><div className="mcc-stat-num">{dict.mccSeries.statDepsValue}</div><div className="mcc-stat-label">{dict.mccSeries.statDeps}</div></div>
          <div className="mcc-stat"><div className="mcc-stat-num">{dict.mccSeries.statEpisodesValue}</div><div className="mcc-stat-label">{dict.mccSeries.statEpisodes}</div></div>
        </div>
      </section>

      <section className="mcc-toc">
        <h2 className="mcc-h2">{dict.mccSeries.tocHeading}</h2>
        <p className="mcc-toc-sub">{dict.mccSeries.tocSub}</p>
        <ol className="mcc-episode-list">
          {posts.map((p, i) => (
            <li key={p.slug} className="mcc-episode">
              <Link href={`/${locale}/lab/${p.slug}`}>
                <div className="mcc-ep-num">EP {String(i + 1).padStart(2, "0")}</div>
                <div className="mcc-ep-body">
                  <div className="mcc-ep-title">{p.title}</div>
                  <div className="mcc-ep-desc">{p.description}</div>
                  <div className="mcc-ep-meta">{p.readTime}</div>
                </div>
                <div className="mcc-ep-arrow">→</div>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className="mcc-start">
        <h2 className="mcc-h2">{dict.mccSeries.startHeading}</h2>
        <p className="mcc-toc-sub">{dict.mccSeries.startSub}</p>
        <pre className="mcc-code"><code>{`git clone ${siteConfig.githubMcc}
cd mini-claude-code
cp .env.example .env    # add ANTHROPIC_API_KEY
npm install
npm start`}</code></pre>
      </section>

      <section className="mcc-safety">
        <h2 className="mcc-h2">{dict.mccSeries.safetyHeading}</h2>
        <ul className="mcc-safety-list">
          {dict.mccSeries.safetyItems.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section className="mcc-next">
        <h2 className="mcc-h2">{dict.mccSeries.footerNextHeading}</h2>
        <p className="mcc-hint">{dict.mccSeries.footerNextSub}</p>
        <div className="mcc-cta-row">
          <a
            className="mcc-cta-primary"
            href={siteConfig.githubMcc}
            target="_blank"
            rel="noopener noreferrer"
          >
            {dict.mccSeries.ctaPrimary} ↗
          </a>
          <Link className="mcc-cta-secondary" href={`/${locale}/lab`}>
            {dict.lab.allEpisodes} →
          </Link>
        </div>
      </section>
    </main>
  );
}
