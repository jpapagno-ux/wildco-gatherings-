"use client";
import { useRef } from "react";

// Sideways scroll with snap; swipe/drag/trackpad plus keyboard-friendly arrow buttons.
export default function Strip({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: number) => ref.current?.scrollBy({ left: dir * Math.min(560, ref.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <div className="strip-wrap">
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 20, flexWrap: "wrap", marginBottom: 20 }}>
        <div>
          <p className="cp ox" style={{ margin: "0 0 10px" }}>{label}</p>
          <h2 className="cas" style={{ margin: 0, fontSize: 40 }}>{title}</h2>
        </div>
        <div className="strip-btns">
          <button type="button" aria-label="Scroll left" onClick={() => go(-1)}>←</button>
          <button type="button" aria-label="Scroll right" onClick={() => go(1)}>→</button>
        </div>
      </div>
      <div className="strip" ref={ref} tabIndex={0} aria-label={title}>{children}</div>
    </div>
  );
}
