import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { MORE_VILLAS, MORE_PAIRINGS, MORE_FAQS, MORE_CREDIT } from "../lib/more.ts";

// The MORE villas: one record per villa, pairings that point at real villas, Safaris IDs kept for matching only.
const ents = JSON.parse(readFileSync(new URL("../data/entities.json", import.meta.url), "utf8")).entities as { id: string; slug: string | null; collectionRefs: { collection: string; ref: string }[] }[];
const slugs = MORE_VILLAS.map((v) => v.slug);

describe("MORE villas", () => {
  it("lists the five villas MORE publishes, each once", () => {
    assert.equal(MORE_VILLAS.length, 5);
    assert.equal(new Set(slugs).size, 5);
  });

  it("gives every villa a permanent entity, a Gatherings G-### and a Safaris WCS-ZA ID", () => {
    for (const s of slugs) {
      const e = ents.find((x) => x.slug === s);
      assert.ok(e, `${s} has an entity`);
      assert.match(e!.collectionRefs.find((c) => c.collection === "gatherings")?.ref || "", /^G-\d{3}$/);
      assert.match(e!.collectionRefs.find((c) => c.collection === "safaris")?.ref || "", /^WCS-ZA-[A-Z]{3}-\d{2}$/);
    }
  });

  it("only pairs villas that are in the collection, and never a villa with itself", () => {
    for (const p of MORE_PAIRINGS) {
      assert.ok(p.houses.every((h) => slugs.includes(h)), p.title);
      assert.notEqual(p.houses[0], p.houses[1]);
    }
  });

  it("publishes no partner or Safaris links, rates or currency in the shared copy", () => {
    const text = JSON.stringify({ MORE_VILLAS, MORE_PAIRINGS, MORE_FAQS });
    assert.doesNotMatch(text, /more\.co\.za|wildcosafaris|https?:\/\//i);
    assert.doesNotMatch(text, /\$\s?\d|USD|ZAR\s?\d/);
  });

  it("credits MORE as approved", () => {
    assert.equal(MORE_CREDIT, "Photograph courtesy of MORE");
  });
});
