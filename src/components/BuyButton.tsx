"use client";

import { useState } from "react";
import { trackClient } from "@/lib/tracking";
import { buttonClasses } from "./ui";

export function BuyButton({
  product,
  tier,
  source,
  label,
  tone = "tide",
  size = "lg",
  className = "",
}: {
  product: string;
  tier?: string;
  source: string;
  label: string;
  tone?: "tide" | "matcha" | "white" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function go() {
    setBusy(true);
    setErr("");
    trackClient({ event: "checkout_start", slug: product, tier, source });
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ product, tier, source }),
      });
      const j = (await r.json()) as { url?: string; error?: string };
      if (!j.url) throw new Error(j.error ?? "Checkout isn't available right now.");
      window.location.href = j.url;
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Checkout isn't available right now.");
      setBusy(false);
    }
  }

  return (
    <div className={className}>
      <button type="button" onClick={go} disabled={busy} className={buttonClasses(tone, size, "w-full disabled:opacity-60")}>
        {busy ? "Opening checkout…" : label}
      </button>
      {err ? (
        <p className="mt-2 text-sm text-red-700" role="alert">
          {err}
        </p>
      ) : null}
    </div>
  );
}
