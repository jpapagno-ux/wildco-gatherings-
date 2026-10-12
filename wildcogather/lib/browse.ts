// One place to group stays for browsing: the "Stays" menu, /houses, region pages and "More stays" rails.
// Everything is derived from the residence rows, so a new Airtable row lands in the right menu
// column, count and rail without code changes. Add a region in lib/regions.ts, a setting in lib/settings.ts.
import type { Img, Residence } from "./types";
import { REGIONS, regionFor, type RegionKey } from "./regions";
import { SETTINGS, SETTING_ORDER, type SettingKey } from "./settings";

export type NavGroup = { href: string; label: string; count: number; sub?: string };

// Compact, serialisable model for the header (a client component) — counts only, never every stay.
export type BrowseNav = { total: number; regions: NavGroup[]; settings: NavGroup[] };

export function browseNav(all: Residence[]): BrowseNav {
  return {
    total: all.length,
    // Every region stays in the menu (empty ones show "being curated"), so the menu doesn't reshuffle as stays arrive.
    regions: REGIONS.map((r) => ({ href: `/destinations/${r.key}`, label: r.label, count: all.filter((h) => regionFor(h) === r.key).length })),
    settings: SETTING_ORDER.map((k) => ({ href: `/houses#${k}`, label: SETTINGS[k].name, sub: SETTINGS[k].sub, count: all.filter((h) => h.setting === k).length })).filter((g) => g.count),
  };
}

export const staysInRegion = (all: Residence[], key: RegionKey) => all.filter((h) => regionFor(h) === key);
export const staysInSetting = (all: Residence[], key: SettingKey) => all.filter((h) => h.setting === key);

// Other stays to keep browsing from a house page: same region first, then same setting.
export function relatedStays(all: Residence[], r: Residence, max = 8): Residence[] {
  const region = regionFor(r);
  const others = all.filter((h) => h.slug !== r.slug);
  const near = others.filter((h) => regionFor(h) === region);
  const alike = others.filter((h) => regionFor(h) !== region && h.setting === r.setting);
  return [...near, ...alike].slice(0, max);
}

// The one photo a stay shows on any card, so every grid and rail looks alike:
// Airtable Role "Hero" first, then "Card" (James's own photo), then the first photo.
export const cardImage = (r: Residence): Img | undefined =>
  r.images.find((i) => i.role === "Hero") || r.images.find((i) => i.role === "Card") || r.images[0];
