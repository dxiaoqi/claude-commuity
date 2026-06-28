import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPost } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
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

const TAG_LABELS: Record<string, string> = {
  "claude-code": "Claude Code",
  "comparison": "Comparison",
  "claude-md": "CLAUDE.md",
  "hooks": "Hooks",
  "automation": "Automation",
  "setup": "Setup",
};

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteConfig.url}/blog/${slug}` },
  };

  return (
    <main id="main" className="post-shell shell-width">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="post-breadcrumb">
        <Link href="/blog">← All articles</Link>
      </div>

      <header className="post-header">
        <div className="post-meta-top">
          <div className="blog-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-tag">{TAG_LABELS[tag] ?? tag}</span>
            ))}
          </div>
          <span className="blog-read-time">{post.readTime} read</span>
        </div>
        <h1>{post.title}</h1>
        <p className="post-description">{post.description}</p>
        <time className="post-date" dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </time>
      </header>

      <article className="post-content prose-content">
        <MDXRemote source={post.content} />
      </article>

      <footer className="post-footer">
        <Link className="back-link" href="/blog">← Back to all articles</Link>
      </footer>
    </main>
  );
}
