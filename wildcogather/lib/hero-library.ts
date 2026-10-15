import type { Img } from "./types";
import type { RegionKey } from "./regions";

// James Wild Co Hero library (Cloudinary folder "James Wild Co Hero") — Getty Images, licensed by James Wild & Co
// for web and marketing use. Alt text describes what is in each frame, not a specific house.

const h = (id: string, alt: string): Img => ({ publicId: `GettyImages-${id}`, alt });

export const HOME_HERO: Img = h("1363882925", "A family gathered on a shaded open-air terrace above the sea");

// One image per region, for the Destinations cards and region page headers.
export const REGION_HERO: Record<RegionKey, Img> = {
  "usa-mexico": h("1462563623", "Red rock canyon walls glowing at sunset above a green valley"),
  caribbean: h("2200705047", "Palms leaning over a white beach and turquoise water, a small boat moored off the shore"),
  "latin-america": h("520467166", "Stone terraces of Machu Picchu beneath a mountain peak in soft evening light"),
  europe: h("986448764", "A sunlit yellow house with a flower-filled balcony and a green front door"),
  africa: h("578876890", "A hot-air balloon drifting over acacia-dotted savanna at sunrise"),
  asia: h("1169143934", "Karst islands rising from a turquoise lagoon"),
  oceania: { publicId: "gatherings/the-lindis-ahuriri-valley/li-02", alt: "The Black Diamond pyramid shelter above the Ahuriri Valley, New Zealand, with snow-dusted mountains beyond" },
};

// Atmosphere images for a card or panel that has no photograph of its own yet, matched by theme.
const THEMES: [RegExp, Img[]][] = [
  [/surf|wave|teahupo|freediv/i, [h("1045085656", "A freediver gliding beneath a breaking wave over the reef")]],
  [/dive|diving|snorkel|reef|coral|whale|underwater/i, [h("1344745264", "A rose-shaped coral in clear turquoise water"), h("605379877", "A diver beside a humpback whale in deep blue water"), h("2163635000", "Half above, half below: a reef beneath a green island")]],
  [/vanilla|plantation|jungle|rainforest|forest|garden|fern|frog/i, [h("966223746", "A fern frond unfurling in green forest light"), h("686735553", "A wooden boat at the edge of a jungle river")]],
  [/pearl|lagoon|motu|sandbar|overwater|catamaran|island/i, [h("1378209643", "A turquoise lagoon over a coral reef seen from the air"), h("1262623930", "A catamaran anchored off a sandbar islet in turquoise water"), h("1016864686", "A thatched overwater hut at the end of a timber pier over a clear lagoon")]],
  [/safari|game drive|wildlife|lion|elephant|giraffe|rhino|bush|savanna|hippo/i, [h("906210770", "Giraffes beside a safari track on golden savanna"), h("813447208", "A male lion in soft light"), h("1185743639", "Hippos surfacing in a river")]],
  [/horse|riding|trek/i, [h("523194648", "Riders on horseback crossing a plain beneath snow mountains")]],
  [/heli|glacier|snow|ski|alpine|mount|peak|hike|hiking/i, [h("699088407", "A snow-covered mountain peak against a blue sky"), h("1394040590", "A forested valley beneath a mountain peak at dusk")]],
  [/raft|river|kayak|fish|canoe/i, [h("1320314363", "A raft running river rapids between boulders")]],
  [/sail|yacht|boat|ship|cruise/i, [h("1326090846", "A tall ship under sail beneath a dramatic sky")]],
  [/canyon|desert|red rock|slot/i, [h("1462563623", "Red rock canyon walls glowing at sunset above a green valley")]],
  [/culture|village|town|market|weav|craft|cook|chef|dinner|table|wine/i, [h("986448764", "A sunlit yellow house with a flower-filled balcony"), h("864866320", "Two women carrying baskets between palms at sunrise")]],
  [/beach|coast|sea|ocean|bay|swim/i, [h("1330758751", "A white beach curving around turquoise shallows, seen from the air"), h("1497708699", "A swimmer in clear turquoise water below a white beach")]],
];
const DEFAULTS: Img[] = [h("1205839281", "The edge of an infinity pool, mountains mirrored in still water at golden hour"), h("633708557", "Golden evening light on a terrace among the trees"), h("1330758751", "A white beach curving around turquoise shallows, seen from the air")];

function pick(list: Img[], seed: string): Img {
  let n = 0;
  for (let i = 0; i < seed.length; i++) n = (n * 31 + seed.charCodeAt(i)) >>> 0;
  return list[n % list.length];
}

export function atmosphereFor(hint = ""): Img {
  for (const [re, list] of THEMES) if (re.test(hint)) return pick(list, hint);
  return pick(DEFAULTS, hint);
}
