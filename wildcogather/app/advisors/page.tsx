import { ADVISOR_FAQS } from "@/lib/faqs";
import { fit } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import { JwcoSeal, Stamp, Icon } from "@/components/Marks";
import { getResidences } from "@/lib/data";
import { getWebinars, whenLabel } from "@/lib/webinars";
import PageSketch from "@/components/PageSketch";
import { SITE } from "@/lib/site";

export const revalidate = 3600;
export const metadata: Metadata = fit({
  title: "For Travel Advisors: Family & Generational Residences | Wild & Co Gatherings",
  description: "An advisor-led platform for multigenerational travel. Vetted family residences, host conversations, short itineraries and webinars for advisors who plan family and friend gatherings. Apply to join.",
  alternates: { canonical: "/advisors" },
});

const faqs = ADVISOR_FAQS;

const why = [
  ["route", "Forty-four years on the road", "James Wild has designed journeys since 1982. Every house is one he would send his own family to — or he says so."],
  ["family", "The family facts, ready to send", "Bedrooms by branch, children's ages and programs, the last leg of the journey, power, time zone, best season. The questions your clients ask, answered on one page."],
  ["season", "Honest about who it's not for", "Each house carries a 'Not for everyone' note. Your clients hear the trade-offs from you before they arrive, not after."],
  ["moon", "Stamped, never sponsored", "A Ledger stamp is earned by a visit or a host conversation. Houses cannot buy one."],
];

const building = [
  ["Client-ready house sheets", "Every Ledger page doubles as a sheet you can send, with stamps, rooms and inclusions."],
  ["Short itineraries to adapt", "Three- and four-day plans built around one house, ready to tailor to your family."],
  ["Time Rewarded offers", "Verified stay-and-pay offers you can hold for clients, with dates, eligibility and exclusions on the card."],
  ["Webinars with the hosts", "Live sessions on Livestorm with the people who run the houses, recorded for later."],
  ["First word on new openings", "On the Horizon places reach advisors before they reach the public."],
  ["A planning partner for complex groups", "Room-by-room plans and age-by-age days for gatherings of 8 to 40."],
];

const steps = [
  ["Tell us the group", "Who's coming — branches, ages, mobility, the occasion — and the window you're working with."],
  ["We match the houses", "Two or three residences that pass the six tests for this family, with the trade-offs written down."],
  ["We build the days", "A day for every age: the grandparents' pace, the teenagers' adventure, the shared supper."],
  ["Host conversation and hold", "A call with the house host where it helps, then dates held for your client."],
];

export default async function Advisors() {
  const [houses, webinars] = await Promise.all([getResidences(), getWebinars()]);
  const next = webinars[0];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebPage", name: "For travel advisors — Wild & Co Gatherings", url: `${SITE}/advisors`, description: metadata.description, audience: { "@type": "BusinessAudience", audienceType: "Travel advisors and travel agents" }, about: { "@type": "Organization", name: "James Wild & Co", foundingDate: "1982" } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />

      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 70, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 60, alignItems: "center" }}>
        <div>
          <p className="eb">For travel advisors</p>
          <hr className="eb-rule" />
          <h1 className="dsp" style={{ margin: "26px 0 0", fontSize: "clamp(44px, 5.6vw, 78px)" }}>Advisor-led, always</h1>
          <p className="it" style={{ margin: "20px 0 0", fontSize: 26, lineHeight: 1.35, maxWidth: 620 }}>We're building Wild &amp; Co Gatherings for advisors who care how a family remembers the trip — and we're always looking for more of them.</p>
          <p className="body" style={{ margin: "20px 0 0", maxWidth: 600 }}>Family and generational residences are hard to plan well. Bedrooms have to work for three branches, days have to work for a four-year-old and an eighty-year-old, and the house has to be honest about what it is. That is the work we do with you, house by house.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", marginTop: 30 }}>
            <a href="#apply" className="btn">Apply to join</a>
            <Link href="/webinars" className="lnk">Upcoming webinars <span>→</span></Link>
          </div>
        </div>
        <div style={{ display: "grid", justifyItems: "center", gap: 24 }}>
          <JwcoSeal size={200} rotate={-6} />
          <p className="cp muted" style={{ margin: 0, textAlign: "center" }}>{houses.length} houses in the Ledger · journey design since 1982</p>
        </div>
      </section>

      <section className="band" style={{ padding: "90px 0" }} aria-labelledby="why">
        <div className="wrap">
          <p className="eb">Why James Wild &amp; Co</p>
          <h2 id="why" className="dsp" style={{ margin: "16px 0 40px", fontSize: "clamp(36px, 4vw, 52px)" }}>What your clients get through you</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", gap: 30 }}>
            {why.map(([icon, t, d]) => (
              <div key={t} style={{ borderTop: "1px solid var(--charcoal)", paddingTop: 22 }}>
                <Icon name={icon} size={30} color="var(--rust)" />
                <h3 className="ser" style={{ margin: "14px 0 8px", fontSize: 26, fontWeight: 500 }}>{t}</h3>
                <p className="body" style={{ margin: 0, fontSize: 16 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 30 }} aria-labelledby="building">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 60 }}>
          <div>
            <p className="eb">What we're building for agents who care</p>
            <hr className="eb-rule" />
            <h2 id="building" className="dsp" style={{ margin: "26px 0 18px", fontSize: "clamp(36px, 4vw, 52px)" }}>Tools for the family trip, not the transaction</h2>
            <p className="body" style={{ margin: 0 }}>Some of this is live today and some is on the way. Advisors who join now shape what comes next.</p>
            <div style={{ marginTop: 30 }}><Stamp kind="Gathering verified" size={150} /></div>
          </div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--charcoal)" }}>
            {building.map(([t, d]) => (
              <li key={t} className="ledger-row" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)", gap: 20, padding: "18px 0", borderBottom: "1px solid rgba(44,42,39,.16)" }}>
                <span className="ser" style={{ fontSize: 21 }}>{t}</span>
                <span className="body" style={{ fontSize: 15 }}>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 90 }} aria-labelledby="how">
        <p className="eb">How we help you plan family &amp; friend gatherings</p>
        <h2 id="how" className="dsp" style={{ margin: "16px 0 36px", fontSize: "clamp(36px, 4vw, 52px)" }}>Four steps, one long table</h2>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 26 }}>
          {steps.map(([t, d], i) => (
            <li key={t} className="card" style={{ padding: "26px 24px" }}>
              <p className="mono" style={{ margin: 0, color: "var(--rust)", fontSize: 13 }}>Step {i + 1}</p>
              <h3 className="ser" style={{ margin: "10px 0 8px", fontSize: 24, fontWeight: 500 }}>{t}</h3>
              <p className="body" style={{ margin: 0, fontSize: 15 }}>{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {next && (
        <section className="navy" aria-label="Next webinar">
          <div className="wrap" style={{ paddingTop: 70, paddingBottom: 70, display: "flex", flexWrap: "wrap", gap: 30, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: "1 1 460px" }}>
              <p className="eb">Webinar · on Livestorm · {whenLabel(next)}</p>
              <h2 className="dsp" style={{ margin: "14px 0 0", fontSize: "clamp(30px, 3.4vw, 44px)", color: "var(--on-dark)" }}>{next.title}</h2>
              <p className="body" style={{ margin: "12px 0 0", color: "rgba(244,241,236,.8)" }}>Hosted by {next.host.name}, {next.host.title}.</p>
            </div>
            <Link href={`/webinars/${next.slug}`} className="btn btn-light">See the webinar</Link>
          </div>
        </section>
      )}

      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 60, maxWidth: 900 }} aria-labelledby="faq">
        <p className="eb">Questions advisors ask</p>
        <hr className="eb-rule" />
        <h2 id="faq" className="sr-only">Questions advisors ask</h2>
        {faqs.map((f) => (
          <div key={f.q} style={{ borderTop: "1px solid rgba(44,42,39,.18)", padding: "22px 0" }}>
            <h3 className="ser" style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>{f.q}</h3>
            <p className="body" style={{ margin: "10px 0 0" }}>{f.a}</p>
          </div>
        ))}
      </section>

      <section id="apply" className="band" style={{ padding: "90px 0" }} aria-labelledby="apply-h">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <p className="eb">Apply to join</p>
          <h2 id="apply-h" className="dsp" style={{ margin: "16px 0 10px", fontSize: "clamp(34px, 3.8vw, 48px)" }}>Tell us about your practice</h2>
          <p className="body" style={{ margin: "0 0 30px" }}>James reads every application. We'll write back within a week with next steps.</p>
          <LeadForm id="advisor" occasion="Advisor application" from="/advisors" submit="Send my application" done="Thank you. James will write back within a week."
            fields={[
              { name: "name", label: "Your name", required: true },
              { name: "email", label: "Email", type: "email", required: true },
              { name: "agency", label: "Agency" },
              { name: "network", label: "Host agency or consortium" },
              { name: "based", label: "Where you're based" },
              { name: "focus", label: "Family travel is", type: "select", options: ["Most of my business", "A growing part of my business", "Something I want to grow"] },
              { name: "gathering", label: "A family or friend gathering you'd love to plan", type: "textarea" },
            ]} />
        </div>
      </section>
      <PageSketch k={"route"} label="For advisors" />
    </>
  );
}
