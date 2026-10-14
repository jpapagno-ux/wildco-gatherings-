import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { getItineraries } from "@/lib/extras";
import { getResidences } from "@/lib/data";
import { SETTINGS } from "@/lib/settings";
import { regionFor, regionMeta } from "@/lib/regions";
import { checkDuration, durationBand, DURATION_BANDS } from "@/lib/journeys";
import { templateIdFor } from "@/lib/entities";
import PageSketch from "@/components/PageSketch";
import JourneyDirectory, { type JourneyCard } from "./JourneyDirectory";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
export const metadata: Metadata = {
  title: "Family Journeys & Itineraries for Every Generation | Wild & Co Gatherings",
  description: "Multigenerational family journeys built around James Wild's vetted houses — from a few days at one house to longer chapters across several stays. Suggested templates you can save to My Folios.",
  alternates: { canonical: "/itineraries" },
};

export default async function Itineraries() {
  const [trips, houses] = await Promise.all([getItineraries(), getResidences()]);
  const H = Object.fromEntries(houses.map((h) => [h.slug, h]));
  const cards: JourneyCard[] = trips.filter((t) => H[t.house]).map((t) => {
    const h = H[t.house];
    const d = checkDuration(t);
    if (d.issues.length) console.warn(`[itinerary ${t.slug}] ${d.issues.join("; ")}`);
    const rk = regionFor(h);
    return {
      slug: t.slug, title: t.title,
      img: t.hero ? { publicId: t.hero, alt: t.title } : h.images.find((i) => i.role === "Hero") || h.images[0],
      days: d.days, nights: d.nights, region: regionMeta(rk)?.label || h.region, regionKey: rk,
      setting: h.setting, settingName: SETTINGS[h.setting].name, ink: SETTINGS[h.setting].ink,
      scope: (t.stops?.length || 0) > 1 ? "Several stays" : "One house", band: durationBand(d.days), from: h.name,
      templateId: templateIdFor(t.slug), draft: t.draft,
    };
  });
  return (
    <>
      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 100 }}>
        <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Family Journeys & Itineraries — Wild & Co Gatherings", itemListElement: cards.map((t, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/itineraries/${t.slug}`, name: t.title })) }} />
        <div style={{ textAlign: "center" }}>
          <p className="eb">Suggested journeys · {cards.length} templates</p>
          <h1 className="dsp" style={{ margin: "18px 0 0", fontSize: "clamp(40px, 5.6vw, 72px)" }}>Family Journeys &amp; Itineraries</h1>
          <p className="it" style={{ margin: "18px auto 18px", fontSize: 25, maxWidth: 760, lineHeight: 1.35 }}>A few days or a longer chapter—journeys shaped around your people, your pace, and the places worth sharing.</p>
          <p className="cp muted" style={{ margin: "0 auto 40px" }}>Suggested templates, not confirmed bookings · save one to My Folios to make it yours</p>
        </div>
        <JourneyDirectory cards={cards} bands={DURATION_BANDS} />
      </section>
      <PageSketch k={"route"} label="Family Journeys & Itineraries" />
    </>
  );
}
