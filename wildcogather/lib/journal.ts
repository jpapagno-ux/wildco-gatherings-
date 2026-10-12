import { youtubeId } from "./video";
import type { Post } from "./types";

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID || "appnpcCxUZcapAgbo";

// ——— Sample entry (used until the Airtable "Journal" table has rows). Quotes are drafts for James to approve. ———
export const samplePosts: Post[] = [
  {
    slug: "wild-together-monwana-thornybush",
    number: "03",
    kicker: "Wild Together · the episode",
    title: "Wild Together at Monwana: Leopards, a Waterhole and the House We'd Book Again",
    dek: "Miriam and I filmed an episode of Wild Together at Monwana in Thornybush — and came home convinced it is the safari house for a small family.",
    house: "monwana-villa-thornybush",
    author: "James Wild",
    authorTitle: "Founder, James Wild & Co · 44 years on the road",
    date: "2026-10-11",
    readMinutes: 6,
    hero: { publicId: "gatherings/monwana-villa-thornybush/monwana-villa-pool-elephants", alt: "Monwana Villa pool overlooking the bush in Thornybush, with elephants nearby", caption: "Fig. 1 — The Villa, elephants at the waterhole. Courtesy of MORE Family Collection." },
    video: { provider: "youtube", id: "YR_8uiBObZ4", title: "Wild Together: My Wife's First Safari — Monwana Lodge, Thornybush, South Africa", description: "James and Miriam Wild at Monwana Villa in the Thornybush Nature Reserve, Greater Kruger — Miriam's first safari: leopards, the waterhole and the house we'd book again.", credit: "Wild Together · James & Miriam · Wild Earth Stays on YouTube" },
    draft: true,
    seoTitle: "Wild Together at Monwana: A Family Safari Villa in Thornybush | Wild & Co Gatherings",
    metaDescription: "James and Miriam Wild film Wild Together at Monwana in Thornybush: leopard country, a waterhole in view of the villa, and why it suits a family of six. Watch the episode.",
    body: `We arrived at Monwana in May with a camera, a notebook and no plan beyond the morning drive. By the second day the plan was simply to sit by the waterhole.

Monwana sits in the Thornybush Nature Reserve — 14,000 hectares on the edge of Greater Kruger, with no fence between them. The lodge was rebuilt in 2022 and runs on the sun. The Villa is its own house: two suites, each with a plunge pool, a fire deck, and a waterhole you can watch from the kitchen.

> We came for the leopards. We'll go back for the waterhole.

## What is it like to stay at Monwana?

Quiet, first of all. The Villa has its own chef, butler, guide and tracker, and its own vehicle, so the day bends around you. Miriam took her coffee to the deck at first light; by the time I joined her, elephants were drinking forty yards away.

![Fig. 2 — Leopard country. Courtesy of MORE Family Collection.](gatherings/monwana-villa-thornybush/leopard-thornybush-monwana)

## Why is Thornybush good for leopard?

Thornybush is known for its predators, leopard above all. There are few vehicles, the guides track off-road, and the animals don't migrate — so sightings come all year. We saw our first leopard on the second afternoon, stretched along a branch as if she owned the reserve. She did.

> A good guide doesn't find you animals. He finds you the moment before they appear.

## Is Monwana Villa right for a family?

For a family of up to six, yes. Children of all ages are welcome in the Villa, ride in its own vehicle, and the Mosaba Rangers programme fills the hours between drives. Bush walks start at sixteen under reserve rules. For a bigger reunion, the whole lodge can be taken — six suites and the Villa, up to 24 guests.

- Two suites, each with a plunge pool; three plunge pools in all
- Meals, premium drinks, game drives, bush walks and gratuities included
- Hoedspruit Airport about 45 minutes away, transfers included

![Fig. 3 — Young rangers at the waterhole. Courtesy of MORE Family Collection.](gatherings/monwana-villa-thornybush/young-rangers-waterhole-monwana)

## Why did James film Wild Together here?

Because it shows what we mean by a gathering. Nobody is waiting for anybody. The young ones are with the rangers, the grown-ups are on the deck, and everyone meets at the fire after dark with a story.

> Luxury on safari is time with nothing to prove. Monwana gives you that.

Watch the episode above, then ask me how to pair Monwana with Lion Sands — a private villa on the Sabie River and a night in a treehouse under the stars.`,
  },
  {
    slug: "ted-turner-vision-guide-from-within",
    number: "02",
    kicker: "Vetted in Purpose",
    title: "Ted Turner's Vision, and Why I Guide From Within",
    dek: "A million acres of New Mexico given back to bison, wolves and bighorn — and why the places that protect the land are the ones I want your family to see.",
    collection: "ted-turner-reserves",
    author: "James Wild",
    authorTitle: "Founder, James Wild & Co · 44 years on the road",
    date: "2026-10-10",
    readMinutes: 7,
    hero: { publicId: "gatherings/ted-turner-reserves/bison-on-the-range-new-mexico", alt: "Bison herd in a grassland on a Ted Turner Reserve, New Mexico", caption: "Fig. 1 — Bison on the range. Courtesy of Ted Turner Reserves." },
    draft: true,
    seoTitle: "Ted Turner Reserves: Conservation, Sustainability & Family Travel | Wild & Co Journal",
    metaDescription: "James Wild on Ted Turner's vision for his New Mexico reserves — wolves, bison and bighorn restored — and why sustainable stays are the ones he guides families to.",
    body: `Most of the places I send families were built for guests. Ted Turner's reserves were built for animals. The guests came later — and that is exactly why I want your family there.

Over four decades Turner bought land across the American West and set out to put back what had been lost: bison on the grass, wolves in the hills, bighorn on the ridgelines, fish in the creeks. Today Ted Turner Reserves looks after more than a million acres. Four of those places now take guests: Vermejo in the mountains of northern New Mexico, Ladder and Armendaris in the desert to the south, and Sierra Grande, a small hot-springs lodge in Truth or Consequences.

## What was Ted Turner's vision for his reserves?

The reserves describe their aim as balancing "the work and wildness" of the land — working ranches that are also wild places, run as living laboratories. Biologists restore species on the same ground where guests ride, fish and hike. Nothing is fenced off from the story. You can join the scientists in the field and see what your stay helps protect.

> I don't sell a view. I sell a seat inside the work of keeping it.

## What does a stay actually protect?

- At Ladder, the only private breeding and pre-release facility for Mexican wolves in the world, running since 1997.
- At Armendaris, desert bighorn sheep returned to the Fra Cristobal range from 1995 — New Mexico took them off its endangered list in 2011.
- On both southern reserves, the Bolson tortoise, North America's largest land tortoise, bred and raised until it is ready for the wild.
- At Ladder, the threatened Chiricahua leopard frog and native Rio Grande fish brought back to Las Animas Creek.
- At Vermejo, 558,000 acres of mountain, meadow and alpine tundra, and more than 1,200 bison.

![Fig. 2 — Mexican wolf at Ladder. Courtesy of Ted Turner Reserves.](gatherings/ladder-ted-turner-reserve/mexican-wolf-ladder)

## Why does sustainability decide where James Wild sends families?

Because the alternative is a beautiful place that is slowly being used up. The best conservation I have seen in 44 years of travel pays its own way. When a family stays on a reserve, they aren't visiting the work — they're funding it. That is a reason to promote a place, not just a nice line in a brochure.

> Promote a place from the outside and you're a tourist. Guide from within and you're a witness.

## What does "guide from within" mean?

It means the people who show your family the land are the people who keep it — the guides, the ranch hands, the biologists. Your children learn why a wolf matters from someone who has raised one. The Turner Trailblazers program gives younger children their own version: wildlife tours, tracking, crafts. Nobody comes home with a souvenir. They come home with a reason to care.

## What does the VIP stamp mean?

On this site VIP doesn't mean Very Important Person. It means Vetted in Purpose. Vetted, because I go and see. In the land, because the guiding comes from within. Purpose, because every night helps keep the place wild. Ted Turner's reserves are the first places to carry it.

> On my list the land is the VIP. We're the guests.

## When will James see them?

I have the contact, and I'm going to all four in August 2027 — south to north, timed so I can watch a million bats leave the cave at Armendaris at dusk. Until then each one is marked Under observation in the Ledger. When I'm back I'll tell you which one suits which family, and what I'd change.

> Your grandchildren should be able to stand where a bison came back and see it for themselves.`,
  },
  {
    slug: "why-james-chose-lone-mountain-ranch",
    number: "01",
    kicker: "Why it's in the Ledger",
    title: "Why I Put Lone Mountain Ranch in the Ledger",
    dek: "A century-old ranch in Big Sky, a long conversation with the people who run it, and the one test every family gathering has to pass.",
    house: "lone-mountain-ranch",
    author: "James Wild",
    authorTitle: "Founder, James Wild & Co · 44 years on the road",
    date: "2026-10-10",
    readMinutes: 6,
    hero: { publicId: "gatherings/lone-mountain-ranch/family-trail-ride-lone-mountain-ranch-big-sky-montana", alt: "Family on horseback riding a forest trail at Lone Mountain Ranch in Big Sky, Montana", caption: "Fig. 1 — Into the backcountry, Lone Mountain Ranch. Courtesy of the ranch." },
    draft: true,
    seoTitle: "Why James Wild Chose Lone Mountain Ranch for Family Reunions | Wild & Co Journal",
    metaDescription: "James Wild on why Lone Mountain Ranch in Big Sky, Montana is the first house in the Gatherings Ledger — where each generation should sleep, and what to know before booking.",
    body: `I have stayed in a great many beautiful places that I would never send a family to. Beauty is easy. What is hard is finding one place where a seven-year-old, a fifteen-year-old, their parents and their grandparents all have a good day — on the same day, without anyone sitting in the car waiting.

That is the only question the Gatherings Ledger asks. Lone Mountain Ranch, outside Big Sky in Montana, is the first house I have entered in it.

## What does James Wild look for in a family gathering place?

Six things, and I call them the Gathering Formula: room to gather, a day for every age, water within reach, wild country at the door, a resort behind you, and a reason to come back. A house has to pass all six before I'll put my name next to it. Most don't. Many pass five and fail the one that matters to your family.

> A family reunion is won or lost at breakfast. If three generations can't find each other before nine, the week comes apart.

## Why Lone Mountain Ranch passed

It is one place, not a campus. Twenty-six cabins and lodges sit around a single lawn, a single barn and a single dining room. The children ride out with wranglers or spend the day with the Lone Mountain Rangers. The teenagers get real backcountry. The grandparents take the trail chosen for their pace. And at supper everyone is back at the same table, with stories to trade.

There is water on every side — the Gallatin and the Madison for fly fishing, Lake Levinsky for a first paddle — and Yellowstone is a day trip with a naturalist. The ranch plans the week with you and handles the meals, the guides and the transfers from Bozeman. That last part matters more than people think. A gathering where Dad spends the week on logistics is not a gathering.

![Fig. 2 — First cast, side by side. Courtesy of the ranch.](gatherings/lone-mountain-ranch/fly-fishing-big-sky-montana)

## I put it in the Ledger because of a conversation

Before a house goes in, I sit down with the person who runs it. With Lone Mountain that was [host name], [title], [in person / by video] in [month year]. I asked what I always ask. Who plans the week? What happens when it rains on rodeo night? What does a four-year-old do while her grandfather fishes? Where do the teenagers go when they need to get away from all of us?

The answers were specific, and they came without a brochure. That is the sign I look for.

> I don't put a house in the Ledger because of its photographs. I put it there because of a conversation.

## Where should each generation sleep at Lone Mountain Ranch?

This is where most reunions go wrong, so here is how I would arrange it:

- Grandparents in a one-bedroom cabin with a soaking tub — and, if there are small grandchildren, in one of the pairs that connect: Black Bear with Cougar, or Lame Deer with Canyon.
- Each young family in a two-bedroom cabin — Bighorn, Larkspur, Coyote, Aspen or Hilltop.
- The cousins in Shooting Star, the bunk cabin, or in the B-K lodge with its bunk room — close enough to hear, far enough to feel free.
- The head of the family in Bison Lodge — six bedrooms, a heated infinity pool and a host of its own — which becomes everyone's living room after dinner.

Take all of it — 46 bedrooms, up to 130 people — and for a week the ranch is yours.

> Forty-four years taught me one rule: let the youngest and the oldest set the pace. Choose a place where they both win, and everyone in between will follow.

## What I would tell a family before they book

- Be on the Great Lawn at five on the first evening. The horses run.
- Keep Yellowstone for the middle of the week, once everyone has the altitude.
- Book the fly fishing early — it isn't in the all-inclusive rate, and the guides go fast in July.
- Know the terms: half at booking, the rest 60 days out, and no refunds — a deposit can move to a new date within two years, before the final payment.
- It is not a beach and it is not a nightclub. Early mornings, dinner under the stars. That is the point.

## What I still have to see for myself

I'll be straight with you: I have met the host, but I have not yet slept at the ranch. That is why its stamp reads Host met and not Field verified. When I've stayed, I'll say what I found here — good and bad — and the stamp will change or the entry will come out.

> The Ledger only works if I tell you what I haven't seen yet.`,
  },
];

// ——— Body parser: plain text from Airtable → blocks ———
export type Block =
  | { kind: "p"; text: string }
  | { kind: "h2"; text: string }
  | { kind: "quote"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "figure"; publicId: string; caption: string };

export function blocks(body: string): Block[] {
  const out: Block[] = [];
  for (const chunk of body.replace(/\r/g, "").split(/\n\s*\n/)) {
    const t = chunk.trim();
    if (!t) continue;
    if (t.startsWith("## ")) out.push({ kind: "h2", text: t.slice(3).trim() });
    else if (t.startsWith("> ")) out.push({ kind: "quote", text: t.split("\n").map((l) => l.replace(/^>\s?/, "")).join(" ").trim() });
    else if (t.startsWith("- ")) out.push({ kind: "list", items: t.split("\n").map((l) => l.replace(/^-\s?/, "").trim()).filter(Boolean) });
    else if (/^!\[.*\]\(.+\)$/.test(t)) { const m = t.match(/^!\[(.*)\]\((.+)\)$/)!; out.push({ kind: "figure", caption: m[1], publicId: m[2] }); }
    else out.push({ kind: "p", text: t.replace(/\n/g, " ") });
  }
  return out;
}

export const quotesOf = (body: string) => blocks(body).filter((b): b is { kind: "quote"; text: string } => b.kind === "quote").map((b) => b.text);
export const questionsOf = (body: string) => blocks(body).filter((b) => b.kind === "h2" && b.text.endsWith("?")).map((b) => (b as { text: string }).text);

// ——— Airtable "Journal" table ———
async function fromAirtable(): Promise<Post[]> {
  const url = `https://api.airtable.com/v0/${BASE}/Journal?pageSize=100`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` }, next: { revalidate: 3600, tags: ["airtable"] } });
  if (!res.ok) throw new Error(`Airtable Journal: ${res.status}`);
  const json = await res.json();
  return (json.records as { fields: Record<string, any> }[])
    .map((r) => r.fields)
    .filter((f) => f["Status"] === "Published" || f["Status"] === "Draft preview")
    .map((f) => ({
      slug: f["Slug"], collection: f["Collection slug"] || undefined, number: String(f["Entry no."] || "").padStart(2, "0"), kicker: f["Kicker"] || "From the Journal",
      title: f["Title"], dek: f["Dek"] || "", house: f["House slug"] || undefined,
      author: f["Author"] || "James Wild", authorTitle: f["Author title"] || "Founder, James Wild & Co",
      date: f["Date"] || new Date().toISOString().slice(0, 10), readMinutes: Number(f["Read minutes"] || 5),
      hero: f["Hero (Cloudinary ID)"] ? { publicId: f["Hero (Cloudinary ID)"], alt: f["Hero alt text"] || f["Title"], caption: f["Hero caption"] } : undefined,
      body: f["Body"] || "", draft: f["Status"] !== "Published",
      video: youtubeId(f["YouTube ID"]) ? { provider: "youtube", id: youtubeId(f["YouTube ID"])!, title: f["YouTube title"] || f["Title"], credit: f["YouTube credit"] || "Wild Together · James & Miriam Wild" } : undefined,
      videoPlanned: f["Film planned"] || undefined,
      seoTitle: f["SEO title"] || `${f["Title"]} | Wild & Co Journal`, metaDescription: f["Meta description"] || f["Dek"] || "",
    }));
}

export async function getPosts(): Promise<Post[]> {
  if (!TOKEN) return samplePosts;
  try { const rows = await fromAirtable(); return rows.length ? rows.sort((a, b) => b.date.localeCompare(a.date)) : samplePosts; }
  catch (e) { console.error(e); return samplePosts; }
}
export async function getPost(slug: string) { return (await getPosts()).find((p) => p.slug === slug); }
export async function getPostForHouse(house: string) { return (await getPosts()).find((p) => p.house === house); }
