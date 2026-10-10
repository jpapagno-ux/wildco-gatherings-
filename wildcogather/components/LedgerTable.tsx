import Link from "next/link";
import type { Residence } from "@/lib/types";

export default function LedgerTable({ rows }: { rows: Residence[] }) {
  return (
    <div className="scroll-region" tabIndex={0} role="region" aria-label="Gatherings ledger, scroll for all columns">
      <div className="ledger">
        <div className="ledger-row cp muted">
          <span>Entry</span><span>House / Location</span><span>Status</span><span>First visited</span><span>Sleeps</span>
        </div>
        {rows.map((r) => (
          <Link key={r.slug} href={`/houses/${r.slug}`} className="ledger-row">
            <span className="cp" style={{ fontSize: 13 }}>{r.entryNo}</span>
            <span className="cas" style={{ fontSize: 18 }}>{r.name}, {r.place}, {r.region}{r.vip && <span className="cp ox" style={{ border: "1px solid var(--oxblood)", padding: "2px 6px", marginLeft: 8 }}>VIP</span>}</span>
            <span className="cp ox" style={{ fontSize: 12 }}>{r.stamp}{r.vip?.visit ? ` · ${r.vip.visit}` : ""}</span>
            <span className="cp" style={{ fontSize: 13 }}>{r.firstVisited || "—"}</span>
            <span className="cp" style={{ fontSize: 13 }}>{r.sleeps ? `Up to ${r.sleeps}` : "—"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
