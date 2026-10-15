import { fit } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import PageSketch from "@/components/PageSketch";
import { getResidences } from "@/lib/data";
import { REGIONS } from "@/lib/regions";
import { staysInRegion } from "@/lib/browse";
import { REGION_HERO } from "@/lib/hero-library";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = fit({
  title: "Destinations for Family & Generational Travel | Wild & Co Gatherings",
  description: "Where the Gatherings Ledger houses are: Africa, the Americas, Europe, Asia and the islands — each region with the family residences James Wild has chosen.",
  alternates: { canonical: "/destinations" },
});

export default async function Destinations() {
  const all = await getResidences();
  const regions = REGIONS.map((r) => ({ ...r, houses: staysInRegion(all, r.key) }));
  const live = regions.filter((r) => r.houses.length);
  const soon = regions.filter((r) => !r.houses.length);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Destinations — Wild & Co Gatherings", url: `${SITE}/destinations`, mainEntity: { "@type": "ItemList", itemListElement: live.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/destinations/${r.key}`, name: r.label })) } }} />
      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 40 }}>
        <p className="eb">Gatherings · {all.length} houses in {live.length} regions</p>
        <hr className="eb-rule" />
        <h1 className="dsp" style={{ margin: "24px 0 0", fontSize: "clamp(42px, 5.4vw, 74px)" }}>Destinations</h1>
        <p className="it" style={{ margin: "16px 0 0", fontSize: 24, lineHeight: 1.35, maxWidth: 760 }}>Where the houses are, and what surrounds them.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: 60 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 26 }}>
          {live.map((r) => {
            const img = REGION_HERO[r.key];
            return (
              <Link key={r.key} href={`/destinations/${r.key}`} className="card" style={{ display: "grid", textDecoration: "none" }}>
                <Photo img={img} sizes="(max-width: 700px) 100vw, 480px" aspect="4:3" className="dest-card-photo" style={{ height: 260 }} />
                <div style={{ padding: "22px 24px 26px" }}>
                  <p className="cp muted" style={{ margin: 0 }}>{r.houses.length} {r.houses.length === 1 ? "house" : "houses"}</p>
                  <h2 className="ser" style={{ margin: "8px 0 8px", fontSize: 30, fontWeight: 500 }}>{r.label}</h2>
                  <p className="body" style={{ margin: 0, fontSize: 15 }}>{r.intro}</p>
                </div>
              </Link>
            );
          })}
        </div>
        {soon.length > 0 && <p className="cp muted" style={{ margin: "30px 0 0" }}>Being curated: {soon.map((r) => r.label).join(" · ")}</p>}
      </section>
      <PageSketch k="route" label="Destinations" />
    </>
  );
}
