"use client";
import Image from "next/image";
import { useState } from "react";
import type { Img } from "@/lib/types";

// Cloudinary image that fades in once loaded (250ms), with a Sand placeholder behind it.
// If no public ID is set yet, the Sand panel shows with a small "photo to come" label.
export default function Photo({ img, sizes = "100vw", priority = false, style }: { img?: Img; sizes?: string; priority?: boolean; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div style={{ position: "relative", background: "var(--sand)", overflow: "hidden", ...style }}>
      {img?.publicId ? (
        <Image
          src={img.publicId}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`fade${loaded ? " in" : ""}`}
          style={{ objectFit: "cover" }}
          onLoad={() => setLoaded(true)}
        />
      ) : (
        <span className="cp" style={{ position: "absolute", left: 12, bottom: 10, fontSize: 11 }}>Photo to come</span>
      )}
    </div>
  );
}
