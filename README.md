# juliawarter.com — rebuild

Next.js 16 (App Router) + TypeScript + Tailwind 4. Replaces the Squarespace site and the Stan link-in-bio with one
owned, tracked funnel: social → `/links` → free guide / quiz → Lymphatic Reset Method™ (native Stripe checkout) → blog + newsletter retention.

## Run locally

```bash
npm install
cp .env.example .env.local   # optional — the site runs with no keys at all
npm run dev                  # http://localhost:3000
```

With no env vars set: pages render, the newsletter/contact forms succeed in dev (logged to console), Buy buttons fall back to the existing Stan checkout, and `/go/*` redirects still work. Nothing is dead during the migration.

## Deploy to Vercel

1. Push to GitHub (`boardc3/jw`), then **Vercel → Add New → Project → Import** the repo. Framework is auto-detected; no extra config.
2. Add the env vars from `.env.example` in **Settings → Environment Variables** (Production + Preview).
3. Point `www.juliawarter.com` at Vercel, keep the apex redirecting to `www`.
4. In Stripe, add a webhook for `https://www.juliawarter.com/api/webhooks/stripe` on `checkout.session.completed` and paste the signing secret into `STRIPE_WEBHOOK_SECRET`.
5. Update TikTok / Instagram / YouTube bio links to `https://www.juliawarter.com/links`.

## Site map

| Route | Purpose |
| --- | --- |
| `/` | Conversion home: symptom-keyed "start here", LRM feature, story, free-guide capture, favorites, latest posts, quiz CTA |
| `/the-lymphatic-reset-method` | Long-form sales page, 3-tier pricing, FAQ (schema), sticky buy bar |
| `/coaching` | 1:1 Gut & Lymphatic Reset Coaching ($249) |
| `/shop` | Native storefront index |
| `/favorites` | Every affiliate product + discount code, grouped, with copy-to-clipboard |
| `/links` | Link-in-bio page mirroring the Stan store (chrome-free, `noindex`) |
| `/free` | Lead magnets (pressure points, 2-minute flush, FODMAP tracker) |
| `/quiz` | 6-question bloat quiz → segment → offer + email capture (`quiz:<segment>` tag) |
| `/blog`, `/blog/[slug]`, `/blog/tag/[tag]` | 22 migrated posts, search, tags, TOC, related posts, in-article capture |
| `/about`, `/work-with-me`, `/contact`, `/newsletter`, `/donate` | Supporting pages |
| `/privacy`, `/terms`, `/disclaimer` | Legal + FTC affiliate + medical disclaimers |
| `/go/[slug]` | **Tracked outbound redirect** for every external link (UTM-tagged; logs to `CLICK_WEBHOOK_URL`) |
| `/api/checkout` | Creates a Stripe Checkout Session (falls back to Stan if unconfigured) |
| `/api/webhooks/stripe` | Fulfillment: tags buyer in Kit + forwards to `FULFILLMENT_WEBHOOK_URL` |
| `/api/newsletter`, `/api/contact`, `/api/track` | Form + event endpoints |
| `/sitemap.xml`, `/robots.txt`, `/feed.xml`, `/opengraph-image`, `/manifest.webmanifest` | SEO infra |

Legacy URLs (`/lets-work-together`, `/cart`) 308-redirect in `next.config.ts`.

## Where things live

- `src/lib/site.ts` — brand, nav, socials, image URLs (one place to change)
- `src/lib/products.ts` — LRM tiers + coaching; prices in cents; Stripe price ids come from env
- `src/lib/links.ts` — **every outbound link** (Stan mirror order, affiliate codes). Add a row here and it appears on `/links`, `/favorites`, and gets a `/go/<slug>` route automatically
- `src/lib/blog.ts` — markdown loader (gray-matter + remark/rehype), tags, related posts
- `content/blog/*.md` — posts with frontmatter (`title, slug, date, excerpt, cover, coverAlt, tags, featured`)
- `content/brand-brief.md` — voice/audience/SEO research that informed the copy
- `src/app/globals.css` — design tokens (palette built on her brand teal `#0b5b52` + matcha accent; Bricolage Grotesque display, Manrope body)

## Tracking model

Every external click goes `TrackedLink → /go/<slug>?src=<placement>`. The route logs `{slug, source, referer, ua, category}` server-side (and to `CLICK_WEBHOOK_URL` when set), then 302s with `utm_source=juliawarter.com&utm_medium=referral&utm_content=<placement>&utm_campaign=<slug>` (skipped for Amazon shorteners so affiliate tags survive). Client events (`cta_click`, `checkout_start`, `newsletter_subscribe`, `quiz_complete`, `code_copied`) go to `/api/track` and to GA4 / Vercel Analytics if present. The `src=` values tell you which placement — bio, home, favorites, post, quiz, sticky-bar — actually drives revenue.

## Before launch — confirm with Julia

- Tier prices: Method is $297 (from Stan). **Diet $97 and Ultimate $397 are placeholders.** Set real Stripe prices.
- Seed code: blog shows both `JULIAW25 / 25%` and `JULAW25 / 15%` — pick one in `src/lib/links.ts`.
- iRESTORE link was malformed on Squarespace; repaired to `https://glnk.io/6j47w/julia-warter-fascia-lymphatic2ye`.
- Testimonials on the sales page are the three "Valued Client" quotes from Squarespace — swap for named quotes + photos.
- Lead magnets on `/free` need the actual PDFs/emails built in Kit; the site only captures the email + tag.
- Photos are hot-linked from Squarespace's CDN for review. Download them to `/public` (and update `src/lib/site.ts` + post `cover:` fields) before Squarespace is cancelled.
- Refund language ("7-day make-it-right") is a proposal — align with her policy.

## Scripts

`npm run dev` · `npm run build` · `npm run start` · `npm run lint`
