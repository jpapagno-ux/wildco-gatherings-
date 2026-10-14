import { scrub } from "./scrub";
// Offers ("Time Rewarded" — verified offers only) and family journey templates.
// Both live in Airtable (tables "Offers" and "Itineraries", linked to Residences) and fall back to
// the samples below until AIRTABLE_TOKEN is set. Add a row in Airtable — no code needed.

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID || "appnpcCxUZcapAgbo";

export type OfferStatus = "Draft preview" | "Live" | "Paused" | "Expired";
export type Offer = {
  slug: string;
  house: string; // residence slug
  name: string; // "Time Rewarded — Stay 3, Pay 2"
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
export type ItineraryStop = { house: string; nights: number; label: string; or?: string[] };
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
  // Multi-stay journeys: each chapter's house, nights and any alternative houses for that chapter.
  // Airtable "Stops": one per line, "house-slug | nights | label | alt-slug, alt-slug".
  stops?: ItineraryStop[];
  draft: boolean;
  seoTitle: string;
  metaDescription: string;
};

// "house-slug | nights | label | alt-slug, alt-slug" — one per line
export function parseStops(v?: string): ItineraryStop[] | undefined {
  const out = (v || "").split("\n").map((l) => l.split("|").map((s) => s.trim())).filter((p) => p[0])
    .map(([house, nights, label, or]) => ({ house, nights: Number(nights || 0), label: label || "", or: or ? or.split(",").map((s) => s.trim()).filter(Boolean) : undefined }));
  return out.length ? out : undefined;
}

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
    name: "Time Rewarded — Stay 3, Pay 2",
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
    excluded: ["Flights and airport transfers", "Drinks beyond the wellness plan", "Rafting, cultural tours and extra treatments", "Babysitting", "Government tax and service charge"],
    validFrom: "2027-01-11",
    validTo: "2027-03-31",
    bookBy: "2026-12-15",
    blackout: "Chinese New Year week",
    terms: [
      "Minimum 3 consecutive nights; the third night is free",
      "Whole Residence or private villa bookings, subject to availability",
      "New bookings made through Wild & Co Gatherings; not combinable with other offers",
      "Dates and terms to be confirmed with COMO",
    ],
    status: "Live",
    confirmed: true,
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
Note: Rafting, the temple tour and the canang sari class are booked as extras`;


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

const CAPE_SAFARI_PLAN = `## Day 1 · Into the Winelands
Morning: Land in Cape Town; about an hour's drive to Franschhoek
Afternoon: Settle into the cottages and houses at Leeu Estates; a first walk through the gardens and vines
Evening: The whole family at The Dining Room, cooking from the estate's own gardens

## Day 2 · The estate
Morning: Breakfast, then the Everard Read gallery and the edible gardens
Afternoon: The included tasting at the Wine Studio for the grown-ups; the pool for everyone else
Evening: The shuttle into Franschhoek village for dinner

## Day 3 · Cape Town
Morning: Table Mountain by cableway, early, before the cloud
Afternoon: The penguins at Boulders Beach and the drive along the peninsula to Cape Point, with a private guide
Evening: Back to the vines; supper on the terrace

## Day 4 · A slow day
Morning: Leeu Spa for whoever wants it; lawn games for whoever doesn't
Afternoon: Lunch in the village, or a picnic among the vines
Evening: La Petite Colombe for the grown-ups

## Day 5 · North to Madikwe
Morning: Fly Cape Town to Johannesburg, about two hours
Afternoon: The light-aircraft shuttle to Madikwe, about an hour; tea at the house, then the first game drive
Evening: Supper in the boma — and no malaria tablets on this trip

## Day 6 · The Big Five
Morning: Early drive with your own guide and tracker — rhino, elephant, lion
Afternoon: The pool; a children's bush walk for the under-16s
Evening: Sundowner drive and stars

## Day 7 · Wild dogs and the river
Morning: Out early for Madikwe's wild dogs and cheetah
Afternoon: Fishing on the Marico River, a cooking class or drumming lessons
Evening: A hide sleep-out for the bold; dinner at the house for everyone else

## Day 8 · Last full day
Morning: The drive the youngest gets to plan
Afternoon: Wellness treatments in the sala, or a last swim
Evening: A farewell supper around the fire

## Day 9 · Home
Morning: A final early drive, then breakfast
Afternoon: Fly to Johannesburg for connections home`;

const ARDORE_PLAN = `## Day 1 · Into Chianti
Morning: Land in Florence; your driver brings everyone to the villa, about forty minutes
Afternoon: Settle into the suites; first swim in the infinity pool over the vines
Evening: Welcome aperitivo on the loggia, then the chef's first dinner

## Day 2 · The villa
Morning: Breakfast, then the garden and the forest paths
Afternoon: A pottery class in the garden for anyone who wants clay on their hands
Evening: Pizza masterclass at the pizza oven — every generation cooks

## Day 3 · Florence
Morning: A private guide in Florence: the Duomo and the Ponte Vecchio, timed before the crowds
Afternoon: Lunch in the Oltrarno, then the artisans' workshops
Evening: Back to the villa for the fire pits and a quiet supper

## Day 4 · Chianti wine and hill towns
Morning: A tasting with a small Chianti Classico maker
Afternoon: San Gimignano's towers and gelato, a short drive away
Evening: The chef's dinner at the long table

## Day 5 · A slow day
Morning: Foraging in the forest with a local expert
Afternoon: The spa — whirlpool, steam and sauna — and a vineyard-view massage
Evening: Supper by the pool as the light goes over the hills

## Day 6 · Siena
Morning: Siena's Piazza del Campo and the cathedral with a guide
Afternoon: Lunch in the city, then home for a last swim
Evening: The celebration dinner — the reason for the reunion

## Day 7 · Arrivederci
Morning: Breakfast together, then the drive back to Florence`;

const ULUM_PLAN = `## Day 1 · Into red-rock country
Afternoon: Arrive at ULUM, twenty-five minutes south of Moab; settle into the suite tents
Evening: The hot and cool dipping pools, sunset live music, then s'mores at the fire

## Day 2 · Arches
Morning: Delicate Arch at sunrise for the walkers; the Windows and Turret Arch for the youngest
Afternoon: Back to camp: the massage cave for some, the pools for everyone else
Evening: Dinner on the terrace, then the stars — ULUM is Dark Sky-approved

## Day 3 · The river and the rock
Morning: Rafting a family-friendly stretch of the Colorado River with a licensed outfitter
Afternoon: Climbing and rappelling on Looking Glass Rock, right at camp
Evening: A long table for everyone on the terrace

## Day 4 · Two adventures
Morning: The White Rim crew leaves early with their guide in a high-clearance 4x4, down the Shafer Trail into Canyonlands
Afternoon: Everyone else takes a UTV out on Moab's open trails, or a slow day of yoga, painting and the pools
Evening: Supper at a White Rim campsite for the crew; dinner at camp for the rest
Note: The White Rim needs an overnight permit — we book it months ahead.

## Day 5 · The long way home
Morning: Sunrise on the White Rim, then the second half of the loop
Afternoon: Back at camp for a swim; Dead Horse Point for anyone who wants another view
Evening: The White Rim crew comes home to a hero's welcome at the fire

## Day 6 · Farewell to the red rock
Morning: Breakfast together, then on to the airport`;

const SAMPLE_ITINERARIES: Itinerary[] = [
  {
    slug: "ulum-moab-red-rock-family-adventure-six-days",
    house: "ulum-moab",
    title: "Red Rock Family Adventure: Six Days at ULUM Moab and a Night on the White Rim",
    days: 6,
    nights: 5,
    dek: "Arches at sunrise, the Colorado River by raft, climbing on Looking Glass Rock — and, for the ones who want a real adventure, one night out on Canyonlands' White Rim Road in a 4x4.",
    bestFor: "Active families and three generations — teens and adults for the White Rim, every age for the rest",
    season: "Late March to late October · spring and autumn are best",
    arrive: "Canyonlands Regional (CNY), Grand Junction (GJT) or Salt Lake City (SLC)",
    depart: "The same airport",
    ...parsePlan(ULUM_PLAN),
    included: ["Five nights in ULUM suite tents, one per branch of the family", "Guided White Rim overnight in a high-clearance 4x4, with permit and camp meals", "Half-day Colorado River rafting with a licensed outfitter", "Climbing and rappelling on Looking Glass Rock", "The plan and bookings by James Wild & Co"],
    excluded: ["Flights and car hire", "Meals at camp", "Massage cave treatments", "UTV rental", "National park entry"],
    priceNote: "On request — priced for your family",
    hero: "gatherings/ulum-moab/ulum-moab-tent-08",
    draft: false,
    seoTitle: "Moab Family Adventure: 6 Days at ULUM with a White Rim Night | Wild & Co Gatherings",
    metaDescription: "A 6-day Moab family adventure from ULUM: Arches at sunrise, Colorado River rafting, climbing Looking Glass Rock, UTV trails, the massage cave — and a one-night White Rim 4x4 trip in Canyonlands. Planned by James Wild.",
  },
  {
    slug: "villa-ardore-tuscan-reunion-seven-days",
    house: "villa-ardore-tuscany",
    title: "A Tuscan Reunion: Seven Days at Villa Ardore",
    days: 7,
    nights: 6,
    dek: "Six nights in a 16th-century stone farmhouse in Chianti Classico, with a private chef, an infinity pool over the vines, and Florence, Siena and San Gimignano within reach.",
    bestFor: "Three generations, up to 16 plus 2, celebrating a birthday, an anniversary or simply being together",
    season: "May–Jun and Sep–Oct are best; harvest in late September",
    arrive: "Florence · private transfer, about 40 minutes",
    depart: "Florence",
    ...parsePlan(ARDORE_PLAN),
    included: ["Six nights at Villa Ardore, the whole villa", "Daily breakfast and a private chef for lunch or dinner", "Villa manager, concierge and daily housekeeping", "Private transfers from and to Florence", "The plan, guides and tastings arranged by James Wild & Co"],
    excluded: ["Flights", "Guides and tastings (quoted with your plan)", "Massages and treatments"],
    priceNote: "On request — the whole villa, for your family",
    hero: "gatherings/villa-ardore-tuscany/villa-ardore-infinity-pool",
    draft: false,
    seoTitle: "Tuscan Family Reunion: 7-Day Villa Ardore Itinerary, Chianti | Wild & Co Gatherings",
    metaDescription: "A 7-day family reunion in Chianti at Villa Ardore: a private chef, pizza masterclass, wine tastings, the spa and infinity pool, with days in Florence, Siena and San Gimignano. Planned by James Wild.",
  },
  {
    slug: "cape-winelands-malaria-free-safari-nine-days",
    house: "morukuru-farm-house-madikwe",
    title: "The Cape & a Malaria-Free Safari: Nine Days for Three Generations",
    days: 9,
    nights: 8,
    dek: "Four nights among the vines at Leeu Estates in Franschhoek, with a day in Cape Town — then four nights in a private safari house in Madikwe, where the Big Five come without malaria tablets.",
    bestFor: "Grandparents, parents and children of any age — up to ten in one safari house, or twenty-two across Jaci's three villas",
    season: "Year-round · May–Sep for the clearest game viewing · Nov–Mar for Cape summer",
    arrive: "Cape Town (CPT) · about an hour to Franschhoek",
    depart: "Johannesburg (JNB), by light aircraft from Madikwe",
    ...parsePlan(CAPE_SAFARI_PLAN),
    stops: [
      { house: "leeu-estates-franschhoek", nights: 4, label: "The Winelands & Cape Town" },
      { house: "morukuru-farm-house-madikwe", nights: 4, label: "A malaria-free safari in Madikwe", or: ["jacis-madikwe-house", "morukuru-river-house-madikwe"] },
    ],
    included: ["Four nights at Leeu Estates in family cottages or houses, with breakfast", "One tutored tasting at the Wine Studio", "A day in Cape Town with a private guide", "Four nights in a private safari house in Madikwe, all-inclusive with your own guide and vehicle", "The plan, the flights and the transfers arranged by James Wild & Co"],
    excluded: ["International flights", "Dinners in the Winelands", "Reserve conservation levy", "Spa treatments"],
    priceNote: "On request — priced for your family and dates",
    hero: "gatherings/morukuru-madikwe-wildlife/white-rhino-game-drive-madikwe",
    draft: false,
    seoTitle: "Cape Winelands & Malaria-Free Safari: 9-Day Family Trip | Wild & Co Gatherings",
    metaDescription: "A 9-day South Africa itinerary for three generations: four nights at Leeu Estates in Franschhoek with a day in Cape Town, then four nights in a private malaria-free safari house in Madikwe. Planned by James Wild.",
  },
  {
    slug: "lekkerwater-whale-season-four-days",
    house: "lekkerwater-de-hoop",
    title: "Whale Season: Four Days at Lekkerwater",
    days: 4,
    nights: 3,
    dek: "Southern right whales in the bay, rock pools at low tide and one long table — three nights on an empty beach in De Hoop.",
    bestFor: "Active families with children 6+, up to 16 with the whole lodge",
    season: "Whales Jul–Nov, peak Aug–Oct · fynbos Apr–May & Sep–Oct",
    arrive: "Cape Town (CPT) · about 3 hours by road",
    depart: "Cape Town, or on to GweGwe on the Wild Coast",
    ...parsePlan(LEKKERWATER_PLAN),
    included: ["Three nights at Lekkerwater", "Guided marine, rock-pool and fynbos walks", "Whale watching from the shore", "The plan and the drive arranged by James Wild & Co"],
    excluded: ["Car hire or transfers from Cape Town", "Conservation fees", "Flights"],
    priceNote: "R7,700–R13,500 a night",
    hero: "gatherings/lekkerwater-de-hoop/southern-right-whale-calf-de-hoop",
    draft: false,
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
    excluded: ["The treehouse sleep-out itself (an add-on to the villa rate)", "Flights to Skukuza", "Park fees, conservation contribution and Impact Levy", "Premium drinks and helicopter flights"],
    priceNote: "From $14,900 a night for the villa · treehouse priced on request",
    hero: "gatherings/lion-sands-treehouses/lion-sands-treehouse-night",
    draft: false,
    seoTitle: "Lion Sands Treehouse Safari: 4-Day Family Itinerary, Sabi Sand | Wild & Co Gatherings",
    metaDescription: "A 4-day, 3-night family safari at Lion Sands: a private villa on the Sabie River, game drives with your own guide, and a treehouse night under the stars. Planned by James Wild.",
  },
  {
    slug: "como-shambhala-four-days-ubud-ayung",
    house: "como-shambhala-estate",
    title: "Ubud & the Ayung in Four Days",
    days: 4,
    nights: 3,
    dek: "Four days, three nights, one Residence: the river, the rice terraces, the temples and a long table every evening — sized to fit a Time Rewarded offer when one is live.",
    bestFor: "Three generations on a first trip to Bali, from teenagers to grandparents",
    season: "Year-round · best in the dry season, Apr–Oct",
    arrive: "Denpasar (DPS) · about 90 min by car",
    depart: "Denpasar (DPS), or on to the coast at Canggu",
    ...parsePlan(COMO_PLAN),
    included: [
      "Three nights in a Residence (the third free with a Time Rewarded offer, when one is live)",
      "COMO Shambhala inclusive plan: meals, a daily treatment or class, yoga",
      "Your personal assistant at the Residence",
      "Day-by-day planning by James Wild & Co",
    ],
    excluded: ["International flights", "Airport transfers", "Rafting, the temple tour and the canang sari class", "Government tax and service charge"],
    priceNote: "Quoted per family — ask James",
    offer: "como-shambhala-worth-another-night",
    draft: false,
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
      stops: parseStops(f["Stops"]),
      draft: f["Status"] !== "Published",
      seoTitle: f["SEO title"] || `${f["Itinerary"]} | Wild & Co Gatherings`, metaDescription: f["Meta description"] || f["Dek"] || "",
    } as Itinerary;
  });
}

async function safe<T>(fn: () => Promise<T[]>, sample: T[]): Promise<T[]> {
  if (!TOKEN) return scrub(sample);
  try { const rows = await fn(); return scrub(rows.length ? rows : sample); } catch (e) { console.error(e); return scrub(sample); }
}

const today = () => new Date().toISOString().slice(0, 10);

// "Time Rewarded" is reserved for VERIFIED offers: Live, confirmed with the partner, with eligibility terms,
// travel window, book-by date, exclusions and expiry all recorded — and not yet expired. Anything else stays hidden.
export const isVerifiedOffer = (o: Offer, t = today()) =>
  o.status === "Live" && o.confirmed && !!o.validFrom && !!o.validTo && !!o.bookBy && o.terms.length > 0 && o.excluded.length > 0 && o.validTo >= t && o.bookBy >= t;
export async function getOffersForHouse(house: string): Promise<Offer[]> {
  return (await safe(offersFromAirtable, SAMPLE_OFFERS)).filter((o) => o.house === house && isVerifiedOffer(o));
}
export async function getOffer(slug: string) {
  return (await safe(offersFromAirtable, SAMPLE_OFFERS)).find((o) => o.slug === slug);
}
export async function getItineraries() { return safe(itinerariesFromAirtable, SAMPLE_ITINERARIES); }
export async function getItinerary(slug: string) { return (await getItineraries()).find((i) => i.slug === slug); }
export async function getItinerariesForHouse(house: string) { return (await getItineraries()).filter((i) => i.house === house || i.stops?.some((s) => s.house === house || s.or?.includes(house))); }

export const fmtDate = (d?: string) => d ? new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }) : "";
