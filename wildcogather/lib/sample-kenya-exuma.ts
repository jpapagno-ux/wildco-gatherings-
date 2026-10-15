import type { SampleResidence } from "./sample-settings";

// ——— Kenya (Cottar's Bush Villa, Lewa House, Lengishu) and the Exumas (Baymahni) — added Oct 2026 ———
// Evidence from James (14 Oct 2026): Cottar's and Lewa House — founder inspected & approved (dates to confirm); James has
// worked with the Cottars since 2017. Baymahni — stayed in 2023, when the resort was Kahari, on a Reef Ball Foundation trip.
// Lengishu — not yet visited: on the list (Under observation) and the Gatherings VIP residence for the Lewa–Borana landscape.
// Facts come from the official sites (cottars.com/bush-villa, lewahouse.com/the-lodge, baymahni.com/rooms) and the
// Wild Earth Stays property pages, Oct 2026; where sources disagree the detail is left out until the house confirms it.
// Photos: gatherings/<slug>/ in Cloudinary, from the houses' own and Wild Earth Stays pages, used at James's direction (permission-james).
// Verdicts and quotes are drafts in James's voice for his approval.
const formula = (notes: [string, boolean][]) =>
  ["Room to gather", "A day for every age", "Water within reach", "Country at the door", "A resort behind you", "Worth returning to"].map((test, i) => ({ test, note: notes[i][0], pass: notes[i][1] }));
const ke = { power: "240V · type G", timeZone: "UTC+3 · EAT" };
const C = "gatherings/cottars-bush-villa-maasai-mara/";
const LW = "gatherings/lewa-house-kenya/";
const LG = "gatherings/lengishu-borana/";
const B = "gatherings/baymahni-exuma/";
const BW = "gatherings/baymahni-exuma/blu-wakes/";
const lewaBorana = (visit: string, why: string, fit: string) => ({ collection: "Lewa–Borana Landscape", collectionSlug: "lewa-borana-landscape", visit, why, fit });

export const kenyaExumaResidences: SampleResidence[] = [
  // Sources: cottars.com/bush-villa (rooms, pool, hot tub, staff, design, award, Olderkesi acreage, nanny);
  // wildearthstays.com/property/cottars-1920-camp; airstrip times from scottdunn.com and travelbutlers.com — Oct 2026.
  {
    slug: "cottars-bush-villa-maasai-mara", entryNo: "G-021", name: "Cottar's Bush Villa, Maasai Mara", place: "Olderkesi Conservancy, Maasai Mara", region: "Narok County", country: "Kenya",
    status: "Approved", stamp: "Founder inspected & approved", setting: "savanna",
    notes: { ...ke, bestSeason: "Dry season Jul–Oct for the Mara at its fullest; Jan–Feb is also dry" },
    line: "The first private house built in the Maasai Mara: five bedrooms on a hilltop in the 7,600-acre Olderkesi Conservancy, with its own 25-metre pool, guide, vehicle, chef and nanny, and Cottar's 1920s Camp next door.",
    verdict: [
      "I've worked with the Cottar family since 2017, and the Bush Villa is the house I send families to when they want the old safari done properly — campaign furniture, a fire in the evening, guides who grew up on this border.",
      "Louise Cottar designed it to be lived in, not looked at. It sits outside the national reserve, which is the point: you can walk, drive at night and stop where you like, with the Serengeti across the border.",
    ],
    bestFor: "Three generations of up to ten who want the Maasai Mara with a private house, pool, guide and nanny — and the freedom to walk and drive at night",
    notFor: "Not for a family that wants the river-crossing crowds on the doorstep — Olderkesi is quiet by design, and the main reserve is a drive away.",
    bedrooms: "5 en-suite bedrooms: the Master, Maasai, Blue, Cream and Green rooms", sleeps: 10,
    kidsProgram: "Complimentary nanny; Maasai warrior school, bush walks and village visits", kidsAges: "All ages",
    water: "Private 25-metre pool with a shallow and a deep end; a hot tub for six on its own deck", seasons: ["Year-round"],
    airport: "Cottar's own airstrip, about 10 minutes' drive from camp (charter and scheduled light aircraft), or Keekorok airstrip, about 1.5 hours by road",
    formula: formula([
      ["Five en-suite bedrooms, a dining table for fourteen and three decks — exclusive use for ten, up to twelve on request.", true],
      ["A complimentary nanny for the young; bush walks and night drives for the adults.", true],
      ["A 25-metre pool with a shallow end, and a hot tub for six.", true],
      ["The 7,600-acre private Olderkesi Conservancy, in the Mara–Serengeti ecosystem.", true],
      ["Own guide and 4x4, private chefs, butler and housekeeping, with Cottar's 1920s Camp next door.", true],
      ["James has worked with the Cottars since 2017, and inspected and approved the villa.", true],
    ]),
    fieldNotes: [
      "Give the Master to the grandparents: 65 m², a fireplace, two balconies and its own entrance.",
      "The Blue and Cream rooms take a third bed each — the children's rooms.",
      "Ask for a night drive: Olderkesi allows them, the national reserve does not.",
      "The nanny is included; say ahead how many little ones are coming.",
      "Balloon safaris are available at extra cost.",
    ],
    manifest: [],
    experiences: [
      { name: "Day and night game drives", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Your own guide and 4x4 on the Olderkesi Conservancy — and after dark, which the conservancy permits.", image: { publicId: C + "cottars-game-drive", alt: "A Cottar's safari vehicle parked on the open plains of the Maasai Mara" } },
      { name: "Walking with Maasai guides", category: "On the land", ages: ["Older children and adults"], seasons: ["Year-round"], description: "Tracks, plants and birdsong on foot with a guide — something the main reserve does not allow.", image: { publicId: C + "cottars-maasai-bush-walk", alt: "Guests in safari hats on a guided bush walk with Maasai guides at Cottar's" } },
      { name: "Village and school visits", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "A visit to a neighbouring Maasai village and school, arranged by Cottar's.", image: { publicId: C + "cottars-maasai-village", alt: "Maasai men, women and children in red shukas and beadwork outside their village near Cottar's" } },
      { name: "Balloon over the Mara", category: "Together", ages: ["Ages set by the operator"], seasons: ["Year-round, weather permitting"], description: "A dawn flight over the plains, at extra cost.", image: { publicId: C + "cottars-balloon-safari", alt: "A striped hot-air balloon lifting off at dawn over the Maasai Mara" } },
    ],
    faqs: [
      { question: "Is Cottar's Bush Villa good for a multigenerational safari?", answer: "Yes. It is an exclusive-use house of five en-suite bedrooms for up to ten guests (twelve on request), with a 25-metre pool that has a shallow end, a hot tub for six, a complimentary nanny, private chefs and its own guide and vehicle." },
      { question: "Can you do night drives and walks at Cottar's?", answer: "Yes. The villa has access to the 7,600-acre private Olderkesi Conservancy, outside the Maasai Mara National Reserve, where night game drives and guided walks are allowed — neither is permitted inside the national reserve." },
      { question: "Who designed Cottar's Bush Villa?", answer: "Louise Cottar. It was the first private house built in the Maasai Mara, with local materials and interiors made with Maa Trust artisans, and it has been named Best Private Villa in Africa — the first property in Kenya to win the award." },
      { question: "How do you get to Cottar's Bush Villa?", answer: "By light aircraft. Cottar's has its own airstrip about ten minutes from camp for charter and scheduled flights; Keekorok airstrip is about an hour and a half away by road." },
    ],
    images: [
      { publicId: C + "cottars-bush-villa-deck", alt: "Cottar's Bush Villa lit at dusk above its deck and fire pit, among the trees of the Olderkesi Conservancy, Maasai Mara", caption: "The villa at dusk", role: "Hero" },
      { publicId: C + "cottars-bush-villa-pool", alt: "The stone-edged 25-metre pool at Cottar's Bush Villa, with daybeds under a pergola", caption: "The 25-metre pool", role: "Card" },
      { publicId: C + "cottars-bush-villa-dining-room", alt: "Long dining table under a vaulted timber roof at Cottar's Bush Villa", caption: "Dinner for everyone", role: "Feature" },
      { publicId: C + "cottars-bush-villa-lounge", alt: "Sitting room with a cream sofa, carved mirror and antique pieces at Cottar's Bush Villa", caption: "The sitting room", role: "Gallery strip" },
      { publicId: C + "cottars-bush-villa-master-bedroom", alt: "The Master bedroom at Cottar's Bush Villa, a bed under a white mosquito net beneath a canvas ceiling", caption: "The Master room", role: "Gallery strip" },
      { publicId: C + "cottars-bush-villa-hot-tub-deck", alt: "Hot tub on a wooden deck above the forest at Cottar's Bush Villa", caption: "The hot tub deck", role: "Gallery strip" },
      { publicId: C + "cottars-bush-villa-aerial", alt: "Forested hills of the Olderkesi Conservancy in the evening light, around Cottar's Bush Villa", caption: "Olderkesi from the air", role: "Gallery strip" },
    ],
    rooms: [
      { name: "The Bush Villa, whole", count: "1", bedrooms: "5", sleeps: "10, up to 12 on request", inside: "Five en-suite bedrooms, sitting and dining rooms, library, bar, spa room, three decks, 25-metre pool and hot tub", fit: "The whole family under one roof.", whole: true },
      { name: "The Master", count: "1", bedrooms: "1 · super king", sleeps: "2", inside: "65 m² upstairs, fireplace, two private balconies and its own entrance", fit: "The grandparents." },
      { name: "Maasai room", count: "1", bedrooms: "1 · king", sleeps: "2", inside: "Ground floor, with an outdoor veranda", fit: "A couple who want to step straight outside." },
      { name: "Blue room", count: "1", bedrooms: "1 · twin", sleeps: "2–3", inside: "Ground floor, with a hand-carved stone bath", fit: "Children, with room for a third." },
      { name: "Cream room", count: "1", bedrooms: "1 · two twins", sleeps: "2–3", inside: "Upstairs, private balcony, floor-to-ceiling mosquito net", fit: "Older children or cousins." },
      { name: "Green room", count: "1", bedrooms: "1 · king", sleeps: "2", inside: "Upstairs, private balcony, floor-to-ceiling mosquito net", fit: "A second couple." },
    ],
    videos: [],
    seoTitle: "Cottar's Bush Villa, Maasai Mara: Family Safari House | Wild & Co Gatherings",
    metaDescription: "Cottar's Bush Villa: a private five-bedroom safari house on the 7,600-acre Olderkesi Conservancy, Maasai Mara — 25 m pool, own guide, chef and nanny. Founder inspected & approved.",
    credit: "Images courtesy of Cottar's Safaris",
  },

  // Sources: lewahouse.com/the-lodge (cottages, earthpods, main house, pool, farm); hosts from yellowzebrasafaris.com,
  // mahlatini.com and porini.com; Lewa–Borana facts from savetherhino.org (2014) — Oct 2026.
  {
    slug: "lewa-house-kenya", entryNo: "G-022", name: "Lewa House, Lewa Conservancy", place: "Lewa Wildlife Conservancy", region: "Laikipia", country: "Kenya",
    status: "Approved", stamp: "Founder inspected & approved", setting: "savanna",
    host: { name: "Sophie and Calum MacFarlane", title: "Hosts, Lewa House", note: "Lewa House is their family home and farm. Calum is a qualified trails guide and walks with guests; the two of them host dinner." },
    notes: { ...ke, bestSeason: "Open year-round; the dry months Jan–Mar and Jun–Oct are best for game" },
    line: "A family-run lodge on a working farm in the middle of the Lewa Wildlife Conservancy — thatched cedar cottages that sleep four, earthpods for two, a pool above a waterhole and a table fed from its own garden.",
    verdict: [
      "Lewa House feels like staying with friends who happen to live among rhino. Sophie and Calum run it as their home, and a family slots into it as easily as it would into a farmhouse at harvest.",
      "Book the cottages together and the place is yours: breakfast out in the conservancy, the pool over the waterhole after lunch, and dinner by the big fire in the main house.",
    ],
    bestFor: "Families with children of all ages who want a home-hosted safari — game drives, walks and bush breakfasts on a conservancy known for rhino",
    notFor: "Not for a family that wants a polished hotel; this is a home on a working farm, unfenced, with escorts after dark.",
    bedrooms: "Thatched family cottages (a double and a twin, each en suite) and four earthpods for two", kidsAges: "All ages",
    kidsProgram: "Farm visits, bush breakfasts and riding",
    water: "A pool overlooking a waterhole — some of the best game viewing on the conservancy", seasons: ["Year-round"],
    airport: "Lewa airstrip, by scheduled or charter light aircraft from Nairobi",
    vip: lewaBorana("Founder inspected & approved",
      "Lewa is where the fence came down: since 2014 it and Borana have been one landscape for black rhino. Lewa House is a family home in the middle of it, and the farm feeds the table.",
      "Families of four and up who take the cottages together."),
    formula: formula([
      ["Cottages for four and earthpods for two, around one main house with an open fire.", true],
      ["Farm, riding and bush breakfasts for the young; walking with Calum for the keen.", true],
      ["A pool above a waterhole.", true],
      ["The Lewa Wildlife Conservancy, part of the 93,000-acre Lewa–Borana landscape, with Mount Kenya in view.", true],
      ["An owner-run house: farm kitchen, guides and staff.", true],
      ["James inspected and approved it for the Ledger.", true],
    ]),
    fieldNotes: [
      "Book cottages side by side: each has a double and a twin room, both en suite.",
      "Ask to walk with Calum — he is a qualified trails guide.",
      "Most of the food comes from the farm; staples are bought from neighbouring communities and the Meru market.",
      "The house is unfenced: staff escort guests after dark.",
    ],
    manifest: [],
    experiences: [
      { name: "Game drives on Lewa", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Rhino and elephant are why families come; the guides know the conservancy by heart." },
      { name: "Bush breakfast", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "Breakfast laid out in the conservancy, a drive from the house.", image: { publicId: LW + "lewa-house-bush-breakfast", alt: "Two hosts in red shukas beside a breakfast table laid in the bush on Lewa" } },
      { name: "Walking with Calum", category: "On the land", ages: ["Older children and adults"], seasons: ["Year-round"], description: "A guided walk with the owner, a qualified trails guide." },
      { name: "The farm", category: "For the young ones", ages: ["All ages"], seasons: ["Year-round"], description: "Lewa began as a farm and still keeps one: fruit, vegetables, milk, yoghurt and eggs for the table." },
    ],
    faqs: [
      { question: "Is Lewa House good for families with young children?", answer: "Yes. Children of all ages are welcome, and the cottages are built for families of four, with a double and a twin room, each en suite. The house is unfenced in a wildlife area, so staff escort guests after dark." },
      { question: "What rooms does Lewa House have?", answer: "Thatched cedar family cottages that sleep four, with a large veranda each, and four earthpods for two that collect their own rainwater. Guests gather in the thatched main house around a big open fire." },
      { question: "What is the Lewa–Borana landscape?", answer: "In 2014 the fence between the Lewa Wildlife Conservancy and Borana Conservancy came down, creating 93,000 acres of black rhino habitat. Borana's founding rhino population of 21 arrived in 2013, 11 of them from Lewa." },
    ],
    images: [
      { publicId: LW + "lewa-house-lodge-40", alt: "The main house at Lewa House: sofas around an open fire under a high thatched roof", caption: "The main house", role: "Hero" },
      { publicId: LW + "lewa-house-17", alt: "A breakfast table laid on the lawn under acacia trees at Lewa House", caption: "Breakfast on the lawn", role: "Card" },
      { publicId: LW + "lewa-house-lodge-43", alt: "Candlelit tables set for dinner under the thatch at Lewa House", caption: "Dinner in the main house", role: "Feature" },
      { publicId: LW + "lewa-house-family-cottage", alt: "A family cottage bedroom at Lewa House, a four-poster bed under a mosquito net beneath the thatch", caption: "A family cottage", role: "Gallery strip" },
      { publicId: LW + "lewa-house-lodge-32", alt: "Bedroom with a netted four-poster bed and doors open to the light at Lewa House", caption: "A cottage bedroom", role: "Gallery strip" },
      { publicId: LW + "lewa-house-lodge-17", alt: "A bedroom at Lewa House with doors open onto a veranda and the plains of Lewa", caption: "Doors onto the plains", role: "Gallery strip" },
    ],
    rooms: [
      { name: "Family cottage", count: "Ask us", bedrooms: "2 · a double and a twin, each en suite", sleeps: "4", inside: "Thatched cedar cottage with a large veranda", fit: "One family branch per cottage." },
      { name: "Earthpod", count: "4", bedrooms: "1", sleeps: "2", inside: "Built to collect rainwater and hold an even temperature, looking over the northern frontier", fit: "Grandparents, or a couple." },
    ],
    videos: [],
    seoTitle: "Lewa House, Lewa Conservancy: Family Safari in Kenya | Wild & Co Gatherings",
    metaDescription: "Lewa House: a family-run safari lodge on a working farm in Kenya's Lewa Wildlife Conservancy — cottages for four, earthpods, a pool over a waterhole. Founder inspected & approved.",
    credit: "Images courtesy of Lewa House",
  },

  // Sources: wildearthstays.com/property/lengishu-kenya (layout, pool, activities, conservation, getting there, seasons);
  // savetherhino.org (Lewa–Borana, 2014) — Oct 2026. Sleeping capacity and rates not published: confirm with the house.
  {
    slug: "lengishu-borana", entryNo: "G-024", name: "Lengishu Residence, Borana Conservancy", place: "Borana Conservancy", region: "Laikipia", country: "Kenya",
    lat: 0.2304, lng: 37.1842, status: "Approved", stamp: "Under observation", setting: "savanna",
    notes: { ...ke, bestSeason: "Jun–Oct and Dec–Mar for wildlife, clear views and mild weather" },
    line: "A private residence of six en-suite bedrooms in four stone cottages on Borana, above an infinity pool and the Laikipia hills — your own staff, chef, vehicles and guides, and every stay paying for Borana's rhino and community work.",
    verdict: [
      "Lengishu is the house I'd choose to bring a whole family into the Lewa–Borana story: four cottages so every branch has its own door, one table, and rhino tracking with the people who protect them.",
      "I haven't stayed yet, so it sits under observation in the Ledger until I have. It's on my list because of what the stay pays for.",
    ],
    bestFor: "Multigenerational families who want a whole safari house to themselves — riding, walking, biking and rhino tracking on a conservancy, with Mount Kenya on the skyline",
    notFor: "Not for a family that wants a lodge buzz; this is a private house with its own team, a drive from the airstrip.",
    bedrooms: "6 en-suite bedrooms in 4 separate cottages, each with a fireplace and a view", kidsAges: "All ages",
    kidsProgram: "Children's activities, riding for every level and a morning with the conservancy team",
    water: "Infinity pool overlooking the Borana hills", seasons: ["Year-round"],
    airport: "Lewa Downs airstrip (near Nanyuki) or Borana airstrip, then 45–60 minutes by road; the house arranges transfers",
    vip: lewaBorana("On J.W.'s list · not yet visited",
      "Every stay goes to Borana's rhino and community projects. A family that tracks a rhino on foot with the team that guards it goes home understanding conservation in a way no film can teach.",
      "A whole family taking the house: four cottages, one table."),
    formula: formula([
      ["Six en-suite bedrooms in four cottages around shared living and dining rooms; book the whole house or single cottages.", true],
      ["Riding for every level, bush walks, biking and rhino tracking.", true],
      ["An infinity pool over the conservancy.", true],
      ["Borana Conservancy, one landscape with Lewa since 2014.", true],
      ["Private staff, chef, vehicles and guides.", true],
      ["Not yet visited — under observation until James has stayed.", false],
    ]),
    fieldNotes: [
      "Take the whole house so each branch has its own cottage.",
      "Book a morning with the conservancy team — rhino tracking or an anti-poaching patrol.",
      "Ask us to pair it with Lewa House next door in the same landscape.",
      "Go June–October or December–March for the clearest views of Mount Kenya.",
    ],
    manifest: [],
    experiences: [
      { name: "Rhino tracking", category: "On the land", ages: ["Ages set by the conservancy"], seasons: ["Year-round"], description: "On foot with Borana's team, following black rhino across the conservancy.", image: { publicId: LG + "lengishu-rhino-tracking", alt: "A black rhino in dry grass on Borana, with a tracking team on foot in the distance" } },
      { name: "Horseback safari", category: "On the land", ages: ["All levels"], seasons: ["Year-round"], description: "Riding out across Borana among the game, for beginners and riders alike.", image: { publicId: LG + "lengishu-horse-riding", alt: "Three riders on horseback crossing the golden grassland of Borana under a big sky" } },
      { name: "Game drives", category: "On the land", ages: ["All ages"], seasons: ["Year-round"], description: "Your own 4x4 and guide, looking for rhino, lion and elephant.", image: { publicId: LG + "lengishu-game-drive", alt: "A Lengishu guide at the wheel of an open safari vehicle on Borana" } },
      { name: "Sundowners and lunch outside", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "Farm-to-table meals set out on the land, and drinks as the light goes.", image: { publicId: LG + "lengishu-dining-daytime", alt: "A lunch table laid under an acacia tree beside water on Borana" } },
    ],
    faqs: [
      { question: "Can we book Lengishu for a whole family?", answer: "Yes. Lengishu can be booked as a whole house of six en-suite bedrooms in four separate cottages, each with a fireplace, or by individual cottage. It comes with private staff, a chef, vehicles and guides." },
      { question: "What does a stay at Lengishu support?", answer: "Lengishu's proceeds go to Borana Conservancy's rhino and community projects. The house is solar powered, built from local stone and described as carbon neutral." },
      { question: "How do you get to Lengishu?", answer: "Fly to Lewa Downs airstrip near Nanyuki or to Borana's airstrip; the drive to the house is about 45 to 60 minutes, and the house arranges transfers." },
      { question: "Has James Wild stayed at Lengishu?", answer: "Not yet. It is in the Ledger under observation, as the Gatherings VIP residence for the Lewa–Borana landscape, until James has stayed." },
    ],
    images: [
      { publicId: LG + "lengishu-infinity-pool", alt: "Lengishu's infinity pool at dusk, with the lit stone house and acacia trees behind, Borana Conservancy", caption: "The pool at dusk", role: "Hero" },
      { publicId: LG + "lengishu-house-02", alt: "Living room at Lengishu with a fireplace and glass doors open to a deck over the Laikipia hills", caption: "The living room", role: "Card" },
      { publicId: LG + "lengishu-lion-borana", alt: "A lion on the open plains of Borana, with Mount Kenya on the horizon", caption: "Mount Kenya from Borana", role: "Feature" },
      { publicId: LG + "lengishu-house-01", alt: "Evening light over the hills of Borana and Laikipia, seen from Lengishu", caption: "The view at evening", role: "Gallery strip" },
      { publicId: LG + "lengishu-cottage", alt: "A copper bathtub beside tall windows in a Lengishu cottage", caption: "A cottage bathroom", role: "Gallery strip" },
      { publicId: LG + "lengishu-600", alt: "A male lion lying in long grass on Borana Conservancy", caption: "A Borana lion", role: "Gallery strip" },
    ],
    rooms: [
      { name: "Lengishu, whole", count: "1", bedrooms: "6", inside: "Four cottages, each with en-suite bathrooms, fireplaces and views; shared living and dining rooms; infinity pool", fit: "The whole family, each branch with its own cottage.", whole: true },
    ],
    videos: [],
    seoTitle: "Lengishu, Borana Conservancy: Private Safari House in Kenya | Wild & Co Gatherings",
    metaDescription: "Lengishu: a private six-bedroom safari residence in four cottages on Kenya's Borana Conservancy, with an infinity pool, own guides and rhino tracking. Gatherings VIP.",
    credit: "Images courtesy of Lengishu and Wild Earth Stays",
  },

  // Sources: bluwakes.com (home, amenities, floor plan: Hoopers Bay, two villas, each four en-suite bedrooms plus a bunk room,
  // private pool, chef, butler, driver, boat captain); baymahni.com/rooms (bungalows, lofts for 7–16); hospitalitynet.org (2025:
  // former Kahari site, renovated); bahamas.com (Kahari) — Oct 2026. James (15 Oct 2026): the Blu Wakes villas are part of
  // Baymahni and lead the offer; the resort is the family's base. Villa capacity and unit counts not published: confirm.
  {
    slug: "baymahni-exuma", entryNo: "G-023", name: "Blu Wakes Villas at Baymahni, Exuma", place: "Hoopers Bay and Stocking Island, Great Exuma", region: "The Exumas", country: "Bahamas",
    status: "Approved", stamp: "Founder inspected & approved", firstVisited: "2023", setting: "coast",
    notes: { bestSeason: "Dec–May, the dry season; hurricane season runs Jun–Nov", power: "120V · type A/B", timeZone: "Eastern Time (ET)" },
    line: "Two beachfront villas on Hoopers Bay — each with four en-suite bedrooms, a bunk room for the children, its own pool, chef, butler and boat captain — with Baymahni's beach, lagoon and bungalows on Stocking Island as the family's base.",
    verdict: [
      "I stayed here in 2023, when it was still Kahari, on a trip with the Reef Ball Foundation — and came home thinking every family should see a reef being rebuilt.",
      "For a gathering I now start with the Blu Wakes villas: take both, and three generations each have a house on the sand with its own pool. Baymahni is the base for everything else — the lagoon, the bungalows for an extra branch, and the boat days out to the reefs.",
    ],
    bestFor: "Families who want two beach houses side by side for a reunion — bunk rooms for the cousins, a chef and a captain — with a resort to lean on for the water days",
    notFor: "Not for a family that wants a big-resort kids' club; this is a villa stay with a small island resort behind it, and boats are part of every outing.",
    bedrooms: "2 villas · each 4 en-suite bedrooms plus a bunk room; Baymahni bungalows for extra family", kidsAges: "All ages · bunk rooms and resort lofts for 7–16",
    kidsProgram: "Bunk room in each villa; paddleboards, kayaks and boat days with the villa's captain",
    water: "Each villa on the beach with its own pool; paddleboards and kayaks in Hoopers Bay; Baymahni's lagoon and dock on Stocking Island", seasons: ["Year-round"],
    airport: "Exuma International (GGT) — private driver and transfers arranged by the villa team; private charters from Florida with our partner Tradewind Aviation",
    formula: formula([
      ["Two villas side by side, each four en-suite bedrooms and a bunk room; resort bungalows for anyone else.", true],
      ["Bunk rooms for the young; boat days, fishing and reefs for the rest.", true],
      ["On the beach, each with a private pool, and Baymahni's lagoon across the harbour.", true],
      ["Hoopers Bay and the Exuma cays: sandbars, reefs and sea turtles.", true],
      ["Butler, concierge, chef on request, driver and captain — and Baymahni's team behind them.", true],
      ["James stayed in 2023 (as Kahari); the villas are new since his visit.", true],
    ]),
    fieldNotes: [
      "Book both villas for a reunion: one for the grandparents and one branch, one for the cousins.",
      "Put the children in the bunk rooms and the couples in the suites — Suite 1 and Suite 2 have their own porches.",
      "Ask for the grocery pre-stock and the chef for the first night, so no one shops on arrival day.",
      "Plan one boat day to the sandbars and one to snorkel — the villa's captain runs both.",
      "Go December to May; June to November is hurricane season.",
    ],
    manifest: [],
    experiences: [
      { name: "Boat days with your captain", category: "On the water", ages: ["All ages"], seasons: ["Year-round"], description: "Sandbars at low tide, turtles in the shallows and the cays of the Exumas, with the villa's dedicated captain.", image: { publicId: B + "baymahni-sandbar", alt: "A woman standing on a small white sandbar in clear turquoise water in the Exumas" } },
      { name: "Snorkelling the reefs", category: "On the water", ages: ["Confident swimmers"], seasons: ["Year-round"], description: "Coral heads and reef fish a short boat ride away.", image: { publicId: B + "baymahni-underwater", alt: "A snorkeller swimming among sergeant major fish over a reef in the Exumas" } },
      { name: "Paddling from the beach", category: "On the water", ages: ["All ages"], seasons: ["Year-round"], description: "Paddleboards and kayaks are included at the villas, in the protected water of Hoopers Bay.", image: { publicId: B + "baymahni-kayak", alt: "A paddleboarder seen from above on glass-clear Exuma water" } },
      { name: "A day at Baymahni", category: "Together", ages: ["All ages"], seasons: ["Year-round"], description: "Across the harbour on Stocking Island: the lagoon, the beach and the resort's restaurant and bar.", image: { publicId: B + "baymahni-aerial-01", alt: "Aerial view of Baymahni on its point of Stocking Island, with the pool, beaches and turquoise water on both sides" } },
    ],
    faqs: [
      { question: "What are the Blu Wakes villas?", answer: "Two beachfront villas on Hoopers Bay, Great Exuma, that are part of Baymahni. Each has four en-suite bedrooms plus a bunk room, a private pool, direct beach access, a full kitchen, a butler and concierge, a chef on request, a private driver and a boat captain. Paddleboards and kayaks are included." },
      { question: "Can a big family take both Blu Wakes villas?", answer: "Yes — taking both villas gives a reunion two houses side by side on the beach, each with its own pool. Extra family can stay in Baymahni's bungalows on Stocking Island. Ask us for capacity for your party." },
      { question: "Is Baymahni the same resort as Kahari?", answer: "Yes. Baymahni stands on the former Kahari Resort site on Stocking Island, renovated and expanded with a new restaurant, bar and pool. Kahari was itself once called Lumina Point." },
      { question: "How do you fly to Exuma privately?", answer: "Our partner Tradewind Aviation flies private charters in the Pilatus PC-12 straight into Exuma International (GGT): about 1 hour 18 minutes from Miami or Fort Lauderdale and 1 hour 24 minutes from Palm Beach. The villa team arranges the driver from the airport." },
    ],
    images: [
      { publicId: BW + "bw-27", alt: "The Blu Wakes villas behind a white beach on Hoopers Bay, Exuma, with turquoise water and a small pier", caption: "The villas on Hoopers Bay", role: "Hero" },
      { publicId: BW + "bw-16", alt: "A Blu Wakes villa seen from the beach through palms, with its pool and loungers in front", caption: "From the beach", role: "Card" },
      { publicId: BW + "bw-04", alt: "Aerial view of Hoopers Bay, Exuma, with the Blu Wakes villas above a long white beach and shallow turquoise water", caption: "Hoopers Bay from the air", role: "Feature" },
      { publicId: BW + "bw-03", alt: "Living room in a Blu Wakes villa with a white sofa under a vaulted timber ceiling and doors to the terrace", caption: "The living room", role: "Gallery strip" },
      { publicId: BW + "bw-06", alt: "Open kitchen and dining table in a Blu Wakes villa, with glass doors to the pool and the sea", caption: "Kitchen and dining", role: "Gallery strip" },
      { publicId: BW + "bw-07", alt: "A suite in a Blu Wakes villa with a king bed, round mirror and vaulted ceiling", caption: "A suite", role: "Gallery strip" },
      { publicId: BW + "bw-23", alt: "A Blu Wakes villa's private pool among palms, with the beach beyond", caption: "The pool", role: "Gallery strip" },
      { publicId: BW + "bw-29", alt: "Glass doors open from a Blu Wakes villa onto the pool deck and the sea", caption: "Doors to the sea", role: "Gallery strip" },
      { publicId: B + "baymahni-bungalow-view", alt: "Bungalow sitting room at Baymahni with white armchairs and French doors open to palms and the sea", caption: "A Baymahni bungalow", role: "Gallery strip" },
    ],
    rooms: [
      { name: "Both Blu Wakes villas", count: "2", bedrooms: "8 en-suite + 2 bunk rooms", inside: "Two beachfront villas side by side, each with a private pool, full kitchen, living and dining room and covered patio", fit: "The whole reunion, a house per branch.", whole: true },
      { name: "Blu Wakes villa", count: "2", bedrooms: "4 en-suite + a bunk room", inside: "Suite 1 and Suite 2 with their own porches, Bedrooms 3 and 4, bunk room, private pool and beach access", fit: "One family of three generations." },
      { name: "Baymahni bungalows", count: "Ask us", bedrooms: "1 · king, plus a loft for 7–16", sleeps: "Up to 4", inside: "Beach or lagoon bungalows on Stocking Island; two connect for up to eight", fit: "An extra branch, at the resort." },
      { name: "Two Bedroom Lagoon Bungalow", count: "1", bedrooms: "2 · king and queen", sleeps: "4 adults + 2 children", inside: "877 sq ft with lagoon views — Baymahni's only full two-bedroom unit", fit: "Grandparents who want the resort." },
    ],
    videos: [],
    seoTitle: "Blu Wakes Villas at Baymahni, Exuma: Family Beach Villas | Wild & Co Gatherings",
    metaDescription: "Blu Wakes at Baymahni, Exuma: two beachfront villas on Hoopers Bay, each four en-suite bedrooms plus a bunk room, private pool, chef and captain. James stayed in 2023.",
    credit: "Images courtesy of Blu Wakes and Baymahni",
  },
];
