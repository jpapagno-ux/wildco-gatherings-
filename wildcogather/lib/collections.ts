// Gatherings VIP collections — groups of houses that carry the VIP stamp (Vetted in Purpose).

export const VIP_MEANING = [
  { letter: "V", word: "Vetted", text: "James has walked it, questioned it and written down what he found — no brochure, no algorithm. A place is seen before it is sold." },
  { letter: "I", word: "In the land", text: "Guided from within, by the rangers, biologists and chefs who live and work there. Your family sees the place the way its keepers do." },
  { letter: "P", word: "Purpose", text: "Every night you stay helps keep the land wild — bison back on the grass, whales calving in a protected bay, a community's land in its own hands. The stay gives back more than it takes." },
];

export type Collection = {
  slug: string; name: string; region: string; tagline: string; intro: string[]; status: string;
  hero: { publicId: string; alt: string };
  facts: [string, string][];
  route?: { when: string; where: string; what: string }[];
  protects: { name: string; text: string; image: { publicId: string; alt: string } }[];
  journal?: string; routeLabel?: string; stampNote?: string; credit: string; seoTitle: string; metaDescription: string;
};

export const collections: Collection[] = [
  {
    slug: "ted-turner-reserves", name: "Ted Turner Reserves", region: "New Mexico", status: "VIP · approved",
    tagline: "More than a million acres of New Mexico, restored for wildlife and opened to a few families at a time. Four places to stay. One reason to go.",
    intro: [
      "Ted Turner spent decades buying land to give it back to the animals that belonged on it — bison, wolves, bighorn, a tortoise most people have never heard of. Four of those places now take guests, and every stay helps pay for the work.",
      "I've met the team behind all four, and every one is approved in the Ledger. I'm going back to see them in August 2027, timed for the bat flight at Armendaris. Here is why each one is in, and how I would take a family through them.",
    ],
    hero: { publicId: "gatherings/vermejo-ted-turner-reserve/castle-rock-bison-vermejo", alt: "Bison herd grazing below Castle Rock at Vermejo, a Ted Turner Reserve in New Mexico" },
    facts: [["Land", "1 million+ acres stewarded"], ["Stays", "Vermejo, Ladder, Armendaris, Sierra Grande"], ["Children", "Turner Trailblazers program"], ["Status", "VIP · Vetted in Purpose · visit Aug 2027"]],
    route: [
      { when: "Day 1", where: "Fly into El Paso or Albuquerque", what: "Drive to Sierra Grande · first soak" },
      { when: "Days 2–3", where: "Armendaris", what: "The Hacienda · Bat Flight at dusk · bighorn in the Fra Cristobal" },
      { when: "Days 4–5", where: "Ladder", what: "The Country House · slot canyon · the Mexican wolf program" },
      { when: "Day 6", where: "North on I-25", what: "Through Santa Fe to Raton" },
      { when: "Days 7–9", where: "Vermejo", what: "Casa Grande · lakes · bison · Via Ferrata" },
      { when: "Day 10", where: "Fly home", what: "Colorado Springs or Denver" },
    ],
    protects: [
      { name: "Mexican wolf", text: "Ladder runs the only private breeding and pre-release facility for Mexican wolves in the world, since 1997.", image: { publicId: "gatherings/ladder-ted-turner-reserve/mexican-wolf-ladder", alt: "Mexican wolf standing on rocks at Ladder Ranch" } },
      { name: "Desert bighorn", text: "Restored to the Fra Cristobal from 1995; New Mexico took the species off its endangered list in 2011.", image: { publicId: "gatherings/armendaris-ted-turner-reserve/desert-bighorn-armendaris", alt: "Desert bighorn sheep on a hill at Armendaris" } },
      { name: "Bolson tortoise", text: "North America's largest land tortoise, bred and head-started on Ladder and Armendaris.", image: { publicId: "gatherings/ted-turner-reserves/bolson-tortoise-ladder", alt: "Bolson tortoise walking at Ladder Ranch" } },
      { name: "Chiricahua leopard frog", text: "A threatened frog kept going in the wild and in captive breeding at Ladder.", image: { publicId: "gatherings/ted-turner-reserves/chiricahua-leopard-frog-ladder", alt: "Chiricahua leopard frog on sand" } },
    ],
    journal: "ted-turner-vision-guide-from-within",
    routeLabel: "J.W.'s visit · August 2027 · proposed route",
    credit: "Images courtesy of Ted Turner Reserves",
    seoTitle: "Ted Turner Reserves for Families: Vermejo, Ladder & More | Wild & Co Gatherings",
    metaDescription: "James Wild's guide to the four Ted Turner Reserves in New Mexico for family gatherings: where to stay, what's included, guide rates, and the wildlife each stay protects.",
  },
  {
    slug: "natural-selection-coast", name: "Natural Selection Coast", region: "South Africa's southern & eastern coasts", status: "VIP · approved",
    tagline: "Two lodges on two protected coasts — a whale nursery in De Hoop and a community-owned reserve on the Wild Coast. Every night helps keep them that way.",
    intro: [
      "Natural Selection builds its camps where a stay pays for the land around it. On the coast that means Lekkerwater, in front of a Marine Protected Area where southern right whales come to calve, and GweGwe, on a reserve owned by the seven villages that won it back.",
      "I've met the teams at both, and both are approved in the Ledger. Here is why each one is in, and how I would take a family to them.",
    ],
    hero: { publicId: "gatherings/lekkerwater-de-hoop/lekkerwater-lodge-beach-de-hoop", alt: "Lekkerwater Beach Lodge above six kilometres of empty beach in De Hoop Nature Reserve, Western Cape" },
    facts: [["Stays", "Lekkerwater (De Hoop) · GweGwe (Mkambati, Wild Coast)"], ["Children", "Lekkerwater 6+ · GweGwe all ages"], ["Protected", "De Hoop Marine Protected Area · Pondoland MPA"], ["Status", "VIP · Vetted in Purpose · approved"]],
    route: [
      { when: "Day 1", where: "Fly into Cape Town", what: "Drive three hours east into De Hoop" },
      { when: "Days 2–4", where: "Lekkerwater", what: "Whales from the deck (Aug–Oct) · rock pools · Potberg vultures" },
      { when: "Day 5", where: "Cape Town to the Wild Coast", what: "Fly east, then light aircraft or helicopter to Mkambati" },
      { when: "Days 6–8", where: "GweGwe", what: "Pool suites · beach waterfall · game drive with no dangerous game" },
      { when: "Day 9", where: "Fly home", what: "Via Durban or Johannesburg" },
    ],
    protects: [
      { name: "Southern right whale", text: "De Hoop's bay is one of the world's great right-whale nurseries; its marine reserve has been protected since 1985.", image: { publicId: "gatherings/lekkerwater-de-hoop/southern-right-whale-calf-de-hoop", alt: "Southern right whale calf lifting its tail off De Hoop" } },
      { name: "Cape vulture", text: "Both lodges sit near breeding colonies — Potberg, the Western Cape's last, and the Msikaba cliffs on the Wild Coast.", image: { publicId: "gatherings/gwegwe-beach-lodge-wild-coast/cape-vultures-msikaba", alt: "Cape vultures at the Msikaba River cliff colony, Mkambati" } },
      { name: "Fynbos", text: "Lekkerwater guests help pay to clear invasive black wattle and rooikrans from the Cape Floral Kingdom, a World Heritage Site.", image: { publicId: "gatherings/lekkerwater-de-hoop/rock-pool-walk-lekkerwater", alt: "Guests exploring rock pools on a guided marine walk at Lekkerwater" } },
      { name: "A community's land", text: "Mkambati belongs to the Mkambati Land Trust; park fees and 1% of GweGwe's turnover fund conservation and the villages, and an all-women ranger team patrols the reserve.", image: { publicId: "gatherings/gwegwe-beach-lodge-wild-coast/gwegwe-team-welcome", alt: "The GweGwe Beach Lodge team welcoming guests" } },
    ],
    routeLabel: "A whale-season route for a family",
    stampNote: "J.W. · Teams met",
    credit: "Images courtesy of Natural Selection",
    seoTitle: "Natural Selection Coast for Families — Lekkerwater & GweGwe | Wild & Co Gatherings",
    metaDescription: "James Wild's guide to two Natural Selection coast lodges for family gatherings: Lekkerwater in De Hoop for whales, and GweGwe on the Wild Coast for pool suites and children of all ages.",
  },
  {
    slug: "lewa-borana-landscape", name: "Lewa–Borana Landscape", region: "Laikipia, Kenya", status: "VIP · Lengishu on J.W.'s list",
    tagline: "Two conservancies with no fence between them — 93,000 acres of black rhino country below Mount Kenya. A family home on Lewa, a private residence on Borana.",
    intro: [
      "In 2014 the fence between Lewa and Borana came down, and two conservancies became one landscape for black rhino. A year earlier Borana had taken its founding population of 21, eleven of them from Lewa. A family that stays here is staying inside that story.",
      "Lewa House is a family home and farm in the middle of Lewa; I've inspected it and it's approved in the Ledger. Lengishu, on Borana, is the residence I'd book for a whole family — every stay goes to Borana's rhino and community projects. I haven't stayed there yet, so it is under observation until I have.",
    ],
    hero: { publicId: "gatherings/lengishu-borana/lengishu-lion-borana", alt: "A lion on the open plains of Borana Conservancy, with Mount Kenya on the horizon" },
    facts: [["Land", "93,000 acres · Lewa and Borana, unfenced since 2014"], ["Stays", "Lewa House (Lewa) · Lengishu (Borana)"], ["Children", "All ages at both"], ["Status", "VIP · Lewa House approved · Lengishu under observation"]],
    route: [
      { when: "Day 1", where: "Nairobi to Lewa", what: "Light aircraft to the Lewa airstrip · tea on the veranda at Lewa House" },
      { when: "Days 2–3", where: "Lewa House", what: "Game drives · bush breakfast · a walk with Calum · the farm" },
      { when: "Day 4", where: "Across the old fence line", what: "By road to Lengishu on Borana" },
      { when: "Days 5–7", where: "Lengishu", what: "Rhino tracking with the conservancy team · riding · sundowners over the pool" },
      { when: "Day 8", where: "Fly home", what: "Borana or Lewa Downs airstrip to Nairobi" },
    ],
    protects: [
      { name: "Black rhino", text: "The Lewa–Borana landscape is 93,000 acres of black rhino habitat; Borana's founding population of 21 arrived in 2013, eleven from Lewa and ten from Lake Nakuru.", image: { publicId: "gatherings/lengishu-borana/lengishu-rhino-tracking", alt: "A black rhino in dry grass on Borana, with a tracking team on foot in the distance" } },
      { name: "Borana's communities", text: "Lengishu's proceeds go to Borana Conservancy's rhino and community projects; the house runs on solar power and is built of local stone.", image: { publicId: "gatherings/lengishu-borana/lengishu-game-drive", alt: "A Lengishu guide at the wheel of an open safari vehicle on Borana" } },
      { name: "A working farm", text: "Lewa began as a farm and still feeds Lewa House; the staples are bought from neighbouring communities and the weekly market in Meru.", image: { publicId: "gatherings/lewa-house-kenya/lewa-house-17", alt: "A breakfast table laid on the lawn under acacia trees at Lewa House" } },
    ],
    routeLabel: "A proposed week for a family",
    stampNote: "J.W. · Lengishu on the list",
    credit: "Images courtesy of Lengishu, Wild Earth Stays and Lewa House",
    seoTitle: "Lewa & Borana for Families: Lewa House and Lengishu | Wild & Co Gatherings",
    metaDescription: "James Wild's guide to the Lewa–Borana landscape in Kenya for family gatherings: Lewa House on Lewa and the Lengishu residence on Borana — rhino tracking, riding and a week-long route.",
  },
];
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
