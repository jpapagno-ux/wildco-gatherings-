"use client";

import dynamic from "next/dynamic";
import type { Residence } from "@/lib/types";

const loading = () => <div className="destination-map-loading" role="status">Preparing the location map…</div>;
// Mapbox when NEXT_PUBLIC_MAPBOX_TOKEN is set; otherwise the OpenStreetMap fallback.
const BrandMap = dynamic(() => import("./BrandMap"), { ssr: false, loading });
const InteractiveMap = dynamic(() => import("./InteractiveMap"), { ssr: false, loading });

export default function StayMap({
  residences, activeSlug, onSelect, variant = "region", label,
}: {
  residences: Residence[];
  activeSlug?: string;
  onSelect?: (slug: string) => void;
  variant?: "region" | "house";
  label?: string;
}) {
  if (process.env.NEXT_PUBLIC_MAPBOX_TOKEN) {
    return <BrandMap residences={residences} activeSlug={activeSlug} onSelect={onSelect} variant={variant} label={label} />;
  }
  return <InteractiveMap residences={residences} activeSlug={activeSlug ?? residences[0]?.slug ?? ""} onSelect={onSelect ?? (() => {})} />;
}
