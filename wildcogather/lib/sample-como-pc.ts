import type { SampleResidence } from "./sample-settings";

// ——— COMO Parrot Cay, Turks & Caicos — rebuilt 15 Oct 2026 from comohotels.com (residences, accommodation, offers) ———
// Evidence: Host met (James has met the team; site visit to come). COMO is a partner: images used with credit.
// Rates are COMO's; residences are "available upon request". Verdict and quotes are drafts in James's voice.
const C = "gatherings/como-parrot-cay/";

export const comoParrotCay: SampleResidence = {
  slug: "como-parrot-cay", entryNo: "G-004", name: "COMO Parrot Cay", place: "Parrot Cay", region: "Turks & Caicos", country: "Turks & Caicos Islands",
  status: "Approved", stamp: "Host met", setting: "coast",
  notes: { bestSeason: "Dry season · Dec–Apr; in 2026 the resort closed 31 Aug–14 Oct", power: "120V · type A/B", timeZone: "Eastern Time (ET)" },
  line: "A 1,000-acre private island with four miles of white sand and eleven private residences of two to eight bedrooms — every house on the sand, with its own pool and a COMO butler.",
  verdict: [
    "A family gathering needs two things a hotel rarely gives at once: a house where everyone can be together, and a resort that looks after them. Parrot Cay has both — every house is on the sand, with its own pool and a COMO butler.",
    "I'd start with Mechayah Beach House for one big family, or Serenity's two villas when each branch wants its own front door. Villa Frangipani, with its separate nanny building, is the answer for parents of little ones.",
  ],
  bestFor: "Three generations who want a whole beach house — and a private island — with a kids' club, yoga and boat days behind them",
  notFor: "Not for a family on a budget or one that wants a town at the door: the island is a boat ride from Providenciales, and residences are priced on request.",
  bedrooms: "11 private residences of 2–8 bedrooms, plus beach houses and villas of 1–3 bedrooms", sleeps: 8, units: 11,
  kidsProgram: "Play by COMO kids' club with a daily programme; kayaks, paddleboards, bikes and snorkel gear included", kidsAges: "All ages",
  water: "Four miles of white sand around the island; a private pool at every house, villa and residence", seasons: ["Year-round"],
  airport: "Providenciales (PLS), then a 15-minute drive and a 35-minute boat ride — about 50 minutes",
  formula: [
    { test: "Room to gather", note: "Residences of two to eight bedrooms with indoor and outdoor dining and kitchens; Serenity is two four-bedroom villas.", pass: true },
    { test: "A day for every age", note: "Play by COMO for children, COMO Shambhala yoga and Pilates, diving with Big Blue for the keen.", pass: true },
    { test: "Water within reach", note: "Every house on the sand with its own pool; four miles of beach.", pass: true },
    { test: "Country at the door", note: "A mangrove to kayak, forest trails to bike, reefs offshore and North Caicos next door.", pass: true },
    { test: "A resort behind you", note: "A COMO butler for every house, Lotus and Terrace restaurants, afternoon tea, private boats.", pass: true },
    { test: "Worth returning to", note: "James has met the team; his site visit is still to come.", pass: false },
  ],
  fieldNotes: [
    "One big family: Mechayah Beach House — four suites at the corners, the table in the middle, and a cinema room that converts to a fifth bedroom.",
    "Two branches: Serenity — Main House and Serenity Too, two four-bedroom villas on one estate.",
    "Little ones: Villa Frangipani — a detached primary suite and a separate nanny building.",
    "COMO's night offers (stay 5 pay 4, stay 7 pay 6) do not cover the private residences; ask us about a residence offer for Gatherings families.",
    "In 2026 the resort took a seasonal closure from 31 August to 14 October; check dates for late summer.",
  ],
  manifest: [
    { day: "Day 1", morning: "Fly into Providenciales", afternoon: "A 15-minute drive and a 35-minute boat to the island", evening: "Settle in; dinner at the house" },
    { day: "Day 2", morning: "Yoga with COMO Shambhala", afternoon: "Children at Play by COMO; the beach", evening: "Dinner at Lotus" },
    { day: "Day 3", morning: "Guided kayak through the mangrove", afternoon: "Bikes on the forest trails", evening: "Afternoon tea, then dinner at home" },
    { day: "Day 4", morning: "Private boat to secluded swimming spots", afternoon: "Picnic lunch on the water", evening: "Sunset on the deck" },
    { day: "Day 5", morning: "Snorkel and dive with Big Blue", afternoon: "Pool and beach", evening: "Dinner at Terrace" },
    { day: "Day 6", morning: "Road trip to North Caicos", afternoon: "Back for the beach", evening: "The gathering dinner at the residence table" },
    { day: "Day 7", morning: "A slow breakfast", afternoon: "The boat back to Providenciales", evening: "" },
  ],
  experiences: [
    { name: "Mangrove kayaking", category: "On the water", ages: ["All ages, with a guide"], seasons: ["Year-round"], description: "A guided paddle into the island's mangrove, where turtles, herons and egrets live." },
    { name: "Private boat days", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "Spacious boats to secluded swimming spots, or further out for a picnic lunch — fishing charters too.", image: { publicId: C + "hotel-7140", alt: "A beach house pool looking across white sand and parasols to the turquoise water off Parrot Cay" } },
    { name: "Play by COMO", category: "For the young ones", ages: ["Children"], seasons: ["Year-round"], description: "The kids' club and its daily programme of children's activities, included in every stay." },
    { name: "Diving with Big Blue", category: "On the water", ages: ["Certified divers; courses on request"], seasons: ["Year-round"], description: "The reefs around Turks and Caicos, with certification courses on request." },
  ],
  faqs: [
    { question: "Does COMO Parrot Cay have villas for large families?", answer: "Yes. Parrot Cay has eleven private residences of two to eight bedrooms — among them Mechayah Beach House (four bedrooms plus a cinema room that converts to a fifth), Lotus Flower (four bedrooms with an optional pavilion and pool) and Serenity (two four-bedroom villas). Every one has its own pool and a COMO butler." },
    { question: "Does COMO Parrot Cay have a kids' club?", answer: "Yes. Play by COMO runs a daily programme of children's activities, and it is included in COMO's published stays along with kayaks, paddleboards, bikes and snorkel gear." },
    { question: "How do you get to COMO Parrot Cay?", answer: "Fly into Providenciales (PLS). The island is about 50 minutes away: a 15-minute drive and a 35-minute boat ride." },
    { question: "Which Parrot Cay residence is best for families with young children?", answer: "Villa Frangipani: three en-suite bedrooms including a detached primary suite, plus a separate nanny building, a full kitchen and an outdoor fire pit." },
    { question: "Do COMO's offers apply to the private residences?", answer: "Not today. Every Seventh Night, On Us excludes the private residences and Every Fifth Night, On Us is for Terrace Rooms only. The residences are priced on request — ask us about a residence offer for Gatherings families." },
  ],
  images: [
    { publicId: C + "frangipani-01", alt: "Aerial view of villa roofs among the trees above the white beach and turquoise sea at COMO Parrot Cay", caption: "The island from the air", role: "Hero" },
    { publicId: C + "mechayah-01", alt: "A long teak dining table under lantern pendants looking over the pool and the sea at Mechayah Beach House", caption: "The table at Mechayah", role: "Card" },
    { publicId: C + "serenity-01", alt: "Aerial view of the Serenity estate, a two-storey villa above its pool in green forest", caption: "Serenity", role: "Feature" },
    { publicId: C + "mechayah-02", alt: "Sitting room at Mechayah Beach House with glass doors open to palms and the sea", caption: "Mechayah Beach House", role: "Gallery strip" },
    { publicId: C + "lotus-flower-01", alt: "The pool at Lotus Flower with white daybeds and parasols in front of its pavilion", caption: "Lotus Flower", role: "Gallery strip" },
    { publicId: C + "frangipani-02", alt: "White living room at Villa Frangipani under a vaulted timber ceiling, doors open to the garden", caption: "Villa Frangipani", role: "Gallery strip" },
    { publicId: C + "como-villa-02", alt: "The COMO Villa, a two-storey timber villa above its pool and deck on the beach", caption: "The COMO Villa", role: "Gallery strip" },
    { publicId: C + "love-pumpkin-01", alt: "The pool and deck at Love Pumpkin at dusk, lanterns lit beside the pavilions", caption: "Love Pumpkin at dusk", role: "Gallery strip" },
    { publicId: C + "island-villa-02", alt: "Deck with white sofas under palms beside the beach at Island Villa", caption: "Island Villa", role: "Gallery strip" },
    { publicId: C + "sanctuary-01", alt: "A curtained daybed beside the pool at The Sanctuary", caption: "The Sanctuary", role: "Gallery strip" },
  ],
  rooms: [
    { name: "Mechayah Beach House", count: "1", bedrooms: "4 + cinema room", sleeps: "8", inside: "753 m² on its own beach; four en-suite suites with garden showers, media room that converts to a bedroom, kitchen, scullery, grill, yoga lounge", fit: "One big family, the table in the middle.", whole: true },
    { name: "Serenity", count: "1 estate", bedrooms: "8 (two villas)", sleeps: "8 listed", inside: "799 m²; Main House and Serenity Too, two two-storey four-bedroom villas; Serenity Too can be booked alone", fit: "A house for each branch.", whole: true },
    { name: "Lotus Flower", count: "1", bedrooms: "4", sleeps: "8", inside: "408 m², two storeys, indoor and outdoor dining; optional central pavilion with pool", fit: "The pavilion becomes the family room." },
    { name: "Villa Frangipani", count: "1", bedrooms: "3", sleeps: "6", inside: "279 m² beachfront; detached primary suite, separate nanny building, full kitchen, fire pit", fit: "Parents of little ones." },
    { name: "Love Pumpkin", count: "1", bedrooms: "3", sleeps: "6", inside: "Main house 668 m² with a 308 m² guest villa, beside a wide stretch of beach", fit: "Grandparents in the guest villa." },
    { name: "The Sanctuary", count: "1", bedrooms: "3", sleeps: "6", inside: "831 m², two storeys; two bedrooms over the beach, one on the garden", fit: "A family of six." },
    { name: "Island Villa · Rocky Point · Lucky House", count: "3", bedrooms: "3 each", sleeps: "6 each", inside: "316 m² each; Lucky House faces the sunset, Rocky Point has a separate master bedroom", fit: "Take two side by side." },
    { name: "COMO Villa", count: "1", bedrooms: "3", sleeps: "6", inside: "Two balconies, private infinity pool, al fresco dining, full kitchen", fit: "Bookable online with COMO's night offers." },
    { name: "Tamarind Guest Villa", count: "1", bedrooms: "2", sleeps: "4 incl. up to 2 children", inside: "247 m², a guest bathroom and an expansive dining area", fit: "A small branch." },
    { name: "Family Beach House", count: "Ask us", bedrooms: "1 king, 2 twin", sleeps: "4", inside: "165 m² on the beach with its own pool", fit: "Grandparents beside a residence." },
  ],
  videos: [],
  seoTitle: "COMO Parrot Cay for Families: Private Residences & Villas | Wild & Co Gatherings",
  metaDescription: "COMO Parrot Cay for family gatherings: eleven private residences of 2–8 bedrooms on a 1,000-acre Turks & Caicos island, each with pool and butler, plus Play by COMO.",
  credit: "Images courtesy of COMO Hotels and Resorts",
};
