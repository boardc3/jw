/**
 * Single source of truth for brand, URLs, nav, and socials.
 * Everything else imports from here so a rename or new handle is a one-line change.
 */
export const site = {
  name: "Julia Warter Wellness",
  shortName: "Julia Warter",
  tagline: "Lymphatic drainage, fascia release & gut health",
  description:
    "Julia Warter shares science-backed lymphatic drainage, fascia release and gut-health habits from her own journey through IBS, liver and gallbladder issues. Beat bloat, reclaim your energy and heal from the inside out.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.juliawarter.com",
  locale: "en_US",
  email: "contactjuliawarter@gmail.com",
  location: "Costa Mesa, CA",
  founder: {
    name: "Julia Warter",
    jobTitle: "Wellness creator & lymphatic health educator",
    sameAs: [
      "https://www.tiktok.com/@juliawarter",
      "https://www.instagram.com/juliawarter",
      "https://www.youtube.com/@JuliaWarter",
      "https://www.facebook.com/profile.php?id=61555705207648",
    ],
  },
  socials: [
    { label: "TikTok", handle: "@juliawarter", href: "https://www.tiktok.com/@juliawarter", key: "tiktok" },
    { label: "Instagram", handle: "@juliawarter", href: "https://www.instagram.com/juliawarter", key: "instagram" },
    { label: "YouTube", handle: "@JuliaWarter", href: "https://www.youtube.com/@JuliaWarter", key: "youtube" },
    { label: "Facebook", handle: "Julia Warter Wellness", href: "https://www.facebook.com/profile.php?id=61555705207648", key: "facebook" },
    {
      label: "Facebook group",
      handle: "Gut & lymph community",
      href: "https://www.facebook.com/groups/882275693681980/?ref=share_group_link&mibextid=S66gvF",
      key: "facebook-group",
    },
  ],
  nav: [
    { label: "The Method", href: "/the-lymphatic-reset-method" },
    { label: "Shop", href: "/shop" },
    { label: "Favorites", href: "/favorites" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
    { label: "Work with Julia", href: "/work-with-me" },
  ],
  footerNav: [
    { label: "Free resources", href: "/free" },
    { label: "Take the bloat quiz", href: "/quiz" },
    { label: "1:1 coaching", href: "/coaching" },
    { label: "All my links", href: "/links" },
    { label: "Newsletter", href: "/newsletter" },
    { label: "Support the mission", href: "/donate" },
    { label: "Contact", href: "/contact" },
  ],
  legalNav: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
  // External storefront kept as a safety net until Stripe is connected
  stan: {
    store: "https://stan.store/juliawarter",
    lrm: "https://stan.store/juliawarter/p/the-lymphatic-reset-method",
    coaching: "https://stan.store/juliawarter/p/book-a-11-call-with-julia-",
  },
  images: {
    heroPortrait:
      "https://images.squarespace-cdn.com/content/v1/649cb78b2248c912a1bf38f3/b4b6bf1b-9396-43ff-8a6d-31f01a39e9cf/JULIA-LIDO-28+2.png",
    greenDrink:
      "https://images.squarespace-cdn.com/content/v1/649cb78b2248c912a1bf38f3/35a973f7-4975-406b-8348-bd9ba99d2c90/JULIA-LIDO-44.JPG",
    aboutPortrait:
      "https://images.squarespace-cdn.com/content/v1/649cb78b2248c912a1bf38f3/add0a604-f109-4648-9ae5-999b7612ea47/JULIA-LIDO-20.JPG",
    yogaMat:
      "https://images.squarespace-cdn.com/content/v1/649cb78b2248c912a1bf38f3/22a38dbe-5ad9-48fb-b1a5-06f54b628c0d/JULIA-LIDO-57.JPG",
    medicineBall:
      "https://images.squarespace-cdn.com/content/v1/649cb78b2248c912a1bf38f3/6df64a37-da92-402c-83c5-e61cc1bf38b0/JULIA-LIDO-5.JPG",
    methodHero:
      "https://images.squarespace-cdn.com/content/v1/649cb78b2248c912a1bf38f3/59a7b59a-4a22-4a70-b7c2-ed059d20a812/JULIA-LIDO-37+2.png",
    methodSide:
      "https://images.squarespace-cdn.com/content/v1/649cb78b2248c912a1bf38f3/6062690f-4007-41d4-b3cd-10f776a17cf8/JULIA-LIDO-53+2.JPG",
    workWith:
      "https://images.squarespace-cdn.com/content/v1/649cb78b2248c912a1bf38f3/f2a24d59-315e-4854-86f2-906127a03c09/JULIA-LIDO-44+2.JPG",
    coaching: "https://assets.stanwith.me/live/msc/26851499/pfl83/julialido14.jpg",
  },
} as const;

export const absoluteUrl = (path = "/") => new URL(path, site.url).toString();
