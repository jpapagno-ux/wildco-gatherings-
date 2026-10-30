import Link from "next/link";
import StayCard from "@/components/StayCard";
import Strip from "@/components/Strip";
import type { Residence } from "@/lib/types";
import { MORE_COLLECTION_SLUG, isMoreVilla, moreVilla, pairingsFor } from "@/lib/more";

// On a MORE villa's page: the other MORE villas and the pairings this villa is part of.
// Cross-sell stays inside Gatherings — no partner links and no links to other James Wild & Co volumes
// (James, 30 Oct 2026). Villas whose rows are not yet visible are simply left out.
export default function MoreCrossSell({ r, all }: { r: Residence; all: Residence[] }) {
  if (!isMoreVilla(r.slug)) return null;
  const others = all.filter((h) => h.slug !== r.slug && isMoreVilla(h.slug));
  const shown = new Set(all.map((h) => h.slug));
  const pairs = pairingsFor(r.slug).filter((p) => p.houses.every((s) => shown.has(s)));
  if (!others.length && !pairs.length) return null;
  const name = (s: string) => all.find((h) => h.slug === s)?.name || moreVilla(s)?.short || s;
  return (
    <section aria-label="The other MORE villas" className="band" style={{ padding: "90px 0 50px", marginTop: 90 }}>
      {others.length > 0 && (
        <Strip label="The MORE villas · one family collection" title="The other MORE villas" action={<Link href={`/vip/${MORE_COLLECTION_SLUG}`} className="lnk">All five MORE villas <span>→</span></Link>}>
          {others.map((h) => (
            <div key={h.slug} className="strip-card">
              <StayCard r={h} sizes="340px" />
              {moreVilla(h.slug) && <p className="body" style={{ margin: "10px 0 0", fontSize: 14, textAlign: "center" }}>{moreVilla(h.slug)!.fit}</p>}
            </div>
          ))}
        </Strip>
      )}
      {pairs.length > 0 && (
        <div className="wrap" style={{ paddingTop: others.length ? 50 : 0 }}>
          <p className="eb">Pair it · two villas, one journey</p>
          <hr className="eb-rule" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 24, marginTop: 26 }}>
            {pairs.map((p) => {
              const other = p.houses.find((s) => s !== r.slug)!;
              return (
                <article key={p.title} className="box" style={{ padding: "24px 26px" }}>
                  <h3 className="cas" style={{ margin: "0 0 6px", fontSize: 22 }}>{p.title}</h3>
                  <p className="cp muted" style={{ margin: "0 0 12px" }}>{p.houses.map(name).join(" + ")}</p>
                  <p className="body" style={{ margin: "0 0 16px", fontSize: 15 }}>{p.why}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                    <Link href={`/houses/${other}`} className="lnk">See {name(other).split(",")[0]} <span>→</span></Link>
                    <Link href={`/plan?house=${r.slug}&also=${other}`} className="lnk">Plan both <span>→</span></Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
