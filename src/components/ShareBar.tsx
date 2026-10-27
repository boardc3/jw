"use client";

import { useState } from "react";

export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const btn = "rounded-pill bg-white px-3.5 py-1.5 text-xs font-semibold ring-1 ring-line hover:ring-tide";

  async function share() {
    if (navigator.share) {
      try {
        await navigator.share({ url, title });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs text-ink-soft">Share</span>
      <button type="button" onClick={share} className={btn}>
        {copied ? "Link copied" : "Copy link"}
      </button>
      <a className={btn} href={`https://www.pinterest.com/pin/create/button/?url=${enc(url)}&description=${enc(title)}`} target="_blank" rel="noopener">
        Pinterest
      </a>
      <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`} target="_blank" rel="noopener">
        Facebook
      </a>
      <a className={btn} href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener">
        X
      </a>
    </div>
  );
}
