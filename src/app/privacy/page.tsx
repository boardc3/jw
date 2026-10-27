import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Privacy policy", description: "How Julia Warter Wellness collects and uses your information.", path: "/privacy" });

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" updated="October 27, 2026">
      <p>
        This policy explains what information Julia Warter Wellness (&ldquo;we&rdquo;) collects when you use{" "}
        {site.url.replace("https://", "")}, and how we use it.
      </p>
      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Email signups.</strong> Your email address, optional first name, where on the site you signed up, and any
          quiz result you chose to receive by email. These are stored with our email service provider.
        </li>
        <li>
          <strong>Purchases.</strong> Checkout is processed by Stripe. We receive your name, email, the product purchased and
          the amount paid. We never see or store full card numbers.
        </li>
        <li>
          <strong>Contact form.</strong> What you submit, so we can reply.
        </li>
        <li>
          <strong>Usage data.</strong> Pages viewed, outbound links clicked and approximate location, collected through
          privacy-respecting analytics and, if enabled, Google Analytics, Meta Pixel and TikTok Pixel for measuring ads.
        </li>
      </ul>
      <h2>How we use it</h2>
      <ul>
        <li>To send you the guides, newsletter and program access you asked for. You can unsubscribe from any email in one click.</li>
        <li>To deliver purchases and provide support.</li>
        <li>To understand which content and links are useful, and to measure advertising.</li>
      </ul>
      <h2>Sharing</h2>
      <p>
        We share data only with the service providers needed to run the site (email, payments, hosting, analytics), and
        never sell it. Affiliate partners receive only the fact that a click came from this site.
      </p>
      <h2>Cookies</h2>
      <p>We use essential cookies for checkout and, where enabled, analytics and advertising cookies. You can block these in your browser.</p>
      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct or delete your personal information at any time by emailing{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. California residents have additional rights under the CCPA, including the
        right to know what we collect and to opt out of any sale (we do not sell data).
      </p>
      <h2>Children</h2>
      <p>This site is not directed to children under 16 and we do not knowingly collect their information.</p>
      <h2>Changes</h2>
      <p>We will post any changes here with a new date.</p>
    </LegalPage>
  );
}
