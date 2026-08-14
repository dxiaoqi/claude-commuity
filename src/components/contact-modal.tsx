"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

interface Props {
  triggerLabel: string;
  title: string;
  caption: string;
  emailHint: string;
  closeLabel: string;
}

export function ContactModal({ triggerLabel, title, caption, emailHint, closeLabel }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" className="footer-contact-trigger" onClick={() => setOpen(true)}>
        {triggerLabel}
      </button>
      {open && (
        <div className="contact-modal-overlay" onClick={() => setOpen(false)}>
          <div className="contact-modal" role="dialog" aria-modal="true" aria-label={title} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="contact-modal-close" aria-label={closeLabel} onClick={() => setOpen(false)}>
              ×
            </button>
            <img className="contact-modal-qr" src="/wechat-qr.png" alt={title} width={280} height={280} />
            <p className="contact-modal-title">{title}</p>
            <p className="contact-modal-caption">{caption}</p>
            <p className="contact-modal-email">
              {emailHint} <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
