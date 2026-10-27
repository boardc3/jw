import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Capsule, buttonClasses } from "@/components/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-24 lg:pt-16">
        <div className="max-w-xl">
          <h1 className="rise text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
            Puffy, heavy and stuck? It might be a <span className="mark-matcha">movement</span> problem, not a food problem.
          </h1>
          <p className="rise rise-delay-1 mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
            Your lymphatic system has no pump of its own. When it stalls, fluid just sits there. I&apos;m Julia — I spent
            eight years and $20,000 chasing my own bloating, liver and gut issues before I found what actually moved the
            needle. Now I teach the 2-minute daily routine that keeps it moving.
          </p>
          <div className="rise rise-delay-2 mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/free" className={buttonClasses("tide", "lg")}>
              Get the free pressure-point guide
            </Link>
            <Link href="/the-lymphatic-reset-method" className={buttonClasses("outline", "lg")}>
              See the Lymphatic Reset Method™
            </Link>
          </div>
          <ul className="rise rise-delay-3 mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <li>
              <strong className="font-semibold text-ink">1.5M views</strong> on the lymphatic drainage video
            </li>
            <li>
              <strong className="font-semibold text-ink">80K+</strong> on TikTok
            </li>
            <li>
              <strong className="font-semibold text-ink">Liver no longer enlarged</strong>, symptoms manageable
            </li>
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <Capsule className="aspect-[3/4] w-full">
            <Image
              src={site.images.heroPortrait}
              alt="Julia Warter smiling outdoors in Costa Mesa"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover"
            />
          </Capsule>
          <div className="absolute -bottom-3 right-2 rounded-card bg-white p-4 shadow-[0_12px_40px_-16px_rgba(16,48,43,0.35)] lg:-right-4">
            <p className="font-display text-sm font-semibold">The 2-minute flush</p>
            <p className="mt-0.5 text-xs text-ink-soft">Shorter than brushing your teeth. Every morning.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
