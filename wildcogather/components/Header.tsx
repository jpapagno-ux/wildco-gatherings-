"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const on = () => setCompact(window.scrollY > 150 && window.innerWidth >= 768);
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);
  return (
    <header className={`site-header${compact ? " compact" : ""}`}>
      <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
        <p className="cas wordmark">Wild &amp; Co Gatherings</p>
        <p className="cp byline" style={{ margin: "8px 0 0", fontSize: 11 }}>By James Wild &amp; Co.</p>
      </Link>
      <nav aria-label="Main" className="cp site-nav">
        <Link href="/houses/lone-mountain-ranch">The Houses</Link>
        <Link href="/ledger">The Ledger</Link>
        <Link href="/vip">Gatherings VIP</Link>
        <Link href="/journal">The Journal</Link>
        <Link href="/plan" className="ox">Plan a Gathering</Link>
      </nav>
    </header>
  );
}
