import type { Video } from "./types";

export function embedUrl(v: Video, autoplay = false) {
  const a = autoplay ? 1 : 0;
  return v.provider === "youtube"
    ? `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=${a}&rel=0&modestbranding=1`
    : `https://player.vimeo.com/video/${v.id}?autoplay=${a}&dnt=1&title=0&byline=0`;
}

export function thumbUrl(v: Video) {
  return v.thumbnail || (v.provider === "youtube" ? `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` : "");
}

export function minutes(iso?: string) {
  const m = iso?.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return "";
  return `${Number(m[1] || 0)}:${String(Number(m[2] || 0)).padStart(2, "0")}`;
}

// Accepts a bare 11-character ID or any YouTube link people paste:
// youtu.be/ID?si=…, youtube.com/watch?v=ID&t=…, /shorts/ID, /live/ID, /embed/ID.
export function youtubeId(input?: string): string | undefined {
  const s = (input || "").trim();
  if (!s) return undefined;
  if (/^[\w-]{11}$/.test(s)) return s;
  const m = s.match(/(?:youtu\.be\/|[?&]v=|\/(?:shorts|live|embed|v)\/)([\w-]{11})/);
  return m ? m[1] : undefined;
}
