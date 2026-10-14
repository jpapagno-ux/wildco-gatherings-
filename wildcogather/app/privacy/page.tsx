import type { Metadata } from "next";
import Link from "next/link";
import { fit } from "@/lib/seo";
import { LegalShell, Fill } from "@/components/Legal";
import { LEGAL } from "@/lib/legal";

export const metadata: Metadata = fit({
  title: "Privacy Policy | Wild & Co Gatherings",
  description: "What Wild & Co Gatherings collects when you plan a journey, why, who we share it with to make your trip happen, and how to see, change or delete it. We never sell your data.",
  alternates: { canonical: "/privacy" },
  robots: LEGAL.reviewed ? undefined : { index: false, follow: true },
});

const S: [string, string][] = [
  ["who", "Who we are"],
  ["collect", "What we collect"],
  ["use", "How we use it"],
  ["share", "Who we share it with"],
  ["folios", "My Folios and your device"],
  ["cookies", "Cookies and embedded content"],
  ["keep", "How long we keep it"],
  ["rights", "Your rights"],
  ["children", "Children"],
  ["security", "Security and international transfers"],
  ["changes", "Changes to this policy"],
  ["contact", "Contact"],
];

export default function Privacy() {
  return (
    <LegalShell
      eyebrow="Gatherings · Privacy Policy"
      title="Privacy Policy"
      sections={S}
      intro={<>
        <p>Planning a family journey means telling us who is coming, when, and what matters to you. We use that only to plan and book your travel and to reply to you. We do not sell personal information, we do not use advertising cookies, and we do not share your details for targeted advertising.</p>
      </>}
    >
      <h2 id="who">1. Who we are</h2>
      <p>Wild &amp; Co Gatherings is {LEGAL.tradingAs.replace("Wild & Co Gatherings, ", "")}, operated by <Fill v={LEGAL.legalName} label="legal entity name" />, <Fill v={LEGAL.address} label="registered address" />. We are responsible for the personal information described here.</p>

      <h2 id="collect">2. What we collect</h2>
      <h3>What you tell us</h3>
      <ul>
        <li><strong>Plan a Gathering and advisor reviews:</strong> your name, email, occasion, preferred dates, the number of guests by age band, must-haves, houses you&apos;re interested in, and — if you choose to attach it — the summary of a Folio.</li>
        <li><strong>Questions for Iggi:</strong> your name, email and question, sent to an advisor.</li>
        <li><strong>Webinar, advisor and &ldquo;be first to know&rdquo; forms:</strong> your name, email and the answers on the form.</li>
        <li><strong>When you book:</strong> the details suppliers need — full names as on passports, dates of birth, dietary and medical needs you choose to share, and flight details. We collect these by email or phone when you book, not through the site.</li>
      </ul>
      <p>Please don&apos;t send passport scans, payment card numbers or other sensitive documents through the website forms.</p>
      <h3>Collected automatically</h3>
      <p>Our hosting provider records standard technical information (IP address, browser type, pages requested, time) in server logs to keep the site secure and working. We do not run advertising or cross-site tracking tools.</p>

      <h2 id="use">3. How we use it</h2>
      <ul>
        <li>To reply to your enquiry and plan your journey (taking steps at your request before a contract).</li>
        <li>To book and manage your travel with suppliers (performing our contract with you).</li>
        <li>To send you information you asked for, such as webinar details or news of a house opening (your consent — withdraw any time).</li>
        <li>To keep records required for accounting, tax and Seller of Travel rules, and to handle complaints (legal obligation and legitimate interests).</li>
        <li>To keep the site secure and understand whether it works (legitimate interests).</li>
      </ul>

      <h2 id="share">4. Who we share it with</h2>
      <ul>
        <li><strong>Travel suppliers</strong> — lodges, camps, airlines, transfer and guiding companies — only the details needed to deliver the services you book.</li>
        <li><strong>Service providers</strong> who process data for us: Vercel (website hosting), Airtable (where enquiries are stored), Cloudinary (images), Mapbox (maps), YouTube in privacy-enhanced mode (films), and Livestorm (webinars, when you register).</li>
        <li><strong>Professional advisers and authorities</strong> where the law requires it, or to protect rights and safety.</li>
      </ul>
      <p>We do not sell personal information, and we do not &ldquo;share&rdquo; it for cross-context behavioural advertising as those terms are defined in California law.</p>

      <h2 id="folios">5. My Folios and your device</h2>
      <p>My Folios are stored only in your own browser on your device. We cannot see them unless you choose to send a Folio summary to an advisor. Clearing your browser&apos;s site data deletes them; see <Link href="/privacy-choices">Your Privacy Choices</Link>.</p>

      <h2 id="cookies">6. Cookies and embedded content</h2>
      <p>We do not use advertising or analytics cookies. The site uses your browser&apos;s local storage for My Folios. Maps (Mapbox) and films (YouTube privacy-enhanced mode) load content from those providers, who receive your IP address when the content is shown, under their own privacy policies. Webinar registration is handled by Livestorm.</p>

      <h2 id="keep">7. How long we keep it</h2>
      <p>Enquiries that don&apos;t lead to a booking are kept for up to 24 months, then deleted. Booking records are kept for as long as tax, accounting and Seller of Travel rules require (generally up to 7 years). You can ask us to delete your information sooner where the law allows.</p>

      <h2 id="rights">8. Your rights</h2>
      <p>Wherever you live, you can ask us to tell you what we hold about you, correct it, delete it, or stop sending you marketing. Depending on where you live — including California and other US states with privacy laws, the UK and the EU — you may also have rights to receive a copy in a portable form, to object to or restrict certain uses, and to appeal our decision. We will not treat you differently for using these rights.</p>
      <p>To make a request, email <Fill v={LEGAL.email} label="privacy email" /> or use <Link href="/plan">our contact form</Link>. We may need to confirm your identity, and we reply within the time the law sets (usually 30–45 days). An authorised agent may make a request for you with your written permission. If you are in the UK or EU, you may also complain to your data protection authority.</p>

      <h2 id="children">9. Children</h2>
      <p>Our site is meant for adults planning travel. Bookings include children&apos;s details only as their parent or guardian provides them. We do not knowingly collect information directly from children under 13.</p>

      <h2 id="security">10. Security and international transfers</h2>
      <p>We use reputable providers with encryption in transit and access controls. No system is perfectly secure, so please don&apos;t send sensitive documents through web forms. We are based in the United States and our providers may store data in the US or elsewhere; when you book travel abroad, suppliers in your destination countries receive the details needed for your stay.</p>

      <h2 id="changes">11. Changes to this policy</h2>
      <p>We will update this page when our practices change and show the new effective date at the top.</p>

      <h2 id="contact">12. Contact</h2>
      <p><Fill v={LEGAL.legalName} label="legal entity name" /> · <Fill v={LEGAL.address} label="registered address" /> · <Fill v={LEGAL.email} label="privacy email" /> · <Fill v={LEGAL.phone} label="phone" /></p>
    </LegalShell>
  );
}
