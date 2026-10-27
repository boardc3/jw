import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Disclaimer", description: "Medical and affiliate disclaimer for Julia Warter Wellness.", path: "/disclaimer" });

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer" updated="October 27, 2026">
      <h2>Not medical advice</h2>
      <p>
        Julia Warter is not a physician, licensed nutritionist, registered dietitian or certified lymphatic therapist. The
        content on this website, in the Lymphatic Reset Method™, in coaching sessions, in emails and on social media is
        educational and reflects Julia&apos;s personal experience and research. It is not medical advice and is not intended
        to diagnose, treat, cure or prevent any disease or condition.
      </p>
      <p>
        Always consult your physician or another qualified health provider before starting any new routine, supplement,
        cleanse, fast or diet — especially if you are pregnant or breastfeeding, have a heart, kidney or liver condition,
        an active infection, a history of blood clots, or any diagnosed medical condition. Never disregard professional
        medical advice or delay seeking it because of something you read here.
      </p>
      <p>
        Lymphatic drainage and acupressure techniques can produce temporary responses such as fatigue, mild headache or
        increased urination as fluid moves. Stop and seek care if you experience pain, dizziness or anything unusual.
        Individual results vary; nothing on this site is a guarantee of any outcome.
      </p>
      <h2>Affiliate disclosure</h2>
      <p>
        Some links on this site are affiliate or referral links. If you buy through them, Julia may earn a commission at no
        additional cost to you. Julia only recommends products she personally uses and will say when something is not worth
        the money. Discount codes are set by each brand and may change or expire without notice. As an Amazon Associate,
        Julia earns from qualifying purchases.
      </p>
      <h2>Sponsored content</h2>
      <p>
        Posts and videos created in partnership with a brand are labeled as sponsored. Opinions remain Julia&apos;s own.
      </p>
      <h2>Questions</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
