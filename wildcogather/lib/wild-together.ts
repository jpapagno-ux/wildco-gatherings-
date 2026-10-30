import type { Video } from "./types";

// ——— Wild Together: James and Miriam's own film series ———
// James, 30 Oct 2026: Wild Together is his and Miriam's own series, not a MORE film. The Monwana episode is
// credited "Felix Studios and Monwana", worded like the site's other film credits ("Film by Nancy D. Brown, travel writer").
// One source for the episode, so the house page, the MORE collection page and Journal No. 03 say the same thing.
export const WILD_TOGETHER = "Wild Together";
export const WILD_TOGETHER_MONWANA_ID = "YR_8uiBObZ4";
export const WILD_TOGETHER_MONWANA_CREDIT = "Film by Felix Studios and Monwana";

export const wildTogetherMonwana: Video = {
  provider: "youtube",
  id: WILD_TOGETHER_MONWANA_ID,
  title: "Wild Together: My Wife's First Safari — Monwana Lodge, Thornybush, South Africa",
  description: "An episode of Wild Together, James and Miriam Wild's own film series: Miriam's first safari, at Monwana Villa in the Thornybush Nature Reserve, Greater Kruger — leopards, the waterhole and the house we'd book again.",
  credit: WILD_TOGETHER_MONWANA_CREDIT,
};

// Known films by YouTube ID, so an Airtable row with the ID but an empty credit or description still gets the right ones.
const KNOWN: Record<string, Video> = { [WILD_TOGETHER_MONWANA_ID]: wildTogetherMonwana };
export const knownFilm = (id: string | undefined): Video | undefined => (id ? KNOWN[id] : undefined);

const org = (name: string) => ({ "@type": "Organization", name });

/** Who made a film, for its VideoObject: only for films whose makers are on record; empty otherwise. */
export function filmMakers(v: Pick<Video, "id">): Record<string, unknown> {
  if (v.id !== WILD_TOGETHER_MONWANA_ID) return {};
  return {
    creator: org("Felix Studios"),
    productionCompany: org("Felix Studios"),
    contributor: org("Monwana"),
    isPartOf: { "@type": "CreativeWorkSeries", name: WILD_TOGETHER, creator: [{ "@type": "Person", name: "James Wild" }, { "@type": "Person", name: "Miriam Wild" }] },
  };
}
