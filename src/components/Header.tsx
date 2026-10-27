"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { buttonClasses } from "./ui";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Close the menu whenever the route changes (derived during render, not in an effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isLinks = pathname === "/links";
  if (isLinks) return null; // link-in-bio page is chrome-free on purpose

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-mist/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
          <Logo className="h-8 w-8" />
          <span className="font-display text-[1.05rem] font-semibold tracking-[-0.02em]">Julia Warter</span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] font-medium transition-colors ${active ? "text-tide" : "text-ink-soft hover:text-ink"}`}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/free" className="hidden text-[15px] font-medium text-ink-soft hover:text-ink md:inline">
            Free routine
          </Link>
          <Link href="/the-lymphatic-reset-method#pricing" className={buttonClasses("tide", "sm", "hidden md:inline-flex")}>
            Get the Method
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-white lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3.5 w-5">
              <span className={`absolute left-0 top-0 h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-1.5 rotate-45" : ""}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-3 h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-mist lg:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-6 sm:px-8" aria-label="Mobile">
            {site.nav.map((item) => (
              <Link key={item.href} href={item.href} className="border-b border-line py-4 font-display text-2xl font-semibold">
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Link href="/the-lymphatic-reset-method#pricing" className={buttonClasses("tide", "lg")}>
                Get the Method
              </Link>
              <Link href="/free" className={buttonClasses("outline", "lg")}>
                Free 2-minute routine
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ink-soft">
              {site.footerNav.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-ink">
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
