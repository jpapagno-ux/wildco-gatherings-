// Next.js image loader: turns a Cloudinary public ID (or full Cloudinary URL) into a resized, auto-format URL.
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "jhlnq5h5";

export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  const t = `f_auto,q_${quality || "auto"},w_${width},c_limit`;
  if (src.startsWith("https://res.cloudinary.com/")) {
    return src.replace("/upload/", `/upload/${t}/`);
  }
  if (src.startsWith("/")) return src;
  // Partner-hosted images (used until the files are moved into Cloudinary) are served as-is.
  if (src.startsWith("http")) return src;
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${t}/${src}`;
}
