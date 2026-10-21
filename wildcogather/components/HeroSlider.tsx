"use client";
import { useEffect, useState } from "react";
import Photo from "./Photo";
import type { Img } from "@/lib/types";

// Hero that crossfades through a few photographs (6 s each). Pauses on hover/focus, stops for
// reduced-motion users, and keeps every frame in the page for search engines and screen readers.
export default function HeroSlider({ images, interval = 6000 }: { images: Img[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (images.length < 2 || paused) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % images.length), interval);
    return () => clearInterval(t);
  }, [images.length, interval, paused]);
  return (
    <div className="hero-slider" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} style={{ position: "absolute", inset: 0 }}>
      {images.map((img, n) => (
        <div key={img.publicId} className={`hero-slide${n === i ? " on" : ""}`} aria-hidden={n !== i}>
          <Photo img={img} priority={n === 0} sizes="100vw" style={{ position: "absolute", inset: 0 }} />
        </div>
      ))}
      {images.length > 1 && (
        <div className="hero-dots" role="group" aria-label="Choose a photograph">
          {images.map((img, n) => (
            <button key={img.publicId} type="button" aria-label={`Photograph ${n + 1} of ${images.length}`} aria-pressed={n === i} className={n === i ? "on" : ""} onClick={() => { setI(n); setPaused(true); }} onFocus={() => setPaused(true)} />
          ))}
        </div>
      )}
    </div>
  );
}
