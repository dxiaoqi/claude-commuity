import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy", description: "How Claude Community collects and uses website and newsletter data.", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return <main id="main" className="article-shell shell-width"><header className="article-hero"><p className="section-label">{"// PLAIN-LANGUAGE POLICY"}</p><h1>Privacy,<br /><span>without fog.</span></h1><p>Last updated June 20, 2026.</p></header><article className="prose" style={{ maxWidth: 760 }}>
    <section><h2>What we collect</h2><p>We collect privacy-friendly page analytics, campaign attribution, and interaction events to understand which guides are useful. If you join the newsletter, we store your email, consent time, signup page, referral data, language, and an anonymized IP fingerprint used for abuse prevention.</p></section>
    <section><h2>Why we collect it</h2><p>We use this data to operate the waitlist, send requested field notes, prevent automated abuse, and learn which search and content experiments help readers.</p></section>
    <section><h2>Your choices</h2><p>You can unsubscribe from any email. To request access or deletion, email privacy@claudecommunity.com. We do not sell personal information.</p></section>
  </article></main>;
}
