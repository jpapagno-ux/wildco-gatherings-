"use client";

// The Monwana opening: a sixty-second, silent chapter from James and Miriam's
// travel ledger (book → globe → map → arrival → Monwana page → James's note).
// The animation lives as a self-contained page in /public/monwana-opening and is
// framed here, same-origin, so it can never restyle the house page around it.
// Its own controls (replay, pause/resume, skip, James's note) sit inside the frame.
// Skip / Continue fold it away and hand focus to the house page; a slim
// "Replay" line stays behind so the chapter is always one click from returning.

import { useEffect, useRef, useState } from "react";

type Props = { contentId?: string; onComplete?: () => void; entryNo?: string };

export default function MonwanaOpening({ contentId = "monwana-content", onComplete, entryNo }: Props) {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(760);
  const [dismissed, setDismissed] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.source !== frame.current?.contentWindow ||
          event.origin !== window.location.origin ||
          event.data?.source !== "monwana-opening") return;
      if (event.data.type === "monwana:height") {
        const value = Number(event.data.height);
        if (Number.isFinite(value)) setHeight(Math.max(500, Math.min(1600, value)));
      }
      if (event.data.type === "monwana:complete") onComplete?.();
      if (["monwana:skip", "monwana:continue"].includes(event.data.type)) {
        setDismissed(true);
        requestAnimationFrame(() => {
          const content = document.getElementById(contentId);
          if (!content) return;
          if (!content.hasAttribute("tabindex")) content.setAttribute("tabindex", "-1");
          content.focus({ preventScroll: true });
          content.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
            block: "start",
          });
        });
      }
    }
    window.addEventListener("message", receive);
    return () => window.removeEventListener("message", receive);
  }, [contentId, onComplete]);

  if (dismissed) {
    return (
      <div className="wrap" style={{ paddingTop: 22, paddingBottom: 4, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", borderBottom: "1px solid var(--rule, rgba(60,50,40,.18))" }}>
        <p className="cp muted" style={{ margin: 0 }}>A chapter from the ledger{entryNo ? ` · Entry ${entryNo}` : ""}</p>
        <button type="button" className="lnk" onClick={() => { setRun((n) => n + 1); setDismissed(false); }}
          style={{ background: "none", border: 0, padding: "10px 0", cursor: "pointer", font: "inherit" }}>
          Replay the Monwana chapter <span aria-hidden="true">›</span>
        </button>
      </div>
    );
  }

  return (
    <section aria-label="Monwana travel ledger opening" className="monwana-opening" style={{ paddingTop: "clamp(40px, 6vw, 80px)" }}>
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "end", gap: 16, flexWrap: "wrap", marginBottom: 18 }}>
        <div>
          <p className="eb">A chapter from the ledger{entryNo ? ` · Entry ${entryNo}` : ""}</p>
          <h2 className="dsp" style={{ margin: "14px 0 0", fontSize: "clamp(30px, 3.6vw, 46px)" }}>How we found Monwana</h2>
        </div>
        <p className="cp muted" style={{ margin: 0, maxWidth: 360 }}>About a minute, silent. Pause, replay or skip from the controls in the frame.</p>
      </div>
      <div className="wrap">
        <iframe
          key={run}
          ref={frame}
          title="Monwana: a chapter from James and Miriam’s travel ledger"
          src="/monwana-opening/index.html"
          style={{ display: "block", width: "100%", height, border: 0 }}
          loading="eager"
        />
      </div>
    </section>
  );
}
