import { fit } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { VipStamp } from "@/components/Marks";
import { collections, vipPropertyCollections, collectionPath, VIP_MEANING } from "@/lib/collections";
import { getResidences } from "@/lib/data";
import { SETTINGS, SETTING_ORDER } from "@/lib/settings";
import PageSketch from "@/components/PageSketch";

export const revalidate = 3600;

export const metadata: Metadata = fit({
  title: "Gatherings VIP — Vetted in Purpose | Wild & Co Gatherings",
  description: "VIP doesn't mean Very Important Person. It means Vetted in Purpose: family stays James Wild has vetted, guided from within the land, where every night helps keep it wild.",
  alternates: { canonical: "/vip" },
});

export default async function Vip() {
  const vip = (await getResidences()).filter((r) => r.vip);
  return (
    <>
      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 50 }}>
        <div className="box" style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 300px", padding: 40, borderRight: "1px solid var(--stone)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
            <VipStamp size={260} rotate={-6} />
            <h1 className="ser" style={{ margin: "26px 0 8px", fontSize: 27, lineHeight: 1.3, fontWeight: 500 }}>Not Very Important People.<br />Places Vetted in Purpose.</h1>
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
      <section className="wrap" style={{ paddingBottom: 70 }} aria-label="VIP by natural setting">
        <p className="eb">Six settings, six inks</p>
        <hr className="eb-rule" />
        <h2 className="dsp" style={{ margin: "28px 0 10px", fontSize: 42 }}>The ink tells you the land</h2>
        <p className="body" style={{ margin: "0 0 30px", maxWidth: 640 }}>Each VIP stay is stamped in the colour of its natural setting. A setting waits until James names its first VIP house.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 28 }}>
          {SETTING_ORDER.map((k) => { const n = vip.filter((r) => r.setting === k).length; return (
            <div key={k} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, textAlign: "center", opacity: n ? 1 : 0.45 }}>
              <VipStamp setting={k} size={220} rotate={k.length % 2 ? -7 : 6} />
              <p className="cp" style={{ margin: 0, color: SETTINGS[k].ink }}>{SETTINGS[k].name} · {n ? `${n} ${n === 1 ? "stay" : "stays"}` : "awaiting its first"}</p>
            </div>
          ); })}
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: 100 }}>
        <p className="eb" style={{ margin: "0 0 20px" }}>VIP collections</p>
        {[...collections.map((c) => ({ ...c, href: `/vip/${c.slug}` })), ...vipPropertyCollections.map((c) => ({ ...c, status: c.status || "VIP", href: collectionPath(c) }))].map((c) => (
          <Link key={c.slug} href={c.href} className="box" style={{ display: "flex", flexWrap: "wrap", textDecoration: "none" }}>
            <div style={{ flex: "1 1 420px", minHeight: 300 }}><Photo img={c.hero} sizes="(max-width: 800px) 100vw, 50vw" style={{ height: "100%", minHeight: 300 }} /></div>
            <div style={{ flex: "1 1 420px", padding: 40 }}>
              <p className="eb" style={{ margin: "0 0 12px" }}>{c.region} · {c.status}</p>
              <h3 className="dsp" style={{ margin: "0 0 16px", fontSize: 46 }}>{c.name}</h3>
              <p className="it" style={{ margin: "0 0 22px", fontSize: 22, lineHeight: 1.4 }}>{c.tagline}</p>
              <span className="lnk">See the stays <span>→</span></span>
            </div>
          </Link>
        ))}
      </section>
      <PageSketch k={"route"} label="Gatherings VIP" />
    </>
  );
}
