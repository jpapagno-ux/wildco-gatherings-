"use client";
import { useCallback, useEffect, useRef, useState } from "react";

// Sideways rail for galleries and card rails only — page content itself scrolls down, never sideways.
// Swipe, trackpad or keyboard (focus the rail, then arrow keys); the arrow buttons switch off at each end
// and hide when everything already fits.
export default function Strip({ label, title, action, children }: { label: string; title: string; action?: React.ReactNode; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: true });
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
  }, []);
  useEffect(() => {
    update();
    const el = ref.current;
    const ro = new ResizeObserver(update);
    if (el) ro.observe(el);
    return () => ro.disconnect();
  }, [update]);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * Math.min(560, ref.current.clientWidth * 0.8), behavior: "smooth" });
  const fits = edge.start && edge.end;
  return (
    <div className="strip-wrap">
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <p className="eb">{label}</p>
          <h2 className="dsp" style={{ margin: "14px 0 0", fontSize: "clamp(32px, 3.6vw, 46px)" }}>{title}</h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
          {action}
          {!fits && (
            <div className="strip-btns">
              <button type="button" aria-label={`Scroll ${title} left`} disabled={edge.start} onClick={() => go(-1)}>←</button>
              <button type="button" aria-label={`Scroll ${title} right`} disabled={edge.end} onClick={() => go(1)}>→</button>
            </div>
          )}
        </div>
      </div>
      <div className="strip" ref={ref} tabIndex={0} role="region" aria-label={title} onScroll={update}>{children}</div>
    </div>
  );
}
