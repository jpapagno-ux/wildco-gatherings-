// ——— Travel partners shown on the site (named, never linked — house policy: no outbound links to partner travel companies) ———
// Logos are the partners' own transparent SVGs, used at James's direction.
export type Partner = { key: string; name: string; logo: string; logoLight: string; role: string; regions: string[] };

export const PARTNERS: Partner[] = [
  {
    key: "tradewind",
    name: "Tradewind Aviation",
    logo: "/partners/tradewind-aviation.svg",
    logoLight: "/partners/tradewind-aviation-light.svg",
    role: "Private and scheduled flights to the Bahamas and the Caribbean",
    regions: ["Bahamas", "Caribbean"],
  },
];

export const partner = (key: string) => PARTNERS.find((p) => p.key === key);

// ——— "Arrive by air" cards on Bahamas and Caribbean houses ———
// Facts from flytradewind.com destination pages (read 15 Oct 2026). Flight times are Tradewind's published PC-12 times.
export type FlightCard = { partner: string; title: string; summary: string; detail: string; routesLabel: string; routes: [string, string][]; trip: string };

const PC12 = "Pilatus PC-12: pressurised and air-conditioned, eight seats with room for the family's luggage, flown by Tradewind, a Part 135 operator.";

export const FLIGHT_CARDS: Record<string, FlightCard> = {
  "baymahni-exuma": {
    partner: "tradewind",
    title: "Fly private to Great Exuma",
    summary: "Tradewind flies private charters straight into Exuma International (GGT) from its base in Palm Beach and airports across Florida — one plane for the whole family, no connections.",
    detail: PC12,
    routesLabel: "Flight times to Great Exuma (GGT)",
    routes: [["Miami", "1 h 18 min"], ["Fort Lauderdale", "1 h 18 min"], ["Palm Beach", "1 h 24 min"], ["Naples", "1 h 36 min"], ["Orlando", "1 h 54 min"], ["Tampa", "2 h"]],
    trip: "Tradewind private flight to Great Exuma",
  },
};

// Ready for the St Barths family home when it joins the Ledger.
export const ST_BARTHS_FLIGHTS: FlightCard = {
  partner: "tradewind",
  title: "Fly into St Barths",
  summary: "Tradewind flies to St Barths year-round from San Juan (about an hour) and Antigua (about 35 minutes), with a private lounge in San Juan — or privately from St Thomas and St Croix.",
  detail: PC12,
  routesLabel: "Flight times to St Barths (SBH)",
  routes: [["San Juan", "55 min"], ["St Thomas", "41 min"], ["St Croix", "36 min"], ["Antigua", "about 35 min"]],
  trip: "Tradewind flight to St Barths",
};
