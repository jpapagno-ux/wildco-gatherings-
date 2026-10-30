import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";

register("./helpers/resolve-ts.mjs", import.meta.url);

// James, 30 Oct 2026: all five MORE villas are Gatherings VIP (/vip/more), and Wild & Co Safaris has one door.
describe("The MORE villas are Gatherings VIP", async () => {
  const { getPropertyCollection, collectionPath, vipPropertyCollections } = await import("../lib/collections.ts");
  const { MORE_VILLAS } = await import("../lib/more.ts");
  const { MORE_VIP, moreResidences } = await import("../lib/sample-more.ts");

  it("has its canonical page at /vip/more", () => {
    const c = getPropertyCollection("more")!;
    assert.equal(c.vip, true);
    assert.equal(collectionPath(c), "/vip/more");
    assert.ok(vipPropertyCollections.some((x) => x.slug === "more"));
  });

  it("gives every villa the same VIP block in code as it will have in Airtable", () => {
    for (const v of MORE_VILLAS) {
      const vip = MORE_VIP[v.slug];
      assert.ok(vip, v.slug);
      assert.equal(vip.collectionSlug, "more");
      assert.equal(vip.collection, "The MORE Villas");
      assert.doesNotMatch(vip.why, /\[Draft/, `${v.slug}: James approved his line (30 Oct 2026), so it carries no draft marker`);
      assert.doesNotMatch(JSON.stringify(vip), /https?:\/\/|more\.co\.za|\$\s?\d|ZAR\s?\d/);
      assert.deepEqual(moreResidences.find((r) => r.slug === v.slug)?.vip, vip);
    }
  });

  it("records Cape Cadogan as founder inspected, and only Marataba as vetted partner", () => {
    const stamp = (s: string) => moreResidences.find((r) => r.slug === s)?.stamp;
    assert.equal(stamp("cape-cadogan-villa-cape-town"), "Founder inspected & approved");
    assert.equal(stamp("marataba-villa-marakele"), "Vetted partner");
    const status = getPropertyCollection("more")!.facts.find(([k]) => k === "Status")![1];
    assert.match(status, /Cape Cadogan founder inspected & approved, May 2026/);
    assert.match(status, /Marataba vetted partner$/);
  });
});

describe("No links to the House site or to Wild & Co Safaris", () => {
  // James, 30 Oct 2026: no links to or from the House of James Wild & Co site; Safaris has one door, on the House site.
  const fresh = (tag: string): string => new URL(`../lib/ecosystem.ts?${tag}`, import.meta.url).href;

  it("names Safaris without linking it, and leaves the House seal unlinked, even with env overrides", async () => {
    process.env.NEXT_PUBLIC_SAFARIS_URL = "https://www.jameswildco.com/safaris/wild-co-safaris";
    process.env.NEXT_PUBLIC_JWCO_HOME_URL = "https://www.jameswildco.com/";
    const eco = await import(fresh("nolinks"));
    assert.equal(eco.volume("safaris").href, undefined);
    assert.equal(eco.SAFARIS_URL, undefined);
    assert.equal(eco.MASTER_HOME_URL, undefined);
    assert.ok(eco.VOLUMES.every((v: { href?: string }) => !/jameswildco|house-of-james-wild|wild(?:and)?cosafaris/i.test(v.href || "")));
    delete process.env.NEXT_PUBLIC_SAFARIS_URL;
    delete process.env.NEXT_PUBLIC_JWCO_HOME_URL;
  });
});
