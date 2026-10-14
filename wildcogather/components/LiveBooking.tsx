"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { engineLink, type LiveBooking as LB } from "@/lib/live-booking";

const iso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (s: string, n: number) => { const d = new Date(`${s}T12:00:00Z`); d.setUTCDate(d.getUTCDate() + n); return iso(d); };

// "Book this stay": the family's dates and party → the live engine (rates, cart and checkout run there).
// Alongside it, the two other ways in: ask us to design the whole gathering, or plan it with your own advisor.
export default function LiveBooking({ live, slug, name }: { live: LB; slug: string; name: string }) {
  const today = iso(new Date());
  const [checkIn, setIn] = useState(addDays(today, 60));
  const [checkOut, setOut] = useState(addDays(today, 63));
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const nights = Math.max(0, Math.round((Date.parse(checkOut) - Date.parse(checkIn)) / 86400000));
  const valid = nights > 0 && checkIn >= today;
  const href = useMemo(() => engineLink(live.engineUrl, { checkIn, checkOut, adults, children, rooms, currency: live.currency }), [live, checkIn, checkOut, adults, children, rooms]);
  const planHref = `/plan?house=${slug}&dates=${encodeURIComponent(`${checkIn} to ${checkOut}`)}`;

  return (
    <div className="lb">
      <div className="lb-book card">
        <p className="cp ox" style={{ margin: 0 }}>Live rates · book direct</p>
        <h3 className="ser lb-h">Book {name.split(",")[0]} for your dates</h3>
        <form className="lb-form" onSubmit={(e) => { e.preventDefault(); if (valid) window.open(href, "_blank", "noopener"); }}>
          <label className="lbl">Arrive<input type="date" value={checkIn} min={today} onChange={(e) => { setIn(e.target.value); if (e.target.value >= checkOut) setOut(addDays(e.target.value, 3)); }} required /></label>
          <label className="lbl">Depart<input type="date" value={checkOut} min={addDays(checkIn, 1)} onChange={(e) => setOut(e.target.value)} required /></label>
          <label className="lbl">Adults<input type="number" min={1} max={12} value={adults} onChange={(e) => setAdults(Math.max(1, Number(e.target.value) || 1))} /></label>
          <label className="lbl">Children<input type="number" min={0} max={8} value={children} onChange={(e) => setChildren(Math.max(0, Number(e.target.value) || 0))} /></label>
          <label className="lbl">Rooms<input type="number" min={1} max={6} value={rooms} onChange={(e) => setRooms(Math.max(1, Number(e.target.value) || 1))} /></label>
          <button type="submit" className="btn lb-go" disabled={!valid}>See live rates &amp; book{valid ? ` · ${nights} night${nights === 1 ? "" : "s"}` : ""}</button>
        </form>
        <p className="lb-note">Opens the James Wild Stays booking page in a new tab with your dates — live rates for every room, then cart and secure checkout. {live.taxNote}</p>
        <ul className="lb-plans">{live.ratePlans.map((p) => <li key={p}>{p}</li>)}</ul>
        <p className="lb-note">{live.termsNote}</p>
        <p className="cp muted" style={{ margin: "14px 0 0", fontSize: 10 }}>{live.provider} · details checked {live.checked}</p>
      </div>

      <div className="lb-key">
        <p className="cp ox" style={{ margin: 0 }}>The key to your James Wild &amp; Co journey</p>
        <p className="ser lb-keyh">Your stay here can be the whole trip — or the first chapter of it.</p>
        <ol className="lb-paths">
          <li><span className="mono ox">01</span><div><strong>Book direct</strong><p>Reserve the cottage or house yourself at today&apos;s live rate, above.</p></div></li>
          <li><span className="mono ox">02</span><div><strong>Ask us to design the gathering</strong><p>James and our team plan the rest — Cape Town, the safari, the transfers — around your dates and everyone coming.</p><Link href={planHref} className="lnk">Plan Our Gathering <span>→</span></Link></div></li>
          <li><span className="mono ox">03</span><div><strong>With your own travel advisor</strong><p>Prefer to work through your advisor? Every gathering is advisor-led; we work alongside them.</p><Link href="/advisors" className="lnk">For advisors <span>→</span></Link></div></li>
        </ol>
      </div>
    </div>
  );
}
