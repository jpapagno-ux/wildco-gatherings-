import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DestinationExplorer from "@/components/DestinationExplorer";
import JsonLd from "@/components/JsonLd";
import { getResidences } from "@/lib/data";
import { REGIONS, regionMeta } from "@/lib/regions";
import { staysInRegion } from "@/lib/browse";
import PageSketch from "@/components/PageSketch";
import { REGION_SKETCH } from "@/lib/sketch-borders";

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
  const houses = staysInRegion(await getResidences(), m.key);
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: `${m.label} — Wild & Co Gatherings`, url: `${SITE}/destinations/${key}`, description: m.description, mainEntity: { "@type": "ItemList", itemListElement: houses.map((h, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/houses/${h.slug}`, name: h.name })) } }} />
      <section className="wrap region-page-hero">
        <div>
          <nav aria-label="Breadcrumb" className="cp muted" style={{ fontSize: 11, marginBottom: 22 }}><Link href="/houses" style={{ textDecoration: "none" }}>Stays</Link> / {m.label}</nav>
          <p className="eb">Region · {houses.length} {houses.length === 1 ? "house" : "houses"}</p>
          <hr className="eb-rule" />
          <h1 className="dsp page-heading">{m.label}</h1>
          <p className="it region-intro">{m.intro}</p>
          <p className="body region-description">{m.description}</p>
          <Link href="/plan" className="btn region-enquiry">Plan a gathering in {m.label}</Link>
        </div>
      </section>
      <section className="wrap region-page-content">
        {houses.length ? (
          <DestinationExplorer residences={houses} />
        ) : (
          <div className="card" style={{ padding: "40px 36px", maxWidth: 720 }}>
            <p className="eb">Being curated</p>
            <h2 className="dsp" style={{ margin: "14px 0 12px", fontSize: 36 }}>This region is on James's list</h2>
            <p className="body" style={{ margin: "0 0 22px" }}>We're vetting family houses here now. Tell us who's coming and we'll plan around the right one.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}><Link href="/plan" className="btn">Plan a gathering here</Link><Link href="/horizon" className="lnk">On the Horizon <span>→</span></Link></div>
          </div>
        )}
      </section>
      <PageSketch k={REGION_SKETCH[m.key] || "route"} label={m.label} />
    </>
  );
}
