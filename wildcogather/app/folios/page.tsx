import { fit } from "@/lib/seo";
import type { Metadata } from "next";
import FoliosClient from "./FoliosClient";

export const metadata: Metadata = fit({
  title: "My Folios | Wild & Co Gatherings",
  description: "Your private shelf of journeys: save houses and family journeys, note dates and who's coming, and send a Folio to an advisor.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/folios" },
});

export default function FoliosPage() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 70, paddingBottom: 26 }}>
        <p className="eb">James Wild &amp; Co · My Folios</p>
        <hr className="eb-rule" />
        <h1 className="dsp" style={{ margin: "22px 0 0", fontSize: "clamp(40px, 5vw, 66px)" }}>My Folios</h1>
        <p className="it" style={{ margin: "14px 0 0", fontSize: 24, lineHeight: 1.35, maxWidth: 760 }}>Your private shelf of journeys — the houses you&apos;re weighing, the days you&apos;re shaping, and who&apos;s coming.</p>
        <p className="fo-local"><strong>Saved on this device.</strong> Folios live in this browser only — they don&apos;t sync to other devices or other James Wild &amp; Co sites yet. Export a copy to keep or move it.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: 90 }}>
        <FoliosClient />
      </section>
    </>
  );
}
