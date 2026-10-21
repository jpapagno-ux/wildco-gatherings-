import type { Residence } from "@/lib/types";

// "Their safaris at a glance": the house's own published programmes, with lengths and from-prices.
export default function ProgramsCard({ p }: { p: NonNullable<Residence["programs"]> }) {
  return (
    <section className="wrap" style={{ paddingTop: 90, paddingBottom: 30 }} aria-labelledby="prog-h">
      <p className="eb">At a glance</p>
      <hr className="eb-rule" />
      <h2 id="prog-h" className="dsp" style={{ margin: "26px 0 26px", fontSize: "clamp(34px, 4vw, 46px)" }}>{p.title}</h2>
      <div className="prog-grid">
        {p.items.map((x) => (
          <article key={x.name} className="card prog-card">
            <p className="cp muted" style={{ margin: 0 }}>{x.length}</p>
            <h3 className="ser" style={{ margin: "8px 0 10px", fontSize: 26, fontWeight: 500 }}>{x.name}</h3>
            <p className="body" style={{ margin: 0, fontSize: 15 }}>{x.shape}</p>
            <p className="it" style={{ margin: "12px 0 0", fontSize: 18, lineHeight: 1.3 }}>Best for {x.bestFor}</p>
            {x.from && <p className="mono" style={{ margin: "14px 0 0", fontSize: 12 }}>{x.from}</p>}
          </article>
        ))}
      </div>
      {p.note && <p className="cp muted" style={{ margin: "18px 0 0" }}>{p.note}</p>}
    </section>
  );
}
