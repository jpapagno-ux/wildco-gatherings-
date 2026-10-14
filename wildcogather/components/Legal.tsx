import Link from "next/link";
import { LEGAL } from "@/lib/legal";

/** A legal detail, or a visible "to confirm" marker while the page is a draft. */
export function Fill({ v, label }: { v?: string | null; label: string }) {
  return v ? <>{v}</> : <mark className="lg-fill">[to confirm: {label}]</mark>;
}

export function LegalShell({ eyebrow, title, intro, sections, children }: { eyebrow: string; title: string; intro: React.ReactNode; sections: [string, string][]; children: React.ReactNode }) {
  return (
    <article className="wrap lg">
      {!LEGAL.reviewed && (
        <p className="lg-draft" role="note"><strong>Draft — pending legal review.</strong> This page is a working draft and is not yet in force. Items marked “to confirm” are still being completed.</p>
      )}
      <p className="eb">{eyebrow}</p>
      <hr className="eb-rule" />
      <h1 className="dsp" style={{ margin: "22px 0 0", fontSize: "clamp(38px, 4.8vw, 60px)" }}>{title}</h1>
      <p className="cp muted" style={{ margin: "12px 0 0" }}>Effective <Fill v={LEGAL.effectiveDate} label="effective date" /> · {LEGAL.tradingAs}</p>
      <div className="lg-intro body">{intro}</div>
      <nav aria-label="On this page" className="lg-toc">
        <p className="lbl" style={{ margin: 0 }}>On this page</p>
        <ol>{sections.map(([id, t]) => <li key={id}><a href={`#${id}`}>{t}</a></li>)}</ol>
      </nav>
      <div className="lg-body">{children}</div>
      <p className="cp muted lg-foot">Questions about this page: <Fill v={LEGAL.email} label="contact email" /> · <Link href="/plan">Contact us</Link></p>
    </article>
  );
}
