import Link from "next/link";
import { Icon } from "./icon";

const nav = [
  ["/claude", "Claude"],
  ["/claude-code", "Claude Code"],
  ["/#field-notes", "Field notes"],
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="header-inner shell-width">
        <Link className="brand" href="/" data-track="brand">
          <span className="brand-mark"><Icon name="terminal" size={17} /></span>
          <span>claude<span className="brand-dim">community</span></span>
        </Link>
        <nav aria-label="Main navigation">
          {nav.map(([href, label]) => <Link href={href} key={href} data-track={label.toLowerCase().replace(" ", "-")}>{label}</Link>)}
        </nav>
        <Link className="header-cta" href="#join" data-track="join-waitlist">Join waitlist <Icon name="arrow" size={14} /></Link>
      </div>
    </header>
  );
}
