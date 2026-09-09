import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NewsletterForm } from "@/components/newsletter-form";
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
    title: dict.claudeHub.metaTitle,
    description: dict.claudeHub.metaDescription,
    alternates: {
      canonical: `/${locale}/claude`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `/${l}/claude`] as const),
        ["x-default", `/${defaultLocale}/claude`] as const,
      ]),
    },
  };
}

export default async function ClaudePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const base = `/${locale}`;
  const dict = getDictionary(locale);
  const h = dict.claudeHub;

  return (
    <main id="main" className="article-shell shell-width">
      <header className="article-hero">
        <p className="section-label">{h.kicker}</p>
        <h1>{h.heroLine1}<br /><span>{h.heroLine2}</span></h1>
        <p className="hub-answer">{h.shortAnswer}</p>
      </header>

      <section className="hub-links">
        <h2 className="hub-section-title">{h.hubSectionTitle}</h2>
        <div className="hub-grid">
          <Link href={`${base}/blog/context-engineering-for-coding-agents`} className="hub-card">
            <span className="hub-card-tag">{h.tagDeepDive}</span>
            <h3>{h.contextEngTitle}</h3>
            <p>{h.contextEngDesc}</p>
          </Link>
          <Link href={`${base}/blog/coding-agents-as-long-context-processors`} className="hub-card">
            <span className="hub-card-tag">{h.tagResearch}</span>
            <h3>{h.longContextTitle}</h3>
            <p>{h.longContextDesc}</p>
          </Link>
          <Link href={`${base}/claude-code`} className="hub-card">
            <span className="hub-card-tag">{h.tagGuide}</span>
            <h3>{h.claudeCodeTitle}</h3>
            <p>{h.claudeCodeDesc}</p>
          </Link>
          <Link href={`${base}/lab/mini-claude-code`} className="hub-card">
            <span className="hub-card-tag">{h.tagLab}</span>
            <h3>{h.miniClaudeCodeTitle}</h3>
            <p>{h.miniClaudeCodeDesc}</p>
          </Link>
        </div>
      </section>

      <div className="article-layout">
        <aside>
          <p>{h.tocLabel}</p>
          <a href="#prompt-as-interface">{h.tocPrompt}</a>
          <a href="#context">{h.tocContext}</a>
          <a href="#verification">{h.tocVerification}</a>
        </aside>
        <article className="prose">
          <section id="prompt-as-interface">
            <span className="chapter">01</span>
            <h2>{h.section1Title}</h2>
            <p>{h.section1Text}</p>
            <div className="code-panel">
              <span className="code-label">{h.codeLabel}</span>
              <pre>{`Job       → what Claude owns\nContext   → what is true here\nConstraints → what must not change\nOutput    → the artifact you need\nCheck     → how to know it is good`}</pre>
            </div>
          </section>
          <section id="context">
            <span className="chapter">02</span>
            <h2>{h.section2Title}</h2>
            <p>{h.section2Text}</p>
          </section>
          <section id="verification">
            <span className="chapter">03</span>
            <h2>{h.section3Title}</h2>
            <p>{h.section3Text}</p>
          </section>
          <div className="article-cta">
            <h3>{h.ctaTitle}</h3>
            <NewsletterForm source="claude-guide" />
          </div>
        </article>
      </div>
      <Link className="back-link" href={base}>{h.backLink}</Link>
    </main>
  );
}
