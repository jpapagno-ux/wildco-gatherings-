// ——— Live booking: houses bookable online through the James Wild Stays (Wild Earth Stays) engine ———
// The engine is built by TAG and runs on ALBIE (book.wildearthstays.com). It shows live, dynamic rates for the
// dates chosen and takes the booking and payment itself. This site only builds the link with the family's dates.
// Facts below were read from the engine on 14 Oct 2026 (search 7–10 Nov 2026). Rates are never copied here — they move.

export type LiveRoom = { name: string; engineTitle: string; size?: string; beds: string; sleeps: string; features: string };

export type LiveBooking = {
  engineUrl: string; // property page on the engine, without query string
  provider: string;
  currency: string;
  taxNote: string;
  ratePlans: string[];
  termsNote: string;
  rooms: LiveRoom[];
  checked: string;
};

export const LIVE_BOOKING: Record<string, LiveBooking> = {
  "leeu-estates-franschhoek": {
    engineUrl: "https://book.wildearthstays.com/en/property/leeu-estates-resorts",
    provider: "James Wild Stays · booking engine by TAG, powered by ALBIE",
    currency: "USD",
    taxNote: "Rates are shown before 15% VAT, which is added per room night at checkout.",
    ratePlans: ["Best Available Rate", "Length of Stay Discount — 15% off stays of three nights or more"],
    termsNote: "Each rate shows its own payment and cancellation terms before you pay. On the current flexible rate, payment is taken in full when you book and cancellation is free up to 14 days before arrival.",
    rooms: [
      { name: "Manor House Suite", engineTitle: "Manor House Suite with Hot Tub & Fire Pit", size: "115 m²", beds: "1 queen", sleeps: "2 adults", features: "Separate lounge, hot tub, fire pit and fireplace, telescope, private path to the spa" },
      { name: "The Oaks", engineTitle: "Private Family Cottage with Franschhoek Valley View", size: "98 m²", beds: "1 queen · 1 double", sleeps: "Up to 4", features: "Two rooms (showers only), lounge, hot tub and a large terrace garden" },
      { name: "Fynbosch Cottage", engineTitle: "Private Cottage with Plunge Pool & Butler Service", size: "130 m²", beds: "1 queen", sleeps: "2", features: "Private garden, plunge pool, outdoor hot tub, pergola veranda and a dedicated butler" },
      { name: "Vineyard Cottage", engineTitle: "Two-Bedroom Cottage with Private Plunge Pool", size: "85 m²", beds: "1 queen · 2 singles", sleeps: "Up to 4", features: "Two rooms and a shared lounge with fireplace, terrace and plunge pool over the vines" },
      { name: "Protea House", engineTitle: "Private Getaway with Pool, Braai Area & Valley View", size: "206 m²", beds: "3 king", sleeps: "Up to 6", features: "Executive Suite, Deluxe and Classic rooms interleading, open-plan lounge, pantry, pool, pool house and braai" },
    ],
    checked: "14 Oct 2026",
  },
};

export const liveBookingFor = (slug: string) => LIVE_BOOKING[slug];

/** The engine link for a family's dates and party. Dates are YYYY-MM-DD. */
export function engineLink(base: string, q: { checkIn: string; checkOut: string; adults: number; children: number; rooms: number; currency?: string }) {
  const p = new URLSearchParams({ checkIn: q.checkIn, checkOut: q.checkOut, adults: String(q.adults), children: String(q.children), infants: "0", currency: q.currency || "USD", rooms: String(q.rooms) });
  return `${base}?${p.toString()}`;
}

// ——— Longer journeys on Wild & Co Safaris that include a house ———
// Shown as a feature on the house page. The Safaris site is an internal review build today, so the card
// links there only when NEXT_PUBLIC_SAFARIS_PUBLIC=1; until then it invites families to ask us for it.
export type SafariFeature = { route: string; title: string; nights: number; summary: string; stops: [string, number][]; season: string; path: string; houseNote: string };

export const SAFARI_FEATURES: Record<string, SafariFeature> = {
  "leeu-estates-franschhoek": {
    route: "The Grand Traverse · Route 01",
    title: "Wine. Wildlife. Wilderness.",
    nights: 13,
    summary: "A private-guided journey from Cape Town and the Winelands to the Sabi Sands, the Linyanti and the Okavango Delta — your own guide and vehicle throughout, three-night minimums at every camp.",
    stops: [["Cape Town", 3], ["Franschhoek", 1], ["Sabi Sands", 3], ["Linyanti", 3], ["Okavango Delta", 3]],
    season: "Best May–September",
    path: "/grand-traverse/wine-wildlife-wilderness/",
    houseNote: "Its Franschhoek night is with the Leeu Collection — extend it here at Leeu Estates for a family.",
  },
};

export const SAFARIS_URL = (process.env.NEXT_PUBLIC_SAFARIS_URL || "https://wildandcosafarisfinal.vercel.app").replace(/\/$/, "");
export const SAFARIS_PUBLIC = process.env.NEXT_PUBLIC_SAFARIS_PUBLIC === "1";
