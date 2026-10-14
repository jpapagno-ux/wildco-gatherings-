// ——— My Folios: the traveller's shelf of journeys ———
// Today Folios are SAVED ON THIS DEVICE (browser storage). There is no account, cloud sync or
// cross-site persistence yet. The store below is an adapter: when shared accounts exist, implement
// FolioStore against that service and pass it to <FolioProvider store={…}> — the UI does not change.
// Never store passports, payment details, credentials or documents in a Folio.

export type FolioItemKind = "house" | "itinerary";

export type TemplateSnapshot = {
  templateId?: string; // JWC-I-#### — the original template is never modified
  title: string;
  days: number;
  nights: number;
  stops?: { house: string; nights: number; label: string }[];
  dayTitles: string[];
  snapshotAt: string;
};

export type FolioItem = {
  key: string; // kind:slug — prevents duplicate saves
  kind: FolioItemKind;
  slug: string;
  name: string;
  entityId?: string; // permanent JWC-… ID
  ref?: string; // collection reference, e.g. G-011
  href: string;
  addedAt: string;
  note?: string;
  template?: TemplateSnapshot; // a traveller-specific copy of an itinerary template
  changes?: { at: string; note: string }[]; // later changes to this traveller's copy
};

export type Folio = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  dates?: string;
  party?: string; // e.g. "6 adults, children 4 and 9, grandparents 78 and 80"
  notes?: string;
  decisions?: string;
  items: FolioItem[];
};

export type FolioState = { folios: Folio[]; activeId?: string };

export interface FolioStore {
  readonly mode: "device" | "account";
  load(): FolioState;
  save(state: FolioState): void;
  subscribe?(onChange: () => void): () => void;
}

const KEY = "jwco.folios.v1";

export const deviceStore: FolioStore = {
  mode: "device",
  load() {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (!raw) return { folios: [] };
      const s = JSON.parse(raw) as FolioState;
      return { folios: Array.isArray(s.folios) ? s.folios : [], activeId: s.activeId };
    } catch {
      return { folios: [] };
    }
  },
  save(state) {
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* storage blocked: the page still works for this visit */ }
  },
  subscribe(onChange) {
    const h = (e: StorageEvent) => { if (e.key === KEY) onChange(); };
    window.addEventListener("storage", h);
    return () => window.removeEventListener("storage", h);
  },
};

export const now = () => new Date().toISOString();
export const newFolioId = () => `F-${typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID().slice(0, 8) : Math.random().toString(36).slice(2, 10)}`;

export function newFolio(name: string): Folio {
  const t = now();
  return { id: newFolioId(), name: name.trim() || "Our next gathering", createdAt: t, updatedAt: t, items: [] };
}

const when = (iso: string) => new Date(iso).toLocaleString("en-US", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

/** A plain-text planning summary — sent with an advisor review and used for the trip pack. */
export function folioSummary(f: Folio, site = "") {
  const lines = [
    `MY FOLIO — ${f.name}`,
    `Planning summary, not a confirmed itinerary. Saved on the traveller's device; exported ${when(now())}.`,
    "",
    f.dates ? `Dates: ${f.dates}` : "",
    f.party ? `Who's coming: ${f.party}` : "",
    "",
    "HOUSES",
    ...f.items.filter((i) => i.kind === "house").map((i) => `- ${i.name}${i.ref ? ` (${i.ref}` : ""}${i.entityId ? ` · ${i.entityId})` : i.ref ? ")" : ""} — ${site}${i.href}${i.note ? `\n  Note: ${i.note}` : ""}`),
    "",
    "JOURNEYS (suggested templates, adapted for this Folio)",
    ...f.items.filter((i) => i.kind === "itinerary").map((i) => [
      `- ${i.template?.title || i.name}${i.template?.templateId ? ` (${i.template.templateId})` : ""} — ${i.template ? `${i.template.days} days / ${i.template.nights} nights` : ""} — ${site}${i.href}`,
      ...(i.template?.dayTitles || []).map((d, n) => `    Day ${n + 1}: ${d}`),
      ...(i.changes || []).map((c) => `    Changed ${when(c.at)}: ${c.note}`),
      i.note ? `  Note: ${i.note}` : "",
    ].filter(Boolean).join("\n")),
    "",
    f.notes ? `Notes: ${f.notes}` : "",
    f.decisions ? `Decisions so far: ${f.decisions}` : "",
  ];
  return lines.filter((l, i, a) => !(l === "" && a[i - 1] === "")).join("\n").trim();
}

export const entityIdsOf = (f: Folio) => f.items.map((i) => Array.from(new Set([i.entityId, i.template?.templateId, i.ref].filter(Boolean))).join("/")).filter(Boolean).join(", ");
