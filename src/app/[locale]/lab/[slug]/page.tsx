import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAvailableLocalesForSlug, getPost, getSlugsByKind } from "@/lib/blog";
import { siteConfig } from "@/lib/site";
import { defaultLocale, isLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { mdxOptions } from "@/lib/mdx-options";

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  const slugs = getSlugsByKind("lab");
  const params: { locale: string; slug: string }[] = [];
  for (const l of locales) {
    for (const slug of slugs) {
      params.push({ locale: l, slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const post = getPost(slug, locale);
  if (!post || post.kind !== "lab") return {};
  const availableLocales = getAvailableLocalesForSlug(slug);
  const languagesEntries: [string, string][] = locales
    .filter((l) => availableLocales.includes(l) || (availableLocales.includes(defaultLocale) && l === defaultLocale))
    .map((l) => [l, `/${l}/lab/${slug}`]);
  languagesEntries.push(["x-default", `/${defaultLocale}/lab/${slug}`]);
  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/${locale}/lab/${slug}`,
      languages: Object.fromEntries(languagesEntries),
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

export default async function LabPostPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const post = getPost(slug, locale);
  if (!post || post.kind !== "lab") notFound();
  const dict = getDictionary(locale);
  const dateLocale = locale === "en" ? "en-US" : locale === "zh-CN" ? "zh-CN" : locale === "zh-TW" ? "zh-TW" : "ja-JP";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    inLanguage: locale,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/${locale}/lab/${slug}` },
  };

  return (
    <main id="main" className="post-shell shell-width">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="post-breadcrumb">
        <Link href={`/${locale}/lab`}>← {dict.lab.allEpisodes}</Link>
      </div>

      <header className="post-header">
        <div className="post-meta-top">
          <div className="blog-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">{dict.blog.tagLabels[tag] ?? tag}</span>
            ))}
          </div>
          <span className="blog-read-time">{post.readTime} {dict.blog.readTimeSuffix}</span>
        </div>
        <h1>{post.title}</h1>
        <p className="post-description">{post.description}</p>
        <time className="post-date" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" })}
        </time>
      </header>

      <article className="post-content prose-content">
        <MDXRemote source={post.content} options={mdxOptions} />
      </article>

      <footer className="post-footer">
        <Link className="back-link" href={`/${locale}/lab`}>← {dict.lab.backToAll}</Link>
      </footer>
    </main>
  );
}
