/**
 * Native storefront catalog. Prices are in USD cents.
 * `stripePriceId` is read from env so the same catalog works in test and live mode.
 * `fallbackUrl` is the existing Stan listing — used only if Stripe isn't configured yet.
 */
import { site } from "./site";

export type ProductKind = "course" | "coaching" | "free";

export interface Tier {
  id: string;
  name: string;
  shortName: string;
  price: number; // cents
  compareAt?: number; // cents, optional strike-through
  blurb: string;
  includes: string[];
  highlight?: boolean;
  stripePriceEnv: string; // name of env var holding the Stripe price id
}

export interface Product {
  slug: string;
  kind: ProductKind;
  name: string;
  tagline: string;
  description: string;
  image: string;
  imageAlt: string;
  price: number; // cents; 0 for free
  tiers?: Tier[];
  fallbackUrl?: string;
  seoTitle: string;
  seoDescription: string;
  deliverables: string[];
  faqs: { q: string; a: string }[];
}

export const products: Product[] = [
  {
    slug: "the-lymphatic-reset-method",
    kind: "course",
    name: "The Lymphatic Reset Method™",
    tagline: "A 21-day daily practice to clear stagnant fluid, soothe bloating and support natural drainage.",
    description:
      "Your lymphatic system has no pump of its own — it only moves when you move. The Lymphatic Reset Method™ is the 2-minute daily sequence Julia built for her own puffy mornings and heavy legs, turned into a step-by-step program you can press play on before your coffee is done.",
    image: site.images.methodHero,
    imageAlt: "Julia Warter smiling outdoors in black athleisure",
    price: 29700,
    seoTitle: "The Lymphatic Reset Method™ — 2-Minute Daily Lymphatic Drainage Routine",
    seoDescription:
      "Julia Warter's 21-day Lymphatic Reset Method™: a 12-step, 2-minute follow-along lymphatic drainage sequence plus fascia release and acupressure bonuses to ease bloat and puffiness.",
    deliverables: [
      "The 12-step LRM™ sequence — the exact order and light touch that guides fluid movement safely",
      "A 2-minute follow-along video you can do every morning, zero guesswork",
      "Six modules covering the science of fluid movement, your baseline, and your tools",
      "Bonus toolkit: abdominal fascia release and the Spleen 9 acupressure point",
      "Lifetime access and every future update",
      "A private community of people doing the reset alongside you",
    ],
    // TODO(client): Stan lists the Method at $297. Diet ($97) and Ultimate ($397) tier
    // prices are placeholders from the Aug-21 launch post's 3-tier structure — confirm with Julia.
    tiers: [
      {
        id: "diet",
        name: "The Lymphatic Reset Diet™",
        shortName: "the Diet",
        price: 9700,
        blurb: "Nutrition only. The exact foods, principles and strategies that support drainage from the inside out.",
        includes: ["Lymphatic Reset Diet™ guide", "Anti-inflammatory food lists", "7-day sample menu", "Lifetime access"],
        stripePriceEnv: "STRIPE_PRICE_LRM_DIET",
      },
      {
        id: "method",
        name: "The Lymphatic Reset Method™",
        shortName: "the Method",
        price: 29700,
        blurb: "The complete 21-day drainage program — the 12-step sequence, the 2-minute daily video and the six modules.",
        includes: [
          "12-step LRM™ sequence",
          "2-minute daily follow-along video",
          "6 modules: science, baseline, tools, method",
          "Bonus fascia release + Spleen 9 toolkit",
          "Private community",
          "Lifetime access",
        ],
        highlight: true,
        stripePriceEnv: "STRIPE_PRICE_LRM_METHOD",
      },
      {
        id: "ultimate",
        name: "The Ultimate Lymphatic Reset™",
        shortName: "Ultimate",
        price: 39700,
        blurb: "Everything in the Diet and the Method, plus guided meditations for cellular flush and complete lifestyle routines.",
        includes: [
          "Everything in the Diet + the Method",
          "Guided cellular-flush meditations",
          "Morning and evening lifestyle routines",
          "Acupressure point library",
          "Priority Q&A in the community",
          "Lifetime access",
        ],
        stripePriceEnv: "STRIPE_PRICE_LRM_ULTIMATE",
      },
    ],
    fallbackUrl: site.stan.lrm,
    faqs: [
      {
        q: "How long does the routine take each day?",
        a: "Two minutes. There is a longer version for days you want to go deeper, but the daily practice is designed to be shorter than brushing your teeth so you actually keep it.",
      },
      {
        q: "Do I need any equipment?",
        a: "No. The core sequence is hands-only. The bonus fascia release uses a small ball you may already own; a link to Julia's favorite is included.",
      },
      {
        q: "Is this safe if I have a medical condition?",
        a: "The program is educational, not medical advice. Julia is self-taught and not a doctor or certified lymphatic therapist. Please check with your physician before starting, especially if you are pregnant, have a heart or kidney condition, active infection, or a history of blood clots.",
      },
      {
        q: "When do I get access?",
        a: "Immediately. Your login link arrives by email within a few minutes of checkout, and you keep access for life, including every update.",
      },
      {
        q: "What if it isn't for me?",
        a: "Email contactjuliawarter@gmail.com within 7 days of purchase and we'll make it right.",
      },
    ],
  },
  {
    slug: "coaching",
    kind: "coaching",
    name: "1:1 Gut & Lymphatic Reset Coaching",
    tagline: "A personalized session to build your daily lymphatic flow routine, calm your gut and reclaim your energy.",
    description:
      "If you've been struggling with endless bloating, severe water retention, food sensitivities and unpredictable digestion, you're not alone. In a private call, Julia walks you through the practical tools, daily routines and lifestyle strategies that transformed her health — tailored to your schedule and goals.",
    image: site.images.coaching,
    imageAlt: "Julia Warter in workout clothes outdoors",
    price: 24900,
    fallbackUrl: site.stan.coaching,
    seoTitle: "1:1 Gut & Lymphatic Coaching with Julia Warter",
    seoDescription:
      "Book a private 1:1 coaching call with Julia Warter to build a daily lymphatic flow routine, gentle anti-inflammatory nutrition and gut-calming habits tailored to you.",
    deliverables: [
      "Daily lymphatic flow routine: self-massage, gentle drainage and movement for stubborn water retention",
      "Gentle, anti-inflammatory nutrition: navigating food sensitivities without triggering flare-ups",
      "Nervous system and gut support: habits and stress-reduction protocols that calm digestion",
      "A personalized action plan built around your current lifestyle, schedule and goals",
    ],
    faqs: [
      {
        q: "How long is the call?",
        a: "60 minutes over video. You'll get a written action plan within 48 hours afterward.",
      },
      {
        q: "Is Julia a doctor or nutritionist?",
        a: "No. Julia is not a doctor, licensed nutritionist or certified lymphatic specialist and does not diagnose, treat or cure medical conditions. Coaching is for people who want practical, non-invasive daily habits that support the body's natural digestive and lymphatic processes.",
      },
      {
        q: "Who is this for?",
        a: "Anyone ready to take an active, holistic role in their daily wellness — especially if you're dealing with bloating, puffiness, water retention or IBS and want a plan you'll actually follow.",
      },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);

export const formatPrice = (cents: number, currency = "USD") =>
  new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: cents % 100 === 0 ? 0 : 2 }).format(
    cents / 100,
  );
