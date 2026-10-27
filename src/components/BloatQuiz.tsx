"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { NewsletterForm } from "./NewsletterForm";
import { buttonClasses } from "./ui";
import { trackClient } from "@/lib/tracking";

type Segment = "puffy" | "food" | "dismissed";

interface Option {
  label: string;
  score: Partial<Record<Segment, number>>;
}
interface Question {
  q: string;
  options: Option[];
}

const questions: Question[] = [
  {
    q: "When is the bloat at its worst?",
    options: [
      { label: "First thing in the morning — my face and hands are puffy", score: { puffy: 2 } },
      { label: "Within an hour of eating", score: { food: 2 } },
      { label: "It builds through the day no matter what I eat", score: { puffy: 1, dismissed: 1 } },
      { label: "Randomly — I can't find the pattern", score: { dismissed: 2 } },
    ],
  },
  {
    q: "Which of these sounds most like you?",
    options: [
      { label: "My legs feel heavy and my rings feel snug", score: { puffy: 2 } },
      { label: "Garlic, onion or beans make me look six months pregnant", score: { food: 2 } },
      { label: "I've been told it's IBS or stress and sent home", score: { dismissed: 2 } },
      { label: "I'm sluggish and foggy, not just bloated", score: { puffy: 1, dismissed: 1 } },
    ],
  },
  {
    q: "How much do you move during a typical day?",
    options: [
      { label: "Mostly sitting — desk, car, couch", score: { puffy: 2 } },
      { label: "A workout most days, but still puffy", score: { puffy: 1 } },
      { label: "Plenty; movement isn't my issue", score: { food: 1, dismissed: 1 } },
    ],
  },
  {
    q: "What have you already tried?",
    options: [
      { label: "More water, less salt, dry brushing, detox teas", score: { puffy: 2 } },
      { label: "Cutting foods out — low-FODMAP, dairy-free, gluten-free", score: { food: 2 } },
      { label: "Doctors, labs, maybe a scope — nothing added up", score: { dismissed: 2 } },
      { label: "Honestly, nothing consistent yet", score: { puffy: 1, food: 1 } },
    ],
  },
  {
    q: "Any of these alongside the bloat?",
    options: [
      { label: "Pain under my right ribs, or trouble with fatty meals", score: { dismissed: 2 } },
      { label: "Gas and urgency after specific foods", score: { food: 2 } },
      { label: "Water retention, puffiness, slow mornings", score: { puffy: 2 } },
      { label: "None of these", score: {} },
    ],
  },
  {
    q: "What do you want most right now?",
    options: [
      { label: "A daily routine I'll actually keep", score: { puffy: 2 } },
      { label: "To eat out again without planning around a bathroom", score: { food: 2 } },
      { label: "To understand what's actually going on", score: { dismissed: 2 } },
    ],
  },
];

const results: Record<Segment, { title: string; body: string; cta: { label: string; href: string }; reads: { label: string; href: string }[] }> = {
  puffy: {
    title: "This looks like a movement problem, not a food problem.",
    body: "Your lymphatic system has no pump of its own — when your day is mostly still, fluid sits. That's the puffiness, the heavy legs, the snug rings. The fix isn't another 45-minute routine. It's two minutes a morning that you'll actually keep.",
    cta: { label: "See the Lymphatic Reset Method™", href: "/the-lymphatic-reset-method?src=quiz" },
    reads: [
      { label: "How my lymphatic drainage video broke TikTok", href: "/blog/how-my-lymphatic-drainage-massage-for-weight-loss-video-broke-tiktok" },
      { label: "The fascia ball and massager I use", href: "/favorites#lymphatic" },
    ],
  },
  food: {
    title: "Your bloat has a food trigger — and you don't have to eliminate forever.",
    body: "Reacting to garlic, onion, beans or dairy usually points at FODMAPs. The goal isn't a permanent restriction diet; it's identifying your triggers, then using the right tools to reintroduce the foods you love.",
    cta: { label: "Get the free guide + FODMAP tracker", href: "/free?src=quiz" },
    reads: [
      { label: "The only way to attempt the low-FODMAP diet", href: "/blog/the-only-way-to-attempt-the-low-fodmap-diet" },
      { label: "11 things that dramatically improved my IBS", href: "/blog/top-10-things-that-saved-my-ibs-symptoms" },
      { label: "Fodzyme, FoodMarble & my gut-health codes", href: "/favorites#gut" },
    ],
  },
  dismissed: {
    title: "You've been diagnosed and dismissed. Start with the root cause.",
    body: "Random bloat, right-rib discomfort, trouble with fatty meals and a doctor who says 'manage your stress' is exactly where I was at 29 — before an ultrasound found an enlarged liver and gallbladder sludge. Here's what to read before your next appointment.",
    cta: { label: "Read my story", href: "/about?src=quiz" },
    reads: [
      { label: "Gallbladder attack symptoms vs. IBS", href: "/blog/gallbladder-attack-symptoms-amp-ibs-overlapping-symptoms-amp-misdiagnosis" },
      { label: "Liver health: what changed everything", href: "/blog/liverhealth" },
      { label: "Book a 1:1 call", href: "/coaching?src=quiz" },
    ],
  },
};

export function BloatQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const done = step >= questions.length;

  useEffect(() => {
    trackClient({ event: "quiz_start" });
  }, []);

  const segment = useMemo<Segment>(() => {
    const totals: Record<Segment, number> = { puffy: 0, food: 0, dismissed: 0 };
    answers.forEach((a, i) => {
      const s = questions[i]?.options[a]?.score ?? {};
      (Object.keys(s) as Segment[]).forEach((k) => (totals[k] += s[k] ?? 0));
    });
    return (Object.keys(totals) as Segment[]).sort((a, b) => totals[b] - totals[a])[0];
  }, [answers]);

  useEffect(() => {
    if (done) trackClient({ event: "quiz_complete", meta: { segment } });
  }, [done, segment]);

  if (done) {
    const r = results[segment];
    return (
      <div className="rounded-card bg-white p-6 ring-1 ring-line/60 sm:p-10">
        <p className="text-sm font-semibold text-tide">Your result</p>
        <h2 className="mt-2 text-3xl sm:text-4xl">{r.title}</h2>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{r.body}</p>
        <Link href={r.cta.href} className={buttonClasses("tide", "lg", "mt-6")}>
          {r.cta.label}
        </Link>
        <div className="mt-8 border-t border-line pt-6">
          <p className="font-display font-semibold">Read next</p>
          <ul className="mt-2 space-y-1.5">
            {r.reads.map((x) => (
              <li key={x.href}>
                <Link href={x.href} className="text-tide hover:underline">
                  {x.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-8 rounded-card bg-shell p-5">
          <p className="font-display font-semibold">Want your result and the matching routine by email?</p>
          <NewsletterForm source="quiz" tags={[`quiz:${segment}`, "lead:pressure-points"]} cta="Send it" className="mt-3" />
        </div>
        <button
          type="button"
          onClick={() => {
            setStep(0);
            setAnswers([]);
          }}
          className="mt-6 text-sm font-semibold text-ink-soft hover:text-ink"
        >
          Start over
        </button>
      </div>
    );
  }

  const q = questions[step];
  return (
    <div className="rounded-card bg-white p-6 ring-1 ring-line/60 sm:p-10">
      <div className="flex items-center justify-between text-sm text-ink-soft">
        <span>
          Question {step + 1} of {questions.length}
        </span>
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="font-semibold text-tide">
            Back
          </button>
        ) : null}
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-pill bg-shell">
        <div className="h-full bg-matcha-deep transition-[width] duration-300" style={{ width: `${((step + 1) / questions.length) * 100}%` }} />
      </div>
      <h2 className="mt-6 text-2xl sm:text-3xl">{q.q}</h2>
      <div className="mt-6 grid gap-3">
        {q.options.map((o, i) => (
          <button
            key={o.label}
            type="button"
            onClick={() => {
              setAnswers((a) => {
                const next = [...a];
                next[step] = i;
                return next;
              });
              setStep((s) => s + 1);
            }}
            className="rounded-[14px] border border-line bg-mist px-5 py-4 text-left text-[15px] font-medium transition-colors hover:border-tide hover:bg-white"
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
