import type { Metadata } from "next";
import Link from "next/link";
import { fit } from "@/lib/seo";
import { LegalShell, Fill } from "@/components/Legal";
import { LEGAL, BOOKING, sellerOfTravelLine } from "@/lib/legal";

export const metadata: Metadata = fit({
  title: "Terms & Booking Conditions | Wild & Co Gatherings",
  description: `How booking a family journey with Wild & Co Gatherings works: our role as advisor or tour operator, the ${BOOKING.depositPct}% deposit, final payment ${BOOKING.balanceDueDays} days out, and the cancellation schedule.`,
  alternates: { canonical: "/terms" },
  robots: LEGAL.reviewed ? undefined : { index: false, follow: true },
});

const S: [string, string][] = [
  ["who", "Who we are and our role"],
  ["quotes", "Quotes and confirmation"],
  ["payment", "Deposit and final payment"],
  ["changes", "Changes you make"],
  ["cancel", "Cancellation by you"],
  ["refunds", "Refunds"],
  ["our-changes", "Changes or cancellation by us or a supplier"],
  ["insurance", "Travel insurance"],
  ["documents", "Passports, visas and health"],
  ["conduct", "Your responsibilities"],
  ["liability", "Our responsibility to you"],
  ["force-majeure", "Events beyond control"],
  ["complaints", "Complaints"],
  ["law", "Governing law"],
  ["registration", "Seller of Travel registration"],
];

const range = (from: number, to: number | null) => (to === null ? `${from} days or more before departure` : from === 0 ? `${to} days or fewer before departure` : `${from}–${to} days before departure`);

export default function Terms() {
  const sot = sellerOfTravelLine();
  return (
    <LegalShell
      eyebrow="Gatherings · Terms & Booking Conditions"
      title="Terms & Booking Conditions"
      sections={S}
      intro={<>
        <p>These conditions apply when you book a journey through Wild &amp; Co Gatherings. They sit alongside the terms of the lodges, airlines and other suppliers who provide your travel, which we share with your quote. Where a supplier&apos;s terms are stricter than ours, the supplier&apos;s terms apply to that part of your trip, and we tell you before you pay.</p>
        <p>In short: a {BOOKING.depositPct}% deposit confirms your booking, the balance is due {BOOKING.balanceDueDays} days before you travel, and once a booking is confirmed a {BOOKING.cancellationFeePct}% cancellation fee applies, rising closer to departure as set out below.</p>
      </>}
    >
      <h2 id="who">1. Who we are and our role</h2>
      <p>Wild &amp; Co Gatherings is {LEGAL.tradingAs.replace("Wild & Co Gatherings, ", "")}, operated by <Fill v={LEGAL.legalName} label="legal entity name" />, <Fill v={LEGAL.address} label="registered address" /> (&ldquo;we&rdquo;, &ldquo;us&rdquo;).</p>
      <p>We act in one of two roles, and your confirmation says which applies to each part of your trip:</p>
      <ul>
        <li><strong>As your travel advisor (agent).</strong> When we book a lodge, flight or other service in the supplier&apos;s name and at the supplier&apos;s price, we arrange it on your behalf. Your contract for that service is with the supplier, on the supplier&apos;s terms.</li>
        <li><strong>As tour operator.</strong> When we combine services into a journey we design and sell under our own name at one inclusive price, we are responsible for arranging that journey as described, subject to these conditions.</li>
      </ul>
      <p>We name the suppliers we work with on our pages, but we are independent of them and are not their agent for any purpose other than taking your booking.</p>

      <h2 id="quotes">2. Quotes and confirmation</h2>
      <p>A quote is a proposal, not a booking. Prices and availability are only held once we confirm in writing. Rates on the site are shown as &ldquo;request a quote&rdquo; because lodge prices change by season, party size and currency. Your booking is confirmed when we have received your deposit and sent you a written confirmation; these conditions then form a contract between you and us.</p>
      <p>The person who books (the &ldquo;lead traveller&rdquo;) confirms they are at least 18 and are authorised to accept these conditions for everyone in the party.</p>

      <h2 id="payment">3. Deposit and final payment</h2>
      <ul>
        <li><strong>Deposit:</strong> {BOOKING.depositPct}% of the total trip cost, due to confirm your booking. Some suppliers — often small lodges, private villas and peak-season dates — require a higher or non-refundable deposit; where they do, your quote shows the higher amount.</li>
        <li><strong>Final balance:</strong> due {BOOKING.balanceDueDays} days before your departure date. If you book within {BOOKING.balanceDueDays} days of departure, the full cost is due at booking.</li>
        <li><strong>Late payment:</strong> if the balance is not received by the due date, we may treat the booking as cancelled by you and apply the cancellation charges below.</li>
        <li><strong>Currency:</strong> prices are quoted in US dollars unless the quote says otherwise. Where a supplier charges in another currency, the quote states how exchange movements are handled.</li>
      </ul>

      <h2 id="changes">4. Changes you make</h2>
      <p>Ask us in writing and we will do our best to make the change. Suppliers may charge for changes, and some changes (new dates, a different lodge, names on air tickets) count as a cancellation and rebooking. We show any supplier charge and our amendment fee before you approve the change.</p>

      <h2 id="cancel">5. Cancellation by you</h2>
      <p>Cancel in writing (email is fine). The charge depends on how many days before departure we receive your notice:</p>
      <table className="lg-table">
        <thead><tr><th scope="col">Notice received</th><th scope="col">Cancellation charge</th></tr></thead>
        <tbody>{BOOKING.schedule.map((r) => <tr key={r.from}><td>{range(r.from, r.to)}</td><td>{r.charge}</td></tr>)}</tbody>
      </table>
      <p>The {BOOKING.cancellationFeePct}% cancellation fee applies once a booking is confirmed. Where a supplier&apos;s cancellation terms are stricter than this schedule — which is common for safari lodges, whole-house buyouts and flights — the supplier&apos;s charges apply to that part of the trip; your quote lists them. Cancelling one traveller from a party may change the price for everyone else.</p>

      <h2 id="refunds">6. Refunds</h2>
      <p>Any refund due to you is paid to the original payment method within {BOOKING.refundDays} days of our receiving your written cancellation, or within {BOOKING.refundDays} days of our receiving the money back from the supplier, whichever is later. Bank and card fees charged by your provider, and currency movements, are not refundable by us.</p>

      <h2 id="our-changes">7. Changes or cancellation by us or a supplier</h2>
      <p>Lodges, airlines and guides occasionally have to change arrangements. If a change is minor (a different vehicle, a change of guide, a flight time), we will tell you as soon as we can. If a change is significant (a different lodge of a lower standard, a change of destination, a large change of dates) you may accept it, take a comparable alternative, or cancel for a full refund of the money paid to us for the affected services. If we cancel your trip for any reason other than events beyond control or your non-payment, you will receive a full refund.</p>

      <h2 id="insurance">8. Travel insurance</h2>
      <p>We strongly recommend comprehensive travel insurance from the moment you pay a deposit, covering cancellation, medical treatment, emergency evacuation (especially for remote safari areas), and baggage. If you choose not to buy it, you accept the cancellation charges and costs it would have covered.</p>

      <h2 id="documents">9. Passports, visas and health</h2>
      <p>Each traveller is responsible for holding a valid passport (many countries require six months&apos; validity and blank pages), any visas or entry permits, and the vaccinations and health documents their destinations require. Rules for travelling children differ by country — South Africa, for example, can ask for birth certificates or parental consent. We share general guidance, but you should confirm current requirements with the relevant authorities and your doctor.</p>

      <h2 id="conduct">10. Your responsibilities</h2>
      <p>Tell us at booking about anything that affects your trip: ages of children, mobility, medical or dietary needs. Follow the instructions of guides and lodge staff, especially on game drives and walks. Lodges may set minimum ages for some activities. Suppliers may refuse service to anyone whose behaviour puts others at risk, without refund.</p>

      <h2 id="liability">11. Our responsibility to you</h2>
      <p>Where we act as your advisor, we are responsible for booking the services you asked for with reasonable care and skill; the supplier is responsible for providing them. Where we act as tour operator, we are responsible for arranging the journey as described, with reasonable care. We are not responsible for loss, injury or disappointment caused by you, by a third party unconnected with your trip, or by events beyond control. Nothing in these conditions limits liability that cannot be limited by law.</p>
      <p>Safari and adventure travel carries inherent risks — wildlife, remote locations, small aircraft and limited medical facilities. By booking, you accept those risks for activities you choose to take part in.</p>

      <h2 id="force-majeure">12. Events beyond control</h2>
      <p>We are not liable for failure to perform, or for changes, caused by events outside our or our suppliers&apos; reasonable control: natural disaster, severe weather, epidemic, war, civil unrest, government action, industrial action, or closure of airports or airspace. We will help you with alternatives and pass on any refund we receive from suppliers.</p>

      <h2 id="complaints">13. Complaints</h2>
      <p>If something goes wrong while you are travelling, tell the supplier and us straight away so it can be put right on the spot. If it is not resolved, write to us at <Fill v={LEGAL.email} label="contact email" /> within 30 days of your return and we will respond within 30 days.</p>

      <h2 id="law">14. Governing law</h2>
      <p>These conditions are governed by the laws of {LEGAL.governingLaw}. Any dispute will be handled by the courts of <Fill v={LEGAL.venue} label="venue (county), Florida" />, unless the law of your home state requires otherwise.</p>

      <h2 id="registration">15. Seller of Travel registration</h2>
      <p className="sot-line">{sot ?? <><Fill v={null} label="Florida Seller of Travel registration no." /> — required by Florida law on contracts, advertisements and travel documents.</>}</p>
      {LEGAL.caSellerOfTravelNo && <p>California Seller of Travel Reg. No. {LEGAL.caSellerOfTravelNo}. Registration as a seller of travel does not constitute approval by the State of California.</p>}
      <p>See also our <Link href="/privacy">Privacy Policy</Link> and <Link href="/privacy-choices">Your Privacy Choices</Link>.</p>
    </LegalShell>
  );
}
