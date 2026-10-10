import type { MetadataRoute } from "next";
import { getResidences } from "@/lib/data";
import { getPosts } from "@/lib/journal";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const houses = await getResidences();
  const posts = (await getPosts()).filter((p) => !p.draft);
  return [
    { url: `${SITE}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/ledger`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE}/plan`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/vip`, changeFrequency: "monthly", priority: 0.8 },
    ...[...new Set(houses.filter((h) => h.vip).map((h) => h.vip!.collectionSlug))].map((c) => ({ url: `${SITE}/vip/${c}`, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${SITE}/journal`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({ url: `${SITE}/journal/${p.slug}`, lastModified: p.date, changeFrequency: "monthly" as const, priority: 0.7 })),
    ...houses.map((h) => ({ url: `${SITE}/houses/${h.slug}`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
