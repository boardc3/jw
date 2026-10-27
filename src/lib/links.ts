/**
 * Every outbound link on the site lives here and is served through /go/<slug>.
 * That gives us: one place to update URLs, first-party click tracking,
 * and consistent UTM tagging — instead of sending traffic to Stan untracked.
 *
 * `stanOrder` preserves the order of the original Stan store so /links mirrors it exactly.
 */
export type LinkCategory =
  | "program"
  | "coaching"
  | "gut"
  | "lymphatic"
  | "protein"
  | "storefront"
  | "hair"
  | "fasting"
  | "social";

export interface OutboundLink {
  slug: string; // /go/<slug>
  title: string;
  buttonText: string;
  tagline: string;
  url: string;
  category: LinkCategory;
  code?: string; // discount code to copy
  discount?: string; // e.g. "20% off"
  image?: string;
  stanOrder?: number; // position on the original Stan store, if it was there
  internalHref?: string; // when the destination is now native (e.g. /the-lymphatic-reset-method)
  sponsored?: boolean; // affiliate / referral disclosure
}

export const links: OutboundLink[] = [
  // ---- Items that were on stan.store/juliawarter (in original order) ----
  {
    slug: "lrm",
    title: "The Lymphatic Reset Method™",
    buttonText: "Get the Method",
    tagline: "A 21-day daily practice to clear stagnant fluid, soothe bloating and support natural drainage.",
    url: "https://stan.store/juliawarter/p/the-lymphatic-reset-method",
    internalHref: "/the-lymphatic-reset-method",
    category: "program",
    stanOrder: 2,
  },
  {
    slug: "coaching",
    title: "Book a 1:1 call with Julia",
    buttonText: "Book a 1:1 call",
    tagline: "Looking to reset your gut and lymphatic health? Book a personalized coaching session.",
    url: "https://stan.store/juliawarter/p/book-a-11-call-with-julia-",
    internalHref: "/coaching",
    category: "coaching",
    stanOrder: 4,
  },
  {
    slug: "amazon",
    title: "My Amazon storefront",
    buttonText: "Shop Amazon favorites",
    tagline: "Everything I actually use, in one place.",
    url: "https://a.co/d/0353m5CI",
    category: "storefront",
    stanOrder: 5,
    sponsored: true,
  },
  {
    slug: "shopmy",
    title: "Exclusive deals on my favorite products",
    buttonText: "Open ShopMy",
    tagline: "My holy-grail products and the codes to get them for less.",
    url: "https://shopmy.us/shop/juliawarter?Section_id=101686&tab=collections",
    category: "storefront",
    stanOrder: 6,
    sponsored: true,
  },
  {
    slug: "parasite-cleanse",
    title: "20% off Rogershood parasite cleanse",
    buttonText: "Get 20% off",
    tagline: "The gut refresh that finally explained my bloating.",
    url: "https://rogershood.com/ref/367/",
    category: "gut",
    discount: "20% off",
    stanOrder: 8,
    sponsored: true,
  },
  {
    slug: "organised",
    title: "20% off Organised clean protein",
    buttonText: "Get 20% off",
    tagline: "The only protein I use with IBS, gut issues and a high colon-cancer risk.",
    url: "https://www.organised.co/discount/JULIA?dt_id=2631796",
    category: "protein",
    code: "JULIA",
    discount: "20% off",
    stanOrder: 9,
    sponsored: true,
  },
  {
    slug: "fascia-ball",
    title: "Fascia release ball",
    buttonText: "Shop on Amazon",
    tagline: "My go-to ball for releasing abdominal fascia.",
    url: "https://amzn.markable.ai/11QlB0qOP7",
    category: "lymphatic",
    stanOrder: 13,
    sponsored: true,
  },
  {
    slug: "lymphatic-massager",
    title: "Lymphatic drainage massager",
    buttonText: "Shop on Amazon",
    tagline: "My favorite lymphatic drainage massager — under $40.",
    url: "https://amzn.markable.ai/11QlB0q7ow",
    category: "lymphatic",
    stanOrder: 14,
    sponsored: true,
  },

  // ---- Affiliate codes from blog posts (now surfaced on /favorites) ----
  {
    slug: "fodzyme",
    title: "FODZYME digestive enzyme",
    buttonText: "Get 15% off",
    tagline: "Breaks down FODMAPs so garlic, onion and beans stop wrecking my day.",
    url: "https://partners.fodzyme.com/MINDFULJULIA",
    category: "gut",
    code: "MINDFULJULIA",
    discount: "15% off",
    sponsored: true,
  },
  {
    slug: "modifyhealth",
    title: "ModifyHealth low-FODMAP meals",
    buttonText: "Get 30% off",
    tagline: "IBS-friendly meal delivery that saved my sanity for a year.",
    url: "https://www.modifyhealth.com?rfsn=7485531.1ec889",
    category: "gut",
    code: "JULIA",
    discount: "30% off first order",
    sponsored: true,
  },
  {
    slug: "foodmarble",
    title: "FoodMarble AIRE 2",
    buttonText: "Shop FoodMarble",
    tagline: "The breath tester that told me exactly which foods were causing the bloat.",
    url: "https://foodmarble.com?discount_code=JULIAW",
    category: "gut",
    code: "JULIAW",
    sponsored: true,
  },
  {
    slug: "seed",
    title: "Seed DS-01® Daily Synbiotic",
    buttonText: "Get 25% off",
    tagline: "The only probiotic that survives stomach acid — and the one I actually take.",
    url: "https://seed.com/daily-synbiotic?utm_source=ambassador&utm_medium=instagram&utm_campaign=juliawarter&promo_code=juliaw25",
    category: "gut",
    code: "JULIAW25", // TODO(client): blog shows both "JULIAW25 / 25%" and "JULAW25 / 15%" — confirm which is live
    discount: "25% off first month",
    sponsored: true,
  },
  {
    slug: "nerva",
    title: "Nerva gut-directed hypnotherapy",
    buttonText: "Start free trial",
    tagline: "The app that taught my brain to stop panicking about my gut.",
    url: "https://try.nervaibs.com/start-free-trial-1/?coupon=JULIAWARTER&utm_source=affiliate",
    category: "gut",
    code: "JULIAWARTER",
    sponsored: true,
  },
  {
    slug: "prolon",
    title: "Prolon 5-day fasting mimicking diet",
    buttonText: "Shop Prolon",
    tagline: "Read my brutal review first. Then decide.",
    url: "https://prolonlife.com/JULIA",
    category: "fasting",
    sponsored: true,
  },
  {
    slug: "irestore",
    title: "iRESTORE laser hair-growth system",
    buttonText: "Shop iRESTORE",
    tagline: "My doctors were biopsying my scalp. This is what changed.",
    url: "https://glnk.io/6j47w/julia-warter-fascia-lymphatic2ye",
    category: "hair",
    sponsored: true,
  },
  {
    slug: "collagen",
    title: "Vital Proteins collagen",
    buttonText: "Shop on Amazon",
    tagline: "One ingredient. The protein my IBS actually tolerates in a morning smoothie.",
    url: "https://amzn.to/3qEtwBF",
    category: "protein",
    sponsored: true,
  },
  {
    slug: "massage-gun",
    title: "Massage gun",
    buttonText: "Shop on Amazon",
    tagline: "The one from my lymphatic drainage video — it almost sold out.",
    url: "https://amzn.to/3Ownjje",
    category: "lymphatic",
    sponsored: true,
  },

  // ---- Socials (also tracked so we can see which bio link drives traffic) ----
  { slug: "tiktok", title: "TikTok", buttonText: "TikTok", tagline: "@juliawarter", url: "https://www.tiktok.com/@juliawarter", category: "social" },
  { slug: "instagram", title: "Instagram", buttonText: "Instagram", tagline: "@juliawarter", url: "https://www.instagram.com/juliawarter", category: "social" },
  { slug: "youtube", title: "YouTube", buttonText: "YouTube", tagline: "@JuliaWarter", url: "https://www.youtube.com/@JuliaWarter", category: "social" },
  {
    slug: "facebook-group",
    title: "Facebook community",
    buttonText: "Join the group",
    tagline: "Gut + lymph support group",
    url: "https://www.facebook.com/groups/882275693681980/?ref=share_group_link&mibextid=S66gvF",
    category: "social",
  },
];

export const linkBySlug = (slug: string) => links.find((l) => l.slug === slug);

/** The Stan store, in its original order. */
export const stanMirror = links
  .filter((l) => typeof l.stanOrder === "number")
  .sort((a, b) => (a.stanOrder ?? 0) - (b.stanOrder ?? 0));

/** Affiliate favorites grouped for /favorites */
export const favoriteCategories: { key: LinkCategory; title: string; blurb: string }[] = [
  { key: "lymphatic", title: "Lymphatic & fascia tools", blurb: "What I reach for in the 2-minute routine and on heavy-leg days." },
  { key: "gut", title: "Gut health & IBS", blurb: "The products that let me eat out again without planning my day around a bathroom." },
  { key: "protein", title: "Protein I actually tolerate", blurb: "Short ingredient lists only." },
  { key: "fasting", title: "Fasting & cleanses", blurb: "The experiments I've put my own body through, reviewed honestly." },
  { key: "hair", title: "Hair & skin", blurb: "Because the symptoms don't stop at your gut." },
  { key: "storefront", title: "Full storefronts", blurb: "Everything else, in one place." },
];

export const goHref = (slug: string, source?: string) =>
  source ? `/go/${slug}?src=${encodeURIComponent(source)}` : `/go/${slug}`;
