import { ContactForm } from "@/components/ContactForm";
import { Container, SectionHeading } from "@/components/ui";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact Julia",
  description: "Get in touch with Julia Warter Wellness for brand partnerships, speaking, press, or a question about the Lymphatic Reset Method™.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section>
      <Container className="grid gap-12 pb-20 pt-10 lg:grid-cols-[0.8fr_1.2fr] lg:pt-16">
        <SectionHeading
          as="h1"
          title="Get in touch"
          intro={
            <>
              Brand partnerships, speaking, press, or a question about the Method. No question is too embarrassing. You can also email{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-tide">
                {site.email}
              </a>
              .
            </>
          }
        />
        <ContactForm defaultType="other" />
      </Container>
    </section>
  );
}
