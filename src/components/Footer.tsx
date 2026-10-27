import Link from "next/link";
import { site } from "@/lib/site";
import { goHref } from "@/lib/links";
import { NewsletterForm } from "./NewsletterForm";
import { Logo } from "./Logo";
import { TrackedLink } from "./TrackedLink";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-line bg-shell">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr]">
          <div className="max-w-md">
            <div className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" />
              <span className="font-display text-lg font-semibold tracking-[-0.02em]">Julia Warter Wellness</span>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">
              The 2-minute lymphatic flush, once a week in your inbox — plus what I&apos;m actually eating, testing and
              getting rid of. Written from Costa Mesa, CA.
            </p>
            <NewsletterForm source="footer" cta="Subscribe" className="mt-5" compact />
          </div>

          <nav aria-label="Explore">
            <p className="font-display text-base font-semibold">Explore</p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ink-soft">
              {[...site.nav, ...site.footerNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-display text-base font-semibold">Follow along</p>
            <ul className="mt-4 space-y-2.5 text-[15px] text-ink-soft">
              {site.socials.map((s) => (
                <li key={s.key}>
                  <TrackedLink href={goHref(s.key === "facebook" ? "facebook-group" : s.key, "footer")} className="hover:text-ink">
                    {s.label} <span className="text-ink-soft/70">{s.handle}</span>
                  </TrackedLink>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-ink">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-6 text-xs leading-relaxed text-ink-soft">
          <p>
            Julia is not a doctor, licensed nutritionist or certified lymphatic therapist. Everything here is educational and
            based on her personal experience; it is not medical advice. Please talk with your physician before starting
            any new routine, supplement or cleanse. Some links are affiliate links — Julia may earn a commission at no cost
            to you, and only recommends products she uses herself.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            <span>© {year} Julia Warter Wellness</span>
            {site.legalNav.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-ink">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
