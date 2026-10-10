"use client";
import { useState } from "react";
import type { Video } from "@/lib/types";
import { embedUrl, thumbUrl, minutes } from "@/lib/video";

// Shows a still with a play button; the player only loads when someone presses play,
// so the page stays fast (good for Core Web Vitals) and nothing tracks visitors until then.
export default function Film({ video }: { video: Video }) {
  const [on, setOn] = useState(false);
  const [failedThumbnail, setFailedThumbnail] = useState<string>();
  const highResolution = thumbUrl(video, true);
  const thumb = failedThumbnail === highResolution ? thumbUrl(video) : highResolution;
  return (
    <div className="box" style={{ padding: 14 }}>
      <div style={{ position: "relative", paddingTop: "56.25%", background: "var(--charcoal)" }}>
        {on ? (
          <iframe src={embedUrl(video, true)} title={video.title} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
        ) : (
          <button type="button" onClick={() => setOn(true)} aria-label={`Play film: ${video.title}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, padding: 0, cursor: "pointer", background: "var(--charcoal)" }}>
            {thumb && <img src={thumb} alt="" loading="lazy" onError={() => setFailedThumbnail(highResolution)} onLoad={(e) => { if (e.currentTarget.naturalWidth <= 120) setFailedThumbnail(highResolution); }} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.88 }} />}
            <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 88, height: 88, borderRadius: "50%", border: "1.5px solid var(--paper)", background: "rgba(122,31,31,.85)", display: "grid", placeItems: "center" }}>
              <svg width="26" height="26" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#F2EEE6" /></svg>
            </span>
          </button>
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "14px 4px 2px" }}>
        <p className="cp caption" style={{ margin: 0 }}>{video.title}{video.duration ? ` · ${minutes(video.duration)}` : ""}</p>
        {video.credit && <p className="cp caption muted" style={{ margin: 0 }}>{video.credit}</p>}
      </div>
    </div>
  );
}
