import { BloatQuiz } from "@/components/BloatQuiz";
import { Container, JsonLd, SectionHeading } from "@/components/ui";
import { breadcrumbJsonLd, pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "What's causing your bloat? A 2-minute quiz",
  description:
    "Six questions to figure out whether your bloating is a movement problem, a food trigger, or something your doctor should look at — with the exact post or routine to start with.",
  path: "/quiz",
});

export default function QuizPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Bloat quiz", path: "/quiz" }])} />
      <section>
        <Container className="max-w-3xl pb-20 pt-10 lg:pt-16">
          <SectionHeading
            as="h1"
            title="What's actually causing your bloat?"
            intro="Six questions, two minutes. I'll point you to the one thing to start with — a routine, a tracker, or a question to bring to your doctor."
          />
          <div className="mt-10">
            <BloatQuiz />
          </div>
          <p className="mt-6 text-xs text-ink-soft">For education only; not a diagnosis. If you have persistent pain, blood in your stool, unexplained weight loss or fever, please see a doctor.</p>
        </Container>
      </section>
    </>
  );
}
