import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell-width footer-grid">
        <div>
          <div className="footer-brand">CC_<span className="cursor" /></div>
          <p>Independent field notes for Claude builders.</p>
        </div>
        <div className="footer-links">
          <Link href="/claude">Claude</Link>
          <Link href="/claude-code">Claude Code</Link>
          <Link href="/privacy">Privacy</Link>
          <a href={`mailto:${siteConfig.email}`}>Contact</a>
        </div>
      </div>
      <div className="shell-width footer-bottom">
        <span>© {new Date().getFullYear()} Claude Community</span>
        <span>Independent. Not affiliated with Anthropic.</span>
      </div>
    </footer>
  );
}
