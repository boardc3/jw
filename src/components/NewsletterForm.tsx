"use client";

import { useState, type FormEvent } from "react";
import { trackClient } from "@/lib/tracking";
import { buttonClasses } from "./ui";

type State = "idle" | "loading" | "done" | "error";

export function NewsletterForm({
  source,
  tags,
  cta = "Send me the routine",
  placeholder = "Your email",
  withName = false,
  compact = false,
  tone = "tide",
  successTitle = "Check your inbox",
  successBody = "The 2-minute lymphatic flush is on its way. Add contactjuliawarter@gmail.com to your contacts so it doesn't land in spam.",
  className = "",
}: {
  source: string;
  tags?: string[];
  cta?: string;
  placeholder?: string;
  withName?: boolean;
  compact?: boolean;
  tone?: "tide" | "matcha" | "white";
  successTitle?: string;
  successBody?: string;
  className?: string;
}) {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("loading");
    setError("");
    try {
      const r = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          firstName: String(data.get("firstName") ?? "") || undefined,
          website: String(data.get("website") ?? ""),
          source,
          tags,
        }),
      });
      const j = (await r.json()) as { ok: boolean; error?: string };
      if (!r.ok || !j.ok) throw new Error(j.error ?? "Something went wrong.");
      trackClient({ event: "newsletter_subscribe", source });
      setState("done");
      form.reset();
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (state === "done") {
    return (
      <div className={`rounded-card border border-matcha-deep/40 bg-matcha/25 p-5 ${className}`} role="status">
        <p className="font-display text-xl font-semibold">{successTitle}</p>
        <p className="mt-1 text-sm text-ink-soft">{successBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={`${className}`} noValidate>
      <div className={`flex ${compact ? "flex-row" : "flex-col sm:flex-row"} gap-2`}>
        {withName && !compact ? (
          <input
            name="firstName"
            type="text"
            autoComplete="given-name"
            placeholder="First name"
            className="h-12 flex-1 rounded-pill border border-line bg-white px-5 text-base outline-none placeholder:text-ink-soft/70 focus:border-tide"
          />
        ) : null}
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={placeholder}
          aria-label="Email address"
          className="h-12 min-w-0 flex-[2] rounded-pill border border-line bg-white px-5 text-base outline-none placeholder:text-ink-soft/70 focus:border-tide"
        />
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
        <button type="submit" disabled={state === "loading"} className={buttonClasses(tone, "md", "h-12 shrink-0 disabled:opacity-60")}>
          {state === "loading" ? "Sending…" : cta}
        </button>
      </div>
      {state === "error" ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : (
        <p className="mt-2 text-xs text-ink-soft">No spam. Unsubscribe any time.</p>
      )}
    </form>
  );
}
