// Gatherings VIP collections — groups of houses that carry the VIP stamp (Vetted in Purpose).
const T = "https://symphony.cdn.tambourine.com/ted-turner-reserves/media/";

export const VIP_MEANING = [
  { letter: "V", word: "Vetted", text: "James has walked it, questioned it and written down what he found — no brochure, no algorithm. A place is seen before it is sold." },
  { letter: "I", word: "In the land", text: "Guided from within, by the rangers, biologists and chefs who live and work there. Your family sees the place the way its keepers do." },
  { letter: "P", word: "Purpose", text: "Every night you stay helps keep the land wild — bison back on the grass, wolves bred for release, bighorn on the ridge. The stay gives back more than it takes." },
];

export type Collection = {
  slug: string; name: string; region: string; tagline: string; intro: string[]; status: string;
  hero: { publicId: string; alt: string };
  facts: [string, string][];
  route?: { when: string; where: string; what: string }[];
  protects: { name: string; text: string; image: { publicId: string; alt: string } }[];
  journal?: string; credit: string; seoTitle: string; metaDescription: string;
};

export const collections: Collection[] = [
  {
    slug: "ted-turner-reserves", name: "Ted Turner Reserves", region: "New Mexico", status: "VIP · visit Aug 2027",
    tagline: "More than a million acres of New Mexico, restored for wildlife and opened to a few families at a time. Four places to stay. One reason to go.",
    intro: [
      "Ted Turner spent decades buying land to give it back to the animals that belonged on it — bison, wolves, bighorn, a tortoise most people have never heard of. Four of those places now take guests, and every stay helps pay for the work.",
      "I have the contact, and I'm going to see all four in August 2027 — timed for the bat flight at Armendaris. Until I've been, every entry is marked Under observation. Here is what I know, why each one made my list, and how I would take a family through them.",
    ],
    hero: { publicId: T + "tedturnerreserves-homepage-gallery-9-67db3a5dd8f48.jpg", alt: "Bison herd grazing below Castle Rock at Vermejo, a Ted Turner Reserve in New Mexico" },
    facts: [["Land", "1 million+ acres stewarded"], ["Stays", "Vermejo, Ladder, Armendaris, Sierra Grande"], ["Children", "Turner Trailblazers program"], ["Status", "VIP · Vetted in Purpose · visit Aug 2027"]],
    route: [
      { when: "Day 1", where: "Fly into El Paso or Albuquerque", what: "Drive to Sierra Grande · first soak" },
      { when: "Days 2–3", where: "Armendaris", what: "The Hacienda · Bat Flight at dusk · bighorn in the Fra Cristobal" },
      { when: "Days 4–5", where: "Ladder", what: "The Country House · slot canyon · the Mexican wolf program" },
      { when: "Day 6", where: "North on I-25", what: "Through Santa Fe to Raton [drive time to confirm]" },
      { when: "Days 7–9", where: "Vermejo", what: "Casa Grande · lakes · bison · Via Ferrata" },
      { when: "Day 10", where: "Fly home", what: "Colorado Springs or Denver" },
    ],
    protects: [
      { name: "Mexican wolf", text: "Ladder runs the only private breeding and pre-release facility for Mexican wolves in the world, since 1997.", image: { publicId: T + "tedturnerreserves-conservation-lightboximages-03-6851b06f4967d.jpg", alt: "Mexican wolf standing on rocks at Ladder Ranch" } },
      { name: "Desert bighorn", text: "Restored to the Fra Cristobal from 1995; New Mexico took the species off its endangered list in 2011.", image: { publicId: T + "tedturnerreserves-conservation-lightboximages-02-6851a90ca0174.jpg", alt: "Desert bighorn sheep on a hill at Armendaris" } },
      { name: "Bolson tortoise", text: "North America's largest land tortoise, bred and head-started on Ladder and Armendaris.", image: { publicId: T + "tedturnerreserves-conservation-lightboximages-01-6851b06d18920.jpg", alt: "Bolson tortoise walking at Ladder Ranch" } },
      { name: "Chiricahua leopard frog", text: "A threatened frog kept going in the wild and in captive breeding at Ladder.", image: { publicId: T + "tedturnerreserves-conservation-lightboximages-05-6851b0718444d.jpg", alt: "Chiricahua leopard frog on sand" } },
    ],
    journal: "ted-turner-vision-guide-from-within",
    credit: "Images courtesy of Ted Turner Reserves",
    seoTitle: "Ted Turner Reserves for Families — Vermejo, Ladder, Armendaris & Sierra Grande | Wild & Co Gatherings",
    metaDescription: "James Wild's guide to the four Ted Turner Reserves in New Mexico for family gatherings: where to stay, what's included, guide rates, and the wildlife each stay protects.",
  },
];
export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
