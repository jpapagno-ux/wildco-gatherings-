// Next.js image loader: turns a Cloudinary public ID (or full Cloudinary URL) into a resized, auto-format URL.
const DEFAULT_CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "jhlnq5h5";

export function getCloudinaryCloud(): string {
  return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || DEFAULT_CLOUD;
}

export function isCloudinaryUrl(url: string): boolean {
  return /^https?:\/\/res\.cloudinary\.com\//i.test(url);
}

export function isLocalPath(src: string): boolean {
  return src.startsWith("/");
}

export function isExternalNonCloudinaryUrl(src: string): boolean {
  return /^https?:\/\//i.test(src) && !isCloudinaryUrl(src);
}

const CLOUDINARY_URL_REGEX = /^https?:\/\/res\.cloudinary\.com\/([^/]+)\/(image|video|raw)\/(upload|authenticated|private)\/(.*)$/i;

function isTransformSegment(segment: string): boolean {
  if (!segment) return false;
  const parts = segment.split(",");
  return parts.length > 0 && parts.every((p) => /^[a-z]{1,3}_[a-zA-Z0-9_.:-]+$/.test(p));
}

function isVersionSegment(segment: string): boolean {
  return /^v\d+$/.test(segment);
}

export interface ParsedCloudinary {
  cloudName: string;
  resourceType: string;
  deliveryType: string;
  cropTransform?: string;
  version?: string;
  publicId: string;
}

export function parseCloudinarySource(src: string, defaultCloud = getCloudinaryCloud()): ParsedCloudinary | null {
  if (!src || isLocalPath(src) || isExternalNonCloudinaryUrl(src)) {
    return null;
  }

  let cloudName = defaultCloud;
  let resourceType = "image";
  let deliveryType = "upload";
  let rest = src.trim();

  const fullMatch = rest.match(CLOUDINARY_URL_REGEX);
  if (fullMatch) {
    cloudName = fullMatch[1];
    resourceType = fullMatch[2];
    deliveryType = fullMatch[3];
    rest = fullMatch[4];
  }

  const segments = rest.split("/").filter(Boolean);
  const cropSegments: string[] = [];
  let version: string | undefined;
  const publicIdParts: string[] = [];

  let inPublicId = false;

  for (const seg of segments) {
    if (inPublicId) {
      publicIdParts.push(seg);
      continue;
    }
    if (isVersionSegment(seg)) {
      version = seg;
      inPublicId = true;
      continue;
    }
    if (isTransformSegment(seg)) {
      // Keep crop / positioning transforms (e.g. ar_*, c_fill, g_*, x_*, y_*)
      // Strip previous delivery/responsive transforms (w_*, h_*, f_*, q_*, c_limit)
      const nonDeliveryParts = seg
        .split(",")
        .filter((part) => !/^(w_\d+|h_\d+|f_[a-z0-9]+|q_[a-z0-9]+|c_limit)$/.test(part));
      if (nonDeliveryParts.length > 0) {
        cropSegments.push(nonDeliveryParts.join(","));
      }
      continue;
    }
    // First non-transformation, non-version segment begins the public ID
    inPublicId = true;
    publicIdParts.push(seg);
  }

  const publicId = publicIdParts.join("/");
  if (!publicId) return null;

  return {
    cloudName,
    resourceType,
    deliveryType,
    cropTransform: cropSegments.length > 0 ? cropSegments.join("/") : undefined,
    version,
    publicId,
  };
}

export function applyCropToSrc(src: string, aspect?: string, gravity = "auto"): string {
  if (!aspect || !src || isLocalPath(src) || isExternalNonCloudinaryUrl(src)) {
    return src;
  }

  const crop = `ar_${aspect},c_fill,g_${gravity}`;

  // If already prefixed with an aspect ratio crop, replace with new aspect
  if (/^ar_[\d.:]+[^/]*\//.test(src)) {
    return src.replace(/^ar_[\d.:]+[^/]*\//, `${crop}/`);
  }
  if (/\/upload\/ar_[\d.:]+[^/]*\//i.test(src)) {
    return src.replace(/\/upload\/ar_[\d.:]+[^/]*\//i, `/upload/${crop}/`);
  }

  if (isCloudinaryUrl(src)) {
    return src.replace(/\/upload\//i, `/upload/${crop}/`);
  }

  return `${crop}/${src}`;
}

export interface BuildCloudinaryUrlOptions {
  src: string;
  width?: number;
  height?: number;
  aspect?: string;
  crop?: "fill" | "limit" | "fit" | "thumb" | "crop" | "scale";
  gravity?: string;
  quality?: number | "auto";
  format?: "auto" | "jpg" | "png" | "webp" | "avif";
  cloudName?: string;
}

export function buildCloudinaryUrl(
  srcOrOpts: string | BuildCloudinaryUrlOptions,
  options?: Omit<BuildCloudinaryUrlOptions, "src">
): string {
  const opts: BuildCloudinaryUrlOptions =
    typeof srcOrOpts === "string" ? { src: srcOrOpts, ...options } : srcOrOpts;
  const { src, width, height, aspect, crop, gravity, quality = "auto", format = "auto" } = opts;
  if (!src) return "";
  if (isLocalPath(src) || isExternalNonCloudinaryUrl(src)) {
    return src;
  }

  const parsed = parseCloudinarySource(src, opts.cloudName || getCloudinaryCloud());
  if (!parsed) return src;

  const transforms: string[] = [];

  // Determine crop transformation: explicit aspect takes priority over existing URL crop
  if (aspect || crop || gravity || parsed.cropTransform) {
    if (aspect) {
      transforms.push(`ar_${aspect},c_${crop || "fill"},g_${gravity || "auto"}`);
    } else if (parsed.cropTransform) {
      transforms.push(parsed.cropTransform);
    }
  }

  // Build delivery transformation
  const deliveryParts = [`f_${format}`, `q_${quality}`];
  if (width) deliveryParts.push(`w_${width}`);
  if (height) deliveryParts.push(`h_${height}`);
  if (crop && !aspect && !parsed.cropTransform) {
    deliveryParts.push(`c_${crop}`);
  } else {
    deliveryParts.push("c_limit");
  }

  transforms.push(deliveryParts.join(","));

  const chain = transforms.filter(Boolean).join("/");
  const ver = parsed.version ? `${parsed.version}/` : "";
  return `https://res.cloudinary.com/${parsed.cloudName}/${parsed.resourceType}/${parsed.deliveryType}/${chain}/${ver}${parsed.publicId}`;
}

export function getOgImageUrl(imgOrSrc: { publicId: string } | string): string {
  const src = typeof imgOrSrc === "string" ? imgOrSrc : imgOrSrc.publicId;
  if (!src) return "";
  if (isLocalPath(src) || isExternalNonCloudinaryUrl(src)) {
    return src;
  }
  return buildCloudinaryUrl({
    src,
    width: 1200,
    height: 630,
    aspect: "1200:630",
    crop: "fill",
    gravity: "auto",
    quality: "auto",
    format: "jpg",
  });
}

export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (isLocalPath(src) || isExternalNonCloudinaryUrl(src)) {
    return src;
  }

  const parsed = parseCloudinarySource(src);
  if (!parsed) return src;

  const delivery = `f_auto,q_${quality || "auto"},w_${width},c_limit`;
  const chain = parsed.cropTransform ? `${parsed.cropTransform}/${delivery}` : delivery;
  const ver = parsed.version ? `${parsed.version}/` : "";

  return `https://res.cloudinary.com/${parsed.cloudName}/${parsed.resourceType}/${parsed.deliveryType}/${chain}/${ver}${parsed.publicId}`;
}
