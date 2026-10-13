import type { Metadata } from "next";
import SketchBorderReview from "@/components/SketchBorderReview";
import { SKETCH_BORDERS } from "@/lib/sketch-borders";
import { SETTINGS } from "@/lib/settings";

// Internal review board for the luxe sketch borders. Not linked, not in the sitemap, not indexed.
export const metadata: Metadata = {
  title: "Sketch borders — studio review | Wild & Co Gatherings",
  robots: { index: false, follow: false, nocache: true },
};

const EXAMPLE_HOUSE: Record<string, string> = {
  savanna: "Morukuru Farm House, Madikwe",
  coast: ".Here, Maldives",
  mountain: "Lone Mountain Ranch, Big Sky",
  desert: "ULUM Moab, Utah",
  jungle: "COMO Shambhala Estate, Bali",
  polar: "An Antarctic Peninsula voyage",
  route: "The Cape & a Malaria-Free Safari",
};

export default function SketchBordersReview() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 20 }}>
        <p className="eb">Studio · for review</p>
        <hr className="eb-rule" />
        <h1 className="dsp" style={{ margin: "24px 0 0", fontSize: "clamp(38px, 5vw, 66px)" }}>The luxe sketch borders</h1>
        <p className="it" style={{ margin: "16px 0 0", fontSize: 24, lineHeight: 1.35, maxWidth: 760 }}>Seven pen-and-ink panoramas — one for each natural setting, and a route divider — each with one quiet effect as it comes into view.</p>
        <p className="body" style={{ margin: "16px 0 0", maxWidth: 680 }}>Stored in Cloudinary under gatherings/sketch-borders/luxe/ and delivered as a cropped band. Used once per page at most, at the foot of a stay page above the Plan a gathering band. Motion plays once and is switched off for visitors who prefer reduced motion.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: 90 }}>
        {SKETCH_BORDERS.map((b) => {
          const s = b.key === "route" ? undefined : SETTINGS[b.key];
          return (
            <article key={b.key} className="skr-row" aria-labelledby={`sk-${b.key}`}>
              <div className="skr-meta">
                <p className="eb" style={{ color: s?.ink || "var(--rust)" }}>{s ? s.sub : "Itineraries · journal"}</p>
                <h2 id={`sk-${b.key}`} className="ser" style={{ margin: "10px 0 0", fontSize: 34, fontWeight: 500 }}>{b.name}</h2>
                <dl>
                  <dt>Scene</dt><dd>{b.scene}</dd>
                  <dt>Effect</dt><dd><strong style={{ fontWeight: 500, color: "var(--charcoal)" }}>{b.effectName}.</strong> {b.effectNote}</dd>
                  <dt>File</dt><dd style={{ fontFamily: "var(--f-mono), monospace", fontSize: 12, wordBreak: "break-all" }}>{b.publicId}</dd>
                </dl>
              </div>
              <SketchBorderReview b={b} house={EXAMPLE_HOUSE[b.key]} />
            </article>
          );
        })}
      </section>
    </>
  );
}
