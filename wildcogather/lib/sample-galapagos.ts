import type { SampleResidence } from "./sample-settings";

// ——— Galápagos Safari Camp, Santa Cruz highlands — added 21 Oct 2026 ———
// Facts from galapagossafaricamp.com (tented-camp, rates, galapagos-tours, galapagos-photos), 21 Oct 2026.
// Family Suite layout from Aracari (2012); Family Safari day plan as published by Lost World Adventures;
// yacht minimum-age note from Natural World Safaris. Evidence: House Selected only — Under observation until James confirms a visit.
// Verdict and quote are drafts in James's voice, for his approval. Images courtesy of Galapagos Safari Camp (partner).
const G = "gatherings/galapagos-safari-camp/";

export const galapagosResidences: SampleResidence[] = [
  {
    slug: "galapagos-safari-camp-santa-cruz", entryNo: "G-027", name: "Galápagos Safari Camp, Santa Cruz", place: "Santa Cruz highlands", region: "Galápagos", country: "Ecuador",
    lat: -0.67, lng: -90.41, status: "Approved", stamp: "Under observation", setting: "coast",
    notes: { bestSeason: "Year-round · Dec–May warmer and calmer at sea; Jun–Nov cooler, with richer waters", power: "120V · type A/B", timeZone: "UTC−6 · Galápagos time" },
    line: "A family-owned camp of nine safari tents and a Family Suite on 55 hectares of rewilded highland on Santa Cruz, bordering the national park — giant tortoises walk through it, and the islands are a boat ride away.",
    verdict: [
      "The Galápagos asks a family to choose: a yacht, and every night at sea, or a hotel in town. This camp is the third way. You sleep on land, in the highlands, with tortoises grazing below the tent — and go out to the uninhabited islands by day.",
      "It was cattle land once; the family who own it have planted it back to forest and raised their own children in the islands. Their Family Safari is five nights: a sea day to an uninhabited island, a day fishing and snorkelling with local fishermen, and the rest on Santa Cruz at a child's pace. I haven't stayed yet, so it is under observation until I have.",
    ],
    bestFor: "Families with children of any age who want the wildlife of a Galápagos cruise without nights at sea — and grandparents who want a bed that doesn't move",
    notFor: "Not for a family that wants to cover the far islands: from one base you reach the central islands by day. For the outer islands, pair it with a cruise.",
    bedrooms: "9 safari tents and a three-bedroom Family Suite; a two-bedroom Family Safari Tent with interconnecting rooms", sleeps: 6,
    kidsProgram: "Kids Club, a playroom under the Family Suite, a children's art class on the Family Safari; wetsuits and children's snorkel kit included", kidsAges: "No minimum age published · under-12s 10% off in the tents with two adults",
    water: "A small solar-heated pool at camp; snorkelling on boat days to uninhabited islands; Tortuga Bay and Garrapatero Beach on Santa Cruz", seasons: ["Year-round"],
    airport: "Baltra (GPS) — your naturalist guide meets you at the airport. Flights from mainland Ecuador are arranged on request",
    officialUrl: "https://www.galapagossafaricamp.com/tented-camp/",
    formula: [
      { test: "Room to gather", note: "The Family Suite: three en-suite bedrooms off one wraparound deck, a playroom below; the main lodge's long table for everyone.", pass: true },
      { test: "A day for every age", note: "Kids Club and a playroom for little ones; biking, kayaking, lava tunnels and snorkelling for older children; a private naturalist for all.", pass: true },
      { test: "Water within reach", note: "Boat days to uninhabited islands, snorkelling with sea lions, a fishing day with local fishermen.", pass: true },
      { test: "Country at the door", note: "55 hectares of rewilded highland bordering the national park — tortoises, Darwin's finches, mockingbirds and barn owls in camp.", pass: true },
      { test: "A resort behind you", note: "All meals, airport VIP service, transfers, a private guide on Santa Cruz and the boat days arranged for you.", pass: true },
      { test: "Worth returning to", note: "James has not yet stayed — under observation.", pass: false },
    ],
    fieldNotes: [
      "Book the Family Suite for three generations: three en-suite bedrooms, each opening onto the deck, and a playroom underneath.",
      "The Family Safari is the one for children: a fishing day with local fishermen is, the camp says, the children's favourite.",
      "Boat days are shared unless you ask for a private boat — ask us to price it for a family of six or more.",
      "Children under twelve get 10% off in the tents when travelling with two adults; the Family Suite is priced for six.",
      "Ending with a cruise? The camp runs a two-night pre- or post-cruise stay — our Galápagos Sea Star week is next.",
    ],
    manifest: [
      { day: "Day 1", morning: "Fly into Baltra; your naturalist meets you", afternoon: "Los Gemelos craters and a giant tortoise reserve", evening: "Lava tunnels, then dinner at camp" },
      { day: "Day 2", morning: "An organic coffee farm; the Cerro Mesa wetlands", afternoon: "Bikes to Garrapatero Beach and sea kayaks", evening: "Art class for the children" },
      { day: "Day 3", morning: "By boat to an uninhabited island — North Seymour, South Plaza, Santa Fe or Bartolomé", afternoon: "Wildlife walk and snorkelling", evening: "Back to camp" },
      { day: "Day 4", morning: "Out with local fishermen on a private speedboat", afternoon: "A deserted beach and snorkelling", evening: "Sundowners on the deck" },
      { day: "Day 5", morning: "The Charles Darwin Research Station and Puerto Ayora", afternoon: "Speedboat to Tortuga Bay, or a sea lion snorkel", evening: "The gathering dinner at the long table" },
      { day: "Day 6", morning: "A sunrise walk", afternoon: "Transfer to Baltra", evening: "" },
    ],
    experiences: [
      { name: "Giant tortoises at camp", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Tortoises migrate through the camp's 55 hectares — seen from the tent decks, the Family Suite and the paths.", image: { publicId: G + "gsc-tortoise-tents", alt: "A giant tortoise grazing on the slope below a raised safari tent" } },
      { name: "A day on an uninhabited island", category: "On the water", ages: ["All ages, with a guide"], seasons: ["Year-round"], description: "By boat to North Seymour, South Plaza, Santa Fe or Bartolomé, depending on the date — frigatebirds, boobies, sea lions and a snorkel.", image: { publicId: G + "gsc-family-north-seymour", alt: "A family and their guide beside a nesting frigatebird on North Seymour Island" } },
      { name: "Fishing with local fishermen", category: "For the young ones", ages: ["Children with their parents"], seasons: ["Year-round"], description: "A private speedboat day with local fishermen, a deserted beach and snorkelling in a secluded bay — the camp's favourite with children.", image: { publicId: G + "gsc-kids-03", alt: "Four children sitting on the bow of a boat heading out across the Galapagos sea" } },
      { name: "Lava tunnels and highland bikes", category: "On the land", ages: ["Families"], seasons: ["Year-round"], description: "Walk through lava tunnels, bike the red-earth tracks of the highlands and kayak at Garrapatero Beach.", image: { publicId: G + "gsc-kids-06", alt: "A family exploring a lava tunnel on Santa Cruz, light falling through the opening" } },
      { name: "Kids Club and the playroom", category: "For the young ones", ages: ["Younger children"], seasons: ["Year-round"], description: "Candle making and crafts at the Kids Club, and a playroom of games under the Family Suite.", image: { publicId: G + "gsc-kids-club", alt: "A girl making candles at the Kids Club table at Galapagos Safari Camp" } },
      { name: "Penguins on Isabela", category: "Beyond Santa Cruz", ages: ["Adventurous families"], seasons: ["Year-round"], description: "A two-night extension: snorkelling with penguins, the lava arches of Los Túneles and a hike up Sierra Negra.", image: { publicId: G + "gsc-penguin", alt: "A Galapagos penguin standing on black lava rock, Isabela Island" } },
    ],
    faqs: [
      { question: "What ages can stay at Galápagos Safari Camp?", answer: "The camp publishes no minimum age. It has a three-bedroom Family Suite with a playroom, a two-bedroom Family Safari Tent and a Kids Club, and children under twelve get 10% off in the tents with two adults. Many Galápagos yachts set a minimum age of seven, which is why a land-based camp suits younger children." },
      { question: "Why choose a land-based camp over a Galápagos cruise with children?", answer: "You sleep on land every night, in the highlands, and go out to the uninhabited islands by day — no nights at sea, a fixed bed for grandparents, and a pace set around the children. The trade-off is reach: the far islands need a cruise, which the camp pairs with a two-night pre- or post-cruise stay." },
      { question: "How much does Galápagos Safari Camp cost?", answer: "Safaris start at around US$1,300 per person per night. In 2026 the five-night Family Safari is US$7,015 per person in a tented double, or from US$5,525 per person in the Family Suite based on six guests. Park entrance fees, the transit card, flights and drinks are extra; the camp does not sell accommodation only." },
      { question: "What is included at Galápagos Safari Camp?", answer: "Accommodation, all meals, airport VIP service, private land excursions and transfers on Santa Cruz with an English-speaking naturalist, shared boat excursions with a guide, wetsuits and snorkelling gear, and the activities in your itinerary." },
      { question: "What wildlife will we see at the camp itself?", answer: "Giant tortoises migrate through the camp's land, and Darwin's finches, Galápagos mockingbirds, yellow warblers and barn owls live around the tents and the lodge; Galápagos petrels nest on the property." },
      { question: "How do you get to Galápagos Safari Camp?", answer: "Fly from mainland Ecuador to Baltra (GPS); your family's naturalist guide meets you at the airport and drives you across Santa Cruz to the highlands. The camp can arrange the flights from the mainland." },
    ],
    images: [
      { publicId: G + "gsc-tortoise-tents", alt: "A giant tortoise grazing on the slope below a raised safari tent at Galapagos Safari Camp", caption: "A neighbour below the tent", role: "Hero" },
      { publicId: G + "gsc-camp-aerial", alt: "Aerial view of the safari tents set into green highland forest on Santa Cruz, the coast beyond", caption: "The camp from the air", role: "Card" },
      { publicId: G + "gsc-suite-view", alt: "A family relaxing on the Family Suite deck, cactus and forest beyond", caption: "The Family Suite deck", role: "Feature" },
      { publicId: G + "gsc-kids-07", alt: "A girl jumping from black lava rocks into the sea beside a cactus", caption: "Off the lava", role: "Gallery strip" },
      { publicId: G + "gsc-kids-05", alt: "Children in rash vests swimming and snorkelling in shallow turquoise water", caption: "Snorkelling", role: "Gallery strip" },
      { publicId: G + "gsc-frigatebird", alt: "A male frigatebird on a branch with its red throat pouch inflated", caption: "A frigatebird on display", role: "Gallery strip" },
      { publicId: G + "gsc-lodge-dusk", alt: "The main lodge at Galapagos Safari Camp lit at dusk, its glass front and long deck open to the evening", caption: "The main lodge at dusk", role: "Gallery strip" },
      { publicId: G + "gsc-tent-interior", alt: "Inside a safari tent: a wide bed, timber floor and canvas walls opening to the forest", caption: "A safari tent", role: "Gallery strip" },
      { publicId: G + "gsc-family-tent-connecting", alt: "Sitting room of the Family Safari Tent, a sofa and coffee table with the bedroom through the canvas", caption: "The Family Safari Tent", role: "Gallery strip" },
      { publicId: G + "gsc-suite-master", alt: "Main bedroom of the Family Suite: a wide bed, timber floors and windows onto the forest", caption: "Family Suite, main bedroom", role: "Gallery strip" },
      { publicId: G + "gsc-playroom", alt: "The children's playroom under the Family Suite, games on the floor and the forest through the windows", caption: "The playroom", role: "Gallery strip" },
      { publicId: G + "gsc-observation-deck", alt: "Armchairs on the covered deck at sunset, a guest at the rail looking over the forest to the sea", caption: "Sunset from the deck", role: "Gallery strip" },
      { publicId: G + "gsc-starry-night", alt: "A safari tent glowing among the trees under a starry sky", caption: "Under equatorial stars", role: "Gallery strip" },
      { publicId: G + "gsc-bartolome", alt: "A visitor climbing the boardwalk stairs on Bartolome Island above the lava and sea", caption: "Bartolomé", role: "Gallery strip" },
      { publicId: G + "gsc-family-biking", alt: "A family cycling a red-earth track under highland trees on Santa Cruz", caption: "Bikes in the highlands", role: "Gallery strip" },
      { publicId: G + "gsc-family-santa-fe", alt: "A child sitting on the sand near a resting sea lion, Santa Fe Island", caption: "Santa Fe", role: "Gallery strip" },
    ],
    booking: {
      plan: "Full board with guiding: all meals, a private naturalist on Santa Cruz, shared boat excursions",
      bookVia: "Wild & Co Gatherings — we design the safari with the camp and arrange the flights from mainland Ecuador",
      wholeHouse: "Fully private safaris and private boats quoted on request",
      minStay: "Safaris, not rooms: from a 2-night pre- or post-cruise stay; no accommodation-only bookings",
      children: "No minimum age published; under-12s 10% off the published rate in the tents with two adults",
      rateBasis: "From about US$1,300 per person per night (2026, semi-private). Family Safari, 5 nights: US$7,015 per person in a tented double; Family Suite from US$5,525 per person based on 6",
      fees: [{ label: "Galápagos National Park entrance fee", value: "Extra" }, { label: "Visitor transit card", value: "Extra" }],
      included: ["Accommodation and all meals", "Airport VIP services and transfers", "Private land excursions on Santa Cruz with an English-speaking naturalist", "Shared boat excursions with a guide", "Wetsuits and snorkelling equipment"],
      excluded: ["Flights to the Galápagos", "Park entrance fee and transit card", "Drinks, laundry, insurance and gratuities"],
      checked: "Oct 2026",
    },
    rooms: [
      { name: "Safari Tents", count: "9", bedrooms: "1 each", sleeps: "2 each", inside: "Raised tents with a private deck, en-suite bathroom and panoramic views", fit: "The grandparents, side by side." },
      { name: "Family Safari Tent", count: "Ask us", bedrooms: "2 (main and twin, interconnecting)", sleeps: "A family", inside: "Two connected rooms under canvas, a sitting area, en-suite bathroom", fit: "Parents with two children." },
      { name: "Family Suite", count: "1", bedrooms: "3 (king and two twin rooms, each en suite)", sleeps: "6", inside: "A villa-style suite; every room opens onto a wraparound deck; playroom underneath", fit: "Three generations under one roof.", whole: true },
    ],
    programs: {
      title: "Their safaris at a glance",
      note: "Per person, US$, 2026 published rates, tented double unless shown; semi-private (shared boat days). Park fees and flights extra. Rates vary with dates and activities.",
      items: [
        { name: "Family Safari", length: "6 days · 5 nights", shape: "Two sea days — an uninhabited island and a fishing day with local fishermen — and three on Santa Cruz.", bestFor: "families and three generations", from: "From US$7,015 · Family Suite from US$5,525 (based on 6)" },
        { name: "Classic Safari", length: "5 days · 4 nights", shape: "Two days by boat to uninhabited islands, two on land on Santa Cruz.", bestFor: "couples and solo travellers", from: "From US$5,480" },
        { name: "Festive Safari", length: "6 days · 5 nights", shape: "Set holiday departures with shared boat days and private land adventures.", bestFor: "a different kind of holiday season", from: "From US$8,800" },
        { name: "Pre- & Post-Cruise", length: "3 days · 2 nights", shape: "Santa Cruz before or after a cruise — active, relaxing, or a dive day.", bestFor: "cruise passengers", from: "From US$1,915" },
        { name: "Isabela Extension", length: "2 nights", shape: "Beachfront nights on Isabela, penguins, Los Túneles and the Sierra Negra hike.", bestFor: "adventurous families", from: "From US$3,160" },
        { name: "Dive Safari", length: "1–5 days", shape: "A day or two of diving added to a safari, or a dedicated dive safari.", bestFor: "certified divers", from: "From US$1,235 a night" },
      ],
    },
    whyHere: { quote: "The Galápagos asks families to choose between a yacht and a hotel in town. Here you sleep in the highlands with tortoises below the tent, and the islands are a boat ride away." },
    videos: [],
    seoTitle: "Galápagos Safari Camp for Families: Family Suite & Safaris | Wild & Co Gatherings",
    metaDescription: "Galápagos Safari Camp for family gatherings: a land-based camp in the Santa Cruz highlands with a Family Suite, Kids Club and giant tortoises — Family Safari rates, ages and what's included.",
    credit: "Images courtesy of Galapagos Safari Camp",
  },
];
