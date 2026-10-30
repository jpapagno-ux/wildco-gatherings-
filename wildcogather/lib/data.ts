import { youtubeId } from "./video";
import type { Residence, Img, Stamp, Video, Booking, RoomCategory, WhyHere } from "./types";
import { WHY_HERE } from "./why-here";
import { sampleResidences } from "./sample-data";
import { settingFrom } from "./settings";
import { scrub } from "./scrub";
import { publicNotes } from "./public-notes";
import { MORE_ON_MERGE, type PendingRow } from "./sample-more";

// Row values approved in code but not yet written to Airtable: they are applied to the live rows when the PR merges
// (e.g. the MORE villas' Gatherings VIP blocks and Cape Cadogan's stamp, 30 Oct 2026). Vercel previews apply them here
// so a branch shows the end state; production reads Airtable only, so no stamp links to a page that does not exist yet.
const PENDING: Record<string, PendingRow> = process.env.VERCEL_ENV === "preview" ? { ...MORE_ON_MERGE } : {};
const vipFrom = (f: Record<string, any>): Residence["vip"] =>
  f["VIP (Vetted in Purpose)"]
    ? { collection: f["Collection"] || "", collectionSlug: f["Collection slug"] || "", visit: f["Visit planned"] || undefined, why: f["Why on J.W.'s list"] || "", fit: f["Family fit"] || undefined }
    : PENDING[f["Slug"]]?.vip;
const withPending = (r: Residence): Residence => {
  const p = PENDING[r.slug];
  if (!p) return r;
  return {
    ...r,
    ...(p.stamp ? { stamp: p.stamp } : {}),
    ...(p.firstVisited ? { firstVisited: p.firstVisited } : {}),
    ...(p.verdict ? { verdict: p.verdict } : {}),
    ...(p.worthReturning ? { formula: r.formula.map((t) => (t.test === "Worth returning to" ? { ...t, pass: true } : t)) } : {}),
  };
};

// Pages refresh from Airtable at most once an hour (set per page with `export const revalidate`).
const TOKEN = process.env.AIRTABLE_TOKEN;
const BASE = process.env.AIRTABLE_BASE_ID || "appnpcCxUZcapAgbo";

type Rec = { id: string; fields: Record<string, any> };

async function list(table: string): Promise<Rec[]> {
  const out: Rec[] = [];
  let offset = "";
  do {
    const url = `https://api.airtable.com/v0/${BASE}/${encodeURIComponent(table)}?pageSize=100${offset ? `&offset=${offset}` : ""}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${TOKEN}` }, next: { revalidate: 3600, tags: ["airtable"] } });
    if (!res.ok) throw new Error(`Airtable ${table}: ${res.status}`);
    const json = await res.json();
    out.push(...json.records);
    offset = json.offset || "";
  } while (offset);
  return out;
}

const stampFor = (status: string, score: number): Stamp =>
  status === "Live" && score === 6 ? "Gathering verified" : "Under observation";

// "Field verified" was renamed "Founder inspected & approved" (Oct 2026); older Airtable rows may still carry the old name.
const normalizeStamp = (v?: string): Stamp | undefined => (v === "Field verified" ? "Founder inspected & approved" : (v as Stamp) || undefined);

const lines = (v?: string) => (v || "").split(/\n+/).map((s) => s.trim()).filter(Boolean);

// "Label: value" on each line of the "Fees & taxes" field
const pairs = (v?: string) => lines(v).map((l) => { const i = l.indexOf(":"); return i > 0 ? { label: l.slice(0, i).trim(), value: l.slice(i + 1).trim() } : { label: "Note", value: l }; });

// Airtable: "Why here — James's quote", "Why here — watch line", "Why here — film (YouTube link)", "Why here — film title".
// Falls back to lib/why-here.ts, so a house keeps its film while the Airtable fields are still empty.
function whyHereFrom(f: Record<string, any>, slug: string): WhyHere | undefined {
  const fb = WHY_HERE[slug];
  const id = youtubeId(f["Why here — film (YouTube link)"]);
  const quote = (f["Why here — James's quote"] || "").trim() || fb?.quote;
  const film: Video | undefined = id
    ? { provider: "youtube", id, title: (f["Why here — film title"] || "").trim() || `${f["Residence"]} — the film`, credit: "James Wild & Co" }
    : fb?.film;
  if (!quote && !film) return undefined;
  return { quote: quote || "", watch: (f["Why here — watch line"] || "").trim() || fb?.watch, film };
}

function videosFrom(f: Record<string, any>): Video[] {
  const base = { title: f["Video title"] || `${f["Residence"]} — film`, description: f["Video description"], duration: f["Video duration (ISO)"], uploadDate: f["Video upload date"], credit: f["Video credit"] };
  const out: Video[] = [];
  const yt = youtubeId(f["YouTube link"] || f["YouTube ID"]);
  if (yt) out.push({ provider: "youtube", id: yt, ...base, title: f["YouTube title"] || base.title, credit: f["YouTube credit"] || base.credit });
  // "More YouTube links": one per line, optionally "Title | link"
  for (const line of String(f["More YouTube links"] || "").split("\n")) {
    const [a, b] = line.includes("|") ? line.split("|") : ["", line];
    const id = youtubeId(b);
    if (id && id !== yt) out.push({ provider: "youtube", id, title: a.trim() || `${f["Residence"]} — film`, credit: base.credit });
  }
  if (f["Vimeo ID"]) out.push({ provider: "vimeo", id: String(f["Vimeo ID"]).trim(), ...base, thumbnail: f["Video thumbnail URL"] });
  return out;
}

function bookingFrom(f: Record<string, any>): Booking | undefined {
  if (!f["Booking plan"] && !f["Included"]) return undefined;
  return {
    plan: f["Booking plan"] || "",
    bookVia: f["Book via"] || "Wild & Co Gatherings — James plans the stay with the house",
    wholeHouse: f["Whole-house booking"], minStay: f["Minimum stay"],
    checkIn: f["Check-in"], checkOut: f["Check-out"],
    deposit: f["Deposit terms"], cancellation: f["Cancellation terms"],
    children: f["Children policy"], rateBasis: f["Rate basis"],
    fees: pairs(f["Fees & taxes"]), included: lines(f["Included"]), excluded: lines(f["Not included"]),
    checked: f["Booking facts checked"],
  };
}

async function fromAirtable(): Promise<Residence[]> {
  const [res, dest, exp, imgs, faqs, rooms] = await Promise.all([
    list("Residences"), list("Destinations"), list("Experiences"), list("Images"), list("FAQs"), list("Room Categories").catch(() => [] as Rec[]),
  ]);
  const byId = <T extends Rec>(arr: T[]) => Object.fromEntries(arr.map((r) => [r.id, r]));
  const D = byId(dest), E = byId(exp), I = byId(imgs), F = byId(faqs), R = byId(rooms);
  const toRoom = (r: Rec): RoomCategory => ({ name: r.fields["Category"], count: r.fields["Count"], bedrooms: r.fields["Bedrooms"], sleeps: r.fields["Sleeps"], inside: r.fields["What's inside"] || "", fit: r.fields["Family fit (J.W.)"], whole: !!r.fields["Whole house"], order: r.fields["Order"] } as RoomCategory & { order?: number });
  const toImg = (r: Rec): Img => {
    const pid = r.fields["Cloudinary public ID"] || r.fields["Cloudinary URL"] || "";
    return {
      publicId: pid,
      alt: r.fields["Alt text"] || "",
      caption: r.fields["Caption"],
      credit: r.fields["Credit"],
      role: r.fields["Role"],
      order: r.fields["Order"],
      aspect: r.fields["Aspect ratio"] || r.fields["Aspect"],
      gravity: r.fields["Gravity"],
      focalPoint: r.fields["Focal point"] || r.fields["Object position"],
      objectPosition: r.fields["Object position"] || r.fields["Focal point"],
      permission: r.fields["Permission"] || (r.fields["Permission confirmed"] ? "confirmed" : undefined),
      altStatus: r.fields["Alt review status"] || r.fields["Alt status"],
      subjectDescription: r.fields["Subject description"],
      width: r.fields["Width"] ? Number(r.fields["Width"]) : undefined,
      height: r.fields["Height"] ? Number(r.fields["Height"]) : undefined,
    };
  };

  // Production shows Approved, Live and Vetting rows (and VIP rows). Vercel preview deployments also show Prospect rows,
  // so a new house can be reviewed on a branch preview while production keeps it hidden until it is set to Approved.
  const visible = process.env.VERCEL_ENV === "preview" ? ["Approved", "Live", "Vetting", "Prospect"] : ["Approved", "Live", "Vetting"];
  return res
    .filter((r) => !!r.fields["Slug"] && (visible.includes(r.fields["Status"]) || !!r.fields["VIP (Vetted in Purpose)"]))
    .map((r, i) => {
      const f = r.fields;
      const d = (f["Destination"] || []).map((id: string) => D[id]).filter(Boolean)[0];
      const score = Number(f["Formula score (of 6)"] || 0);
      const myImgs = (f["Images"] || []).map((id: string) => I[id]).filter(Boolean).map(toImg).sort((a: Img, b: Img) => (a.order ?? 99) - (b.order ?? 99));
      const tests: [string, string][] = [
        ["Room to gather", "Formula: Room to gather"], ["A day for every age", "Formula: A day for every age"],
        ["Water within reach", "Formula: Water within reach"], ["Country at the door", "Formula: Wild at the door"],
        ["A resort behind you", "Formula: A resort behind you"], ["Worth returning to", "Formula: Worth returning to"],
      ];
      return {
        slug: f["Slug"],
        // Permanent number from Airtable "Entry No."; falls back to row order only if it is blank.
        entryNo: f["Entry No."] || `G-${String(i + 1).padStart(3, "0")}`,
        name: f["Residence"],
        place: d?.fields["Destination"] || "",
        region: d?.fields["Destination"] || "",
        country: d?.fields["Country"] || "",
        lat: f["Latitude"], lng: f["Longitude"],
        status: f["Status"],
        stamp: normalizeStamp(f["Ledger stamp"]) || stampFor(f["Status"], score),
        setting: settingFrom(f["Setting"]),
        featured: !!f["Featured on home"],
        partner: f["Partner name"] ? { name: f["Partner name"], logo: f["Partner logo (Cloudinary ID)"] ? { publicId: f["Partner logo (Cloudinary ID)"], alt: `${f["Partner name"]} logo` } : undefined } : undefined,
        notes: { bestSeason: f["Best season"], power: f["Power & plugs"], timeZone: f["Time zone"] },
        firstVisited: f["First visited by J.W."] || undefined,
        host: f["Host name"] ? {
          name: f["Host name"],
          title: f["Host title"] || `Host, ${f["Residence"]}`,
          headshot: f["Host headshot (Cloudinary ID)"] ? { publicId: f["Host headshot (Cloudinary ID)"], alt: `${f["Host name"]}, host at ${f["Residence"]}` } : undefined,
          note: f["Host note"] || "James sat down with the host to talk through how the house looks after three generations at once. That conversation is how it entered the Ledger.",
        } : undefined,
        line: f["The Line"] || "",
        verdict: lines(f["James's verdict"]),
        bestFor: f["Best for"],
        notFor: f["Not for"] || "",
        bedrooms: f["Bedrooms"], sleeps: f["Sleeps (max)"], units: f["Units / cabins"],
        kidsProgram: f["Kids' program"], kidsAges: f["Kids' ages"],
        water: f["Water access"] || "",
        seasons: f["Seasons"] || [],
        rateFrom: f["Rate from"], rateUnit: f["Rate unit"],
        airport: d?.fields["Airport code"],
        address: f["Address"], officialUrl: f["Official URL"],
        formula: tests.map(([t, k]) => ({ test: t, note: "", pass: !!f[k] })),
        // Public field notes only. "Internal notes" is never read; publicNotes() also drops any line that looks internal.
        fieldNotes: publicNotes(f["Notes"]),
        manifest: [],
        experiences: (f["Experiences"] || []).map((id: string) => E[id]).filter(Boolean).map((e: Rec) => ({
          name: e.fields["Experience"], category: e.fields["Category"] || "", ages: e.fields["Ages"] || [],
          seasons: e.fields["Seasons"] || [], description: e.fields["Short description"] || "",
          image: (e.fields["Images"] || []).map((id: string) => I[id]).filter(Boolean).map(toImg)[0],
        })),
        faqs: (f["FAQs"] || []).map((id: string) => F[id]).filter(Boolean).map((q: Rec) => ({ question: q.fields["Question"], answer: q.fields["Answer (40–60 words)"] })),
        images: myImgs,
        booking: bookingFrom(f),
        vip: vipFrom(f),
        rooms: (f["Room Categories"] || []).map((id: string) => R[id]).filter(Boolean).map(toRoom).sort((a: any, b: any) => (a.order ?? 99) - (b.order ?? 99)),
        videos: videosFrom(f),
        whyHere: whyHereFrom(f, f["Slug"]),
        liveBookingUrl: /^https:\/\/book\.wildearthstays\.com\//.test(f["Live booking URL"] || "") ? String(f["Live booking URL"]).split("?")[0] : undefined,
        seoTitle: f["SEO title"] || `${f["Residence"]} | Wild & Co Gatherings`,
        metaDescription: f["Meta description"] || f["The Line"] || "",
        credit: "",
      } as Residence;
    })
    .map(withPending)
    .sort((a, b) => a.entryNo.localeCompare(b.entryNo, undefined, { numeric: true }));
}

export async function getResidences(): Promise<Residence[]> { return scrub(await getResidencesRaw()); }
async function getResidencesRaw(): Promise<Residence[]> {
  if (!TOKEN) return sampleResidences;
  try {
    const rows = await fromAirtable();
    return rows.length ? rows : sampleResidences;
  } catch (e) {
    console.error(e);
    return sampleResidences;
  }
}

export async function getResidence(slug: string) {
  return (await getResidences()).find((r) => r.slug === slug);
}

export function dms(lat?: number, lng?: number) {
  if (lat == null || lng == null) return "";
  const f = (v: number, p: string, n: string) => {
    const t = Math.round(Math.abs(v) * 3600), d = Math.floor(t / 3600), m = Math.floor((t % 3600) / 60), s = t % 60;
    return `${d}° ${String(m).padStart(2, "0")}′ ${String(s).padStart(2, "0")}″ ${v >= 0 ? p : n}`;
  };
  return `${f(lat, "N", "S")}   ${f(lng, "E", "W")}`;
}
