import type { SampleResidence } from "./sample-settings";

// ——— .Here — Somewhere & Nowhere, Baa Atoll, Maldives (G-018) ———
// Moved from On the Horizon (H-01) into the Ledger, Oct 2026: J.W. vetted it and met the host (host name to add).
// Brand-approved photos for Wild & Co as wholesale tour operator, in Cloudinary under gatherings/here-maldives/.
const H = "gatherings/here-maldives/";

export const hereResidences: SampleResidence[] = [
  {
    slug: "here-somewhere-nowhere-maldives", entryNo: "G-018", name: ".Here — Somewhere & Nowhere", place: "Baa Atoll", region: "Baa Atoll", country: "Maldives",
    lat: 5.03, lng: 73.0, status: "Approved", stamp: "Host met", setting: "coast",
    notes: { bestSeason: "Dry season Dec–Apr · manta season at Hanifaru Bay Jun–Nov", power: "230V · type G", timeZone: "UTC+5 · MVT" },
    line: "Two tiny private islands beside Finolhu in Baa Atoll — three- and four-bedroom beach residences on Somewhere, and a five-bedroom island of your own on Nowhere.",
    verdict: [
      "For years I've told families the Maldives means splitting up into separate villas. .Here is the first place I've seen that fixes that: the whole branch under one roof, a private jetty, and the kids' clubs a short boat ride away at Finolhu.",
      "Take Nowhere and the island is yours — up to twenty-four people, one long pool and one beach.",
    ],
    bestFor: "Three generations who want one house, a private beach and a proper kids' club next door",
    notFor: "Not for a family on a budget, or anyone who wants a big-resort buzz on their own island.",
    bedrooms: "Somewhere: five 3-bedroom and two 4-bedroom residences · Nowhere: 5-bedroom Presidential", sleeps: 24, units: 9,
    kidsProgram: "Kids' club for under-12s and a teens' club with a music studio at Finolhu, next door", kidsAges: "all ages",
    water: "Private jetties, sky infinity pools up to about 45 m, a 28 m pool on Nowhere, and the reefs of a UNESCO Biosphere Reserve", seasons: ["Year-round"],
    airport: "Malé (MLE) · 30 min by seaplane",
    formula: ["Room to gather", "A day for every age", "Water within reach", "Country at the door", "A resort behind you", "Worth returning to"].map((test, i) => ({ test, note: ["Three- to five-bedroom residences; a whole island on Nowhere.", "Kids' and teens' clubs at Finolhu next door.", "Private jetties, sky pools, the lagoon and the reef.", "Baa Atoll is a UNESCO Biosphere Reserve — mantas at Hanifaru Bay.", "SAFAR, Fehi Wellness, a Roohu for every guest, and Finolhu beside you.", "A family reunion island to come back to."][i], pass: true })),
    fieldNotes: ["Go June to November for the mantas at Hanifaru Bay.", "Ask your Roohu for a sandbank lunch after the mantas.", "Book ASMAS for a golden-hour sail with dinner on board.", "Take Nowhere whole for a reunion of up to 24."],
    manifest: [],
    experiences: [
      { name: "Hanifaru Bay mantas", category: "On the water", ages: ["Swimmers"], seasons: ["Jun–Nov"], description: "Manta rays in Hanifaru Bay, a protected bay in Baa Atoll — timed to when the mantas gather, and led by marine guides.", image: { publicId: H + "hanifaru-bay-manta-ray", alt: "Manta ray at Hanifaru Bay, Baa Atoll" } },
      { name: "Reef diving & snorkelling", category: "On the water", ages: ["Snorkellers and certified divers"], seasons: ["Year-round"], description: "Guided dives and snorkels over Baa Atoll's coral gardens, from easy drifts over the reef to deeper descents.", image: { publicId: H + "baa-atoll-reef-diving", alt: "Reef diving in Baa Atoll from .Here" } },
      { name: "ASMAS, the private boat", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "A private boat with its own crew: lagoon drifts, sandbank escapes, sunset sails, dolphin trips and dinner on board.", image: { publicId: H + "asmas-private-yacht", alt: "ASMAS, .Here's private boat for sunset sails and sandbank days" } },
      { name: "A sandbank of your own", category: "Together", ages: ["All ages"], seasons: ["Tide and season permitting"], description: "Lunch for the whole family on a secluded sandbank, planned by your Roohu.", image: { publicId: H + "private-sandbank-lunch", alt: "A private sandbank in Baa Atoll, .Here Maldives" } },
      { name: "Finolhu next door", category: "For the young ones", ages: ["Under-12s", "Teens"], seasons: ["Year-round"], description: "A kids' club for under-12s, a teens' club with consoles and a music studio, and a kilometre-long sandbank.", image: { publicId: H + "finolhu-boat", alt: "Boat to Finolhu, .Here's sister island" } },
      { name: "Fehi Wellness", category: "Together", ages: ["Adults"], seasons: ["Year-round"], description: "Massage and spa treatments for whoever needs the afternoon off.", image: { publicId: H + "fehi-wellness-spa", alt: "Fehi Wellness spa treatment at .Here Maldives" } },
    ],
    faqs: [
      { question: "Is .Here in the Maldives good for families?", answer: "Yes. It is built for groups: seven three- and four-bedroom residences on Somewhere and a five-bedroom Presidential island on Nowhere, sleeping up to 24. The kids' club for under-12s and a teens' club are next door at Finolhu, arranged with your stay." },
      { question: "How big are the residences at .Here Maldives?", answer: "Somewhere has five three-bedroom and two four-bedroom beach residences, sleeping up to 8 or 11 adults, each with a private jetty and a sky infinity pool. Nowhere's Presidential Residence has five bedrooms, a 28-metre pool and a private beach for up to 24." },
      { question: "Can a family book a whole island at .Here?", answer: "Yes. Nowhere is booked as a whole island, and either island — or both — can be bought out, so a reunion has its own beach, pool and team." },
      { question: "How do you get to .Here in Baa Atoll?", answer: "Fly into Malé's Velana International Airport, then take a 30-minute seaplane over Baa Atoll, a UNESCO Biosphere Reserve." },
    ],
    images: [
      { publicId: H + "here-islands-aerial-baa-atoll", alt: "Aerial view of .Here's two private islands in Baa Atoll, Maldives", caption: "Two islands in Baa Atoll", role: "Hero" },
      { publicId: H + "somewhere-island-beach-residence", alt: "Two-storey beach residence on Somewhere island, .Here Maldives", caption: "A beach residence on Somewhere", role: "Card" },
      { publicId: H + "nowhere-beach-residence-full", alt: "Beach residence on Nowhere private island, .Here Maldives", caption: "Nowhere, an island of your own", role: "Feature" },
      { publicId: H + "somewhere-residence-sky-pool", alt: "Sky pool of a four-bedroom residence on Somewhere, .Here", caption: "The sky pool", role: "Gallery strip" },
      { publicId: H + "somewhere-residence-family-dinner-table", alt: "Dinner table for the whole family in a four-bedroom residence, .Here", caption: "One table for everyone", role: "Gallery strip" },
      { publicId: H + "somewhere-residence-living-room", alt: "Living room of a four-bedroom residence on Somewhere, .Here", caption: "The living room", role: "Gallery strip" },
      { publicId: H + "somewhere-residence-private-jetty", alt: "Private jetty of a residence at .Here Maldives", caption: "Your own jetty", role: "Gallery strip" },
      { publicId: H + "somewhere-residence-lagoon-terrace", alt: "Lagoon-side terrace of a four-bedroom residence on Somewhere", caption: "The lagoon terrace", role: "Gallery strip" },
      { publicId: H + "nowhere-private-island-aerial", alt: "Nowhere, the private island at .Here, from the air", caption: "Nowhere from the air", role: "Gallery strip" },
      { publicId: H + "thila-residence-terrace-nowhere", alt: "Terrace of the Thila residence on Nowhere, .Here Maldives", caption: "Thila terrace, Nowhere", role: "Gallery strip" },
      { publicId: H + "thila-residence-cinema", alt: "Private cinema in the Thila residence, .Here Maldives", caption: "The private cinema", role: "Gallery strip" },
      { publicId: H + "nowhere-master-bedroom", alt: "Master bedroom on Nowhere private island, .Here Maldives", caption: "The master bedroom", role: "Gallery strip" },
      { publicId: H + "safar-restaurant-overwater", alt: "SAFAR, the overwater restaurant at .Here Maldives", caption: "SAFAR, over the water", role: "Gallery strip" },
      { publicId: H + "here-beach-walk", alt: "Beach walk around the island at .Here Maldives", caption: "Around the island", role: "Gallery strip" },
      { publicId: H + "palms-and-milky-way", alt: "Palms under the Milky Way at .Here, Baa Atoll", caption: "Palms and the Milky Way", role: "Gallery strip" },
    ],
    booking: {
      plan: "", bookVia: "Wild & Co Gatherings — James arranges the residence, the seaplane and the children's days at Finolhu",
      wholeHouse: "Each residence is private; Nowhere is booked as a whole island; either island can be bought out",
      children: "All ages; kids' and teens' clubs at Finolhu next door",
      fees: [], included: ["A dedicated Roohu for every guest", "Private jetty and pool at every residence"], excluded: ["International flights", "Seaplane transfers"], checked: "Oct 2026",
    },
    rooms: [
      { name: "Somewhere — three-bedroom beach residence", count: "5", bedrooms: "3", sleeps: "Up to 8 adults", inside: "Two storeys, private jetty, sky infinity pool", fit: "One family, one house." },
      { name: "Somewhere — four-bedroom beach residence", count: "2", bedrooms: "4", sleeps: "Up to 11 adults", inside: "Two storeys, private jetty, sky infinity pool up to about 45 m", fit: "Three generations under one roof." },
      { name: "Nowhere — the whole island", count: "1 island", bedrooms: "5 (Presidential) + a second residence", sleeps: "Up to 24", inside: "28 m pool, private beach, private cinema, its own team", fit: "The reunion island.", whole: true },
    ],
    partner: { name: ".Here Maldives" },
    videos: [],
    seoTitle: ".Here Maldives — Private Island Residences for Families, Baa Atoll | Wild & Co Gatherings",
    metaDescription: "Three- to five-bedroom beach residences on two private islands in Baa Atoll, Maldives: private jetties and sky pools, a whole-island buyout for up to 24, kids' clubs next door at Finolhu.",
    credit: "Images courtesy of .Here Maldives",
  },
];
