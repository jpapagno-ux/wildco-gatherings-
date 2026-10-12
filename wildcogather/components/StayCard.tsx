import Link from "next/link";
import Photo from "./Photo";
import type { Residence } from "@/lib/types";
import { SETTINGS } from "@/lib/settings";
import { cardImage } from "@/lib/browse";

// One card for every stay grid and rail. The photo frame has a fixed 5:4 shape and Cloudinary crops
// to it around the subject, so new photography of any size or orientation lines up with the rest.
export default function StayCard({ r, sizes = "(max-width: 700px) 100vw, 380px" }: { r: Residence; sizes?: string }) {
  const ink = SETTINGS[r.setting].ink;
  return (
    <Link href={`/houses/${r.slug}`} className="house-card">
      <Photo img={cardImage(r)} sizes={sizes} aspect="5:4" className="house-card-photo" />
      <p className="cp muted house-card-meta">Entry {r.entryNo} · {[r.place, r.region].filter(Boolean).join(", ")}</p>
      <h3 className="ser house-card-name">{r.name}</h3>
      <hr style={{ width: 30, height: 1, border: 0, background: ink, margin: "12px auto" }} />
      <p className="cp oxblood" style={{ margin: 0 }}>{r.stamp}{r.vip ? " · Gatherings VIP" : ""}</p>
    </Link>
  );
}
