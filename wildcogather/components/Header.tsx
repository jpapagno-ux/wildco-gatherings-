"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import type { BrowseNav, NavGroup } from "@/lib/browse";
import { GATHERINGS_NAV, MASTER_HOME_URL, VOLUMES } from "@/lib/ecosystem";
import { useJourney } from "@/components/JourneyProvider";

// Two rows: the James Wild & Co ecosystem (four volumes, My Folios, Ask Iggi), then this volume's own
// navigation. New stays go inside "The Houses" menu (by destination and setting), never as new top-level links.
const NAV = GATHERINGS_NAV;

const COLLECTIONS: [string, string][] = [
  ["/ledger", "The Gatherings Ledger"],
  ["/vip", "Gatherings VIP"],
  ["/vip/more", "The MORE Villas"],
  ["/horizon", "On the Horizon"],
];

export default function Header({ nav }: { nav: BrowseNav }) {
  const { folios, openIggi } = useJourney();
  const saved = folios.reduce((n, f) => n + f.items.length, 0);
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
  const staysCurrent = path === "/houses" || path.startsWith("/houses/");
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
      <div className="eco-bar">
        <div className="wrap eco-in">
          {MASTER_HOME_URL
            ? <a href={MASTER_HOME_URL} className="eco-house">James Wild &amp; Co</a>
            : <span className="eco-house">James Wild &amp; Co</span>}
          <nav aria-label="James Wild & Co volumes" className="eco-vols">
            {VOLUMES.map((v) => v.current ? (
              <Link key={v.key} href="/" aria-current="true" className="eco-vol on">{v.label}</Link>
            ) : !v.soon && !v.href ? (
              <span key={v.key} className="eco-vol" aria-disabled="true">{v.label}</span>
            ) : v.soon || !v.href ? (
              <span key={v.key} className="eco-vol soon" aria-disabled="true" title={`${v.label} — coming soon`}>{v.label}<span className="eco-soon">Coming soon</span></span>
            ) : (
              <a key={v.key} href={v.href} className="eco-vol" title={v.note || `Wild & Co ${v.label}`}>{v.label}</a>
            ))}
          </nav>
          <div className="eco-tools">
            <Link href="/folios" className="eco-tool" aria-current={path === "/folios" ? "page" : undefined}>My Folios{saved > 0 && <span className="eco-count" aria-label={`${saved} saved`}>{saved}</span>}</Link>
            <button type="button" className="eco-tool eco-iggi" onClick={() => openIggi()}>Ask Iggi</button>
          </div>
        </div>
      </div>
      <div className="wrap bar">
        {MASTER_HOME_URL ? (
          <a href={MASTER_HOME_URL} aria-label="James Wild & Co — the House" style={{ justifySelf: "start" }}>
            <img className="seal" src="/brand/jwco-hare-240.png" width={58} height={58} alt="James Wild & Co. seal — Ledgered & Vetted, journey design since 1982" style={{ width: 58, height: 58 }} />
          </a>
        ) : (
          <span style={{ justifySelf: "start" }}>
            <img className="seal" src="/brand/jwco-hare-240.png" width={58} height={58} alt="James Wild & Co. seal — Ledgered & Vetted, journey design since 1982" style={{ width: 58, height: 58 }} />
          </span>
        )}
        <Link href="/" style={{ textDecoration: "none", textAlign: "center" }} aria-label="Wild & Co Gatherings — home">
          <p className="wordmark">Wild &amp; Co Gatherings</p>
          <p className="byline">By the House of James Wild &amp; Co</p>
        </Link>
        <Link href="/plan" className="lab plan-link ox" style={{ justifySelf: "end", textDecoration: "none" }}>Plan Our Gathering</Link>
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
        aria-label="Wild & Co Gatherings"
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
            The Houses <span aria-hidden="true" className="nav-caret">▾</span>
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
                {item({ href: "/houses", label: "All houses", count: nav.total })}
                <li><Link href="/destinations" aria-current={path === "/destinations" ? "page" : undefined}>All destinations</Link></li>
                {COLLECTIONS.map(([href, label]) => (
                  <li key={href}><Link href={href} aria-current={path === href ? "page" : undefined}>{label}</Link></li>
                ))}
              </ul>
              <Link href="/plan" className="btn mega-cta">Plan Our Gathering</Link>
            </div>
          </div>
        </div>
        {NAV.map(([href, label]) => (
          <Link key={href} href={href} aria-current={path === href ? "page" : isCurrent(href) ? "true" : undefined}>{label}</Link>
        ))}
        <Link href="/plan" className="nav-plan" aria-current={path === "/plan" ? "page" : undefined}>Plan Our Gathering</Link>
        {/* Phones: the ecosystem bar folds into the menu so the hero starts higher on the screen. */}
        <div className="nav-eco">
          <div className="nav-eco-tools">
            <Link href="/folios">My Folios{saved > 0 ? ` · ${saved}` : ""}</Link>
            <button type="button" onClick={() => { setMenuOpen(false); openIggi(); }}>Ask Iggi</button>
          </div>
          <p className="mega-h">James Wild &amp; Co</p>
          <div className="nav-eco-vols">
            {VOLUMES.map((v) => v.current ? (
              <Link key={v.key} href="/" aria-current="true">{v.label}</Link>
            ) : !v.soon && !v.href ? (
              <span key={v.key} className="eco-vol" aria-disabled="true">{v.label}</span>
            ) : v.soon || !v.href ? (
              <span key={v.key} aria-disabled="true">{v.label} · soon</span>
            ) : (
              <a key={v.key} href={v.href}>{v.label}</a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
