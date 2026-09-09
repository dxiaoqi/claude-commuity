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
    title: dict.claudeCodeHub.metaTitle,
    description: dict.claudeCodeHub.metaDescription,
    alternates: {
      canonical: `/${locale}/claude-code`,
      languages: Object.fromEntries([
        ...locales.map((l) => [l, `/${l}/claude-code`] as const),
        ["x-default", `/${defaultLocale}/claude-code`] as const,
      ]),
    },
  };
}

export default async function ClaudeCodePage({ params }: Props) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale = rawLocale;
  const base = `/${locale}`;
  const dict = getDictionary(locale);
  const h = dict.claudeCodeHub;

  return (
    <main id="main" className="article-shell shell-width">
      <header className="article-hero code-hero">
        <p className="section-label">{h.kicker}</p>
        <h1>{h.heroLine1}<br /><span>{h.heroLine2}</span></h1>
        <p className="hub-answer">{h.shortAnswer}</p>
      </header>

      <section className="hub-links">
        <h2 className="hub-section-title">{h.hubSectionTitle}</h2>
        <div className="hub-grid">
          <Link href={`${base}/blog/claude-code-claude-md-complete-guide`} className="hub-card">
            <span className="hub-card-tag">{h.tagGuide}</span>
            <h3>{h.claudeMdTitle}</h3>
            <p>{h.claudeMdDesc}</p>
          </Link>
          <Link href={`${base}/blog/claude-code-hooks-complete-guide`} className="hub-card">
            <span className="hub-card-tag">{h.tagGuide}</span>
            <h3>{h.hooksTitle}</h3>
            <p>{h.hooksDesc}</p>
          </Link>
          <Link href={`${base}/blog/claude-code-vs-cursor-comparison`} className="hub-card">
            <span className="hub-card-tag">{h.tagComparison}</span>
            <h3>{h.cursorCompareTitle}</h3>
            <p>{h.cursorCompareDesc}</p>
          </Link>
          <Link href={`${base}/lab/mini-claude-code`} className="hub-card">
            <span className="hub-card-tag">{h.tagLab}</span>
            <h3>{h.miniClaudeCodeTitle}</h3>
            <p>{h.miniClaudeCodeDesc}</p>
          </Link>
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
        </div>
      </section>

      <div className="article-layout">
        <aside>
          <p>{h.tocLabel}</p>
          <a href="#context-is-the-product">{h.tocContext}</a>
          <a href="#the-plan-build-verify-loop">{h.tocLoop}</a>
          <a href="#handoff">{h.tocHandoff}</a>
        </aside>
        <article className="prose">
          <section id="context-is-the-product">
            <span className="chapter">01</span>
            <h2>{h.section1Title}</h2>
            <p>{h.section1Text}</p>
            <div className="code-panel">
              <span className="code-label">CLAUDE.md</span>
              <pre>{`## Commands\nnpm run typecheck\nnpm run test\n\n## Boundaries\n- Preserve public APIs\n- Never edit generated files\n\n## Definition of done\n- Types pass\n- Critical path verified`}</pre>
            </div>
          </section>
          <section id="the-plan-build-verify-loop">
            <span className="chapter">02</span>
            <h2>{h.section2Title}</h2>
            <p>{h.section2Text}</p>
            <div className="workflow-strip">
              <span>MAP</span><i>→</i><span>PLAN</span><i>→</i><span>BUILD</span><i>→</i><span>VERIFY</span>
            </div>
          </section>
          <section id="handoff">
            <span className="chapter">03</span>
            <h2>{h.section3Title}</h2>
            <p>{h.section3Text}</p>
          </section>
          <div className="article-cta">
            <h3>{h.ctaTitle}</h3>
            <p>{h.ctaText}</p>
            <NewsletterForm source="claude-code-guide" />
          </div>
        </article>
      </div>
      <Link className="back-link" href={base}>{h.backLink}</Link>
    </main>
  );
}
