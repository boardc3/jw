import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({ title: "Terms of service", description: "Terms for using Julia Warter Wellness and purchasing its programs.", path: "/terms" });

export default function TermsPage() {
  return (
    <LegalPage title="Terms of service" updated="October 27, 2026">
      <p>By using this site or purchasing a program, you agree to these terms.</p>
      <h2>Digital products and coaching</h2>
      <ul>
        <li>The Lymphatic Reset Method™ is a digital program licensed to you for personal, non-commercial use. Access is for one person and may not be shared, resold or redistributed.</li>
        <li>Access is delivered by email after checkout. Lifetime access means for as long as the program is offered, including updates.</li>
        <li>Coaching calls are 60 minutes, scheduled through the link sent after purchase. Reschedule with at least 24 hours&apos; notice; missed calls without notice are forfeited.</li>
      </ul>
      <h2>Refunds</h2>
      <p>
        If the Method is not for you, email <a href={`mailto:${site.email}`}>{site.email}</a> within 7 days of purchase and we will make it right. Coaching
        sessions are refundable until 24 hours before the scheduled call.
      </p>
      <h2>Health disclaimer</h2>
      <p>
        All content is educational and not medical advice. See the <a href="/disclaimer">Disclaimer</a>. You are responsible for
        consulting your own health provider and for how you use the information.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The Lymphatic Reset Method™, the LRM™ sequence, videos, guides, text and images are owned by Julia Warter Wellness and
        protected by copyright and trademark law. Short quotations with attribution and a link are welcome.
      </p>
      <h2>Affiliate links</h2>
      <p>Some links earn a commission. See the <a href="/disclaimer">affiliate disclosure</a>.</p>
      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Julia Warter Wellness is not liable for any indirect, incidental or
        consequential damages arising from your use of the site or programs. Our total liability is limited to the amount
        you paid us in the previous twelve months.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of California.</p>
      <h2>Contact</h2>
      <p>
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
    </LegalPage>
  );
}
