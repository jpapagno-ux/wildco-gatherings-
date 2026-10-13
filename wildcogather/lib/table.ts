// "At the Table" — dining and shared-table experiences, shown as cards on a stay's page.
// For any stay whose food is part of why a family gathers there: a restaurant, a sleigh-ride
// supper, a Sunday barbecue, a private chef's dinner. No outside links are shown; booking goes
// through us.
//
// Airtable: table "At the Table" (one row per card). A stay with no rows shows no section.
// Cloudinary: gatherings/<house-slug>/table/<card-slug> — leave Image empty until the photo is
// uploaded; the card is designed to stand on its own without one.
import type { Img } from "./types";

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID || "appnpcCxUZcapAgbo";

export type TableKind = "Restaurant" | "Dinner experience" | "Family night" | "Lunch experience" | "Bar & lounge" | "Private dinner";

export type TableCard = {
  slug: string;
  house: string; // house slug
  name: string;
  kind: TableKind;
  where: string;
  when: string; // season and days
  who: string; // ages / who can come
  gathering: string; // why it works for a family gathering (the answer-first line)
  menu: string[]; // a few things on the table
  booking: string;
  image?: Img;
  order: number;
};

/** Optional one-paragraph answer for "Where do families eat at …?" — falls back to an automatic one. */
export const TABLE_INTRO: Record<string, string> = {
  "leeu-estates-franschhoek":
    "At Leeu Estates the family eats at The Dining Room, which is kept for resident guests and cooks from the estate's own gardens, and the grown-ups book a night at La Petite Colombe. Wine is next door: the Mullineux & Leeu Wine Studio pours a tutored tasting included with every stay.",
  "morukuru-farm-house-madikwe":
    "At Morukuru the house chef cooks for your family alone — breakfast when everyone is up, lunch on the lawn, supper in the boma — and teaches a cooking class to anyone who wants one.",
  "jacis-madikwe-house":
    "At Jaci's Madikwe House a private chef cooks in the house, with a pizza oven and a safari bar on hand; on lodge nights the family joins open-air breakfasts, fireside dinners and the boma.",
  "here-somewhere-nowhere-maldives":
    "At .Here the family eats at SAFAR, the overwater restaurant, whose seasonal menus take their name from the Dhivehi word for journey — or stays in, at the residence's own long table. On the best days lunch is on a private sandbank and the evening ends with a golden-hour sail and a barbecue aboard ASMAS.",
  "lone-mountain-ranch":
    "At Lone Mountain Ranch the table moves with the season. In winter, families ride a horse-drawn sleigh to a lamp-lit cabin for prime rib and huckleberry cobbler; in summer, Sunday nights mean a barbecue in Ranch Hall with s'mores at the fire pit. Horn & Cantle, the ranch's restaurant, cooks with local and Montana produce.",
};

export const sampleTable: TableCard[] = [
  {
    slug: "the-dining-room-leeu-estates", house: "leeu-estates-franschhoek", order: 1,
    name: "The Dining Room", kind: "Restaurant",
    where: "The Conservatory, Leeu Estates",
    when: "Breakfast, lunch and dinner",
    who: "Resident guests only",
    gathering: "The estate's own restaurant, open only to people staying at Leeu Estates, cooking with produce from its gardens. The easy dinner for the whole family on arrival night.",
    menu: ["#LeeuLocallyGrown produce from the estate gardens", "Mullineux & Leeu Family Wines"],
    booking: "Booked with your stay",
    image: { publicId: "gatherings/leeu-estates-franschhoek/leeu-estates-dining-room-conservatory", alt: "The Dining Room conservatory at Leeu Estates, Franschhoek" },
  },
  {
    slug: "la-petite-colombe", house: "leeu-estates-franschhoek", order: 2,
    name: "La Petite Colombe", kind: "Restaurant",
    where: "On the estate",
    when: "Ask us for the season's hours",
    who: "The grown-ups",
    gathering: "The sister of La Colombe in Constantia, for the night the grandparents take the parents out to dinner.",
    menu: ["A tasting menu"],
    booking: "Reserve ahead — we book it with your stay",
    image: { publicId: "gatherings/leeu-estates-franschhoek/la-petite-colombe-cuisine-leeu-estates", alt: "A dish at La Petite Colombe, Leeu Estates" },
  },
  {
    slug: "wine-studio-tasting", house: "leeu-estates-franschhoek", order: 3,
    name: "The Wine Studio", kind: "Bar & lounge",
    where: "Mullineux & Leeu Family Wines, on the estate",
    when: "Daily, booked ahead",
    who: "Adults",
    gathering: "A tutored tasting with the wines Chris and Andrea Mullineux make for the estate — one is included in every stay.",
    menu: ["Mullineux & Leeu Family Wines", "Swartland wines from Roundstone Farm"],
    booking: "Included once per stay — book ahead",
    image: { publicId: "gatherings/leeu-estates-franschhoek/mullineux-leeu-wine-studio", alt: "The Wine Studio at Leeu Estates, Franschhoek" },
  },
  {
    slug: "morukuru-boma-supper", house: "morukuru-farm-house-madikwe", order: 1,
    name: "Supper in the boma", kind: "Dinner experience",
    where: "The Farm House boma",
    when: "Evenings",
    who: "The whole family",
    gathering: "Your own chef, your own fire and nobody else at the table — the night the stories from the afternoon drive get told.",
    menu: ["Cooked by the house chef for your family"],
    booking: "Included",
    image: { publicId: "gatherings/morukuru-farm-house-madikwe/morukuru-farm-house-06", alt: "A long table on the lawn under the trees at Morukuru Farm House" },
  },
  {
    slug: "morukuru-cooking-class", house: "morukuru-farm-house-madikwe", order: 2,
    name: "Cooking with the chef", kind: "Family night",
    where: "The Farm House kitchen",
    when: "Any afternoon",
    who: "All ages",
    gathering: "A class with the house chef — the youngest roll the dough, the grandparents taste, and it all comes back as dinner.",
    menu: ["What the family cooks together"],
    booking: "Ask us to arrange it",
  },
  {
    slug: "jacis-boma-dinner", house: "jacis-madikwe-house", order: 1,
    name: "Boma dinner", kind: "Dinner experience",
    where: "The boma at Jaci's",
    when: "Evenings",
    who: "The whole family",
    gathering: "Lanterns, a fire and dinner under the trees, with the sounds of the reserve around the table.",
    menu: ["Flavour-led cooking with local ingredients"],
    booking: "Included",
    image: { publicId: "gatherings/jacis-madikwe-house/jacis-madikwe-boma-dinner", alt: "Boma tables set under the trees for dinner at Jaci's, Madikwe" },
  },
  {
    slug: "jacis-pizza-night", house: "jacis-madikwe-house", order: 2,
    name: "Pizza night at the house", kind: "Family night",
    where: "Jaci's Madikwe House",
    when: "Any evening",
    who: "All ages",
    gathering: "The house has its own pizza oven and a private chef. Give the children an evening of their own choosing.",
    menu: ["Wood-fired pizza", "Drinks from the safari bar"],
    booking: "Ask your chef",
  },
  {
    slug: "safar", house: "here-somewhere-nowhere-maldives", order: 1,
    name: "SAFAR", kind: "Restaurant",
    where: "Overwater, at .Here",
    when: "Ask us for the season's hours",
    who: "Residence guests",
    gathering: "The island's restaurant, built over the water, with seasonal menus named for SAFAR — the Dhivehi word for journey. Long, unhurried dinners for the whole family above the lagoon.",
    menu: ["Seasonal menus", "Refined overwater dining", "Drinks at the SAFAR bar"],
    booking: "Booked with your stay",
    image: { publicId: "gatherings/here-maldives/safar-restaurant-overwater", alt: "SAFAR, the overwater restaurant at .Here Maldives" },
  },
  {
    slug: "dinner-at-the-residence", house: "here-somewhere-nowhere-maldives", order: 2,
    name: "Dinner at the residence", kind: "Private dinner",
    where: "Your residence's table, terrace or beach",
    when: "Any evening",
    who: "The whole family",
    gathering: "When nobody wants to move: dinner in one of .Here's intimate private settings — the residence's own long table, its terrace or its beach — arranged by your Roohu.",
    menu: ["Private dining, set where you choose"],
    booking: "Ask us to arrange it",
    image: { publicId: "gatherings/here-maldives/somewhere-residence-family-dinner-table", alt: "Dinner table for the whole family in a four-bedroom residence, .Here" },
  },
  {
    slug: "sandbank-lunch", house: "here-somewhere-nowhere-maldives", order: 3,
    name: "Lunch on a sandbank", kind: "Lunch experience",
    where: "A secluded sandbank in Baa Atoll",
    when: "On a curated day, after the mantas",
    who: "The whole family",
    gathering: "A private lunch on a sandbank of your own after a morning with the manta rays — the day your Roohu plans when the season and the tides line up.",
    menu: ["Private lunch on the sandbank"],
    booking: "Ask us to arrange it",
    image: { publicId: "gatherings/here-maldives/private-sandbank-lunch", alt: "A private sandbank in Baa Atoll, .Here Maldives" },
  },
  {
    slug: "asmas-sunset-barbecue", house: "here-somewhere-nowhere-maldives", order: 4,
    name: "Sunset on ASMAS", kind: "Dinner experience",
    where: "Aboard ASMAS, the private boat",
    when: "Golden hour",
    who: "The whole family",
    gathering: "A golden-hour sail on the island's private boat with its own crew, ending with a bespoke barbecue — or dinner on board — as the light goes.",
    menu: ["Bespoke barbecue", "Private dining on board"],
    booking: "Ask us to arrange it",
    image: { publicId: "gatherings/here-maldives/thila-residence-barbecue", alt: "Beach barbecue at the Thila residence, Nowhere island" },
  },
  {
    slug: "sleigh-ride-dinner", house: "lone-mountain-ranch", order: 1,
    name: "Sleigh Ride Dinner", kind: "Dinner experience",
    where: "North Fork Cabin, by horse-drawn sleigh",
    when: "Winter evenings",
    who: "The whole family",
    gathering: "A twenty-minute sleigh ride through the snow to a historic cabin lit by oil lamps, where everyone sits down to one long supper and cowboy singers tell the ranch's stories. It is the dinner the grandchildren will talk about.",
    menu: ["Prime rib slow-cooked on a century-old railroad stove", "Rosemary sourdough", "Crème fraîche mashed potatoes", "Huckleberry cobbler"],
    booking: "Reserve ahead — we book it with your stay",
  },
  {
    slug: "sunday-ranch-hall-bbq", house: "lone-mountain-ranch", order: 2,
    name: "Sunday Ranch Hall BBQ", kind: "Family night",
    where: "Ranch Hall and the fire pit",
    when: "Sunday nights in summer",
    who: "Ranch guests, all ages",
    gathering: "The easiest night of the week for three generations: grilled meats and salads at shared tables, line dancing for anyone who will get up, and s'mores at the fire pit to finish.",
    menu: ["Grilled meats", "Fresh salads and homemade sides", "S'mores at the fire pit", "Beer, wine and cocktails included"],
    booking: "For ranch guests",
  },
  {
    slug: "horn-and-cantle", house: "lone-mountain-ranch", order: 3,
    name: "Horn & Cantle", kind: "Restaurant",
    where: "The ranch's main restaurant, with its saloon",
    when: "Ask us for the season's hours",
    who: "All ages",
    gathering: "The ranch's own restaurant, with roaring fireplaces and food grown locally or sourced from Montana producers. The H&C Saloon, its bar, pours craft cocktails and Montana spirits.",
    menu: ["Farm-to-table, from Montana producers", "Craft cocktails and Montana spirits at the saloon"],
    booking: "Reserve ahead for a large table",
    image: { publicId: "gatherings/lone-mountain-ranch/horn-and-cantle-dining-big-sky", alt: "Horn & Cantle dining room at Lone Mountain Ranch, Big Sky, Montana" },
  },
  {
    slug: "day-sleigh-and-lunch", house: "lone-mountain-ranch", order: 4,
    name: "Day Sleigh & Lunch", kind: "Lunch experience",
    where: "A sleigh through the winter landscape, then Horn & Cantle",
    when: "Daily in winter",
    who: "The whole family",
    gathering: "For the youngest and the oldest, who may not stay up for the evening ride: a thirty-minute daylight sleigh ride, with lunch before or after at Horn & Cantle.",
    menu: ["Seasonal lunch at Horn & Cantle"],
    booking: "Reserve ahead",
  },
  {
    slug: "ranch-rodeo-tuesday", house: "lone-mountain-ranch", order: 5,
    name: "Ranch Rodeo", kind: "Family night",
    where: "On the ranch",
    when: "Tuesday nights in summer",
    who: "All ages",
    gathering: "Bull riding, barrel racing and ranch roping, with elevated Montana street food. A night out together that nobody has to plan.",
    menu: ["Elevated Montana street food"],
    booking: "Tickets arranged with your stay",
  },
  {
    slug: "auric-room-1915", house: "lone-mountain-ranch", order: 6,
    name: "Auric Room 1915", kind: "Bar & lounge",
    where: "A supper club and speakeasy behind a hidden door",
    when: "Evenings",
    who: "Adults staying on the ranch",
    gathering: "The grown-ups' night: private booths, a cigar terrace with ranch views, rare whiskies and dishes made with local ingredients — for when the cousins are asleep and the parents and grandparents finally get an evening of their own.",
    menu: ["Bison Milanese", "Wagyu beef katsu sando", "Craft cocktails, rare whiskies and fine wines"],
    booking: "Adults only — ask us to arrange it",
  },
];

const lines = (s?: string) => (s || "").split("\n").map((l) => l.trim()).filter(Boolean);
const slugify = (s: string) => s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function fromAirtable(): Promise<TableCard[]> {
  const res = await fetch(`https://api.airtable.com/v0/${BASE}/${encodeURIComponent("At the Table")}?pageSize=100`, { headers: { Authorization: `Bearer ${TOKEN}` }, next: { revalidate: 3600, tags: ["airtable"] } });
  if (!res.ok) throw new Error(`Airtable At the Table: ${res.status}`);
  const json = await res.json();
  return (json.records as { fields: Record<string, any> }[])
    .map((r) => r.fields)
    .filter((f) => f["Name"] && f["House slug"] && f["Status"] !== "Hidden")
    .map((f) => ({
      slug: slugify(f["Name"]), house: f["House slug"], name: f["Name"], kind: (f["Kind"] || "Dinner experience") as TableKind,
      where: f["Where"] || "", when: f["When"] || "", who: f["Who can come"] || "", gathering: f["Why it works for a gathering"] || "",
      menu: lines(f["On the table"]), booking: f["Booking"] || "Ask us to arrange it", order: Number(f["Order"] || 99),
      image: f["Image (Cloudinary ID)"] ? { publicId: f["Image (Cloudinary ID)"], alt: f["Image alt text"] || f["Name"] } : undefined,
    }));
}

export async function getTable(house: string): Promise<TableCard[]> {
  let rows = sampleTable;
  if (TOKEN) {
    try { const live = await fromAirtable(); if (live.length) rows = live; } catch (e) { console.error(e); }
  }
  return rows.filter((t) => t.house === house).sort((a, b) => a.order - b.order);
}

export function tableAnswer(houseName: string, house: string, cards: TableCard[]) {
  if (TABLE_INTRO[house]) return TABLE_INTRO[house];
  const names = cards.map((c) => c.name);
  const list = names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0];
  return `${houseName} has ${cards.length} ${cards.length === 1 ? "place" : "places"} for the family to gather at the table: ${list}. ${cards[0]?.gathering || ""}`.trim();
}
