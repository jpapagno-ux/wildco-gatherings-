import Link from "next/link";
import { JwcoSeal } from "./Marks";
import AskIggiButton from "./AskIggiButton";
import { MASTER_HOME_URL, VOLUMES } from "@/lib/ecosystem";
import { LEGAL, sellerOfTravelLine } from "@/lib/legal";

export default function Footer() {
  const sot = sellerOfTravelLine();
  return (
    <>
      <section className="navy" aria-label="Plan Our Gathering">
        <div className="wrap" style={{ paddingTop: 80, paddingBottom: 80, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48 }}>
          <JwcoSeal size={150} tone="light" rotate={-6} />
          <div style={{ flex: "1 1 380px" }}>
            <h2 className="dsp" style={{ margin: 0, fontSize: 42, color: "var(--on-dark)" }}>Plan Our Gathering</h2>
            <p className="it" style={{ margin: "12px 0 0", fontSize: 24, color: "var(--on-dark-accent)" }}>Every great family journey begins with a conversation.</p>
            <p className="body" style={{ margin: "8px 0 0", fontSize: 15, color: "rgba(242,238,231,.78)" }}>A conversation, not a booking funnel. Personal reply from James.</p>
          </div>
          <Link href="/plan" className="btn btn-light">Ask James</Link>
        </div>
      </section>
      <footer className="site-foot">
        <div className="wrap foot-grid">
          <div className="foot-brand">
            {MASTER_HOME_URL ? <a href={MASTER_HOME_URL} aria-label="James Wild & Co — the House"><JwcoSeal size={84} /></a> : <JwcoSeal size={84} />}
            <p className="wordmark-sm">Wild &amp; Co Gatherings</p>
            <p className="cp" style={{ margin: "6px 0 0", fontSize: 10 }}>By the House of James Wild &amp; Co</p>
            <p className="cp muted" style={{ margin: "14px 0 0", fontSize: 10 }}>JW&amp;Co. Ledger No. 1982 · Still going since 1982</p>
          </div>
          <nav aria-label="James Wild & Co volumes" className="foot-col">
            <p className="foot-h">The four volumes</p>
            {VOLUMES.map((v) => v.current ? (
              <Link key={v.key} href="/" aria-current="true">{v.label} · you are here</Link>
            ) : v.soon || !v.href ? (
              <span key={v.key} className="muted" aria-disabled="true">{v.label} · coming soon</span>
            ) : (
              <a key={v.key} href={v.href}>{v.label}</a>
            ))}
          </nav>
          <nav aria-label="Gatherings" className="foot-col">
            <p className="foot-h">Gatherings</p>
            <Link href="/houses">The Houses</Link>
            <Link href="/destinations">Destinations</Link>
            <Link href="/itineraries">Family Journeys</Link>
            <Link href="/vip">Gatherings VIP</Link>
            <Link href="/horizon">On the Horizon</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/webinars">Webinars</Link>
          </nav>
          <nav aria-label="The House" className="foot-col">
            <p className="foot-h">The House</p>
            <Link href="/ledger">The Ledger</Link>
            <Link href="/folios">My Folios</Link>
            <AskIggiButton label="Iggi" className="foot-btn" />
            <Link href="/how-it-works">How It Works</Link>
            <Link href="/questions">Questions</Link>
            <Link href="/founder">Our Story</Link>
            <Link href="/advisors">Advisors</Link>
            <Link href="/plan">Contact</Link>
          </nav>
        </div>
        <div className="wrap foot-legal">
          <nav aria-label="Legal">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Booking Conditions</Link>
            <Link href="/privacy-choices">Your Privacy Choices</Link>
          </nav>
          <div className="foot-reg">
            {LEGAL.iataLogo ? <img src={LEGAL.iataLogo} alt="IATA accredited agent" width={64} height={40} style={{ height: 40, width: "auto" }} /> : null}
            <p className="cp muted">
              Copyright © {LEGAL.copyrightYear} {LEGAL.legalName || "James Wild & Co"}. All rights reserved.
              {sot ? <><br />{sot}</> : null}
              {LEGAL.iataNo ? <><br />IATA No. {LEGAL.iataNo}</> : null}
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
