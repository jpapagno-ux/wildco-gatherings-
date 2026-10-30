import type { SettingKey } from "./settings";

export type Status = "Prospect" | "Vetting" | "Approved" | "Live" | "Paused";
// Under observation = on the list · Vetted partner = J.W. vetted the property as a partner; not yet stayed · Host met = J.W. vetted it in conversation with the host
// Founder inspected & approved = J.W. inspected the house in person and approved it (see Evidence for stays) · Gathering verified = visited and passes all six tests
// Founder favorite = visited and returned
export type Stamp = "Under observation" | "Vetted partner" | "Host met" | "Founder inspected & approved" | "Gathering verified" | "Founder favorite";

export type Host = { name: string; title: string; headshot?: Img; metOn?: string; how?: string; note: string };

export type Img = {
  publicId: string;
  alt: string;
  caption?: string;
  credit?: string;
  role?: string;
  order?: number;
  aspect?: string;
  gravity?: string;
  focalPoint?: string;
  objectPosition?: string;
  permission?: "confirmed" | "pending" | "declined" | "unknown";
  altStatus?: "reviewed" | "draft" | "needs_review";
  width?: number;
  height?: number;
  subjectDescription?: string;
};

export type Experience = {
  name: string;
  category: string;
  ages: string[];
  seasons: string[];
  description: string;
  image?: Img;
};

export type Faq = { question: string; answer: string };

// Film for the house page. YouTube first (best for AEO: Google indexes it and the VideoObject),
// Vimeo when the house only publishes there.
export type Video = {
  provider: "youtube" | "vimeo";
  id: string;
  title: string;
  description?: string;
  duration?: string; // ISO 8601, e.g. PT2M4S
  uploadDate?: string; // YYYY-MM-DD
  thumbnail?: string;
  credit?: string;
  // Vimeo privacy hash for an unlisted film (the h=… in its share link). Added to the player URL only.
  hash?: string;
};

// One row in "Where everyone sleeps". `whole` marks the buyout / whole-house row.
export type RoomCategory = {
  name: string;
  count?: string;
  bedrooms?: string;
  sleeps?: string;
  inside: string;
  fit?: string; // J.W.'s one-line family fit
  whole?: boolean;
};

// Booking facts, pricing and inclusions. "[confirm]" in any value shows it is still to check with the house.
export type Booking = {
  plan: string;
  bookVia: string;
  wholeHouse?: string;
  minStay?: string;
  checkIn?: string;
  checkOut?: string;
  deposit?: string;
  cancellation?: string;
  children?: string;
  rateBasis?: string;
  fees: { label: string; value: string }[];
  included: string[];
  excluded: string[];
  checked?: string; // e.g. "Oct 2026"
};

export type Residence = {
  slug: string;
  entryNo: string;
  name: string;
  place: string;
  region: string;
  country: string;
  lat?: number;
  lng?: number;
  status: Status;
  stamp: Stamp;
  // Natural setting: picks the ink for the luggage tag, VIP stamp and VIP card, and groups the house on /houses.
  setting: SettingKey;
  // "Notes for the family" icon row. Empty values are simply not shown.
  notes?: { bestSeason?: string; power?: string; timeZone?: string };
  // Featured on the home page (Airtable "Featured on home"), with its journal story / film.
  featured?: boolean;
  firstVisited?: string;
  returned?: string;
  host?: Host;
  partner?: { name: string; logo?: Img; url?: string };
  line: string;
  verdict: string[];
  bestFor?: string;
  notFor: string;
  bedrooms?: string;
  sleeps?: number;
  units?: number;
  kidsProgram?: string;
  kidsAges?: string;
  water: string;
  seasons: string[];
  rateFrom?: number;
  rateUnit?: string;
  airport?: string;
  address?: string;
  officialUrl?: string;
  // A Wild & Co presentation for the house (PDF in /public/docs), opened in the browser.
  brochure?: { label: string; url: string; pages?: number };
  // The house's own published programmes (e.g. a camp's safaris), shown as an at-a-glance card.
  programs?: { title: string; note?: string; items: { name: string; length: string; shape: string; bestFor: string; from?: string }[] };
  formula: { test: string; note: string; pass: boolean }[];
  fieldNotes: string[];
  manifest: { day: string; morning: string; afternoon: string; evening: string }[];
  experiences: Experience[];
  faqs: Faq[];
  images: Img[];
  booking?: Booking;
  // Gatherings VIP = Vetted in Purpose: places that protect the land they stand on.
  vip?: { collection: string; collectionSlug: string; visit?: string; why: string; fit?: string };
  rooms: RoomCategory[];
  videos: Video[];
  // "Why here": James's reason for the house, in his words, with a short film shown under the hero.
  whyHere?: WhyHere;
  // Live booking engine page for this house (Airtable "Live booking URL"), e.g. book.wildearthstays.com/en/property/…
  liveBookingUrl?: string;
  seoTitle: string;
  metaDescription: string;
  credit: string;
};

export type WhyHere = { quote: string; watch?: string; film?: Video };

// A Journal entry. Body is written in Airtable as plain text:
//   blank line = new paragraph · "## " = heading · "> " = James quote · "- " = bullet · "![Fig. caption](cloudinary-id)" = photo
export type Post = {
  slug: string;
  number: string; // "01"
  kicker: string; // "Why it's in the Ledger"
  title: string;
  dek: string;
  house?: string; // residence slug
  collection?: string; // VIP collection slug, e.g. ted-turner-reserves
  author: string;
  authorTitle: string;
  date: string; // YYYY-MM-DD
  readMinutes: number;
  hero?: Img;
  // Featured film (e.g. a Wild Together episode). YouTube ID in Airtable "YouTube ID"; empty = a "film to come" slot on drafts.
  video?: Video;
  videoPlanned?: string;
  body: string;
  draft?: boolean;
  seoTitle: string;
  metaDescription: string;
};
