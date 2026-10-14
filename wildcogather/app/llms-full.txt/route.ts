import { buildLedger } from "@/lib/ledger-registry";

export const revalidate = 3600;

const line = (k: string, v?: string | number | null) => (v === undefined || v === null || v === "" ? [] : [`${k}: ${v}`]);
const list = (k: string, v?: string[]) => (v && v.length ? [`${k}:`, ...v.map((x) => `  - ${x}`)] : []);

// The whole Ledger as plain text, one block per house, for LLMs and the chat agent.
export async function GET() {
  const L = await buildLedger();
  const blocks = L.houses.map((h) => [
    `## ${h.id} · ${h.name}`,
    ...line("Entity ID", [h.entityId, h.entityType, h.parent ? `residence of ${h.parent.name} (${h.parent.entityId})` : ""].filter(Boolean).join(" · ")),
    ...line("Ledger key", h.key),
    ...line("URL", h.url),
    ...line("Stamp", h.stamp + (h.firstVisited ? ` · first visited ${h.firstVisited}` : "")),
    ...line("Where", `${h.place}, ${h.region}, ${h.country}`),
    ...line("Setting", h.setting),
    ...line("In one line", h.line),
    ...h.verdict.map((v, i) => (i === 0 ? `James's verdict: ${v}` : `  ${v}`)),
    ...line("Best for", h.bestFor),
    ...line("Not for", h.notFor),
    ...line("Sleeps", h.sleeps),
    ...line("Bedrooms", h.bedrooms),
    ...line("Children", [h.kids.ages, h.kids.program].filter(Boolean).join(" · ")),
    ...line("Water", h.water),
    ...line("Best season", h.bestSeason),
    ...line("Getting there", h.airport),
    ...line("Partner", h.partner),
    ...line("How it books", h.booking?.plan),
    ...list("Included", h.booking?.included),
    ...list("Not included", h.booking?.notIncluded),
    ...list("Experiences", h.experiences),
    ...list("Field notes", h.fieldNotes),
    ...h.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`]),
    ...line("Itineraries", h.itineraries.map((i) => `${i.templateId || ""} ${i.slug}`.trim()).join(", ")),
    ...h.evidence.map((e) => `Evidence ${e.id}: ${e.method}${e.date ? ` (${e.date})` : ""} — ${e.scope}`),
    "Rates: request a quote",
    "",
  ].join("\n"));
  const head = [
    "# Wild & Co Gatherings — the full Ledger",
    "",
    `Published by ${L.publisher}. Founder: ${L.founder.name} (${L.founder.url}). Updated ${L.updated}.`,
    `IDs: ${L.idScheme.entity}. ${L.idScheme.house}; ${L.idScheme.horizon}. Key: ${L.idScheme.key}.`,
    `Evidence rules: ${L.evidenceRules}`,
    `Booking: ${L.howToBook.note} ${L.howToBook.url}`,
    `Stamps: ${Object.entries(L.stamps).map(([k, v]) => `${k} — ${v}`).join(" | ")}`,
    `The Gathering Formula (six tests): ${L.formula.join(", ")}.`,
    "",
  ].join("\n");
  const trips = ["# Itineraries", "", ...L.itineraries.map((t) => `- ${t.templateId ? `${t.templateId} ` : ""}${t.title} (${t.days} days / ${t.nights} nights) — ${t.url} — houses: ${t.houses.map((x) => `${x.id || "?"} ${x.slug}`).join(", ")}${t.bestFor ? ` — best for: ${t.bestFor}` : ""}`), ""].join("\n");
  const hz = ["# On the Horizon (not yet stayed by James)", "", ...L.horizon.map((x) => `- ${x.id} ${x.name} — ${x.place}, ${x.country} — ${x.opens} — ${x.url}`), ""].join("\n");
  return new Response([head, "# Houses", "", ...blocks, trips, hz].join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
