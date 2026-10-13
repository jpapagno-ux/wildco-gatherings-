import type { SampleResidence } from "./sample-settings";

// ——— Villa Ardore, Chianti Classico, Tuscany (G-019) ———
// A 16th-century stone farmhouse rented whole to one family at a time. Facts from villaardore.com (Oct 2026).
// Photos in Cloudinary under gatherings/villa-ardore-tuscany/ (tag villa-ardore).
const V = "gatherings/villa-ardore-tuscany/";

export const italyResidences: SampleResidence[] = [
  {
    slug: "villa-ardore-tuscany", entryNo: "G-019", name: "Villa Ardore, Chianti", place: "Barberino Val d'Elsa", region: "Tuscany", country: "Italy",
    lat: 43.54, lng: 11.19, status: "Approved", stamp: "Host met", setting: "mountain",
    notes: { bestSeason: "May–Jun and Sep–Oct for walking and harvest · pool heated May–Sep", power: "230V · type C/F/L", timeZone: "CET · UTC+1 (UTC+2 in summer)" },
    line: "A 16th-century stone farmhouse in Chianti Classico, rented whole to one family at a time — eight suites, a private chef, a heated saltwater infinity pool and a cellar of Tuscan wine.",
    verdict: [
      "Villa Ardore is what Italian style and elegance mean to me: terracotta floors, stone walls, a long table on the loggia and a chef who lets the grandchildren roll the pizza dough.",
      "It stands out because it is never shared. Eight suites, one family, a villa manager who knows your names by lunch — and Florence and Siena each about forty minutes away when you want them.",
    ],
    bestFor: "An Italian family reunion or milestone celebration for up to 16 (plus 2), who want the whole villa, a private chef and the Chianti hills to themselves",
    notFor: "Not for a family that wants to share a pool with other guests or be in town every evening — this is a private country house among the vines.",
    bedrooms: "8 en-suite bedrooms across the villa and the Dependence; the office converts to a ninth", sleeps: 18, kidsProgram: "Pizza masterclass with the chef, pottery in the garden, foraging in the forest; nanny on request", kidsAges: "all ages",
    water: "Heated saltwater infinity pool over the vineyards (May–Sep; heated on request Oct–Apr) and a heated spa with whirlpool, steam room and sauna", seasons: ["Year-round"],
    airport: "Florence (FLR) · private transfer with your stay · about 40 minutes from Florence and from Siena",
    formula: ["Room to gather", "A day for every age", "Water within reach", "Country at the door", "A resort behind you", "Worth returning to"].map((test, i) => ({ test, note: [
      "Eight suites, a dining table for 18 to 20 and a loggia — always the whole villa.",
      "Pizza masterclass, pottery and foraging for the young; wine and spa for the grown-ups.",
      "Heated saltwater infinity pool and a private spa.",
      "Vineyards, forest and the Chianti Classico hills at the door.",
      "Villa manager, private chef, concierge, daily housekeeping and Florence transfers.",
      "A Tuscan house a family will come back to for every milestone.",
    ][i], pass: true })),
    fieldNotes: [
      "Ask the chef for a pizza masterclass on the first night — it breaks the ice for every age.",
      "Book a tasting with one of the small Chianti makers the villa works with.",
      "Celebrations of up to 60 guests, residents included, can be held at the villa.",
      "Cots, high chairs and a nanny are arranged on request.",
    ],
    manifest: [],
    experiences: [
      { name: "Pizza masterclass", category: "For the young ones", ages: ["All ages"], seasons: ["Year-round"], description: "The villa's chef at the pizza oven, with the whole family making their own.", image: { publicId: V + "villa-ardore-05", alt: "The chef making pizza with a young guest in the kitchen at Villa Ardore" } },
      { name: "Chianti wine tastings", category: "Together", ages: ["Adults"], seasons: ["Year-round"], description: "Tastings in the villa's cellar and with makers from smaller Chianti wineries.", image: { publicId: V + "villa-ardore-wine-cellar", alt: "The curated wine cellar at Villa Ardore, Chianti" } },
      { name: "The infinity pool", category: "On the water", ages: ["All ages"], seasons: ["May–Sep heated; on request in winter"], description: "One of Tuscany's largest heated saltwater infinity pools, looking over vineyards and forest.", image: { publicId: V + "villa-ardore-infinity-pool", alt: "A guest in the infinity pool at Villa Ardore, looking over cypresses and the Chianti hills" } },
      { name: "Fire pits at dusk", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "Evenings around the fire, looking out over the vineyards and forest.", image: { publicId: V + "villa-ardore-piazza-fire", alt: "Guests around a fire pit at dusk at Villa Ardore" } },
      { name: "The private spa", category: "Together", ages: ["Adults"], seasons: ["Year-round"], description: "Whirlpool, sensory shower, steam room and sauna, with vineyard-view massages arranged by the villa.", image: { publicId: V + "villa-ardore-spa-whirlpool", alt: "The heated whirlpool in the private spa at Villa Ardore" } },
      { name: "Foraging and pottery", category: "On the land", ages: ["All ages"], seasons: ["Spring to autumn"], description: "Into the forest with a local forager, and a pottery class in the garden." },
    ],
    faqs: [
      { question: "Is Villa Ardore good for an Italian family reunion?", answer: "Yes. It is rented only as a whole villa, to one family at a time, with eight en-suite bedrooms for up to 16 guests plus 2, a dining table for 18 to 20, a private chef, a villa manager and a heated saltwater infinity pool in the Chianti Classico hills." },
      { question: "Where is Villa Ardore?", answer: "In Chianti Classico, Tuscany, at Località Marciano near Barberino Val d'Elsa in the province of Florence — about 40 minutes by car from both Florence and Siena. A private driver meets guests in Florence." },
      { question: "What is included at Villa Ardore?", answer: "A personal airport welcome, daily catered breakfast, a private chef for lunch or dinner each day, daily housekeeping, a concierge and villa manager, and a welcome aperitivo. The spa, gym pavilion, wine cellar, pizza oven and heated pool are for your family alone." },
      { question: "Can we hold a celebration at Villa Ardore?", answer: "Yes. Milestone celebrations and intimate weddings are held at the villa for up to 60 guests including those staying, with an in-house planner, garden receptions and poolside parties." },
    ],
    images: [
      { publicId: V + "villa-ardore-pool-deck-night", alt: "Villa Ardore's heated saltwater infinity pool lit at dusk, Chianti, Tuscany", caption: "The pool at dusk", role: "Hero" },
      { publicId: V + "villa-ardore-balcony-tuscan-landscape", alt: "Terrace and cypress garden at Villa Ardore looking over the Chianti hills", caption: "The view from the terrace", role: "Card" },
      { publicId: V + "villa-ardore-04", alt: "The long dining table set with flowers and wine at Villa Ardore", caption: "One long table", role: "Feature" },
      { publicId: V + "villa-ardore-infinity-pool", alt: "A guest in the infinity pool at Villa Ardore, with cypresses and hills beyond", caption: "The infinity pool", role: "Gallery strip" },
      { publicId: V + "villa-ardore-living-room", alt: "The grand living room at Villa Ardore with fireplace, beams and leather sofas", caption: "The living room", role: "Gallery strip" },
      { publicId: V + "villa-ardore-03", alt: "Guests by the fire in the living room at Villa Ardore", caption: "By the fire", role: "Gallery strip" },
      { publicId: V + "villa-ardore-05", alt: "The chef making pizza with a young guest at Villa Ardore", caption: "Pizza with the chef", role: "Gallery strip" },
      { publicId: V + "villa-ardore-suite-01", alt: "En-suite bedroom with stone walls and wooden beams at Villa Ardore", caption: "A suite", role: "Gallery strip" },
      { publicId: V + "villa-ardore-01", alt: "Bedroom with exposed stone, beams and a padded headboard at Villa Ardore", caption: "Stone and beams", role: "Gallery strip" },
      { publicId: V + "villa-ardore-07", alt: "Suite with a beamed ceiling and terracotta floor at Villa Ardore", caption: "A quiet suite", role: "Gallery strip" },
      { publicId: V + "villa-ardore-wine-cellar", alt: "The curated wine cellar at Villa Ardore", caption: "The cellar", role: "Gallery strip" },
      { publicId: V + "villa-ardore-spa-whirlpool", alt: "Heated whirlpool in the private spa at Villa Ardore", caption: "The spa", role: "Gallery strip" },
      { publicId: V + "villa-ardore-piazza-fire", alt: "Guests around a fire pit at dusk at Villa Ardore", caption: "Fire pits at dusk", role: "Gallery strip" },
      { publicId: V + "villa-ardore-bar", alt: "The bar at Villa Ardore", caption: "The bar", role: "Gallery strip" },
      { publicId: V + "villa-ardore-pool-fountain", alt: "Pool and stonework at Villa Ardore", caption: "Poolside", role: "Gallery strip" },
    ],
    booking: {
      plan: "Whole-villa rental with breakfast, a daily private chef, villa manager and concierge",
      bookVia: "Wild & Co Gatherings — James books the whole villa, the chef's menus and the Florence transfers",
      wholeHouse: "Always the whole villa, for one family at a time",
      checkIn: "From 4:00 pm", checkOut: "11:00 am",
      children: "All ages; cots, high chairs and a nanny on request",
      fees: [{ label: "City tax", value: "Collected on arrival" }, { label: "Security deposit", value: "Required" }],
      included: ["The whole villa, its spa, gym pavilion, wine cellar, pizza oven and heated pool", "Personal airport welcome and private transfers to and from Florence", "Daily catered breakfast", "A private chef for lunch or dinner each day", "Daily housekeeping, concierge and villa manager", "Welcome aperitivo"],
      excluded: ["Flights", "Massages and treatments", "Nanny service (on request)"],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Villa suites", count: "8", bedrooms: "1 each", sleeps: "Up to 16 + 2", inside: "En-suite, stone walls, beams, terracotta floors, heated floors in winter; one with a kitchenette", fit: "A suite for every branch of the family." },
      { name: "The office", count: "1", bedrooms: "1", sleeps: "Converts to a ninth suite", inside: "Office with Wi-Fi and printer", fit: "For the cousin who comes at the last minute." },
      { name: "Villa Ardore, whole", count: "1", bedrooms: "8 + 1", sleeps: "16 + 2 overnight; 60 for a celebration", inside: "Two kitchens, loggia, dining for 18–20, spa, gym, cellar, pizza oven, infinity pool", fit: "The Tuscan reunion house.", whole: true },
    ],
    partner: { name: "Villa Ardore" },
    videos: [],
    seoTitle: "Villa Ardore, Chianti — Private Tuscan Villa for Family Reunions | Wild & Co Gatherings",
    metaDescription: "A 16th-century stone farmhouse in Chianti Classico, rented whole to one family: eight en-suite bedrooms for 16 + 2, a private chef, heated saltwater infinity pool and spa, 40 minutes from Florence and Siena.",
    credit: "Images courtesy of Villa Ardore",
  },
];
