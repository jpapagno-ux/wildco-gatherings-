import type { SettingKey } from "./settings";

export type Status = "Prospect" | "Vetting" | "Approved" | "Live" | "Paused";
// Under observation = on the list · Host met = J.W. vetted it in conversation with the host
// Field verified = J.W. toured and stayed · Gathering verified = visited and passes all six tests
// Founder favorite = visited and returned
export type Stamp = "Under observation" | "Host met" | "Field verified" | "Gathering verified" | "Founder favorite";

export type Host = { name: string; title: string; headshot?: Img; metOn?: string; how?: string; note: string };

export type Img = { publicId: string; alt: string; caption?: string; credit?: string; role?: string; order?: number };

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
  seoTitle: string;
  metaDescription: string;
  credit: string;
};

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
