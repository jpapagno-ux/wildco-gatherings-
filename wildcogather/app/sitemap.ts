import type { MetadataRoute } from "next";
import { getResidences } from "@/lib/data";
import { getPosts } from "@/lib/journal";
import { getItineraries } from "@/lib/extras";
import { getHorizon } from "@/lib/horizon";
import { getWebinars } from "@/lib/webinars";
import { REGIONS } from "@/lib/regions";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const houses = await getResidences();
  const posts = (await getPosts()).filter((p) => !p.draft);
  const trips = (await getItineraries()).filter((t) => !t.draft);
  const horizon = (await getHorizon()).filter((h) => !h.draft);
  const webinars = await getWebinars();
  return [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/houses`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/ledger`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/itineraries`, changeFrequency: "weekly", priority: 0.8 },
    ...trips.map((t) => ({ url: `${SITE}/itineraries/${t.slug}`, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...REGIONS.map((r) => ({ url: `${SITE}/destinations/${r.key}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: `${SITE}/founder`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/advisors`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/webinars`, changeFrequency: "weekly", priority: 0.7 },
    ...webinars.map((w) => ({ url: `${SITE}/webinars/${w.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    { url: `${SITE}/horizon`, changeFrequency: "weekly", priority: 0.8 },
    ...horizon.map((h) => ({ url: `${SITE}/horizon/${h.slug}`, lastModified: h.updated, changeFrequency: "weekly" as const, priority: 0.7 })),
    { url: `${SITE}/plan`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/vip`, changeFrequency: "monthly", priority: 0.8 },
    ...[...new Set(houses.filter((h) => h.vip).map((h) => h.vip!.collectionSlug))].map((c) => ({ url: `${SITE}/vip/${c}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE}/journal`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({ url: `${SITE}/journal/${p.slug}`, lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...houses.map((h) => ({ url: `${SITE}/houses/${h.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
