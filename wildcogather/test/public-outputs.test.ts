import { describe, it, before } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { publicNotes, isInternalNote } from "../lib/public-notes.ts";

// Internal notes must never be published (30 Oct 2026). Airtable › Residences › "Notes" is published as public field
// notes in /ledger.json and /llms-full.txt; internal material lives in "Internal notes", which the site never reads.
// These tests build the real public outputs from mocked Airtable rows whose notes carry links and internal markers.

register("./helpers/resolve-ts.mjs", import.meta.url);

const INTERNAL_URL = "https://wildcosafaris.vercel.app/destinations/south-africa/sabi-sand/example-camp/";
const PARTNER_URL = "https://www.more.co.za/villas/";
const rows = [
  {
    id: "recTEST000000001",
    fields: {
      Residence: "Pioneer Camp, Londolozi", Slug: "pioneer-camp-londolozi", "Entry No.": "G-031", Status: "Approved",
      // A row whose Notes were never cleaned: every line is internal and must be dropped.
      Notes: `Added 30 Oct 2026. Safaris ledger ID WCS-ZA-SAB-15; page ${INTERNAL_URL}. Mirrors lib/sample-londolozi.ts.\nSources (Oct 2026): example.com. Draft — photos to come.\nPartner page ${PARTNER_URL}`,
      "Internal notes": `Source notes ${INTERNAL_URL} and ${PARTNER_URL} · contact host@example.com · commission 10%`,
    },
  },
  {
    id: "recTEST000000002",
    fields: {
      Residence: "Cape Cadogan Villa", Slug: "cape-cadogan-villa-cape-town", "Entry No.": "G-034", Status: "Approved",
      Notes: "Breakfast is made daily by a chef; lunches and dinners can be booked at Upper Union.\nAsk for the plunge pool to be warmed.",
      "Internal notes": `Checked against ${PARTNER_URL} [Draft — J.W. to approve]`,
    },
  },
];

let outputs: Record<string, string> = {};

before(async () => {
  process.env.AIRTABLE_TOKEN = "test-token";
  delete process.env.VERCEL_ENV;
  globalThis.fetch = (async (input: string | URL) => {
    const url = String(input);
    const records = url.includes("/Residences?") ? rows : [];
    return new Response(JSON.stringify({ records }), { status: 200, headers: { "Content-Type": "application/json" } });
  }) as typeof fetch;
  const full = await import("../app/llms-full.txt/route.ts");
  const short = await import("../app/llms.txt/route.ts");
  const json = await import("../app/ledger.json/route.ts");
  outputs = {
    "/llms-full.txt": await (await full.GET()).text(),
    "/llms.txt": await (await short.GET()).text(),
    "/ledger.json": await (await json.GET()).text(),
  };
});

describe("Public outputs never carry internal notes", () => {
  it("built the outputs from the mocked Airtable rows", () => {
    assert.match(outputs["/llms-full.txt"], /G-031 · Pioneer Camp, Londolozi/);
    assert.match(outputs["/ledger.json"], /"cape-cadogan-villa-cape-town"/);
  });

  for (const path of ["/llms-full.txt", "/llms.txt", "/ledger.json"]) {
    it(`${path} has no Safaris-site or partner links, and nothing from Internal notes`, () => {
      const out = outputs[path];
      assert.doesNotMatch(out, /wild(?:and)?cosafaris/i);
      assert.doesNotMatch(out, /more\.co\.za/i);
      assert.doesNotMatch(out, /example\.com|host@|commission 10%|Source notes|Checked against/);
    });
  }

  it("no http link in the outputs comes from a field note", () => {
    const L = JSON.parse(outputs["/ledger.json"]);
    for (const h of L.houses) for (const n of h.fieldNotes) assert.doesNotMatch(n, /https?:\/\/|www\.|\.vercel\.app/i, `${h.id}: ${n}`);
    const notes = outputs["/llms-full.txt"].split("\n").filter((l) => l.startsWith("  - "));
    for (const n of notes) assert.doesNotMatch(n, /https?:\/\/|www\./i, n);
  });

  it("keeps clean public field notes and drops internal lines", () => {
    const L = JSON.parse(outputs["/ledger.json"]);
    const byId = Object.fromEntries(L.houses.map((h: { id: string; fieldNotes: string[] }) => [h.id, h.fieldNotes]));
    assert.deepEqual(byId["G-031"], []);
    assert.deepEqual(byId["G-034"], ["Breakfast is made daily by a chef; lunches and dinners can be booked at Upper Union.", "Ask for the plunge pool to be warmed."]);
  });
});

describe("publicNotes()", () => {
  it("drops links, review markers, sources, code references and commercial lines", () => {
    for (const l of [`page ${INTERNAL_URL}`, "see www.example.org", "Sources (Oct 2026): a, b", "Draft — photos to come", "Room count [to confirm]", "Mirrors lib/sample-kwandwe.ts.", "Safaris ledger ID WCS-ZA-ECP-06", "Commission agreed", "Call +27 21 555 0100"]) {
      assert.ok(isInternalNote(l), l);
    }
  });

  it("keeps the kind of tips written for families", () => {
    const clean = ["Book the Naledi Sleepout for the teenagers and one brave parent.", "Go May to September for the clearest game viewing — pack for cold mornings.", "Guests over 60 need a medical certificate for bush walks.", "Celebrations of up to 60 guests, residents included, can be held at the villa.", "The Thabametsi Treehouse is an overnight extra, not part of the villa stay."];
    assert.deepEqual(publicNotes(clean.join("\n")), clean);
  });
});

describe("The code never reads Internal notes", () => {
  it("no app, lib or component file reads the Internal notes field", () => {
    const root = new URL("../", import.meta.url).pathname;
    const files: string[] = [];
    const walk = (d: string) => { for (const f of readdirSync(d)) { const p = join(d, f); if (statSync(p).isDirectory()) walk(p); else if (/\.(ts|tsx)$/.test(f)) files.push(p); } };
    for (const d of ["app", "lib", "components"]) walk(join(root, d));
    for (const f of files) assert.doesNotMatch(readFileSync(f, "utf8"), /\[\s*["'`]Internal notes["'`]\s*\]|INTERNAL_NOTES_FIELD\s*\]/, f);
  });
});
