import Link from "next/link";
import { type SafariFeature as SF } from "@/lib/live-booking";

// "Pair it with a longer safari": a Wild & Co Safaris journey that includes this house.
// No links to the Safaris site or the House site (James, 30 Oct 2026): the journey is asked for through our own plan form.
export default function SafariFeature({ f, slug }: { f: SF; slug: string }) {
  return (
    <section className="navy" aria-labelledby="sf-h">
      <div className="wrap sf">
        <div>
          <p className="eb">New from Wild &amp; Co Safaris · {f.route}</p>
          <h2 id="sf-h" className="dsp" style={{ margin: "16px 0 0", fontSize: "clamp(34px, 4vw, 52px)", color: "var(--on-dark)" }}>{f.title}</h2>
          <p className="it" style={{ margin: "14px 0 0", fontSize: 22, lineHeight: 1.35, color: "var(--on-dark-accent)" }}>{f.nights} nights · {f.season}</p>
          <p className="body" style={{ margin: "16px 0 0", color: "rgba(244,241,236,.82)", maxWidth: 560 }}>{f.summary}</p>
          <p className="body" style={{ margin: "12px 0 0", color: "rgba(244,241,236,.82)", maxWidth: 560 }}>{f.houseNote}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", marginTop: 26 }}>
            <Link href={`/plan?house=${slug}&trip=${encodeURIComponent(`${f.route} — ${f.title}`)}`} className="btn btn-light">Ask us for this journey</Link>
          </div>
        </div>
        <ol className="sf-route" aria-label="The route">
          {f.stops.map(([place, n], i) => (
            <li key={place}><span className="mono">{String(i + 1).padStart(2, "0")}</span><span className="ser">{place}</span><span className="cp">{n} {n === 1 ? "night" : "nights"}</span></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
