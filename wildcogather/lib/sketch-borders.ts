import type { SettingKey } from "./settings";

// ——— Luxe sketch borders ———
// Pen-and-ink panoramas, one per natural setting plus a route divider, stored in Cloudinary under
// gatherings/sketch-borders/luxe/. Each is cropped to a slim band and given one quiet entrance effect.
// Used sparingly: at most one per page, at the foot of a stay page, above the "Plan a gathering" band.

const CLOUD = "https://res.cloudinary.com/jhlnq5h5/image/upload";

export type BorderEffect = "ink" | "tide" | "mist" | "dusk" | "rise" | "shimmer" | "route";

export type SketchBorder = {
  key: SettingKey | "route";
  name: string;
  publicId: string;
  /** Crop of the source (fractions of height): where the drawing sits on the page of paper. */
  crop: { y: number; h: number };
  effect: BorderEffect;
  effectName: string;
  effectNote: string;
  scene: string;
  alt: string;
};

export const SKETCH_BORDERS: SketchBorder[] = [
  {
    key: "savanna", name: "Savanna", publicId: "gatherings/sketch-borders/luxe/savanna-v1", crop: { y: 0.3, h: 0.6 },
    effect: "ink", effectName: "Ink reveal", effectNote: "The drawing inks itself in from left to right, then the sepia wash and the gold sun bloom in.",
    scene: "Two umbrella acacias, a giraffe browsing, a line of elephants crossing at sunset, long grass in the foreground.",
    alt: "Pen-and-ink savanna: acacia trees, a giraffe and a line of elephants at sunset",
  },
  {
    key: "coast", name: "Coast & Island", publicId: "gatherings/sketch-borders/luxe/coast-v1", crop: { y: 0.28, h: 0.58 },
    effect: "tide", effectName: "The tide", effectNote: "Fades in, then drifts a few pixels side to side on a slow fourteen-second swell.",
    scene: "A humpback fluke, a dhow under sail, gulls, and two palms leaning off a rocky point.",
    alt: "Pen-and-ink coastline: a whale's tail, a sailing dhow and palms on a rocky point",
  },
  {
    key: "mountain", name: "Mountain", publicId: "gatherings/sketch-borders/luxe/mountain-v1", crop: { y: 0.22, h: 0.66 },
    effect: "mist", effectName: "Morning mist", effectNote: "Rises out of a soft blur, the way a valley clears after first light.",
    scene: "Snow peaks, pines at both edges, a log cabin with chimney smoke, horses by a winding river.",
    alt: "Pen-and-ink mountain valley: snow peaks, pines, a log cabin and horses by a river",
  },
  {
    key: "desert", name: "Desert", publicId: "gatherings/sketch-borders/luxe/desert-v1", crop: { y: 0.3, h: 0.46 },
    effect: "dusk", effectName: "Dusk", effectNote: "Arrives in cool evening tones and warms to red rock as it comes into view.",
    scene: "Mesas and buttes, a stone arch, canvas tents on decks, yucca, and a crescent moon.",
    alt: "Pen-and-ink red-rock desert: mesas, a stone arch, canvas tents and a crescent moon",
  },
  {
    key: "jungle", name: "Jungle", publicId: "gatherings/sketch-borders/luxe/jungle-v1", crop: { y: 0.25, h: 0.75 },
    effect: "rise", effectName: "Leaves rise", effectNote: "The foliage grows up from the bottom edge of the page and settles.",
    scene: "Monstera and banana leaves, palms, a thatched pavilion, a waterfall pool and a toucan.",
    alt: "Pen-and-ink rainforest: palms, monstera leaves, a thatched pavilion, a waterfall and a toucan",
  },
  {
    key: "polar", name: "Polar & Ice", publicId: "gatherings/sketch-borders/luxe/polar-v1", crop: { y: 0.34, h: 0.58 },
    effect: "shimmer", effectName: "Ice light", effectNote: "Fades in, then a single band of light passes across the ice every few seconds.",
    scene: "Tabular icebergs and their reflections, an expedition ship, penguins on a floe, an albatross.",
    alt: "Pen-and-ink Antarctic scene: tabular icebergs, an expedition ship and penguins on a floe",
  },
  {
    key: "route", name: "The route", publicId: "gatherings/sketch-borders/luxe/route-v1", crop: { y: 0.28, h: 0.46 },
    effect: "route", effectName: "The journey", effectNote: "Draws outward from the compass to both ends — ship on one side, balloon on the other.",
    scene: "A compass rose with a gold north point, a dotted route, a ship, a balloon and an X.",
    alt: "Pen-and-ink divider: a compass rose with a dotted route between a sailing ship and a hot-air balloon",
  },
];

/** Cloudinary delivery URL for the cropped band (auto format and quality, so JPG/WebP/AVIF as the browser allows). */
export function borderSrc(b: SketchBorder, width = 1800, format: "auto" | "jpg" = "auto") {
  return `${CLOUD}/c_crop,g_north,w_1.0,h_${b.crop.h},y_${b.crop.y}/c_scale,w_${width}/f_${format},q_auto/${b.publicId}`;
}

/** Full uncropped drawing as a JPG, for download or print. */
export function borderJpg(b: SketchBorder, width = 2400) {
  return `${CLOUD}/c_scale,w_${width}/f_jpg,q_90/fl_attachment:${b.publicId.split("/").pop()}/${b.publicId}`;
}

export function borderFor(key: SettingKey | "route") {
  return SKETCH_BORDERS.find((b) => b.key === key);
}
