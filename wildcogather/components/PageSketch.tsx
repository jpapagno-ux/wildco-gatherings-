import SketchBorderBand from "@/components/SketchBorderBand";
import { borderFor } from "@/lib/sketch-borders";
import type { SettingKey } from "@/lib/settings";

// One pen-and-ink border per page, at the foot, just above the "Plan a gathering" band.
// Captioned like a plate in the Ledger: "From the sketchbook · <setting> · J.W. & Co."
export default function PageSketch({ k = "route", label }: { k?: SettingKey | "route"; label?: string }) {
  const b = borderFor(k) || borderFor("route");
  if (!b) return null;
  return (
    <section className="sk-foot" aria-label={`From the sketchbook — ${label || b.name}`}>
      <div className="wrap">
        <SketchBorderBand b={b} />
        <p className="sk-cap">
          <span>From the sketchbook</span>
          <span className="sk-cap-mid">{label || b.name}</span>
          <span>J.W. &amp; Co. · since 1982</span>
        </p>
      </div>
    </section>
  );
}
