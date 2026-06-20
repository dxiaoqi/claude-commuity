import type { Metadata } from "next";
import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export const metadata: Metadata = {
  title: "Claude Code field manual",
  description: "A practical Claude Code workflow for repository context, planning, implementation, and verification.",
  alternates: { canonical: "/claude-code" },
};

export default function ClaudeCodePage() {
  return <main id="main" className="article-shell shell-width">
    <header className="article-hero code-hero"><p className="section-label">{"// FIELD MANUAL 01"}</p><h1>Claude Code is a<br /><span>context machine.</span></h1><p>Build the environment for good decisions, then let speed be the side effect.</p></header>
    <div className="article-layout">
      <aside><p>IN THIS MANUAL</p><a href="#context-is-the-product">CLAUDE.md</a><a href="#the-plan-build-verify-loop">Plan → build → verify</a><a href="#handoff">Clean handoffs</a></aside>
      <article className="prose">
        <section id="context-is-the-product"><span className="chapter">01</span><h2>Context is the product</h2><p>Your <code>CLAUDE.md</code> should describe the commands, architecture, boundaries, and proof required to finish work. Keep it short enough to stay true.</p><div className="code-panel"><span className="code-label">CLAUDE.md</span><pre>{`## Commands\nnpm run typecheck\nnpm run test\n\n## Boundaries\n- Preserve public APIs\n- Never edit generated files\n\n## Definition of done\n- Types pass\n- Critical path verified`}</pre></div></section>
        <section id="the-plan-build-verify-loop"><span className="chapter">02</span><h2>The plan → build → verify loop</h2><p>Start by mapping what exists. Make the smallest coherent plan. Build within explicit boundaries. Then verify the behavior, not merely the diff.</p><div className="workflow-strip"><span>MAP</span><i>→</i><span>PLAN</span><i>→</i><span>BUILD</span><i>→</i><span>VERIFY</span></div></section>
        <section id="handoff"><span className="chapter">03</span><h2>Leave a clean handoff</h2><p>A useful completion note says what changed, what was verified, and what remains uncertain. It should help the next person move without replaying the entire session.</p></section>
        <div className="article-cta"><h3>Stay close to the tool.</h3><p>Join the first readers of the Claude Code field manual.</p><NewsletterForm source="claude-code-guide" /></div>
      </article>
    </div>
    <Link className="back-link" href="/">← Back to the workbench</Link>
  </main>;
}
