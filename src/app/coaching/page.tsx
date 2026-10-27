import Image from "next/image";
import { BuyButton } from "@/components/BuyButton";
import { Faq } from "@/components/Faq";
import { Capsule, Container, JsonLd, SectionHeading } from "@/components/ui";
import { formatPrice, getProduct } from "@/lib/products";
import { breadcrumbJsonLd, faqJsonLd, pageMeta, productJsonLd } from "@/lib/seo";

const coaching = getProduct("coaching")!;

export const metadata = pageMeta({
  title: coaching.seoTitle,
  description: coaching.seoDescription,
  path: "/coaching",
  image: coaching.image,
});

export default function CoachingPage() {
  return (
    <>
      <JsonLd
        data={[
          productJsonLd({ name: coaching.name, description: coaching.seoDescription, image: coaching.image, path: "/coaching", priceCents: coaching.price }),
          faqJsonLd(coaching.faqs),
          breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Shop", path: "/shop" }, { name: "1:1 coaching", path: "/coaching" }]),
        ]}
      />
      <section>
        <Container className="grid items-center gap-10 pb-16 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:pb-24 lg:pt-16">
          <div className="max-w-xl">
            <p className="text-sm font-semibold text-tide">1:1 coaching</p>
            <h1 className="mt-3 text-[2.6rem] leading-[1.02] sm:text-6xl">Transform your gut health and reclaim your energy</h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">{coaching.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BuyButton product={coaching.slug} source="coaching-hero" label={`Book a 1:1 call — ${formatPrice(coaching.price)}`} className="sm:w-auto" />
            </div>
            <p className="mt-4 text-sm text-ink-soft">60 minutes over video · written action plan within 48 hours</p>
          </div>
          <Capsule className="mx-auto aspect-[3/4] w-full max-w-sm">
            <Image src={coaching.image} alt={coaching.imageAlt} fill priority sizes="(min-width: 1024px) 35vw, 90vw" className="object-cover" />
          </Capsule>
        </Container>
      </section>

      <section className="bg-shell py-16 lg:py-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading title="My journey, and full disclosure" />
          <div className="prose-jw">
            <p>
              First, an important note: I am not a doctor, a licensed nutritionist or a certified lymphatic specialist. I do
              not diagnose, treat or cure medical conditions.
            </p>
            <p>
              What I am is someone who spent years navigating chronic IBS, MCAS, intense fluid retention and frustrating
              food reactivities. After trial and error, research, and learning how to truly listen to my body, I was able to
              calm my nervous system, support my lymphatic flow and heal my gut from the inside out.
            </p>
            <p>
              Now I pass along the practical tools, daily routines and lifestyle strategies that transformed my health so you
              can skip the guesswork and start feeling better in your own skin.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container>
          <SectionHeading title="What we'll focus on together" />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {coaching.deliverables.map((d) => {
              const [head, ...rest] = d.split(": ");
              return (
                <li key={d} className="rounded-card bg-white p-6 ring-1 ring-line/60">
                  <h3 className="text-xl">{head}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{rest.join(": ")}</p>
                </li>
              );
            })}
          </ul>
          <div className="mt-10 rounded-card bg-tide p-8 text-white sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl">Is this right for you?</h2>
              <p className="mt-2 max-w-xl text-white/85">
                Designed for anyone ready to take an active, holistic role in their daily wellness — learning practical,
                non-invasive habits that support the body&apos;s natural digestive and lymphatic processes.
              </p>
            </div>
            <BuyButton product={coaching.slug} source="coaching-mid" label={`Book — ${formatPrice(coaching.price)}`} tone="matcha" className="mt-6 sm:mt-0 sm:w-auto" />
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading title="Questions" />
          <Faq items={coaching.faqs} />
        </Container>
      </section>
    </>
  );
}
