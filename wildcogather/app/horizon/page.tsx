import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import HorizonCard from "@/components/HorizonCard";
import BeFirst from "@/components/BeFirst";
import { getHorizon } from "@/lib/horizon";
import PageSketch from "@/components/PageSketch";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
export const metadata: Metadata = {
  title: "On the Horizon: New Family Resorts & Villas to Watch | Wild & Co Gatherings",
  description: "New and soon-to-open resort villas for multigenerational families — Maldives, Baja, Costa Rica, Ibiza — approved by James Wild. Be the first to hear when dates open.",
  alternates: { canonical: "/horizon" },
};

export default async function HorizonPage() {
  const items = await getHorizon();
  const faqs = [
    { q: "What is On the Horizon?", a: "New and soon-to-open resorts and villas for multigenerational families. James Wild has met the team at every one and approved it; each page sets out the facts families ask about first." },
    { q: "How does a place move from On the Horizon into the Ledger?", a: "Once it is open and James has stayed, it takes a Ledger number and the stamp it has earned, and its page moves to the Stays." },
    { q: "Can I book an On the Horizon place now?", a: "Some are open and some are still to come. Tell us which interests you and we will hold your interest, confirm what the house offers families, and write as soon as first dates open." },
  ];
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "On the Horizon — Wild & Co Gatherings", url: `${SITE}/horizon`, description: metadata.description, mainEntity: { "@type": "ItemList", itemListElement: items.map((h, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/horizon/${h.slug}`, name: h.name })) } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 40, textAlign: "center" }}>
        <p className="eb">Undiscovered · on James's list</p>
        <h1 className="dsp" style={{ margin: "18px 0 0", fontSize: "clamp(46px, 6.4vw, 84px)" }}>On the Horizon</h1>
        <p className="it" style={{ margin: "18px auto 0", fontSize: 26, maxWidth: 760 }}>New places we'd book before anyone else — approved by James, with the facts families ask first.</p>
        <p className="cp muted" style={{ margin: "22px 0 0" }}>{items.length} places · approved by James · facts checked {new Date(items[0]?.updated || Date.now()).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
      </section>
      <section className="wrap" style={{ paddingBottom: 90 }} aria-label="New places">
        <div className="hz-grid">{items.map((h) => <HorizonCard key={h.slug} h={h} />)}</div>
      </section>
      <section className="navy" id="be-first" aria-label="Be the first">
        <div className="wrap" style={{ paddingTop: 80, paddingBottom: 80, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 48, alignItems: "center" }}>
          <div>
            <p className="eb">Be the first</p>
            <h2 className="dsp" style={{ margin: "16px 0 0", fontSize: "clamp(34px, 3.8vw, 50px)", color: "var(--on-dark)" }}>Hear before the dates open</h2>
            <p className="body" style={{ margin: "16px 0 0", color: "rgba(244,241,236,.8)" }}>One note from James when a place on this page opens its first dates, or when he has been and can tell you honestly whether it works for a family. Nothing else.</p>
          </div>
          <BeFirst dark />
        </div>
      </section>
      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 100, maxWidth: 900 }} aria-label="Questions">
        <p className="eb">How it works</p>
        <hr className="eb-rule" />
        {faqs.map((f) => (
          <div key={f.q} style={{ borderTop: "1px solid rgba(44,42,39,.18)", padding: "22px 0" }}>
            <h2 className="ser" style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>{f.q}</h2>
            <p className="body" style={{ margin: "10px 0 0" }}>{f.a}</p>
          </div>
        ))}
      </section>
      <PageSketch k={"route"} label="On the Horizon" />
    </>
  );
}
