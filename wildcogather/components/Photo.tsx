import Image from "next/image";
import type { Img } from "@/lib/types";

// Cloudinary image with a Sand placeholder behind it.
// If no public ID is set yet, the Sand panel shows with a small "photo to come" label.
export default function Photo({ img, sizes = "100vw", priority = false, style }: { img?: Img; sizes?: string; priority?: boolean; style?: React.CSSProperties }) {
  return (
    <div style={{ position: "relative", background: "var(--sand)", overflow: "hidden", ...style }}>
      {img?.publicId ? (
        <Image
          src={img.publicId}
          alt={img.alt}
          fill
          sizes={sizes}
          priority={priority}
          style={{ objectFit: "cover" }}
        />
      ) : (
        <span className="cp" style={{ position: "absolute", left: 12, bottom: 10 }}>Photo to come</span>
      )}
    </div>
  );
}
