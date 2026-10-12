import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { getItineraries } from "@/lib/extras";
import { getResidences } from "@/lib/data";
import { SETTINGS } from "@/lib/settings";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
export const metadata: Metadata = {
  title: "Short Family Itineraries: 3 & 4 Days From Each House | Wild & Co Gatherings",
  description: "Three- and four-day multigenerational itineraries built around one resort residence — arrival, days on land and water, and the long table — planned by James Wild.",
  alternates: { canonical: "/itineraries" },
};

export default async function Itineraries() {
  const [trips, houses] = await Promise.all([getItineraries(), getResidences()]);
  const H = Object.fromEntries(houses.map((h) => [h.slug, h]));
  return (
    <section className="wrap" style={{ paddingTop: 90, paddingBottom: 100 }}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Short itineraries — Wild & Co Gatherings", itemListElement: trips.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/itineraries/${t.slug}`, name: t.title })) }} />
      <div style={{ textAlign: "center" }}>
        <p className="eb">Short itineraries · 3 &amp; 4 days</p>
        <h1 className="dsp" style={{ margin: "18px 0 0", fontSize: "clamp(44px, 6vw, 76px)" }}>A few days, well spent</h1>
        <p className="it" style={{ margin: "18px auto 50px", fontSize: 26, maxWidth: 720 }}>Arrive, settle, and let each day do one thing beautifully — built around one house.</p>
      </div>
      <div className="house-grid">
        {trips.map((t) => {
          const h = H[t.house];
          const img = t.hero ? { publicId: t.hero, alt: t.title } : h?.images.find((i) => i.role === "Hero") || h?.images[0];
          return (
            <Link key={t.slug} href={`/itineraries/${t.slug}`} className="house-card">
              <Photo img={img} sizes="(max-width: 700px) 100vw, 380px" aspect="4:3" style={{ height: 280 }} />
              <p className="cp muted" style={{ margin: "18px 0 0" }}>{t.days} days · {t.nights} nights{h ? ` · ${h.region}` : ""}</p>
              <h2 className="ser" style={{ margin: "8px 0 0", fontSize: 26, fontWeight: 500 }}>{t.title}</h2>
              <hr style={{ width: 30, height: 1, border: 0, background: h ? SETTINGS[h.setting].ink : "var(--rust)", margin: "12px auto" }} />
              <p className="cp" style={{ margin: 0 }}>From {h?.name || t.house}{t.draft ? " · sample" : ""}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
