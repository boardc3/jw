import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Conventional static-first rendering (generateStaticParams + ISR) keeps the
  // Vercel deploy simple and predictable for a content/commerce site.
  cacheComponents: false,
  partialPrefetching: false,
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "static1.squarespace.com" },
      { protocol: "https", hostname: "assets.stanwith.me" },
    ],
  },
  async redirects() {
    return [
      // Legacy Squarespace URLs → new structure (preserves inbound links + SEO equity)
      { source: "/lets-work-together", destination: "/work-with-me", permanent: true },
      { source: "/cart", destination: "/shop", permanent: true },
      { source: "/the-lymphatic-reset-method/", destination: "/the-lymphatic-reset-method", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
