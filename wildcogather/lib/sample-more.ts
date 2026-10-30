import type { SampleResidence } from "./sample-settings";
import type { Residence } from "./types";

import { MORE_CREDIT } from "./more";

// ——— The MORE villas · Lion Sands (Sabi Sand & Kruger), Marataba (Marakele), Monwana (Thornybush), Cape Cadogan (Cape Town) ———
// The five exclusive-use villas MORE lists for families. J.W. and Miriam stayed at Lion Sands Ivory Lodge and at Monwana
// in May 2026 and inspected the Lion Sands villas; J.W. also stayed at Cape Cadogan in May 2026 (a founder favourite) and
// approved its villa. Marataba carries the Vetted partner stamp (no stay recorded).
// Facts only from MORE's villa, FAQ, location and story pages, re-checked 30 Oct 2026. No rates, no link to MORE's site.
// Where MORE's own figures disagree (floor areas on the Fish Eagle, Hinkwenu, Marataba and Cape Cadogan pages), the figure is left out.
// Grouped on /vip/more (lib/collections.ts › propertyCollections, vip) with pairings and cross-sell from lib/more.ts.
// Each villa's Safaris ledger ID is in data/entities.json for matching only; nothing on the page links to the Safaris site.
// Photographs courtesy of MORE (Cloudinary, gatherings/<house>/… and wildco/south-africa/<region>/<villa>/…).
const credit = MORE_CREDIT;
const formula = (notes: [string, boolean][]) =>
  ["Room to gather", "A day for every age", "Water within reach", "Country at the door", "A resort behind you", "Worth returning to"].map((test, i) => ({ test, note: notes[i][0], pass: notes[i][1] }));
const TH = "gatherings/lion-sands-treehouses/";
const LW = "gatherings/lion-sands-wildlife/";
const FE = "wildco/south-africa/sabi-sand/fish-eagle-villa/fish-eagle-villa-";
const treehouseExp = (which: string) => ({
  name: "A night under the stars", category: "Together", ages: ["Adults", "Ages 10–15 with parents"], seasons: ["Year-round, weather permitting"],
  description: `Sleep out on the ${which} — a picnic supper, lanterns, a radio to your guide, and coffee after sunrise. Your villa stays ready all night.`,
  image: { publicId: TH + "lion-sands-treehouse-night", alt: "A Lion Sands treehouse sleep-out under the stars in the Sabi Sand" },
});
const lionSandsTerms = {
  bookVia: "Wild & Co Gatherings — James arranges the villa, the treehouse night and the flights with MORE",
  wholeHouse: "Always exclusive use — the villa, its team and its safari vehicle are yours",
  checkIn: "", checkOut: "",
  deposit: "", cancellation: "",
};
const lionSandsIncluded = [
  "Exclusive use of the villa, with concierge, butler, housekeeper and private chef",
  "All meals, teas and coffees; stocked pantry and minibar; selected South African beers, spirits, house wines and soft drinks",
  "Two game drives a day in your private vehicle, with a FGASA-accredited field guide and tracker",
  "Bush walks (16+), astronomy sessions, bush breakfasts, picnic lunches and bush dinners",
  "Mack & Madi kids' activities and childminding",
  "Skukuza Airport transfers, Wi-Fi, laundry, spa and wellness treatments, gratuities",
];
const lionSandsExcluded = [
  "Treehouse sleep-outs (added to the stay at extra cost)",
  "Helicopter flights, golf and community experiences",
  "Exclusive-use bush breakfasts and dinners",
  "Premium beers, spirits, cellar wines and champagnes",
  "Park fees, guest conservation contribution and Impact Levy (R160 per person per night)",
  "Flights and transfers not listed above",
];
// ——— Gatherings VIP for the five MORE villas (James, 30 Oct 2026: "list all as vip") ———
// The same values go into Airtable › Residences (VIP (Vetted in Purpose), Collection, Collection slug, Visit planned,
// Why on J.W.'s list, Family fit) when the PR merges. Until then a Vercel preview reads them from here (lib/data.ts),
// so the preview shows what production will show once the Airtable rows are updated. Facts only from the villa pages.
const moreVip = (visit: string, why: string, fit: string): NonNullable<Residence["vip"]> => ({ collection: "The MORE Villas", collectionSlug: "more", visit, why, fit });
export const MORE_VIP: Record<string, NonNullable<Residence["vip"]>> = {
  "fish-eagle-villa-lion-sands": moreVip("Founder inspected · May 2026",
    "Three bedrooms on the Sabie River, with its own chef, guide and vehicle: the Lion Sands villa I'd give three generations who want a safari house of their own. [Draft — J.W. to approve]",
    "Three generations, up to eight (six adults and two children)."),
  "hinkwenu-villa-lion-sands": moreVip("Founder inspected · May 2026",
    "Two bedrooms beside Tinga Lodge, with its own guide and vehicle: the villa I'd give a young family, so nap time never decides the game drive. [Draft — J.W. to approve]",
    "A young family, up to six (four adults and two children)."),
  "monwana-villa-thornybush": moreVip("Founder stayed · May 2026",
    "Two suites, three plunge pools and a waterhole in view of the kitchen. Miriam and I stayed here in May 2026, and it is the house we'd book again. [Draft — J.W. to approve]",
    "A family of up to six (four adults and two children)."),
  "marataba-villa-marakele": moreVip("Vetted partner · not yet visited",
    "Four tents on the Matlabas River, a kids' tent and no malaria: the MORE villa I'd show a family with small children first. [Draft — J.W. to approve]",
    "Up to ten (eight adults and two children), young children welcome."),
  "cape-cadogan-villa-cape-town": moreVip("Founder inspected · May 2026",
    "A restored National Monument below Table Mountain, with a chauffeur for the city: the villa I'd put at the start or end of a MORE safari. [Draft — J.W. to approve]",
    "A family of up to six (four adults and two children), any age."),
};

const lionSandsFaqs = (name: string, sleeps: string) => [
  { question: `Is ${name} good for a multigenerational safari?`, answer: `Yes. It is booked whole, sleeps ${sleeps}, welcomes children of all ages, and comes with its own chef, private safari vehicle, field guide and tracker — so game drives run at the family's pace, and the Mack & Madi programme keeps the youngest busy between drives.` },
  { question: "Can children go on game drives at Lion Sands?", answer: "In the private villas, yes — children of all ages ride in the villa's own vehicle. Lodge suites set age limits (Tinga 6+, River and Ivory 10+, Narina 16+). Bush walks are for guests aged 16 and over." },
  { question: "What is a Lion Sands treehouse night?", answer: "A sleep-out on an open-air platform in the bush — Chalkley, Kingston or Tinyeleti — with a picnic supper, lanterns, a full bathroom and a radio to your guide. You're driven out at sunset and collected after sunrise. Children aged 10–15 can join at Kingston and Tinyeleti. It is added to the stay at extra cost." },
  { question: "How do you get to Lion Sands?", answer: "Fly into Skukuza Airport in Kruger National Park; the transfer to the lodges takes 5 to 20 minutes and is included. By road it is about six hours from Johannesburg." },
];

export const moreResidences: SampleResidence[] = [
  {
    slug: "fish-eagle-villa-lion-sands", entryNo: "G-009", name: "Fish Eagle Villa, Lion Sands", place: "Sabi Sand", region: "Mpumalanga", country: "South Africa",
    lat: -24.98, lng: 31.62, status: "Approved", stamp: "Founder inspected & approved", firstVisited: "May 2026", setting: "savanna",
    line: "Three bedrooms on the Sabie River beside Ivory Lodge — your own pool, chef, guide and safari vehicle, with leopard country at the deck rail.",
    verdict: ["The river does the work here. Elephants come down to drink while the coffee is still hot, and the whole family watches from one deck. [Draft — J.W. to approve]"],
    bestFor: "Three generations who want a private safari house on the Sabie River, with a treehouse night for the bold ones",
    notFor: "Not for families of more than eight — take Fish Eagle and Hinkwenu together for a larger gathering.",
    bedrooms: "3 en-suite bedrooms", sleeps: 8, kidsProgram: "Mack & Madi kids' activities and childminding", kidsAges: "all ages",
    water: "Private deck over the perennial Sabie River; private lap pool", seasons: ["Year-round"],
    airport: "Skukuza Airport (SZK) · 5–20 min transfer",
    formula: formula([["Three suites, one deck, one table — booked whole.", true], ["Kids of all ages on drives in the private vehicle; Mack & Madi between drives.", true], ["The Sabie River below the deck, all year.", true], ["Lion Sands traverses Sabi Sand and Kruger — about 13 miles of river frontage.", true], ["Ivory Lodge next door: spa, fitness, a team of five for the villa.", true], ["J.W. vetted it in May 2026 — a house to come back to.", true]]),
    fieldNotes: ["Book the Kingston or Chalkley treehouse for a night mid-stay.", "Ask for the astronomy session on a moonless night.", "Pair with Monwana in Thornybush for a second safari chapter."],
    manifest: [],
    experiences: [
      { name: "Private game drives", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Twice a day in your own vehicle, with a field guide and tracker who keep to your family's pace.", image: { publicId: LW + "leopard-lion-sands-sabi-sand", alt: "Leopard at Lion Sands Game Reserve in the Sabi Sand" } },
      treehouseExp("Kingston or Chalkley treehouse"),
      { name: "Mack & Madi adventures", category: "For the young ones", ages: ["All ages in the villas"], seasons: ["Year-round"], description: "Tracking, bush survival, baking with the chef and milkshake sundowners." },
      { name: "Astronomy on the deck", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "The southern sky over the Sabie, with a guide and a telescope." },
    ],
    faqs: lionSandsFaqs("Fish Eagle Villa", "up to eight (six adults and two children)"),
    images: [
      { publicId: "gatherings/fish-eagle-villa-lion-sands/fish-eagle-villa-lion-sands", alt: "Fish Eagle Villa at Lion Sands, an exclusive-use private residence beside Ivory Lodge on the Sabie River", caption: "Fish Eagle Villa", role: "Gallery strip" },
      { publicId: "gatherings/fish-eagle-villa-lion-sands/private-pool-fish-eagle-villa", alt: "Private pool at Fish Eagle Villa, Lion Sands Game Reserve", caption: "The private pool", role: "Hero" },
      { publicId: "gatherings/fish-eagle-villa-lion-sands/outside-dining-fish-eagle-villa", alt: "Outdoor dining table at Fish Eagle Villa, Lion Sands", caption: "Supper outside", role: "Gallery strip" },
      { publicId: "gatherings/fish-eagle-villa-lion-sands/fish-eagle-villa-gallery", alt: "Fish Eagle Villa, Lion Sands", caption: "Fish Eagle Villa", role: "Feature" },
      { publicId: TH + "kingston-treehouse", alt: "Kingston Treehouse at Lion Sands, above a rocky outcrop", caption: "Kingston Treehouse", role: "Gallery strip" },
      { publicId: FE + "exterior", alt: "Fish Eagle Villa beside the Sabie River at Lion Sands Ivory Lodge, Sabi Sand", caption: "On the Sabie River at Ivory Lodge", role: "Gallery strip" },
      { publicId: FE + "lounge", alt: "The lounge at Fish Eagle Villa, Lion Sands Game Reserve", caption: "The lounge", role: "Gallery strip" },
      { publicId: FE + "mack-madi-kids", alt: "Children on the Mack and Madi kids' programme at Fish Eagle Villa, Lion Sands", caption: "Mack & Madi", role: "Gallery strip" },
    ],
    booking: {
      plan: "Fully inclusive, exclusive use: meals, drinks, private safari and the villa team", ...lionSandsTerms,
      minStay: "", children: "All ages; up to 2 children (6 adults + 2 children)", rateBasis: "Quoted on request for the whole villa",
      fees: [{ label: "Impact Levy", value: "R160 per person per night" }, { label: "Park & conservation fees", value: "Extra" }],
      included: lionSandsIncluded, excluded: lionSandsExcluded, checked: "Oct 2026",
    },
    rooms: [
      { name: "Main suite", count: "1", bedrooms: "1", sleeps: "2", inside: "En-suite, river-facing", fit: "The grandparents' room." },
      { name: "Two further suites", count: "2", bedrooms: "1 each", sleeps: "2 + children", inside: "En-suite; two children can share with parents", fit: "One for each branch." },
      { name: "The villa, whole", count: "1", bedrooms: "3", sleeps: "8 (6 adults, 2 children)", inside: "Lap pool, wine room, fire deck, private vehicle, chef and team", fit: "How a family should do Lion Sands.", whole: true },
    ],
    partner: { name: "MORE Family Collection" },
    videos: [],
    seoTitle: "Fish Eagle Villa, Lion Sands: Family Safari Villa, Sabi Sand | Wild & Co Gatherings",
    metaDescription: "A three-bedroom exclusive-use safari villa on the Sabie River at Lion Sands: private chef, guide and vehicle, children of all ages, and a treehouse night under the stars. Vetted by James Wild.",
    credit,
  },
  {
    slug: "hinkwenu-villa-lion-sands", entryNo: "G-010", name: "Hinkwenu Villa, Lion Sands", place: "Sabi Sand", region: "Mpumalanga", country: "South Africa",
    lat: -24.98, lng: 31.6, status: "Approved", stamp: "Founder inspected & approved", firstVisited: "May 2026", setting: "savanna",
    line: "Two bedrooms beside Tinga Lodge — a private safari house for a young family, its name meaning \"together\" in Shangaan.",
    verdict: ["Hinkwenu is the one I'd give a young family: small enough to feel like home, with its own guide and vehicle so nap time never decides the game drive. [Draft — J.W. to approve]"],
    bestFor: "Parents with young children, or grandparents with one family — up to six",
    notFor: "Not for big reunions on its own; pair it with Fish Eagle Villa for up to fourteen.",
    bedrooms: "2 en-suite bedrooms", sleeps: 6, kidsProgram: "Mack & Madi kids' activities and childminding", kidsAges: "all ages",
    water: "Private pool and deck; the Sabie River close by at Tinga", seasons: ["Year-round"],
    airport: "Skukuza Airport (SZK) · 5–20 min transfer",
    formula: formula([["Two suites, a covered patio and a courtyard garden — booked whole.", true], ["All ages on drives in the private vehicle; Tinga's Owl House next door for ages 6+.", true], ["Private pool; the Sabie at Tinga Lodge.", true], ["Dual access across Sabi Sand and Kruger.", true], ["Tinga Lodge alongside: spa and kids' programme.", true], ["J.W. vetted it in May 2026.", true]]),
    fieldNotes: ["The Tinyeleti treehouse belongs to Tinga — ask for it.", "Bush breakfast on day two, before the heat."],
    manifest: [],
    experiences: [
      { name: "Private game drives", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Your own vehicle, guide and tracker — drives timed around the youngest." , image: { publicId: LW + "wildlife-lion-sands-1", alt: "Wildlife at Lion Sands Game Reserve" } },
      treehouseExp("Tinyeleti treehouse over the Sabie River"),
      { name: "The Owl House & Mack & Madi", category: "For the young ones", ages: ["Ages 6+ at the Owl House", "All ages in the villa"], seasons: ["Year-round"], description: "Beading, tracking, photography in the Creative Lab and baking with the chef." },
    ],
    faqs: lionSandsFaqs("Hinkwenu Villa", "up to six (four adults and two children)"),
    images: [
      { publicId: "gatherings/hinkwenu-villa-lion-sands/hinkwenu-villa-lion-sands", alt: "Hinkwenu Villa at Lion Sands, a two-bedroom exclusive-use residence beside Tinga Lodge", caption: "Hinkwenu Villa", role: "Hero" },
      { publicId: "gatherings/hinkwenu-villa-lion-sands/hinkwenu-villa-residence", alt: "Hinkwenu Residence at Lion Sands Game Reserve", caption: "Hinkwenu", role: "Gallery strip" },
      { publicId: TH + "tinyeleti-treehouse", alt: "Tinyeleti Treehouse overlooking the Sabie River at Lion Sands", caption: "Tinyeleti — 'many stars'", role: "Gallery strip" },
      { publicId: "wildco/south-africa/sabi-sand/hinkwenu-villa/hinkwenu-villa-pool", alt: "The private pool and deck at Hinkwenu Villa, Lion Sands", caption: "The private pool", role: "Gallery strip" },
      { publicId: "wildco/south-africa/sabi-sand/hinkwenu-villa/hinkwenu-villa-kids-activities", alt: "Kids' activities on the Mack and Madi programme at Hinkwenu Villa, Lion Sands", caption: "Mack & Madi", role: "Gallery strip" },
    ],
    booking: {
      plan: "Fully inclusive, exclusive use: meals, drinks, private safari and the villa team", ...lionSandsTerms,
      minStay: "", children: "All ages; up to 2 children (4 adults + 2 children)", rateBasis: "Quoted on request for the whole villa",
      fees: [{ label: "Impact Levy", value: "R160 per person per night" }, { label: "Park & conservation fees", value: "Extra" }],
      included: lionSandsIncluded, excluded: lionSandsExcluded, checked: "Oct 2026",
    },
    rooms: [
      { name: "Two suites", count: "2", bedrooms: "1 each", sleeps: "2 + children", inside: "En-suite bedrooms off the covered patio", fit: "Parents in one, grandparents in the other." },
      { name: "The villa, whole", count: "1", bedrooms: "2", sleeps: "6 (4 adults, 2 children)", inside: "Private pool, deck, courtyard garden, chef, private vehicle", fit: "Small family, big safari.", whole: true },
    ],
    partner: { name: "MORE Family Collection" },
    videos: [],
    seoTitle: "Hinkwenu Villa, Lion Sands: Safari Villa for Young Families | Wild & Co Gatherings",
    metaDescription: "A two-bedroom exclusive-use safari villa beside Tinga Lodge at Lion Sands, with its own chef, guide and vehicle, children of all ages and a treehouse night over the Sabie River. Vetted by James Wild.",
    credit,
  },
  {
    slug: "monwana-villa-thornybush", entryNo: "G-011", name: "Monwana Villa", place: "Thornybush", region: "Limpopo", country: "South Africa",
    lat: -24.42, lng: 31.17, status: "Approved", stamp: "Founder inspected & approved", firstVisited: "May 2026", setting: "savanna", featured: true,
    line: "An off-grid safari house in leopard country — two suites, three plunge pools and a waterhole you can watch from the kitchen.",
    verdict: ["Miriam and I sat by that waterhole with coffee and watched the morning arrive one animal at a time. It is the quietest luxury I know. [Draft — J.W. to approve]"],
    bestFor: "A family of up to six who want Thornybush's leopards, a private guide and a house that runs on the sun",
    notFor: "Not for large groups unless you take the whole lodge — the villa sleeps six.",
    bedrooms: "2 en-suite bedrooms, each with a plunge pool · 5,597 ft²", sleeps: 6, kidsProgram: "Mosaba Rangers kids' activities and childminding", kidsAges: "all ages",
    water: "Active waterhole in view of the deck; three temperature-controlled plunge pools", seasons: ["Year-round"],
    airport: "Hoedspruit (HDS) · about 45 min, transfer included",
    formula: formula([["Two suites, a fire deck and one long table — the villa is yours.", true], ["All ages welcome; Mosaba Rangers between drives; drives in your own vehicle.", true], ["A waterhole and dry riverbed bring the animals to the house.", true], ["14,000 ha of Thornybush, unfenced to Greater Kruger — strong leopard and lion.", true], ["Chef, butler, concierge, housekeeper, guide and tracker.", true], ["J.W. and Miriam stayed in May 2026 — filmed for Wild Together.", true]]),
    fieldNotes: ["Ask for coffee at the waterhole before the morning drive.", "Book the rhino-monitoring outing if it's running.", "Pair with Lion Sands for a Sabi Sand chapter."],
    manifest: [],
    experiences: [
      { name: "Leopard country", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Twice-daily drives in your private vehicle — six guests at most, off-road tracking, few other vehicles.", image: { publicId: "gatherings/monwana-villa-thornybush/leopard-thornybush-monwana", alt: "Leopard resting in the bush at Monwana, Thornybush Nature Reserve" } },
      { name: "Mosaba Rangers", category: "For the young ones", ages: ["All ages in the villa"], seasons: ["Year-round"], description: "Young rangers at the waterhole, tracking and bush skills between drives.", image: { publicId: "gatherings/monwana-villa-thornybush/young-rangers-waterhole-monwana", alt: "Children at the waterhole watching wildlife on the Young Rangers programme at Monwana" } },
      { name: "Elephants at the waterhole", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "Lunch on the deck while the herds come down to drink.", image: { publicId: "gatherings/monwana-villa-thornybush/elephant-thornybush-monwana", alt: "African elephant reaching out with its trunk near Monwana, Greater Kruger" } },
      { name: "Around the fire", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "Supper under the stars, owls calling in the trees.", image: { publicId: "gatherings/monwana-villa-thornybush/monwana-fire-pit", alt: "Fire pit at Monwana Game Lodge after dark" } },
    ],
    faqs: [
      { question: "Is Monwana Villa good for a family safari?", answer: "Yes. The villa is exclusive use, sleeps six (four adults and two children), welcomes children of all ages, and comes with its own guide, tracker and vehicle. The Mosaba Rangers programme and childminding are included." },
      { question: "What is included at Monwana Villa?", answer: "Exclusive use of the villa, all meals and snacks, premium beers, spirits and cellar wines, a stocked pantry, twice-daily game drives and guided bush walks, gratuities, and transfers to Hoedspruit Airport and the Thornybush airstrip." },
      { question: "Where is Monwana?", answer: "In the 14,000-hectare Thornybush Nature Reserve in Limpopo, which shares an unfenced border with Greater Kruger. Hoedspruit Airport is about 45 minutes away, with daily flights from Johannesburg and Cape Town." },
      { question: "Can children go on bush walks at Monwana?", answer: "No — reserve rules allow bush walks from age 16. Children of all ages can go on game drives in the villa's private vehicle." },
    ],
    images: [
      { publicId: "gatherings/monwana-villa-thornybush/monwana-villa-pool-elephants", alt: "Monwana Villa pool overlooking the bush in Thornybush, with elephants nearby", caption: "The Villa, elephants at the waterhole", role: "Hero" },
      { publicId: "gatherings/monwana-villa-thornybush/monwana-dining-deck", alt: "Wooden dining deck at Monwana Game Lodge with the table set at dusk", caption: "Supper on the deck", role: "Gallery strip" },
      { publicId: "gatherings/monwana-villa-thornybush/monwana-tracker-safari-vehicle", alt: "Tracker on the front of a Monwana safari vehicle in Thornybush", caption: "The tracker's seat", role: "Gallery strip" },
      { publicId: "gatherings/monwana-villa-thornybush/owls-monwana", alt: "Owls perched on a branch at Monwana Game Lodge", caption: "The night shift", role: "Gallery strip" },
      { publicId: "gatherings/monwana-villa-thornybush/monwana-safari-drive", alt: "Game drive at Monwana in the Thornybush Nature Reserve", caption: "Out on drive", role: "Feature" },
      { publicId: "wildco/south-africa/thornybush/monwana-villa/monwana-villa-16", alt: "Monwana Villa, an exclusive-use safari villa in Thornybush, Greater Kruger", caption: "Monwana Villa", role: "Gallery strip" },
    ],
    booking: {
      plan: "Fully inclusive, exclusive use: meals, premium drinks, private safari and the villa team",
      bookVia: "Wild & Co Gatherings — James arranges the villa and the flights with MORE",
      wholeHouse: "Always exclusive use; the whole lodge can also be taken (up to 24 guests)",
      checkIn: "", checkOut: "", deposit: "", cancellation: "",
      children: "All ages in the villa; 10+ in lodge suites; bush walks 16+", rateBasis: "Quoted on request for the whole villa",
      fees: [{ label: "Park, impact & reserve fees", value: "Extra" }],
      included: ["Exclusive use of the villa, with chef, butler, concierge and housekeeper", "All meals, snacks, teas and coffees", "Premium beers, spirits and cellar wines; pantry stocked to your preference", "Twice-daily game drives and guided bush walks in a private vehicle, with refreshments", "Mosaba Rangers kids' activities and childminding", "Same-day laundry, wellness and beauty treatments, fitness centre access and Wi-Fi", "Gratuities; transfers to Hoedspruit Airport and Thornybush airstrip"],
      excluded: ["Helicopter flights and K9 anti-poaching demonstrations", "Exclusive bush breakfasts and dinners", "Community experiences", "Park, impact and reserve fees", "Gallery purchases, cigars and cigarettes", "Flights and transfers not listed"],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Two suites", count: "2", bedrooms: "1 each", sleeps: "2 + children", inside: "En-suite, each with its own plunge pool", fit: "Parents in one, grandparents in the other." },
      { name: "The villa, whole", count: "1", bedrooms: "2", sleeps: "6 (4 adults, 2 children)", inside: "Fire deck, waterhole view, three plunge pools, chef, butler, private vehicle", fit: "The one Miriam and I would book again.", whole: true },
      { name: "The whole lodge", count: "6 suites + villa", bedrooms: "—", sleeps: "Up to 24", inside: "Four suites, two family suites (children 10+) and the villa", fit: "For the full reunion.", whole: true },
    ],
    partner: { name: "MORE Family Collection" },
    videos: [{ provider: "youtube", id: "YR_8uiBObZ4", title: "Wild Together: My Wife's First Safari — Monwana Lodge, Thornybush, South Africa", description: "James and Miriam Wild at Monwana Villa in the Thornybush Nature Reserve, Greater Kruger — Miriam's first safari: leopards, the waterhole and the house we'd book again.", credit: "Wild Together · James & Miriam · Wild Earth Stays on YouTube" }],
    seoTitle: "Monwana Villa, Thornybush — Private Family Safari House | Wild & Co Gatherings",
    metaDescription: "An off-grid, exclusive-use safari villa in Thornybush: two suites with plunge pools, a waterhole in view, private guide and vehicle, children of all ages. Vetted by James Wild and filmed for Wild Together.",
    credit,
  },
];

// ——— Marataba Villa (G-033 · JWC-R-0013 in JWC-P-0029 · Safaris WCS-ZA-MRT-03) and
// ——— Cape Cadogan Villa (G-034 · JWC-R-0014 in JWC-P-0030 · Safaris WCS-ZA-CPT-05), added 30 Oct 2026.
// Marataba: vetted partner (MORE approved Wild & Co Gatherings as a partner); James has not stayed, so no stay is claimed.
// Cape Cadogan: James stayed at Cape Cadogan in May 2026 and calls it a founder favourite (correction, 30 Oct 2026);
// founder inspected & approved, as the Lion Sands villas. No overnight in the Villa itself is claimed.
const MV = "wildco/south-africa/marataba/marataba-villa/marataba-villa-";
const MR = "wildco/south-africa/marataba/marataba/marataba-";
const CC = "wildco/south-africa/cape-town/cape-cadogan-villa/cape-cadogan-villa-";

moreResidences.push(
  {
    slug: "marataba-villa-marakele", entryNo: "G-033", name: "Marataba Villa", place: "Marakele National Park", region: "Limpopo", country: "South Africa",
    status: "Approved", stamp: "Vetted partner", setting: "savanna",
    line: "Four tents on the banks of the Matlabas River in the malaria-free Waterberg — a kids' tent, a private pool, and your own chef, guide and vehicle, booked whole for up to ten.",
    verdict: ["I haven't stayed at Marataba yet. Four tents on one river, a kids' tent and no malaria is the villa I'd show a family with small children first. [Draft — J.W. to approve]"],
    bestFor: "Up to ten — eight adults and two children — who want a malaria-free safari with room to spread out and come together",
    notFor: "Not for more than ten guests; the villa is booked whole only.",
    bedrooms: "4 luxury tents, one of them a kids' tent with two single beds", sleeps: 10,
    kidsProgram: "Mack & Madi kids' activities and childminding", kidsAges: "young children welcome",
    water: "A private pool overlooking the wilderness; a water safari on the Matlabas River", seasons: [],
    airport: "Thabazimbi airstrip · about 40 min to the Villa · or about 3.5 h by road from Johannesburg",
    formula: formula([
      ["Four tents along the river's edge, each with a private deck and outdoor shower, around one central lodge with dining, lounge, pool deck, fire deck and boma — booked whole.", true],
      ["Young children welcome; a kids' tent with two single beds and its own bathroom; Mack & Madi activities and childminding.", true],
      ["A private pool, and a water safari on the Matlabas River.", true],
      ["Marataba is a privately managed section of Marakele National Park, in the malaria-free Waterberg: Big Five and water safaris.", true],
      ["A dedicated team — concierge and private chef — with a private safari vehicle and FGASA-accredited field guide; wellness treatments included.", true],
      ["To be recorded on James's first stay.", false],
    ]),
    fieldNotes: [
      "MORE says the villa is designed for multigenerational families to spread out and come together.",
      "One kids' room has deck views over the river.",
      "The Thabametsi Treehouse is an overnight extra, not part of the villa stay.",
    ],
    manifest: [],
    experiences: [
      { name: "Private game drives", category: "On the land", ages: ["All ages, in the house's own vehicle"], seasons: [], description: "Two a day in the villa's private vehicle with a FGASA-accredited field guide, plus bush walks, astronomy and wildlife lectures.", image: { publicId: MR + "field-guides", alt: "Safari field guides at Marataba beside an open vehicle under a tree, mountains behind" } },
      { name: "Water safari on the Matlabas", category: "On the water", ages: [], seasons: [], description: "Flat-bottomed boats on the Matlabas River below the villa.", image: { publicId: MR + "water-safari", alt: "A water safari by flat-bottomed boat on the Matlabas River at Marataba" } },
      { name: "Mack & Madi", category: "For the young ones", ages: [], seasons: [], description: "MORE's kids' activities and childminding, included in the villa stay.", image: { publicId: MV + "kids-tent", alt: "The kids' tent at Marataba Villa with two single beds" } },
      { name: "Bush breakfasts and dinners", category: "Together", ages: [], seasons: [], description: "Bush breakfasts, picnic lunches and bush dinners are part of the villa stay.", image: { publicId: MV + "lunch-deck", alt: "Lunch set on the deck at Marataba Villa, Marakele National Park" } },
    ],
    faqs: [
      { question: "Is Marataba Villa good for a multigenerational family?", answer: "Yes. MORE designed it for multigenerational families: four tents for up to ten guests (eight adults and two children), with a kids' tent with two single beds, around a central lodge with a pool, fire deck and boma. It is booked whole, with its own chef, guide and vehicle." },
      { question: "Is Marataba malaria-free?", answer: "Yes. Marataba is in the malaria-free Waterberg, in a privately managed section of Marakele National Park, and MORE describes it as safe for young children." },
      { question: "Can young children stay at Marataba Villa?", answer: "Yes. Young children are welcome at the Villa and at Marataba Safari Lodge; Mountain Lodge is for guests aged 16 and over. Mack & Madi kids' activities and childminding are included at the Villa." },
      { question: "How do you get to Marataba Villa?", answer: "Fly to Thabazimbi airstrip, about 40 minutes from the Villa by road (airstrip transfers are included), or drive from Johannesburg in about 3.5 hours. Wild & Co Gatherings arranges the flights and transfers with the stay." },
    ],
    images: [
      { publicId: MV + "sunset-from-boat", alt: "Marataba Villa at sunset, seen from a boat on the Matlabas River", caption: "The villa from the river at sunset", role: "Hero", width: 1920, height: 1280 },
      { publicId: MV + "kids-tent", alt: "The kids' tent at Marataba Villa with two single beds", caption: "The children's tent", role: "Card" },
      { publicId: MV + "tent-river-view", alt: "A Marataba Villa tent with river views and a private veranda", caption: "A villa tent over the river", role: "Feature" },
      { publicId: MV + "pool", alt: "The private pool at Marataba Villa overlooking the Waterberg wilderness", caption: "The private pool", role: "Gallery strip" },
      { publicId: MV + "tent-hippos", alt: "A Marataba Villa tent above the Matlabas River with hippos in the water below", caption: "Hippos below the tents", role: "Gallery strip" },
      { publicId: MV + "bedroom", alt: "Inside a bedroom tent at Marataba Villa, Waterberg", caption: "Inside a villa tent", role: "Gallery strip" },
      { publicId: MV + "bathtub", alt: "A bathroom at Marataba Villa with views from the bathtub", caption: "The view from the bath", role: "Gallery strip" },
      { publicId: MV + "lunch-deck", alt: "Lunch set on the deck at Marataba Villa, Marakele National Park", caption: "Lunch on the deck", role: "Gallery strip" },
      { publicId: MV + "hero", alt: "Marataba Villa on the banks of the Matlabas River, Marakele National Park, Waterberg", caption: "On the Matlabas River", role: "Gallery strip" },
    ].map((i) => ({ ...i, credit })),
    booking: {
      plan: "Fully inclusive, exclusive use: meals, selected drinks, private safari and the villa team",
      bookVia: "Wild & Co Gatherings — James arranges the villa and the flights with MORE",
      wholeHouse: "Whole villa only: all four tents and the private team, exclusive use",
      children: "Young children welcome at the Villa; Mack & Madi kids' activities and childminding included",
      rateBasis: "Quoted on request for the whole villa",
      fees: [{ label: "Impact Levy", value: "R160 per person per night" }, { label: "Park fees & guest conservation contribution", value: "Extra" }],
      included: [
        "Exclusive use of the villa, with a concierge and private chef",
        "All meals, teas and coffees; in-room minibar and snacks; stocked pantry",
        "Selected South African beers, spirits, house wines and soft drinks",
        "Two game drives a day in a private vehicle with a FGASA-accredited field guide; bush walks, astronomy and wildlife lectures",
        "Bush breakfasts, picnic lunches and bush dinners",
        "Mack & Madi kids' activities and childminding; spa and wellness treatments",
        "Thabazimbi airstrip transfers, Wi-Fi in public areas, laundry and gratuities",
      ],
      excluded: [
        "Park fees, guest conservation contribution and Impact Levy (R160 per person per night)",
        "Premium brand beers, spirits, cellar wines and champagnes",
        "Exclusive-use bush breakfasts and dinners",
        "Helicopter flights, the rhino conservation experience and local community experiences",
        "Thabametsi Treehouse overnight experiences",
        "Telephone calls, gallery purchases, cigars and cigarettes; flights and transfers not specified",
      ],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Luxury tents", count: "4", inside: "Along the river's edge, each with a private deck and an outdoor shower; bathrooms with a view from the bathtub" },
      { name: "Kids' tent", inside: "One of the four tents: two single beds and a kids' bathroom; one kids' room has deck views over the river" },
      { name: "The villa, whole", count: "1", bedrooms: "4 tents", sleeps: "10 (8 adults, 2 children)", inside: "Central lodge with open-plan dining and lounge, private pool, pool deck, fire deck and boma; concierge, private chef, private vehicle and field guide", fit: "Grandparents in one tent, the children in their own. [Draft — J.W. to approve]", whole: true },
    ],
    partner: { name: "MORE Family Collection" },
    videos: [],
    seoTitle: "Marataba Villa: Malaria-Free Family Safari Villa, Waterberg | Wild & Co Gatherings",
    metaDescription: "Marataba Villa in Marakele National Park: four riverside tents for up to ten, a kids' tent, private pool, chef, guide and vehicle, in the malaria-free Waterberg.",
    credit,
  },
  {
    slug: "cape-cadogan-villa-cape-town", entryNo: "G-034", name: "Cape Cadogan Villa", place: "Gardens", region: "Cape Town", country: "South Africa",
    status: "Approved", stamp: "Founder inspected & approved", firstVisited: "May 2026", setting: "mountain",
    line: "Three en-suite bedrooms in a restored National Monument below Table Mountain — a private pool, a breakfast chef and a chauffeur, with Kloof Street on foot.",
    verdict: ["I stayed at Cape Cadogan in May 2026. Its villa is the one I'd put at the start or end of a MORE safari, so Cape Town is a chapter of the trip, not a night between flights. [Draft — J.W. to approve]"],
    bestFor: "A family of up to six — four adults and two children — who want Cape Town from a house of their own, with a driver",
    notFor: "Not for more than six in the villa; lunches and dinners are not included.",
    bedrooms: "3 en-suite bedrooms", sleeps: 6,
    kidsProgram: "Mack & Madi kids' activities and childminding", kidsAges: "families of any age",
    water: "A private pool and deck; the hotel's two temperature-controlled pools", seasons: [],
    airport: "Cape Town International (CPT) · 21 km, about 20–30 min by road",
    formula: formula([
      ["Three en-suite bedrooms, a lounge, a full kitchen and a dining room — booked whole.", true],
      ["Suits families of any age; Mack & Madi kids' activities and childminding included.", true],
      ["A private pool and deck, and the two temperature-controlled pools at Cape Cadogan Boutique Hotel.", true],
      ["Below Table Mountain in the Kloof Street neighbourhood: cafés, galleries, boutiques and Upper Union within walking distance.", true],
      ["Concierge, butler, housekeeper, breakfast chef and a private chauffeur; wellness treatments and the hotel's fitness centre.", true],
      ["J.W. stayed at Cape Cadogan in May 2026 — a founder favourite.", true],
    ]),
    fieldNotes: [
      "The house is part of a restored early-1800s National Monument on Upper Union Street, Gardens.",
      "Breakfast is made daily by a chef; lunches and dinners can be booked at Upper Union.",
      "For a larger family, the hotel's Stable Suites take all ages and have interleading options.",
    ],
    manifest: [],
    experiences: [
      { name: "Cape Town with a chauffeur", category: "Together", ages: [], seasons: [], description: "A private vehicle and chauffeur for the city, the beaches and the Winelands; tours and excursions are booked separately.", image: { publicId: CC + "mountain", alt: "Cape Cadogan Villa's columned veranda with Table Mountain behind" } },
      { name: "Mack & Madi", category: "For the young ones", ages: [], seasons: [], description: "MORE's kids' activities and childminding, included in the villa stay.", image: { publicId: CC + "family", alt: "A family playing games in the lounge at Cape Cadogan Villa" } },
      { name: "Kloof Street on foot", category: "On the land", ages: [], seasons: [], description: "Cafés, galleries, boutiques and Upper Union restaurant within walking distance of the villa.", image: { publicId: "wildco/south-africa/cape-town/cape-cadogan/cape-cadogan-exterior-gardens", alt: "The garden path beside Cape Cadogan's white-columned exterior, Cape Town" } },
    ],
    faqs: [
      { question: "Is Cape Cadogan Villa good for families?", answer: "Yes. MORE says the villa suits families of any age: three en-suite bedrooms for up to six guests (four adults and two children), a private pool, a full kitchen and a breakfast chef, with Mack & Madi kids' activities and childminding included." },
      { question: "Where is Cape Cadogan Villa?", answer: "In Gardens, Cape Town, on Upper Union Street below Table Mountain, part of a restored early-1800s National Monument. Kloof Street's cafés, galleries and shops are within walking distance, and Cape Town International Airport is 21 km away." },
      { question: "What is included at Cape Cadogan Villa?", answer: "Exclusive use of the villa with its pool and deck, breakfast made by a chef, a concierge, butler and housekeeper, a private chauffeur and vehicle, airport transfers, wellness treatments, the hotel's fitness centre, Mack & Madi, a premium bar selection, same-day laundry, Wi-Fi and gratuities." },
      { question: "Can a larger family stay at Cape Cadogan?", answer: "The villa sleeps six. Cape Cadogan Boutique Hotel's Stable Suites accommodate all ages and have interleading options, which MORE describes as suited to multigenerational families; hotel rooms are for children aged 10 and over." },
    ],
    images: [
      { publicId: CC + "exterior", alt: "Cape Cadogan Villa in Cape Town, a columned veranda and landscaped garden below Table Mountain", caption: "Cape Cadogan Villa", role: "Hero", width: 987, height: 667 },
      { publicId: CC + "family", alt: "A family playing games in the lounge at Cape Cadogan Villa", caption: "A family afternoon in the lounge", role: "Card" },
      { publicId: CC + "mountain", alt: "Cape Cadogan Villa's columned veranda with Table Mountain behind", caption: "Beneath Table Mountain", role: "Feature" },
      { publicId: CC + "lounge", alt: "The lounge at Cape Cadogan Villa with floor-to-ceiling doors to a private courtyard", caption: "The lounge", role: "Gallery strip" },
      { publicId: CC + "pool", alt: "The plunge pool and sun deck at Cape Cadogan Villa, seen from inside", caption: "The plunge pool and deck", role: "Gallery strip" },
      { publicId: CC + "kitchen", alt: "The open-plan kitchen and dining area at Cape Cadogan Villa", caption: "Kitchen and dining", role: "Gallery strip" },
      { publicId: CC + "chef", alt: "A private chef preparing a meal in the Cape Cadogan Villa kitchen", caption: "The breakfast chef at work", role: "Gallery strip" },
      { publicId: CC + "bedroom", alt: "A bedroom at Cape Cadogan Villa with a green tufted headboard", caption: "One of three en-suite bedrooms", role: "Gallery strip" },
    ].map((i) => ({ ...i, credit })),
    booking: {
      plan: "Exclusive use with breakfast, a chauffeur and the villa team",
      bookVia: "Wild & Co Gatherings — James arranges the villa, the chauffeur and the flights with MORE",
      wholeHouse: "Always exclusive use — the villa, its pool and its team are yours",
      children: "Families of any age in the villa; Mack & Madi kids' activities and childminding included",
      rateBasis: "Quoted on request for the whole villa",
      fees: [{ label: "Impact Levy", value: "Extra" }],
      included: [
        "Exclusive use of the villa with its private pool and deck",
        "Breakfast prepared daily by a chef; stocked pantry; premium bar selection",
        "A dedicated villa concierge, butler and housekeeper",
        "A private vehicle and chauffeur for the city; airport transfers",
        "Wellness and beauty treatments and the hotel's fitness centre",
        "Mack & Madi kids' activities and childminding",
        "Same-day laundry, Wi-Fi and gratuities",
      ],
      excluded: [
        "Upper Union Restaurant lunch and dinner; private chef lunches and dinners",
        "Premium wines and champagnes, cigars and cigarettes",
        "Tours, excursions and activity bookings",
        "Impact Levy, telephone calls, and flights or transfers not specified",
      ],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "En-suite bedrooms", count: "3", bedrooms: "1 each", inside: "Each with its own bathroom" },
      { name: "The villa, whole", count: "1", bedrooms: "3", sleeps: "6 (4 adults, 2 children)", inside: "Lounge opening onto a private courtyard, full kitchen, dining room, private pool and deck; breakfast chef, concierge, butler, housekeeper and chauffeur", fit: "Three generations under one roof, with the city on foot. [Draft — J.W. to approve]", whole: true },
    ],
    partner: { name: "MORE Family Collection" },
    videos: [],
    seoTitle: "Cape Cadogan Villa: Family Villa Below Table Mountain, Cape Town | Wild & Co Gatherings",
    metaDescription: "Cape Cadogan Villa in Gardens, Cape Town: three en-suite bedrooms for up to six, a private pool, breakfast chef and chauffeur, in a restored National Monument.",
    credit,
  },
);

// Every MORE villa carries its Gatherings VIP block.
for (const r of moreResidences) r.vip = MORE_VIP[r.slug];

// ——— Airtable updates waiting for the merge (30 Oct 2026) ———
// The live Residences rows get these values when the PR merges (scratchpad more_vip_airtable.json is generated from here).
// Until then lib/data.ts applies them on Vercel previews only, so a preview shows exactly what production will show.
// Cape Cadogan: James stayed at Cape Cadogan in May 2026 (correction, 30 Oct 2026) — founder inspected & approved.
export type PendingRow = { vip: NonNullable<Residence["vip"]>; stamp?: Residence["stamp"]; firstVisited?: string; verdict?: string[]; worthReturning?: true };
const cc = moreResidences.find((r) => r.slug === "cape-cadogan-villa-cape-town")!;
export const MORE_ON_MERGE: Record<string, PendingRow> = {
  ...Object.fromEntries(Object.entries(MORE_VIP).map(([slug, vip]) => [slug, { vip }])),
  [cc.slug]: { vip: MORE_VIP[cc.slug], stamp: cc.stamp, firstVisited: cc.firstVisited, verdict: cc.verdict, worthReturning: true },
};
