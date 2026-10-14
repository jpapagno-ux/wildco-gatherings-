import type { SampleResidence } from "./sample-settings";

// ——— ULUM Moab, Utah (G-020) ———
// J.W.'s favourite family stay, vetted April 2023. Suite tents below Looking Glass Rock, south of Moab,
// with Arches, Canyonlands and the White Rim Road within reach. Facts from ulumresorts.com, NPS and press (Oct 2026).
// Photos in Cloudinary under gatherings/ulum-moab/ (partner use approved).
const U = "gatherings/ulum-moab/";

export const utahResidences: SampleResidence[] = [
  {
    slug: "ulum-moab", entryNo: "G-020", name: "ULUM Moab", place: "Moab", region: "Utah", country: "United States",
    lat: 38.34, lng: -109.38, status: "Approved", stamp: "Founder inspected & approved", firstVisited: "April 2023", setting: "desert",
    notes: { bestSeason: "Open late March to late October · spring and autumn for hiking and rafting", power: "120V · type A/B", timeZone: "Mountain Time (MT)" },
    line: "Canvas suite tents under Looking Glass Rock, twenty-five minutes from Moab — the base camp for a family that wants Arches at sunrise, the Colorado River by raft and a night on the White Rim.",
    verdict: [
      "This is my favourite family stay. Everyone sleeps in their own tent with a wood stove and a deck, everyone eats together on the terrace, and by the second night the cousins have climbed Looking Glass Rock.",
      "For the ones who want a real adventure, the White Rim Road waits in Canyonlands: one night out in a 4x4, a hundred miles of canyon rim, and a story that gets told at every family dinner after.",
    ],
    bestFor: "Active families and three generations who want red-rock adventure by day — Arches, rafting, climbing, the White Rim — and a comfortable camp, a massage and the stars by night",
    notFor: "Not for a winter trip — the camp closes from November to March — or for a family that wants a hotel room with walls.",
    bedrooms: "Suite tents — each a king bed and a queen sofa bed, en-suite, sleeping up to 4", sleeps: 4, units: 50,
    kidsProgram: "Climbing and rappelling on Looking Glass Rock, nightly s'mores, painting and soap-making, an adventure concierge", kidsAges: "all ages",
    water: "Hot and cool dipping pools overlooking Looking Glass Rock; the Colorado River for rafting, near Moab", seasons: ["Spring", "Summer", "Autumn"],
    airport: "Canyonlands Regional (CNY) near Moab · Grand Junction (GJT) about 2¼ hours · Salt Lake City (SLC) about 4 hours",
    address: "147 S Looking Glass Rd, La Sal, UT 84532",
    formula: ["Room to gather", "A day for every age", "Water within reach", "Country at the door", "A resort behind you", "Worth returning to"].map((test, i) => ({ test, note: [
      "A tent for each branch of the family; one terrace and one fire for everyone.",
      "Climbing and s'mores for the young, rafting and the White Rim for the bold, the massage cave for the rest.",
      "Hot and cool dipping pools; the Colorado River nearby.",
      "Arches, Canyonlands and Looking Glass Rock — and Dark Sky-approved nights.",
      "Restaurant, coffee bar, massage cave, daily yoga and an adventure concierge.",
      "J.W.'s favourite family stay since April 2023.",
    ][i], pass: true })),
    fieldNotes: [
      "Book the White Rim overnight permit months ahead — spring and autumn sell out.",
      "ATVs and UTVs are not allowed on the White Rim; ride them on Moab's open trails instead.",
      "Go to Delicate Arch at sunrise, before the heat and the crowds.",
      "Ask the adventure concierge for the climbing and rappelling session on Looking Glass Rock.",
    ],
    manifest: [],
    experiences: [
      { name: "The White Rim, one night out", category: "On the land", ages: ["Teens and adults"], seasons: ["Spring and autumn"], description: "A hundred-mile loop below the Island in the Sky mesa in Canyonlands, by high-clearance 4x4 with a guide, with one night at a White Rim campsite. A permit is required, and we arrange it.", image: { publicId: U + "ulum-moab-tent-07", alt: "ULUM suite tents above the canyon country south of Moab, with the La Sal Mountains beyond" } },
      { name: "Arches National Park", category: "On the land", ages: ["All ages"], seasons: ["Spring to autumn"], description: "Delicate Arch at sunrise for the walkers, and the Windows and Turret Arch for the youngest — about forty minutes from camp.", image: { publicId: U + "ulum-moab-10", alt: "Two hikers walking toward a red-rock arch in Arches National Park, near Moab" } },
      { name: "Rafting the Colorado", category: "On the water", ages: ["Families with school-age children"], seasons: ["Spring to early autumn"], description: "A half-day on a family-friendly stretch of the Colorado River with a licensed outfitter, red cliffs on both sides." },
      { name: "Climb Looking Glass Rock", category: "For the young ones", ages: ["Children and adults"], seasons: ["Spring to autumn"], description: "Climbing and rappelling with a guide on the rock that stands over camp.", image: { publicId: U + "ulum-moab-02", alt: "Looking Glass Arch in red sandstone under a blue sky, beside ULUM Moab" } },
      { name: "UTV days on Moab's trails", category: "On the land", ages: ["Licensed drivers with family riders"], seasons: ["Spring to autumn"], description: "Rent a UTV and explore Moab's open off-road trails on your own, or ride with a guide." },
      { name: "The massage cave", category: "Together", ages: ["Adults"], seasons: ["Spring to autumn"], description: "Massage in a cave carved by nature, then the hot and cool dipping pools — the slow day for anyone who wants one.", image: { publicId: U + "ulum-moab-11", alt: "Hot dipping pool on the deck at ULUM Moab at dusk" } },
      { name: "Dark-sky nights", category: "Together", ages: ["All ages"], seasons: ["Spring to autumn"], description: "Dark Sky-approved lodging: the Milky Way over the desert after the fire and the s'mores." },
    ],
    faqs: [
      { question: "Is ULUM Moab good for families?", answer: "Yes. Each suite tent sleeps up to four with a king bed and a queen sofa bed, so a family takes a tent per branch. There are hot and cool dipping pools, climbing on Looking Glass Rock, nightly s'mores and an adventure concierge, with Arches about 40 minutes away." },
      { question: "When is ULUM Moab open?", answer: "Seasonally, from late March to late October: 26 March to 29 October in 2026, and 25 March to 28 October in 2027. Spring and autumn are best for hiking, rafting and the White Rim." },
      { question: "Can you drive the White Rim Road in one night?", answer: "Yes, with an early start. The White Rim is a 100-mile loop in Canyonlands that takes 10 to 12 hours of driving, so one night at a White Rim campsite splits it in two. It needs a high-clearance 4x4 with low range and an overnight permit, booked well ahead." },
      { question: "Can you take an ATV or UTV on the White Rim Road?", answer: "No. ATVs, UTVs and OHVs are not allowed on the White Rim, even if street legal. Use a high-clearance 4x4 there, and ride a UTV on Moab's open off-road trails on another day." },
      { question: "How far is ULUM Moab from Arches National Park?", answer: "About 40 minutes by car. The town of Moab is about 25 minutes away, and Canyonlands National Park about an hour." },
    ],
    images: [
      { publicId: U + "ulum-moab-tent-08", alt: "Private deck of a ULUM Moab suite tent at sunset, looking toward Looking Glass Rock", caption: "Sunset from the deck", role: "Hero" },
      { publicId: U + "ulum-moab-tent-06", alt: "ULUM Moab suite tent beneath red sandstone cliffs, Utah", caption: "A tent under the cliffs", role: "Card" },
      { publicId: U + "ulum-moab-09", alt: "ULUM Moab's lounge pavilion and fire pits at dusk", caption: "Camp at dusk", role: "Feature" },
      { publicId: U + "ulum-moab-tent-01", alt: "Inside a ULUM Moab suite tent: king bed, lounge and a window to the desert", caption: "Inside a suite tent", role: "Gallery strip" },
      { publicId: U + "ulum-moab-06", alt: "Dipping pool under shade sails at ULUM Moab at dusk", caption: "The dipping pools", role: "Gallery strip" },
      { publicId: U + "ulum-moab-02", alt: "Looking Glass Arch in red sandstone beside ULUM Moab", caption: "Looking Glass Arch", role: "Gallery strip" },
      { publicId: U + "ulum-moab-tent-02", alt: "ULUM Moab suite tent on its deck among juniper and red rock", caption: "Your own deck", role: "Gallery strip" },
      { publicId: U + "ulum-moab-tent-03", alt: "King bed with a Pendleton wool blanket in a ULUM Moab suite tent", caption: "Pendleton wool", role: "Gallery strip" },
      { publicId: U + "ulum-moab-01", alt: "ULUM Moab's glass-walled viewing lounge looking over the desert", caption: "The viewing lounge", role: "Gallery strip" },
      { publicId: U + "ulum-moab-12", alt: "Lounge sofas in the ULUM Moab lobby", caption: "The lobby", role: "Gallery strip" },
      { publicId: U + "ulum-moab-10", alt: "Two hikers walking toward a red-rock arch in Arches National Park", caption: "Arches National Park", role: "Gallery strip" },
      { publicId: U + "ulum-moab-05", alt: "A guest greeting the morning in front of Looking Glass Rock at ULUM Moab", caption: "Morning by Looking Glass Rock", role: "Gallery strip" },
      { publicId: U + "ulum-moab-tent-05", alt: "View of red-rock country from a ULUM Moab tent deck", caption: "From the deck", role: "Gallery strip" },
      { publicId: U + "ulum-moab-tent-07", alt: "ULUM suite tents above the canyon country with the La Sal Mountains beyond", caption: "Camp and the La Sals", role: "Gallery strip" },
      { publicId: U + "ulum-moab-04", alt: "Drinks on the terrace at ULUM Moab", caption: "On the terrace", role: "Gallery strip" },
    ],
    booking: {
      plan: "Suite tents; restaurant and coffee bar on site",
      bookVia: "Wild & Co Gatherings — James books the tents together and arranges the White Rim, rafting, Arches and UTV days",
      wholeHouse: "Book a tent for each branch of the family; larger groups by arrangement",
      children: "All ages; each suite tent sleeps up to four",
      fees: [],
      included: ["Suite tent with king bed, queen sofa bed, en-suite, wood-burning stove and private deck", "Daily programming: morning yoga, sunset live music, nightly s'mores", "Hot and cool dipping pools", "Adventure concierge"],
      excluded: ["Meals and drinks", "Massage cave treatments", "Guided White Rim, rafting, climbing and UTV days (arranged by us)", "National park entry and permits"],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Suite tent", count: "About 50", bedrooms: "1 + lounge", sleeps: "Up to 4", inside: "King bed, queen sofa bed, en-suite rain shower, wood-burning stove, evaporative cooling, private deck", fit: "One per branch of the family." },
      { name: "The family, together", count: "As many tents as you need", bedrooms: "—", sleeps: "Grandparents, parents and cousins", inside: "Neighbouring tents, one terrace, one fire", fit: "How we do Moab.", whole: true },
    ],
    partner: { name: "ULUM Resorts" },
    videos: [],
    seoTitle: "ULUM Moab — Family Adventure Basecamp near Arches, Utah | Wild & Co Gatherings",
    metaDescription: "James Wild's favourite family stay: suite tents under Looking Glass Rock near Moab, with Arches, Colorado River rafting, climbing, UTV days and a one-night White Rim 4x4 trip in Canyonlands. Vetted April 2023.",
    credit: "Images courtesy of ULUM Resorts",
  },
];
