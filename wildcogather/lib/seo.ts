import type { Metadata } from "next";

// Search results show about 60 characters of a title and 155–160 of a description.
// fit() keeps every page inside those limits without cutting words, and gives every page a share image.
const SUFFIXES = [" | Wild & Co Gatherings", " | Wild & Co Journal", " | Wild & Co"];

export function fitTitle(t?: string, max = 60) {
  if (!t) return t;
  let s = t.trim();
  if (s.length <= max) return s;
  for (const suf of SUFFIXES) if (s.endsWith(suf)) { s = s.slice(0, -suf.length); break; }
  if (s.length <= max - 12 && !/Wild & Co/.test(s)) s = `${s} | Wild & Co`;
  return s;
}

export function fitDescription(d?: string, max = 158) {
  if (!d) return d;
  const s = d.replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > 90) return cut.slice(0, sentence + 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]+$/, "")}…`;
}

const DEFAULT_OG = "/brand/og-default.jpg";

export function fit(m: Metadata): Metadata {
  const title = typeof m.title === "string" ? fitTitle(m.title) : m.title;
  const description = fitDescription(m.description ?? undefined);
  const og = (m.openGraph || {}) as NonNullable<Metadata["openGraph"]>;
  const images = (og as { images?: unknown }).images;
  const hasImage = Array.isArray(images) ? images.length > 0 : !!images;
  return {
    ...m,
    title,
    description,
    openGraph: {
      ...og,
      title: typeof og.title === "string" ? fitTitle(og.title, 70) : (typeof title === "string" ? title : undefined),
      description: og.description ? fitDescription(og.description as string, 200) : description,
      images: hasImage ? images as never : [DEFAULT_OG],
    },
    twitter: { card: "summary_large_image", ...(m.twitter || {}) },
  };
}
