import type { SampleResidence } from "./sample-settings";

// ——— Natural Selection · Lekkerwater (De Hoop, Western Cape) and GweGwe Beach Lodge (Mkambati, Wild Coast) ———
// Two Gatherings VIP houses: conservation and community stays on South Africa's southern and eastern coasts.
// Facts from naturalselection.travel camp pages (Oct 2026). Rates are Natural Selection's published nightly range in rand — confirm basis.
// Images in Cloudinary under gatherings/<house>/…, tagged permission-pending until Natural Selection confirms use.
const credit = "Images courtesy of Natural Selection";
const formula = (notes: [string, boolean][]) =>
  ["Room to gather", "A day for every age", "Water within reach", "Country at the door", "A resort behind you", "Worth returning to"].map((test, i) => ({ test, note: notes[i][0], pass: notes[i][1] }));
const vip = (why: string, fit: string) => ({ collection: "Natural Selection Coast", collectionSlug: "natural-selection-coast", visit: "Approved · team met", why, fit });
const L = "gatherings/lekkerwater-de-hoop/";
const G = "gatherings/gwegwe-beach-lodge-wild-coast/";
const nsTerms = {
  bookVia: "Wild & Co Gatherings — James arranges the lodge, transfers and any second stop with Natural Selection",
  checkIn: "", checkOut: "",
  deposit: "", cancellation: "",
  minStay: "",
};
const za = { bestSeason: "", power: "230V · type M/D/N", timeZone: "UTC+2 · SAST" };

export const nsResidences: SampleResidence[] = [
  {
    slug: "lekkerwater-de-hoop", entryNo: "G-012", name: "Lekkerwater Beach Lodge, De Hoop", place: "De Hoop Nature Reserve", region: "Western Cape", country: "South Africa",
    lat: -34.43, lng: 20.72, status: "Approved", stamp: "Host met", setting: "coast",
    notes: { ...za, bestSeason: "Whales Jul–Nov (peak Aug–Oct) · fynbos in bloom Apr–May & Sep–Oct · beach days Nov–Mar" },
    line: "Seven suites on six kilometres of empty beach in De Hoop — southern right whales in the bay, rock pools at low tide, and one long table for everyone.",
    verdict: ["A 1939 family holiday house turned into a lodge for seven suites, with a whole marine reserve in front of it. In whale season you count them from breakfast."],
    bestFor: "Active families with children six and up who want whales, rock pools and long beach walks — and the whole lodge to themselves",
    notFor: "Not for toddlers, or for anyone who finds steps and steep paths hard — the lodge isn't equipped for limited mobility.",
    bedrooms: "7 suites · 6 twin/double and 1 family unit with a loft bedroom", sleeps: 16, kidsProgram: "Guided rock-pool and marine walks", kidsAges: "6 and over",
    water: "Six kilometres of beach in a Marine Protected Area; swimming pool, plunge pool and a wood-fired hot tub on the beach", seasons: ["Year-round"],
    airport: "Cape Town (CPT) · about 3 hours by road, the last stretch on gravel (SUV recommended)", officialUrl: "https://naturalselection.travel/camps/lekkerwater-de-hoop/",
    rateUnit: "per night",
    vip: vip("The ocean in front of Lekkerwater has been protected since 1985, and every stay helps clear the invasive wattle from the hills behind it. Whales, vultures and fynbos — and a family can walk all of it.", "Families with children 6+, booked whole for a reunion of up to 16."),
    formula: formula([["Seven suites and one long communal table; exclusive use possible.", true], ["Rock pools, beach walks and whales for 6+; not for toddlers.", false], ["Six kilometres of beach in the De Hoop Marine Protected Area.", true], ["De Hoop: fynbos, bontebok, eland, 260+ bird species.", true], ["A lodge team, but no resort — and no mobile signal to speak of.", false], ["Whale season makes the case for coming back.", true]]),
    fieldNotes: ["Go between August and October for the whale peak.", "Book the whole lodge for a family of up to 16.", "Rent an SUV — the last road in is gravel.", "Visit Klipdrift Cave nearby: 64,000 years of people on this coast."],
    manifest: [],
    experiences: [
      { name: "Whales from the shore", category: "Together", ages: ["All ages 6+"], seasons: ["Jul–Nov · peak Aug–Oct"], description: "Southern right whales come into the bay to calve — sometimes hundreds at once — close enough to watch from the deck.", image: { publicId: L + "southern-right-whale-calf-de-hoop", alt: "Southern right whale calf lifting its tail off De Hoop" } },
      { name: "Rock-pool and marine walks", category: "For the young ones", ages: ["6 and over"], seasons: ["Year-round, tide permitting"], description: "A guide, a low tide and the creatures of a Marine Protected Area that has been closed to fishing since 1985.", image: { publicId: L + "rock-pool-walk-lekkerwater", alt: "Guests exploring rock pools on a guided marine walk at Lekkerwater" } },
      { name: "Cape vultures at Potberg", category: "On the land", ages: ["All ages 6+"], seasons: ["Year-round"], description: "The Western Cape's only breeding colony of endangered Cape vultures is just inland.", image: { publicId: L + "cape-vulture-potberg", alt: "Endangered Cape vulture near the Potberg breeding colony, De Hoop" } },
      { name: "The beach hot tub", category: "Together", ages: ["All ages 6+"], seasons: ["Year-round"], description: "A wood-fired tub on the sand for the end of the day.", image: { publicId: L + "beach-hot-tub-lekkerwater", alt: "Wood-fired hot tub on the beach at Lekkerwater" } },
    ],
    faqs: [
      { question: "Is Lekkerwater good for families?", answer: "Yes, for active families with children aged six and over. It has seven suites including a family unit with a loft, guided rock-pool walks, whales in season and one long communal table. It isn't suitable for toddlers or for guests with limited mobility." },
      { question: "When is whale season at Lekkerwater?", answer: "Southern right whales arrive in the De Hoop bay from about June or July and stay into November, with the peak from August to October, when hundreds can be in the bay at once." },
      { question: "How do you get to Lekkerwater?", answer: "Drive about three hours from Cape Town into De Hoop Nature Reserve. The last stretch is gravel, so an SUV or high-clearance car is recommended, or Natural Selection can arrange a transfer." },
      { question: "Can a family book the whole of Lekkerwater?", answer: "The lodge has seven suites and has been booked whole before. Ask us to confirm exclusive-use terms and the maximum number of guests for your dates." },
    ],
    images: [
      { publicId: L + "lekkerwater-lodge-beach-de-hoop", alt: "Lekkerwater Beach Lodge above six kilometres of empty beach in De Hoop Nature Reserve, Western Cape", caption: "Six kilometres of beach, one lodge", role: "Hero" },
      { publicId: L + "whale-watching-lekkerwater", alt: "Whale watching from the shore at Lekkerwater, De Hoop Marine Protected Area", caption: "Whales from the lodge", role: "Feature" },
      { publicId: L + "long-table-lekkerwater", alt: "The long communal dining table at Lekkerwater Beach Lodge", caption: "One long table for everyone", role: "Gallery strip" },
      { publicId: L + "deck-firepit-lekkerwater", alt: "Deck with firepit overlooking the ocean at Lekkerwater", caption: "The fire deck at dusk", role: "Gallery strip" },
      { publicId: L + "pool-lekkerwater", alt: "Swimming pool in front of the main lodge at Lekkerwater", caption: "The pool above the bay", role: "Gallery strip" },
      { publicId: L + "suite-ocean-view-lekkerwater", alt: "Suite bedroom at Lekkerwater looking out over the Indian Ocean", caption: "Waking to the sea", role: "Gallery strip" },
    ],
    booking: {
      plan: "", ...nsTerms,
      wholeHouse: "Possible — the lodge has been booked whole",
      children: "Ages 6 and over", rateBasis: "R7,700–R13,500 per night (Oct 2026)",
      fees: [{ label: "De Hoop conservation fees", value: "" }],
      included: ["Guided nature, marine and rock-pool walks; birding; whale watching; beach picnics and sundowners", "Family-style meals at the communal table"],
      excluded: ["Transfers from Cape Town unless arranged", ""],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Ocean suites", count: "6", bedrooms: "1 each", sleeps: "2 each", inside: "Twin or double, en-suite open-plan bathroom, private deck over the beach", fit: "One for each couple." },
      { name: "Family unit", count: "1", bedrooms: "2 (with loft)", sleeps: "4", inside: "Second loft bedroom; shared open-plan vanity and shower", fit: "Parents below, children in the loft." },
      { name: "The whole lodge", count: "7 suites", bedrooms: "8", sleeps: "Up to 16", inside: "Lounge, long table, pool, plunge pool, beach hot tub", fit: "A whale-season reunion.", whole: true },
    ],
    partner: { name: "Natural Selection", url: "https://naturalselection.travel" },
    videos: [],
    seoTitle: "Lekkerwater Beach Lodge, De Hoop — Family Whale-Watching Lodge | Wild & Co Gatherings",
    metaDescription: "Seven suites on an empty beach in De Hoop Nature Reserve: southern right whales Aug–Oct, rock-pool walks, children 6+, whole-lodge stays. A Gatherings VIP house on James Wild's list.",
    credit,
  },
  {
    slug: "gwegwe-beach-lodge-wild-coast", entryNo: "G-013", name: "GweGwe Beach Lodge, Wild Coast", place: "Mkambati Nature Reserve", region: "Eastern Cape", country: "South Africa",
    lat: -31.3, lng: 29.97, status: "Approved", stamp: "Host met", setting: "coast",
    notes: { ...za, bestSeason: "Year-round · warm sea Nov–Mar (24–27°C) · whales pass Jun–Jul & Oct" },
    line: "Nine suites, each with its own pool, on a community-owned reserve on the Wild Coast — waterfalls onto the beach, zebra on the grassland and children of every age welcome.",
    verdict: ["The land belongs to the seven villages that won it back, and the lodge pays into their trust. It is also, by every account, the most beautiful stretch of the Wild Coast."],
    bestFor: "Three generations with young children who want a beach, a game drive and a pool of their own — far from anywhere",
    notFor: "Not for a quick trip — it is remote, and the last leg is a light aircraft, helicopter or a long drive.",
    bedrooms: "9 suites · 7 deluxe and 2 family suites, each with a private pool", sleeps: 22, kidsProgram: "Babysitting on request (extra cost)", kidsAges: "all ages",
    water: "Wild Coast beaches, rock pools, a waterfall onto the sand, river canoeing; a private pool on every suite deck", seasons: ["Year-round"],
    airport: "Fly in by light aircraft or helicopter, or self-drive between Port Edward and Port St Johns", officialUrl: "https://naturalselection.travel/camps/gwegwe-beach-lodge-wild-coast/",
    rateUnit: "per night",
    vip: vip("Mkambati is owned by the community that was removed from it a century ago. One percent of the lodge's turnover and the park fees go to conservation and the villages, and an all-women ranger team patrols the reserve.", "Three generations, babies included — book all nine suites for the whole family."),
    formula: formula([["Nine suites, two of them family suites; a lodge for up to 22.", true], ["Children of every age; babysitters on request.", true], ["Beaches, rock pools, a river and a waterfall onto the sand.", true], ["Plains game with no dangerous animals — safe for small walkers.", true], ["Spa, gym, activity centre and a MICHELIN-listed kitchen.", true], ["A coast most people never see — that's the reason to return.", true]]),
    fieldNotes: ["Book all nine suites for a family gathering.", "Swim and snorkel the rock pools at low tide.", "Take the boat or canoe up the river to the waterfall.", "Visit the Msikaba cliffs for the Cape vulture colony."],
    manifest: [],
    experiences: [
      { name: "A waterfall onto the beach", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "Walk or boat to where the river falls straight onto the sand, and swim below it.", image: { publicId: G + "beach-waterfall-mkambati", alt: "Waterfall falling onto the beach in Mkambati Nature Reserve" } },
      { name: "Game drives with no dangerous game", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Zebra, eland, red hartebeest and kudu on open grassland — a first safari for the smallest walkers.", image: { publicId: G + "zebra-eland-mkambati", alt: "Zebra and eland grazing on the Mkambati grasslands" } },
      { name: "The vulture cliffs", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "One of the largest remaining Cape vulture colonies in the Eastern Cape, on the Msikaba River gorge.", image: { publicId: G + "cape-vultures-msikaba", alt: "Cape vultures at the Msikaba River cliff colony, Mkambati" } },
      { name: "Beach fire and sundowners", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "The whole family round one fire on the sand.", image: { publicId: G + "beach-firepit-gwegwe", alt: "Beach firepit at GweGwe Beach Lodge on the Wild Coast" } },
    ],
    faqs: [
      { question: "Is GweGwe Beach Lodge good for families with young children?", answer: "Yes. Children of every age are welcome, babysitters can be booked, two of the nine suites are family suites and every suite has a private pool. Game drives on Mkambati involve no dangerous animals, which suits small children." },
      { question: "Where is GweGwe Beach Lodge?", answer: "On a 5,000-hectare private concession in Mkambati Nature Reserve on South Africa's Wild Coast, Eastern Cape, between Port Edward and Port St Johns. Guests arrive by light aircraft, helicopter, boat or self-drive." },
      { question: "Who owns Mkambati Nature Reserve?", answer: "The Mkambati Land Trust, formed by seven villages whose land claim succeeded. Park fees and one percent of the lodge's turnover fund conservation and community projects." },
      { question: "Can we see whales at GweGwe?", answer: "Whales pass the shore in June, July and October, and dolphins are often seen year-round. The Pondoland Marine Protected Area runs alongside the reserve." },
    ],
    images: [
      { publicId: G + "gwegwe-aerial-mkambati", alt: "Aerial view of GweGwe Beach Lodge on the Wild Coast in Mkambati Nature Reserve, Eastern Cape", caption: "GweGwe from the air", role: "Hero" },
      { publicId: G + "mkambati-coastline-wild-coast", alt: "The Mkambati coastline on South Africa's Wild Coast", caption: "The Mkambati coast", role: "Feature" },
      { publicId: G + "suite-pool-gwegwe", alt: "Suite plunge pool with ocean views at GweGwe Beach Lodge", caption: "Every suite has its own pool", role: "Gallery strip" },
      { publicId: G + "suite-deck-gwegwe", alt: "Private suite deck at GweGwe Beach Lodge, Wild Coast", caption: "A suite deck of your own", role: "Gallery strip" },
      { publicId: G + "dining-room-gwegwe", alt: "Dining room at GweGwe Beach Lodge", caption: "The dining room", role: "Gallery strip" },
      { publicId: G + "gwegwe-team-welcome", alt: "The GweGwe Beach Lodge team welcoming guests", caption: "A warm GweGwe welcome", role: "Gallery strip" },
    ],
    booking: {
      plan: "", ...nsTerms,
      wholeHouse: "Nine suites — book them all for the family",
      children: "All ages; babysitters on request at extra cost", rateBasis: "R12,950–R14,500 per night (Oct 2026)",
      fees: [{ label: "Park fees", value: " — fund the Mkambati Conservation and Community NPC" }],
      included: ["Game drives, guided walks, birding and shore-based whale watching", "Swimming, snorkelling, cycling and boating"],
      excluded: ["Spa and wellness treatments", "Babysitting", "Catch-and-release fishing", "Flights, helicopter and transfers"],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Deluxe suites", count: "7", bedrooms: "1 each", sleeps: "2 each", inside: "Twin or double; fireplace, bath, indoor and outdoor showers, private deck and pool", fit: "A suite for each couple." },
      { name: "Family suites", count: "2", bedrooms: "2 each", sleeps: "4 each", inside: "Room for parents and children together, with the same deck and pool", fit: "The young families' wing." },
      { name: "The whole lodge", count: "9 suites", bedrooms: "11", sleeps: "Up to 22", inside: "Spa, gym, activity centre, hot tubs, open kitchen, beach firepit", fit: "Three generations on one beach.", whole: true },
    ],
    partner: { name: "Natural Selection", url: "https://naturalselection.travel" },
    videos: [],
    seoTitle: "GweGwe Beach Lodge, Wild Coast — Family Beach Lodge with Private Pools | Wild & Co Gatherings",
    metaDescription: "Nine pool suites on a community-owned reserve on South Africa's Wild Coast: children of all ages, safe game drives, waterfalls onto the beach. A Gatherings VIP house on James Wild's list.",
    credit,
  },
];
