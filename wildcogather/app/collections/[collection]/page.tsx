import { fit } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import PropertyCollectionView from "@/components/PropertyCollectionView";
import { propertyCollections, getPropertyCollection, collectionPath } from "@/lib/collections";
import { getOgImageUrl } from "@/lib/cloudinary-loader";

// A partner's houses on one page, without the Gatherings VIP stamp (see lib/collections.ts › propertyCollections).
// A collection James has approved for Gatherings VIP lives at /vip/[slug]; its old address here redirects permanently
// (next.config.ts also redirects /collections/more → /vip/more, James, 30 Oct 2026).
export const revalidate = 3600;

export async function generateStaticParams() { return propertyCollections.filter((c) => !c.vip).map((c) => ({ collection: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const c = getPropertyCollection((await params).collection);
  if (!c || c.vip) return fit({});
  return fit({
    title: c.seoTitle,
    description: c.metaDescription,
    alternates: { canonical: collectionPath(c) },
    openGraph: { title: c.seoTitle, description: c.metaDescription, images: [getOgImageUrl(c.hero)] },
  });
}

export default async function PropertyCollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const c = getPropertyCollection((await params).collection);
  if (!c) notFound();
  if (c.vip) permanentRedirect(collectionPath(c));
  return <PropertyCollectionView collection={c} />;
}
