"use client";
import { useEffect, useId, useRef, useState } from "react";

// Sideways scroll with snap; swipe/drag/trackpad plus keyboard-friendly arrow buttons.
export default function Strip({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [ends, setEnds] = useState({ start: true, end: true });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setEnds({ start: el.scrollLeft <= 1, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 1 });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    for (const child of el.children) observer.observe(child);
    el.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); el.removeEventListener("scroll", update); };
  }, [children]);
  const go = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(560, el.clientWidth * 0.8), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };
  return (
    <div className="strip-wrap">
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <p className="cp ox" style={{ margin: "0 0 10px" }}>{label}</p>
          <h2 id={`${id}-title`} className="cas section-heading" style={{ margin: 0 }}>{title}</h2>
        </div>
        <div className="strip-btns">
          <button type="button" aria-label={`Scroll ${title} left`} aria-controls={id} disabled={ends.start} onClick={() => go(-1)}>←</button>
          <button type="button" aria-label={`Scroll ${title} right`} aria-controls={id} disabled={ends.end} onClick={() => go(1)}>→</button>
        </div>
      </div>
      <div id={id} className="strip" ref={ref} tabIndex={0} role="region" aria-labelledby={`${id}-title`}>{children}</div>
    </div>
  );
}
