import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import MapEmbed from "@/components/MapEmbed";
import Photo from "@/components/Photo";
import { getResidences } from "@/lib/data";
import { REGIONS, regionFor, regionMeta } from "@/lib/regions";
import { SETTINGS } from "@/lib/settings";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export function generateStaticParams() { return REGIONS.map((r) => ({ region: r.key })); }

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const m = regionMeta((await params).region);
  if (!m) return {};
  return { title: `Family Villas & Generational Residences in ${m.label} | Wild & Co Gatherings`, description: `${m.description} Vetted by James Wild for multigenerational families and family reunions.`.slice(0, 158), alternates: { canonical: `/destinations/${m.key}` } };
}

export default async function Destination({ params }: { params: Promise<{ region: string }> }) {
  const key = (await params).region;
  const m = regionMeta(key);
  if (!m) notFound();
  const houses = (await getResidences()).filter((h) => regionFor(h) === key);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: `${m.label} — Wild & Co Gatherings`, url: `${SITE}/destinations/${key}`, description: m.description, mainEntity: { "@type": "ItemList", itemListElement: houses.map((h, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/houses/${h.slug}`, name: h.name })) } }} />
      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 60, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 50, alignItems: "center" }}>
        <div>
          <nav aria-label="Breadcrumb" className="cp muted" style={{ fontSize: 11, marginBottom: 22 }}><Link href="/houses" style={{ textDecoration: "none" }}>Stays</Link> / {m.label}</nav>
          <p className="eb">Region · {houses.length} {houses.length === 1 ? "house" : "houses"}</p>
          <hr className="eb-rule" />
          <h1 className="dsp" style={{ margin: "24px 0 0", fontSize: "clamp(44px, 5.6vw, 76px)" }}>{m.label}</h1>
          <p className="it" style={{ margin: "18px 0 0", fontSize: 25, lineHeight: 1.35 }}>{m.intro}</p>
          <p className="body" style={{ margin: "16px 0 0" }}>{m.description}</p>
        </div>
        <MapEmbed items={houses.map((h) => ({ name: h.name, lat: h.lat, lng: h.lng }))} label={`Map of ${m.label} houses`} height={420} />
      </section>
      <section className="wrap" style={{ paddingBottom: 100 }}>
        {houses.length ? (
          <div className="stay-rail" role="list" aria-label={`${m.label} houses`}>
            {houses.map((h) => {
              const img = h.images.find((i) => i.role === "Hero") || h.images[0];
              return (
                <Link key={h.slug} href={`/houses/${h.slug}`} className="house-card" role="listitem">
                  <Photo img={img} sizes="380px" aspect="5:4" style={{ height: 300 }} />
                  <p className="cp muted" style={{ margin: "18px 0 0" }}>{h.place} · {h.country} · Entry {h.entryNo}</p>
                  <h2 className="ser" style={{ margin: "8px 0 0", fontSize: 26, fontWeight: 500 }}>{h.name}</h2>
                  <hr style={{ width: 30, height: 1, border: 0, background: SETTINGS[h.setting].ink, margin: "12px auto" }} />
                  <p className="body" style={{ margin: 0, fontSize: 15 }}>{h.line}</p>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="card" style={{ padding: "40px 36px", maxWidth: 720 }}>
            <p className="eb">Being curated</p>
            <h2 className="dsp" style={{ margin: "14px 0 12px", fontSize: 36 }}>This region is on James's list</h2>
            <p className="body" style={{ margin: "0 0 22px" }}>We're vetting family houses here now. Tell us who's coming and we'll plan around the right one.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}><Link href="/plan" className="btn">Plan a gathering here</Link><Link href="/horizon" className="lnk">On the Horizon <span>→</span></Link></div>
          </div>
        )}
      </section>
    </>
  );
}
