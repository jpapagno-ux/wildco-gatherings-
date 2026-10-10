"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import type { Residence } from "@/lib/types";

type MappableResidence = Residence & { lat: number; lng: number };

function MapFocus({ residences, activeSlug }: { residences: MappableResidence[]; activeSlug: string }) {
  const map = useMap();
  const previousSlug = useRef(activeSlug);

  useEffect(() => {
    if (!residences.length) return;
    if (residences.length === 1) {
      map.setView([residences[0].lat, residences[0].lng], 9);
      return;
    }
    map.fitBounds(residences.map(({ lat, lng }) => [lat, lng]), { padding: [36, 36], maxZoom: 7 });
  }, [map, residences]);

  useEffect(() => {
    if (previousSlug.current === activeSlug) return;
    previousSlug.current = activeSlug;
    const residence = residences.find((item) => item.slug === activeSlug);
    if (!residence) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) map.setView([residence.lat, residence.lng], 9);
    else map.flyTo([residence.lat, residence.lng], 9, { duration: 1.1 });
  }, [activeSlug, map, residences]);

  return null;
}

export default function InteractiveMap({
  residences,
  activeSlug,
  onSelect,
}: {
  residences: Residence[];
  activeSlug: string;
  onSelect: (slug: string) => void;
}) {
  const mappable = useMemo(
    () => residences.filter((item): item is MappableResidence => Number.isFinite(item.lat) && Number.isFinite(item.lng)),
    [residences],
  );
  const icons = useMemo(() => new Map(
    mappable.map((residence) => [
      residence.slug,
      L.divIcon({
        className: `stay-marker${activeSlug === residence.slug ? " is-active" : ""}`,
        html: '<span class="stay-marker-dot"></span>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
    ]),
  ), [activeSlug, mappable]);

  if (!mappable.length) {
    return <div className="destination-map-unavailable" role="status">Location coordinates are being prepared for this collection.</div>;
  }

  const first = mappable[0];
  return (
    <div className="interactive-map">
      <MapContainer
        center={[first.lat, first.lng]}
        zoom={5}
        minZoom={2}
        maxZoom={16}
        scrollWheelZoom={false}
        aria-label="Interactive map of stays"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapFocus residences={mappable} activeSlug={activeSlug} />
        {mappable.map((residence) => (
          <Marker
            key={residence.slug}
            position={[residence.lat, residence.lng]}
            icon={icons.get(residence.slug)}
            eventHandlers={{ click: () => onSelect(residence.slug) }}
          >
            <Tooltip direction="top" offset={[0, -12]}>{residence.name}</Tooltip>
            <Popup>
              <p className="cp ox">Wild &amp; Co Gatherings</p>
              <h2 className="cas">{residence.name}</h2>
              <p>{residence.place}{residence.country ? ` · ${residence.country}` : ""}</p>
              <Link href={`/houses/${residence.slug}`}>Explore this stay →</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
