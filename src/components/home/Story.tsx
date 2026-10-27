import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { Capsule, Container } from "@/components/ui";

export function Story() {
  return (
    <section className="bg-tide py-16 text-white lg:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Capsule className="mx-auto aspect-[3/4] w-full max-w-xs bg-tide-deep lg:max-w-sm">
          <Image src={site.images.greenDrink} alt="Julia Warter holding a green iced drink" fill sizes="(min-width: 1024px) 30vw, 70vw" className="object-cover" />
        </Capsule>
        <div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">At 29 they found a massive pre-cancerous polyp. I had been told it was stress.</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/85">
            <p>
              Years of unexplained symptoms. An enlarged liver, gallbladder sludge, severe IBS. Over $20,000 out of pocket on
              specialists who said “just take Metamucil” and “come back in six weeks.” It took a year of pleading to get the
              colonoscopy that probably saved my life.
            </p>
            <p>
              So I stopped waiting on quick fixes and went looking for root causes — and found the missing piece in
              lymphatic drainage and cellular health. Today my liver is no longer enlarged, my symptoms are manageable,
              and I share every tool that got me here. I&apos;m not a doctor. I&apos;m the friend who already spent the money and
              the years so you don&apos;t have to.
            </p>
          </div>
          <Link href="/about" className="mt-7 inline-flex items-center gap-1 font-semibold text-matcha hover:text-white">
            Read the full story ↗
          </Link>
        </div>
      </Container>
    </section>
  );
}
