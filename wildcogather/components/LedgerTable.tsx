import Link from "next/link";
import type { Residence } from "@/lib/types";
import { SETTINGS } from "@/lib/settings";
import Photo from "@/components/Photo";

// Setting ink appears here only as a small dot; status text stays oxblood (the ledger colour).
export default function LedgerTable({ rows }: { rows: Residence[] }) {
  return (
    // Wide on phones: the table scrolls sideways inside its own focusable region, never the page.
    <div style={{ overflowX: "auto" }} role="region" aria-label="The Gatherings Ledger" tabIndex={0}>
      <div className="ledger">
        <div className="ledger-row cp muted">
          <span>Entry</span><span>House / Location</span><span>Setting</span><span>Status</span><span>First visited</span><span>Sleeps</span>
        </div>
        {rows.map((r) => (
          <Link key={r.slug} href={`/houses/${r.slug}`} className="ledger-row">
            <span className="mono">{r.entryNo}</span>
            <span className="ledger-house">
              {(() => { const img = r.images.find((i) => i.role === "Card") || r.images.find((i) => i.role === "Hero") || r.images[0]; return img ? <span className="ledger-thumb"><Photo img={img} sizes="96px" aspect="4:3" style={{ height: 66 }} /></span> : null; })()}
              <span><span className="ser" style={{ fontSize: 20, fontWeight: 500 }}>{r.name}</span><span className="cp muted" style={{ display: "block", marginTop: 2 }}>{r.place} · {r.region}</span></span>
            </span>
            <span className="cp" style={{ color: "var(--charcoal)" }}><i className="dot" style={{ background: SETTINGS[r.setting].ink }} aria-hidden="true" />{SETTINGS[r.setting].name}</span>
            <span className="cp oxblood">{r.stamp}{r.vip && <span style={{ border: "1px solid currentColor", padding: "1px 6px", marginLeft: 8 }}>VIP</span>}{r.vip?.visit ? <span className="muted" style={{ display: "block" }}>{r.vip.visit}</span> : null}</span>
            <span className="mono">{r.firstVisited || "—"}</span>
            <span className="mono">{r.sleeps ? `Up to ${r.sleeps}` : "—"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
