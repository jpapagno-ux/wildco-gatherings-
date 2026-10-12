import Link from "next/link";
import { HorizonStamp, Icon } from "@/components/Marks";
import { SETTINGS } from "@/lib/settings";
import type { Horizon } from "@/lib/horizon";

// A "postcard not yet sent": setting-tinted stock, dashed inner border, the rectangular
// On the Horizon stamp. No partner photos until permission — the card works without them.
export default function HorizonCard({ h }: { h: Horizon }) {
  const st = SETTINGS[h.setting];
  return (
    <Link href={`/horizon/${h.slug}`} className="hz-card" style={{ ["--stock" as string]: st.stock } as React.CSSProperties} aria-label={`${h.name} — ${h.place}, ${h.country}`}>
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
