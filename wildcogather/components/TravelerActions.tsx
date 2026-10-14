"use client";
import Link from "next/link";
import { useState } from "react";
import { useJourney } from "@/components/JourneyProvider";
import type { FolioItem } from "@/lib/folios";

// Save to My Folios · Add to This Folio · Ask Iggi · Request Advisor Review
// Works in device mode today (Folios saved in this browser). Never a dead button.
export default function TravelerActions({ item, compact = false }: { item: Omit<FolioItem, "addedAt" | "key">; compact?: boolean }) {
  const { ready, folios, active, setActive, addItem, removeItem, openIggi, create } = useJourney();
  const [msg, setMsg] = useState("");
  const key = `${item.kind}:${item.slug}`;
  const savedIn = folios.filter((f) => f.items.some((i) => i.key === key));
  const inActive = !!active?.items.some((i) => i.key === key);

  const save = (folioId?: string) => {
    // An itinerary saved to a Folio becomes the traveller's own copy, stamped with when it was taken.
    const copy = item.template ? { ...item, template: { ...item.template, snapshotAt: new Date().toISOString() } } : item;
    const { folio, added } = addItem(copy, folioId);
    setMsg(added ? `Saved to “${folio.name}”.` : `Already in “${folio.name}”.`);
  };

  return (
    <div className={`tr-actions${compact ? " compact" : ""}`} aria-label="Plan with this">
      <div className="tr-row">
        {inActive && active ? (
          <button type="button" className="btn btn-o" onClick={() => { removeItem(active.id, key); setMsg(`Removed from “${active.name}”.`); }} aria-pressed="true">
            ✓ Saved · Remove
          </button>
        ) : (
          <button type="button" className="btn" onClick={() => save()} disabled={!ready}>Save to My Folios</button>
        )}
        {folios.length > 1 && (
          <span className="tr-pick">
            <label htmlFor={`tr-f-${item.slug}`} className="cp muted">Add to this Folio</label>
            <select id={`tr-f-${item.slug}`} value={active?.id || ""} onChange={(e) => { if (e.target.value === "__new") { const f = create("Our next gathering"); setActive(f.id); } else setActive(e.target.value); }}>
              {folios.map((f) => <option key={f.id} value={f.id}>{f.name}{f.items.some((i) => i.key === key) ? " ✓" : ""}</option>)}
              <option value="__new">+ New Folio</option>
            </select>
          </span>
        )}
        <button type="button" className="tr-link" onClick={() => openIggi({ label: item.name, href: item.href, entityId: item.entityId, ref: item.ref })}>Ask Iggi</button>
        <Link className="tr-link" href={`/plan?review=1&house=${encodeURIComponent(item.kind === "house" ? item.slug : "")}${item.kind === "itinerary" ? `&trip=${encodeURIComponent(item.slug)}` : ""}${active ? `&folio=${active.id}` : ""}`}>Request Advisor Review</Link>
      </div>
      <p className="tr-status" role="status" aria-live="polite">
        {msg || (savedIn.length ? `In ${savedIn.map((f) => `“${f.name}”`).join(", ")}.` : "")}
        {(msg || savedIn.length > 0) && <> · <Link href="/folios">Open My Folios</Link></>}
        <span className="tr-local"> Saved on this device.</span>
      </p>
    </div>
  );
}
