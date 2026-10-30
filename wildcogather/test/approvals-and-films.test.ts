import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { register } from "node:module";

register("./helpers/resolve-ts.mjs", import.meta.url);

const APPROVE = /\[Draft — J\.W\. to approve\]/i;
const read = (p: string) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

// James, 30 Oct 2026: "Approve all" for the remaining draft lines in his voice. The markers go; the lines stay.
// scrub() still hides any future "[Draft …]" marker, so the mechanism itself is unchanged.
describe("James's approved lines carry no draft marker", async () => {
  const { londoloziResidences } = await import("../lib/sample-londolozi.ts");
  const { getCollection } = await import("../lib/collections.ts");
  const { scrub } = await import("../lib/scrub.ts");

  it("keeps Pioneer's and the Granite Suites' why, verdict and room fit lines, unmarked", () => {
    assert.equal(londoloziResidences.length, 2);
    for (const r of londoloziResidences) {
      assert.ok(r.vip?.why, r.slug);
      assert.doesNotMatch(r.vip!.why, APPROVE, r.slug);
      for (const v of r.verdict) assert.doesNotMatch(v, APPROVE, r.slug);
      const fits = (r.rooms || []).map((x) => x.fit).filter(Boolean) as string[];
      assert.equal(fits.length, 2, `${r.slug} has its two room fit lines`);
      for (const f of fits) assert.doesNotMatch(f, APPROVE, `${r.slug}: ${f}`);
    }
  });

  it("keeps the Kwandwe and Londolozi intros in full", () => {
    for (const slug of ["kwandwe", "londolozi"]) {
      const c = getCollection(slug)!;
      assert.equal(c.intro.length, 2, slug);
      for (const p of c.intro) assert.doesNotMatch(p, APPROVE, slug);
      assert.deepEqual(scrub(c.intro), c.intro, `${slug}: nothing is hidden from the page`);
    }
  });

  it("leaves no approval marker in the On the Horizon emails", () => {
    assert.doesNotMatch(read("emails/on-the-horizon-series.md"), APPROVE);
    assert.doesNotMatch(read("emails/be-the-first-launch.html"), /J\.W\. TO APPROVE/i);
  });

  it("still scrubs a future draft marker", () => {
    assert.equal(scrub("A new line. [Draft — J.W. to approve]"), "A new line.");
  });
});

// James, 30 Oct 2026: Wild Together is his and Miriam's own series, not a MORE film. Credit: Felix Studios and Monwana.
describe("The Wild Together film at Monwana", async () => {
  const W = await import("../lib/wild-together.ts");
  const { getPropertyCollection } = await import("../lib/collections.ts");
  const { moreResidences } = await import("../lib/sample-more.ts");
  const { samplePosts } = await import("../lib/journal.ts");
  const CREDIT = "Film by Felix Studios and Monwana";

  it("is credited like the site's other films", () => {
    assert.equal(W.WILD_TOGETHER_MONWANA_CREDIT, CREDIT);
    assert.match(CREDIT, /^Film by /); // as "Film by Nancy D. Brown, travel writer"
    assert.match(W.wildTogetherMonwana.description!, /Wild Together, James and Miriam Wild's own film series/);
  });

  it("carries the same credit on the MORE page, the Monwana house and Journal No. 03", () => {
    const films = [
      ...(getPropertyCollection("more")!.films || []),
      ...(moreResidences.find((r) => r.slug === "monwana-villa-thornybush")!.videos || []),
      samplePosts.find((p) => p.slug === "wild-together-monwana-thornybush")!.video!,
    ].filter((v) => v.id === W.WILD_TOGETHER_MONWANA_ID);
    assert.equal(films.length, 3);
    for (const v of films) {
      assert.equal(v.credit, CREDIT);
      assert.doesNotMatch(v.credit!, /MORE|Wild Earth Stays/);
    }
  });

  it("names Felix Studios as maker and Monwana as contributor in the VideoObject, and no one for other films", () => {
    const m = W.filmMakers({ id: W.WILD_TOGETHER_MONWANA_ID }) as Record<string, any>;
    assert.deepEqual(m.creator, { "@type": "Organization", name: "Felix Studios" });
    assert.deepEqual(m.productionCompany, { "@type": "Organization", name: "Felix Studios" });
    assert.deepEqual(m.contributor, { "@type": "Organization", name: "Monwana" });
    assert.equal(m.isPartOf["@type"], "CreativeWorkSeries");
    assert.equal(m.isPartOf.name, "Wild Together");
    assert.deepEqual(W.filmMakers({ id: "eQEcuoqbz40" }), {});
  });
});
