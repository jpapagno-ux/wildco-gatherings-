import type { Metadata } from "next";
import Link from "next/link";
import { fit } from "@/lib/seo";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PageSketch from "@/components/PageSketch";
import AskIggiButton from "@/components/AskIggiButton";
import { BOOKING, LEGAL, sellerOfTravelLine } from "@/lib/legal";
import { BOOKING_FAQS } from "@/lib/faqs";

export const metadata: Metadata = fit({
  title: "How Booking a Family Gathering Works | Wild & Co Gatherings",
  description: `From first conversation to the long table: how Wild & Co plans a multigenerational trip, the ${BOOKING.depositPct}% deposit, the balance ${BOOKING.balanceDueDays} days out, and what we handle for you.`,
  alternates: { canonical: "/how-it-works" },
});

const STEPS: { t: string; when: string; body: string; link?: [string, string] }[] = [
  { t: "Tell us who's coming", when: "Any time · no commitment", body: "Who is travelling and their ages, roughly when, and the occasion. Use Plan Our Gathering, ask Iggi a question, or send a Folio of the houses you're weighing. Nothing is booked and nothing is paid at this stage.", link: ["/plan", "Plan Our Gathering"] },
  { t: "We shape the plan", when: "Conversation", body: "James and an advisor match the houses to your family — bedrooms by branch, a day for every age — and suggest a journey around them. You receive a written quote that lists each supplier's own deposit and cancellation terms.", link: ["/houses", "Explore the houses"] },
  { t: "Confirm with a deposit", when: "At booking", body: `A ${BOOKING.depositPct}% deposit of the total trip cost confirms the booking (or a supplier's higher deposit, when the quote says so). Your written confirmation states, for each part of the trip, whether we act as your travel advisor or as tour operator.` },
  { t: "Final balance", when: `${BOOKING.balanceDueDays} days before travel`, body: `The balance is due ${BOOKING.balanceDueDays} days before departure. Booking closer than that? The full cost is due at booking. We recommend travel insurance from the day you pay the deposit.` },
  { t: "Before you go", when: "The final weeks", body: "Your final itinerary and travel documents, with the family details each house asked for. Passports, visas and health requirements are each traveller's to hold — we share guidance on what your destinations ask for, including rules for travelling children." },
  { t: "The gathering", when: "While you travel · after", body: "If anything goes wrong, tell the house and us straight away so it can be put right on the spot. Afterwards, tell us what to keep for next time — the best gatherings become a tradition.", link: ["/terms#complaints", "How complaints work"] },
];

const range = (from: number, to: number | null) => (to === null ? `${from}+ days before departure` : from === 0 ? `${to} days or fewer, or no-show` : `${from}–${to} days before departure`);

export default function HowItWorks() {
  const sot = sellerOfTravelLine();
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "WebPage", "@id": `${SITE}/how-it-works`, url: `${SITE}/how-it-works`,
        name: "How booking a family gathering works", isPartOf: { "@type": "WebSite", name: "Wild & Co Gatherings", url: SITE },
        about: { "@type": "TravelAgency", name: "Wild & Co Gatherings", legalName: LEGAL.legalName || undefined },
        breadcrumb: { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: SITE }, { "@type": "ListItem", position: 2, name: "How It Works", item: `${SITE}/how-it-works` }] },
      }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: BOOKING_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />

      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 30 }}>
        <p className="eb">Gatherings · How it works</p>
        <hr className="eb-rule" />
        <h1 className="dsp" style={{ margin: "24px 0 0", fontSize: "clamp(40px, 5.4vw, 72px)" }}>How a gathering comes together</h1>
        <p className="it" style={{ margin: "16px 0 0", fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.35, maxWidth: 800 }}>A conversation first, then a written quote. You confirm with a {BOOKING.depositPct}% deposit and settle the balance {BOOKING.balanceDueDays} days before you travel.</p>
      </section>

      <section className="wrap" style={{ paddingBottom: 70 }} aria-label="Six steps">
        <ol className="hiw-steps">
          {STEPS.map((s, i) => (
            <li key={s.t}>
              <span className="hiw-n mono">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="cp ox" style={{ margin: 0 }}>{s.when}</p>
                <h2 className="ser hiw-t">{s.t}</h2>
                <p className="body" style={{ margin: 0 }}>{s.body}</p>
                {s.link && <Link href={s.link[0]} className="lnk" style={{ marginTop: 14 }}>{s.link[1]} <span>→</span></Link>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="band" style={{ padding: "80px 0" }} aria-labelledby="glance">
        <div className="wrap hiw-glance">
          <div>
            <p className="eb">Your booking at a glance</p>
            <hr className="eb-rule" />
            <h2 id="glance" className="dsp" style={{ margin: "24px 0 14px", fontSize: "clamp(32px, 3.6vw, 46px)" }}>Deposit, balance and cancellation</h2>
            <p className="body" style={{ margin: 0 }}>Where a lodge, villa or airline has stricter terms — common for safari lodges and whole-house buyouts — theirs apply to that part of the trip, and your quote lists them before you pay. Refunds are paid within {BOOKING.refundDays} days of your written cancellation, or of the supplier&apos;s refund if later.</p>
            <p className="cp" style={{ margin: "18px 0 0" }}><Link href="/terms">Read the full Terms &amp; Booking Conditions</Link></p>
          </div>
          <table className="lg-table">
            <thead><tr><th scope="col">When</th><th scope="col">What happens</th></tr></thead>
            <tbody>
              <tr><td>At confirmation</td><td>{BOOKING.depositPct}% deposit of the total trip cost</td></tr>
              <tr><td>{BOOKING.balanceDueDays} days before departure</td><td>Final balance due</td></tr>
              {BOOKING.schedule.map((r) => <tr key={r.from}><td>Cancel {range(r.from, r.to)}</td><td>{r.charge}</td></tr>)}
            </tbody>
          </table>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 60, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 50 }}>
        <div>
          <p className="eb">Our role</p>
          <h2 className="dsp" style={{ margin: "14px 0 12px", fontSize: "clamp(28px, 3.2vw, 38px)" }}>Advisor, and tour operator when we package it</h2>
          <p className="body" style={{ margin: 0 }}>When we book a lodge or flight at the supplier&apos;s price, we act as your travel advisor and your contract for that service is with the supplier. When we design and sell a journey under our own name at one price, we act as tour operator. Your confirmation says which applies.</p>
        </div>
        <div>
          <p className="eb">Already have a travel advisor?</p>
          <h2 className="dsp" style={{ margin: "14px 0 12px", fontSize: "clamp(28px, 3.2vw, 38px)" }}>Bring them with you</h2>
          <p className="body" style={{ margin: "0 0 18px" }}>Every gathering is advisor-led. Your advisor keeps the relationship; we supply the vetted houses and the family facts.</p>
          <Link href="/advisors" className="btn btn-o">For advisors</Link>
        </div>
      </section>

      <section id="questions" className="wrap" style={{ paddingTop: 20, paddingBottom: 90, maxWidth: 960 }}>
        <p className="eb">Questions about booking</p>
        <hr className="eb-rule" />
        <div style={{ borderTop: "1px solid var(--charcoal)", marginTop: 26 }}>
          {BOOKING_FAQS.map((f) => (
            <div key={f.q} style={{ borderBottom: "1px solid var(--stone)", padding: "22px 0" }}>
              <h3 className="ser" style={{ margin: "0 0 8px", fontSize: 23, fontWeight: 500 }}>{f.q}</h3>
              <p className="body" style={{ margin: 0, fontSize: 16 }}>{f.a}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", marginTop: 32 }}>
          <Link href="/plan" className="btn">Plan Our Gathering</Link>
          <AskIggiButton className="lnk" label="Ask Iggi a question" />
          <Link href="/questions" className="lnk">All questions <span>→</span></Link>
        </div>
        {sot && <p className="sot-line" style={{ marginTop: 34 }}>{sot}{LEGAL.iataNo ? ` IATA No. ${LEGAL.iataNo}.` : ""}</p>}
      </section>
      <PageSketch k="route" label="How it works" />
    </>
  );
}
