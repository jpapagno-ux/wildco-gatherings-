import type { Metadata } from "next";
import Link from "next/link";
import { fit } from "@/lib/seo";
import { LegalShell, Fill } from "@/components/Legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = fit({
  title: "Your Privacy Choices | Wild & Co Gatherings",
  description: "Opt out of emails, ask us to see or delete your information, and clear My Folios. Wild & Co Gatherings does not sell or share personal data for advertising.",
  alternates: { canonical: "/privacy-choices" },
  robots: LEGAL.reviewed ? undefined : { index: false, follow: true },
});

const S: [string, string][] = [
  ["sell", "We don't sell or share your data"],
  ["email", "Stop emails"],
  ["request", "See, correct or delete your information"],
  ["folios", "Clear My Folios"],
  ["gpc", "Global Privacy Control"],
];

export default function PrivacyChoices() {
  return (
    <LegalShell
      eyebrow="Gatherings · Your Privacy Choices"
      title="Your Privacy Choices"
      sections={S}
      intro={<p>Everything you can switch off or ask for, in one place. For the full detail, read our <Link href="/privacy">Privacy Policy</Link>.</p>}
    >
      <h2 id="sell">1. We don&apos;t sell or share your data</h2>
      <p>We do not sell personal information and we do not share it for cross-context behavioural (targeted) advertising. There is nothing to opt out of here — but if you&apos;d like written confirmation, ask us and we will record your opt-out anyway.</p>

      <h2 id="email">2. Stop emails</h2>
      <p>Every marketing email we send has an unsubscribe link. You can also email <Fill v={LEGAL.email} label="contact email" /> with &ldquo;Unsubscribe&rdquo; and we will stop within 10 business days. We will still send messages you need about a trip you have booked.</p>

      <h2 id="request">3. See, correct or delete your information</h2>
      <p>Email <Fill v={LEGAL.email} label="privacy email" /> or use <Link href="/plan">our contact form</Link> and tell us what you&apos;d like: a copy of what we hold, a correction, or deletion. We will confirm it&apos;s you and reply within the time the law sets. Some booking records must be kept for tax and Seller of Travel rules; we&apos;ll tell you if that applies.</p>

      <h2 id="folios">4. Clear My Folios</h2>
      <p>My Folios live only in your browser. To remove them, delete each Folio in <Link href="/folios">My Folios</Link>, or clear this site&apos;s data in your browser settings. Export a copy first if you want to keep it.</p>

      <h2 id="gpc">5. Global Privacy Control</h2>
      <p>If your browser sends a Global Privacy Control (GPC) signal, we treat it as a request to opt out of the sale or sharing of your personal information. Because we don&apos;t sell or share, nothing on the site changes — but we honour it.</p>
    </LegalShell>
  );
}
