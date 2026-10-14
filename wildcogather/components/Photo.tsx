"use client";
import Image from "next/image";
import { useState } from "react";
import type { Img } from "@/lib/types";
import { applyCropToSrc } from "@/lib/cloudinary-loader";

export interface PhotoProps {
  img?: Img;
  sizes?: string;
  priority?: boolean;
  aspect?: string;
  contain?: boolean;
  style?: React.CSSProperties;
  className?: string;
  alt?: string;
}

// Cloudinary image that fades in once loaded (250ms), with a Sand placeholder behind it.
// aspect (e.g. "5:4") asks Cloudinary for a subject-aware crop in that shape (g_auto),
// so a portrait leopard or a wide pool still lands well in a landscape frame.
// Supports bare public IDs and full Cloudinary URLs, focal points/object positions,
// and resets fade/error state when the source changes.
// If no public ID is set, the Sand panel shows with a "photo to come" label.
export default function Photo({
  img,
  sizes = "100vw",
  priority = false,
  aspect,
  contain = false,
  style,
  className,
  alt: altOverride,
}: PhotoProps) {
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  const rawSrc = img?.publicId?.trim();
  if (!rawSrc) {
    return (
      <div className={className} style={{ position: "relative", background: "var(--sand)", overflow: "hidden", ...style }}>
        <span className="cp" style={{ position: "absolute", left: 12, bottom: 10, fontSize: 11 }}>
          Photo to come
        </span>
      </div>
    );
  }

  const effectiveAspect = !contain ? (aspect || img?.aspect) : undefined;
  const gravity = img?.gravity || "auto";
  const effectiveSrc = effectiveAspect ? applyCropToSrc(rawSrc, effectiveAspect, gravity) : rawSrc;

  const isLoaded = loadedSrc === effectiveSrc;
  const hasError = errorSrc === effectiveSrc;

  const objectPosition = img?.objectPosition || img?.focalPoint || style?.objectPosition;
  const altText = altOverride !== undefined ? altOverride : (img?.alt ?? "");

  if (process.env.NODE_ENV === "development" && !altText && !altOverride) {
    console.warn(`[Photo] Missing alt text for image: "${rawSrc}"`);
  }

  return (
    <div className={className} style={{ position: "relative", background: "var(--sand)", overflow: "hidden", ...style }}>
      {hasError ? (
        // Deliberate fallback: a quiet sand panel that keeps its aspect; the description stays for screen readers.
        <span role={altText ? "img" : undefined} aria-label={altText || undefined} className="cp" style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 10, color: "var(--clay-text)" }}>
          <span aria-hidden="true">Photograph to follow</span>
        </span>
      ) : (
        <Image
          src={effectiveSrc}
          alt={altText}
          fill
          sizes={sizes}
          priority={priority}
          className={`fade${isLoaded ? " in" : ""}`}
          style={{
            objectFit: contain ? "contain" : "cover",
            ...(objectPosition ? { objectPosition } : {}),
          }}
          onLoad={() => setLoadedSrc(effectiveSrc)}
          onError={() => setErrorSrc(effectiveSrc)}
        />
      )}
    </div>
  );
}
