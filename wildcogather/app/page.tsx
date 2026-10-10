import Link from "next/link";
import Photo from "@/components/Photo";
import Strip from "@/components/Strip";
import LedgerTable from "@/components/LedgerTable";
import JsonLd from "@/components/JsonLd";
import { JwcoSeal } from "@/components/Marks";
import { getResidences, dms } from "@/lib/data";

export const revalidate = 3600;

const FORMULA: [string, string][] = [
  ["Room to gather", "One table for all of you, a door to close for each branch."],
  ["A day for every age", "Programs for children, real adventure for teens, an easy pace for elders."],
  ["Water within reach", "A river, a lake or a harbour — boat days belong in the plan."],
  ["Country at the door", "Land to step straight into, with guides who live there."],
  ["A resort behind you", "Kitchens, housekeeping and a safety net. Nobody spends the week as host."],
  ["Worth returning to", "The start of a family tradition, not a single trip."],
];

const FAQS = [
  { q: "What is a resort residence?", a: "A private, multi-bedroom home inside or beside a resort: your own space and kitchen, with the resort's dining, housekeeping, children's programs and activities close at hand." },
  { q: "Is a resort residence better than a villa for a family reunion?", a: "For three generations, usually. You keep a villa's privacy, nobody has to run the house, and every age has something waiting." },
  { q: "How does James vet each house?", a: "Against the six tests of the Gathering Formula, drawing on forty-four years of travel. Houses he has not yet visited are marked Under observation." },
];

export default async function Home() {
  const all = await getResidences();
  const lead = all[0];
  const hero = lead.images.find((i) => i.role === "Hero") || lead.images[0];
  const card = lead.images.find((i) => i.role === "Card") || lead.images[1];
  const strip = all.flatMap((r) => r.images.filter((i) => i.role === "Gallery strip").map((i) => ({ ...i, house: r.name }))).slice(0, 8);
  const feature = lead.images.find((i) => i.role === "Feature");

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />

      <section style={{ position: "relative" }}>
        <Photo img={hero} priority style={{ height: "min(78vh, 760px)" }} />
        <div style={{ position: "absolute", left: 40, bottom: 44, color: "var(--paper)", maxWidth: 320, textShadow: "0 1px 6px rgba(0,0,0,.35)" }}>
          <p className="cp" style={{ margin: "0 0 8px", borderBottom: "1px solid rgba(242,238,230,.6)", paddingBottom: 6 }}>Coordinates</p>
          <p className="cp" style={{ margin: 0, fontSize: 14, fontStyle: "italic", whiteSpace: "pre-line" }}>{dms(lead.lat, lead.lng).replace("   ", "\n")}</p>
          <p className="hand" style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.7, borderLeft: "1px solid rgba(242,238,230,.6)", paddingLeft: 14 }}>Three generations.<br />One long table.<br />The horses run at five.</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 96, paddingBottom: 110, display: "flex", flexWrap: "wrap", gap: 64, alignItems: "flex-start" }}>
        <div style={{ flex: "999 1 560px", minWidth: 0 }}>
          <h1 className="disp" style={{ margin: 0, fontSize: "clamp(52px, 7vw, 96px)", lineHeight: 1.02, letterSpacing: ".03em", textTransform: "uppercase" }}>One House.<br />Every Generation.</h1>
          <p className="cas ox" style={{ fontStyle: "italic", fontSize: 30, lineHeight: 1.3, margin: "34px 0 30px" }}>The house is where you gather.<br />What lies beyond it is the reason.</p>
          <p className="body" style={{ maxWidth: 560, margin: "0 0 34px" }}>Resort residences for families travelling across generations — a room for every branch, a table for all of you, and days planned so the youngest and the eldest both come home with a story. Each house is chosen by James Wild after forty-four years on the road.</p>
          <hr className="rule" style={{ maxWidth: 560, borderColor: "var(--oxblood)" }} />
          <p className="cp ox" style={{ margin: "16px 0 6px", fontSize: 13 }}>Discovered by James Wild. Chosen for your family.</p>
          <p className="cp" style={{ margin: 0, fontSize: 13 }}>Still going since 1982.</p>
          <div style={{ marginTop: 40 }}><JwcoSeal size={200} rotate={-4} /></div>
        </div>
        <div style={{ flex: "1 1 340px", maxWidth: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 56, paddingTop: 120 }}>
          <figure className="polaroid" style={{ margin: 0, transform: "rotate(1.5deg)", width: "100%" }}>
            <div className="tape" />
            <Photo img={card} sizes="400px" style={{ height: 360 }} />
            <figcaption className="hand">{lead.name} — {card?.caption}</figcaption>
          </figure>
          <Link href="/ledger" className="btn">Explore the Houses</Link>
        </div>
      </section>

      <section aria-label="Archive" style={{ borderTop: "1px solid var(--sand)", borderBottom: "1px solid var(--sand)", padding: "70px 0 40px", background: "var(--paper-2)" }}>
        <Strip label="From the archive" title="The days together">
          {strip.map((img, i) => (
            <figure key={img.publicId} style={{ margin: i % 2 ? "50px 0 0" : 0 }}>
              <div className="polaroid" style={{ padding: "14px 14px 46px", transform: `rotate(${i % 2 ? 1 : -1.2}deg)` }}>
                <Photo img={img} sizes="360px" style={{ width: i % 3 === 2 ? 420 : 330, height: i % 3 === 2 ? 300 : 400, maxWidth: "78vw" }} />
                <figcaption className="hand" style={{ position: "absolute", bottom: 12, left: 18, fontSize: 13 }}>{img.caption}</figcaption>
              </div>
              <p className="cp" style={{ margin: "14px 0 0", fontSize: 11 }}>Fig. {String(i + 1).padStart(2, "0")} — {img.house}</p>
            </figure>
          ))}
        </Strip>
      </section>

      <section className="wrap" style={{ paddingTop: 110, paddingBottom: 110, display: "flex", flexWrap: "wrap", gap: 64 }}>
        <div style={{ flex: "1 1 320px", maxWidth: 400 }}>
          <p className="cp ox" style={{ margin: "0 0 14px" }}>The Gathering Formula</p>
          <h2 className="cas" style={{ margin: "0 0 22px", fontSize: 44, lineHeight: 1.15 }}>Six tests. Every house passes all of them.</h2>
          <p className="body" style={{ margin: 0 }}>The James Wild &amp; Co way, written for families. A house that fails one is not entered in the Ledger.</p>
        </div>
        <ol style={{ flex: "2 1 560px", listStyle: "none", margin: 0, padding: 0, borderTop: "1.5px solid var(--charcoal)" }}>
          {FORMULA.map(([t, n], i) => (
            <li key={t} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 16, padding: "20px 0", borderBottom: "1px solid var(--stone)" }}>
              <span className="cp ox" style={{ fontSize: 14 }}>No. {String(i + 1).padStart(2, "0")}</span>
              <div><p className="cas" style={{ margin: "0 0 4px", fontSize: 24 }}>{t}</p><p className="body" style={{ margin: 0, fontSize: 16 }}>{n}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ background: "var(--card)", borderTop: "1px solid var(--sand)", borderBottom: "1px solid var(--sand)" }}>
        <div className="wrap" style={{ paddingTop: 90, paddingBottom: 90 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16, marginBottom: 26 }}>
            <div><h2 className="cas" style={{ margin: 0, fontSize: 34, letterSpacing: ".08em", textTransform: "uppercase" }}>The Gatherings Ledger</h2><p className="cp" style={{ margin: "8px 0 0" }}>A personal archive of houses worth gathering in</p></div>
            <p className="cp" style={{ margin: 0 }}>Entries {String(all.length).padStart(3, "0")}</p>
          </div>
          <LedgerTable rows={all} />
          <p className="cp muted" style={{ margin: "22px 0 0", fontSize: 11 }}>New entries added when earned.</p>
        </div>
      </section>

      <section id="land-and-water" style={{ background: "var(--charcoal)", color: "var(--paper)" }}>
        <div className="wrap" style={{ paddingTop: 100, paddingBottom: 100, display: "flex", flexWrap: "wrap", gap: 64, alignItems: "center" }}>
          <div style={{ flex: "1 1 380px" }}>
            <p className="cp" style={{ margin: "0 0 14px", color: "var(--stone)" }}>Land &amp; Water</p>
            <h2 className="cas" style={{ margin: "0 0 26px", fontSize: 44, lineHeight: 1.15 }}>Days arranged by age, not by brochure.</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid #5A5752" }}>
              {[["On the water", "Skippered boat days, offshore fishing, paddling"], ["On the land", "Riding, wildlife, trails set to the slowest walker"], ["The young ones", "Programs of their own, so evenings are yours"], ["Together", "The photograph, the long supper, the friendly rivalry"]].map(([k, v]) => (
                <li key={k} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 16, padding: "16px 0", borderBottom: "1px solid #5A5752" }}><span className="cp" style={{ color: "var(--stone)" }}>{k}</span><span style={{ fontSize: 16 }}>{v}</span></li>
              ))}
            </ul>
          </div>
          <Photo img={feature} sizes="(max-width: 900px) 100vw, 560px" style={{ flex: "1 1 420px", height: 480 }} />
        </div>
      </section>

      <section id="chapters" className="wrap" style={{ paddingTop: 110, paddingBottom: 110, maxWidth: 980 }}>
        <p className="cp ox" style={{ margin: "0 0 14px" }}>Questions families ask</p>
        <h2 className="cas" style={{ margin: "0 0 26px", fontSize: 36 }}>Planning a multigenerational gathering</h2>
        <div style={{ borderTop: "1.5px solid var(--charcoal)" }}>
          {FAQS.map((f) => (
            <div key={f.q} style={{ borderBottom: "1px solid var(--stone)", padding: "22px 0" }}>
              <h3 className="cas" style={{ margin: "0 0 8px", fontSize: 21 }}>{f.q}</h3>
              <p className="body" style={{ margin: 0, fontSize: 16 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
