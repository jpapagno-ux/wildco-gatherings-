// ——— James Wild & Co: the four volumes ———
// One configuration for the ecosystem header, footer and "Build Your Journey".
// Addresses are only linked once verified. Override any of them with environment variables in Vercel
// (no code change): NEXT_PUBLIC_JWCO_HOME_URL, NEXT_PUBLIC_STAYS_URL, NEXT_PUBLIC_SAFARIS_URL, NEXT_PUBLIC_VOYAGES_URL.
//
// Safaris — one door only (James's rule, 30 Oct 2026): Wild & Co Safaris is reached only through the House of
//    James Wild & Co hand-over page, https://www.jameswildco.com/safaris/wild-co-safaris. Nothing on this site links
//    to the Safaris site itself or to any of its pages. NEXT_PUBLIC_SAFARIS_URL can still move the door, but an address
//    on the Safaris site's own hosts (wildcosafaris…, wildandcosafaris…) is ignored and the House page is used instead.
//    Shared Safaris ledger IDs (WCS-ZA-…) stay in the data and the Ledger as plain IDs, never as links.
//
// Verified 14 Oct 2026:
//  • Gatherings — wildco-gatherings1.vercel.app is the production alias of this project ("wildcogather").
//  • Stays — www.wildearthstays.com is the legacy Stays site named in the ecosystem brief (James's own site).
//  • Master homepage — not yet verified (a "james-wild-and-company" deployment exists but is access-protected),
//    so the House seal does not link out until NEXT_PUBLIC_JWCO_HOME_URL is set.
//  • Voyages — no address yet: shown as "Coming soon".

export type VolumeKey = "stays" | "safaris" | "gatherings" | "voyages";
export type VolumeLink = { key: VolumeKey; label: string; href?: string; external: boolean; current: boolean; soon: boolean; note?: string };

const env = (v?: string) => (v && /^https?:\/\//.test(v) ? v : undefined);

/** The one door to Wild & Co Safaris: the House of James Wild & Co hand-over page. */
export const SAFARIS_DOOR = "https://www.jameswildco.com/safaris/wild-co-safaris";
const SAFARIS_SITE_HOST = /^https?:\/\/[^/]*wild(?:and)?cosafaris/i;
/** The Safaris link used everywhere on this site: the env override if it is not the Safaris site itself, else the door. */
export const SAFARIS_URL = ((v) => (v && !SAFARIS_SITE_HOST.test(v) ? v : SAFARIS_DOOR))(env(process.env.NEXT_PUBLIC_SAFARIS_URL));

export const MASTER_HOME_URL = env(process.env.NEXT_PUBLIC_JWCO_HOME_URL);

export const VOLUMES: VolumeLink[] = [
  { key: "stays", label: "Stays", href: env(process.env.NEXT_PUBLIC_STAYS_URL) || "https://www.wildearthstays.com/", external: true, current: false, soon: false, note: "Stays — the legacy Wild Earth Stays site" },
  { key: "safaris", label: "Safaris", href: SAFARIS_URL, external: true, current: false, soon: false, note: "Safaris — through the House of James Wild & Co" },
  { key: "gatherings", label: "Gatherings", href: "/", external: false, current: true, soon: false },
  (() => {
    const href = env(process.env.NEXT_PUBLIC_VOYAGES_URL);
    return { key: "voyages" as const, label: "Voyages", href, external: !!href, current: false, soon: !href };
  })(),
];

export const volume = (k: VolumeKey) => VOLUMES.find((v) => v.key === k)!;

// The Gatherings volume's own navigation (secondary row).
// Destinations live inside "The Houses" menu (by region), so the top row stays to one job per link.
export const GATHERINGS_NAV: [string, string][] = [
  ["/itineraries", "Family Journeys"],
  ["/vip", "Gatherings VIP"],
  ["/journal", "Journal"],
  ["/how-it-works", "How It Works"],
  ["/advisors", "Advisors"],
];

export const BRAND = {
  house: "James Wild & Co",
  volume: "Wild & Co Gatherings",
  endorsement: "By the House of James Wild & Co",
};

// Iggi: the shared conversation guide. The internal agent ID is independent of the display name.
export const IGGI = {
  agentId: "jwco-journey-guide",
  name: "Iggi",
  intro: "Meet Iggi, your journey guide at James Wild & Co. Explore the four volumes, compare the details, and bring your next journey together in My Folios.",
  live: false, // No Iggi service is connected yet. Questions go to an advisor through the existing enquiry flow.
};
