import type { SampleResidence } from "./sample-settings";

// ——— MORE Family Collection · Lion Sands (Sabi Sand & Kruger) and Monwana (Thornybush) ———
// The three exclusive-use houses for families. J.W. and Miriam vetted Lion Sands and Monwana in May 2026.
// Facts from more.co.za (villa, FAQ and blog pages, Oct 2026). Rates are MORE's published "from" prices — confirm.
// Images in Cloudinary under gatherings/<house>/… and gatherings/lion-sands-treehouses|lion-sands-wildlife, tagged permission-pending.
const credit = "Images courtesy of MORE Family Collection";
const formula = (notes: [string, boolean][]) =>
  ["Room to gather", "A day for every age", "Water within reach", "Country at the door", "A resort behind you", "Worth returning to"].map((test, i) => ({ test, note: notes[i][0], pass: notes[i][1] }));
const TH = "gatherings/lion-sands-treehouses/";
const LW = "gatherings/lion-sands-wildlife/";
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
    verdict: ["The river does the work here. Elephants come down to drink while the coffee is still hot, and the whole family watches from one deck."],
    bestFor: "Three generations who want a private safari house on the Sabie River, with a treehouse night for the bold ones",
    notFor: "Not for families of more than eight — take Fish Eagle and Hinkwenu together for a larger gathering.",
    bedrooms: "3 en-suite bedrooms · 6,350 ft²", sleeps: 8, kidsProgram: "Mack & Madi kids' activities and childminding", kidsAges: "all ages",
    water: "Private deck over the perennial Sabie River; private lap pool", seasons: ["Year-round"],
    airport: "Skukuza Airport (SZK) · 5–20 min transfer", officialUrl: "https://www.more.co.za/residences/fish-eagle-residence/",
    rateFrom: 14900, rateUnit: "per night, exclusive use",
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
    ],
    booking: {
      plan: "Fully inclusive, exclusive use: meals, drinks, private safari and the villa team", ...lionSandsTerms,
      minStay: "", children: "All ages; up to 2 children (6 adults + 2 children)", rateBasis: "From $14,900 per night for the whole villa (Oct 2026)",
      fees: [{ label: "Impact Levy", value: "R160 per person per night" }, { label: "Park & conservation fees", value: "Extra" }],
      included: lionSandsIncluded, excluded: lionSandsExcluded, checked: "Oct 2026",
    },
    rooms: [
      { name: "Main suite", count: "1", bedrooms: "1", sleeps: "2", inside: "En-suite, river-facing", fit: "The grandparents' room." },
      { name: "Two further suites", count: "2", bedrooms: "1 each", sleeps: "2 + children", inside: "En-suite; two children can share with parents", fit: "One for each branch." },
      { name: "The villa, whole", count: "1", bedrooms: "3", sleeps: "8 (6 adults, 2 children)", inside: "Lap pool, wine room, fire deck, private vehicle, chef and team", fit: "How a family should do Lion Sands.", whole: true },
    ],
    partner: { name: "MORE Family Collection", url: "https://www.more.co.za" },
    videos: [],
    seoTitle: "Fish Eagle Villa, Lion Sands — Private Family Safari Villa, Sabi Sand | Wild & Co Gatherings",
    metaDescription: "A three-bedroom exclusive-use safari villa on the Sabie River at Lion Sands: private chef, guide and vehicle, children of all ages, and a treehouse night under the stars. Vetted by James Wild.",
    credit,
  },
  {
    slug: "hinkwenu-villa-lion-sands", entryNo: "G-010", name: "Hinkwenu Villa, Lion Sands", place: "Sabi Sand", region: "Mpumalanga", country: "South Africa",
    lat: -24.98, lng: 31.6, status: "Approved", stamp: "Founder inspected & approved", firstVisited: "May 2026", setting: "savanna",
    line: "Two bedrooms beside Tinga Lodge — a private safari house for a young family, its name meaning \"together\" in Shangaan.",
    verdict: ["Hinkwenu is the one I'd give a young family: small enough to feel like home, with its own guide and vehicle so nap time never decides the game drive."],
    bestFor: "Parents with young children, or grandparents with one family — up to six",
    notFor: "Not for big reunions on its own; pair it with Fish Eagle Villa for up to fourteen.",
    bedrooms: "2 en-suite bedrooms · 3,714 ft²", sleeps: 6, kidsProgram: "Mack & Madi kids' activities and childminding", kidsAges: "all ages",
    water: "Private pool and deck; the Sabie River close by at Tinga", seasons: ["Year-round"],
    airport: "Skukuza Airport (SZK) · 5–20 min transfer", officialUrl: "https://www.more.co.za/residences/hinkwenu-residence/",
    rateFrom: 9600, rateUnit: "per night, exclusive use",
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
    ],
    booking: {
      plan: "Fully inclusive, exclusive use: meals, drinks, private safari and the villa team", ...lionSandsTerms,
      minStay: "", children: "All ages; up to 2 children (4 adults + 2 children)", rateBasis: "From $9,600 per night for the whole villa (Oct 2026)",
      fees: [{ label: "Impact Levy", value: "R160 per person per night" }, { label: "Park & conservation fees", value: "Extra" }],
      included: lionSandsIncluded, excluded: lionSandsExcluded, checked: "Oct 2026",
    },
    rooms: [
      { name: "Two suites", count: "2", bedrooms: "1 each", sleeps: "2 + children", inside: "En-suite bedrooms off the covered patio", fit: "Parents in one, grandparents in the other." },
      { name: "The villa, whole", count: "1", bedrooms: "2", sleeps: "6 (4 adults, 2 children)", inside: "Private pool, deck, courtyard garden, chef, private vehicle", fit: "Small family, big safari.", whole: true },
    ],
    partner: { name: "MORE Family Collection", url: "https://www.more.co.za" },
    videos: [],
    seoTitle: "Hinkwenu Villa, Lion Sands — Private Safari Villa for Young Families | Wild & Co Gatherings",
    metaDescription: "A two-bedroom exclusive-use safari villa beside Tinga Lodge at Lion Sands, with its own chef, guide and vehicle, children of all ages and a treehouse night over the Sabie River. Vetted by James Wild.",
    credit,
  },
  {
    slug: "monwana-villa-thornybush", entryNo: "G-011", name: "Monwana Villa", place: "Thornybush", region: "Limpopo", country: "South Africa",
    lat: -24.42, lng: 31.17, status: "Approved", stamp: "Founder inspected & approved", firstVisited: "May 2026", setting: "savanna", featured: true,
    line: "An off-grid safari house in leopard country — two suites, three plunge pools and a waterhole you can watch from the kitchen.",
    verdict: ["Miriam and I sat by that waterhole with coffee and watched the morning arrive one animal at a time. It is the quietest luxury I know."],
    bestFor: "A family of up to six who want Thornybush's leopards, a private guide and a house that runs on the sun",
    notFor: "Not for large groups unless you take the whole lodge — the villa sleeps six.",
    bedrooms: "2 en-suite bedrooms, each with a plunge pool · 5,597 ft²", sleeps: 6, kidsProgram: "Mosaba Rangers kids' activities and childminding", kidsAges: "all ages",
    water: "Active waterhole in view of the deck; three temperature-controlled plunge pools", seasons: ["Year-round"],
    airport: "Hoedspruit (HDS) · about 45 min, transfer included", officialUrl: "https://www.more.co.za/monwana/villas/monwana-villa/",
    rateFrom: 14900, rateUnit: "per night, exclusive use",
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
    ],
    booking: {
      plan: "Fully inclusive, exclusive use: meals, premium drinks, private safari and the villa team",
      bookVia: "Wild & Co Gatherings — James arranges the villa and the flights with MORE",
      wholeHouse: "Always exclusive use; the whole lodge can also be taken (up to 24 guests)",
      checkIn: "", checkOut: "", deposit: "", cancellation: "",
      children: "All ages in the villa; 10+ in lodge suites; bush walks 16+", rateBasis: "From about $14,900 per night for the whole villa (MORE, Oct 2026)",
      fees: [{ label: "Park, impact & reserve fees", value: "Extra" }],
      included: ["Exclusive use of the villa, with chef, butler, concierge and housekeeper", "All meals, snacks, teas and coffees", "Premium beers, spirits and cellar wines; pantry stocked to your preference", "Twice-daily game drives and guided bush walks in a private vehicle, with refreshments", "Mosaba Rangers kids' activities and childminding", "Gratuities; transfers to Hoedspruit Airport and Thornybush airstrip"],
      excluded: ["Helicopter flights and K9 anti-poaching demonstrations", "Exclusive bush breakfasts and dinners", "Community experiences", "Park, impact and reserve fees", "Gallery purchases, cigars and cigarettes", "Flights and transfers not listed"],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Two suites", count: "2", bedrooms: "1 each", sleeps: "2 + children", inside: "En-suite, each with its own plunge pool", fit: "Parents in one, grandparents in the other." },
      { name: "The villa, whole", count: "1", bedrooms: "2", sleeps: "6 (4 adults, 2 children)", inside: "Fire deck, waterhole view, three plunge pools, chef, butler, private vehicle", fit: "The one Miriam and I would book again.", whole: true },
      { name: "The whole lodge", count: "6 suites + villa", bedrooms: "—", sleeps: "Up to 24", inside: "Four suites, two family suites (children 10+) and the villa", fit: "For the full reunion.", whole: true },
    ],
    partner: { name: "MORE Family Collection", url: "https://www.more.co.za" },
    videos: [{ provider: "youtube", id: "YR_8uiBObZ4", title: "Wild Together: My Wife's First Safari — Monwana Lodge, Thornybush, South Africa", description: "James and Miriam Wild at Monwana Villa in the Thornybush Nature Reserve, Greater Kruger — Miriam's first safari: leopards, the waterhole and the house we'd book again.", credit: "Wild Together · James & Miriam · Wild Earth Stays on YouTube" }],
    seoTitle: "Monwana Villa, Thornybush — Private Family Safari House | Wild & Co Gatherings",
    metaDescription: "An off-grid, exclusive-use safari villa in Thornybush: two suites with plunge pools, a waterhole in view, private guide and vehicle, children of all ages. Vetted by James Wild and filmed for Wild Together.",
    credit,
  },
];
