"use client";

import { useState } from "react";
import { trackClient } from "@/lib/tracking";

export function CopyCode({ code, slug }: { code: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      trackClient({ event: "code_copied", slug, meta: { code } });
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; the code is still visible */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-pill border border-dashed border-tide/50 bg-white px-3 py-1 font-mono text-sm font-semibold text-tide hover:bg-matcha/30"
      aria-live="polite"
    >
      <span>{code}</span>
      <span className="text-xs font-body font-medium text-ink-soft">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
