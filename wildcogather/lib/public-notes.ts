// ——— Field notes: the only free text from Airtable › Residences › Notes that is ever published ———
// Notes are published as public field notes (house data, /ledger.json, /llms-full.txt). Internal material — sources,
// links, review markers, contact or commercial details — belongs in Residences › "Internal notes", which the site never
// reads (decided 30 Oct 2026, after Pioneer Camp's internal source notes and a Safaris URL reached the public outputs).
// This filter is the second line of defence: a Notes line that still looks internal is dropped, never shown.
export const INTERNAL_NOTES_FIELD = "Internal notes";

const INTERNAL = [
  /https?:\/\//i, // any link
  /\bwww\./i,
  /\b[a-z0-9-]+\.(?:com|co\.za|co\.uk|org|net|app|io|travel|vercel\.app)\b/i, // a bare domain
  /\bwild(?:and)?cosafaris\b|\bmore\.co\.za\b/i, // the Safaris site, a partner site
  /\[(?:draft|confirm|to confirm|j\.w\.)/i, // review markers
  /\bdraft\b/i,
  /\bsources?\s*(?:\(|:)/i,
  /\bto confirm\b|\bconfirm with\b|\bconfirm (?:kids|whole|which)/i,
  /\bmirrors lib\//i, /\blib\/[a-z-]+\.ts\b/i, // code references
  /\bledger ID\b|\bWCS-[A-Z]{2}-/i, // internal IDs live in the Ledger fields, not in notes
  /\bcommission\b|\bnet rate\b|\bcontract\b|\blicen[cs]e\b/i, // commercial
  /@|\+\d[\d\s-]{6,}/, // email or phone
];

/** True when a line of Notes reads as internal and must not be published. */
export const isInternalNote = (line: string) => INTERNAL.some((re) => re.test(line));

/** The publishable field notes: one per line, internal lines dropped. */
export const publicNotes = (v?: unknown): string[] =>
  String(v ?? "").split(/\n+/).map((s) => s.trim()).filter(Boolean).filter((l) => !isInternalNote(l));
