import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Claude Code guides, comparisons, and workflows",
  description: "In-depth guides on Claude Code, CLAUDE.md, hooks, comparisons with Cursor and Copilot, and practical workflows for engineers using Claude.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Claude Community",
    description: "Field-tested Claude Code guides, comparisons, and workflows.",
  },
};

const TAG_LABELS: Record<string, string> = {
  "claude-code": "Claude Code",
  "comparison": "Comparison",
  "claude-md": "CLAUDE.md",
  "hooks": "Hooks",
  "automation": "Automation",
  "setup": "Setup",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main id="main" className="blog-shell shell-width">
      <header className="blog-header">
        <p className="section-label">{"// FIELD NOTES"}</p>
        <h1>Guides from the<br /><span>workbench.</span></h1>
        <p className="blog-header-sub">
          In-depth articles on Claude Code, workflows, and building with Claude.
          Written from real projects, not documentation.
        </p>
      </header>

      <div className="blog-grid">
        {posts.map((post) => (
          <Link className="blog-card" href={`/blog/${post.slug}`} key={post.slug}>
            <div className="blog-card-top">
              <div className="blog-tags">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="blog-tag">{TAG_LABELS[tag] ?? tag}</span>
                ))}
              </div>
              <span className="blog-read-time">{post.readTime}</span>
            </div>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <div className="blog-card-footer">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </time>
              <span className="blog-read-more">Read →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
