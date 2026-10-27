import type { Metadata, Viewport } from "next";
import "./globals.css";
import { site, absoluteUrl } from "@/lib/site";
import { organizationJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/ui";
import { Analytics } from "@/components/Analytics";
import { ChromeGate } from "@/components/ChromeGate";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.shortName}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder.name, url: site.url }],
  creator: site.founder.name,
  keywords: [
    "lymphatic drainage",
    "lymphatic drainage massage for bloating",
    "fascia release",
    "gut health",
    "IBS bloating",
    "low FODMAP",
    "Lymphatic Reset Method",
    "pressure point for bloating",
    "Julia Warter",
  ],
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [{ url: absoluteUrl("/opengraph-image"), width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  alternates: { canonical: site.url, types: { "application/rss+xml": absoluteUrl("/feed.xml") } },
};

export const viewport: Viewport = {
  themeColor: "#0b5b52",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-tide focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
        <JsonLd data={[personJsonLd(), organizationJsonLd(), websiteJsonLd()]} />
        <Analytics />
      </body>
    </html>
  );
}
