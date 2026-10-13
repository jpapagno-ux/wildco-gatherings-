import type { Residence } from "./types";
import type { SettingKey } from "./settings";

// Sample rows are written without a setting; these values mirror Airtable Residences › Setting,
// Best season, Power & plugs and Time zone (filled Oct 2026). Empty values are not shown on the site.
export type SampleResidence = Omit<Residence, "setting"> & { setting?: SettingKey };

const BY_SLUG: Record<string, { setting: SettingKey; notes: Residence["notes"] }> = {
  "lone-mountain-ranch": { setting: "mountain", notes: { bestSeason: "Summer Jun–Sep · winter Dec–Mar", power: "120V · type A/B", timeZone: "Mountain Time (MT)" } },
  "como-shambhala-estate": { setting: "jungle", notes: { bestSeason: "Dry season · Apr–Oct", power: "230V · type C/F", timeZone: "UTC+8 · WITA" } },
  "como-uma-canggu": { setting: "coast", notes: { bestSeason: "Dry season · Apr–Oct", power: "230V · type C/F", timeZone: "UTC+8 · WITA" } },
  "como-parrot-cay": { setting: "coast", notes: { bestSeason: "Dry season · Dec–Apr", power: "120V · type A/B", timeZone: "Eastern Time (ET)" } },
  "vermejo-ted-turner-reserve": { setting: "mountain", notes: { bestSeason: "Summer & autumn", power: "120V · type A/B", timeZone: "Mountain Time (MT)" } },
  "ladder-ted-turner-reserve": { setting: "desert", notes: { bestSeason: "Spring & autumn", power: "120V · type A/B", timeZone: "Mountain Time (MT)" } },
  "armendaris-ted-turner-reserve": { setting: "desert", notes: { bestSeason: "Spring & autumn", power: "120V · type A/B", timeZone: "Mountain Time (MT)" } },
  "sierra-grande-ted-turner-reserve": { setting: "desert", notes: { bestSeason: "Autumn to spring", power: "120V · type A/B", timeZone: "Mountain Time (MT)" } },
  "fish-eagle-villa-lion-sands": { setting: "savanna", notes: { bestSeason: "Dry season May–Oct for game viewing; green season Nov–Apr", power: "230V · type M/D/N", timeZone: "UTC+2 · SAST" } },
  "hinkwenu-villa-lion-sands": { setting: "savanna", notes: { bestSeason: "Dry season May–Oct for game viewing; green season Nov–Apr", power: "230V · type M/D/N", timeZone: "UTC+2 · SAST" } },
  "monwana-villa-thornybush": { setting: "savanna", notes: { bestSeason: "Dry season May–Oct for game viewing; green season Nov–Apr", power: "230V · type M/D/N", timeZone: "UTC+2 · SAST" } },
};

export function withSetting(r: SampleResidence): Residence {
  const s = BY_SLUG[r.slug];
  return { ...r, setting: r.setting || s?.setting || "mountain", notes: r.notes || s?.notes } as Residence;
}
