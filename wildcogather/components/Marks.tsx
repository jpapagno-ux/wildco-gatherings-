"use client";
import { useEffect, useId, useRef, useState } from "react";
import type { Stamp as StampT } from "@/lib/types";


// Worn-ink grunge: a slightly wobbly edge plus speckled voids where the ink didn't take. Background stays transparent.
function Ink({ id, seed = 7, scale = 2.4 }: { id: string; seed?: number; scale?: number }) {
  return (
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves={2} seed={seed} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale={scale} result="d" />
      <feTurbulence type="fractalNoise" baseFrequency="1.4" numOctaves={2} seed={seed + 20} result="s" />
      <feColorMatrix in="s" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  6 0 0 0 -1.7" result="m" />
      <feComposite in="d" in2="m" operator="in" />
    </filter>
  );
}
// "ink" = printed on paper; "light" = reversed, cream ink for use over photographs and charcoal bands.
export type Tone = "ink" | "light";
const LIGHT = "#F2EEE6";

export function Seal({ size = 168 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 168 168" role="img" aria-label="James Wild founder seal">
      <defs><path id={`seal${id}`} d="M84,84 m-62,0 a62,62 0 1,1 124,0 a62,62 0 1,1 -124,0" /></defs>
      <circle cx="84" cy="84" r="80" fill="none" stroke="#8D8276" strokeWidth="1" />
      <circle cx="84" cy="84" r="44" fill="none" stroke="#8D8276" strokeWidth="1" />
      <text fontFamily="var(--f-courier), monospace" fontSize="11" fill="#2B2B2B"><textPath href={`#seal${id}`} textLength="380" lengthAdjust="spacing">FOUNDER · EDITOR · EXPLORER · JAMES WILD ·</textPath></text>
      <text x="84" y="96" textAnchor="middle" fontFamily="var(--f-caslon), serif" fontStyle="italic" fontSize="34" fill="#7A1F1F">JW</text>
    </svg>
  );
}

export function Compass() {
  return (
    <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden="true">
      <circle cx="36" cy="36" r="30" fill="none" stroke="#7A1F1F" strokeWidth="1.5" />
      <path d="M36 2v10M36 60v10M2 36h10M60 36h10" stroke="#7A1F1F" strokeWidth="1.5" />
      <text x="36" y="45" textAnchor="middle" fontFamily="var(--f-caslon), serif" fontSize="26" fill="#7A1F1F">W</text>
    </svg>
  );
}

const STAMPS: Record<StampT, { color: string; small: string; big: string }> = {
  "Under observation": { color: "#6E655B", small: "ON THE LIST · UNDER", big: "OBSERVATION" },
  "Host met": { color: "#7A1F1F", small: "VETTED BY", big: "HOST MET" },
  "Field verified": { color: "#7A1F1F", small: "STAYED BY", big: "FIELD VERIFIED" },
  "Gathering verified": { color: "#2B2B2B", small: "ALL SIX TESTS", big: "VERIFIED" },
  "Founder favorite": { color: "#7A1F1F", small: "RETURNED TO · FOUNDER", big: "FAVORITE" },
};

// Rubber-stamp mark: top and bottom text on separate arcs (never overlap), worn-ink texture, presses in once when seen.
export function Stamp({ kind, size = 210, initials = "J. W.", tone = "ink" }: { kind: StampT; size?: number; initials?: string; tone?: Tone }) {
  const ref = useRef<SVGSVGElement>(null);
  const id = useId().replace(/:/g, "");
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: .5 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const s = STAMPS[kind];
  const bigSize = s.big.length > 10 ? 15 : 17;
  return (
    <svg ref={ref} className={`stamp${seen ? " in" : ""}`} width={size} height={size} viewBox="0 0 200 200" role="img" aria-label={`Ledger stamp: ${kind}`}>
      <defs>
        <path id={`t${id}`} d="M 30,100 A 70,70 0 0 1 170,100" />
        <path id={`b${id}`} d="M 16,100 A 84,84 0 0 0 184,100" />
        <Ink id={`ink${id}`} seed={7} scale={2.4} />
      </defs>
      <g filter={`url(#ink${id})`} opacity=".92" fill={tone === "light" ? LIGHT : s.color} stroke={tone === "light" ? LIGHT : s.color}>
        <circle cx="100" cy="100" r="95" fill="none" strokeWidth="3" />
        <circle cx="100" cy="100" r="90" fill="none" strokeWidth=".8" />
        <circle cx="100" cy="100" r="56" fill="none" strokeWidth="1.2" />
        <text stroke="none" fontFamily="var(--f-caslon), serif" fontSize="14"><textPath href={`#t${id}`} startOffset="50%" textAnchor="middle" textLength="196" lengthAdjust="spacing">THE GATHERINGS LEDGER</textPath></text>
        <text stroke="none" fontFamily="var(--f-courier), monospace" fontSize="11"><textPath href={`#b${id}`} startOffset="50%" textAnchor="middle" textLength="200" lengthAdjust="spacing">★ RECORDED FROM EXPERIENCE ★</textPath></text>
        <line x1="52" y1="84" x2="148" y2="84" strokeWidth="1" />
        <line x1="52" y1="118" x2="148" y2="118" strokeWidth="1" />
        <text stroke="none" x="100" y="80" textAnchor="middle" fontFamily="var(--f-courier), monospace" fontSize="9" letterSpacing="2" {...(s.small.length > 14 ? { textLength: 92, lengthAdjust: "spacingAndGlyphs" } : {})}>{s.small}</text>
        <text stroke="none" x="100" y="106" textAnchor="middle" fontFamily="var(--f-courier), monospace" fontWeight="700" fontSize={bigSize} letterSpacing="2" {...(s.big.length > 8 ? { textLength: 92, lengthAdjust: "spacingAndGlyphs" } : {})}>{s.big}</text>
        <text stroke="none" x="100" y="134" textAnchor="middle" fontFamily="var(--f-caslon), serif" fontStyle="italic" fontSize="16">{initials}</text>
      </g>
    </svg>
  );
}

// Small round "HOST MET · J.W." mark stamped over the host's headshot.
export function HostMark({ size = 96 }: { size?: number }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" aria-hidden="true">
      <defs><Ink id={`hm${id}`} seed={11} scale={3} /></defs>
      <g filter={`url(#hm${id})`} fill="#7A1F1F" stroke="#7A1F1F" opacity=".88">
        <circle cx="100" cy="100" r="92" fill="none" strokeWidth="5" />
        <circle cx="100" cy="100" r="80" fill="none" strokeWidth="2" />
        <text stroke="none" x="100" y="92" textAnchor="middle" fontFamily="var(--f-courier), monospace" fontWeight="700" fontSize="30" letterSpacing="3">HOST</text>
        <text stroke="none" x="100" y="128" textAnchor="middle" fontFamily="var(--f-courier), monospace" fontWeight="700" fontSize="30" letterSpacing="3">MET</text>
        <text stroke="none" x="100" y="160" textAnchor="middle" fontFamily="var(--f-caslon), serif" fontStyle="italic" fontSize="24">J.W.</text>
      </g>
    </svg>
  );
}

// Gatherings VIP — Vetted in Purpose. Oval stamp; the bottom line carries J.W.'s visit (e.g. "Visit · Aug 2027").
export function VipStamp({ size = 190, note = "J.W.", rotate = -8, tone = "ink" }: { size?: number; note?: string; rotate?: number; tone?: Tone }) {
  const c = tone === "light" ? LIGHT : "var(--oxblood)";
  const id = useId().replace(/:/g, "");
  return (
    <svg width={size} height={Math.round(size * 0.66)} viewBox="0 0 240 158" role="img" aria-label={`Gatherings VIP — Vetted in Purpose · ${note}`} style={{ transform: `rotate(${rotate}deg)`, flex: "none" }}>
      <defs><Ink id={`v${id}`} seed={4} scale={2.2} /></defs>
      <g filter={`url(#v${id})`} fill={c} stroke={c} opacity={0.92}>
        <ellipse cx="120" cy="79" rx="114" ry="73" fill="none" strokeWidth="3" />
        <ellipse cx="120" cy="79" rx="106" ry="66" fill="none" strokeWidth=".8" />
        <text stroke="none" x="120" y="38" textAnchor="middle" fontFamily="var(--f-courier), monospace" fontSize="11" letterSpacing="3">GATHERINGS</text>
        <line x1="50" y1="46" x2="190" y2="46" strokeWidth="1" />
        <text stroke="none" x="120" y="88" textAnchor="middle" fontFamily="var(--f-caslon), serif" fontWeight={700} fontSize="44" letterSpacing="10">VIP</text>
        <line x1="40" y1="98" x2="200" y2="98" strokeWidth="1" />
        <text stroke="none" x="120" y="114" textAnchor="middle" fontFamily="var(--f-caslon), serif" fontStyle="italic" fontSize="13">Vetted in Purpose</text>
        <text stroke="none" x="120" y="132" textAnchor="middle" fontFamily="var(--f-courier), monospace" fontSize="8" letterSpacing="2">{note.toUpperCase()}</text>
      </g>
    </svg>
  );
}

// James Wild & Co founder seal (transparent PNG). Oxblood on paper; cream ("light") on photos and charcoal.
export function JwcoSeal({ size = 96, tone = "ink", rotate = 0 }: { size?: number; tone?: Tone; rotate?: number }) {
  const src = `/brand/jwco-seal${tone === "light" ? "-cream" : ""}-${size > 200 ? 600 : 240}.png`;
  return <img src={src} width={size} height={size} alt="James Wild & Co — Journey design since 1982, vetted & recorded" style={{ display: "block", flex: "none", transform: rotate ? `rotate(${rotate}deg)` : undefined }} />;
}
