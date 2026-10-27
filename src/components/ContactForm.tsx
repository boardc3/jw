"use client";

import { useState, type FormEvent } from "react";
import { buttonClasses } from "./ui";

const inputCls =
  "w-full rounded-[14px] border border-line bg-white px-4 py-3 text-base outline-none placeholder:text-ink-soft/60 focus:border-tide";

export function ContactForm({ defaultType = "brand" }: { defaultType?: "brand" | "consulting" | "speaking" | "press" | "other" }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState("loading");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(Object.fromEntries(fd.entries())),
      });
      const j = (await r.json()) as { ok: boolean; error?: string };
      if (!r.ok || !j.ok) throw new Error(j.error ?? "Something went wrong.");
      setState("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-card bg-matcha/25 p-6 ring-1 ring-matcha-deep/40" role="status">
        <p className="font-display text-2xl font-semibold">Got it — thank you.</p>
        <p className="mt-2 text-ink-soft">Julia reads every message herself and usually replies within two business days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Name
          <input name="name" required autoComplete="name" className={inputCls} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          Email
          <input name="email" type="email" required autoComplete="email" className={inputCls} />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-1.5 text-sm font-medium">
          Company or brand
          <input name="company" autoComplete="organization" className={inputCls} />
        </label>
        <label className="grid gap-1.5 text-sm font-medium">
          What is this about?
          <select name="type" defaultValue={defaultType} className={inputCls}>
            <option value="brand">Brand partnership / sponsored content</option>
            <option value="consulting">Social media consulting</option>
            <option value="speaking">Speaking engagement</option>
            <option value="press">Press / podcast</option>
            <option value="other">Something else</option>
          </select>
        </label>
      </div>
      <label className="grid gap-1.5 text-sm font-medium">
        Budget range (optional)
        <select name="budget" defaultValue="" className={inputCls}>
          <option value="">Prefer not to say</option>
          <option value="<500">Under $500</option>
          <option value="500-1500">$500 – $1,500</option>
          <option value="1500-5000">$1,500 – $5,000</option>
          <option value="5000+">$5,000+ / monthly partnership</option>
        </select>
      </label>
      <label className="grid gap-1.5 text-sm font-medium">
        Message
        <textarea name="message" required rows={5} className={inputCls} placeholder="Tell me about the product, the audience you're hoping to reach, and timing." />
      </label>
      <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={state === "loading"} className={buttonClasses("tide", "lg", "disabled:opacity-60")}>
          {state === "loading" ? "Sending…" : "Send message"}
        </button>
        {state === "error" ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}
