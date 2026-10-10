import Link from "next/link";
import { JwcoSeal } from "./Marks";

export default function Footer() {
  return (
    <>
      <section style={{ borderTop: "1px solid var(--sand)" }}>
        <div className="wrap" style={{ paddingTop: 80, paddingBottom: 80, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 40 }}>
          <div className="footer-brand">
            <JwcoSeal size={104} />
            <p className="cas" style={{ margin: 0, textTransform: "uppercase", lineHeight: 1.5 }}>Gather with<br />James Wild &amp; Company</p>
          </div>
          <p className="cas" style={{ margin: 0, fontSize: 18, lineHeight: 1.6, maxWidth: 360 }}>Every gathering is personally planned. Personal reply, no automation.</p>
          <Link href="/plan" className="btn">Plan a Gathering</Link>
        </div>
      </section>
      <footer style={{ borderTop: "1px solid var(--sand)" }}>
        <div className="wrap" style={{ paddingTop: 26, paddingBottom: 30, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 14, textDecoration: "none" }}>
            <JwcoSeal size={64} />
            <span className="cp" style={{ lineHeight: 1.6 }}>A house of<br />James Wild &amp; Co</span>
          </Link>
          <p className="cp" style={{ margin: 0 }}>Linger for the wandering mind.</p>
          <p className="cp" style={{ margin: 0 }}>JW&amp;Co. Gatherings Ledger No. 1982-G</p>
        </div>
      </footer>
    </>
  );
}
