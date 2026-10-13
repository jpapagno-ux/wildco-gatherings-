import { describe, it } from "node:test";
import assert from "node:assert/strict";
import cloudinaryLoader, {
  parseCloudinarySource,
  buildCloudinaryUrl,
  applyCropToSrc,
  getOgImageUrl,
} from "../lib/cloudinary-loader.ts";

describe("Cloudinary URL parsing and transformation", () => {
  it("parses bare public ID without crop or version", () => {
    const parsed = parseCloudinarySource("gatherings/lone-mountain-ranch/family-trail-ride");
    assert.ok(parsed);
    assert.equal(parsed.cloudName, "jhlnq5h5");
    assert.equal(parsed.publicId, "gatherings/lone-mountain-ranch/family-trail-ride");
    assert.equal(parsed.cropTransform, undefined);
    assert.equal(parsed.version, undefined);
  });

  it("parses public ID with existing crop prefix", () => {
    const parsed = parseCloudinarySource("ar_16:9,c_fill,g_auto/gatherings/lone-mountain-ranch/family-trail-ride");
    assert.ok(parsed);
    assert.equal(parsed.cropTransform, "ar_16:9,c_fill,g_auto");
    assert.equal(parsed.publicId, "gatherings/lone-mountain-ranch/family-trail-ride");
  });

  it("parses full Cloudinary URL with version and without crop", () => {
    const url = "https://res.cloudinary.com/jhlnq5h5/image/upload/v1728000000/gatherings/vermejo/castle-rock-bison-vermejo";
    const parsed = parseCloudinarySource(url);
    assert.ok(parsed);
    assert.equal(parsed.cloudName, "jhlnq5h5");
    assert.equal(parsed.version, "v1728000000");
    assert.equal(parsed.publicId, "gatherings/vermejo/castle-rock-bison-vermejo");
    assert.equal(parsed.cropTransform, undefined);
  });

  it("parses full Cloudinary URL with existing crop transform and version", () => {
    const url = "https://res.cloudinary.com/jhlnq5h5/image/upload/ar_4:3,c_fill,g_auto/v1728000000/gatherings/test-house/photo";
    const parsed = parseCloudinarySource(url);
    assert.ok(parsed);
    assert.equal(parsed.cloudName, "jhlnq5h5");
    assert.equal(parsed.cropTransform, "ar_4:3,c_fill,g_auto");
    assert.equal(parsed.version, "v1728000000");
    assert.equal(parsed.publicId, "gatherings/test-house/photo");
  });

  it("returns null for non-Cloudinary external URLs and local paths", () => {
    assert.equal(parseCloudinarySource("https://images.unsplash.com/photo-12345"), null);
    assert.equal(parseCloudinarySource("http://partner-cdn.com/lodge.jpg"), null);
    assert.equal(parseCloudinarySource("/brand/jwco-hare-240.png"), null);
  });
});

describe("buildCloudinaryUrl", () => {
  it("builds a canonical URL with responsive width, auto format, and auto quality", () => {
    const url = buildCloudinaryUrl("gatherings/test/photo", { width: 1200, aspect: "16:9" });
    assert.equal(
      url,
      "https://res.cloudinary.com/jhlnq5h5/image/upload/ar_16:9,c_fill,g_auto/f_auto,q_auto,w_1200,c_limit/gatherings/test/photo"
    );
  });

  it("preserves version from full Cloudinary URL input", () => {
    const input = "https://res.cloudinary.com/jhlnq5h5/image/upload/v999/gatherings/test/photo";
    const url = buildCloudinaryUrl(input, { width: 800 });
    assert.equal(
      url,
      "https://res.cloudinary.com/jhlnq5h5/image/upload/f_auto,q_auto,w_800,c_limit/v999/gatherings/test/photo"
    );
  });

  it("passes local paths and external non-Cloudinary URLs through untouched", () => {
    assert.equal(buildCloudinaryUrl("/brand/jwco-hare-240.png", { width: 600 }), "/brand/jwco-hare-240.png");
    assert.equal(
      buildCloudinaryUrl("https://partner.com/image.jpg", { width: 600 }),
      "https://partner.com/image.jpg"
    );
  });
});

describe("applyCropToSrc", () => {
  it("prepends crop transform to bare public ID", () => {
    const result = applyCropToSrc("gatherings/test/photo", "16:9");
    assert.equal(result, "ar_16:9,c_fill,g_auto/gatherings/test/photo");
  });

  it("updates crop transform on full Cloudinary URL without duplicating /upload/", () => {
    const input = "https://res.cloudinary.com/jhlnq5h5/image/upload/v123/gatherings/test/photo";
    const result = applyCropToSrc(input, "4:3");
    assert.equal(
      result,
      "https://res.cloudinary.com/jhlnq5h5/image/upload/ar_4:3,c_fill,g_auto/v123/gatherings/test/photo"
    );
  });

  it("replaces existing crop transform on full Cloudinary URL", () => {
    const input = "https://res.cloudinary.com/jhlnq5h5/image/upload/ar_1:1,c_fill,g_auto/v123/gatherings/test/photo";
    const result = applyCropToSrc(input, "16:9");
    assert.equal(
      result,
      "https://res.cloudinary.com/jhlnq5h5/image/upload/ar_16:9,c_fill,g_auto/v123/gatherings/test/photo"
    );
  });

  it("returns local paths and non-Cloudinary external URLs unmodified", () => {
    assert.equal(applyCropToSrc("/brand/jwco-hare-600.png", "1:1"), "/brand/jwco-hare-600.png");
    assert.equal(applyCropToSrc("https://partner.org/lodge.png", "16:9"), "https://partner.org/lodge.png");
  });
});

describe("getOgImageUrl", () => {
  it("generates 1200x630 social share URL for Cloudinary assets", () => {
    const og = getOgImageUrl("gatherings/test/photo");
    assert.equal(
      og,
      "https://res.cloudinary.com/jhlnq5h5/image/upload/ar_1200:630,c_fill,g_auto/f_jpg,q_auto,w_1200,h_630,c_limit/gatherings/test/photo"
    );
  });

  it("accepts image metadata with a full Cloudinary URL and preserves its version", () => {
    const og = getOgImageUrl({ publicId: "https://res.cloudinary.com/partner/image/upload/v123/gatherings/photo" });
    assert.equal(
      og,
      "https://res.cloudinary.com/partner/image/upload/ar_1200:630,c_fill,g_auto/f_jpg,q_auto,w_1200,h_630,c_limit/v123/gatherings/photo"
    );
  });

  it("preserves local assets and external partner URLs in metadata", () => {
    for (const publicId of ["/brand/logo.png", "https://partner.org/lodge.jpg"]) {
      assert.equal(getOgImageUrl({ publicId }), publicId);
      assert.equal(buildCloudinaryUrl({ src: publicId, width: 1600, quality: "auto", format: "auto" }), publicId);
    }
  });
});

describe("cloudinaryLoader (Next.js custom loader)", () => {
  it("chains crop with responsive width and quality transforms", () => {
    const url = cloudinaryLoader({
      src: "ar_5:4,c_fill,g_auto/gatherings/test/photo",
      width: 640,
      quality: 85,
    });
    assert.equal(
      url,
      "https://res.cloudinary.com/jhlnq5h5/image/upload/ar_5:4,c_fill,g_auto/f_auto,q_85,w_640,c_limit/gatherings/test/photo"
    );
  });

  it("handles full Cloudinary URL with crop in custom loader", () => {
    const url = cloudinaryLoader({
      src: "https://res.cloudinary.com/jhlnq5h5/image/upload/ar_16:9,c_fill,g_auto/v456/gatherings/test/photo",
      width: 1080,
    });
    assert.equal(
      url,
      "https://res.cloudinary.com/jhlnq5h5/image/upload/ar_16:9,c_fill,g_auto/f_auto,q_auto,w_1080,c_limit/v456/gatherings/test/photo"
    );
  });

  it("passes local paths and external URLs straight through", () => {
    assert.equal(cloudinaryLoader({ src: "/brand/logo.png", width: 300 }), "/brand/logo.png");
    assert.equal(
      cloudinaryLoader({ src: "https://example.com/partner.jpg", width: 500 }),
      "https://example.com/partner.jpg"
    );
  });
});
