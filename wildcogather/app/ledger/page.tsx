import type { Metadata } from "next";
import LedgerTable from "@/components/LedgerTable";
import JsonLd from "@/components/JsonLd";
import { getResidences } from "@/lib/data";
import PageSketch from "@/components/PageSketch";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "The Gatherings Ledger — Family Resort Residences Vetted by James Wild",
  description: "Every house in the Wild & Co Gatherings Ledger, with entry number, status and when James Wild first visited.",
  alternates: { canonical: "/ledger" },
};

export default async function Ledger() {
  const rows = await getResidences();
  return (
    <>
    <section className="wrap" style={{ paddingTop: 80, paddingBottom: 100 }}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", itemListElement: rows.map((r, i) => ({ "@type": "ListItem", position: i + 1, url: `/houses/${r.slug}`, name: r.name })) }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16, marginBottom: 30 }}>
        <div>
          <h1 className="dsp" style={{ margin: 0, fontSize: "clamp(40px, 5vw, 64px)" }}>The Gatherings Ledger</h1>
          <p className="cp" style={{ margin: "10px 0 0" }}>A personal archive of houses worth gathering in</p>
        </div>
        <p className="cp" style={{ margin: 0 }}>Total entries {String(rows.length).padStart(3, "0")}</p>
      </div>
      <LedgerTable rows={rows} />
      <div className="box" style={{ marginTop: 40, padding: "26px 30px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
        {[["Under observation", "On the list; James has not yet stayed."], ["Host met", "James has vetted the house in conversation with its host."], ["Field verified", "James has visited in person; Formula being confirmed. See each house's evidence for whether he stayed."], ["Gathering verified", "Visited, and passes all six tests."], ["Founder favorite", "James's personal favourite — an opinion, not a verification."]].map(([k, v]) => (
          <div key={k}><p className="eb" style={{ margin: "0 0 6px" }}>{k}</p><p className="cpn" style={{ margin: 0, fontSize: 14 }}>{v}</p></div>
        ))}
      </div>
      <p className="cp muted" style={{ margin: "22px 0 0", fontSize: 11 }}>New entries added when earned.</p>
    </section>
      <PageSketch k={"route"} label="The Gatherings Ledger" />
    </>
  );
}
