"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Photo from "@/components/Photo";
import DestinationMap from "@/components/DestinationMap";
import { destinations, hasCoordinates, type DestinationRegion } from "@/lib/destinations";
import type { Residence } from "@/lib/types";

export default function DestinationBrowser({ residences, region }: { residences: Residence[]; region: DestinationRegion }) {
  const destination = destinations.find((d) => d.slug === region)!;
  const [activeSlug, setActiveSlug] = useState<string | undefined>(residences[0]?.slug);
  const [selectionRequest, setSelectionRequest] = useState(0);
  const cards = useRef(new Map<string, HTMLElement>());
  const mapColumn = useRef<HTMLElement>(null);
  const items = useMemo(() => residences.filter(hasCoordinates).map((r) => ({ slug: r.slug, name: r.name, lat: r.lat, lng: r.lng })), [residences]);
  const active = residences.find((r) => r.slug === activeSlug);

  const select = useCallback((slug: string) => {
    setActiveSlug(slug);
    setSelectionRequest((value) => value + 1);
    const card = cards.current.get(slug);
    card?.scrollIntoView({ block: "center", behavior: "instant" });
    card?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    let observer: IntersectionObserver;
    const observe = () => {
      observer?.disconnect();
      const visible = new Map<string, number>();
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const slug = (entry.target as HTMLElement).dataset.slug!;
          if (entry.isIntersecting) visible.set(slug, entry.intersectionRatio);
          else visible.delete(slug);
        }
        const closest = [...visible].sort((a, b) => b[1] - a[1])[0];
        if (closest) setActiveSlug(closest[0]);
      }, { rootMargin: `-${Math.round(window.innerHeight * 0.2)}px 0px -${Math.round(window.innerHeight * 0.3)}px 0px`, threshold: [0, 0.25, 0.5, 0.75, 1] });
      cards.current.forEach((card) => observer.observe(card));
    };
    observe();
    window.addEventListener("resize", observe);
    return () => { observer.disconnect(); window.removeEventListener("resize", observe); };
  }, [residences]);

  return (
    <section className="wrap region-page-content destination-browser" aria-label={`${destination.label} stays and live map`}>
      <aside ref={mapColumn} className="destination-map-column">
        <p className="cp ox">Live destination map</p>
        <DestinationMap items={items} region={region} activeSlug={activeSlug} selectionRequest={selectionRequest} onSelect={select} onOverview={() => setActiveSlug(undefined)} />
        <p className="caption muted">Drag to explore, use + / − to zoom, or select a numbered pin. Scroll the stays to follow their locations.</p>
        <p className="caption" role="status">
          {active ? `${active.name}${hasCoordinates(active) ? ` · GPS ${active.lat.toFixed(5)}, ${active.lng.toFixed(5)}` : " · GPS location not yet supplied; no pin is shown."}` : residences.length ? "Region overview. Only stays with supplied GPS coordinates are pinned." : "Explore the region on the live map. Stays are being curated; no property pins are shown yet."}
        </p>
        {items.length < residences.length && <p className="caption muted">{residences.length - items.length} stays await valid GPS coordinates. Only supplied locations are pinned.</p>}
      </aside>

      <div className="destination-list">
        {residences.length ? residences.map((res) => {
          const hero = res.images.find((image) => image.role === "Card") || res.images[0];
          const markerIndex = items.findIndex((item) => item.slug === res.slug);
          return (
            <article key={res.slug} data-slug={res.slug} ref={(node) => { if (node) cards.current.set(res.slug, node); else cards.current.delete(res.slug); }} tabIndex={-1} aria-label={res.name} className={`property-card destination-card${activeSlug === res.slug ? " is-active" : ""}`}>
              <Link href={`/houses/${res.slug}`} style={{ textDecoration: "none" }}>
                <Photo img={hero} sizes="(max-width: 900px) 100vw, 600px" style={{ height: 300 }} />
                <div className="property-card-copy">
                  <div className="property-card-meta cp"><span>{res.place}</span><span>{res.country}</span></div>
                  <h2 className="cas card-heading" style={{ margin: "0.5rem 0" }}>{res.name}</h2>
                  <p className="body" style={{ margin: 0 }}>{res.line}</p>
                </div>
              </Link>
              <div className="destination-card-actions">
                {markerIndex >= 0 ? <button type="button" className="btn" onClick={() => {
                  setActiveSlug(res.slug);
                  setSelectionRequest((value) => value + 1);
                  if (window.matchMedia("(max-width: 900px)").matches) mapColumn.current?.scrollIntoView({ block: "start", behavior: "instant" });
                }} aria-pressed={activeSlug === res.slug}>Show on map · {markerIndex + 1}</button> : <span className="caption muted">GPS location awaiting confirmation</span>}
                <Link href={`/houses/${res.slug}`} className="cp">Explore stay →</Link>
              </div>
            </article>
          );
        }) : (
          <div className="region-empty">
            <p className="cp ox">In curation</p>
            <h2 className="cas section-heading">This region is being curated.</h2>
            <p className="body">Explore the live map while we prepare the collection. Tell us where you’d like to gather and we’ll help you find the right stay.</p>
            <Link href={`/plan?region=${region}`} className="btn">Enquire about this region</Link>
            <p><Link href="/ledger">Browse all current stays →</Link></p>
          </div>
        )}
      </div>
    </section>
  );
}
