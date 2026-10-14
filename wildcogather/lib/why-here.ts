import type { WhyHere } from "./types";

// "Why here" — James's reason for each house, in his words, with a short film.
// Shown under the hero on the house page. Airtable fields override these (see lib/data.ts);
// keep this map as the fallback so a house never loses its film.
// Quotes are drafted in James's voice for his approval (Oct 2026).
export const WHY_HERE: Record<string, WhyHere> = {
  "monwana-villa-thornybush": {
    quote: "Monwana is where Miriam saw her first leopard, from a house we had to ourselves. I chose it because a family can truly be together here: one long table, one waterhole, and a guide who knows when to switch off the engine and say nothing.",
    watch: "Watch this before you go. By the end you'll know which chair on the deck is yours at sundown.",
    film: { provider: "youtube", id: "yTjquA76G4Q", title: "Monwana Lodge, Thornybush — the film", credit: "James Wild & Co" },
  },
};
