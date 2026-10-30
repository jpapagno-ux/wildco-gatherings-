// ——— The MORE villas: one brand grouping across Gatherings, and a Gatherings VIP collection ———
// James, 30 Oct 2026: "Villas by brand (more.co.za/villas/). Villas across site for families and gatherings, build also
// with connections and cross sell." MORE is his favourite partner in South Africa; MORE Family Collection approved
// Wild & Co Gatherings as a partner, and its site content and images may be used with MORE's credit.
// James approved Gatherings VIP for all five MORE villas on 30 Oct 2026 ("list all as vip"). The canonical page is
// /vip/more, with the VIP stamp and the Vetted in Purpose meaning; /collections/more redirects there permanently.
// Each villa's VIP block (collection, why, family fit) is in lib/sample-more.ts › MORE_VIP and in Airtable.
//
// Cross-sell stays inside Gatherings (James, 30 Oct 2026: no visible links, cards or URLs to the Wild & Co Safaris site).
// Each villa keeps its Safaris ledger ID (WCS-ZA-…) in data/entities.json for matching only; it is never rendered as a link.
//
// Facts: MORE's own villa, FAQ, location and story pages, checked 30 Oct 2026. No rates, no availability, no coordinates
// beyond those already in the Ledger, and no link to MORE's website. James's own lines carry [Draft — J.W. to approve].

export const MORE_CREDIT = "Photograph courtesy of MORE";
export const MORE_COLLECTION_SLUG = "more";

export type MoreVilla = {
  slug: string;
  short: string; // name without the reserve, for cards and pairings
  where: string; // reserve or neighbourhood, from MORE's pages
  bedrooms: number;
  adults: number;
  children: number;
  // One line on who the villa suits, used in the cross-sell rail and on the collection page.
  fit: string;
};

// In the order MORE lists them on its villas page.
export const MORE_VILLAS: MoreVilla[] = [
  { slug: "fish-eagle-villa-lion-sands", short: "Fish Eagle Villa", where: "Lion Sands, Sabi Sand · beside Ivory Lodge on the Sabie River", bedrooms: 3, adults: 6, children: 2, fit: "Three bedrooms, a lap pool and a wine room — the largest Lion Sands villa." },
  { slug: "hinkwenu-villa-lion-sands", short: "Hinkwenu Villa", where: "Lion Sands · at Tinga Lodge, near the Sabie River", bedrooms: 2, adults: 4, children: 2, fit: "Two bedrooms; MORE describes it as best suited to families with young children." },
  { slug: "marataba-villa-marakele", short: "Marataba Villa", where: "Marataba, Marakele National Park · malaria-free Waterberg", bedrooms: 4, adults: 8, children: 2, fit: "Four tents on the Matlabas River, with a kids' tent — the largest MORE villa, malaria-free." },
  { slug: "monwana-villa-thornybush", short: "Monwana Villa", where: "Monwana, Thornybush · Greater Kruger", bedrooms: 2, adults: 4, children: 2, fit: "Two suites, three plunge pools and a waterhole in view of the kitchen." },
  { slug: "cape-cadogan-villa-cape-town", short: "Cape Cadogan Villa", where: "Gardens, Cape Town · below Table Mountain", bedrooms: 3, adults: 4, children: 2, fit: "Three bedrooms in a restored National Monument, with a chauffeur for the city." },
];

export const moreVilla = (slug: string) => MORE_VILLAS.find((v) => v.slug === slug);
export const isMoreVilla = (slug: string) => MORE_VILLAS.some((v) => v.slug === slug);

// Pairings: two MORE villas planned as one family journey. Facts only from MORE's pages; no transfer times between
// villas are given because MORE does not publish them.
export type MorePairing = { title: string; houses: [string, string]; why: string };

export const MORE_PAIRINGS: MorePairing[] = [
  {
    title: "Cape Town, then the bush",
    houses: ["cape-cadogan-villa-cape-town", "fish-eagle-villa-lion-sands"],
    why: "Begin in the city at Cape Cadogan Villa, with a chauffeur and the Kloof Street neighbourhood on foot, then fly to Skukuza for Fish Eagle Villa on the Sabie River at Lion Sands.",
  },
  {
    title: "Malaria-free with young children",
    houses: ["marataba-villa-marakele", "cape-cadogan-villa-cape-town"],
    why: "Marataba is in the malaria-free Waterberg, which MORE says is safe for young children, and is about 3.5 hours' drive from Johannesburg. Finish in Cape Town at Cape Cadogan Villa.",
  },
  {
    title: "Two branches at Lion Sands",
    houses: ["fish-eagle-villa-lion-sands", "hinkwenu-villa-lion-sands"],
    why: "Fish Eagle (beside Ivory Lodge) sleeps eight and Hinkwenu (at Tinga Lodge) sleeps six — fourteen in all, each villa with its own team, guide and vehicle, on the same reserve.",
  },
  {
    title: "Two Greater Kruger chapters",
    houses: ["monwana-villa-thornybush", "hinkwenu-villa-lion-sands"],
    why: "Monwana's waterhole and the Thornybush leopards, then Lion Sands — the only private reserve spanning both the Sabi Sand and Kruger National Park, on 13 miles of Sabie River.",
  },
  {
    title: "Thornybush, then the Cape",
    houses: ["monwana-villa-thornybush", "cape-cadogan-villa-cape-town"],
    why: "Hoedspruit Airport has daily scheduled flights from Johannesburg and Cape Town, so Monwana Villa and Cape Cadogan Villa join up simply.",
  },
];

export const pairingsFor = (slug: string) => MORE_PAIRINGS.filter((p) => p.houses.includes(slug));

// Answer-style questions for families and multigenerational groups, shown on /vip/more with FAQPage markup.
export const MORE_FAQS = [
  { question: "Which MORE villa is best for a multigenerational family?", answer: "Marataba Villa is the largest: four tents for up to ten guests (eight adults and two children), with a kids' tent, a private pool and its own chef, guide and vehicle, in the malaria-free Waterberg. For up to eight, Fish Eagle Villa at Lion Sands has three en-suite bedrooms on the Sabie River." },
  { question: "Can children of any age stay in the MORE villas?", answer: "Yes at the Lion Sands villas (Fish Eagle and Hinkwenu) and Monwana Villa, which MORE says welcome children of all ages, and at Cape Cadogan Villa, which MORE says suits families of any age. Young children are welcome at Marataba Villa. Bush walks at Lion Sands and Monwana are for guests aged 16 and over." },
  { question: "Are the MORE villas exclusive use?", answer: "Yes. Each villa is booked whole for one family or group, with its own team. The four safari villas each have a private vehicle with a field guide (and a tracker at Lion Sands and Monwana); Cape Cadogan Villa has a private chauffeur and vehicle." },
  { question: "Which MORE villa is malaria-free?", answer: "Marataba Villa, in the malaria-free Waterberg in Marakele National Park. MORE describes Lion Sands as a moderate-risk malaria area and Thornybush, where Monwana is, as low-risk, and advises speaking to your doctor before travelling." },
  { question: "Can a large family take two MORE villas together?", answer: "Yes. Fish Eagle Villa (eight guests) and Hinkwenu Villa (six) are both at Lion Sands, so two branches of a family can stay on the same reserve, fourteen in all. Monwana's whole lodge can also be taken for up to 24 guests across six suites and the Villa." },
  { question: "Do the MORE villas have a kids' programme?", answer: "Mack & Madi kids' activities and childminding are included at Fish Eagle, Hinkwenu, Marataba and Cape Cadogan villas; Monwana Villa has the Mosaba Rangers programme. MORE describes Mack & Madi at Lion Sands as animal tracking and bush survival skills." },
  { question: "How do we get to the MORE villas?", answer: "Lion Sands: fly into Skukuza Airport, 5 to 20 minutes from the lodges. Monwana: Hoedspruit Airport, 45 minutes away. Marataba: Thabazimbi airstrip, about 40 minutes to the Villa, or about 3.5 hours' drive from Johannesburg. Cape Cadogan: Cape Town International, 21 km away. Wild & Co Gatherings arranges the flights with the stay." },
];
