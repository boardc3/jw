"use client";

import { useEffect, useState } from "react";
import { BuyButton } from "./BuyButton";

/** Appears after the visitor scrolls past the hero; hides when the pricing section is in view. */
export function StickyBuyBar({ product, tier, price, name }: { product: string; tier?: string; price: string; name: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const pricing = document.getElementById("pricing");
    let pricingVisible = false;
    const io = pricing
      ? new IntersectionObserver(([e]) => {
          pricingVisible = e.isIntersecting;
          setShow(window.scrollY > 600 && !pricingVisible);
        })
      : null;
    if (pricing && io) io.observe(pricing);
    const onScroll = () => setShow(window.scrollY > 600 && !pricingVisible);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/95 backdrop-blur transition-transform duration-300 ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <div className="min-w-0">
          <p className="truncate font-display text-sm font-semibold sm:text-base">{name}</p>
          <p className="text-xs text-ink-soft">{price} · instant access</p>
        </div>
        <BuyButton product={product} tier={tier} source="sticky-bar" label="Get instant access" size="md" className="w-auto shrink-0" />
      </div>
    </div>
  );
}
