import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { getWebinars, whenLabel } from "@/lib/webinars";
import { Icon } from "@/components/Marks";
import PageSketch from "@/components/PageSketch";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
export const metadata: Metadata = {
  title: "Webinars for Travel Advisors & Families | Wild & Co Gatherings",
  description: "Live webinars on Livestorm with the hosts of family and generational residences — starting with Ted Turner Reserves. For advisors planning multigenerational trips and families planning a gathering.",
  alternates: { canonical: "/webinars" },
};

export default async function Webinars() {
  const list = await getWebinars();
  return (
    <>
    <section className="wrap" style={{ paddingTop: 90, paddingBottom: 100 }}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "Wild & Co Gatherings webinars", itemListElement: list.map((w, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE}/webinars/${w.slug}`, name: w.title })) }} />
      <div style={{ textAlign: "center" }}>
        <p className="eb">Live on Livestorm · for advisors &amp; families</p>
        <h1 className="dsp" style={{ margin: "18px 0 0", fontSize: "clamp(44px, 6vw, 76px)" }}>Webinars</h1>
        <p className="it" style={{ margin: "18px auto 50px", fontSize: 26, maxWidth: 720 }}>The people who run the houses, in conversation with James — so you can plan the gathering before you book it.</p>
      </div>
      <div style={{ display: "grid", gap: 26 }}>
        {list.map((w) => (
          <Link key={w.slug} href={`/webinars/${w.slug}`} className="card" style={{ display: "grid", gridTemplateColumns: "auto minmax(0, 1fr)", gap: 30, alignItems: "center", padding: "30px 34px", textDecoration: "none", color: "inherit" }}>
            <span aria-hidden="true" style={{ width: 96, height: 96, borderRadius: "50%", border: "1.5px solid var(--rust)", display: "grid", placeItems: "center" }}><Icon name="clock" size={40} color="var(--rust)" /></span>
            <div style={{ minWidth: 0 }}>
              <p className="cp" style={{ margin: 0, color: "var(--rust)" }}>{w.status === "Recorded" ? "Recording" : whenLabel(w)} · {w.minutes} min</p>
              <h2 className="ser" style={{ margin: "8px 0 6px", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 500 }}>{w.title}</h2>
              <p className="body" style={{ margin: 0 }}>{w.dek}</p>
              <p className="cp muted" style={{ margin: "12px 0 0" }}>Host · {w.host.name}{w.host.title ? `, ${w.host.title}` : ""}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
      <PageSketch k={"route"} label="Webinars" />
    </>
  );
}
