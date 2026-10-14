// ——— Legal details for the Privacy Policy, Terms & Booking Conditions and Your Privacy Choices ———
// DRAFT. Fill every null value, have the pages reviewed by a travel-law attorney, then set reviewed: true.
// While reviewed is false the pages show a "Draft — pending legal review" banner and are kept out of search.

export const LEGAL = {
  reviewed: false,
  effectiveDate: null as string | null, // e.g. "1 November 2026"
  legalName: null as string | null, // the registered company that contracts with travellers, e.g. "James Wild & Co LLC"
  tradingAs: "Wild & Co Gatherings, a house of James Wild & Co",
  address: null as string | null, // registered business address (Florida Seller of Travel registration is location-specific)
  email: null as string | null, // privacy and bookings contact
  phone: null as string | null,
  flSellerOfTravelNo: null as string | null, // Florida Dept. of Agriculture & Consumer Services registration number
  caSellerOfTravelNo: null as string | null, // California CST number, if you sell to California residents
  governingLaw: "the State of Florida",
  venue: null as string | null, // e.g. "Palm Beach County, Florida"
};

// Booking terms — the suggested structure (Oct 2026). Change the numbers here; every page and FAQ follows.
export const BOOKING = {
  depositPct: 20, // of the total trip cost, due at confirmation (or the supplier's higher deposit when required)
  balanceDueDays: 90, // final balance due this many days before travel; bookings inside this window pay in full
  cancellationFeePct: 10, // Wild & Co cancellation fee once a booking is confirmed
  schedule: [
    { from: 91, to: null, charge: "10% of the total trip cost (our cancellation fee), plus any non-refundable supplier costs" },
    { from: 61, to: 90, charge: "50% of the total trip cost" },
    { from: 31, to: 60, charge: "75% of the total trip cost" },
    { from: 0, to: 30, charge: "100% of the total trip cost (including no-shows)" },
  ] as { from: number; to: number | null; charge: string }[],
  refundDays: 30, // refunds paid within this many days of written cancellation, or of the supplier's refund
};

/** Florida s. 559.928(5): this line must appear on every contract, advertisement and travel document. */
export const sellerOfTravelLine = () =>
  LEGAL.flSellerOfTravelNo
    ? `${LEGAL.legalName || "James Wild & Co"} is registered with the State of Florida as a Seller of Travel. Registration No. ${LEGAL.flSellerOfTravelNo}.`
    : null;
