"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Residence } from "@/lib/types";
import { cardImage } from "@/lib/browse";
import Photo from "./Photo";

const InteractiveMap = dynamic(() => import("./InteractiveMap"), {
  ssr: false,
  loading: () => <div className="destination-map-loading" role="status">Preparing the location map…</div>,
});

export default function DestinationExplorer({ residences }: { residences: Residence[] }) {
  const [activeSlug, setActiveSlug] = useState(residences[0]?.slug ?? "");

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-residence-slug]");
    const visible = new Map<HTMLElement, number>();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.set(entry.target as HTMLElement, entry.boundingClientRect.top + entry.boundingClientRect.height / 2);
        }
        else visible.delete(entry.target as HTMLElement);
      });

      const nearest = [...visible.entries()].sort(
        ([, first], [, second]) => Math.abs(first - window.innerHeight * 0.45) - Math.abs(second - window.innerHeight * 0.45),
      )[0]?.[0];
      if (nearest?.dataset.residenceSlug) setActiveSlug(nearest.dataset.residenceSlug);
    }, { rootMargin: "-30% 0px -40% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] });

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [residences]);

  return (
    <div className="destination-explorer">
      <aside className="destination-map-column" aria-label="Map of stays">
        <div className="destination-map-heading">
          <p className="cp ox">Find your place</p>
          <p className="cas">A sense of where it all begins.</p>
        </div>
        <InteractiveMap residences={residences} activeSlug={activeSlug} onSelect={setActiveSlug} />
        <p className="destination-map-note">Map locations are approximate. Select a marker or stay to explore.</p>
      </aside>

      <section className="destination-list" aria-label="Stays in this region">
        {residences.map((residence, index) => {
          const image = cardImage(residence);
          return (
            <article
              key={residence.slug}
              className="destination-card"
              data-residence-slug={residence.slug}
              data-active={activeSlug === residence.slug}
              onMouseEnter={() => setActiveSlug(residence.slug)}
              onClick={(event) => {
                if (!(event.target as HTMLElement).closest("a, button")) setActiveSlug(residence.slug);
              }}
            >
              <Link href={`/houses/${residence.slug}`} className="destination-card-image" aria-label={`Explore ${residence.name}`}>
                {/* Resized and subject-cropped by Cloudinary, so a large original never ships to the phone. */}
                <Photo img={image ? { ...image, alt: image.alt || residence.name } : undefined} aspect="4:3" sizes="(max-width: 700px) 100vw, (max-width: 900px) 45vw, 320px" className="destination-card-photo" style={{ position: "absolute", inset: 0 }} />
                <span className="destination-card-number cp">{String(index + 1).padStart(2, "0")}</span>
              </Link>
              <div className="destination-card-copy">
                <p className="cp muted destination-card-location">{residence.place}{residence.country ? ` · ${residence.country}` : ""}</p>
                <h2 className="cas card-heading"><Link href={`/houses/${residence.slug}`}>{residence.name}</Link></h2>
                <p className="destination-card-line">{residence.line}</p>
                <div className="destination-card-footer">
                  <span className="cp muted">{residence.sleeps ? `Sleeps ${residence.sleeps}` : residence.bedrooms ? `${residence.bedrooms} bedrooms` : "Family residence"}</span>
                  <button type="button" className="destination-locate cp" onClick={() => setActiveSlug(residence.slug)}>
                    Locate on map <span aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
}
