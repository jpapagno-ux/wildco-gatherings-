// Hosted webinars (Livestorm). Airtable › Webinars. Each row is a page at /webinars/[slug].
// Announced = date to come ("Register interest" saves to Inquiries) · Scheduled = Livestorm link + start time
// (Event markup for Google) · Recorded = YouTube link plays on the page · Hidden = off.
import type { Img } from "./types";
import { youtubeId } from "./video";
import { scrub } from "./scrub";

const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID || "appnpcCxUZcapAgbo";

export type Webinar = {
  slug: string;
  title: string;
  status: "Announced" | "Scheduled" | "Recorded";
  partner?: string;
  startsAt?: string; // ISO
  minutes: number;
  registerUrl?: string; // Livestorm
  host: { name: string; title: string; photo?: Img };
  dek: string;
  intro: string[];
  agenda: string[];
  audience: string[];
  houses: string[];
  recording?: string; // YouTube ID
};

export const sampleWebinars: Webinar[] = [
  {
    slug: "ted-turner-reserves-family-gatherings",
    title: "Ted Turner Reserves: Wild Places for Family Gatherings",
    status: "Announced",
    partner: "Ted Turner Reserves",
    minutes: 45,
    host: { name: "Harry Tyner", title: "Host, Ted Turner Reserves" },
    dek: "The first Wild & Co webinar. Harry Tyner takes advisors and families across four New Mexico reserves — Vermejo, Ladder, Armendaris and Sierra Grande — and how each one hosts three generations at once.",
    intro: [
      "Some places are big enough for a whole family to spread out and still meet at one table for supper. The Ted Turner Reserves are those places: working conservation lands in New Mexico where the guiding comes from the people who look after the land.",
      "I've asked Harry Tyner, who hosts families across the reserves, to walk us through them the way an advisor needs to hear it — which reserve suits which generation, how the days are paced, and how a stay can move from one reserve to the next.",
      "Bring your questions. Bring a family you're planning for. — James Wild",
    ],
    agenda: [
      "Four reserves, four kinds of gathering: Vermejo's scale, Ladder's privacy, Armendaris's bat flight, Sierra Grande's hot springs",
      "Pacing a day for three generations — guided activities, rest, and the long table",
      "The southern loop: combining Ladder, Armendaris and Sierra Grande in one trip",
      "The conservation work behind each reserve, and what a family's stay is part of",
      "Questions from advisors and families",
    ],
    audience: ["Travel advisors planning family and multigenerational trips", "Families planning a reunion, milestone birthday or gathering of friends"],
    houses: ["vermejo-ted-turner-reserve", "ladder-ted-turner-reserve", "armendaris-ted-turner-reserve", "sierra-grande-ted-turner-reserve"],
  },
];

const lines = (s?: string) => (s || "").split("\n").map((l) => l.trim()).filter(Boolean);

async function fromAirtable(): Promise<Webinar[]> {
  const res = await fetch(`https://api.airtable.com/v0/${BASE}/Webinars?pageSize=100`, { headers: { Authorization: `Bearer ${TOKEN}` }, next: { revalidate: 3600, tags: ["airtable"] } });
  if (!res.ok) throw new Error(`Airtable Webinars: ${res.status}`);
  const json = await res.json();
  return (json.records as { fields: Record<string, any> }[])
    .map((r) => r.fields)
    .filter((f) => f["Slug"] && ["Announced", "Scheduled", "Recorded"].includes(f["Status"]))
    .map((f) => ({
      slug: f["Slug"], title: f["Title"], status: f["Status"], partner: f["Partner"] || undefined,
      startsAt: f["Starts"] || undefined, minutes: Number(f["Length (minutes)"] || 45), registerUrl: f["Livestorm link"] || undefined,
      host: { name: f["Host name"] || "James Wild", title: f["Host title"] || "", photo: f["Host photo (Cloudinary ID)"] ? { publicId: f["Host photo (Cloudinary ID)"], alt: f["Host name"] } : undefined },
      dek: f["Dek"] || "", intro: (f["Introduction"] || "").split(/\n\s*\n/).map((p: string) => p.trim()).filter(Boolean),
      agenda: lines(f["Agenda"]), audience: lines(f["Who it's for"]), houses: lines(f["Houses (slugs)"]),
      recording: youtubeId(f["Recording (YouTube link)"]),
    }))
    .sort((a, b) => (a.startsAt || "9999").localeCompare(b.startsAt || "9999"));
}

export async function getWebinars(): Promise<Webinar[]> { return scrub(await getWebinarsRaw()); }
async function getWebinarsRaw(): Promise<Webinar[]> {
  if (!TOKEN) return sampleWebinars;
  try { const rows = await fromAirtable(); return rows.length ? rows : sampleWebinars; } catch (e) { console.error(e); return sampleWebinars; }
}
export async function getWebinar(slug: string) { return (await getWebinars()).find((w) => w.slug === slug); }
export async function getWebinarsForPartner(partner?: string) { return partner ? (await getWebinars()).filter((w) => w.partner === partner) : []; }

export function whenLabel(w: Webinar) {
  if (!w.startsAt) return "Date to be announced";
  return new Date(w.startsAt).toLocaleString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/New_York", timeZoneName: "short" });
}
