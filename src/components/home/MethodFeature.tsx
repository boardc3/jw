import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Capsule, Container, buttonClasses } from "@/components/ui";
import { formatPrice, getProduct } from "@/lib/products";

export function MethodFeature() {
  const lrm = getProduct("the-lymphatic-reset-method")!;
  return (
    <section className="py-16 lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="text-sm font-semibold text-tide">The Lymphatic Reset Method™</p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl">You don&apos;t need a new routine. You need a new two minutes.</h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            A 21-day daily practice built from real physiology: the 12-step sequence that guides fluid in the right
            order, a 2-minute follow-along you press play on every morning, and bonus fascia release and Spleen 9
            techniques for the stubborn days.
          </p>
          <ul className="mt-6 grid gap-3 text-[15px] sm:grid-cols-2">
            {lrm.deliverables.slice(0, 4).map((d) => (
              <li key={d} className="flex gap-2.5">
                <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-matcha-deep" aria-hidden />
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/the-lymphatic-reset-method#pricing" className={buttonClasses("tide", "lg")}>
              Start the reset — {formatPrice(lrm.price)}
            </Link>
            <Link href="/the-lymphatic-reset-method" className="font-semibold text-tide hover:text-tide-deep">
              What&apos;s inside ↗
            </Link>
          </div>
          <p className="mt-3 text-xs text-ink-soft">Instant access · Lifetime updates · Three tiers from $97</p>
        </div>
        <div className="order-1 flex justify-center lg:order-2">
          <Capsule className="aspect-[4/5] w-full max-w-md">
            <Image src={site.images.methodSide} alt="Julia Warter in workout clothes" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
          </Capsule>
        </div>
      </Container>
    </section>
  );
}
