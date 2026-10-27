import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { getStripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";
import { trackServer } from "@/lib/tracking";
import { absoluteUrl } from "@/lib/site";

/**
 * POST /api/checkout  { product, tier? , source? }
 * Creates a Stripe Checkout Session for a native purchase.
 * Falls back to the Stan listing (302 JSON {url}) if Stripe or the price id isn't configured,
 * so the site never shows a dead buy button during the migration.
 */
const Body = z.object({
  product: z.string(),
  tier: z.string().optional(),
  source: z.string().max(80).optional(),
  email: z.string().email().optional(),
});

export async function POST(req: NextRequest) {
  const parsed = Body.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Bad request" }, { status: 400 });
  const { product: slug, tier: tierId, source, email } = parsed.data;

  const product = getProduct(slug);
  if (!product) return NextResponse.json({ error: "Unknown product" }, { status: 404 });

  const tier = product.tiers?.find((t) => t.id === tierId) ?? product.tiers?.find((t) => t.highlight);
  const priceId = tier ? process.env[tier.stripePriceEnv] : process.env[`STRIPE_PRICE_${slug.toUpperCase().replace(/-/g, "_")}`];
  const stripe = getStripe();

  await trackServer({ event: "checkout_start", slug, tier: tier?.id, source, value: (tier?.price ?? product.price) / 100 });

  if (!stripe || !priceId) {
    // Not connected yet → use the existing Stan checkout so no sale is lost.
    if (product.fallbackUrl) return NextResponse.json({ url: product.fallbackUrl, fallback: true });
    return NextResponse.json({ error: "Checkout isn't available yet." }, { status: 503 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    customer_email: email,
    allow_promotion_codes: true,
    automatic_tax: process.env.STRIPE_AUTOMATIC_TAX === "true" ? { enabled: true } : undefined,
    success_url: absoluteUrl(`/thank-you?product=${slug}${tier ? `&tier=${tier.id}` : ""}&session_id={CHECKOUT_SESSION_ID}`),
    cancel_url: absoluteUrl(product.kind === "coaching" ? "/coaching" : `/${slug}#pricing`),
    metadata: { product: slug, tier: tier?.id ?? "", source: source ?? "" },
    consent_collection: { terms_of_service: "required" },
    custom_text: {
      terms_of_service_acceptance: { message: "I understand this is an educational program and not medical advice." },
    },
  });

  return NextResponse.json({ url: session.url });
}
