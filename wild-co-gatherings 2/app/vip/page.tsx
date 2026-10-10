import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { VipStamp } from "@/components/Marks";
import { collections, VIP_MEANING } from "@/lib/collections";

export const metadata: Metadata = {
  title: "Gatherings VIP — Vetted in Purpose | Wild & Co Gatherings",
  description: "VIP doesn't mean Very Important Person. It means Vetted in Purpose: family stays James Wild has vetted, guided from within the land, where every night helps keep it wild.",
  alternates: { canonical: "/vip" },
};

export default function Vip() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 50 }}>
        <div className="box" style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px", padding: 40, borderRight: "1px solid var(--sand)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <VipStamp size={240} rotate={-6} note="J.W." />
            <h1 className="cas" style={{ margin: "26px 0 8px", fontSize: 30, lineHeight: 1.3 }}>Not Very Important People.<br />Places Vetted in Purpose.</h1>
            <p className="cp muted" style={{ margin: 0, fontSize: 11 }}>What the Gatherings VIP stamp means</p>
          </div>
          <dl style={{ flex: "2 1 560px", padding: "34px 40px", margin: 0 }}>
            {VIP_MEANING.map((m, i) => (
              <div key={m.letter} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 18, padding: "18px 0", borderBottom: i < 2 ? "1px solid var(--stone)" : 0, alignItems: "baseline" }}>
                <span className="disp ox" style={{ fontSize: 56, lineHeight: 0.9 }} aria-hidden="true">{m.letter}</span>
                <div><dt className="cas" style={{ fontSize: 22, marginBottom: 6 }}>{m.word}</dt><dd className="body" style={{ margin: 0, fontSize: 16 }}>{m.text}</dd></div>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: 100 }}>
        <h2 className="cp ox" style={{ fontWeight: 400, margin: "0 0 20px" }}>VIP collections</h2>
        {collections.map((c) => (
          <Link key={c.slug} href={`/vip/${c.slug}`} className="box" style={{ display: "flex", flexWrap: "wrap", textDecoration: "none" }}>
            <div style={{ flex: "1 1 420px", minHeight: 300 }}><Photo img={c.hero} sizes="(max-width: 800px) 100vw, 50vw" style={{ height: "100%", minHeight: 300 }} /></div>
            <div style={{ flex: "1 1 420px", padding: 40 }}>
              <p className="cp ox" style={{ margin: "0 0 12px" }}>{c.region} · {c.status}</p>
              <h3 className="disp" style={{ margin: "0 0 16px", fontSize: 44, textTransform: "uppercase", letterSpacing: ".03em" }}>{c.name}</h3>
              <p className="cas" style={{ margin: "0 0 18px", fontSize: 19, fontStyle: "italic", lineHeight: 1.5 }}>{c.tagline}</p>
              <p className="cp" style={{ margin: 0, fontSize: 11 }}>See the stays →</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
