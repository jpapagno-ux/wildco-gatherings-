import Link from "next/link";
import Photo from "@/components/Photo";
import { getResidences } from "@/lib/data";
import type { Residence } from "@/lib/types";

const propertyImage = (r: Residence) => r.images.find((i) => i.role === "Card") || r.images[0];

export default async function Home() {
  const all = await getResidences();
  const lead = all[0];
  const hero = lead.images.find((i) => i.role === "Hero") || lead.images[0];
  const card = lead.images.find((i) => i.role === "Card") || lead.images[1];
  const strip = all.flatMap((r) => r.images.filter((i) => i.role === "Gallery strip").map((i) => ({ ...i, house: r.name }))).slice(0, 8);
  const feature = lead.images.find((i) => i.role === "Feature");

  return (
    <>
      <section style={{ position: "relative" }}>
        <Photo img={hero} priority style={{ height: "min(78vh, 760px)" }} />
        <div className="hero-caption" style={{ color: "var(--paper)", textShadow: "0 1px 6px rgba(0,0,0,.35)" }}>
          <p className="cp" style={{ margin: "0 0 8px", borderBottom: "1px solid rgba(242,238,230,.6)", paddingBottom: 6 }}>Coordinates</p>
          <p className="cp" style={{ margin: 0, fontSize: 14, whiteSpace: "pre-line" }}>{lead.place} · {lead.country}</p>
          <p className="hand" style={{ margin: "22px 0 0", fontSize: 17, lineHeight: 1.7, borderLeft: "1px solid rgba(242,238,230,.6)", paddingLeft: 14 }}>Three generations.<br />One long table.</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 96, paddingBottom: 110, display: "flex", flexWrap: "wrap", gap: 64, alignItems: "flex-start" }}>
        <div style={{ flex: "999 1 560px", minWidth: 0 }}>
          <h1 className="disp hero-heading" style={{ margin: 0, letterSpacing: ".03em", textTransform: "uppercase" }}>One House.<br />Every Generation.</h1>
          <p className="cas ox editorial-lead" style={{ fontStyle: "italic", margin: "34px 0 30px" }}>The house is where you gather.<br />What lies beyond it is the reason.</p>
          <p className="body" style={{ maxWidth: 560, margin: "0 0 34px" }}>Resort residences for families travelling across generations — a room for every branch, a table for all of you, and days designed for the pace of real life.</p>
          <hr className="rule" style={{ maxWidth: 560, borderColor: "var(--oxblood)" }} />
          <p className="cp ox" style={{ margin: "16px 0 6px", fontSize: 13 }}>Discovered by James Wild. Chosen for your family.</p>
          <p className="cp" style={{ margin: 0, fontSize: 13 }}>Still going since 1982.</p>
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

      <section className="wrap" style={{ paddingBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div>
            <p className="cp ox" style={{ margin: "0 0 10px" }}>Stay collection</p>
            <h2 className="cas section-heading" style={{ margin: 0 }}>Choose your region and start with the right place.</h2>
          </div>
          <Link href="/destinations/usa-mexico" className="cp" style={{ textDecoration: "none" }}>View all regions →</Link>
        </div>

        <div className="property-scroll" aria-label="Curated stays list">
          {all.slice(0, 6).map((r) => {
            const img = propertyImage(r);
            return (
              <article key={r.slug} className="property-card">
                <Link href={`/houses/${r.slug}`} style={{ textDecoration: "none" }}>
                  <Photo img={img} sizes="(max-width: 900px) 86vw, 380px" style={{ height: 260 }} />
                  <div className="property-card-copy">
                    <div className="property-card-meta cp">
                      <span>{r.place}</span>
                      <span>{r.country}</span>
                    </div>
                    <h3 className="cas">{r.name}</h3>
                    <p className="body" style={{ margin: "0.25rem 0 0" }}>{r.line}</p>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section aria-label="Archive" style={{ borderTop: "1px solid var(--sand)", borderBottom: "1px solid var(--sand)", padding: "70px 0 40px", background: "var(--paper-2)" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", marginBottom: 26 }}>
            <h2 className="cas section-heading" style={{ margin: 0 }}>From the archive</h2>
            <p className="cp">The days together</p>
          </div>
          <div className="strip-wrap">
            <div className="strip">
              {strip.map((img, i) => (
                <figure key={`${img.publicId}-${i}`} style={{ margin: 0 }}>
                  <div className="polaroid" style={{ padding: 12, transform: `rotate(${i % 2 ? 1 : -1.2}deg)` }}>
                    <Photo img={img} sizes="(max-width: 425px) 78vw, 330px" style={{ width: 320, height: 250, objectFit: "cover" }} />
                    <figcaption className="hand">{img.caption}</figcaption>
                  </div>
                  <p className="cp" style={{ margin: "12px 0 0" }}>{img.house}</p>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 110, paddingBottom: 110, display: "flex", flexWrap: "wrap", gap: 64 }}>
        <div style={{ flex: "1 1 320px", maxWidth: 400 }}>
          <p className="cp ox" style={{ margin: "0 0 14px" }}>The Gathering Formula</p>
          <h2 className="cas section-heading" style={{ margin: "0 0 22px" }}>Six tests. Every house passes all of them.</h2>
          <p className="body" style={{ margin: 0 }}>The James Wild &amp; Co way, written for families. A house that fails one is not entered in the Ledger.</p>
        </div>
        <ol style={{ flex: "2 1 560px", listStyle: "none", margin: 0, padding: 0, borderTop: "1.5px solid var(--charcoal)" }}>
          {[
            ["Room to gather", "One table for all of you, a door to close for each branch."],
            ["A day for every age", "Programs for children, real adventure for teens, an easy pace for elders."],
            ["Water within reach", "A river, a lake or a harbour — boat days belong in the plan."],
            ["Country at the door", "Land to step straight into, with guides who live there."],
            ["A resort behind you", "Kitchens, housekeeping and a safety net. Nobody spends the week as host."],
            ["Worth returning to", "The start of a family tradition, not a single trip."],
          ].map(([t, n], i) => (
            <li key={t} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 16, padding: "20px 0", borderBottom: "1px solid var(--stone)" }}>
              <span className="cp ox" style={{ fontSize: 14 }}>No. {String(i + 1).padStart(2, "0")}</span>
              <div><h3 className="cas card-heading" style={{ margin: "0 0 4px" }}>{t}</h3><p className="body" style={{ margin: 0 }}>{n}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section style={{ background: "var(--card)", borderTop: "1px solid var(--sand)", borderBottom: "1px solid var(--sand)" }}>
        <div className="wrap" style={{ paddingTop: 90, paddingBottom: 90 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16, marginBottom: 26 }}>
            <div><h2 className="cas section-heading" style={{ margin: 0, letterSpacing: ".04em", textTransform: "uppercase" }}>The Gatherings Ledger</h2><p className="cp" style={{ margin: "8px 0 0" }}>Entries {String(all.length).padStart(3, "0")}</p></div>
            <Link href="/ledger" className="cp" style={{ textDecoration: "none" }}>Open the ledger →</Link>
          </div>
        </div>
      </section>

      <section id="land-and-water" style={{ background: "var(--charcoal)", color: "var(--paper)" }}>
        <div className="wrap" style={{ paddingTop: 100, paddingBottom: 100, display: "flex", flexWrap: "wrap", gap: 64, alignItems: "center" }}>
          <div style={{ flex: "1 1 380px" }}>
            <p className="cp" style={{ margin: "0 0 14px", color: "var(--stone)" }}>Land &amp; Water</p>
            <h2 className="cas section-heading" style={{ margin: "0 0 26px" }}>Days arranged by age, not by brochure.</h2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid #5A5752" }}>
              {[["On the water", "Skippered boat days, offshore fishing, paddling"], ["On the land", "Riding, wildlife, trails set to the slowest walker"], ["The young ones", "Programs of their own with old-world confidence"]].map(([k, v]) => (
                <li key={k} className="land-row" style={{ padding: "16px 0", borderBottom: "1px solid #5A5752" }}><span className="cp" style={{ color: "var(--stone)" }}>{k}</span><span>{v}</span></li>
              ))}
            </ul>
          </div>
          <Photo img={feature} sizes="(max-width: 900px) 100vw, 560px" style={{ flex: "1 1 420px", height: 480 }} />
        </div>
      </section>
    </>
  );
}
