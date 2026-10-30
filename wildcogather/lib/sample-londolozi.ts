import type { SampleResidence } from "./sample-settings";
import type { Video } from "./types";

// ——— Londolozi Game Reserve, Sabi Sand — the two camps a family books whole — added 30 Oct 2026 ———
// James, 30 Oct 2026: "add Pioneer and the Granite Suites (both bookable whole) to Gatherings, as we did with Kwandwe's villas.
// Yes in detail and with videos embedded". Cross-listed with the Safaris volume, as Kwandwe.
// One permanent identity per camp: JWC-R-0011 (Pioneer) and JWC-R-0012 (Private Granite Suites) in JWC-P-0028
// (data/entities.json), with the Safaris ledger IDs WCS-ZA-SAB-15 / WCS-ZA-SAB-29 as their safaris collection references.
// Facts only from Londolozi's own pages, fact sheets (2023) and blog (2025), as briefed 30 Oct 2026. No rates on the page;
// no link to Londolozi's website. No map pin: no coordinates were supplied, so none are given.
// Evidence: James stayed at Londolozi in 2018 with his daughter and toured every room — Personally Stayed on the property,
// Personally Inspected on each camp, plus Founder Favorite (opinion). Stamp: Founder inspected & approved (as Lion Sands / Monwana).
// Lines in James's voice that are not one of the briefed facts carry "[Draft — J.W. to approve]" (scrubbed from the page).
// Gatherings VIP collection "londolozi" in lib/collections.ts is the property page, with the three reserve films.
// Photographs courtesy of Londolozi (Cloudinary, wildco/south-africa/sabi-sand/…). Films by Londolozi on Vimeo,
// shown as a click-to-load still: nothing loads from Vimeo until someone presses play.
const vip = (why: string, fit: string) => ({ collection: "Londolozi Game Reserve", collectionSlug: "londolozi", visit: "Founder stayed · 2018", why, fit });
const PC = "wildco/south-africa/sabi-sand/londolozi-pioneer-camp/londolozi-pioneer-camp-";
const GS = "wildco/south-africa/sabi-sand/londolozi-private-granite-suites/londolozi-private-granite-suites-";
export const LZ = "wildco/south-africa/sabi-sand/londolozi/londolozi-";
const credit = "Photograph courtesy of Londolozi";
const still = (publicId: string) => `https://res.cloudinary.com/jhlnq5h5/image/upload/c_fill,g_auto,w_1280,h_720,q_auto,f_auto/${publicId}`;

/** Londolozi's films on Vimeo (film by Londolozi). The reserve films appear on the property page (/vip/londolozi). */
export const londoloziFilms: Record<"pioneer" | "granite" | "reserve" | "healing" | "power", Video> = {
  pioneer: { provider: "vimeo", id: "886377284", title: "Pioneer Camp, Londolozi", credit: "film by Londolozi", thumbnail: still(PC + "suite-exterior") },
  granite: { provider: "vimeo", id: "833944552", title: "The Private Granite Suites, Londolozi", credit: "film by Londolozi", thumbnail: still(GS + "on-the-sand-river") },
  reserve: { provider: "vimeo", id: "1174655594", title: "Londolozi", credit: "film by Londolozi", thumbnail: still(LZ + "leopard-cubs-in-tree") },
  healing: { provider: "vimeo", id: "275771882", title: "The Healing House", credit: "film by Londolozi", thumbnail: still(LZ + "healing-house-river") },
  power: { provider: "vimeo", id: "360993293", hash: "2443efdd0a", title: "The power of your safari", credit: "film by Londolozi", thumbnail: still(LZ + "children-tracking") },
};

const airport = "Londolozi's own airstrip · by light aircraft";
const access = "By light aircraft to Londolozi's own airstrip.";

const leopardExp = {
  name: "Leopard country", category: "On the land", ages: ["In the family's private Land Rover"], seasons: [],
  description: "Families book a private Land Rover for their drives. Londolozi reports 75–100 leopard sightings a month, and guests usually see two or three leopards in three nights.",
  image: { publicId: LZ + "leopard-cubs-in-tree", alt: "Leopard cubs in a tree at Londolozi Game Reserve, Sabi Sand" },
};
const healingExp = {
  name: "The Healing House", category: "Together", ages: [], seasons: [],
  description: "Massage, reiki and sound therapy at the Healing House at Varty Camp, and daily yoga on a deck in a 500-year-old ebony tree.",
  image: { publicId: LZ + "healing-house-river", alt: "The Healing House above the river at Londolozi" },
};

const reserveFaqs = [
  { question: "Will we see leopard at Londolozi?", answer: "Londolozi reports 75 to 100 leopard sightings a month and says guests usually see two or three leopards in three nights. The reserve lies on the Sand River in the western Sabi Sand, unfenced to Kruger National Park." },
  { question: "Is Londolozi in a malaria area?", answer: "Londolozi is in a low-risk malaria area, in the western Sabi Sand in South Africa." },
  { question: "How do you get to Londolozi?", answer: access + " Wild & Co Gatherings arranges the flights with the stay." },
];

const formula = (room: string, everyAge: [string, boolean], water: string, resort: string) => [
  { test: "Room to gather", note: room, pass: true },
  { test: "A day for every age", note: everyAge[0], pass: everyAge[1] },
  { test: "Water within reach", note: water, pass: true },
  { test: "Country at the door", note: "On the Sand River in the western Sabi Sand, unfenced to Kruger National Park; Londolozi reports 75–100 leopard sightings a month.", pass: true },
  { test: "A resort behind you", note: resort, pass: true },
  { test: "Worth returning to", note: "James stayed at Londolozi in 2018 with his daughter and toured every room; a Founder Favorite.", pass: true },
];

export const londoloziResidences: SampleResidence[] = [
  {
    slug: "pioneer-camp-londolozi", entryNo: "G-031", name: "Pioneer Camp, Londolozi", place: "Londolozi Game Reserve", region: "Sabi Sand", country: "South Africa",
    status: "Approved", stamp: "Founder inspected & approved", firstVisited: "2018", setting: "savanna",
    vip: vip("Pioneer is the camp I'd give a family that wants the whole place to itself. [Draft — J.W. to approve]", "A family of up to 12 that wants the whole camp."),
    line: "Three suites in the original Varty homestead among 500-year-old ebony trees — book all three and it is a private bush homestead for up to 12, with a lap pool, a boma and the only interactive kitchen at Londolozi.",
    verdict: [
      "I stayed at Londolozi in 2018 with my daughter and toured every room. Pioneer is the camp I'd give a family that wants the whole place to itself. [Draft — J.W. to approve]",
    ],
    bestFor: "A family of up to 12 — six adults and six children aged six and over — who want a private bush homestead on the Sand River",
    notFor: "Not for children under six, or for more than 12 guests.",
    bedrooms: "3 suites of 138 m² (one stands alone; two are linked)", sleeps: 12,
    kidsProgram: "Londolozi's Cubs Den children's programme, with a full-time facilitator; families book a private Land Rover", kidsAges: "6 and over",
    water: "A full-length lap pool with a sunken seat; a plunge pool and a river view in every suite", seasons: [],
    airport,
    formula: formula(
      "Three suites of 138 m² in the original Varty homestead — one stands alone, two are linked with lockable doors between them — with an explorer lounge, bar, boma, lookout deck and breakfast balcony. Booked whole for up to 12.",
      ["Children from six; the Cubs Den programme with a full-time facilitator; a lounge that turns into a private children's cinema; guests can cook with the chefs.", true],
      "A full-length lap pool with a sunken seat, and a plunge pool in every suite.",
      "Londolozi's Healing House at Varty Camp, daily yoga in a 500-year-old ebony tree, and the reserve's own airstrip.",
    ),
    fieldNotes: [
      "Pioneer has the only interactive kitchen at Londolozi: guests can cook with the chefs.",
      "The lounge turns into a private children's cinema.",
      "One suite stands alone; the other two are linked by lockable doors.",
      "Massage, reiki and sound therapy at the Healing House at Varty Camp; daily yoga on a deck in a 500-year-old ebony tree.",
    ],
    manifest: [],
    experiences: [
      leopardExp,
      { name: "Cubs Den", category: "For the young ones", ages: ["Children 6 and over"], seasons: [], description: "Londolozi's children's programme, with a full-time facilitator.", image: { publicId: LZ + "cubs-den", alt: "The Cubs Den children's programme at Londolozi" } },
      { name: "Cook with the chefs", category: "Together", ages: [], seasons: [], description: "Pioneer has the only interactive kitchen at Londolozi, where guests can cook with the chefs.", image: { publicId: PC + "interactive-kitchen", alt: "The interactive kitchen at Pioneer Camp, Londolozi" } },
      { name: "Cinema night", category: "For the young ones", ages: ["Children 6 and over"], seasons: [], description: "The lounge turns into a private children's cinema." },
      healingExp,
    ],
    faqs: [
      { question: "Is Pioneer Camp good for a multigenerational safari?", answer: "Yes, booked whole. Book all three suites and Pioneer becomes a private bush homestead for up to 12 — six adults and six children — with its own lap pool, explorer lounge, bar, boma and the only interactive kitchen at Londolozi. Children are welcome from six, and families book a private Land Rover." },
      { question: "What is the Cubs Den at Londolozi?", answer: "Londolozi's children's programme, run by a full-time facilitator. Children are welcome from six at Varty, Founders and Pioneer camps." },
      ...reserveFaqs,
    ],
    images: [
      { publicId: PC + "suite-exterior", alt: "A suite at Pioneer Camp, Londolozi, in the original Varty homestead among ebony trees", caption: "A Pioneer suite", role: "Hero", width: 3000, height: 1999 },
      { publicId: PC + "main-deck", alt: "The main deck at Pioneer Camp, Londolozi", caption: "The main deck", role: "Card" },
      { publicId: PC + "pool", alt: "The full-length lap pool at Pioneer Camp, Londolozi", caption: "The lap pool", role: "Feature" },
      { publicId: PC + "interactive-kitchen", alt: "The interactive kitchen at Pioneer Camp, Londolozi", caption: "The interactive kitchen", role: "Gallery strip" },
      { publicId: PC + "bar", alt: "The bar at Pioneer Camp, Londolozi", caption: "The bar", role: "Gallery strip" },
      { publicId: PC + "main-deck-lounge", alt: "The lounge on the main deck at Pioneer Camp, Londolozi", caption: "The deck lounge", role: "Gallery strip" },
      { publicId: PC + "boma", alt: "The boma at Pioneer Camp, Londolozi", caption: "The boma", role: "Gallery strip" },
      { publicId: PC + "suite-deck", alt: "A suite deck at Pioneer Camp, Londolozi", caption: "A suite deck", role: "Gallery strip" },
    ].map((i) => ({ ...i, credit })),
    booking: {
      plan: "Booked whole: all three suites for one family",
      bookVia: "Wild & Co Gatherings — James arranges the camp with Londolozi and the light-aircraft flights to its airstrip",
      wholeHouse: "Book all three suites and Pioneer is a private bush homestead for up to 12 (six adults and six children)",
      children: "Children from 6",
      rateBasis: "Quoted on request for the whole camp",
      fees: [],
      included: [
        "All three suites, each with a lounge, plunge pool and river view",
        "The camp's lap pool, explorer lounge, interactive kitchen, bar, boma, lookout deck and breakfast balcony",
      ],
      excluded: [],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Suites", count: "3", bedrooms: "1 each", inside: "138 m² in the original Varty homestead, each with a lounge, plunge pool and river view; one stands alone, two are linked with lockable doors between them", fit: "The linked pair for parents with children; the one that stands alone for the grandparents. [Draft — J.W. to approve]" },
      { name: "The whole camp", count: "1", bedrooms: "3 suites", sleeps: "12 (6 adults, 6 children)", inside: "Full-length lap pool with a sunken seat, explorer lounge, interactive kitchen, bar, boma, lookout deck and breakfast balcony; the lounge turns into a private children's cinema", fit: "A family that wants the whole place to itself. [Draft — J.W. to approve]", whole: true },
    ],
    videos: [londoloziFilms.pioneer],
    seoTitle: "Pioneer Camp, Londolozi: Private Family Safari Homestead, Sabi Sand | Wild & Co Gatherings",
    metaDescription: "Pioneer Camp at Londolozi in the Sabi Sand: three suites in the original Varty homestead, booked whole as a private bush homestead for up to 12, children from six.",
    credit,
  },
  {
    slug: "private-granite-suites-londolozi", entryNo: "G-032", name: "Private Granite Suites, Londolozi", place: "Londolozi Game Reserve", region: "Sabi Sand", country: "South Africa",
    status: "Approved", stamp: "Founder inspected & approved", firstVisited: "2018", setting: "savanna",
    vip: vip("The Granite Suites are the camp I'd give six people who want the river to themselves. [Draft — J.W. to approve]", "Six guests who want the whole camp."),
    line: "Three suites built low against granite boulders where the Sand and Manyelethi rivers meet — book all three and it is a private camp for six, with heated plunge pools, stone baths and a sunset river bar.",
    verdict: [
      "I stayed at Londolozi in 2018 with my daughter and toured every room. The Granite Suites are the camp I'd give six people who want the river to themselves. [Draft — J.W. to approve]",
    ],
    bestFor: "Six guests who book all three suites for a private camp where the Sand and Manyelethi rivers meet",
    notFor: "Not for more than six guests, or for children under 16 unless all three suites are booked.",
    bedrooms: "3 suites of 85 m² (twin beds convert to king)", sleeps: 6,
    kidsAges: "16 and over, unless all three suites are booked",
    water: "A heated plunge pool and an outdoor river-view stone bath in every suite; glass walls that slide open to the river", seasons: [],
    airport,
    formula: formula(
      "Three suites of 85 m² with a sunset river bar, a sunken cocktail lounge with a fire pit and the Galaxy Boma — booked whole for six.",
      ["No children under 16 unless all three suites are booked.", false],
      "A heated plunge pool and an outdoor river-view stone bath in every suite.",
      "Londolozi's Healing House at Varty Camp, daily yoga in a 500-year-old ebony tree, and the reserve's own airstrip.",
    ),
    fieldNotes: [
      "Galaxy Boma dinners under the Milky Way.",
      "Breeding herds of elephant cross the riverbed daily.",
      "Silver, charcoal and elephant-grey suites; glass walls slide open to the river.",
      "Massage, reiki and sound therapy at the Healing House at Varty Camp; daily yoga on a deck in a 500-year-old ebony tree.",
    ],
    manifest: [],
    experiences: [
      leopardExp,
      { name: "Elephant on the riverbed", category: "On the land", ages: [], seasons: [], description: "Breeding herds of elephant cross the riverbed daily.", image: { publicId: GS + "by-the-river", alt: "The Private Granite Suites by the river at Londolozi" } },
      { name: "The Galaxy Boma", category: "Evening", ages: [], seasons: [], description: "Dinners under the Milky Way at the Galaxy Boma. The camp also has a sunset river bar and a sunken cocktail lounge with a fire pit." },
      healingExp,
    ],
    faqs: [
      { question: "Can children stay at the Private Granite Suites?", answer: "Only when all three suites are booked. The camp takes six guests at most, and no children under 16 stay unless the group books all three suites — then it is a private camp for six." },
      { question: "Are the Private Granite Suites good for a gathering?", answer: "For six, yes. Book all three 85 m² suites and the camp is yours: a sunset river bar, a sunken cocktail lounge with a fire pit, and Galaxy Boma dinners under the Milky Way. Each suite has a heated plunge pool and an outdoor stone bath facing the river." },
      ...reserveFaqs,
    ],
    images: [
      { publicId: GS + "outdoor-river-bath", alt: "An outdoor stone bath facing the river at the Private Granite Suites, Londolozi", caption: "The river-view stone bath", role: "Hero", width: 3000, height: 1996 },
      { publicId: GS + "suite-interior", alt: "Inside a suite at the Private Granite Suites, Londolozi", caption: "Inside a suite", role: "Card" },
      { publicId: GS + "on-the-sand-river", alt: "The Private Granite Suites on the Sand River at Londolozi", caption: "On the Sand River", role: "Feature" },
      { publicId: GS + "suite", alt: "A suite built low against granite boulders at Londolozi", caption: "A Granite suite", role: "Gallery strip" },
      { publicId: GS + "camp", alt: "The Private Granite Suites camp at Londolozi", caption: "The camp", role: "Gallery strip" },
      { publicId: GS + "by-the-river", alt: "The Private Granite Suites by the river at Londolozi", caption: "By the river", role: "Gallery strip" },
    ].map((i) => ({ ...i, credit })),
    booking: {
      plan: "Booked whole: all three suites for one group of six",
      bookVia: "Wild & Co Gatherings — James arranges the camp with Londolozi and the light-aircraft flights to its airstrip",
      wholeHouse: "Book all three suites and the Private Granite Suites are a private camp for six",
      children: "No children under 16 unless all three suites are booked",
      rateBasis: "Quoted on request for the whole camp",
      fees: [],
      included: [
        "All three suites, each with a heated plunge pool and an outdoor river-view stone bath",
        "The camp's sunset river bar, sunken cocktail lounge with fire pit, and Galaxy Boma",
      ],
      excluded: [],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Suites", count: "3", bedrooms: "1 each", sleeps: "2 each", inside: "85 m², built low against granite boulders in silver, charcoal and elephant grey; glass walls slide open to the river; a heated plunge pool and an outdoor river-view stone bath; twin beds convert to king", fit: "Three couples, or parents with grown children. [Draft — J.W. to approve]" },
      { name: "The whole camp", count: "1", bedrooms: "3 suites", sleeps: "6", inside: "Sunset river bar, sunken cocktail lounge with fire pit, and Galaxy Boma dinners under the Milky Way", fit: "Six people who want the river to themselves. [Draft — J.W. to approve]", whole: true },
    ],
    videos: [londoloziFilms.granite],
    seoTitle: "Private Granite Suites, Londolozi: Exclusive-Use Safari Camp for Six | Wild & Co Gatherings",
    metaDescription: "The Private Granite Suites at Londolozi in the Sabi Sand: three river suites with heated plunge pools and stone baths, booked whole as a private camp for six.",
    credit,
  },
];
