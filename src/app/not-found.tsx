import Link from "next/link";

export default function NotFound() {
  return <main id="main" className="article-shell shell-width"><header className="article-hero"><p className="section-label">{"// EXIT 404"}</p><h1>Context<br /><span>not found.</span></h1><p>This path is not in the current working tree.</p><Link className="button primary" href="/">Return to the workbench</Link></header></main>;
}
