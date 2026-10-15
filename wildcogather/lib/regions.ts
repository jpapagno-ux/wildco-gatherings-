// Destination regions for /destinations/[region] and the "Stays" menu.
// A house's region comes from its Country (and Destination); add a country here when a new one arrives.
export type RegionKey = "usa-mexico" | "caribbean" | "latin-america" | "europe" | "africa" | "asia" | "oceania";

export const REGIONS: { key: RegionKey; label: string; intro: string; description: string }[] = [
  { key: "usa-mexico", label: "USA & Mexico", intro: "Big sky, desert light, mountain air and warm-water escapes for large family groups.", description: "Western ranches, desert reserves and coastal stays for long gatherings across generations." },
  { key: "caribbean", label: "Caribbean", intro: "Soft shorelines, reef blues and private island ease for beach-centric chapters.", description: "Island homes, beachfront villas and private hideaways for relaxed family weeks by the sea." },
  { key: "latin-america", label: "Latin America", intro: "Cloud forests, coastlines and mountain homes shaped for slow and generous travel.", description: "Cultural stays and oceanfront homes for beautifully paced family weeks." },
  { key: "europe", label: "Europe", intro: "Historic homes, alpine stillness and warm coastal classics for family reunion travel.", description: "Coastal, alpine and countryside houses for unforgettable gatherings." },
  { key: "africa", label: "Africa", intro: "Private safari villas in Kenya and South Africa — the Maasai Mara, Lewa and Borana, malaria-free Madikwe, treehouse nights and the Cape Winelands.", description: "Exclusive-use safari houses in the Maasai Mara, Lewa, Borana, Madikwe and the Greater Kruger, coast lodges and Winelands cottages — where a whole family shares one guide and one vehicle." },
  { key: "asia", label: "Asia & Indian Ocean", intro: "Rice terraces, jungle views and glowing water villas shaped for immersive family escapes.", description: "Wellness-forward, nature-rich residences for families seeking cultural depth and quiet luxury." },
  { key: "oceania", label: "Oceania", intro: "New Zealand's high country and the lagoons of French Polynesia — a whole lodge in the Ahuriri Valley, a royal villa on a private motu off Taha'a.", description: "A lodge taken whole under a Dark Sky Reserve in New Zealand, and a private island off Taha'a with overwater bungalows, pearl farms and coral gardens." },
];

const RULES: [RegionKey, string[]][] = [
  ["africa", ["south africa", "botswana", "namibia", "kenya", "tanzania", "rwanda", "zambia", "zimbabwe", "limpopo", "mpumalanga", "sabi sand", "kruger", "madikwe", "franschhoek", "western cape"]],
  ["caribbean", ["turks", "caicos", "bahamas", "barbados", "st. barts", "st barts", "anguilla", "jamaica", "caribbean", "antigua", "grenada"]],
  ["asia", ["indonesia", "bali", "thailand", "japan", "vietnam", "maldives", "sri lanka", "india", "philippines", "cambodia"]],
  ["oceania", ["australia", "new zealand", "fiji", "french polynesia", "oceania"]],
  ["europe", ["france", "italy", "spain", "greece", "portugal", "croatia", "united kingdom", "ireland", "switzerland", "austria", "norway", "iceland"]],
  ["latin-america", ["costa rica", "brazil", "argentina", "chile", "peru", "colombia", "ecuador", "belize", "panama", "guatemala"]],
  ["usa-mexico", ["united states", "usa", "mexico", "montana", "new mexico", "california", "arizona", "wyoming", "colorado", "hawaii"]],
];

export function regionFor(h: { place?: string; region?: string; country?: string }): RegionKey {
  const v = `${h.place || ""} ${h.region || ""} ${h.country || ""}`.toLowerCase();
  for (const [key, words] of RULES) if (words.some((w) => v.includes(w))) return key;
  return "usa-mexico";
}
export const regionMeta = (key: string) => REGIONS.find((r) => r.key === key);
