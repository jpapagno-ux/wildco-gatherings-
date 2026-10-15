import Link from "next/link";
import { partner, type FlightCard as FC } from "@/lib/partners";

// "Arrive by air": the family's flight with a partner airline, added to the gathering by our team.
export default function FlightCard({ f, slug }: { f: FC; slug: string }) {
  const p = partner(f.partner);
  return (
    <section className="wrap" aria-labelledby="fly-h" style={{ paddingTop: 30, paddingBottom: 30 }}>
      <div className="box fly">
        <div className="fly-main">
          <p className="cp ox" style={{ margin: 0 }}>Arrive by air · with our partner</p>
          {p && <img src={p.logo} alt={p.name} width={220} height={42} className="fly-logo" />}
          <h2 id="fly-h" className="ser" style={{ margin: "14px 0 0", fontSize: "clamp(26px, 2.6vw, 34px)" }}>{f.title}</h2>
          <p className="body" style={{ margin: "12px 0 0" }}>{f.summary}</p>
          <p className="body muted" style={{ margin: "10px 0 0", fontSize: 14 }}>{f.detail}</p>
          <Link href={`/plan?house=${slug}&trip=${encodeURIComponent(f.trip)}`} className="btn" style={{ marginTop: 20 }}>Add the flight to our gathering</Link>
        </div>
        <div className="fly-routes">
          <p className="lbl" style={{ marginTop: 0 }}>{f.routesLabel}</p>
          <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>
            {f.routes.map(([from, t]) => <div key={from} className="fact"><dt className="cpn" style={{ margin: 0 }}>{from}</dt><dd className="cp" style={{ margin: 0 }}>{t}</dd></div>)}
          </dl>
          <p className="cp muted" style={{ margin: "12px 0 0", fontSize: 10 }}>Published flight times · quoted per flight</p>
        </div>
      </div>
    </section>
  );
}
