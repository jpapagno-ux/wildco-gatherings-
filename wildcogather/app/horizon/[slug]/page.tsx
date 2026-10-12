import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Photo from "@/components/Photo";
import BeFirst from "@/components/BeFirst";
import HorizonCard from "@/components/HorizonCard";
import { HorizonStamp, JwcoSeal, Icon } from "@/components/Marks";
import { getHorizon, getHorizonItem } from "@/lib/horizon";
import { getResidence } from "@/lib/data";
import { blocks, quotesOf } from "@/lib/journal";
import { SETTINGS } from "@/lib/settings";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export async function generateStaticParams() {
  return (await getHorizon()).map((h) => ({ slug: h.slug }));
}

const seoTitle = (h: { short: string; place: string; country: string }) => `${h.short}, ${h.country}: New for Families | On the Horizon`;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const h = await getHorizonItem((await params).slug);
  if (!h) return {};
  return {
    title: seoTitle(h), description: h.dek.slice(0, 158), alternates: { canonical: `/horizon/${h.slug}` },
    openGraph: { type: "article", title: h.name, description: h.dek, modifiedTime: h.updated },
    robots: h.draft ? { index: false } : undefined,
  };
}

const month = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric" });

export default async function HorizonPost({ params }: { params: Promise<{ slug: string }> }) {
  const h = await getHorizonItem((await params).slug);
  if (!h) notFound();
  const st = SETTINGS[h.setting];
  const url = `${SITE}/horizon/${h.slug}`;
  const all = await getHorizon();
  const pair = h.pairsWith ? all.find((x) => x.slug === h.pairsWith) : undefined;
  const pairHouse = h.pairsWith && !pair ? await getResidence(h.pairsWith) : undefined;
  // The "still to confirm" box below covers this, so drop a matching section from the body.
  const raw = blocks(h.body);
  const cut = raw.findIndex((b) => b.kind === "h2" && /still want to know|still to confirm/i.test(b.text));
  const body = cut >= 0 ? raw.filter((_, i) => i < cut || (i > cut + 1)) : raw;
  const others = all.filter((x) => x.slug !== h.slug && x.slug !== pair?.slug).slice(0, 2);

  return (
    <article>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BlogPosting", "@id": url, headline: h.name, description: h.dek,
        dateModified: h.updated, datePublished: h.updated, mainEntityOfPage: url,
        author: { "@type": "Person", name: "James Wild", jobTitle: "Founder, James Wild & Co" },
        publisher: { "@type": "Organization", name: "Wild & Co Gatherings" },
        about: { "@type": "Resort", name: h.name.split(" — ")[0], ...(h.official ? { url: h.official } : {}), address: { "@type": "PostalAddress", addressLocality: h.place, addressCountry: h.country } },
        hasPart: quotesOf(h.body).map((q) => ({ "@type": "Quotation", text: q.replace(/\s*\[Draft[^\]]*\]/, ""), creator: { "@type": "Person", name: "James Wild" } })),
        citation: h.sources.map((s) => ({ "@type": "CreativeWork", name: s.title, url: s.url })),
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".dek", ".hz-answer"] },
      }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: h.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "On the Horizon", item: `${SITE}/horizon` }, { "@type": "ListItem", position: 2, name: h.short, item: url }] }} />
      {h.draft && <div className="cp" style={{ background: "var(--oxblood)", color: "var(--paper)", textAlign: "center", padding: "10px 20px" }}>First look · not yet vetted · James&apos;s lines drafted for his approval</div>}

      <header className="wrap" style={{ maxWidth: 940, paddingTop: 70, paddingBottom: 40, textAlign: "center" }}>
        <nav aria-label="Breadcrumb" className="cp muted" style={{ fontSize: 11, marginBottom: 26 }}><Link href="/horizon" style={{ textDecoration: "none" }}>On the Horizon</Link> / {h.no} / {st.name}</nav>
        <p className="eb" style={{ margin: "0 0 18px" }}>{h.kicker}</p>
        <h1 className="ser" style={{ margin: 0, fontSize: "clamp(40px, 5.4vw, 70px)", lineHeight: 1.05, fontWeight: 400 }}>{h.name}</h1>
        <p className="it dek" style={{ margin: "26px auto 0", maxWidth: 700, fontSize: 26, lineHeight: 1.4 }}>{h.dek}</p>
        <p className="cp" style={{ margin: "26px 0 0", display: "inline-flex", alignItems: "center", gap: 8, color: st.ink }}><Icon name={h.setting} size={18} color={st.ink} /> {h.place} · {h.country} · facts checked {month(h.updated)}</p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 26 }}><HorizonStamp setting={h.setting} no={h.no} opens={h.opens} size={250} /></div>
      </header>

      {h.hero && <figure className="wrap" style={{ margin: "0 auto 50px" }}><Photo img={h.hero} priority aspect="16:9" style={{ height: "min(70vh, 600px)" }} /></figure>}

      <div className="wrap" style={{ maxWidth: 1100, display: "flex", flexWrap: "wrap", gap: 56, paddingBottom: 60 }}>
        <aside style={{ flex: "1 1 280px", maxWidth: 330 }}>
          <div className="box" style={{ padding: "26px 28px", position: "sticky", top: 120, background: st.stock }}>
            <p className="lbl" style={{ color: st.ink }}>What we know</p>
            <dl style={{ margin: 0, borderTop: `1px solid ${st.ink}` }}>
              {h.facts.map(([k, v]) => <div key={k} className="fact" style={{ gridTemplateColumns: "88px 1fr" }}><dt className="cp muted" style={{ fontSize: 10 }}>{k}</dt><dd className="cpn" style={{ margin: 0, fontSize: 14 }}>{v}</dd></div>)}
            </dl>
            <p className="lbl" style={{ margin: "24px 0 8px", color: st.ink }}>Good for</p>
            <p className="cpn" style={{ margin: 0, fontSize: 14 }}>{h.familyFit}</p>
            <p className="lbl" style={{ margin: "18px 0 8px", color: st.ink }}>Not for</p>
            <p className="cpn" style={{ margin: 0, fontSize: 14 }}>{h.notFor}</p>
            <Link href={`/plan?horizon=${h.slug}&house=${h.slug}`} className="btn" style={{ marginTop: 24, width: "100%", boxSizing: "border-box", padding: "0 14px", fontSize: 12 }}>Hold my interest</Link>
          </div>
        </aside>
        <div style={{ flex: "3 1 560px", minWidth: 0 }}>
          <figure style={{ margin: "0 0 40px", padding: "26px 0 26px 30px", borderLeft: `2px solid ${st.ink}` }}>
            <p className="eb" style={{ margin: "0 0 12px" }}>Why it's on James's list</p>
            <blockquote className="it" style={{ margin: 0, fontSize: 28, lineHeight: 1.35 }}>&ldquo;{h.why}&rdquo;</blockquote>
          </figure>
          {body.map((b, i) => {
            if (b.kind === "h2") return <h2 key={i} className="dsp" style={{ margin: "44px 0 14px", fontSize: 30 }}>{b.text}</h2>;
            if (b.kind === "quote") return (
              <figure key={i} style={{ margin: "36px 0", padding: "26px 0 26px 30px", borderLeft: "2px solid var(--rust)" }}>
                <blockquote className="it" style={{ margin: 0, fontSize: 28, lineHeight: 1.35 }}>&ldquo;{b.text}&rdquo;</blockquote>
                <figcaption className="sig" style={{ marginTop: 14, fontSize: 28 }}>— J. W.</figcaption>
              </figure>
            );
            if (b.kind === "list") return <ul key={i} className="body" style={{ margin: "0 0 22px", paddingLeft: 22 }}>{b.items.map((x) => <li key={x} style={{ marginBottom: 10 }}>{x}</li>)}</ul>;
            if (b.kind === "figure") return <figure key={i} style={{ margin: "36px 0" }}><Photo img={{ publicId: b.publicId, alt: b.caption }} sizes="(max-width: 800px) 100vw, 700px" aspect="5:3" style={{ height: 420 }} /><figcaption className="cp muted" style={{ marginTop: 10, fontSize: 11 }}>{b.caption}</figcaption></figure>;
            const prev = body[i - 1];
            return <p key={i} className={`body${prev?.kind === "h2" ? " hz-answer" : ""}`} style={{ margin: "0 0 22px" }}>{b.text}</p>;
          })}

          <div className="box" style={{ padding: "24px 28px", marginTop: 40 }}>
            <p className="lbl ox" style={{ margin: "0 0 10px" }}>Before it goes in the Ledger, we're confirming</p>
            <ul className="body" style={{ margin: 0, paddingLeft: 22, fontSize: 15 }}>{h.confirm.map((c) => <li key={c} style={{ marginBottom: 6 }}>{c}</li>)}</ul>
          </div>

          <section aria-label="Questions" style={{ marginTop: 50 }}>
            <p className="eb">Questions families ask</p>
            <hr className="eb-rule" />
            {h.faqs.map((f) => (
              <div key={f.q} style={{ borderTop: "1px solid rgba(44,42,39,.18)", padding: "20px 0" }}>
                <h2 className="ser" style={{ margin: 0, fontSize: 22, fontWeight: 500 }}>{f.q}</h2>
                <p className="body" style={{ margin: "8px 0 0", fontSize: 16 }}>{f.a}</p>
              </div>
            ))}
          </section>

          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 40 }}>
            <JwcoSeal size={84} rotate={-6} />
            <div>
              <p className="sig" style={{ margin: 0, fontSize: 38 }}>James Wild</p>
              <p className="cp muted" style={{ margin: "4px 0 0", fontSize: 11 }}>Founder, James Wild &amp; Co · on the list since {month(h.updated)}</p>
            </div>
          </div>
        </div>
      </div>

      <section className="navy" aria-label={`Be the first to hear about ${h.short}`}>
        <div className="wrap" style={{ paddingTop: 70, paddingBottom: 70, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))", gap: 44, alignItems: "center" }}>
          <div>
            <p className="eb">Be the first · {h.no}</p>
            <h2 className="dsp" style={{ margin: "14px 0 0", fontSize: "clamp(30px, 3.4vw, 44px)", color: "var(--on-dark)" }}>First dates at {h.short}</h2>
            <p className="body" style={{ margin: "14px 0 0", color: "rgba(244,241,236,.8)" }}>We'll write once — when the family details are confirmed and the first dates open.</p>
          </div>
          <BeFirst slug={h.slug} name={h.short} dark />
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 40 }} aria-label="More on the horizon">
        <p className="eb">{pair || pairHouse ? "Pairs well with" : "Also on the horizon"}</p>
        <hr className="eb-rule" />
        <div className="hz-grid" style={{ marginTop: 26 }}>
          {pair && <HorizonCard h={pair} />}
          {pairHouse && <Link href={`/houses/${pairHouse.slug}`} className="hz-card"><p className="cp" style={{ margin: 0 }}>Ledger Entry {pairHouse.entryNo}</p><h3 className="hz-name">{pairHouse.name}</h3><p className="hz-dek">{pairHouse.line}</p></Link>}
          {others.map((o) => <HorizonCard key={o.slug} h={o} />)}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 40, paddingBottom: 100, maxWidth: 1100 }} aria-label="Sources">
        <p className="lbl">Sources · facts checked {month(h.updated)}</p>
        <ul className="cpn" style={{ margin: "10px 0 0", paddingLeft: 20, fontSize: 14 }}>
          {h.sources.map((s) => <li key={s.url} style={{ marginBottom: 6 }}><a href={s.url} target="_blank" rel="noopener" className="lnk" style={{ borderBottomWidth: 1 }}>{s.title}</a></li>)}
          {h.official && <li><a href={h.official} target="_blank" rel="noopener" className="lnk" style={{ borderBottomWidth: 1 }}>Official site</a></li>}
        </ul>
      </section>
    </article>
  );
}
