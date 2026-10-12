"use client";

import Link from "next/link";
import { destinations } from "@/lib/destinations";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <nav aria-label="Main navigation" className="site-nav site-nav-left cp">
          <Link href="/ledger">The Ledger</Link>
          <details className="nav-dropdown" onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.currentTarget.open = false;
              event.currentTarget.querySelector("summary")?.focus();
            }
          }}>
            <summary className="nav-dropdown-trigger cp">
              Stays
            </summary>
            <div className="nav-dropdown-menu">
              {destinations.map((item) => (
                <Link key={item.slug} href={`/destinations/${item.slug}`} onClick={(event) => event.currentTarget.closest("details")?.removeAttribute("open")}>
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </nav>

        <Link href="/" className="brand-lockup" aria-label="Wild & Co Gatherings home">
          <span className="wordmark cas">Wild &amp; Co</span>
          <span className="wordmark wordmark-sub cp">Gatherings</span>
        </Link>

        <nav aria-label="Secondary navigation" className="site-nav site-nav-right cp">
          <Link href="/vip">Gatherings VIP</Link>
          <Link href="/journal">The Journal</Link>
          <Link href="/plan" className="cta-link">
            Plan a Gathering
          </Link>
        </nav>
      </div>
    </header>
  );
}
