"use client";

import { FormEvent, useEffect, useState } from "react";
import { track } from "@/lib/analytics";
import { Icon } from "./icon";

type FormState = "idle" | "loading" | "success" | "error";

export function NewsletterForm({ source = "homepage" }: { source?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    track("newsletter_view", { source });
    const params = new URLSearchParams(window.location.search);
    const joined = params.get("joined");
    const failed = params.get("join_error");
    if (!joined && !failed) return;
    const timer = window.setTimeout(() => {
      setState(joined === "1" ? "success" : "error");
      setMessage(joined === "1" ? "You’re in. Watch your inbox for the first field note." : "The list is temporarily unavailable. Try again soon.");
      window.history.replaceState({}, "", `${window.location.pathname}#join`);
    }, 0);
    return () => window.clearTimeout(timer);
  }, [source]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setState("loading");
    track("newsletter_submit", { source });
    const form = new FormData(formElement);
    const params = new URLSearchParams(window.location.search);
    const payload = {
      email: form.get("email"),
      company: form.get("company"),
      consent: form.get("consent") === "on",
      source,
      landingPage: window.location.pathname,
      referrer: document.referrer,
      locale: navigator.language,
      utmSource: params.get("utm_source"),
      utmMedium: params.get("utm_medium"),
      utmCampaign: params.get("utm_campaign"),
      utmContent: params.get("utm_content"),
      utmTerm: params.get("utm_term"),
    };

    try {
      const response = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || "Something went sideways.");
      setState("success");
      setMessage(result.message);
      track("newsletter_success", { source, duplicate: Boolean(result.duplicate) });
      formElement.reset();
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Try again in a moment.");
      track("newsletter_error", { source });
    }
  }

  return (
    <form className="newsletter-form" method="post" action="/api/newsletter" onSubmit={submit}>
      <input type="hidden" name="source" value={source} />
      <input type="hidden" name="landingPage" value="/" />
      {state === "success" ? (
        <div className="signup-result success" role="status" aria-live="polite">
          <span className="result-icon"><Icon name="check" size={19} /></span>
          <span><strong>Subscription confirmed.</strong><small>{message}</small></span>
        </div>
      ) : (
        <>
          <div className="terminal-input">
            <span className="prompt-sign">$</span>
            <label className="sr-only" htmlFor={`email-${source}`}>Email address</label>
            <input id={`email-${source}`} name="email" type="email" required autoComplete="email" placeholder="join --email you@example.com" disabled={state === "loading"} />
            <input className="honeypot" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button type="submit" disabled={state === "loading"}>
              {state === "loading" ? "Running…" : <>Get early access <Icon name="arrow" size={16} /></>}
            </button>
          </div>
          <label className="consent-row">
            <input name="consent" type="checkbox" required />
            <span>I agree to receive practical Claude notes. Unsubscribe anytime. <a href="/privacy">Privacy</a></span>
          </label>
          {state === "error" && <p className="form-message error" role="alert">{message}</p>}
        </>
      )}
    </form>
  );
}
