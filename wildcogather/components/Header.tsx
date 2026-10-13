"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { BrowseNav, NavGroup } from "@/lib/browse";

// Kept short on purpose: new stays go inside the "Stays" menu (by destination and setting), never as new top-level links.
const NAV: [string, string][] = [
  ["/itineraries", "Itineraries"],
  ["/vip", "Gatherings VIP"],
  ["/journal", "The Journal"],
  ["/founder", "Our Founder"],
  ["/advisors", "Advisors"],
];

const COLLECTIONS: [string, string][] = [
  ["/ledger", "The Gatherings Ledger"],
  ["/vip", "Gatherings VIP"],
  ["/horizon", "On the Horizon"],
];

export default function Header({ nav }: { nav: BrowseNav }) {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // phone menu
  const [staysOpen, setStaysOpen] = useState(false); // "Stays" mega-menu
  const headerRef = useRef<HTMLElement>(null);
  const staysButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
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
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setStaysOpen(false);
        setMenuOpen(false);
      }
    }
    document.addEventListener("pointerdown", closeOnOutsideClick);
    return () => document.removeEventListener("pointerdown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    setStaysOpen(false);
    setMenuOpen(false);
  }, [path]);

  const isCurrent = (href: string) => path === href || (href !== "/" && path.startsWith(`${href}/`));
  const staysCurrent = path === "/houses" || path.startsWith("/houses/") || path.startsWith("/destinations/");
  const item = (g: NavGroup) => (
    <li key={g.href}>
      <Link href={g.href} aria-current={path === g.href ? "page" : undefined}>
        <span>{g.label}</span>
        <span className="mega-count">{g.count ? g.count : "Soon"}</span>
      </Link>
    </li>
  );

  return (
    <header
      ref={headerRef}
      className={`site-header${compact ? " compact" : ""}`}
      onKeyDown={(event) => {
        if (event.key !== "Escape") return;
        if (staysOpen) { setStaysOpen(false); staysButtonRef.current?.focus(); }
        else if (menuOpen) { setMenuOpen(false); menuButtonRef.current?.focus(); }
      }}
    >
      <div className="wrap bar">
        <Link href="/" aria-label="James Wild & Co — home" style={{ justifySelf: "start" }}>
          <img className="seal" src="/brand/jwco-hare-240.png" width={58} height={58} alt="James Wild & Co. seal — Ledgered & Vetted, journey design since 1982" style={{ width: 58, height: 58 }} />
        </Link>
        <Link href="/" style={{ textDecoration: "none", textAlign: "center" }}>
          <p className="wordmark">Wild &amp; Co Gatherings</p>
          <p className="byline">By the House of James Wild &amp; Co.</p>
        </Link>
        <Link href="/plan" className="lab plan-link ox" style={{ justifySelf: "end", textDecoration: "none" }}>Plan a Gathering</Link>
        <button
          ref={menuButtonRef}
          type="button"
          className="menu-toggle cp"
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>
      <nav
        id="site-nav"
        aria-label="Main"
        className="site-nav"
        data-open={menuOpen}
        onClick={(event) => {
          // Same-page links (e.g. /houses#coast while on /houses) don't change the path, so close here too.
          if ((event.target as HTMLElement).closest("a")) { setStaysOpen(false); setMenuOpen(false); }
        }}
      >
        <div
          className="nav-dropdown"
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setStaysOpen(false);
          }}
        >
          <button
            ref={staysButtonRef}
            type="button"
            aria-expanded={staysOpen}
            aria-controls="stays-menu"
            data-current={staysCurrent}
            className="nav-dropdown-trigger"
            onClick={() => setStaysOpen((open) => !open)}
          >
            Stays <span aria-hidden="true" className="nav-caret">▾</span>
          </button>
          <div id="stays-menu" className="mega" data-open={staysOpen}>
            <div className="mega-col">
              <p className="mega-h" id="mega-destinations">Destinations</p>
              <ul aria-labelledby="mega-destinations">{nav.regions.map(item)}</ul>
            </div>
            {nav.settings.length > 0 && (
              <div className="mega-col">
                <p className="mega-h" id="mega-settings">By setting</p>
                <ul aria-labelledby="mega-settings">{nav.settings.map(item)}</ul>
              </div>
            )}
            <div className="mega-col">
              <p className="mega-h" id="mega-collections">Collections</p>
              <ul aria-labelledby="mega-collections">
                {item({ href: "/houses", label: "All stays", count: nav.total })}
                {COLLECTIONS.map(([href, label]) => (
                  <li key={href}><Link href={href} aria-current={path === href ? "page" : undefined}>{label}</Link></li>
                ))}
              </ul>
              <Link href="/plan" className="btn mega-cta">Plan a Gathering</Link>
            </div>
          </div>
        </div>
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} aria-current={path === href ? "page" : isCurrent(href) ? "true" : undefined}>{label}</Link>
        ))}
        <Link href="/plan" className="nav-plan" aria-current={path === "/plan" ? "page" : undefined}>Plan a Gathering</Link>
      </nav>
    </header>
  );
}
