"use client";
import { useState } from "react";
import type { Video } from "@/lib/types";
import { embedUrl, thumbUrl, minutes, watchUrl } from "@/lib/video";

// Shows a still with a play button; the player only loads when someone presses play,
// so the page stays fast (good for Core Web Vitals) and nothing tracks visitors until then.
export default function Film({ video, dark = false }: { video: Video; dark?: boolean }) {
  const [on, setOn] = useState(false);
  const thumb = thumbUrl(video);
  return (
    <div className={dark ? undefined : "card"} style={{ padding: dark ? 0 : 14 }}>
      <div style={{ position: "relative", paddingTop: "56.25%", background: "#111" }}>
        {on ? (
          <iframe src={embedUrl(video, true)} title={video.title} allow="autoplay; fullscreen; picture-in-picture; encrypted-media" allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }} />
        ) : (
          <button type="button" onClick={() => setOn(true)} aria-label={`Play film: ${video.title}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, padding: 0, cursor: "pointer", background: "var(--charcoal)" }}>
            {thumb && <img src={thumb} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.visibility = "hidden"; }} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.88 }} />}
            <span aria-hidden="true" style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 88, height: 88, borderRadius: "50%", border: "1.5px solid var(--paper)", background: "rgba(148,81,47,.9)", display: "grid", placeItems: "center" }}>
              <svg width="26" height="26" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="#F2EEE6" /></svg>
            </span>
          </button>
        )}
      </div>
      {video.provider === "vimeo" ? (
        // Vimeo films: one caption line — "<title> · <credit> · Watch on Vimeo" (the link opens the film on vimeo.com).
        <p className="cp" style={{ margin: 0, padding: dark ? "16px 0 0" : "14px 4px 2px", color: dark ? "rgba(244,241,236,.72)" : undefined }}>
          {video.title}{video.duration ? ` · ${minutes(video.duration)}` : ""}{video.credit ? ` · ${video.credit}` : ""} · <a href={watchUrl(video)} target="_blank" rel="noopener" style={{ color: dark ? "var(--on-dark-accent)" : "var(--clay-text)" }}>Watch on Vimeo</a>
        </p>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: dark ? "16px 0 0" : "14px 4px 2px" }}>
          <p className="cp" style={{ margin: 0, color: dark ? "rgba(244,241,236,.72)" : undefined }}>{video.title}{video.duration ? ` · ${minutes(video.duration)}` : ""}</p>
          {video.credit && <p className="cp" style={{ margin: 0, color: dark ? "var(--on-dark-accent)" : "var(--clay-text)" }}>{video.credit}</p>}
        </div>
      )}
    </div>
  );
}
