import { LEGAL } from "@/lib/legal";
import type { MetadataRoute } from "next";
import { getResidences } from "@/lib/data";
import { getPosts } from "@/lib/journal";
import { getItineraries } from "@/lib/extras";
import { getHorizon } from "@/lib/horizon";
import { getWebinars } from "@/lib/webinars";
import { REGIONS } from "@/lib/regions";
import { staysInRegion } from "@/lib/browse";
import { SITE } from "@/lib/site";
import { propertyCollections, vipPropertyCollections, collectionPath } from "@/lib/collections";


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
    { url: `${SITE}/destinations`, changeFrequency: "weekly", priority: 0.8 },
    ...REGIONS.filter((r) => staysInRegion(houses, r.key).length).map((r) => ({ url: `${SITE}/destinations/${r.key}`, changeFrequency: "weekly" as const, priority: 0.8 })),
    { url: `${SITE}/founder`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/how-it-works`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/questions`, changeFrequency: "weekly", priority: 0.7 },
    ...(LEGAL.reviewed ? ["/privacy", "/terms", "/privacy-choices"].map((p) => ({ url: `${SITE}${p}`, changeFrequency: "yearly" as const, priority: 0.2 })) : []),
    { url: `${SITE}/advisors`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/webinars`, changeFrequency: "weekly", priority: 0.7 },
    ...webinars.map((w) => ({ url: `${SITE}/webinars/${w.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    { url: `${SITE}/horizon`, changeFrequency: "weekly", priority: 0.8 },
    ...horizon.map((h) => ({ url: `${SITE}/horizon/${h.slug}`, lastModified: h.updated, changeFrequency: "weekly" as const, priority: 0.7 })),
    { url: `${SITE}/plan`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/vip`, changeFrequency: "monthly", priority: 0.8 },
    ...[...new Set([...houses.filter((h) => h.vip).map((h) => h.vip!.collectionSlug), ...vipPropertyCollections.map((c) => c.slug)])].map((c) => ({ url: `${SITE}/vip/${c}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    // Plain (non-VIP) property collections only; a VIP one's /collections/ address redirects to /vip/.
    ...propertyCollections.filter((c) => !c.vip).map((c) => ({ url: `${SITE}${collectionPath(c)}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE}/journal`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({ url: `${SITE}/journal/${p.slug}`, lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...houses.map((h) => ({ url: `${SITE}/houses/${h.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
