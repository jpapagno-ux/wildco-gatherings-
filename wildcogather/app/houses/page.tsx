import type { Metadata } from "next";
import Link from "next/link";
import StayCard from "@/components/StayCard";
import JsonLd from "@/components/JsonLd";
import { Icon } from "@/components/Marks";
import { getResidences } from "@/lib/data";
import { SETTINGS, SETTING_ORDER } from "@/lib/settings";
import { browseNav, staysInSetting } from "@/lib/browse";
import PageSketch from "@/components/PageSketch";

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
  const groups = SETTING_ORDER.map((k) => ({ s: SETTINGS[k], rows: staysInSetting(all, k) })).filter((g) => g.rows.length);
  const regions = browseNav(all).regions.filter((g) => g.count);
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
          {regions.map((g) => (
            <Link key={g.href} href={g.href} className="lnk" style={{ borderBottomWidth: 1 }}>{g.label} · {g.count}</Link>
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
            {rows.map((r) => <StayCard key={r.slug} r={r} />)}
          </div>
        </section>
      ))}
      <div style={{ height: 80 }} />
      <PageSketch k={"route"} label="The houses" />
    </>
  );
}
