// "On the Horizon" — new and soon-to-open places James has approved (Oct 2026: he has met every team).
// Each carries an H- number and an "Approved" Horizon stamp. Outside sources and links are kept in
// Airtable for our own records only and are never shown on the site.
// When James visits and a place earns its entry, it moves to Residences and gets a G- number.
// Airtable: table "Horizon" (Status: Draft preview / Live / Moved to Ledger / Paused).
import { settingFrom, type SettingKey } from "@/lib/settings";
import { scrub } from "./scrub";

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID || "appnpcCxUZcapAgbo";

export type Source = { title: string; url: string };
export type Horizon = {
  slug: string;
  no: string; // H-01
  name: string;
  short: string; // card title
  place: string;
  country: string;
  setting: SettingKey;
  opens: string; // what the stamp says, e.g. "Opens Apr 2027"
  kicker: string;
  dek: string;
  why: string; // James's line — drafted until he approves
  familyFit: string;
  notFor: string;
  facts: [string, string][];
  body: string; // journal body format: ## question / > quote / - bullets
  faqs: { q: string; a: string }[];
  confirm: string[];
  sources: Source[];
  official?: string;
  hero?: { publicId: string; alt: string };
  gallery?: { publicId: string; alt: string }[];
  experiences?: { name: string; text: string; image?: { publicId: string; alt: string } }[];
  pairsWith?: string; // another horizon slug or a house slug
  draft: boolean;
  updated: string; // YYYY-MM-DD facts checked
};

const D = "";

export const sampleHorizon: Horizon[] = [

  {
    slug: "paradero-todos-santos-villa-suites",
    no: "H-02",
    name: "Paradero Todos Santos — the Villa Suites",
    short: "Paradero Todos Santos",
    place: "Todos Santos, Baja California Sur",
    country: "Mexico",
    setting: "desert",
    opens: "New wing · villa suites",
    kicker: "On the horizon · Baja",
    dek: "Desert, farm fields and the Pacific surf an hour and a half from Los Cabos — and a new wing of one- to three-bedroom Villa Suites with private pools and kitchens.",
    why: `Paradero has always been a grown-ups' place. The Villa Suites could change that — if they open them to families the way they've said, this is the Baja I'd want my grandchildren to know. ${D}`,
    familyFit: "Parents with older children and grandparents who want surf lessons, farm mornings and a quiet, design-led house.",
    notFor: "Families with toddlers until the children's policy for the Villa Suites is confirmed; the original hotel is adults-only.",
    facts: [
      ["Where", "La Mesa farm fields near Todos Santos, Baja California Sur · about 1.5 hours by road from Los Cabos (SJD)"],
      ["The hotel", "35–41 minimalist suites, adults-only; restaurant Tenoch (Michelin Key 2025)"],
      ["Villa Suites", "24 new units announced, 1–3 bedrooms, kitchens with a lava-rock Oaxacan oven, rooftop jacuzzis, ground-floor private pools"],
      ["Children", "A children's and teens' programme led by Paradero guides was announced with the Villa Suites"],
      ["Included", "Daily guided experiences: surf lessons, hikes, beach days, farming, cooking classes, yoga, art walks"],
      ["At sea", "Catamaran outings with Paradero at the Sea"],
    ],
    body: `## What is Paradero Todos Santos?

A design-led wellness hotel in the farm fields outside Todos Santos, on Baja's Pacific side, about an hour and a half by road from Los Cabos. The original hotel is adults-only, with daily guided experiences — surf lessons, hikes, farming and cooking — included in the stay.

## What is new?

The Villa Suites: 24 units announced with one to three bedrooms, full kitchens with a lava-rock Oaxacan oven, rooftop terraces with jacuzzis and private pools on the ground floor, along with a new Italian restaurant, Cosimo, and a "learning table" for family cooking classes.

> If the Villa Suites take children, this becomes one of the few places in Baja where three generations get design, surf and a farm in one week. ${D}

## Can children stay?

That is our first question. The hotel itself is adults-only; the Villa Suites were announced with a children's and teens' programme. We are confirming the current policy and minimum age before this goes in the Ledger.

## What would a family do here?

- Morning surf lessons at the Pacific beaches near Todos Santos
- A farm morning in the La Mesa fields, then a cooking class
- A catamaran day with Paradero at the Sea
- Art walks through Todos Santos town`,
    faqs: [
      { q: "Is Paradero Todos Santos adults-only?", a: "The original hotel is adults-only. Its newer Villa Suites — one to three bedrooms with kitchens and private pools — were announced with a children's and teens' programme. Confirm the current children's policy before booking." },
      { q: "How far is Paradero Todos Santos from Los Cabos airport?", a: "About an hour and a half by road from Los Cabos International Airport (SJD), on Baja's Pacific side near the town of Todos Santos." },
    ],
    confirm: ["Whether children stay in the Villa Suites today, and from what age", "Villa Suite rates and whole-wing booking", "Kids' and teens' programme schedule"],
    sources: [
      { title: "Paradero Hotels — official site", url: "https://www.paraderohotels.com/" },
      { title: "Luxury Travel Advisor — Paradero Todos Santos to launch Villa Suites", url: "https://www.luxurytraveladvisor.com/hotels/paradero-todos-santos-mexico-launch-residences-2024" },
      { title: "Sherman's Travel — Paradero Todos Santos review", url: "https://www.shermanstravel.com/hotels/paradero-todos-santos-review" },
    ],
    official: "https://www.paraderohotels.com/",
    draft: false,
    updated: "2026-10-11",
  },
  {
    slug: "el-silencio-lodge-tent-camp",
    no: "H-03",
    name: "El Silencio Lodge — the new elevated tent camp",
    short: "El Silencio, the tent camp",
    place: "Bajos del Toro, Central Highlands",
    country: "Costa Rica",
    setting: "jungle",
    opens: "New · canopy tents",
    kicker: "On the horizon · Costa Rica",
    dek: "A Relais & Châteaux cloud-forest lodge with three private waterfalls, family villas — and a new camp of elevated tents in the canopy.",
    why: `El Silencio already does families well — two- and three-bedroom villas, waterfalls you can walk to. Tents up in the cloud forest would give the teenagers their own adventure. ${D}`,
    familyFit: "Families with children of all ages in the villas; the tent camp for teens and adventurous grandparents.",
    notFor: "Anyone who needs beach time — this is cool, misty highland forest.",
    facts: [
      ["Where", "Bajos del Toro, in Costa Rica's Central Highlands cloud forest"],
      ["The lodge", "23 suites and villas, including 2-bedroom villas, riverside villas and 3-bedroom villas · Relais & Châteaux"],
      ["Children", "Family-friendly: connecting rooms, family suites, babysitting, kids' menu and children's activities"],
      ["On foot", "Three private waterfalls — La Melodía, El Silencio and La Promesa — on about 3 miles of trails along the Gorrión River"],
      ["New", "An elevated tent camp in the canopy"],
    ],
    body: `## What is El Silencio Lodge?

A Relais & Châteaux lodge in the cloud forest of Bajos del Toro, in Costa Rica's Central Highlands. Twenty-three suites and villas — including two- and three-bedroom villas — sit above the Gorrión River, with about three miles of private trails to three waterfalls only guests can reach.

## What is the new tent camp?

James has heard the lodge is adding a camp of elevated tents in the forest canopy. We are confirming the number of tents, the opening date, what is included and the minimum age before we publish more.

> I'd give the tents to the teenagers and keep the villa for the rest of us — then meet at the waterfall for breakfast. ${D}

## Is El Silencio good for children?

Yes. The lodge lists family suites, connecting rooms, babysitting, a children's menu and activities, and multi-bedroom villas that suit three generations.

## What pairs well with it?

Arenal and the hot springs at La Fortuna are in the same province, Alajuela — a natural second stop for the grown-ups' chapter of the trip.`,
    faqs: [
      { q: "Is El Silencio Lodge family-friendly?", a: "Yes. The Relais & Châteaux lodge in Bajos del Toro has two- and three-bedroom villas, family suites, connecting rooms, babysitting and children's activities, plus private trails to three waterfalls." },
      { q: "Does El Silencio Lodge have tents?", a: "A new elevated tent camp is planned; tent numbers, opening date and minimum age are still being confirmed with the lodge." },
    ],
    confirm: ["Tent camp opening date, tent count and inclusions", "Minimum age for the tents", "Villa rates for a whole-family booking"],
    sources: [
      { title: "Relais & Châteaux — El Silencio Lodge & Spa", url: "https://www.relaischateaux.com/us/costa-rica/elsilencio-alajuela-bajos-del-toro" },
    ],
    pairsWith: "amor-arenal",
    draft: false,
    updated: "2026-10-11",
  },
  {
    slug: "amor-arenal",
    no: "H-04",
    name: "Amor Arenal — canyon casitas under the volcano",
    short: "Amor Arenal",
    place: "La Fortuna, Arenal",
    country: "Costa Rica",
    setting: "jungle",
    opens: "Open · adults & teens",
    kicker: "On the horizon · Costa Rica",
    dek: "Rainforest casitas on the edge of a canyon facing Arenal Volcano, each with its own warm spring-fed plunge pool.",
    why: `Not a whole-family house — it's the chapter for the grandparents, or for parents and teenagers, after a week together somewhere bigger. ${D}`,
    familyFit: "Grandparents on their own, or parents with teenagers, as the quiet second stop of a Costa Rica trip.",
    notFor: "Young children — it is adults-only or 13 and over.",
    facts: [
      ["Where", "Rainforest near La Fortuna, facing Arenal Volcano"],
      ["Casitas", "Canyon Casitas of about 872 sq ft, each with a warm spring-fed plunge pool on the balcony"],
      ["Pools", "Hot spring and mineral pools on site, including a hot pool with a swim-up bar"],
      ["Children", "Adults-only, or a minimum age of 13"],
      ["On foot", "Two private trails (Serenity and Nanciton), an open-air yoga studio and a meditation platform"],
    ],
    body: `## What is Amor Arenal?

A small rainforest resort near La Fortuna with views of Arenal Volcano. The rooms are Canyon Casitas — about 872 square feet, on the edge of a rainforest canyon — each with its own warm spring-fed plunge pool.

## Can families stay?

Not with young children. It is adults-only or 13 and over, so we see it as the second, quieter chapter: grandparents on their own, or parents with teenagers.

> After a week of everyone together, two nights here with your own hot spring on the balcony is the reward. ${D}

## What is there to do?

- Private trails through the reserve, guided or on your own
- Hot spring and mineral pools, a spa and open-air yoga
- Arenal's hanging bridges, waterfalls and volcano hikes nearby

## How does it fit a family trip?

Pair it with El Silencio Lodge in the cloud forest — both are in Alajuela province — with the whole family at El Silencio first, then the grown-ups and teens at Amor Arenal.`,
    faqs: [
      { q: "Is Amor Arenal adults-only?", a: "It is described as adults-only, with some reports of a minimum age of 13. It suits grandparents or parents with teenagers rather than young children; confirm the policy when booking." },
      { q: "Do the casitas at Amor Arenal have private pools?", a: "Yes. Each Canyon Casita has its own warm spring-fed plunge pool on the balcony, and there are shared hot spring and mineral pools on site." },
    ],
    confirm: ["Minimum age (adults-only vs 13+)", "Number of casitas and any two-bedroom options", "Transfer times from Liberia (LIR) and San José (SJO)"],
    sources: [
      { title: "Costa Rica Experts — Amor Arenal", url: "https://costaricaexperts.com/hotels/amor-arenal/" },
      { title: "One Girl Whole World — Amor Arenal review", url: "https://onegirlwholeworld.com/north-america/amor-arenal-resort-review-costa-rica/" },
    ],
    pairsWith: "el-silencio-lodge-tent-camp",
    draft: false,
    updated: "2026-10-11",
  },
  {
    slug: "zest-ibiza",
    no: "H-05",
    name: "Zest Hotel & Resort Ibiza — and its seven villas",
    short: "Zest, Ibiza",
    place: "Cap Negret, Sant Antoni",
    country: "Spain",
    setting: "coast",
    opens: "Opens Apr 2027",
    kicker: "On the horizon · Ibiza",
    dek: "A new five-star resort on Ibiza's sunset coast, opening in April 2027, with seven private hilltop villas and a daily collaboration with Tomorrowland.",
    why: `Ibiza's west coast has the best sunsets in the Mediterranean. I'm watching the villas — if they look after families as well as they look after the music, the teenagers will never forgive us for not going. ${D}`,
    familyFit: "Families with teenagers and young adults who want sunsets, music and a private villa to come home to.",
    notFor: "Families wanting a quiet toddler week — the resort leans towards music and adult leisure.",
    facts: [
      ["Where", "Cap Negret, Sant Antoni, on Ibiza's west coast near Cala Gració · about 30 min from Ibiza airport"],
      ["Opens", "April 2027 (moved from 2026); replaces the former Stella Maris complex"],
      ["Rooms", "About 206 rooms and suites, plus seven private villas (Serendi Villas) with their own pools"],
      ["On site", "A 6,000 m² pool club, spa, gym and up to six restaurants and bars, including a rooftop restaurant"],
      ["Music", "A daily collaboration with Tomorrowland"],
      ["Run by", "General manager José Manuel Molina, previously at Nobu Hotel Ibiza Bay"],
    ],
    body: `## What is Zest Ibiza?

A new five-star resort on the site of the old Stella Maris hotel at Cap Negret, Sant Antoni, on Ibiza's west coast. It is due to open in April 2027 with about 206 rooms and suites, seven private villas, a 6,000 m² pool club, a spa and up to six restaurants — and a daily collaboration with the music brand Tomorrowland.

## Is Zest Ibiza for families?

Not obviously — it is pitched at luxury and adult leisure. The seven villas, each with a private pool on the hill above Cap Negret bay, are what interest us for families with teenagers. We will ask how children are welcomed before it opens.

> First in line for the villas, and first to tell you honestly whether it works for a family. ${D}

## When can you book?

The resort is scheduled for April 2027. Ask us to hold interest in the villas and we will come back to you as soon as dates open.

## What we still want to know

- Children's policy and any family programme
- Villa sizes, bedrooms and rates
- How the Tomorrowland collaboration works day to day`,
    faqs: [
      { q: "When does Zest Ibiza open?", a: "Zest Hotel & Resort Ibiza is scheduled to open in April 2027 at Cap Negret, Sant Antoni, replacing the former Stella Maris hotel; the opening was moved from 2026." },
      { q: "Is Zest Ibiza family-friendly?", a: "It is positioned as a luxury lifestyle resort with a Tomorrowland collaboration. Its seven private villas with pools may suit families with teenagers; the children's policy has not yet been published." },
    ],
    confirm: ["Children's policy", "Villa bedrooms, capacity and rates", "Opening date holds for April 2027"],
    sources: [
      { title: "La Voz de Ibiza — Zest Hotel will replace Stella Maris and open in 2027", url: "https://lavozdeibiza.com/actualidad/zest-hotel-sustituira-al-stella-maris-de-ibiza-y-abrira-en-2027-de-la-mano-de-tomorrowland/" },
      { title: "La Voz de Ibiza — The new five-star now has a director", url: "https://lavozdeibiza.com/actualidad/el-nuevo-cinco-estrellas-de-ibiza-que-sustituira-al-stella-maris-ya-tiene-director/" },
    ],
    draft: false,
    updated: "2026-10-11",
  },
];

// ——— Airtable "Horizon" table ———
const lines = (s?: string) => (s || "").split("\n").map((l) => l.trim()).filter(Boolean);
async function fromAirtable(): Promise<Horizon[]> {
  const res = await fetch(`https://api.airtable.com/v0/${BASE}/Horizon?pageSize=100`, { headers: { Authorization: `Bearer ${TOKEN}` }, next: { revalidate: 3600, tags: ["airtable"] } });
  if (!res.ok) throw new Error(`Airtable Horizon: ${res.status}`);
  const json = await res.json();
  return (json.records as { fields: Record<string, any> }[])
    .map((r) => r.fields)
    .filter((f) => f["Slug"] && (f["Status"] === "Live" || f["Status"] === "Draft preview"))
    .map((f) => ({
      slug: f["Slug"], no: f["Entry No."] || "H-", name: f["Name"], short: f["Card title"] || f["Name"],
      place: f["Place"] || "", country: f["Country"] || "", setting: settingFrom(f["Setting"]), opens: f["Opens (stamp)"] || "On the horizon",
      kicker: f["Kicker"] || "On the horizon", dek: f["Dek"] || "", why: f["Why on J.W.'s list"] || "",
      familyFit: f["Family fit"] || "", notFor: f["Not for"] || "",
      facts: lines(f["Facts"]).map((l) => { const i = l.indexOf(":"); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] as [string, string]; }).filter(([k, v]) => k && v),
      body: f["Body"] || "",
      faqs: (f["FAQs"] || "").split(/\n(?=Q:)/).map((b: string) => { const m = b.match(/^Q:\s*([\s\S]+?)\nA:\s*([\s\S]+)$/); return m ? { q: m[1].trim(), a: m[2].trim() } : null; }).filter(Boolean),
      confirm: lines(f["To confirm"]),
      sources: lines(f["Sources"]).map((l) => { const [title, url] = l.split(" | "); return { title: title?.trim(), url: url?.trim() }; }).filter((s) => s.url),
      official: f["Official URL"] || undefined,
      hero: f["Hero (Cloudinary ID)"] ? { publicId: f["Hero (Cloudinary ID)"], alt: f["Hero alt text"] || (f["Name"] ? `${f["Name"]} landscape and grounds` : "Property landscape and grounds") } : undefined,
      gallery: lines(f["Gallery (Cloudinary IDs)"]).map((l) => { const [id, alt] = l.split("|").map((x) => x.trim()); return { publicId: id, alt: alt || (f["Name"] ? `${f["Name"]} grounds and surroundings` : "Property photo") }; }).filter((g) => g.publicId),
      experiences: lines(f["Experiences"]).map((l) => { const [name, text, img] = l.split("|").map((x) => x.trim()); return { name, text: text || "", image: img ? { publicId: img, alt: `${name} — ${f["Card title"] || f["Name"]}` } : undefined }; }).filter((e) => e.name),
      pairsWith: f["Pairs with (slug)"] || undefined,
      draft: f["Status"] !== "Live",
      updated: f["Facts checked"] || new Date().toISOString().slice(0, 10),
    }))
    .sort((a, b) => a.no.localeCompare(b.no));
}

export async function getHorizon(): Promise<Horizon[]> { return scrub(await getHorizonRaw()); }
async function getHorizonRaw(): Promise<Horizon[]> {
  if (!TOKEN) return sampleHorizon;
  try { const rows = await fromAirtable(); return rows.length ? rows : sampleHorizon; } catch (e) { console.error(e); return sampleHorizon; }
}
export async function getHorizonItem(slug: string) { return (await getHorizon()).find((h) => h.slug === slug); }
