// Brand map themes for Mapbox.
//
// How it works
// - NEXT_PUBLIC_MAPBOX_TOKEN   public token (pk.…) from mapbox.com → Tokens. Restrict it to your domains.
// - NEXT_PUBLIC_MAPBOX_STYLE   optional. Your own Mapbox Studio style URL (mapbox://styles/<user>/<id>).
//                              When set, the site uses it exactly as designed in Studio.
// - NEXT_PUBLIC_MAPBOX_THEME   paper (default, approved direction) · coast · night.
//                              Used only when no Studio style is set: the site loads Mapbox Light
//                              and recolours it to the brand palette below.
//
// Without a token, the site falls back to the OpenStreetMap map so nothing breaks.

import type { Map as MapboxMap } from "mapbox-gl";

export type MapThemeKey = "paper" | "coast" | "night";

export type MapTheme = {
  ocean: string; land: string; park: string; river: string; road: string;
  admin0: string; admin1: string; label: string; labelHalo: string; water: string;
};

export const MAP_THEMES: Record<MapThemeKey, MapTheme> = {
  // Paper Atlas — the recommended default: paper land, pale coast-ink sea, ink labels.
  paper: { ocean: "#D3DFDC", land: "#F4F1EC", park: "#ECE7DB", river: "#A9C3C0", road: "#DCCFB6", admin0: "rgba(44,42,39,.5)", admin1: "rgba(44,42,39,.12)", label: "#5C564D", labelHalo: "#F4F1EC", water: "#3E7A80" },
  // Coast Ink — bold editorial sea in the Coast & Island ink.
  coast: { ocean: "#22656E", land: "#F4F1EC", park: "#EEE8DA", river: "#7FA6A8", road: "#E0D4BE", admin0: "rgba(44,42,39,.55)", admin1: "rgba(44,42,39,.12)", label: "#4A453E", labelHalo: "#F4F1EC", water: "#E6EFEE" },
  // Night Ledger — navy, for dark feature bands.
  night: { ocean: "#17212D", land: "#2F3E50", park: "#33445A", river: "#40566C", road: "#3B4A5B", admin0: "rgba(244,241,236,.38)", admin1: "rgba(244,241,236,.08)", label: "#C9C1B3", labelHalo: "#17212D", water: "#8FA9B8" },
};

export function mapConfig() {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
  const customStyle = process.env.NEXT_PUBLIC_MAPBOX_STYLE || "";
  const raw = (process.env.NEXT_PUBLIC_MAPBOX_THEME || "paper") as MapThemeKey;
  const themeKey: MapThemeKey = raw in MAP_THEMES ? raw : "paper";
  return {
    token,
    style: customStyle || (themeKey === "night" ? "mapbox://styles/mapbox/dark-v11" : "mapbox://styles/mapbox/light-v11"),
    recolour: !customStyle,
    themeKey,
    theme: MAP_THEMES[themeKey],
  };
}

const HIDE = [/^poi-label/, /^airport-label/, /^transit/, /^road-label/, /^road-number-shield/, /^road-exit-shield/, /^building/, /^aeroway/, /^ferry/];

/** Recolour a Mapbox Light/Dark (v11) style to the brand palette. Safe to call on any style: unknown layers are left alone. */
export function applyBrandTheme(map: MapboxMap, t: MapTheme) {
  const layers = map.getStyle()?.layers || [];
  const set = (id: string, prop: string, value: unknown) => { try { map.setPaintProperty(id, prop as never, value as never); } catch { /* layer lacks this property */ } };
  const lay = (id: string, prop: string, value: unknown) => { try { map.setLayoutProperty(id, prop as never, value as never); } catch { /* ignore */ } };
  for (const l of layers) {
    const id = l.id;
    if (HIDE.some((re) => re.test(id))) { lay(id, "visibility", "none"); continue; }
    if (l.type === "background") { set(id, "background-color", t.land); continue; }
    if (l.type === "fill") {
      if (/water/.test(id)) set(id, "fill-color", t.ocean);
      else if (/^land$|^landcover|land-structure/.test(id)) set(id, "fill-color", t.land);
      else if (/park|national|landuse|wetland|glacier/.test(id)) { set(id, "fill-color", t.park); set(id, "fill-opacity", 0.7); }
      continue;
    }
    if (l.type === "line") {
      if (/waterway|river/.test(id)) set(id, "line-color", t.river);
      else if (/admin-0/.test(id)) { set(id, "line-color", t.admin0); if (!/-bg$/.test(id)) set(id, "line-dasharray", [3, 2]); else lay(id, "visibility", "none"); }
      else if (/admin-1/.test(id)) { set(id, "line-color", t.admin1); if (/-bg$/.test(id)) lay(id, "visibility", "none"); }
      else if (/road|bridge|tunnel/.test(id)) { set(id, "line-color", t.road); }
      continue;
    }
    if (l.type === "symbol") {
      const isWater = /water|waterway|marine/.test(id);
      set(id, "text-color", isWater ? t.water : t.label);
      set(id, "text-halo-color", t.labelHalo);
      set(id, "text-halo-width", 1.2);
      if (/settlement|state-label|country-label/.test(id)) { lay(id, "text-transform", "uppercase"); lay(id, "text-letter-spacing", 0.14); }
      if (isWater) lay(id, "text-letter-spacing", 0.06);
      if (/natural-point|poi/.test(id)) lay(id, "visibility", "none");
    }
    if (l.type === "hillshade") set(id, "hillshade-shadow-color", "rgba(44,42,39,.10)");
  }
}
