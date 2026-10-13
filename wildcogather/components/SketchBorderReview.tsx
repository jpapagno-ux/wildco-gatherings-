"use client";
import { useState } from "react";
import SketchBorderBand from "@/components/SketchBorderBand";
import type { SketchBorder } from "@/lib/sketch-borders";
import { borderJpg } from "@/lib/sketch-borders";

// One row of the review board: the band in a mock stay-page footer, with a replay button.
export default function SketchBorderReview({ b, house }: { b: SketchBorder; house: string }) {
  const [n, setN] = useState(0);
  return (
    <div className="skr-stage">
      <div className="skr-mock">
        <p className="eb" style={{ fontSize: 11 }}>{b.key === "route" ? "Between chapters" : `Foot of a ${b.name.toLowerCase()} stay page`}</p>
        <p className="ser" style={{ margin: "8px 0 0", fontSize: 26 }}>{house}</p>
        <p className="body" style={{ margin: "6px 0 0", fontSize: 15 }}>Every great family journey begins with a conversation.</p>
      </div>
      <SketchBorderBand key={n} b={b} replayKey={n} />
      <div className="skr-actions" style={{ padding: "0 34px 22px" }}>
        <button type="button" className="skr-btn" onClick={() => setN((v) => v + 1)}>Play the effect again</button>
        <a className="lnk" href={borderJpg(b)}>Download JPG <span>↓</span></a>
      </div>
    </div>
  );
}
