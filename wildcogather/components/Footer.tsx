import Link from "next/link";
import { JwcoSeal } from "./Marks";

export default function Footer() {
  return (
    <>
      <section className="navy" aria-label="Plan a Gathering">
        <div className="wrap" style={{ paddingTop: 80, paddingBottom: 80, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48 }}>
          <JwcoSeal size={150} tone="light" rotate={-6} />
          <div style={{ flex: "1 1 380px" }}>
            <h2 className="dsp" style={{ margin: 0, fontSize: 42, color: "var(--on-dark)" }}>Plan a Gathering</h2>
            <p className="it" style={{ margin: "12px 0 0", fontSize: 24, color: "var(--on-dark-accent)" }}>Every great family journey begins with a conversation.</p>
            <p className="body" style={{ margin: "8px 0 0", fontSize: 15, color: "rgba(244,241,236,.75)" }}>A conversation, not a booking funnel. Personal reply from James.</p>
          </div>
          <Link href="/plan" className="btn btn-light">Ask James</Link>
        </div>
      </section>
      <footer style={{ borderTop: "1px solid var(--stone)" }}>
        <div className="wrap" style={{ paddingTop: 34, paddingBottom: 38, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, alignItems: "center" }}>
          <nav aria-label="Footer" className="cp" style={{ display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
            <Link href="/houses" style={{ textDecoration: "none" }}>The Houses</Link>
            <Link href="/itineraries" style={{ textDecoration: "none" }}>Itineraries</Link>
            <Link href="/horizon" style={{ textDecoration: "none" }}>On the Horizon</Link>
            <Link href="/advisors" style={{ textDecoration: "none" }}>For Advisors</Link>
            <Link href="/webinars" style={{ textDecoration: "none" }}>Webinars</Link>
            <Link href="/ledger" style={{ textDecoration: "none" }}>The Ledger</Link>
            <Link href="/vip" style={{ textDecoration: "none" }}>Gatherings VIP</Link>
            <Link href="/journal" style={{ textDecoration: "none" }}>The Journal</Link>
          </nav>
          <Link href="/" aria-label="James Wild & Co — home" style={{ justifySelf: "center", textAlign: "center", textDecoration: "none" }}>
            <JwcoSeal size={84} />
            <span className="cp" style={{ display: "block", marginTop: 8, fontSize: 10 }}>A house of James Wild &amp; Co.</span>
          </Link>
          <p className="cp" style={{ margin: 0, textAlign: "right" }}>JW&amp;Co. Ledger No. 1982 · Still going since 1982</p>
        </div>
      </footer>
    </>
  );
}
