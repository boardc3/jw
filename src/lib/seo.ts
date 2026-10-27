import type { Metadata } from "next";
import { site, absoluteUrl } from "./site";

/** Build consistent page metadata with canonical + OpenGraph + Twitter. */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const image = opts.image ?? absoluteUrl("/opengraph-image");
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: opts.type ?? "website",
      url,
      title: opts.title,
      description: opts.description,
      siteName: site.name,
      locale: site.locale,
      images: [{ url: image, width: 1200, height: 630, alt: opts.title }],
      ...(opts.type === "article"
        ? { publishedTime: opts.publishedTime, modifiedTime: opts.modifiedTime, authors: [site.founder.name], tags: opts.tags }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images: [image],
    },
  };
}

type JsonLd = Record<string, unknown>;

export const personJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": absoluteUrl("/#julia"),
  name: site.founder.name,
  url: site.url,
  jobTitle: site.founder.jobTitle,
  sameAs: site.founder.sameAs,
  image: site.images.aboutPortrait,
  address: { "@type": "PostalAddress", addressLocality: "Costa Mesa", addressRegion: "CA", addressCountry: "US" },
  knowsAbout: ["lymphatic drainage", "fascia release", "gut health", "IBS", "low-FODMAP diet", "liver health"],
});

export const organizationJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": absoluteUrl("/#org"),
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/icon.svg"),
  founder: { "@id": absoluteUrl("/#julia") },
  sameAs: site.founder.sameAs,
  contactPoint: { "@type": "ContactPoint", email: site.email, contactType: "customer support" },
});

export const websiteJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  url: site.url,
  name: site.name,
  publisher: { "@id": absoluteUrl("/#org") },
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: absoluteUrl("/blog?q={search_term_string}") },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbJsonLd = (items: { name: string; path: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(it.path),
  })),
});

export const faqJsonLd = (faqs: { q: string; a: string }[]): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const productJsonLd = (p: {
  name: string;
  description: string;
  image: string;
  path: string;
  priceCents: number;
  lowPriceCents?: number;
  highPriceCents?: number;
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: p.name,
  description: p.description,
  image: p.image,
  url: absoluteUrl(p.path),
  brand: { "@type": "Brand", name: site.name },
  offers:
    p.lowPriceCents && p.highPriceCents
      ? {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: (p.lowPriceCents / 100).toFixed(2),
          highPrice: (p.highPriceCents / 100).toFixed(2),
          offerCount: 3,
          availability: "https://schema.org/InStock",
          url: absoluteUrl(p.path),
        }
      : {
          "@type": "Offer",
          priceCurrency: "USD",
          price: (p.priceCents / 100).toFixed(2),
          availability: "https://schema.org/InStock",
          url: absoluteUrl(p.path),
        },
});

export const articleJsonLd = (a: {
  title: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  tags: string[];
}): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: a.title,
  description: a.description,
  image: a.image ? [a.image] : undefined,
  datePublished: a.datePublished,
  dateModified: a.dateModified ?? a.datePublished,
  author: { "@id": absoluteUrl("/#julia") },
  publisher: { "@id": absoluteUrl("/#org") },
  mainEntityOfPage: absoluteUrl(a.path),
  keywords: a.tags.join(", "),
});
