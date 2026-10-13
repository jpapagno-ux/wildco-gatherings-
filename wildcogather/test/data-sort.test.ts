import { describe, it } from "node:test";
import assert from "node:assert/strict";

describe("Order sorting logic (nullish coalescing vs truthy fallback)", () => {
  it("preserves order 0 ahead of 1, 2, and undefined using nullish coalescing (?? 99)", () => {
    const items = [
      { id: "c", order: 2 },
      { id: "hero", order: 0 },
      { id: "b", order: 1 },
      { id: "unspecified" },
    ];

    const sortedWithNullish = [...items].sort(
      (a, b) => (a.order ?? 99) - (b.order ?? 99)
    );

    assert.deepEqual(
      sortedWithNullish.map((item) => item.id),
      ["hero", "b", "c", "unspecified"]
    );
  });

  it("demonstrates bug in logical OR (|| 99) where 0 was wrongly demoted to 99", () => {
    const items = [
      { id: "c", order: 2 },
      { id: "hero", order: 0 },
      { id: "b", order: 1 },
    ];

    // Using old buggy pattern:
    const sortedBuggy = [...items].sort(
      (a, b) => (a.order || 99) - (b.order || 99)
    );

    // In the old buggy code, 'hero' (order 0) got pushed to the back because 0 || 99 === 99
    assert.deepEqual(
      sortedBuggy.map((item) => item.id),
      ["b", "c", "hero"]
    );
  });
});
