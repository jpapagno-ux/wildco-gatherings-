import type { SampleResidence } from "./sample-settings";

// ——— Kwandwe Private Game Reserve, Eastern Cape — the three exclusive-use villas — added 30 Oct 2026 ———
// Cross-listed with the Safaris volume (James, 30 Oct 2026: "villas for gatherings … it's ok to cross sell between volumes").
// One permanent identity per villa: JWC-R-0008/9/10 in JWC-P-0027 (data/entities.json), with the Safaris ledger IDs
// WCS-ZA-ECP-06/07/08 as their safaris collection references.
// Facts from Kwandwe's fact sheet (as already used on Wild & Co Safaris), Classic Portfolio's Kwandwe page and kwandwe.com
// (families, safari activities, specialist safaris, giving back, our purpose), checked 30 Oct 2026. No rates on the page.
// Evidence: House Selected only. James vetted Kwandwe as a partner (30 Oct 2026: "Kwandwe is vetted partner") but has not yet
// stayed, so every villa carries the Vetted partner stamp. Verdicts approved by James, 30 Oct 2026.
// Gatherings VIP (James, 30 Oct 2026: yes) — collection "kwandwe" in lib/collections.ts. No visible link to the Safaris pages yet.
// Map pins: the reserve's arrival point (Heatherton Towers reception), not the villas themselves — pins are approximate.
// Photographs courtesy of Kwandwe Private Game Reserve, supplied by Classic Portfolio (same Cloudinary images as the safari site).
// Gatherings VIP: the "why" lines are the first sentence of each villa's verdict (approved by James, 30 Oct 2026).
const vip = (why: string, fit: string) => ({ collection: "Kwandwe Private Game Reserve", collectionSlug: "kwandwe", visit: "Vetted partner · not yet visited", why, fit });
const partner = { name: "Kwandwe Private Game Reserve" };
const FH = "wildco/south-africa/eastern-cape/kwandwe-fort-house/";
const MM = "wildco/south-africa/eastern-cape/kwandwe-melton-manor/";
const UH = "wildco/south-africa/eastern-cape/kwandwe-uplands-homestead/";
const KW = "wildco/south-africa/eastern-cape/kwandwe/";
const credit = "Photographs courtesy of Kwandwe Private Game Reserve";
const LAT = -33.15, LNG = 26.53;
const notes = { bestSeason: "Open all year · malaria free", power: "230V · type M/D/N", timeZone: "UTC+2 · SAST" };

const films = [
  { provider: "youtube" as const, id: "8e8EDMAzIxc", title: "Rhino Conservation at Kwandwe", credit: "Kwandwe Private Game Reserve" },
  { provider: "youtube" as const, id: "862lFG9MmVc", title: "The Expansion of Kwandwe", credit: "Kwandwe Private Game Reserve" },
];

const access =
  "Fly to Gqeberha (Port Elizabeth) or East London, then about two hours by road or about 35 minutes by helicopter or light aircraft to the reserve's own tarred airstrip; private charters can fly in directly.";

const experiences = (vehicleImg: { publicId: string; alt: string }, kidsImg: { publicId: string; alt: string }) => [
  { name: "Game drives in your own vehicle", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Morning and afternoon drives in the villa's own open 4x4 with your guide and tracker, at the family's pace — the Big Five, black and white rhino and cheetah on 30,000 hectares of the Great Fish River valley.", image: vehicleImg },
  { name: "The young rangers' day", category: "For the young ones", ages: ["Children of all ages"], seasons: ["Year-round"], description: "A welcome pack for every child, scavenger and treasure hunts, plaster casts of animal tracks, beading, face painting, sand art and African bedtime stories; childminders by prior arrangement at no extra cost.", image: kidsImg },
  { name: "Catch-and-release fishing", category: "On the water", ages: ["All ages"], seasons: ["Year-round"], description: "Bass at Galpin Dam, and yellowfish and catfish in the Great Fish River — catch and release, included in the stay.", image: { publicId: KW + "kwandwe-great-fish-river", alt: "The Great Fish River winding through the valley at Kwandwe" } },
  { name: "A rhino monitoring drive", category: "Together", ages: ["Families"], seasons: ["Year-round"], description: "Three to four hours with a member of the ecological team, tracking individual rhino for the reserve's monitoring programme. Booked ahead, at extra cost; contributions go to the Kwandwe Rhino Conservation Trust.", image: { publicId: KW + "kwandwe-rhino-mother-calf", alt: "A rhino mother and calf grazing at Kwandwe" } },
  { name: "Rhino conservation, hands on", category: "Together", ages: ["Children 6 and over"], seasons: ["May–September"], description: "With the ecological team and a vet, the group joins DNA sampling, ear-notching and collar fitting during a rhino immobilisation. For one group of up to eight, at extra cost.", image: { publicId: KW + "kwandwe-rhino-conservation", alt: "Guests helping researchers and guides with a sedated rhino at Kwandwe" } },
  { name: "Planting spekboom", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "Plant spekboom, the native thicket succulent the reserve uses to restore former farmland, on a drive or a walk — or visit the Mgcamabele Community Centre's crèche and pre-school on the reserve." },
];

const reserveFaqs = (name: string, sleeps: string) => [
  { question: `Is ${name} good for a multigenerational safari?`, answer: `Yes. It is booked by one group at a time, sleeps ${sleeps}, takes children of all ages, and comes with its own guide, vehicle, chef and host, so drives, meals and naps run on the family's clock. Kwandwe is also malaria free.` },
  { question: "Can young children go on game drives at Kwandwe?", answer: "In the villas, yes: there is no minimum age, and the family sets its own safari timetable in the villa's private vehicle. Bush walks are adapted to each guest's age and confidence. Childminders are available by prior arrangement at no extra cost, and there is a children's menu at every lodge." },
  { question: "Is Kwandwe malaria free?", answer: "Yes. Kwandwe is in the Eastern Cape, outside South Africa's malaria areas, which is why families with small children often choose it." },
  { question: "What does a stay support?", answer: "Every guest night carries Kwandwe's Community, Conservation & Reserve Levy, split between the Kwandwe Rhino Conservation Trust, the Ubunye Foundation and the care of the reserve. Kwandwe is a member of The Long Run." },
  { question: "How do you get to Kwandwe?", answer: access + " Self-drive from Gqeberha takes about two hours; Kwandwe advises the R67, not the R350." },
];

const bookingBase = (wholeHouse: string, children: string, included: string[]) => ({
  plan: "Fully inclusive: all meals and drinks, your own guide, vehicle and team, and the daily safari activities",
  bookVia: "Wild & Co Gatherings — James arranges the villa with Kwandwe and the flights or transfer from Gqeberha",
  wholeHouse,
  minStay: "We suggest four nights or more",
  children,
  rateBasis: "Per villa per night, exclusive use — quoted on request",
  fees: [{ label: "Community, Conservation & Reserve Levy", value: "Per person per night; half for children 18 and under" }],
  included,
  excluded: [
    "Specialist experiences: rhino monitoring and rhino conservation, photographic, walking and birding safaris (booked ahead)",
    "Spa and wellness treatments",
    "The Community, Conservation & Reserve Levy",
    "Flights and transfers to the reserve",
  ],
  checked: "Oct 2026",
});

const formula = (room: string, water: string) => [
  { test: "Room to gather", note: room, pass: true },
  { test: "A day for every age", note: "No minimum age in the villas; a children's programme and childminders at no extra cost; specialist rhino and walking safaris for older children.", pass: true },
  { test: "Water within reach", note: water, pass: true },
  { test: "Country at the door", note: "30,000 hectares of private Big Five reserve on the Great Fish River, where seven of South Africa's eight biomes meet.", pass: true },
  { test: "A resort behind you", note: "Fully inclusive, with the villa's own guide, vehicle, chef and host — and the reserve's two lodges, spa and conservation team close by.", pass: true },
  { test: "Worth returning to", note: "James has vetted Kwandwe as a partner; he has not stayed yet.", pass: false },
];

const seo = (name: string, sleeps: string) => ({
  seoTitle: `${name}, Kwandwe: Exclusive-Use Family Safari Villa, Eastern Cape | Wild & Co Gatherings`,
  metaDescription: `${name} at Kwandwe Private Game Reserve: a malaria-free, exclusive-use safari villa for ${sleeps} in South Africa's Eastern Cape, with its own guide, vehicle and chef, and children of all ages welcome.`,
});

export const kwandweResidences: SampleResidence[] = [
  {
    slug: "fort-house-kwandwe", entryNo: "G-028", name: "Fort House, Kwandwe", place: "Kwandwe Private Game Reserve", region: "Eastern Cape", country: "South Africa",
    lat: LAT, lng: LNG, status: "Approved", stamp: "Vetted partner", setting: "savanna", notes,
    partner, vip: vip("Two families, or three generations, under one roof on a malaria-free Big Five reserve: that is what Fort House does.", "Two families or three generations."),
    line: "Four bedrooms high above the Great Fish River valley, booked by one group at a time — its own guide, tracker, vehicle, chef and host, a heated pool and a boma facing a private waterhole.",
    verdict: [
      "Two families, or three generations, under one roof on a malaria-free Big Five reserve: that is what Fort House does. The house is yours, the vehicle is yours, and the waterhole in front of the boma does the evening entertainment.",
      "Kwandwe is a partner I've vetted. I haven't stayed yet; my own notes come after my first night.",
    ],
    bestFor: "Two families or a multi-generation group of up to eight who want a private safari house, a heated pool and their own team",
    notFor: "Not for more than eight adults (plus an infant): for a larger gathering, take two Kwandwe villas together.",
    bedrooms: "2 master suites and 2 classic suites, all en suite", sleeps: 8,
    kidsProgram: "Kwandwe's children's programme — welcome packs, tracking, crafts and bedtime stories — with childminders at no extra cost", kidsAges: "all ages · up to 8 adults and 1 infant",
    water: "A solar-heated pool (the only heated pool at Kwandwe); a private waterhole in front of the boma for watching wildlife; catch-and-release fishing on the reserve", seasons: ["Year-round"],
    airport: "Gqeberha (PLZ) · about 2 hours by road or 35 minutes by air",
    formula: formula("Two master suites and two classic suites off shared living spaces and deep verandas, a study, an interactive kitchen and a private spa room — booked whole.", "A solar-heated pool for swimming; the private waterhole is for watching wildlife."),
    fieldNotes: [
      "Ask for the boma on the first night: it faces the private waterhole.",
      "The private spa room means treatments come to the house.",
      "Book the rhino monitoring drive ahead — it runs year-round and suits the whole family.",
      "Pair with Cape Town or the Winelands: Kwandwe is a short flight from Cape Town to Gqeberha.",
    ],
    manifest: [],
    experiences: experiences(
      { publicId: FH + "kwandwe-fort-house-lions", alt: "Lions resting in the grass in front of Fort House at Kwandwe" },
      { publicId: UH + "kwandwe-uplands-homestead-kids-baking", alt: "Children decorating cupcakes at a Kwandwe villa" },
    ),
    faqs: reserveFaqs("Fort House", "up to eight guests and an infant"),
    images: [
      { publicId: FH + "kwandwe-fort-house-front-view", alt: "Fort House at Kwandwe seen from its boma, the house set on high ground above the Great Fish River valley", caption: "Fort House from the boma", role: "Hero" },
      { publicId: FH + "kwandwe-fort-house-exterior", alt: "Fort House at sunset, Kwandwe Private Game Reserve", caption: "Fort House at sunset", role: "Card" },
      { publicId: FH + "kwandwe-fort-house-outdoor-living-pool", alt: "The outdoor living space beside the pool at Fort House", caption: "The outdoor living space and pool", role: "Feature" },
      { publicId: FH + "kwandwe-fort-house-main-deck", alt: "The main deck above the pool at Fort House", caption: "The main deck", role: "Gallery strip" },
      { publicId: FH + "kwandwe-fort-house-lounge", alt: "The lounge at Fort House", caption: "The lounge", role: "Gallery strip" },
      { publicId: FH + "kwandwe-fort-house-dining-room", alt: "The dining room at Fort House laid for a family dinner", caption: "The dining room", role: "Gallery strip" },
      { publicId: FH + "kwandwe-fort-house-master-suite", alt: "One of the two master suites at Fort House", caption: "A master suite", role: "Gallery strip" },
      { publicId: FH + "kwandwe-fort-house-bedroom-views", alt: "A Fort House bedroom looking out over the valley", caption: "Valley views", role: "Gallery strip" },
      { publicId: FH + "kwandwe-fort-house-spa-room", alt: "The private spa room at Fort House", caption: "The private spa room", role: "Gallery strip" },
      { publicId: FH + "kwandwe-fort-house-veranda", alt: "Tea laid out on the veranda at Fort House", caption: "Tea on the veranda", role: "Gallery strip" },
    ],
    booking: bookingBase("Always exclusive use — Fort House is booked by one group at a time", "All ages; up to 8 adults and 1 infant (one cot)", [
      "Exclusive use of the villa with your own guide, tracker, vehicle, chef and host",
      "All meals and drinks",
      "Morning and afternoon game drives, night drives, bush walks and catch-and-release fishing",
      "Childminding by prior arrangement, Wi-Fi and laundry",
    ]),
    rooms: [
      { name: "Master suites", count: "2", bedrooms: "1 each", sleeps: "2 each", inside: "En-suite suites opening onto the living spaces and deep verandas", fit: "The grandparents, and the parents." },
      { name: "Classic suites", count: "2", bedrooms: "1 each", sleeps: "2 each", inside: "En suite; twin beds on request", fit: "The children, two by two." },
      { name: "The whole house", count: "1", bedrooms: "4", sleeps: "8 + 1 infant", inside: "Lounge, dining room, study, interactive kitchen, private spa room, solar-heated pool and boma", fit: "Two families or three generations.", whole: true },
    ],
    videos: films,
    ...seo("Fort House", "up to eight"),
    credit,
  },
  {
    slug: "melton-manor-kwandwe", entryNo: "G-029", name: "Melton Manor, Kwandwe", place: "Kwandwe Private Game Reserve", region: "Eastern Cape", country: "South Africa",
    lat: LAT, lng: LNG, status: "Approved", stamp: "Vetted partner", setting: "savanna", notes,
    partner, vip: vip("Four suites of the same size: no one draws the short straw, which is exactly what a group of friends or a family with teenagers needs.", "Friends, or a family with teenagers."),
    line: "Four equal suites in a U around a courtyard pool, booked by one group at a time — its own guide, vehicle, chef and host, a children's lounge and a boma for dinner under the stars.",
    verdict: [
      "Four suites of the same size: no one draws the short straw, which is exactly what a group of friends or a family with teenagers needs. The courtyard pool sits in the middle of it all.",
      "Kwandwe is a partner I've vetted. I haven't stayed yet; my own notes come after my first night.",
    ],
    bestFor: "A group of friends or a family with teenagers who want four equal rooms, a pool at the centre and their own safari team",
    notFor: "Not for more than eight adults (plus an infant): for a larger gathering, take two Kwandwe villas together.",
    bedrooms: "4 equal en-suite suites (about 46 m² each; two interleading)", sleeps: 8,
    kidsProgram: "A separate children's lounge, and Kwandwe's children's programme with childminders at no extra cost", kidsAges: "all ages · up to 8 adults and 1 infant",
    water: "A courtyard pool at the heart of the house; catch-and-release fishing on the reserve", seasons: ["Year-round"],
    airport: "Gqeberha (PLZ) · about 2 hours by road or 35 minutes by air",
    formula: formula("Four equal suites set in a U around the courtyard and pool, an interactive kitchen, a children's lounge and the Melton boma — booked whole.", "A courtyard pool for swimming at the centre of the house."),
    fieldNotes: [
      "Two of the four suites interleave — give them to a family with younger children.",
      "The Melton boma is for birdwatching by day and dinner at night.",
      "Melton Manor has Wi-Fi and mobile signal, useful for a family that has to stay in touch.",
      "About ten minutes by road from Great Fish River Lodge and Ecca Lodge.",
    ],
    manifest: [],
    experiences: experiences(
      { publicId: MM + "kwandwe-melton-manor-game-drive", alt: "Guests on a game drive in Melton Manor's own vehicle at Kwandwe" },
      { publicId: UH + "kwandwe-uplands-homestead-kids-baking", alt: "Children decorating cupcakes at a Kwandwe villa" },
    ),
    faqs: reserveFaqs("Melton Manor", "up to eight guests and an infant"),
    images: [
      { publicId: MM + "kwandwe-melton-manor-pool", alt: "The courtyard pool at Melton Manor, Kwandwe, framed by the suites' verandas", caption: "The courtyard pool", role: "Hero" },
      { publicId: MM + "kwandwe-melton-manor-welcome", alt: "Arriving at Melton Manor, Kwandwe Private Game Reserve", caption: "Arriving at Melton Manor", role: "Card" },
      { publicId: MM + "kwandwe-melton-manor-boma", alt: "The Melton boma at dusk, set for dinner", caption: "The Melton boma at dusk", role: "Feature" },
      { publicId: MM + "kwandwe-melton-manor-lounge", alt: "The lounge and fireplace at Melton Manor", caption: "The lounge", role: "Gallery strip" },
      { publicId: MM + "kwandwe-melton-manor-dining-table", alt: "Dinner laid at the long dining table at Melton Manor", caption: "Dinner together", role: "Gallery strip" },
      { publicId: MM + "kwandwe-melton-manor-bedroom", alt: "One of the four equal suites at Melton Manor", caption: "A suite", role: "Gallery strip" },
      { publicId: MM + "kwandwe-melton-manor-bathtub", alt: "A deep soaking bath in a Melton Manor suite", caption: "The soaking bath", role: "Gallery strip" },
      { publicId: MM + "kwandwe-melton-manor-room-views", alt: "A Melton Manor room looking out to the bush", caption: "Out to the bush", role: "Gallery strip" },
      { publicId: MM + "kwandwe-melton-manor-sundowners-boma", alt: "The sundowner drinks station at the Melton boma", caption: "Sundowners", role: "Gallery strip" },
      { publicId: MM + "kwandwe-melton-manor-landscape-sunset", alt: "Kwandwe Private Game Reserve at sunset", caption: "The reserve at sunset", role: "Gallery strip" },
    ],
    booking: bookingBase("Always exclusive use — Melton Manor is booked by one group at a time", "All ages; up to 8 adults and 1 infant (one cot)", [
      "Exclusive use of the villa with your own guide, vehicle, chef and host",
      "All meals and drinks",
      "Morning and afternoon game drives, night drives, bush walks and catch-and-release fishing",
      "Childminding by prior arrangement, Wi-Fi and laundry",
    ]),
    rooms: [
      { name: "Suites", count: "4", bedrooms: "1 each", sleeps: "2 each", inside: "Four equal double suites (about 46 m²), twins on request, each opening onto a veranda; two interleave", fit: "Everyone gets the same room — no arguments." },
      { name: "The whole house", count: "1", bedrooms: "4", sleeps: "8 + 1 infant", inside: "Courtyard pool, lounge, interactive kitchen, children's lounge and the Melton boma", fit: "Friends, or a family with teenagers.", whole: true },
    ],
    videos: films,
    ...seo("Melton Manor", "up to eight"),
    credit,
  },
  {
    slug: "uplands-homestead-kwandwe", entryNo: "G-030", name: "Uplands Homestead, Kwandwe", place: "Kwandwe Private Game Reserve", region: "Eastern Cape", country: "South Africa",
    lat: LAT, lng: LNG, status: "Approved", stamp: "Vetted partner", setting: "savanna", notes,
    partner, vip: vip("A farmhouse, not a lodge: a country kitchen at the heart of it, a garden for small children to run in, and wildlife passing the boma at dusk.", "A young family on a first safari."),
    line: "A restored 1905 farmhouse for up to six, the most remote of the Kwandwe villas, in a valley of aloes — its own guide, vehicle, chef and host, a pool, gardens and a country kitchen.",
    verdict: [
      "A farmhouse, not a lodge: a country kitchen at the heart of it, a garden for small children to run in, and wildlife passing the boma at dusk. For a young family on a first safari, that is the right scale.",
      "Kwandwe is a partner I've vetted. I haven't stayed yet; my own notes come after my first night.",
    ],
    bestFor: "A family with young children — or grandparents with one family — who want a country house on a malaria-free safari",
    notFor: "Not for more than six adults (plus an infant): Fort House or Melton Manor take eight.",
    bedrooms: "1 main suite and 2 king or twin rooms, all en suite", sleeps: 6,
    kidsProgram: "Kwandwe's children's programme — cupcake decorating, tracking, crafts and bedtime stories — with childminders at no extra cost", kidsAges: "all ages · up to 6 adults and 1 infant",
    water: "A pool in the gardens; catch-and-release fishing on the reserve", seasons: ["Year-round"],
    airport: "Gqeberha (PLZ) · about 2 hours by road or 35 minutes by air",
    formula: formula("One main suite and two king or twin rooms, each opening onto a private veranda, around a country kitchen, gardens and a boma — booked whole.", "A pool in the gardens for swimming."),
    fieldNotes: [
      "The most remote of the three villas, on the west of the reserve — quiet nights, and the boma looks over the plains.",
      "Original furnishings and period details: a house with a history, built in 1905.",
      "Ask for cupcake decorating in the country kitchen on a slow afternoon.",
      "Pair with Cape Town or the Garden Route for a family trip of two halves.",
    ],
    manifest: [],
    experiences: experiences(
      { publicId: UH + "kwandwe-uplands-homestead-landscape", alt: "The open plains near Uplands Homestead at Kwandwe" },
      { publicId: UH + "kwandwe-uplands-homestead-kids-baking", alt: "Children decorating cupcakes in the kitchen at Uplands Homestead" },
    ),
    faqs: reserveFaqs("Uplands Homestead", "up to six guests and an infant"),
    images: [
      { publicId: UH + "kwandwe-uplands-homestead-entrance-sunset", alt: "The 1905 farmhouse at Uplands Homestead, Kwandwe, at sunset", caption: "The 1905 farmhouse at sunset", role: "Hero" },
      { publicId: UH + "kwandwe-uplands-homestead-aerial", alt: "Uplands Homestead, its boma and pool, seen from the air", caption: "The homestead from the air", role: "Card" },
      { publicId: UH + "kwandwe-uplands-homestead-boma-sunset", alt: "Dinner set at the Uplands boma at sunset", caption: "Dinner at the boma", role: "Feature" },
      { publicId: UH + "kwandwe-uplands-homestead-exterior", alt: "Uplands Homestead and its gardens", caption: "The homestead and its gardens", role: "Gallery strip" },
      { publicId: UH + "kwandwe-uplands-homestead-pool", alt: "The pool at Uplands Homestead", caption: "The pool", role: "Gallery strip" },
      { publicId: UH + "kwandwe-uplands-homestead-lounge", alt: "The lounge at Uplands Homestead, with period furnishings", caption: "The lounge", role: "Gallery strip" },
      { publicId: UH + "kwandwe-uplands-homestead-dining-room", alt: "The dining room at Uplands Homestead", caption: "The dining room", role: "Gallery strip" },
      { publicId: UH + "kwandwe-uplands-homestead-bedroom", alt: "A bedroom at Uplands Homestead", caption: "A bedroom", role: "Gallery strip" },
      { publicId: UH + "kwandwe-uplands-homestead-veranda", alt: "Tea on the veranda at Uplands Homestead", caption: "Tea on the veranda", role: "Gallery strip" },
      { publicId: UH + "kwandwe-uplands-homestead-kids-baking", alt: "Children decorating cupcakes at Uplands Homestead", caption: "Cupcake decorating", role: "Gallery strip" },
    ],
    booking: bookingBase("Always exclusive use — Uplands Homestead is booked by one group at a time", "All ages; up to 6 adults and 1 infant (one cot)", [
      "Exclusive use of the homestead with your own guide, vehicle, chef and host",
      "All meals and drinks",
      "Morning and afternoon game drives, night drives, bush walks and catch-and-release fishing",
      "Childminding by prior arrangement",
    ]),
    rooms: [
      { name: "Main suite", count: "1", bedrooms: "1", sleeps: "2", inside: "En suite, opening onto a private veranda", fit: "The grandparents, or the parents." },
      { name: "King or twin rooms", count: "2", bedrooms: "1 each", sleeps: "2 each", inside: "En suite, with original furnishings and period details", fit: "The children, or a second couple." },
      { name: "The whole house", count: "1", bedrooms: "3", sleeps: "6 + 1 infant", inside: "Country kitchen, lounge, dining room, gardens, pool and a boma over the reserve", fit: "A young family on a first safari.", whole: true },
    ],
    videos: films,
    ...seo("Uplands Homestead", "up to six"),
    credit,
  },
];
