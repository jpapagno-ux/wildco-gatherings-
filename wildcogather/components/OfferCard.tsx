import Link from "next/link";
import { OfferStamp } from "./Marks";
import { fmtDate, type Offer } from "@/lib/extras";

// "Time Rewarded" ticket on a stay's page: the offer on the left, a hand-drawn arrow
// pointing to the valid dates and what's included / not included on the right.
export default function OfferCard({ offer, house, houseName }: { offer: Offer; house: string; houseName: string }) {
  const draft = offer.status !== "Live" || !offer.confirmed;
  const dates = offer.validFrom && offer.validTo ? `${fmtDate(offer.validFrom)} – ${fmtDate(offer.validTo)}` : "Dates on request";
  return (
    <section className="wrap" id="offer" aria-label={`Offer: ${offer.name}`} style={{ paddingBottom: 90 }}>
      <div className="offer-grid">
        <div className="ticket">
          <div className="stub">
            <span>Time rewarded · {offer.kind}</span>
          </div>
          <div className="ticket-main">
            <div style={{ position: "absolute", right: -34, top: -64 }}><OfferStamp stay={offer.stayNights} pay={offer.payNights} size={150} /></div>
            {draft && <p className="cp" style={{ display: "inline-block", maxWidth: "calc(100% - 120px)", margin: "0 0 16px", padding: "3px 8px", border: "1px solid var(--rust)", color: "var(--rust)" }}>Sample offer · dates &amp; terms to confirm with the house</p>}
            <p className="eb">Time Rewarded · a verified offer</p>
            <h2 className="dsp" style={{ margin: "14px 0 0", fontSize: "clamp(32px, 3.3vw, 46px)", maxWidth: "88%" }}>{offer.headline}</h2>
            {offer.line && <p className="it" style={{ margin: "14px 0 0", fontSize: 23, lineHeight: 1.35 }}>{offer.line}</p>}
            <div className="ticket-row">
              <div><p className="cp muted" style={{ margin: 0 }}>Valid for stays</p><p className="mono" style={{ margin: "4px 0 0" }}>{dates}</p></div>
              {offer.bookBy && <div><p className="cp muted" style={{ margin: 0 }}>Book by</p><p className="mono" style={{ margin: "4px 0 0" }}>{fmtDate(offer.bookBy)}</p></div>}
              <div><p className="cp muted" style={{ margin: 0 }}>At</p><p className="mono" style={{ margin: "4px 0 0" }}>{houseName}</p></div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", marginTop: 26 }}>
              <Link href={`/plan?house=${house}&offer=${offer.slug}`} className="btn">Ask James for this offer</Link>
              <a href="#offer-terms" className="lnk">What&apos;s included <span>→</span></a>
            </div>
          </div>
        </div>

        <svg className="offer-arrow" width="120" height="70" viewBox="0 0 120 70" aria-hidden="true">
          <path d="M6 52 C 30 18, 70 8, 104 30" fill="none" stroke="var(--rust)" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="1 0" />
          <path d="M92 20 L106 31 L90 38" fill="none" stroke="var(--rust)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="6" y="68" fontFamily="var(--f-script), cursive" fontSize="20" fill="var(--body)" style={{ fontSizeAdjust: 0.3 } as React.CSSProperties}>the fine print</text>
        </svg>

        <div id="offer-terms" className="card" style={{ padding: "28px 30px", scrollMarginTop: 140 }}>
          <p className="lbl" style={{ paddingBottom: 12, borderBottom: "1px solid var(--charcoal)" }}>Valid dates</p>
          <dl style={{ margin: 0 }}>
            <div className="mf" style={{ gridTemplateColumns: "110px 1fr" }}><dt className="cp muted">Stays</dt><dd className="mono" style={{ margin: 0, fontSize: 12 }}>{dates}</dd></div>
            {offer.bookBy && <div className="mf" style={{ gridTemplateColumns: "110px 1fr" }}><dt className="cp muted">Book by</dt><dd className="mono" style={{ margin: 0, fontSize: 12 }}>{fmtDate(offer.bookBy)}</dd></div>}
            {offer.blackout && <div className="mf" style={{ gridTemplateColumns: "110px 1fr" }}><dt className="cp muted">Not valid</dt><dd className="mono" style={{ margin: 0, fontSize: 12 }}>{offer.blackout}</dd></div>}
            <div className="mf" style={{ gridTemplateColumns: "110px 1fr" }}><dt className="cp muted">Stay · pay</dt><dd className="mono" style={{ margin: 0, fontSize: 12 }}>{offer.stayNights} nights · {offer.payNights} nights</dd></div>
          </dl>
          <h3 className="lbl ox" style={{ margin: "24px 0 10px" }}>✓ Included</h3>
          <ul className="body" style={{ margin: 0, paddingLeft: 18, fontSize: 15, lineHeight: 1.6 }}>{offer.included.map((x) => <li key={x}>{x}</li>)}</ul>
          <h3 className="lbl" style={{ margin: "22px 0 10px" }}>✕ Not included</h3>
          <ul className="body" style={{ margin: 0, paddingLeft: 18, fontSize: 15, lineHeight: 1.6 }}>{offer.excluded.map((x) => <li key={x}>{x}</li>)}</ul>
          {offer.terms.length > 0 && <><h3 className="lbl" style={{ margin: "22px 0 10px" }}>Terms</h3><ul className="cp muted" style={{ margin: 0, paddingLeft: 16, textTransform: "none", letterSpacing: ".02em", fontSize: 11.5, lineHeight: 1.6 }}>{offer.terms.map((x) => <li key={x}>{x}</li>)}</ul></>}
        </div>
      </div>
    </section>
  );
}
