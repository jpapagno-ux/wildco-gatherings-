// ——— The founder story: James Wild, since 1982 ———
// Facts here are only ones James has stated himself (Oct 2026). Quotes are drafted in James's voice for his approval.
// Photos are James's own, in /public/founder/.

export const FOUNDER = {
  name: "James Wild",
  title: "Founder, James Wild & Co",
  since: 1982,
  years: 44,
  path: "/founder",
};

export type FounderPhoto = { src: string; alt: string; caption: string; w: number; h: number; focus?: string };

export const FOUNDER_PHOTOS: Record<"tableMountain" | "sundowner" | "helicopter", FounderPhoto> = {
  tableMountain: {
    src: "/founder/james-miriam-wild-table-mountain-cape-town.jpg",
    alt: "James Wild and his wife Miriam on top of Table Mountain, Cape Town, with the Twelve Apostles behind them",
    caption: "Miriam and me on Table Mountain",
    w: 829, h: 1800, focus: "50% 62%",
  },
  sundowner: {
    src: "/founder/james-miriam-wild-botswana-sundowner.jpg",
    alt: "James and Miriam Wild raising a sundowner in the Botswana bush with their smiling safari guide",
    caption: "Sundowners in Botswana, with our guide",
    w: 1350, h: 1800, focus: "50% 82%",
  },
  helicopter: {
    src: "/founder/james-miriam-wild-helicopter-safari.jpg",
    alt: "James and Miriam Wild in headsets inside a helicopter above the African bush",
    caption: "Headsets on, above the bush",
    w: 1350, h: 1800, focus: "50% 55%",
  },
};

export const FOUNDER_LEDE =
  "James Wild has been on the road since 1982 — forty-four years of finding the places worth going, and taking the people he cares about there. He is still going.";

export const FOUNDER_BIO: string[] = [
  "James Wild's story begins in 1982. Within a year, friends were asking him to take them surfing on Eleuthera, in the Bahamas — so he did, with his friend Charlton waiting for them in North Eleuthera. It was the first journey he designed for anyone else, and Eleuthera is still his favourite island.",
  "That has been the pattern ever since: go first, find what is worth it, then guide the people you love there. Forty-four years later it has taken him across Africa again and again — the Kalahari at Tswalu, the Serengeti at Faru Faru, the Okavango and the Linyanti in Botswana, the Sabi Sand and Greater Kruger — and well beyond it: the Antarctic Peninsula, where he was at sea when the world shut down for COVID; Raja Ampat, sailed with his son Anthony; the islands of French Polynesia with his wife, Miriam; and the red-rock country of Moab, where his favourite family stay sits under Looking Glass Rock.",
  "In May 2026 he took Miriam on her first safari, through South Africa and Botswana, and the two of them filmed it for Wild Together. Everything that lands in the Gatherings Ledger has been through the same test: James has met the people who run it, and he would send his own family there — or he says so plainly.",
  "James Wild & Co is the house he built around that habit: journey design since 1982, ledgered and vetted, advisor-led. Wild & Co Gatherings is its family branch — one house for every generation, and a day for every age.",
];

export type Milestone = { year: string; title: string; text: string; href?: string };

export const FOUNDER_TIMELINE: Milestone[] = [
  { year: "1982", title: "The road opens", text: "James Wild's story begins — the year James Wild & Co still carries on its seal." },
  { year: "1983", title: "Eleuthera, with friends", text: "Friends ask him to take them surfing on Eleuthera. Charlton meets them in North Eleuthera. The first trip he designs for others; still his favourite island." },
  { year: "2012", title: "The Kalahari and the Serengeti", text: "Tswalu in the Kalahari, and Singita Faru Faru in the Serengeti — two of the lodges he would go back to tomorrow." },
  { year: "2018", title: "Back to Faru Faru", text: "He returns — Faru Faru is one of the places he would go back to again." },
  { year: "2020", title: "The Antarctic Peninsula", text: "At sea off the Antarctic Peninsula, camera in hand, when the world shut down for COVID." },
  { year: "2023", title: "Moab, with the family in mind", text: "April 2023 at ULUM, under Looking Glass Rock. It becomes his favourite family stay.", href: "/houses/ulum-moab" },
  { year: "2024", title: "Raja Ampat, with Anthony", text: "Eleven days sailing Raja Ampat in Indonesia with his son, Anthony." },
  { year: "2026", title: "Miriam's first safari", text: "South Africa and Botswana in May: Monwana, Lion Sands Ivory, Kirkman's Kamp, DumaTau, Mombo and Qorokwe — then the Cape, Madikwe and the Winelands. Filmed for Wild Together.", href: "/journal/wild-together-monwana-thornybush" },
  { year: "Next", title: "Still going", text: "Namibia's Skeleton Coast and Sossusvlei, the reefs of Palawan, and Son Doong in Vietnam are on the list." },
];

export const GUIDING_PRINCIPLES: [string, string, string][] = [
  ["route", "Go first", "James stays, or sits down with the host, before a house earns a stamp. Nothing is listed from a brochure."],
  ["family", "Guide them like family", "Every plan is built the way he plans for Miriam and Anthony: a day for every age, and one long table at night."],
  ["season", "Say who it's not for", "Every house carries an honest 'not for' note. A good guide tells you the trade-offs before you go."],
];

export type Quote = { text: string; place?: string };

// "On Africa" — in James's words.
export const AFRICA_QUOTES: Quote[] = [
  { text: "I have been going back to Africa for most of my life, and it has never once been the same trip twice." },
  { text: "You don't vet a safari lodge from a brochure. You vet it at five in the morning, in the cold, with the guide who will be looking after your children.", place: "Botswana" },
  { text: "The best guides know when to switch off the engine and say nothing. Africa does the talking." },
  { text: "Watching Miriam see her first leopard was worth every one of my forty-four years on the road.", place: "Thornybush, May 2026" },
  { text: "The first sundowner of a safari is when a family stops being busy and starts being together." },
  { text: "In the Okavango the water decides where you go. Sometimes the best plan is the one the land makes for you.", place: "Okavango Delta" },
];

export const FOUNDER_FAQS = [
  { q: "Who is James Wild?", a: "James Wild is the founder of James Wild & Co and its family travel house, Wild & Co Gatherings. He has designed journeys since 1982 — forty-four years on the road — and personally vets every family residence in the Gatherings Ledger." },
  { q: "How long has James Wild been designing travel?", a: "Since 1982. His first journey designed for others was a surf trip to Eleuthera in the Bahamas with friends, and he has been guiding family and friends to the places he has vetted ever since." },
  { q: "How does James Wild vet the houses he recommends?", a: "He visits, stays or speaks with the host before a house is listed, then scores it against the six tests of the Gathering Formula. Every house page shows that evidence — what James did, when, and what it covers. Founder Favorite marks his personal favourites, an opinion shown separately from the evidence." },
  { q: "Has James Wild been on safari in Africa?", a: "Many times. Recent and favourite stays include Tswalu in the Kalahari (2012), Singita Faru Faru in the Serengeti (2012 and 2018), and in May 2026 Monwana, Lion Sands Ivory Lodge, Kirkman's Kamp, DumaTau, Mombo and Qorokwe across South Africa and Botswana, plus Madikwe, the Cape Winelands and Cape Town." },
  { q: "Can James Wild help plan our family's trip?", a: "Yes. Tell us who is coming and the occasion through Plan a gathering. Every trip is advisor-led, with James's notes on each house and a day planned for every age." },
];
