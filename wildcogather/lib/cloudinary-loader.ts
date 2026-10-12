// Next.js image loader: turns a Cloudinary public ID (or full Cloudinary URL) into a resized, auto-format URL.
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "jhlnq5h5";

export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const t = `f_auto,q_${quality || "auto"},w_${width},c_limit`;
  if (src.startsWith("https://res.cloudinary.com/")) {
    return src.replace("/upload/", `/upload/${t}/`);
  }
  if (src.startsWith("/")) return src;
  // Smart crop: Photo passes "ar_5:4,c_fill,g_auto/<public id>" — Cloudinary crops to that shape
  // around the subject (animal, pool, table) first, then resizes for the screen.
  const crop = src.match(/^(ar_[\d.:]+,c_fill,g_auto)\/(.+)$/);
  if (crop) return `https://res.cloudinary.com/${CLOUD}/image/upload/${crop[1]}/${t}/${crop[2]}`;
  // Partner-hosted images (used until the files are moved into Cloudinary) are served as-is.
  if (src.startsWith("http")) return src;
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${t}/${src}`;
}
