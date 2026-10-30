// ——— Shared record structure for the James Wild & Co ecosystem ———
// Gatherings is one of four volumes (Stays, Safaris, Gatherings, Voyages). A property that appears in
// several volumes resolves to ONE permanent entity ID (JWC-…); each volume keeps its own collection
// reference (here G-###). IDs are allocated once and persisted in data/entities.json and Airtable
// (Residences › Entity ID, Itineraries › Template ID) — never derived from names, slugs or positions.
//
// This file is the repository adapter. Today it reads the persisted JSON in this repo; when the
// shared Ledger service exists, swap the two loaders below for its API and keep the same shapes.
import entityData from "@/data/entities.json";
import evidenceData from "@/data/evidence.json";

export type EntityType = "property" | "residence" | "configuration" | "experience" | "destination" | "itinerary-template" | "evidence" | "field-note" | "offer" | "folio";
export type Volume = "stays" | "safaris" | "gatherings" | "voyages";

export type Entity = {
  id: string;
  type: EntityType;
  parentId: string | null;
  name: string | null;
  slug: string | null;
  legacyIds: string[];
  collectionRefs: { collection: Volume; ref: string }[];
  collections: string[];
  status: "published" | "draft" | "reference" | "retired";
  note?: string;
};

export type EvidenceMethod = "Personally Stayed" | "Personally Inspected" | "Host / Partner Reviewed" | "Host Met" | "House Selected" | "Founder Favorite" | "On the Horizon";

export type Evidence = {
  id: string;
  subject: string; // entity ID
  ref: string; // collection reference it was recorded against
  method: EvidenceMethod;
  reviewer: string;
  role: string;
  date: string; // "2026-05", "2024" or ""
  precision: "Day" | "Month" | "Year" | "Unknown";
  scope: string;
  source: string;
  wording: string; // approved public wording
  status: "Approved" | "Needs confirmation";
};

const ENTITIES = (entityData as { entities: Entity[] }).entities;
const EVIDENCE = (evidenceData as { evidence: Evidence[] }).evidence;

export const allEntities = () => ENTITIES;
export const entityById = (id?: string | null) => (id ? ENTITIES.find((e) => e.id === id) : undefined);

/** The permanent entity for a Gatherings house (by its page slug). */
export const entityForHouse = (slug: string) => ENTITIES.find((e) => (e.type === "property" || e.type === "residence") && e.slug === slug);
/** The permanent template ID for an itinerary slug. */
export const templateIdFor = (slug: string) => ENTITIES.find((e) => e.type === "itinerary-template" && e.slug === slug)?.id;
export const parentOf = (e?: Entity) => entityById(e?.parentId);
export const gatheringsRef = (e?: Entity) => e?.collectionRefs.find((c) => c.collection === "gatherings")?.ref;

// Evidence ranked from strongest verification to opinion. Founder Favorite is an opinion, never a verification.
export const METHOD_ORDER: EvidenceMethod[] = ["Personally Stayed", "Personally Inspected", "Host / Partner Reviewed", "Host Met", "House Selected", "Founder Favorite", "On the Horizon"];
export const METHOD_MEANING: Record<EvidenceMethod, string> = {
  "Personally Stayed": "James stayed overnight at this exact house or residence.",
  "Personally Inspected": "Founder inspected & approved: James inspected the house in person and approved it for the Ledger. An inspection is not an overnight stay.",
  "Host / Partner Reviewed": "The host or partner has reviewed the facts on this page.",
  "Host Met": "James has spoken with the host. It does not verify every fact.",
  "House Selected": "James chose the house for the Ledger — an editorial judgement.",
  "Founder Favorite": "James's personal favourite — an opinion, not a verification.",
  "On the Horizon": "New or soon to open; James has not yet stayed.",
};

/** Approved evidence for a house: its own records first, then its parent property's, strongest first. */
export function evidenceForHouse(slug: string) {
  const e = entityForHouse(slug);
  if (!e) return { entity: undefined, parent: undefined, own: [] as Evidence[], fromParent: [] as Evidence[], pending: [] as Evidence[] };
  const parent = parentOf(e);
  const rank = (x: Evidence) => METHOD_ORDER.indexOf(x.method);
  const own = EVIDENCE.filter((x) => x.subject === e.id && x.status === "Approved").sort((a, b) => rank(a) - rank(b));
  const fromParent = parent ? EVIDENCE.filter((x) => x.subject === parent.id && x.status === "Approved").sort((a, b) => rank(a) - rank(b)) : [];
  const pending = EVIDENCE.filter((x) => (x.subject === e.id || x.subject === parent?.id) && x.status !== "Approved");
  return { entity: e, parent, own, fromParent, pending };
}

/** The headline evidence basis for a house — the strongest approved verification (never Founder Favorite). */
export function evidenceBasis(slug: string): Evidence | undefined {
  return evidenceForHouse(slug).own.find((x) => x.method !== "Founder Favorite" && x.method !== "House Selected")
    || evidenceForHouse(slug).own.find((x) => x.method === "House Selected");
}

/** How each method is named on the site. */
export const METHOD_LABEL: Record<EvidenceMethod, string> = {
  "Personally Stayed": "Personally Stayed",
  "Personally Inspected": "Founder Inspected & Approved",
  "Host / Partner Reviewed": "Host / Partner Reviewed",
  "Host Met": "Host Met",
  "House Selected": "House Selected",
  "Founder Favorite": "Founder Favorite",
  "On the Horizon": "On the Horizon",
};

/** True when James has been there in person (stayed or inspected) — needed before a Formula result reads as confirmed. */
export const visitedInPerson = (slug: string) => evidenceForHouse(slug).own.some((x) => x.method === "Personally Stayed" || x.method === "Personally Inspected");

export function formatEvidenceDate(e: Evidence) {
  if (!e.date || e.precision === "Unknown") return "";
  const [y, m] = e.date.split("-");
  if (e.precision === "Year" || !m) return y;
  return `${["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][Number(m) - 1]} ${y}`;
}

// ——— The Gathering Formula: criterion-level notes and exceptions ———
// "Water within reach" is a water SETTING. It does not promise swimming or boating — a wildlife
// waterhole or a crocodile river is for watching. Exceptions recorded here show beside the criterion.
export const FORMULA_EXCEPTIONS: Record<string, Record<string, string>> = {
  "monwana-villa-thornybush": { "Water within reach": "The waterhole and dry riverbed are for watching wildlife — no swimming or boating. Swimming is in the villa's plunge pools." },
  "fish-eagle-villa-lion-sands": { "Water within reach": "The Sabie River is for watching wildlife — no swimming or boating in it." },
  "hinkwenu-villa-lion-sands": { "Water within reach": "River views are for watching wildlife — no swimming or boating in the river." },
  "jacis-madikwe-house": { "Water within reach": "Waterholes on the reserve are for watching wildlife — no swimming or boating." },
  "morukuru-farm-house-madikwe": { "Water within reach": "Water on the reserve is for watching wildlife — no swimming or boating." },
  "morukuru-river-house-madikwe": { "Water within reach": "The Marico River is for watching wildlife — no swimming or boating in it." },
  "fort-house-kwandwe": { "Water within reach": "The private waterhole is for watching wildlife. Swimming is in the villa's heated pool; fishing on the reserve is catch and release." },
  "melton-manor-kwandwe": { "Water within reach": "Swimming is in the courtyard pool; fishing on the reserve is catch and release." },
  "uplands-homestead-kwandwe": { "Water within reach": "Swimming is in the homestead's pool; fishing on the reserve is catch and release." },
};

/** Formula display: counts only criteria with a recorded note, and says how they were assessed. */
export function formulaSummary(slug: string, formula: { test: string; note: string; pass: boolean }[]) {
  const supported = formula.filter((f) => f.pass && f.note?.trim());
  const inPerson = visitedInPerson(slug);
  const all = supported.length === 6 && formula.length === 6;
  const line = all
    ? inPerson ? "Six of six, each with a recorded note from James's visit." : "Six of six noted from host conversations — to be confirmed in person."
    : `${supported.length} of six with a recorded note.`;
  return { supported: supported.length, all, inPerson, line, exceptions: FORMULA_EXCEPTIONS[slug] || {} };
}

// ——— Prices ———
// A price shows only with currency, rate basis, occupancy, dates, exclusions and a source. Otherwise "Request a Quote".
export type VerifiedRate = { amount: number; currency: string; basis: string; occupancy: string; validFrom: string; validTo: string; exclusions: string[]; source: string; checked: string };
export const isVerifiedRate = (r?: Partial<VerifiedRate>): r is VerifiedRate =>
  !!r && typeof r.amount === "number" && !!r.currency && !!r.basis && !!r.occupancy && !!r.validFrom && !!r.validTo && Array.isArray(r.exclusions) && !!r.source && !!r.checked;
