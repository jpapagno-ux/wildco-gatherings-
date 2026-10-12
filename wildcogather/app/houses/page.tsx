import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { Icon } from "@/components/Marks";
import { getResidences } from "@/lib/data";
import { SETTINGS, SETTING_ORDER } from "@/lib/settings";
import { REGIONS, regionFor } from "@/lib/regions";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export const metadata: Metadata = {
  title: "Family Resort Residences by Natural Setting — Mountain, Jungle, Coast & Desert | Wild & Co Gatherings",
  description: "Every multigenerational resort residence in the Gatherings Ledger, grouped by natural setting — mountain ranches, jungle estates, island beach houses and desert reserves — chosen by James Wild.",
  alternates: { canonical: "/houses" },
};

// Every stay in Airtable appears here automatically, under its Setting. Empty settings are hidden.
export default async function Houses() {
  const all = await getResidences();
  const groups = SETTING_ORDER.map((k) => ({ s: SETTINGS[k], rows: all.filter((r) => r.setting === k) })).filter((g) => g.rows.length);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "The Houses — Wild & Co Gatherings", url: `${SITE}/houses`,
        mainEntity: { "@type": "ItemList", itemListElement: all.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/houses/${r.slug}`, name: r.name })) } }} />
      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 40, textAlign: "center" }}>
        <p className="eb">The Houses · {all.length} in the Ledger</p>
        <h1 className="dsp" style={{ margin: "18px 0 0", fontSize: "clamp(46px, 6vw, 80px)" }}>Houses &amp; horizons</h1>
        <p className="it" style={{ margin: "18px 0 0", fontSize: 28 }}>The house is your base. What lies beyond it is the reason.</p>
        <nav aria-label="Settings" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 30px", marginTop: 36 }}>
          {groups.map(({ s, rows }) => (
            <a key={s.key} href={`#${s.key}`} className="cp" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, color: s.ink }}>
              <Icon name={s.key} size={22} color={s.ink} />{s.name} · {rows.length}
            </a>
          ))}
        </nav>
        <nav aria-label="Regions" className="cp" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "8px 22px", marginTop: 22 }}>
          <span className="muted">By region:</span>
          {REGIONS.map((g) => ({ g, n: all.filter((h) => regionFor(h) === g.key).length })).filter(({ n }) => n).map(({ g, n }) => (
            <Link key={g.key} href={`/destinations/${g.key}`} className="lnk" style={{ borderBottomWidth: 1 }}>{g.label} · {n}</Link>
          ))}
        </nav>
      </section>
      {groups.map(({ s, rows }) => (
        <section key={s.key} id={s.key} className="wrap" style={{ paddingTop: 60, paddingBottom: 30, scrollMarginTop: 140 }}>
          <div style={{ display: "flex", alignItems: "end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, borderBottom: "1px solid var(--stone)", paddingBottom: 16, marginBottom: 34 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <Icon name={s.key} size={40} color={s.ink} />
              <div><h2 className="dsp" style={{ margin: 0, fontSize: 40 }}>{s.name}</h2><p className="it" style={{ margin: "4px 0 0", fontSize: 20, color: s.ink }}>{s.sub}</p></div>
            </div>
            <p className="cp muted" style={{ margin: 0 }}>{rows.length} {rows.length === 1 ? "house" : "houses"}</p>
          </div>
          <div className="house-grid">
            {rows.map((r) => {
              const img = r.images.find((i) => i.role === "Hero") || r.images[0];
              return (
                <Link key={r.slug} href={`/houses/${r.slug}`} className="house-card">
                  <Photo img={img} sizes="(max-width: 700px) 100vw, 380px" aspect="5:4" style={{ height: 300 }} />
                  <p className="cp muted" style={{ margin: "18px 0 0" }}>Entry {r.entryNo} · {r.place}, {r.region}</p>
                  <h3 className="ser" style={{ margin: "8px 0 0", fontSize: 26, fontWeight: 500 }}>{r.name}</h3>
                  <hr style={{ width: 30, height: 1, border: 0, background: s.ink, margin: "12px auto" }} />
                  <p className="cp oxblood" style={{ margin: 0 }}>{r.stamp}{r.vip ? " · Gatherings VIP" : ""}</p>
                </Link>
              );
            })}
          </div>
        </section>
      ))}
      <div style={{ height: 80 }} />
    </>
  );
}
