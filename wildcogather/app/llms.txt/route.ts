import { buildLedger, STAMP_MEANING } from "@/lib/ledger-registry";

export const revalidate = 3600;

// llms.txt (llmstxt.org): a short, linkable map of the site for answer engines and the chat agent.
export async function GET() {
  const L = await buildLedger();
  const out = [
    "# Wild & Co Gatherings",
    "",
    "> Resort residences and family journeys for travelling across generations, each personally vetted by James Wild — a house of James Wild & Co, journey design since 1982. Every house carries a permanent Ledger ID (G-###) and the stamp it has earned. Stays are planned and booked through Wild & Co Gatherings; partner websites are not linked.",
    "",
    `Machine-readable ledger: ${L.site}/ledger.json · Full text: ${L.site}/llms-full.txt · Plan a gathering: ${L.howToBook.url}`,
    "",
    "## The Ledger — houses",
    ...L.houses.map((h) => `- [${h.id} ${h.name}](${h.url}): ${h.place}, ${h.country} · ${h.stamp}${h.firstVisited ? ` (${h.firstVisited})` : ""} · ${h.line}`),
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
