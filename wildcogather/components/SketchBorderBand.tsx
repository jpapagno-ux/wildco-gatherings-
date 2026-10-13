"use client";
import { useEffect, useRef, useState } from "react";
import type { SketchBorder } from "@/lib/sketch-borders";
import { borderSrc } from "@/lib/sketch-borders";

// A luxe pen-and-ink band that sits on the paper (multiply blend, feathered edges) and plays its
// one entrance effect the first time it scrolls into view. Visible at rest without JS; motion is
// skipped entirely for prefers-reduced-motion.
export default function SketchBorderBand({ b, replayKey = 0, className, style }: { b: SketchBorder; replayKey?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"rest" | "armed" | "play">("rest");

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setState("armed");
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { requestAnimationFrame(() => setState("play")); io.disconnect(); }
    }, { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [replayKey]);

  return (
    <div ref={ref} className={`sk-band sk-${b.effect} sk-${state}${className ? " " + className : ""}`} style={style}>
      <img
        src={borderSrc(b, 1800)}
        srcSet={[900, 1400, 1800, 2400].map((w) => `${borderSrc(b, w)} ${w}w`).join(", ")}
        sizes="(max-width: 1200px) 100vw, 1200px"
        alt={b.alt}
        loading="lazy"
        decoding="async"
      />
      {b.effect === "shimmer" && <span className="sk-glint" aria-hidden="true" />}
    </div>
  );
}
