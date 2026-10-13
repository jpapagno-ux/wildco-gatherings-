import Link from "next/link";
import { HorizonStamp, Icon } from "@/components/Marks";
import { SETTINGS } from "@/lib/settings";
import Photo from "@/components/Photo";
import type { Horizon } from "@/lib/horizon";

// A postcard: setting-tinted stock, dashed inner border, the rectangular On the Horizon stamp.
// With a hero photo (set once the house grants image use) the photo leads the card.
export default function HorizonCard({ h }: { h: Horizon }) {
  const st = SETTINGS[h.setting];
  return (
    <Link href={`/horizon/${h.slug}`} className="hz-card" style={{ ["--stock" as string]: st.stock } as React.CSSProperties} aria-label={`${h.name} — ${h.place}, ${h.country}`}>
      {h.hero && <div className="hz-photo"><Photo img={h.hero} sizes="(max-width: 700px) 100vw, 400px" aspect="3:2" style={{ height: 210 }} /></div>}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
        <p className="cp" style={{ margin: 0, color: st.ink, display: "flex", alignItems: "center", gap: 8 }}><Icon name={h.setting} size={18} color={st.ink} /> {st.name}</p>
        <HorizonStamp setting={h.setting} no={h.no} opens={h.opens} size={132} rotate={6} />
      </div>
      <h3 className="hz-name">{h.short}</h3>
      <p className="cp muted" style={{ margin: "10px 0 0" }}>{h.place} · {h.country}</p>
      <p className="hz-dek">{h.dek}</p>
      <div className="hz-foot">
        <span className="hz-flag" style={{ color: st.ink }}>{h.opens}</span>
        <span className="lnk">First look <span>→</span></span>
      </div>
    </Link>
  );
}
