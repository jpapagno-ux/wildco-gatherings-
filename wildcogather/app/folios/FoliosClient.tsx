"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { useJourney } from "@/components/JourneyProvider";
import { folioSummary, newFolioId, now, type Folio, type FolioState } from "@/lib/folios";

const when = (iso?: string) => (iso ? new Date(iso).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "");

function download(name: string, text: string, type: string) {
  const url = URL.createObjectURL(new Blob([text], { type }));
  const a = document.createElement("a");
  a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
const fileSafe = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "folio";

export default function FoliosClient() {
  const { ready, folios, active, setActive, create, update, remove, removeItem, updateItem, replaceAll, openIggi } = useJourney();
  const [newName, setNewName] = useState("");
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const [flash, setFlash] = useState("");
  const [exportedAt, setExportedAt] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  if (!ready) return <p className="body">Opening your Folios…</p>;

  const f = active;

  function exportAll() {
    const t = now();
    download(`my-folios-${t.slice(0, 10)}.json`, JSON.stringify({ format: "jwco-folios", version: 1, exportedAt: t, folios }, null, 2), "application/json");
    setExportedAt(t);
    setFlash("Exported. The file is a copy: it won't receive later changes.");
  }

  async function importFile(file: File) {
    try {
      const data = JSON.parse(await file.text());
      const incoming: Folio[] = Array.isArray(data?.folios) ? data.folios : [];
      if (data?.format !== "jwco-folios" || !incoming.length) throw new Error("not a Folio file");
      const clean = incoming.map((x) => ({ ...x, id: folios.some((y) => y.id === x.id) ? newFolioId() : x.id, items: Array.isArray(x.items) ? x.items : [] }));
      const next: FolioState = { folios: [...clean, ...folios], activeId: clean[0].id };
      replaceAll(next);
      setFlash(`Imported ${clean.length} Folio${clean.length === 1 ? "" : "s"}.`);
    } catch {
      setFlash("That file isn't a My Folios export. Nothing was changed.");
    }
  }

  function tripPack(x: Folio) {
    const t = now();
    const text = `${folioSummary(x, window.location.origin)}\n\n—\nTrip pack exported ${when(t)} from Wild & Co Gatherings. This offline copy cannot receive live changes. It is a planning summary, not a confirmed itinerary or booking.`;
    download(`${fileSafe(x.name)}-trip-pack.txt`, text, "text/plain");
    setExportedAt(t);
  }

  return (
    <div className="fo-wrap">
      <aside className="fo-shelf" aria-label="Your Folios">
        <p className="lbl" style={{ marginTop: 0 }}>Your shelf</p>
        {folios.length === 0 && <p className="body" style={{ fontSize: 15 }}>No Folios yet. Name your first one below, or press “Save to My Folios” on any house or journey.</p>}
        <ul className="fo-list">
          {folios.map((x) => (
            <li key={x.id}>
              <button type="button" className={x.id === f?.id ? "on" : ""} aria-current={x.id === f?.id ? "true" : undefined} onClick={() => setActive(x.id)}>
                <span className="ser">{x.name}</span>
                <span className="cp muted">{x.items.length} saved · {new Date(x.updatedAt).toLocaleDateString("en-US", { day: "numeric", month: "short" })}</span>
              </button>
            </li>
          ))}
        </ul>
        <form className="fo-new" onSubmit={(e) => { e.preventDefault(); create(newName || "Our next gathering"); setNewName(""); }}>
          <label className="lbl" htmlFor="fo-new">New Folio</label>
          <input id="fo-new" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Grandma's 80th, Madikwe" />
          <button type="submit" className="btn btn-o">Create</button>
        </form>
        <div className="fo-io">
          <button type="button" className="tr-link" onClick={exportAll} disabled={!folios.length}>Export all (JSON)</button>
          <button type="button" className="tr-link" onClick={() => fileRef.current?.click()}>Import</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden onChange={(e) => { const file = e.target.files?.[0]; if (file) importFile(file); e.target.value = ""; }} />
        </div>
        {exportedAt && <p className="cp muted">Last exported {when(exportedAt)}</p>}
        {flash && <p className="cp ox" role="status">{flash}</p>}
      </aside>

      <section className="fo-main" aria-label="Open Folio">
        {!f ? (
          <div className="card" style={{ padding: 34 }}>
            <p className="ser" style={{ fontSize: 26, margin: 0 }}>Bring your plans together here.</p>
            <p className="body" style={{ margin: "10px 0 20px" }}>Save houses and journeys as you explore, note who&apos;s coming and when, and send the whole Folio to an advisor when you&apos;re ready.</p>
            <Link href="/houses" className="btn">Explore the Houses</Link>
          </div>
        ) : (
          <>
            <div className="fo-head">
              <label className="lbl" htmlFor="fo-name">Folio name</label>
              <input id="fo-name" className="fo-title ser" value={f.name} onChange={(e) => update(f.id, { name: e.target.value })} />
              <p className="cp muted" style={{ margin: "6px 0 0" }}>Created {when(f.createdAt)} · Updated {when(f.updatedAt)} · Saved on this device</p>
            </div>

            <div className="fo-grid">
              <label className="lbl" htmlFor="fo-dates">Dates or month<input id="fo-dates" value={f.dates || ""} onChange={(e) => update(f.id, { dates: e.target.value })} placeholder="Late June 2027, 8 nights" /></label>
              <label className="lbl" htmlFor="fo-party">Who&apos;s coming<input id="fo-party" value={f.party || ""} onChange={(e) => update(f.id, { party: e.target.value })} placeholder="6 adults, children 4 and 9, grandparents 78 and 80" /></label>
            </div>

            <h2 className="lbl" style={{ marginTop: 34 }}>Houses</h2>
            {f.items.filter((i) => i.kind === "house").length === 0 && <p className="body" style={{ fontSize: 15 }}>None yet. <Link href="/houses">Browse the houses</Link>.</p>}
            <ul className="fo-items">
              {f.items.filter((i) => i.kind === "house").map((i) => (
                <li key={i.key}>
                  <div className="fo-item-h">
                    <Link href={i.href} className="ser">{i.name}</Link>
                    <span className="cp muted">{[i.ref, i.entityId].filter(Boolean).join(" · ")}</span>
                    <button type="button" className="tr-link" onClick={() => removeItem(f.id, i.key)} aria-label={`Remove ${i.name} from this Folio`}>Remove</button>
                  </div>
                  <label className="cp muted" htmlFor={`n-${i.key}`}>Your note</label>
                  <input id={`n-${i.key}`} value={i.note || ""} onChange={(e) => updateItem(f.id, i.key, { note: e.target.value })} placeholder="Pool for the little ones; ask about the ground-floor suite" />
                </li>
              ))}
            </ul>

            <h2 className="lbl" style={{ marginTop: 34 }}>Journeys</h2>
            <p className="cp muted" style={{ margin: "0 0 10px" }}>Your copy of each suggested template. The original template stays unchanged; your changes are recorded here.</p>
            {f.items.filter((i) => i.kind === "itinerary").length === 0 && <p className="body" style={{ fontSize: 15 }}>None yet. <Link href="/itineraries">See Family Journeys &amp; Itineraries</Link>.</p>}
            <ul className="fo-items">
              {f.items.filter((i) => i.kind === "itinerary").map((i) => (
                <li key={i.key}>
                  <div className="fo-item-h">
                    <Link href={i.href} className="ser">{i.template?.title || i.name}</Link>
                    <span className="cp muted">{i.template ? `${i.template.days} days · ${i.template.nights} nights` : ""}{i.template?.templateId ? ` · from ${i.template.templateId}` : ""}</span>
                    <button type="button" className="tr-link" onClick={() => removeItem(f.id, i.key)} aria-label={`Remove ${i.name} from this Folio`}>Remove</button>
                  </div>
                  {i.template && <ol className="fo-days">{i.template.dayTitles.map((d, n) => <li key={n}><span className="mono ox">Day {n + 1}</span> {d}</li>)}</ol>}
                  <ChangeNote onSave={(note) => updateItem(f.id, i.key, {}, note)} id={i.key} />
                  {(i.changes || []).length > 0 && <ul className="fo-changes">{i.changes!.map((c, n) => <li key={n} className="cp muted">{when(c.at)} — <span style={{ textTransform: "none", letterSpacing: 0 }}>{c.note}</span></li>)}</ul>}
                </li>
              ))}
            </ul>

            <div className="fo-grid" style={{ marginTop: 30 }}>
              <label className="lbl" htmlFor="fo-notes">Notes<textarea id="fo-notes" rows={3} value={f.notes || ""} onChange={(e) => update(f.id, { notes: e.target.value })} placeholder="Must-haves, mobility, dietary needs (no medical or passport details)" /></label>
              <label className="lbl" htmlFor="fo-dec">Decisions so far<textarea id="fo-dec" rows={3} value={f.decisions || ""} onChange={(e) => update(f.id, { decisions: e.target.value })} placeholder="Safari first, then the Cape. Whole house, not rooms." /></label>
            </div>

            <div className="fo-actions">
              <Link className="btn" href={`/plan?review=1&folio=${f.id}`}>Request Advisor Review</Link>
              <button type="button" className="btn btn-o" onClick={() => openIggi({ label: `Folio: ${f.name}`, href: "/folios" })}>Ask Iggi</button>
              <button type="button" className="tr-link" onClick={() => tripPack(f)}>Download trip pack</button>
              {confirmDelete === f.id ? (
                <span className="fo-confirm" role="group" aria-label="Confirm delete">
                  <span className="cp">Delete “{f.name}” from this device?</span>
                  <button type="button" className="tr-link ox" onClick={() => { remove(f.id); setConfirmDelete(null); setFlash("Folio deleted."); }}>Yes, delete</button>
                  <button type="button" className="tr-link" onClick={() => setConfirmDelete(null)}>Keep it</button>
                </span>
              ) : (
                <button type="button" className="tr-link" onClick={() => setConfirmDelete(f.id)}>Delete Folio</button>
              )}
            </div>

            <details className="fo-summary">
              <summary className="lbl">Planning summary</summary>
              <pre>{folioSummary(f)}</pre>
            </details>
            <p className="cp muted" style={{ marginTop: 18 }}>Travel Mode — today&apos;s plan, meeting points and contacts — appears here for confirmed trips once shared accounts are connected. Until then this is a planning Folio, not a confirmed itinerary.</p>
          </>
        )}
      </section>
    </div>
  );
}

function ChangeNote({ onSave, id }: { onSave: (note: string) => void; id: string }) {
  const [v, setV] = useState("");
  return (
    <form className="fo-change" onSubmit={(e) => { e.preventDefault(); if (v.trim()) { onSave(v.trim()); setV(""); } }}>
      <label className="cp muted" htmlFor={`c-${id}`}>Change for your copy</label>
      <input id={`c-${id}`} value={v} onChange={(e) => setV(e.target.value)} placeholder="Swap Day 4 for a slow pool day" />
      <button type="submit" className="tr-link">Record change</button>
    </form>
  );
}
