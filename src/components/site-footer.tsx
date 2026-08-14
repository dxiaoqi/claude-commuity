import Link from "next/link";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { ContactModal } from "./contact-modal";

interface Props {
  locale: Locale;
  dict: Dictionary;
}

export function SiteFooter({ locale, dict }: Props) {
  const base = `/${locale}`;
  return (
    <footer className="site-footer">
      <div className="shell-width footer-grid">
        <div>
          <div className="footer-brand">CC_<span className="cursor" /></div>
          <p>{dict.footer.tagline}</p>
        </div>
        <div className="footer-links">
          <Link href={`${base}/claude`}>{dict.nav.claude}</Link>
          <Link href={`${base}/claude-code`}>{dict.nav.claudeCode}</Link>
          <Link href={`${base}/privacy`}>Privacy</Link>
          <ContactModal
            triggerLabel={dict.footer.contact}
            title={dict.footer.wechatTitle}
            caption={dict.footer.wechatCaption}
            emailHint={dict.footer.wechatEmailHint}
            closeLabel={dict.footer.close}
          />
        </div>
      </div>
      <div className="shell-width footer-bottom">
        <span>© {new Date().getFullYear()} Claude Community</span>
        <span>{dict.footer.disclaimer}</span>
      </div>
    </footer>
  );
}
