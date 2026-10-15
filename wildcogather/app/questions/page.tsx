import type { Metadata } from "next";
import Link from "next/link";
import { fit } from "@/lib/seo";
import { SITE } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import PageSketch from "@/components/PageSketch";
import AskIggiButton from "@/components/AskIggiButton";
import { getResidences } from "@/lib/data";
import { HOME_FAQS, BOOKING_FAQS, ADVISOR_FAQS, uniqueQA, type QA } from "@/lib/faqs";
import { FOUNDER_FAQS } from "@/lib/founder";

export const revalidate = 3600;

export const metadata: Metadata = fit({
  title: "Family Travel Questions, Answered | Wild & Co Gatherings",
  description: "Straight answers on multigenerational trips: resort residences vs villas, how James Wild vets each house, deposits and cancellation, working with an advisor, and house-by-house details.",
  alternates: { canonical: "/questions" },
});

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default async function Questions() {
  const houses = (await getResidences()).filter((h) => h.faqs.length);
  // Each question appears once; the first group that asks it keeps it.
  const groups: { id: string; title: string; items: QA[] }[] = [];
  const seen: QA[][] = [];
  for (const [id, title, list] of [
    ["planning", "Planning a multigenerational gathering", HOME_FAQS],
    ["booking", "Booking, deposits and cancellation", BOOKING_FAQS],
    ["vetting", "James Wild and how houses are vetted", FOUNDER_FAQS.map((f) => ({ q: f.q, a: f.a }))],
    ["advisors", "For travel advisors", ADVISOR_FAQS],
  ] as [string, string, QA[]][]) {
    const items = uniqueQA(...seen, list).slice(seen.flat().length);
    seen.push(items);
    if (items.length) groups.push({ id, title, items });
  }
  const general = groups.flatMap((g) => g.items);

  return (
    <>
      {/* Only the general questions are marked up here; each house's questions are marked up on its own page. */}
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", url: `${SITE}/questions`, mainEntity: general.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 30 }}>
        <p className="eb">Gatherings · {general.length + houses.reduce((n, h) => n + h.faqs.length, 0)} questions</p>
        <hr className="eb-rule" />
        <h1 className="dsp" style={{ margin: "24px 0 0", fontSize: "clamp(40px, 5.4vw, 72px)" }}>Questions families ask</h1>
        <p className="it" style={{ margin: "16px 0 0", fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.35, maxWidth: 780 }}>Straight answers, in one place. If yours isn&apos;t here, ask Iggi and an advisor will reply.</p>
        <nav aria-label="Topics" className="lg-toc" style={{ marginTop: 34 }}>
          <p className="lbl" style={{ margin: 0 }}>Topics</p>
          <ol>
            {groups.map((g) => <li key={g.id}><a href={`#${g.id}`}>{g.title}</a></li>)}
            {houses.length > 0 && <li><a href="#houses">House by house</a></li>}
          </ol>
        </nav>
      </section>

      <div className="wrap" style={{ maxWidth: 960, paddingBottom: 40 }}>
        {groups.map((g) => (
          <section key={g.id} id={g.id} className="qa-group" aria-labelledby={`${g.id}-h`}>
            <h2 id={`${g.id}-h`} className="dsp qa-h">{g.title}</h2>
            {g.items.map((f) => (
              <details key={f.q} id={slug(f.q)} className="qa">
                <summary><h3 className="ser">{f.q}</h3></summary>
                <p className="body">{f.a}</p>
              </details>
            ))}
            {g.id === "booking" && <p className="cp" style={{ margin: "16px 0 0" }}><Link href="/how-it-works">How a gathering comes together, step by step →</Link></p>}
          </section>
        ))}

        {houses.length > 0 && (
          <section id="houses" className="qa-group" aria-labelledby="houses-h">
            <h2 id="houses-h" className="dsp qa-h">House by house</h2>
            {houses.map((h) => (
              <div key={h.slug} className="qa-house">
                <h3 className="lab"><Link href={`/houses/${h.slug}`}>{h.name}</Link> <span className="cp muted">· {h.entryNo}</span></h3>
                {h.faqs.map((f) => (
                  <details key={f.question} className="qa">
                    <summary><h4 className="ser">{f.question}</h4></summary>
                    <p className="body">{f.answer}</p>
                  </details>
                ))}
              </div>
            ))}
          </section>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", margin: "40px 0 50px" }}>
          <AskIggiButton className="btn" label="Ask Iggi" />
          <Link href="/plan" className="lnk">Plan Our Gathering <span>→</span></Link>
        </div>
      </div>
      <PageSketch k="route" label="Questions" />
    </>
  );
}
