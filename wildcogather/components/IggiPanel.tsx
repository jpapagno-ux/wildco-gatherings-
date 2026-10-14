"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IGGI } from "@/lib/ecosystem";
import { entityIdsOf, folioSummary } from "@/lib/folios";
import { useJourney } from "@/components/JourneyProvider";

// Iggi — the shared journey guide. No live Iggi service is connected yet, so this panel does NOT
// simulate a conversation. It introduces Iggi and lets the traveller prepare a question, with the
// page and Folio context attached, for the existing advisor enquiry flow. An advisor replies.
export type IggiContext = { label: string; href?: string; entityId?: string; ref?: string };

export default function IggiPanel({ open, ctx, onClose }: { open: boolean; ctx?: IggiContext; onClose: () => void }) {
  const { active } = useJourney();
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [withPage, setWithPage] = useState(true);
  const [withFolio, setWithFolio] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    setState("idle");
    const t = setTimeout(() => box.current?.querySelector<HTMLElement>("textarea, button")?.focus(), 30);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { clearTimeout(t); document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; (opener.current as HTMLElement | null)?.focus?.(); };
  }, [open, onClose]);

  if (!open) return null;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    setState("sending");
    const folio = withFolio && active && active.items.length ? active : undefined;
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestType: "Iggi question",
          name: d.name, email: d.email,
          iggi: d.question,
          house: withPage && ctx ? (ctx.href || ctx.label) : "",
          entityIds: [withPage && ctx ? [ctx.entityId, ctx.ref].filter(Boolean).join("/") : "", folio ? entityIdsOf(folio) : ""].filter(Boolean).join(", "),
          folioSummary: folio ? folioSummary(folio, window.location.origin) : "",
        }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="iggi-scrim" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div ref={box} className="iggi-panel" role="dialog" aria-modal="true" aria-labelledby="iggi-h" data-agent={IGGI.agentId}>
        <div className="iggi-head">
          <p className="eb">James Wild &amp; Co · Journey guide</p>
          <button type="button" className="iggi-x" onClick={onClose} aria-label="Close Iggi">Close</button>
        </div>
        <h2 id="iggi-h" className="dsp" style={{ margin: "14px 0 0", fontSize: 40 }}>Ask Iggi</h2>
        <p className="it" style={{ margin: "12px 0 0", fontSize: 21, lineHeight: 1.4 }}>{IGGI.intro}</p>
        <p className="iggi-note"><strong>Live conversation with Iggi is coming.</strong> For now, write your question here and an advisor at James Wild &amp; Co replies personally by email.</p>

        {state === "sent" ? (
          <div className="iggi-done" role="status">
            <p className="ser" style={{ fontSize: 26, margin: 0 }}>Your question is with an advisor.</p>
            <p className="body" style={{ margin: "8px 0 0", fontSize: 15 }}>We reply personally by email. Nothing has been booked or held.</p>
            <button type="button" className="btn btn-o" style={{ marginTop: 18 }} onClick={onClose}>Back to the page</button>
          </div>
        ) : (
          <form onSubmit={submit} className="iggi-form">
            <label className="lbl" htmlFor="iggi-q">Your question</label>
            <textarea id="iggi-q" name="question" required rows={4} placeholder="Which house works for three generations with a toddler and a grandparent who doesn't do stairs?" />
            {ctx && (
              <label className="iggi-chk"><input type="checkbox" checked={withPage} onChange={(e) => setWithPage(e.target.checked)} /> Include this page — {ctx.label}{ctx.ref ? ` · ${ctx.ref}` : ""}</label>
            )}
            {active && active.items.length > 0 ? (
              <label className="iggi-chk"><input type="checkbox" checked={withFolio} onChange={(e) => setWithFolio(e.target.checked)} /> Include my Folio “{active.name}” ({active.items.length} saved) — saved on this device</label>
            ) : (
              <p className="cp muted" style={{ margin: 0 }}>No Folio yet · <Link href="/folios" onClick={onClose}>Start one in My Folios</Link></p>
            )}
            <div className="iggi-row">
              <label className="lbl" htmlFor="iggi-name">Your name<input id="iggi-name" name="name" required autoComplete="name" /></label>
              <label className="lbl" htmlFor="iggi-email">Email<input id="iggi-email" name="email" type="email" required autoComplete="email" /></label>
            </div>
            <p className="cp muted" style={{ margin: 0 }}>Please don&apos;t include passport, payment or other sensitive details. See our <Link href="/privacy" onClick={onClose}>Privacy Policy</Link>.</p>
            <div><button type="submit" className="btn" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send to an advisor"}</button></div>
            {state === "error" && <p className="cpn ox" role="alert" style={{ margin: 0 }}>Your question didn&apos;t send. Please try again, or use <Link href="/plan" onClick={onClose}>Plan a Gathering</Link>.</p>}
          </form>
        )}
      </div>
    </div>
  );
}
