// ——— The Ledger registry ———
// One machine-readable record per house, itinerary and Horizon place, keyed by its permanent Ledger ID.
// Served at /ledger.json, /llms.txt and /llms-full.txt for the chat agent, answer engines and LLMs.
// IDs are permanent: G-### for houses (Airtable Residences › Entry No.), H-## for On the Horizon.
// Never renumber a published ID; retire it instead. Partner sites are named, never linked (site policy).
import { getResidences } from "./data";
import { getItineraries } from "./extras";
import { getHorizon } from "./horizon";
import { FOUNDER } from "./founder";

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export const STAMP_MEANING: Record<string, string> = {
  "Under observation": "On the list; James has not yet stayed.",
  "Host met": "James has vetted the house in conversation with its host.",
  "Field verified": "James has toured and stayed; Formula being confirmed.",
  "Gathering verified": "Visited, and passes all six tests of the Gathering Formula.",
  "Founder favorite": "Visited, and returned.",
};

export const FORMULA_TESTS = ["Room to gather", "A day for every age", "Water within reach", "Country at the door", "A resort behind you", "Worth returning to"];

export async function buildLedger() {
  const [houses, trips, horizon] = await Promise.all([getResidences(), getItineraries(), getHorizon()]);
  const live = trips.filter((t) => !t.draft);
  const tripsFor = (slug: string) => live.filter((t) => t.house === slug || t.stops?.some((s) => s.house === slug || s.or?.includes(slug)));
  const idOf = (slug: string) => houses.find((h) => h.slug === slug)?.entryNo;

  return {
    name: "Wild & Co Gatherings — The Gatherings Ledger",
    publisher: "James Wild & Co (founded 1982)",
    founder: { name: FOUNDER.name, url: `${SITE}${FOUNDER.path}` },
    site: SITE,
    updated: new Date().toISOString().slice(0, 10),
    howToBook: { url: `${SITE}/plan`, note: "Every stay is planned and booked through Wild & Co Gatherings, advisor-led. Partner websites are not linked." },
    idScheme: { house: "G-### (permanent Ledger entry number)", horizon: "H-## (new places not yet stayed)", key: "'<ID> · <slug>' — the same key is stored in Airtable › Residences › Ledger key" },
    stamps: STAMP_MEANING,
    formula: FORMULA_TESTS,
    houses: houses.map((h) => ({
      id: h.entryNo,
      key: `${h.entryNo} · ${h.slug}`,
      slug: h.slug,
      name: h.name,
      url: `${SITE}/houses/${h.slug}`,
      stamp: h.stamp,
      firstVisited: h.firstVisited,
      setting: h.setting,
      place: h.place, region: h.region, country: h.country,
      geo: h.lat != null ? { lat: h.lat, lng: h.lng } : undefined,
      line: h.line,
      verdict: h.verdict,
      bestFor: h.bestFor, notFor: h.notFor,
      sleeps: h.sleeps, bedrooms: h.bedrooms, units: h.units,
      kids: { ages: h.kidsAges, program: h.kidsProgram },
      water: h.water,
      seasons: h.seasons, bestSeason: h.notes?.bestSeason, timeZone: h.notes?.timeZone, power: h.notes?.power,
      airport: h.airport,
      partner: h.partner?.name,
      vip: h.vip ? { collection: h.vip.collection, slug: h.vip.collectionSlug } : undefined,
      booking: h.booking ? { plan: h.booking.plan, wholeHouse: h.booking.wholeHouse, children: h.booking.children, checkIn: h.booking.checkIn, checkOut: h.booking.checkOut, included: h.booking.included, notIncluded: h.booking.excluded, factsChecked: h.booking.checked } : undefined,
      experiences: h.experiences.map((e) => e.name),
      fieldNotes: h.fieldNotes,
      faqs: h.faqs.map((f) => ({ q: f.question, a: f.answer })),
      itineraries: tripsFor(h.slug).map((t) => t.slug),
    })),
    itineraries: live.map((t) => ({
      slug: t.slug,
      title: t.title,
      url: `${SITE}/itineraries/${t.slug}`,
      days: t.days, nights: t.nights,
      houses: [t.house, ...(t.stops || []).flatMap((s) => [s.house, ...(s.or || [])])].filter((v, i, a) => a.indexOf(v) === i).map((slug) => ({ id: idOf(slug), slug })),
      bestFor: t.bestFor, season: t.season, dek: t.dek,
    })),
    horizon: horizon.filter((x) => !x.draft).map((x) => ({ id: x.no, slug: x.slug, name: x.name, url: `${SITE}/horizon/${x.slug}`, place: x.place, country: x.country, setting: x.setting, opens: x.opens, familyFit: x.familyFit })),
  };
}

export type Ledger = Awaited<ReturnType<typeof buildLedger>>;
