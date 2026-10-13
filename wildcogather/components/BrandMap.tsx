"use client";

import { useEffect, useMemo, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import type { Residence } from "@/lib/types";
import { SETTINGS } from "@/lib/settings";
import { applyBrandTheme, mapConfig } from "@/lib/map-theme";

type Pin = { key: string; lat: number; lng: number; items: Array<{ r: Residence; n: string }> };

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

function card(items: Pin["items"]) {
  return items.map(({ r, n }) => {
    const settingName = SETTINGS[r.setting]?.name || "";
    const kicker = [n, r.entryNo, settingName].filter(Boolean).join(" · ");
    const where = [r.place, r.country].filter(Boolean).join(" · ");
    const sleeps = r.sleeps ? `Sleeps ${r.sleeps}` : r.bedrooms ? `${r.bedrooms} bedrooms` : "Family residence";
    return `<div class="bm-card"><p class="bm-k">${esc(kicker)}</p><p class="bm-h">${esc(r.name)}</p><p class="bm-p">${esc(where)}</p><p class="bm-row"><span>${esc(sleeps)}</span><a href="/houses/${esc(r.slug)}">Explore this stay →</a></p></div>`;
  }).join("");
}

/** Group stays that sit on top of each other (e.g. two villas at one lodge) into one pin. */
function groupPins(residences: Residence[]): Pin[] {
  const pins: Pin[] = [];
  residences.forEach((r, i) => {
    if (!Number.isFinite(r.lat) || !Number.isFinite(r.lng)) return;
    const n = String(i + 1).padStart(2, "0");
    const near = pins.find((p) => Math.abs(p.lat - (r.lat as number)) < 0.12 && Math.abs(p.lng - (r.lng as number)) < 0.12);
    if (near) near.items.push({ r, n });
    else pins.push({ key: r.slug, lat: r.lat as number, lng: r.lng as number, items: [{ r, n }] });
  });
  return pins;
}

export default function BrandMap({
  residences, activeSlug, onSelect, variant = "region", label = "Map of stays",
}: {
  residences: Residence[];
  activeSlug?: string;
  onSelect?: (slug: string) => void;
  variant?: "region" | "house";
  label?: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markers = useRef<Map<string, { el: HTMLElement; pin: Pin; popup: mapboxgl.Popup }>>(new Map());
  const pins = useMemo(() => groupPins(residences), [residences]);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!box.current || !pins.length) return;
    const cfg = mapConfig();
    mapboxgl.accessToken = cfg.token;
    const house = variant === "house";
    const map = new mapboxgl.Map({
      container: box.current,
      style: cfg.style,
      projection: "mercator",
      center: [pins[0].lng, pins[0].lat],
      zoom: house ? 8.4 : 4,
      minZoom: 2,
      maxZoom: 15,
      cooperativeGestures: true,
      attributionControl: false,
    });
    mapRef.current = map;
    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "bottom-left");
    map.addControl(new mapboxgl.ScaleControl({ maxWidth: 110, unit: "metric" }), "bottom-left");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }), "bottom-right");
    map.on("style.load", () => { if (cfg.recolour) applyBrandTheme(map, cfg.theme); });

    if (!house && pins.length > 1) {
      const b = new mapboxgl.LngLatBounds();
      pins.forEach((p) => b.extend([p.lng, p.lat]));
      map.fitBounds(b, { padding: 70, maxZoom: 8, duration: 0 });
    }

    pins.forEach((pin) => {
      const el = document.createElement("button");
      el.type = "button";
      el.className = "bm-pin";
      const first = pin.items[0].r;
      el.style.setProperty("--set", SETTINGS[first.setting]?.ink || "#2C2A27");
      el.textContent = pin.items.length > 1 ? `${pin.items[0].n}·${pin.items[pin.items.length - 1].n}` : pin.items[0].n;
      if (pin.items.length > 1) el.classList.add("bm-pin--group");
      el.setAttribute("aria-label", pin.items.map((i) => i.r.name).join(", "));
      const popup = new mapboxgl.Popup({ offset: 22, closeButton: false, maxWidth: "290px", className: "bm-popup", anchor: house ? "left" : undefined }).setHTML(card(pin.items));
      const marker = new mapboxgl.Marker({ element: el }).setLngLat([pin.lng, pin.lat]).setPopup(popup).addTo(map);
      el.addEventListener("click", () => onSelectRef.current?.(first.slug));
      markers.current.set(pin.key, { el, pin, popup });
      if (house) map.on("load", () => marker.togglePopup());
    });

    return () => { markers.current.clear(); map.remove(); mapRef.current = null; };
  }, [pins, variant]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activeSlug || variant === "house") return;
    markers.current.forEach(({ el, pin, popup }) => {
      const on = pin.items.some((i) => i.r.slug === activeSlug);
      el.classList.toggle("is-active", on);
      if (on) {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        map[reduced ? "jumpTo" : "flyTo"]({ center: [pin.lng, pin.lat], zoom: Math.max(map.getZoom(), 6), ...(reduced ? {} : { duration: 1100 }) });
        if (!popup.isOpen()) popup.setLngLat([pin.lng, pin.lat]).addTo(map);
      } else if (popup.isOpen()) popup.remove();
    });
  }, [activeSlug, variant]);

  if (!pins.length) return <div className="destination-map-unavailable" role="status">Location coordinates are being prepared.</div>;
  return <div ref={box} className={`brand-map brand-map--${variant}`} role="region" aria-label={label} />;
}
