// Offers ("Worth Another Night" — Time Rewarded) and short inbound itineraries (3–4 days).
// Both live in Airtable (tables "Offers" and "Itineraries", linked to Residences) and fall back to
// the samples below until AIRTABLE_TOKEN is set. Add a row in Airtable — no code needed.

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID || "appnpcCxUZcapAgbo";

export type OfferStatus = "Draft preview" | "Live" | "Paused" | "Expired";
export type Offer = {
  slug: string;
  house: string; // residence slug
  name: string; // "Worth Another Night — Stay 3, Pay 2"
  kind: string; // "Stay 3, Pay 2"
  stayNights: number;
  payNights: number;
  headline: string;
  line?: string;
  included: string[];
  excluded: string[];
  validFrom?: string; // YYYY-MM-DD
  validTo?: string;
  bookBy?: string;
  blackout?: string;
  terms: string[];
  status: OfferStatus;
  confirmed: boolean;
};

export type ItineraryDay = { title: string; morning?: string; afternoon?: string; evening?: string; note?: string };
export type Itinerary = {
  slug: string;
  house: string;
  title: string;
  days: number;
  nights: number;
  dek: string;
  bestFor?: string;
  season?: string;
  arrive?: string;
  depart?: string;
  plan: ItineraryDay[];
  note?: string;
  included: string[];
  excluded: string[];
  priceNote?: string;
  offer?: string; // offer slug it pairs with
  hero?: string; // Cloudinary public ID (falls back to the house hero)
  draft: boolean;
  seoTitle: string;
  metaDescription: string;
};

const lines = (v?: string) => (v || "").split(/\n+/).map((s) => s.trim()).filter(Boolean);

// "## Day 1 · Title" then "Morning: …", "Afternoon: …", "Evening: …", "Note: …"
export function parsePlan(text: string): { plan: ItineraryDay[]; note?: string } {
  const plan: ItineraryDay[] = [];
  let note: string | undefined;
  for (const raw of text.split("\n")) {
    const l = raw.trim();
    if (!l) continue;
    if (l.startsWith("## ")) { plan.push({ title: l.slice(3).replace(/^Day\s*\d+\s*[·:—-]\s*/i, "").trim() }); continue; }
    const m = l.match(/^(Morning|Afternoon|Evening|Note)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase() as "morning" | "afternoon" | "evening" | "note";
    if (key === "note" && !plan.length) { note = m[2]; continue; }
    const day = plan[plan.length - 1];
    if (!day) continue;
    if (key === "note") { day.note = m[2]; note = note || undefined; } else day[key] = m[2];
  }
  return { plan, note };
}

// ── Samples (mirror the Airtable rows created Oct 2026) ──────────────────────
const SAMPLE_OFFERS: Offer[] = [
  {
    slug: "como-shambhala-worth-another-night",
    house: "como-shambhala-estate",
    name: "Worth Another Night — Stay 3, Pay 2",
    kind: "Stay 3, Pay 2",
    stayNights: 3,
    payNights: 2,
    headline: "Stay 3 nights. Pay for 2.",
    line: "The third night at COMO Shambhala Estate is on the house — time, rewarded.",
    included: [
      "Three nights in your Residence or pool villa — you pay for two",
      "The inclusive plan every night: three meals, a wellness consultation, one treatment or private class a day, daily yoga and fitness",
      "Your personal assistant at the Residence",
      "Day-by-day planning by James Wild & Co",
    ],
    excluded: ["Flights and airport transfers [confirm]", "Drinks beyond the wellness plan", "Rafting, cultural tours and extra treatments", "Babysitting", "Government tax and service charge"],
    validFrom: "2027-01-11",
    validTo: "2027-03-31",
    bookBy: "2026-12-15",
    blackout: "Chinese New Year week [confirm]",
    terms: [
      "Minimum 3 consecutive nights; the third night is free [confirm]",
      "Whole Residence or private villa bookings, subject to availability",
      "New bookings made through Wild & Co Gatherings; not combinable with other offers",
      "Dates and terms to be confirmed with COMO",
    ],
    status: "Draft preview",
    confirmed: false,
  },
];

const COMO_PLAN = `## Day 1 · Into the hills
Morning: Land at Denpasar; your driver takes you up to the Estate, about 90 minutes
Afternoon: Settle into the Residence, a first swim, wellness consultations for the grown-ups
Evening: Family supper at Kudus House

## Day 2 · The river day
Morning: Rafting the Ayung for teens and adults; the youngest and eldest keep to the Water Garden
Afternoon: A picnic by the spring-fed Water Garden, all together
Evening: An early night, or stars from the terrace

## Day 3 · Rice terraces & offerings
Morning: Yoga for the grown-ups; a guided rice-terrace walk at an easy family pace
Afternoon: Making canang sari — grandparents and grandchildren side by side
Evening: Dinner at Glow

## Day 4 · Temples & farewell
Morning: Temples and Ubud galleries, a tour shaped around your family
Afternoon: A slow lunch and one last treatment, then the airport — or on to Canggu
Note: Rafting, the temple tour and the canang sari class are booked as extras [confirm]`;


const LION_SANDS_PLAN = `## Day 1 · Into the Sabi Sand
Morning: Fly into Skukuza; a 5–20 minute transfer to Fish Eagle Villa
Afternoon: Settle in, lunch on the river deck above the Sabie
Evening: First game drive in your private vehicle, sundowners in the bush

## Day 2 · Leopard country
Morning: Dawn drive with your guide and tracker, coffee stop at sunrise
Afternoon: Mack & Madi for the young — tracking, baking with the chef; the pool for everyone else
Evening: Afternoon drive, then supper on the deck

## Day 3 · A night under the stars
Morning: Bush walk for the 16+; a gentle drive for the rest
Afternoon: A slow afternoon by the pool
Evening: Driven to the Kingston Treehouse at sunset — picnic supper, lanterns, the night sky; the rest of the family keeps the villa

## Day 4 · Coffee at sunrise
Morning: Collected after sunrise with hot coffee; a last drive together
Afternoon: Transfer to Skukuza — or on to Monwana in Thornybush for a second chapter
Note: Kingston sleeps two adults and two children aged 10–15; Chalkley suits a couple. Treehouse nights are booked as an add-on.`;

const LEKKERWATER_PLAN = `## Day 1 · The road to De Hoop
Morning: Leave Cape Town after breakfast; about three hours east, the last stretch on gravel
Afternoon: Arrive at Lekkerwater, lunch on the deck and a first walk on six kilometres of empty beach
Evening: Supper at the long table, then the wood-fired hot tub on the sand

## Day 2 · Whales and rock pools
Morning: Whales from the deck with coffee — in August to October there can be hundreds in the bay
Afternoon: A guided rock-pool walk at low tide for everyone six and up
Evening: Sundowners on the dunes

## Day 3 · Fynbos and vultures
Morning: A guided fynbos walk; bontebok, eland and Cape mountain zebra on the plains
Afternoon: The Cape vulture colony at Potberg, or a beach picnic and swim for the young ones
Evening: Fire deck and a family supper
Note: Klipdrift Cave, nearby, has 64,000 years of human history — ask the guide

## Day 4 · One more morning on the beach
Morning: A last walk and whale count after breakfast
Afternoon: Drive back to Cape Town, or fly on to the Wild Coast for GweGwe`;

const SAMPLE_ITINERARIES: Itinerary[] = [
  {
    slug: "lekkerwater-whale-season-four-days",
    house: "lekkerwater-de-hoop",
    title: "Whale Season: Four Days at Lekkerwater",
    days: 4,
    nights: 3,
    dek: "Southern right whales in the bay, rock pools at low tide and one long table — three nights on an empty beach in De Hoop.",
    bestFor: "Active families with children 6+, up to 16 with the whole lodge [confirm]",
    season: "Whales Jul–Nov, peak Aug–Oct · fynbos Apr–May & Sep–Oct",
    arrive: "Cape Town (CPT) · about 3 hours by road",
    depart: "Cape Town, or on to GweGwe on the Wild Coast",
    ...parsePlan(LEKKERWATER_PLAN),
    included: ["Three nights at Lekkerwater [confirm board basis]", "Guided marine, rock-pool and fynbos walks [confirm]", "Whale watching from the shore", "The plan and the drive arranged by James Wild & Co"],
    excluded: ["Car hire or transfers from Cape Town [confirm]", "Conservation fees [confirm]", "Flights"],
    priceNote: "R7,700–R13,500 a night (published range) [confirm basis]",
    hero: "gatherings/lekkerwater-de-hoop/southern-right-whale-calf-de-hoop",
    draft: true,
    seoTitle: "Lekkerwater Whale Season: 4-Day Family Itinerary, De Hoop | Wild & Co Gatherings",
    metaDescription: "A 4-day family trip to Lekkerwater in De Hoop: southern right whales from the deck Aug–Oct, rock-pool walks for children 6+, fynbos and Cape vultures. Planned by James Wild.",
  },
  {
    slug: "lion-sands-night-under-the-stars-four-days",
    house: "fish-eagle-villa-lion-sands",
    title: "A Night Under the Stars: Four Days at Lion Sands",
    days: 4,
    nights: 3,
    dek: "Three nights in a private villa on the Sabie River — and one of them in a treehouse, with lanterns, a picnic supper and the whole southern sky.",
    bestFor: "A family of up to eight with children aged 10+ for the treehouse night",
    season: "Year-round · dry season May–Oct is best for game viewing",
    arrive: "Skukuza Airport (SZK) · 5–20 min transfer",
    depart: "Skukuza, or on to Monwana in Thornybush",
    ...parsePlan(LION_SANDS_PLAN),
    included: [
      "Three nights at Fish Eagle Villa, exclusive use, fully inclusive",
      "Two private game drives a day with your field guide and tracker",
      "Mack & Madi kids' activities and childminding",
      "Skukuza Airport transfers",
      "The treehouse night arranged by James Wild & Co",
    ],
    excluded: ["The treehouse sleep-out itself (an add-on to the villa rate) [confirm price]", "Flights to Skukuza", "Park fees, conservation contribution and Impact Levy", "Premium drinks and helicopter flights"],
    priceNote: "From $14,900 a night for the villa · treehouse priced on request",
    hero: "gatherings/lion-sands-treehouses/lion-sands-treehouse-night",
    draft: true,
    seoTitle: "Lion Sands Treehouse Safari: 4-Day Family Itinerary, Sabi Sand | Wild & Co Gatherings",
    metaDescription: "A 4-day, 3-night family safari at Lion Sands: a private villa on the Sabie River, game drives with your own guide, and a treehouse night under the stars. Planned by James Wild.",
  },
  {
    slug: "como-shambhala-four-days-ubud-ayung",
    house: "como-shambhala-estate",
    title: "Ubud & the Ayung in Four Days",
    days: 4,
    nights: 3,
    dek: "Four days, three nights, one Residence: the river, the rice terraces, the temples and a long table every evening — sized to fit the Worth Another Night offer.",
    bestFor: "Three generations on a first trip to Bali, from teenagers to grandparents",
    season: "Year-round · best in the dry season, Apr–Oct",
    arrive: "Denpasar (DPS) · about 90 min by car",
    depart: "Denpasar (DPS), or on to the coast at Canggu",
    ...parsePlan(COMO_PLAN),
    included: [
      "Three nights in a Residence (the third free with Worth Another Night, when valid)",
      "COMO Shambhala inclusive plan: meals, a daily treatment or class, yoga",
      "Your personal assistant at the Residence",
      "Day-by-day planning by James Wild & Co",
    ],
    excluded: ["International flights", "Airport transfers [confirm]", "Rafting, the temple tour and the canang sari class [confirm]", "Government tax and service charge"],
    priceNote: "Quoted per family — ask James",
    offer: "como-shambhala-worth-another-night",
    draft: true,
    seoTitle: "Bali Family Itinerary: 4 Days at COMO Shambhala Estate, Ubud | Wild & Co Gatherings",
    metaDescription: "A 4-day, 3-night multigenerational Bali itinerary from COMO Shambhala Estate above Ubud: Ayung River rafting, rice-terrace walks, a canang sari class and temples — planned by James Wild.",
  },
];

// ── Airtable ────────────────────────────────────────────────────────────────
type Rec = { id: string; fields: Record<string, any> };
async function list(table: string): Promise<Rec[]> {
  const out: Rec[] = [];
  let offset = "";
  do {
    const res = await fetch(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}?pageSize=100${offset ? `&offset=${offset}` : ""}`, { headers: { Authorization: `Bearer ${TOKEN}` }, next: { revalidate: 3600, tags: ["airtable"] } });
    if (!res.ok) throw new Error(`Airtable ${table}: ${res.status}`);
    const j = await res.json();
    out.push(...j.records);
    offset = j.offset || "";
  } while (offset);
  return out;
}
const first = (v: any) => (Array.isArray(v) ? v[0] : v) || "";

async function offersFromAirtable(): Promise<Offer[]> {
  return (await list("Offers")).filter((r) => r.fields["Slug"] && r.fields["Residence slug"]).map((r) => {
    const f = r.fields;
    return {
      slug: f["Slug"], house: first(f["Residence slug"]), name: f["Offer"] || "", kind: f["Kind"] || "",
      stayNights: Number(f["Stay nights"] || 3), payNights: Number(f["Pay nights"] || 2),
      headline: f["Headline"] || `Stay ${f["Stay nights"] || 3} nights. Pay for ${f["Pay nights"] || 2}.`, line: f["Line"],
      included: lines(f["Included"]), excluded: lines(f["Not included"]),
      validFrom: f["Valid from"], validTo: f["Valid to"], bookBy: f["Book by"], blackout: f["Blackout dates"],
      terms: lines(f["Terms"]), status: f["Status"] || "Draft preview", confirmed: !!f["Confirmed with partner"],
    } as Offer;
  });
}
async function itinerariesFromAirtable(): Promise<Itinerary[]> {
  return (await list("Itineraries")).filter((r) => r.fields["Slug"] && r.fields["Residence slug"] && r.fields["Status"] !== "Hidden").map((r) => {
    const f = r.fields;
    return {
      slug: f["Slug"], house: first(f["Residence slug"]), title: f["Itinerary"] || "", days: Number(f["Days"] || 4), nights: Number(f["Nights"] || 3),
      dek: f["Dek"] || "", bestFor: f["Best for"], season: f["Season"], arrive: f["Arrive"], depart: f["Depart"],
      ...parsePlan(f["Day plan"] || ""), included: lines(f["Included"]), excluded: lines(f["Not included"]),
      priceNote: f["Price note"], offer: f["Pairs with offer (slug)"] || undefined, hero: f["Hero (Cloudinary ID)"] || undefined,
      draft: f["Status"] !== "Published",
      seoTitle: f["SEO title"] || `${f["Itinerary"]} | Wild & Co Gatherings`, metaDescription: f["Meta description"] || f["Dek"] || "",
    } as Itinerary;
  });
}

async function safe<T>(fn: () => Promise<T[]>, sample: T[]): Promise<T[]> {
  if (!TOKEN) return sample;
  try { const rows = await fn(); return rows.length ? rows : sample; } catch (e) { console.error(e); return sample; }
}

const today = () => new Date().toISOString().slice(0, 10);

// Shown: Live or Draft preview, and not past "Valid to". Draft previews carry a "sample — to confirm" ribbon.
export async function getOffersForHouse(house: string): Promise<Offer[]> {
  const t = today();
  return (await safe(offersFromAirtable, SAMPLE_OFFERS)).filter((o) => o.house === house && (o.status === "Live" || o.status === "Draft preview") && (!o.validTo || o.validTo >= t));
}
export async function getOffer(slug: string) {
  return (await safe(offersFromAirtable, SAMPLE_OFFERS)).find((o) => o.slug === slug);
}
export async function getItineraries() { return safe(itinerariesFromAirtable, SAMPLE_ITINERARIES); }
export async function getItinerary(slug: string) { return (await getItineraries()).find((i) => i.slug === slug); }
export async function getItinerariesForHouse(house: string) { return (await getItineraries()).filter((i) => i.house === house); }

export const fmtDate = (d?: string) => d ? new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "";
