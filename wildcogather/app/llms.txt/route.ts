import { buildLedger, STAMP_MEANING } from "@/lib/ledger-registry";

export const revalidate = 3600;

// llms.txt (llmstxt.org): a short, linkable map of the site for answer engines and the chat agent.
export async function GET() {
  const L = await buildLedger();
  const out = [
    "# Wild & Co Gatherings",
    "",
    "> Wild & Co Gatherings is the family-and-generations volume of James Wild & Co (journey design since 1982), alongside Stays, Safaris and Voyages. Every house has a permanent James Wild & Co entity ID (JWC-…) and a Gatherings reference (G-###), with evidence showing whether James stayed, visited or met the host. Stays are planned and booked through Wild & Co; partner websites are not linked; prices are quoted, not published.",
    "",
    `Machine-readable ledger: ${L.site}/ledger.json · Full text: ${L.site}/llms-full.txt · Plan a gathering: ${L.howToBook.url}`,
    "",
    "## The Ledger — houses",
    ...L.houses.map((h) => `- [${h.id} ${h.name}](${h.url}): ${h.entityId || ""}${h.parent ? ` (residence at ${h.parent.name})` : ""} · ${h.place}, ${h.country} · ${h.evidence.find((e) => e.method !== "House Selected" && e.method !== "Founder Favorite")?.wording || "Selected by James Wild"} · ${h.line}`),
    "",
    "## Itineraries",
    ...L.itineraries.map((t) => `- [${t.title}](${t.url}): ${t.days} days · houses ${t.houses.map((x) => x.id || x.slug).join(", ")}`),
    "",
    "## On the Horizon (not yet stayed)",
    ...L.horizon.map((x) => `- [${x.id} ${x.name}](${x.url}): ${x.place}, ${x.country} · ${x.opens}`),
    "",
    "## About",
    `- [James Wild, founder](${L.founder.url}): forty-four years on the road since 1982; vets every house himself`,
    `- [The Gatherings Ledger](${L.site}/ledger): how the stamps work — ${Object.entries(STAMP_MEANING).map(([k, v]) => `${k}: ${v}`).join(" ")}`,
    `- [For travel advisors](${L.site}/advisors): advisor-led, always`,
    "",
  ].join("\n");
  return new Response(out, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
