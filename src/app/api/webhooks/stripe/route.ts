import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

/**
 * Stripe webhook — fulfillment hook.
 * On checkout.session.completed we (1) tag the buyer in the ESP so they get the course access
 * email + onboarding sequence, and (2) forward to an optional fulfillment webhook (Zapier / Make / Kajabi / etc.).
 */
export async function POST(req: NextRequest) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) return NextResponse.json({ error: "Stripe not configured" }, { status: 503 });

  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig ?? "", secret);
  } catch (err) {
    return NextResponse.json({ error: `Webhook signature failed: ${(err as Error).message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const email = session.customer_details?.email ?? session.customer_email ?? undefined;
    const product = session.metadata?.product ?? "";
    const tier = session.metadata?.tier ?? "";

    // 1) Tag in Kit so the purchase automation (access email, onboarding) fires.
    if (email && process.env.KIT_API_KEY && process.env.KIT_PURCHASE_TAG_ID) {
      await fetch(`https://api.convertkit.com/v3/tags/${process.env.KIT_PURCHASE_TAG_ID}/subscribe`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ api_key: process.env.KIT_API_KEY, email, fields: { product, tier } }),
      }).catch(() => undefined);
    }

    // 2) Generic fulfillment webhook.
    if (process.env.FULFILLMENT_WEBHOOK_URL) {
      await fetch(process.env.FULFILLMENT_WEBHOOK_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "purchase",
          email,
          name: session.customer_details?.name,
          product,
          tier,
          amountTotal: session.amount_total,
          currency: session.currency,
          sessionId: session.id,
          ts: new Date().toISOString(),
        }),
      }).catch(() => undefined);
    }
  }

  return NextResponse.json({ received: true });
}
