"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap, Marker } from "leaflet";
import { destinations, type DestinationRegion } from "@/lib/destinations";

type MapItem = { slug: string; name: string; lat: number; lng: number };

export default function DestinationMap({ items, region, activeSlug, onSelect }: {
  items: MapItem[];
  region: DestinationRegion;
  activeSlug?: string;
  onSelect: (slug: string) => void;
}) {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const markers = useRef(new Map<string, Marker>());
  const select = useRef(onSelect);
  const reset = useRef<(() => void) | null>(null);
  const [ready, setReady] = useState(false);
  const [wheelZoom, setWheelZoom] = useState(false);
  const [message, setMessage] = useState("Loading live map…");
  select.current = onSelect;

  useEffect(() => {
    let disposed = false;
    let resize: ResizeObserver | undefined;
    setReady(false);
    setWheelZoom(false);
    setMessage("Loading live map…");
    const destination = destinations.find((d) => d.slug === region)!;
    import("leaflet").then((L) => {
      if (disposed || !container.current) return;
      const instance = L.map(container.current, { scrollWheelZoom: false, worldCopyJump: true });
      map.current = instance;
      const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(instance);
      tiles.on("tileerror", () => { if (!disposed) setMessage("Some map tiles could not load. Check your connection; stay links and GPS details remain available."); });
      tiles.on("load", () => { if (!disposed && tiles.isLoading() === false) setMessage((value) => value.startsWith("Loading") ? "" : value); });
      const overview = () => {
        instance.stop();
        if (items.length > 1) instance.fitBounds(L.latLngBounds(items.map((item) => [item.lat, item.lng])), { padding: [35, 35], maxZoom: 10, animate: false });
        else if (items.length === 1) instance.setView([items[0].lat, items[0].lng], 10, { animate: false });
        else instance.setView([...destination.center], destination.zoom, { animate: false });
      };
      reset.current = overview;
      items.forEach((item, i) => {
        const marker = L.marker([item.lat, item.lng], {
          icon: L.divIcon({ className: "destination-pin", html: `<span>${i + 1}</span>`, iconSize: [36, 36], iconAnchor: [18, 18] }),
          title: item.name,
          alt: `Show ${item.name}`,
          keyboard: true,
        }).addTo(instance);
        const label = document.createElement("span");
        label.textContent = item.name;
        marker.bindTooltip(label, { direction: "top" });
        marker.on("click", () => select.current(item.slug));
        markers.current.set(item.slug, marker);
      });
      overview();
      resize = new ResizeObserver(() => instance.invalidateSize());
      resize.observe(container.current);
      setReady(true);
    }).catch(() => { if (!disposed) setMessage("The live map could not load. You can still browse every stay and its supplied GPS details below."); });
    return () => {
      disposed = true;
      resize?.disconnect();
      map.current?.remove();
      map.current = null;
      markers.current.clear();
      reset.current = null;
    };
  }, [items, region]);

  useEffect(() => {
    if (!ready || !map.current) return;
    markers.current.forEach((marker, slug) => {
      marker.getElement()?.classList.toggle("is-active", slug === activeSlug);
      marker.setZIndexOffset(slug === activeSlug ? 1000 : 0);
      if (slug !== activeSlug) marker.closeTooltip();
    });
    const marker = activeSlug ? markers.current.get(activeSlug) : undefined;
    if (marker) {
      map.current.stop();
      map.current.flyTo(marker.getLatLng(), 12, { animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches, duration: 0.8 });
      marker.openTooltip();
    } else reset.current?.();
  }, [activeSlug, ready]);

  return (
    <div className="map-panel">
      <div ref={container} className="destination-live-map" role="region" aria-label={`${destinations.find((d) => d.slug === region)!.label} interactive map`} />
      <div className="destination-map-tools">
        <button type="button" className="btn" disabled={!ready} onClick={() => reset.current?.()}>Show all locations</button>
        <button type="button" className="btn" disabled={!ready} onClick={() => {
          const instance = map.current;
          if (!instance) return;
          if (instance.scrollWheelZoom.enabled()) instance.scrollWheelZoom.disable();
          else instance.scrollWheelZoom.enable();
          setWheelZoom(instance.scrollWheelZoom.enabled());
        }} aria-pressed={wheelZoom}>{wheelZoom ? "Disable" : "Enable"} scroll zoom</button>
      </div>
      {message && <p className="caption map-message" role="status">{message}</p>}
    </div>
  );
}
