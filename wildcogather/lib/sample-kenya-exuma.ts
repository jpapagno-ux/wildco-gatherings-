import type { SampleResidence } from "./sample-settings";

// ——— Kenya (Cottar's, Lewa House) and the Exumas (Baymahni) — added Oct 2026 ———
// Evidence from James (14 Oct 2026): Cottar's and Lewa House — founder inspected & approved (date to confirm);
// Baymahni — stayed in 2023, when the resort was Kahari, on a Reef Ball Foundation trip in the Exumas.
// Facts below come from the sources noted beside each house; where sources disagree the detail is left out
// until the house confirms it. Photos to come from James's Dropbox (gatherings/<slug>/ in Cloudinary).
// Verdicts and quotes are drafts in James's voice for his approval.
const formula = (notes: [string, boolean][]) =>
  ["Room to gather", "A day for every age", "Water within reach", "Country at the door", "A resort behind you", "Worth returning to"].map((test, i) => ({ test, note: notes[i][0], pass: notes[i][1] }));
const ke = { power: "240V · type G", timeZone: "UTC+3 · EAT" };

export const kenyaExumaResidences: SampleResidence[] = [
  // Sources: aardvarksafaris.com (Cottar's Bush Villa, family), scottdunn.com (Cottar's 1920 Camp), travelbutlers.com (Cottar's 1920s Safari Camp) — Oct 2026.
  {
    slug: "cottars-bush-villa-maasai-mara", entryNo: "G-021", name: "Cottar's Bush Villa, Maasai Mara", place: "Olderkesi Conservancy, Maasai Mara", region: "Narok County", country: "Kenya",
    status: "Approved", stamp: "Founder inspected & approved", setting: "savanna",
    notes: { ...ke, bestSeason: "Dry season Jul–Oct for the Mara at its fullest; Jan–Feb is also dry" },
    line: "A five-bedroom private house beside Cottar's 1920s Camp on the Kenya–Tanzania border — its own 25-metre pool, its own guide and vehicle, and a concession where night drives and bush walks are allowed.",
    verdict: [
      "Cottar's is the old safari done properly: white canvas, 1920s campaign furniture and guides who know this border country. The Bush Villa gives a whole family that spirit with a door of its own.",
      "It sits outside the national reserve, which is the point for families — you can walk, drive at night and stop where you like, and the Serengeti is the view across the border.",
    ],
    bestFor: "Three generations of up to ten who want the Maasai Mara with a private house, pool and guide, and the freedom to walk and drive at night",
    notFor: "Not for a family that wants the river-crossing crowds on the doorstep — the concession is quiet by design, and the main reserve is a drive away.",
    bedrooms: "5 en-suite bedrooms · up to 5 extra children's beds", sleeps: 10,
    kidsProgram: "Maasai warrior school, foraging walks, beading, village visits and wild movie nights", kidsAges: "All ages",
    water: "Private 25-metre pool and wood-fired hot tub; seasonal waterfall swimming nearby", seasons: ["Year-round"],
    airport: "Cottar's own airstrip, about 10 minutes' drive from camp (charter and scheduled light aircraft), or Keekorok airstrip, about 1.5 hours by road",
    formula: formula([
      ["Five en-suite bedrooms, one living and dining room, one deck — exclusive use for up to ten.", true],
      ["Warrior school, foraging walks and movie nights for children; walking and night drives for the adults.", true],
      ["A 25-metre private pool and a wood-fired hot tub.", true],
      ["A private concession beside the Maasai Mara, looking across to the Serengeti.", true],
      ["A dedicated team of eight, with Cottar's 1920s Camp next door.", true],
      ["James inspected and approved it for the Ledger.", true],
    ]),
    fieldNotes: [
      "Ask for a night drive — the concession allows them, the national reserve does not.",
      "Children can eat early and on their own menu; a nanny can be arranged.",
      "The Camp's family tents (two bedrooms each) can take an overflow branch.",
      "Balloon safaris are available at extra cost.",
    ],
    manifest: [],
    experiences: [
      { name: "Day and night game drives", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Lion, cheetah, elephant and buffalo, with the house's own guide and vehicle — and after dark, which the concession permits." },
      { name: "Walking safaris", category: "On the land", ages: ["Older children and adults"], seasons: ["Year-round"], description: "Tracks and birdsong on foot with a guide — something the main reserve does not allow." },
      { name: "Maasai warrior school", category: "The young ones", ages: ["Children"], seasons: ["Year-round"], description: "Spear-throwing, tracking and stories with Maasai guides — the morning children talk about for years." },
      { name: "Village and school visits", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "A visit to a local Maasai village and school, arranged by the camp." },
    ],
    faqs: [
      { question: "Is Cottar's Bush Villa good for a multigenerational safari?", answer: "Yes. It is an exclusive-use house of five en-suite bedrooms for up to ten guests, with up to five extra beds for children, its own 25-metre pool, a wood-fired hot tub, and a dedicated team, guide and vehicle. Children of all ages are welcome." },
      { question: "Can you do night drives and walks at Cottar's?", answer: "Yes. Cottar's sits on a private concession outside the Maasai Mara National Reserve, where night game drives and guided walking safaris are allowed — neither is permitted inside the national reserve." },
      { question: "How do you get to Cottar's Bush Villa?", answer: "By light aircraft. Cottar's has its own airstrip about ten minutes from camp for charter and scheduled flights; Keekorok airstrip is about an hour and a half away by road." },
    ],
    images: [],
    rooms: [
      { name: "The Bush Villa, whole", count: "1", bedrooms: "5", sleeps: "10 + up to 5 children", inside: "Five en-suite bedrooms, living and dining room, deck, 25-metre pool, wood-fired hot tub", fit: "The whole family under one roof.", whole: true },
      { name: "Family tents at the Camp", count: "4", bedrooms: "2 each", inside: "Two bedrooms and a sitting room with a fireplace, at Cottar's 1920s Camp next door", fit: "For the branch that wants canvas." },
    ],
    videos: [],
    seoTitle: "Cottar's Bush Villa, Maasai Mara: Family Safari House | Wild & Co Gatherings",
    metaDescription: "Cottar's Bush Villa: a private five-bedroom safari house beside Cottar's 1920s Camp in the Maasai Mara, with its own pool, guide and vehicle. Founder inspected & approved.",
    credit: "",
  },

  // Sources: yellowzebrasafaris.com, mahlatini.com, porini.com (Lewa House) — Oct 2026. Room counts differ between sources; confirm with the house.
  {
    slug: "lewa-house-kenya", entryNo: "G-022", name: "Lewa House, Lewa Conservancy", place: "Lewa Wildlife Conservancy", region: "Laikipia", country: "Kenya",
    status: "Approved", stamp: "Founder inspected & approved", setting: "savanna",
    host: { name: "Sophie and Calum MacFarlane", title: "Hosts, Lewa House", note: "Lewa House is their family home and farm. Calum is a qualified trails guide and walks with guests; the two of them host dinner." },
    notes: { ...ke, bestSeason: "Open year-round; the dry months Jan–Mar and Jun–Oct are best for game" },
    line: "A family-run farmhouse lodge in the Lewa Wildlife Conservancy, with Mount Kenya on the horizon — family cottages, horses and camels, a warm pool over a waterhole, and hosts who guide you themselves.",
    verdict: [
      "Lewa House feels like staying with friends who happen to live among rhino. Sophie and Calum run it as their home, and a family slots into it as easily as it would into a farmhouse at harvest.",
      "Book the family cottages together and the whole place is yours: riding in the morning, a walk with Calum after lunch and dinner at one table.",
    ],
    bestFor: "Families with children of all ages who want a hands-on, home-hosted safari — riding, walking and game drives on a conservancy known for rhino",
    notFor: "Not for a family that wants a polished hotel; this is a home on a working farm, unfenced, with escorts after dark.",
    bedrooms: "Family cottages and earth pods — the cottages can be booked together for a group", kidsAges: "All ages",
    kidsProgram: "Family activities, horse and camel riding, farm and back-of-house tours",
    water: "A free-form pool overlooking a waterhole", seasons: ["Year-round"],
    airport: "Lewa airstrip, by scheduled or charter light aircraft from Nairobi",
    formula: formula([
      ["Family cottages that can be taken together, around one dining table hosted by the owners.", true],
      ["Riding and camels for the young, walking with Calum for the keen, game drives for everyone.", true],
      ["A warm pool above a waterhole.", true],
      ["The Lewa Wildlife Conservancy, with elephant and rhino, and Mount Kenya in view.", true],
      ["An owner-run house: kitchen garden, guides and staff, all inclusive.", true],
      ["James inspected and approved it for the Ledger.", true],
    ]),
    fieldNotes: [
      "Ask to walk with Calum — he is a qualified trails guide.",
      "Book the family cottages together for exclusive use.",
      "The house is unfenced: staff escort guests after dark.",
      "Meals use the farm's own garden; give dietary needs ahead.",
    ],
    manifest: [],
    experiences: [
      { name: "Game drives on Lewa", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Elephant and rhino are the reason families come; guides know the conservancy by heart." },
      { name: "Horse and camel riding", category: "On the land", ages: ["Ages set by the house"], seasons: ["Year-round"], description: "Riding out across the farm and conservancy — the morning children remember." },
      { name: "Walking with Calum", category: "On the land", ages: ["Older children and adults"], seasons: ["Year-round"], description: "A guided game walk with the owner, a qualified trails guide." },
      { name: "Biplane and scenic flights", category: "Together", ages: ["Ages set by the pilot"], seasons: ["Weather permitting"], description: "Mount Kenya and the conservancy from the air." },
    ],
    faqs: [
      { question: "Is Lewa House good for families with young children?", answer: "Yes. Children of all ages are welcome, there are family cottages and family activities, and riding, camels and farm tours keep younger children busy. The house is unfenced in a wildlife area, so staff escort guests after dark." },
      { question: "Can we book Lewa House exclusively?", answer: "The family cottages can be booked exclusively for a larger group. Ask us for the current layout and room count for your party." },
      { question: "What is the Lewa Wildlife Conservancy known for?", answer: "Rhino and elephant. Lewa is a large private conservancy in Kenya's north, with views of Mount Kenya, and game drives there regularly find both." },
    ],
    images: [],
    rooms: [],
    videos: [],
    seoTitle: "Lewa House, Lewa Conservancy: Family Safari in Kenya | Wild & Co Gatherings",
    metaDescription: "Lewa House: a family-run safari house in Kenya's Lewa Wildlife Conservancy — family cottages, riding, walks with the owner and a pool above a waterhole. Founder inspected & approved.",
    credit: "",
  },

  // Sources: hospitalitynet.org (Baymahni, 2025: former Kahari site, 14 two-bedroom beach bungalows renovated, 13 villas under construction),
  // baymahni.com, suiteness.com, bahamas.com (Kahari Resort) — Oct 2026. Exact counts to confirm with the resort.
  {
    slug: "baymahni-exuma", entryNo: "G-023", name: "Baymahni, Stocking Island", place: "Stocking Island, Great Exuma", region: "The Exumas", country: "Bahamas",
    status: "Approved", stamp: "Founder inspected & approved", firstVisited: "2023", setting: "coast",
    notes: { bestSeason: "Dec–May, the dry season; hurricane season runs Jun–Nov", power: "120V · type A/B", timeZone: "Eastern Time (ET)" },
    line: "Two-bedroom beach bungalows on a barrier island across the harbour from George Town — a private lagoon and dock, a beach club, and the reefs, sandbars and turtles of the Exumas a boat ride away.",
    verdict: [
      "I stayed here in 2023, when it was still Kahari, on a trip with the Reef Ball Foundation — and came home thinking every family should see a reef being rebuilt.",
      "It has since been renovated and enlarged as Baymahni, with a new restaurant, bar and pool. The island and the water around it are why it is in the Ledger.",
    ],
    bestFor: "Families who want a barefoot island week — two-bedroom bungalows on the beach, a lagoon for paddling and boat days around the Exumas",
    notFor: "Not for a family that wants a big-resort kids' club; this is a small island resort, and the boat ride to George Town is part of every outing.",
    bedrooms: "Two-bedroom beach and lagoon bungalows, plus new private villas", kidsAges: "All ages",
    water: "Beach, private lagoon and dock; kayaks, paddleboards, snorkelling and water bikes", seasons: ["Year-round"],
    airport: "Exuma International (GGT), then by road to George Town and a short boat ride across Elizabeth Harbour",
    formula: formula([
      ["Two-bedroom bungalows side by side on the beach, and new private villas.", true],
      ["Paddling and snorkelling for the young; boat days, fishing and reefs for the rest.", true],
      ["On the beach, with its own lagoon and dock.", true],
      ["Stocking Island and the Exuma cays: sandbars, reefs and sea turtles.", true],
      ["A resort team, beach club and restaurant behind you.", true],
      ["James stayed in 2023 and would send his own family back.", true],
    ]),
    fieldNotes: [
      "Book adjoining bungalows so each branch has its own door on the same beach.",
      "Plan one boat day to the sandbars and one to snorkel — the concierge arranges captains.",
      "Go December to May; June to November is hurricane season.",
      "Ask about reef restoration in the Exumas — it makes a morning of snorkelling mean something.",
    ],
    manifest: [],
    experiences: [
      { name: "Snorkelling the reefs", category: "On the water", ages: ["Confident swimmers"], seasons: ["Year-round"], description: "Coral heads and reef fish a short boat ride from the dock." },
      { name: "Sandbars and sea turtles", category: "On the water", ages: ["All ages"], seasons: ["Year-round"], description: "A captained boat day around the Exuma cays — sandbars at low tide and turtles in the shallows." },
      { name: "Paddling the lagoon", category: "On the water", ages: ["All ages"], seasons: ["Year-round"], description: "Kayaks, paddleboards and water bikes from the resort's own beach." },
    ],
    faqs: [
      { question: "Is Baymahni the same resort as Kahari?", answer: "Yes. Baymahni stands on the former Kahari Resort site on Stocking Island, with 40 adjacent acres, renovated and expanded with new villas, a restaurant, bar and pool. Kahari was itself once called Lumina Point." },
      { question: "How do you get to Baymahni on Stocking Island?", answer: "Fly into Exuma International Airport (GGT), drive to George Town, then take the short boat ride across Elizabeth Harbour to Stocking Island." },
      { question: "Is Baymahni good for families?", answer: "For families who love the water, yes: two-bedroom bungalows on the beach, a private lagoon for paddling, and snorkelling, sandbars and turtles nearby. It is a small island resort rather than a large one with a kids' club." },
    ],
    images: [],
    rooms: [],
    videos: [],
    seoTitle: "Baymahni, Exuma: Beach Bungalows on Stocking Island | Wild & Co Gatherings",
    metaDescription: "Baymahni on Stocking Island, Exuma — formerly Kahari: two-bedroom beach bungalows, a private lagoon, and reefs, sandbars and turtles nearby. James stayed in 2023.",
    credit: "",
  },
];
