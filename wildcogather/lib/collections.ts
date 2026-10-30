// Gatherings VIP collections — groups of houses that carry the VIP stamp (Vetted in Purpose).
import type { Video } from "./types";
import { londoloziFilms, LZ } from "./sample-londolozi";

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
  // Heading over the "protects" cards; defaults to "What your stay protects" / "Living laboratories".
  protectsEyebrow?: string; protectsTitle?: string;
  // The property's own films, shown as click-to-load stills (components/Film).
  films?: Video[];
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
  {
    // James, 30 Oct 2026: yes to Gatherings VIP; "Kwandwe is vetted partner". He has not visited, so no visit route.
    // Facts only from kwandwe.com (our purpose, giving back) and Classic Portfolio (The Long Run), as used in lib/sample-kwandwe.ts.
    // The second intro paragraph is new James-voice copy and carries the draft marker until he approves it.
    slug: "kwandwe", name: "Kwandwe Private Game Reserve", region: "Eastern Cape, South Africa", status: "VIP · vetted partner",
    tagline: "30,000 hectares of Eastern Cape farmland returned to wildlife, and three villas booked by one family at a time. Every night helps keep it wild.",
    intro: [
      "Kwandwe was farmland. Its 30,000 hectares in the Great Fish River valley have been returned to wildlife, and more than 7,000 animals brought back — elephant, black and white rhino, hippo, lion, leopard, brown hyena, and cheetah for the first time since 1888.",
      "I've vetted Kwandwe as a partner but haven't stayed yet, so its three villas carry the Vetted partner stamp until I have. [Draft — J.W. to approve]",
    ],
    hero: { publicId: "wildco/south-africa/eastern-cape/kwandwe/kwandwe-elephants-drinking", alt: "Elephants drinking at Kwandwe Private Game Reserve in the Eastern Cape" },
    facts: [
      ["Land", "30,000 ha of farmland returned to wildlife"],
      ["Stays", "Fort House · Melton Manor · Uplands Homestead"],
      ["Children", "All ages in the villas · malaria free"],
      ["Community", "Ubunye Foundation in 9 communities · 350+ people employed"],
      ["Member", "The Long Run"],
      ["Status", "VIP · Vetted in Purpose · vetted partner, not yet visited"],
    ],
    protects: [
      { name: "Black and white rhino", text: "Both species are among the more than 7,000 animals reintroduced to Kwandwe, with elephant, hippo, lion, leopard and brown hyena.", image: { publicId: "wildco/south-africa/eastern-cape/kwandwe/kwandwe-rhino-mother-calf", alt: "A rhino mother and calf grazing at Kwandwe" } },
      { name: "Cheetah and the small cats", text: "Cheetah are back on this land for the first time since 1888, and serval, African wildcat and the small spotted cat have been reintroduced.", image: { publicId: "wildco/south-africa/eastern-cape/kwandwe/kwandwe-cheetah", alt: "A cheetah at Kwandwe Private Game Reserve" } },
      { name: "Thicket", text: "More than 13,000 hectares of thicket on the reserve store about 520,000 tonnes of carbon.", image: { publicId: "wildco/south-africa/eastern-cape/kwandwe/kwandwe-great-fish-river", alt: "The Great Fish River winding through the valley at Kwandwe" } },
      { name: "Kwandwe Rhino Conservation Trust", text: "Every guest night carries a levy shared between the Trust, the Ubunye Foundation and the care of the reserve.", image: { publicId: "wildco/south-africa/eastern-cape/kwandwe/kwandwe-rhino-conservation", alt: "Guests helping researchers and guides with a sedated rhino at Kwandwe" } },
    ],
    stampNote: "J.W. · Vetted partner",
    credit: "Images courtesy of Kwandwe Private Game Reserve",
    seoTitle: "Kwandwe for Families: Fort House, Melton Manor & Uplands | Wild & Co Gatherings",
    metaDescription: "James Wild's guide to Kwandwe Private Game Reserve for family gatherings: three malaria-free, exclusive-use villas in South Africa's Eastern Cape, and the wildlife each stay helps protect.",
  },
  {
    // James, 30 Oct 2026: "add Pioneer and the Granite Suites (both bookable whole) to Gatherings, as we did with Kwandwe's villas.
    // Yes in detail and with videos embedded." The property page for the two camps, mirroring /vip/kwandwe.
    // Facts only from Londolozi's own pages, fact sheets (2023) and blog (2025). No route: no schedule was briefed.
    // The second intro paragraph is new James-voice copy and carries the draft marker until he approves it.
    slug: "londolozi", name: "Londolozi Game Reserve", region: "Sabi Sand, South Africa", status: "VIP · founder stayed 2018",
    tagline: "The Varty family's reserve on the Sand River, unfenced to Kruger — and two camps a family can book whole.",
    intro: [
      "Londolozi is owned and run by the Varty family, and its story begins in 1926 with a hunting camp called Sparta. It lies on the Sand River in the western Sabi Sand, unfenced to Kruger National Park, and in 1993 it became the first safari camp in Africa to join Relais & Châteaux.",
      "I stayed at Londolozi in 2018 with my daughter and toured every room. Two of its camps can be booked whole by one family: Pioneer, for up to 12, and the Private Granite Suites, for six. [Draft — J.W. to approve]",
    ],
    hero: { publicId: LZ + "leopard-cubs-in-tree", alt: "Leopard cubs in a tree at Londolozi Game Reserve, Sabi Sand" },
    facts: [
      ["Family", "Owned and run by the Varty family · the story begins in 1926 (Sparta hunting camp)"],
      ["Land", "On the Sand River, western Sabi Sand · unfenced to Kruger National Park"],
      ["Stays", "Pioneer Camp (up to 12) · Private Granite Suites (six)"],
      ["Leopards", "75–100 sightings a month, Londolozi reports"],
      ["Children", "From 6 at Varty, Founders and Pioneer · Cubs Den programme"],
      ["Malaria", "Low-risk area"],
      ["Access", "Light aircraft to Londolozi's own airstrip"],
      ["Member", "Relais & Châteaux since 1993 — the first safari camp in Africa to join"],
      ["Status", "Founder stayed 2018 · Founder Favorite"],
    ],
    protectsEyebrow: "The reserve",
    protectsTitle: "Londolozi for a family",
    protects: [
      { name: "Leopards", text: "Londolozi reports 75–100 leopard sightings a month; guests usually see two or three leopards in three nights.", image: { publicId: LZ + "leopard-cubs-in-tree", alt: "Leopard cubs in a tree at Londolozi" } },
      { name: "Your own Land Rover", text: "Families book a private Land Rover for their drives.", image: { publicId: LZ + "children-tracking", alt: "Children tracking at Londolozi" } },
      { name: "Cubs Den", text: "Londolozi's children's programme, with a full-time facilitator. Children are welcome from six at Varty, Founders and Pioneer.", image: { publicId: LZ + "cubs-den", alt: "The Cubs Den children's programme at Londolozi" } },
      { name: "The Healing House", text: "Massage, reiki and sound therapy at Varty Camp, and daily yoga on a deck in a 500-year-old ebony tree.", image: { publicId: LZ + "healing-house-river", alt: "The Healing House above the river at Londolozi" } },
    ],
    films: [londoloziFilms.reserve, londoloziFilms.healing, londoloziFilms.power],
    stampNote: "J.W. · Founder stayed 2018",
    credit: "Photographs courtesy of Londolozi · films by Londolozi",
    seoTitle: "Londolozi for Families: Pioneer Camp & Private Granite Suites | Wild & Co Gatherings",
    metaDescription: "James Wild's guide to Londolozi Game Reserve in the Sabi Sand for family gatherings: Pioneer Camp for up to 12 and the Private Granite Suites for six, each booked whole.",
  },
];
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

// ——— Property collections: a partner's houses grouped on one page, with their pairings, films and family FAQs ———
// A property collection with `vip: true` is a Gatherings VIP collection: its canonical page is /vip/[slug], with the VIP
// stamp, the Vetted in Purpose meaning and VIP styling, and /collections/[slug] redirects there permanently.
// One without `vip` stays a plain page at /collections/[slug], with no VIP stamp.
// James, 30 Oct 2026: "list all as vip" — Gatherings VIP approved for all five MORE villas (alongside Kwandwe and Londolozi).
// Houses are listed by slug, so the page shows only those whose Airtable rows are visible (Approved, Live or Vetting).
export type PropertyCollection = {
  slug: string; name: string; partner: string; region: string; tagline: string; intro: string[];
  hero: { publicId: string; alt: string };
  facts: [string, string][];
  houses: string[]; // house slugs, in display order
  films?: Video[];
  credit: string; seoTitle: string; metaDescription: string;
  // Gatherings VIP (Vetted in Purpose). Approved by James only; never set on a guess.
  vip?: true;
  status?: string; // the line on the /vip index card, e.g. "VIP · founder stayed 2018"
  stampNote?: string; // the note on the hero VIP stamp
};

export const propertyCollections: PropertyCollection[] = [
  {
    // James, 30 Oct 2026: "Villas by brand … for families and gatherings, build also with connections and cross sell."
    // James approved Gatherings VIP for all five villas on 30 Oct 2026 ("list all as vip"): canonical page /vip/more.
    // He stayed at Lion Sands Ivory Lodge, Monwana and Cape Cadogan in May 2026; Marataba is a vetted partner, not yet visited.
    // Facts from MORE's villas, FAQ, location and story pages (30 Oct 2026). The second intro paragraph is James's voice.
    slug: "more", name: "The MORE Villas", partner: "MORE Family Collection", region: "South Africa",
    vip: true, status: "VIP · Lion Sands, Monwana & Cape Cadogan inspected May 2026", stampNote: "J.W. · Stayed May 2026",
    tagline: "Five exclusive-use villas from one family-run South African collection — four in the bush, one below Table Mountain — each booked whole, with its own team.",
    intro: [
      "MORE began in 1933, when Guy Aubrey Chalkley bought Kingston Farm on the Sabie River. The family now runs Lion Sands, Marataba, Monwana and Cape Cadogan, and keeps one villa at each for families who want the house to themselves.",
      "Miriam and I stayed at Lion Sands Ivory Lodge and at Monwana in May 2026, and I stayed at Cape Cadogan. MORE is my favourite partner in South Africa, and these villas are how I would put a family into its country. [Draft — J.W. to approve]",
    ],
    hero: { publicId: "gatherings/monwana-villa-thornybush/monwana-villa-pool-elephants", alt: "Monwana Villa's pool overlooking the bush in Thornybush, with elephants at the waterhole" },
    facts: [
      ["Villas", "Fish Eagle · Hinkwenu (Lion Sands) · Marataba · Monwana · Cape Cadogan"],
      ["Sleeps", "6 to 10 guests per villa; Marataba Villa takes 10"],
      ["Children", "All ages at the Lion Sands villas and Monwana Villa; young children welcome at Marataba Villa"],
      ["Kids", "Mack & Madi (Lion Sands, Marataba, Cape Cadogan) · Mosaba Rangers (Monwana)"],
      ["Malaria", "Marataba malaria-free · Thornybush low-risk · Lion Sands moderate-risk"],
      ["Partner", "MORE Family Collection · Matt Smith, host for Lion Sands Ivory Lodge"],
      ["Status", "VIP · Vetted in Purpose · Lion Sands, Monwana and Cape Cadogan founder inspected & approved, May 2026 · Marataba vetted partner"],
    ],
    houses: ["fish-eagle-villa-lion-sands", "hinkwenu-villa-lion-sands", "marataba-villa-marakele", "monwana-villa-thornybush", "cape-cadogan-villa-cape-town"],
    films: [{ provider: "youtube", id: "YR_8uiBObZ4", title: "Wild Together: My Wife's First Safari — Monwana Lodge, Thornybush, South Africa", description: "James and Miriam Wild at Monwana Villa in the Thornybush Nature Reserve, Greater Kruger.", credit: "Wild Together · James & Miriam" }],
    credit: "Photographs courtesy of MORE",
    seoTitle: "MORE Villas for Families: Lion Sands, Marataba, Monwana & Cape Town | Wild & Co Gatherings",
    metaDescription: "Five exclusive-use MORE villas in South Africa for multigenerational families: Fish Eagle and Hinkwenu at Lion Sands, Marataba, Monwana and Cape Cadogan in Cape Town.",
  },
];
export const getPropertyCollection = (slug: string) => propertyCollections.find((c) => c.slug === slug);
export const vipPropertyCollections = propertyCollections.filter((c) => c.vip);
/** The canonical path of a property collection: /vip/[slug] for a Gatherings VIP collection, else /collections/[slug]. */
export const collectionPath = (c: Pick<PropertyCollection, "slug" | "vip">) => (c.vip ? `/vip/${c.slug}` : `/collections/${c.slug}`);
