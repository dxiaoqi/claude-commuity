import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Claude field guide",
  description: "Practical patterns for research, writing, analysis, and reliable knowledge work with Claude.",
  alternates: { canonical: "/claude" },
};

export default function ClaudePage() {
  return <main id="main" className="article-shell shell-width">
    <header className="article-hero"><p className="section-label">{"// FIELD GUIDE 01"}</p><h1>Claude, without<br /><span>the magic tricks.</span></h1><p>A practical guide to better context, sharper instructions, and outputs you can actually use.</p></header>
    <div className="article-layout">
      <aside><p>IN THIS GUIDE</p><a href="#prompt-as-interface">Prompt as interface</a><a href="#context">Context engineering</a><a href="#verification">Verification loops</a></aside>
      <article className="prose">
        <section id="prompt-as-interface"><span className="chapter">01</span><h2>Prompt as interface</h2><p>A good prompt is not an incantation. It is an interface between your intent and a model: the job, the available context, the constraints, and the shape of a useful result.</p><div className="code-panel"><span className="code-label">A durable prompt shape</span><pre>{`Job       → what Claude owns\nContext   → what is true here\nConstraints → what must not change\nOutput    → the artifact you need\nCheck     → how to know it is good`}</pre></div></section>
        <section id="context"><span className="chapter">02</span><h2>Context is a design decision</h2><p>More context is not automatically better. Give Claude the smallest complete world it needs: source material, audience, examples, and the decisions already made.</p></section>
        <section id="verification"><span className="chapter">03</span><h2>Ask for evidence, not confidence</h2><p>Separate creation from checking. Have Claude identify assumptions, cite the supplied material, and describe what it could not verify.</p></section>
        <div className="article-cta"><h3>One sharp workflow per issue.</h3><NewsletterForm source="claude-guide" /></div>
      </article>
    </div>
    <Link className="back-link" href="/">← Back to the workbench</Link>
  </main>;
}
