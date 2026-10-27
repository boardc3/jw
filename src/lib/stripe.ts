import Stripe from "stripe";

let client: Stripe | null = null;

/** Lazily construct the Stripe client so the site builds and runs without keys. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  if (!client) client = new Stripe(key); // SDK pins its own API version
  return client;
}

export const stripeConfigured = () => Boolean(process.env.STRIPE_SECRET_KEY);
