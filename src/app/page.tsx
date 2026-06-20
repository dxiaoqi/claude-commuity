import Link from "next/link";
import { Icon } from "@/components/icon";
import { NewsletterForm } from "@/components/newsletter-form";
import { siteConfig } from "@/lib/site";

const notes = [
  { index: "01", tag: "CLAUDE CODE", title: "The context file that actually survives a real codebase", text: "A field-tested CLAUDE.md structure: commands, boundaries, architecture, and the few instructions worth keeping.", href: "/claude-code#context-is-the-product", time: "8 min" },
  { index: "02", tag: "WORKFLOW", title: "Plan mode is not ceremony. It is leverage.", text: "Turn vague work into inspectable decisions before the first file changes. A practical loop for high-trust coding sessions.", href: "/claude-code#the-plan-build-verify-loop", time: "6 min" },
  { index: "03", tag: "CLAUDE", title: "Give the model a job, not a vibe", text: "Prompt patterns for research, writing, and analysis that produce useful artifacts instead of agreeable fog.", href: "/claude#prompt-as-interface", time: "7 min" },
];

const commands = [
  ["/map", "Understand an unfamiliar repository"],
  ["/plan", "Turn intent into a reviewable approach"],
  ["/ship", "Build, verify, and leave a clean handoff"],
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
  };

  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="hero shell-width">
        <div className="eyebrow"><span className="status-dot" /> Independent field notes for Claude builders</div>
        <h1>Less prompting.<br /><span>More shipping.</span></h1>
        <p className="hero-copy">Sharp guides, reusable workflows, and small tools for people doing serious work with Claude and Claude Code.</p>
        <div className="hero-actions">
          <Link className="button primary" href="/claude-code" data-track="explore-claude-code">Explore Claude Code <Icon name="arrow" size={17} /></Link>
          <Link className="text-link" href="#field-notes" data-track="read-field-notes">Read field notes <span>↓</span></Link>
        </div>

        <div className="hero-terminal" aria-label="Claude Code workflow preview">
          <div className="terminal-chrome">
            <div className="terminal-dots"><span /><span /><span /></div>
            <span>claude-commuity — zsh — 96×28</span>
            <span className="terminal-mode">● field mode</span>
          </div>
          <div className="terminal-body">
            <p><span className="terminal-muted">╭────────────────────────────────────────────────────────╮</span></p>
            <p><span className="terminal-muted">│</span> <strong>✦ Claude Code Field Manual</strong> <span className="terminal-muted">{"// issue 001"}</span></p>
            <p><span className="terminal-muted">╰────────────────────────────────────────────────────────╯</span></p>
            <div className="terminal-gap" />
            <p><span className="terminal-accent">❯</span> Map this codebase and tell me what matters.</p>
            <div className="terminal-output">
              <p><span className="terminal-warm">⏺</span> Reading architecture and project conventions…</p>
              <p><span className="terminal-warm">⏺</span> Found <strong>3 leverage points</strong> and <strong>1 risky assumption</strong>.</p>
              <p><span className="terminal-green">✓</span> Context mapped. Ready to plan.</p>
            </div>
            <p className="terminal-last"><span className="terminal-accent">❯</span> <span className="block-cursor" /></p>
          </div>
        </div>
        <div className="hero-meta"><span>No prompt spam</span><span>Built from real workflows</span><span>Updated as the tools change</span></div>
      </section>

      <section className="manifesto">
        <div className="shell-width manifesto-grid">
          <p className="section-label">{"// OUR THESIS"}</p>
          <blockquote>Claude is most useful when the conversation becomes a <em>working system</em>—with context, constraints, tools, and a definition of done.</blockquote>
        </div>
      </section>

      <section className="notes-section shell-width" id="field-notes">
        <div className="section-heading">
          <div><p className="section-label">{"// LATEST FIELD NOTES"}</p><h2>Notes from the workbench.</h2></div>
          <span className="issue-count">03 entries / issue 001</span>
        </div>
        <div className="notes-grid">
          {notes.map((note) => (
            <Link className="note-card" href={note.href} key={note.index} data-track={`note-${note.index}`}>
              <div className="note-top"><span>{note.index}</span><span>{note.tag}</span></div>
              <h3>{note.title}</h3><p>{note.text}</p>
              <div className="note-footer"><span>{note.time}</span><span className="round-arrow"><Icon name="arrow" size={17} /></span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="command-section">
        <div className="shell-width command-grid">
          <div>
            <p className="section-label">{"// THE WORKFLOW"}</p>
            <h2>A better conversation<br />starts with a better loop.</h2>
            <p>Three repeatable moves for turning Claude Code into a calm, inspectable engineering partner.</p>
            <Link className="text-link warm" href="/claude-code" data-track="open-field-manual">Open the field manual <Icon name="arrow" size={16} /></Link>
          </div>
          <div className="command-list">
            {commands.map(([command, label], index) => <div className="command-row" key={command}><span className="command-index">0{index + 1}</span><code>{command}</code><p>{label}</p><Icon name="arrow" size={18} /></div>)}
          </div>
        </div>
      </section>

      <section className="join-section shell-width" id="join">
        <div className="join-panel">
          <div className="join-copy">
            <div className="eyebrow"><span className="status-dot" /> Opening the first cohort</div>
            <h2>Get the useful part.<br /><span>Skip the noise.</span></h2>
            <p>One practical Claude workflow at a time. Early members shape the tools and field notes we build next.</p>
          </div>
          <div className="join-form-wrap">
            <p className="terminal-label">newsletter.init()</p>
            <NewsletterForm source="homepage-bottom" />
            <p className="member-note"><span className="avatars">C_ M_ K_</span> Join the founding readers.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
