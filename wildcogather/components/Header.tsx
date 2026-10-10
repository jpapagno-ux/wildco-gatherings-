"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const stays = [
  { label: "USA & Mexico", href: "/destinations/usa-mexico" },
  { label: "Caribbean", href: "/destinations/caribbean" },
  { label: "Latin America", href: "/destinations/latin-america" },
  { label: "Europe", href: "/destinations/europe" },
  { label: "Asia", href: "/destinations/asia" },
  { label: "Oceania", href: "/destinations/oceania" },
];

export default function Header() {
  const [staysOpen, setStaysOpen] = useState(false);
  const staysRef = useRef<HTMLDivElement>(null);
  const staysButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    function closeOnOutsideClick(event: PointerEvent) {
      if (event.target instanceof Node && !staysRef.current?.contains(event.target)) {
        setStaysOpen(false);
      }
    }

    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  return (
    <header className="site-header">
      <div className="header-inner">
        <nav aria-label="Main navigation" className="site-nav site-nav-left cp">
          <Link href="/ledger" aria-current={pathname === "/ledger" ? "page" : undefined}>The Ledger</Link>
          <div
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
              data-current={pathname.startsWith("/destinations/")}
              className="nav-dropdown-trigger cp"
              onClick={() => setStaysOpen((open) => !open)}
            >
              Stays
            </button>
            <div id="stays-menu" className="nav-dropdown-menu" data-open={staysOpen}>
              {stays.map((item) => (
                <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <Link href="/" className="brand-lockup" aria-label="Wild & Co Gatherings home" aria-current={pathname === "/" ? "page" : undefined}>
          <span className="wordmark cas">Wild &amp; Co</span>
          <span className="wordmark wordmark-sub cp">Gatherings</span>
        </Link>

        <nav aria-label="Secondary navigation" className="site-nav site-nav-right cp">
          <Link href="/vip" aria-current={pathname === "/vip" || pathname.startsWith("/vip/") ? "page" : undefined}>Gatherings VIP</Link>
          <Link href="/journal" aria-current={pathname === "/journal" || pathname.startsWith("/journal/") ? "page" : undefined}>The Journal</Link>
          <Link href="/plan" className="cta-link" aria-current={pathname === "/plan" ? "page" : undefined}>
            Plan a Gathering
          </Link>
        </nav>
      </div>
    </header>
  );
}
