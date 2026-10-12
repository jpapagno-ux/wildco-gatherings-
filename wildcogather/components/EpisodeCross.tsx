import Link from "next/link";
import Film from "@/components/Film";
import { getResidences } from "@/lib/data";
import { getPostForHouse } from "@/lib/journal";

// Cross-sell: on a house or itinerary in the same natural setting, show the featured house's
// Wild Together episode and a second-chapter link. Hidden on the featured house itself, and
// hidden until the featured house (or its journal story) has a YouTube ID.
export default async function EpisodeCross({ from, setting, fromName }: { from: string; setting: string; fromName: string }) {
  const all = await getResidences();
  const f = all.find((r) => r.featured);
  if (!f || f.slug === from || f.setting !== setting) return null;
  const post = await getPostForHouse(f.slug);
  const video = f.videos[0] || post?.video;
  if (!video) return null;
  const short = f.name.split(",")[0];
  return (
    <section className="navy" aria-label={`Wild Together episode at ${short}`} style={{ marginTop: 100 }}>
      <div className="wrap" style={{ paddingTop: 80, paddingBottom: 80, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 56, alignItems: "center" }}>
        <Film video={video} dark />
        <div>
          <p className="eb">Wild Together · the second chapter</p>
          <h2 className="dsp" style={{ margin: "16px 0 0", fontSize: "clamp(32px, 3.6vw, 46px)", color: "var(--on-dark)" }}>Add {short} after {fromName.split(",")[0]}</h2>
          <p className="cp" style={{ margin: "12px 0 0", color: "rgba(244,241,236,.7)" }}>{f.place} · {f.region}, {f.country} · Entry {f.entryNo}</p>
          <p className="it" style={{ margin: "20px 0 0", fontSize: 22, lineHeight: 1.4, color: "var(--on-dark-accent)" }}>{f.line}</p>
          <p className="body" style={{ margin: "16px 0 0", color: "rgba(244,241,236,.8)" }}>Watch the episode James and Miriam filmed there, then ask us to pair the two houses — one transfer between them, one plan for the family.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", marginTop: 28 }}>
            <Link href={`/houses/${f.slug}`} className="btn btn-light">See {short}</Link>
            <Link href={`/plan?house=${from}&also=${f.slug}`} className="lnk" style={{ color: "var(--on-dark)", borderColor: "var(--on-dark)" }}>Plan both houses <span>→</span></Link>
            {post && <Link href={`/journal/${post.slug}`} className="lnk" style={{ color: "var(--on-dark)", borderColor: "var(--on-dark)" }}>Read the story <span>→</span></Link>}
          </div>
        </div>
      </div>
    </section>
  );
}
