"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { REGIONS } from "@/lib/regions";

const NAV: [string, string][] = [
  ["/houses", "Stays"],
  ["/itineraries", "Itineraries"],
  ["/horizon", "On the Horizon"],
  ["/ledger", "The Ledger"],
  ["/vip", "Gatherings VIP"],
  ["/journal", "The Journal"],
  ["/advisors", "Advisors"],
];

export default function Header() {
  const [compact, setCompact] = useState(false);
  const [staysOpen, setStaysOpen] = useState(false);
  const staysRef = useRef<HTMLSpanElement>(null);
  const staysButtonRef = useRef<HTMLButtonElement>(null);
  const path = usePathname() || "/";

  useEffect(() => {
    const on = () => setCompact(window.scrollY > 150 && window.innerWidth >= 768);
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => { window.removeEventListener("scroll", on); window.removeEventListener("resize", on); };
  }, []);

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !staysRef.current?.contains(event.target)) {
        setStaysOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    setStaysOpen(false);
  }, [path]);

  return (
    <header className={`site-header${compact ? " compact" : ""}`}>
      <div className="wrap bar">
        <Link href="/" aria-label="James Wild & Co — home" style={{ justifySelf: "start" }}>
          <img className="seal" src="/brand/jwco-hare-240.png" width={58} height={58} alt="James Wild & Co. seal — Ledgered & Vetted, journey design since 1982" style={{ width: 58, height: 58 }} />
        </Link>
        <Link href="/" style={{ textDecoration: "none", textAlign: "center" }}>
          <p className="wordmark">Wild &amp; Co Gatherings</p>
          <p className="byline">By the House of James Wild &amp; Co.</p>
        </Link>
        <Link href="/plan" className="lab plan-link ox" style={{ justifySelf: "end", textDecoration: "none" }}>Plan a Gathering</Link>
      </div>
      <nav aria-label="Main" className="site-nav">
        {NAV.map(([href, label]) => {
          const current = path === href || (href !== "/" && path.startsWith(href)) || (href === "/houses" && path.startsWith("/destinations"));
          return href === "/houses" ? (
            <span
              key={href}
              className="nav-dropdown"
              ref={staysRef}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setStaysOpen(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setStaysOpen(false);
                  staysButtonRef.current?.focus();
                }
              }}
            >
              <button
                ref={staysButtonRef}
                type="button"
                aria-expanded={staysOpen}
                aria-controls="stays-menu"
                data-current={current}
                className="nav-dropdown-trigger cp"
                onClick={() => setStaysOpen((open) => !open)}
              >
                {label}
              </button>
              <span id="stays-menu" className="nav-dropdown-menu" data-open={staysOpen}>
                <Link href="/houses" aria-current={path === "/houses" ? "page" : undefined}>All houses</Link>
                {REGIONS.map((r) => <Link key={r.key} href={`/destinations/${r.key}`} aria-current={path === `/destinations/${r.key}` ? "page" : undefined}>{r.label}</Link>)}
              </span>
            </span>
          ) : <Link key={href} href={href} aria-current={current ? "page" : undefined}>{label}</Link>;
        })}
      </nav>
    </header>
  );
}
