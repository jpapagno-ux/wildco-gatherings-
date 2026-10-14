import { fit } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { JwcoSeal, Stamp, Icon } from "@/components/Marks";
import { getResidences } from "@/lib/data";
import { FOUNDER, FOUNDER_PHOTOS, FOUNDER_LEDE, FOUNDER_BIO, FOUNDER_TIMELINE, GUIDING_PRINCIPLES, AFRICA_QUOTES, FOUNDER_FAQS, type FounderPhoto } from "@/lib/founder";
import PageSketch from "@/components/PageSketch";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = fit({
  title: "James Wild, Founder — 44 Years on the Road Since 1982 | Wild & Co Gatherings",
  description: "The founder story of James Wild: journey design since 1982, forty-four years of guiding family and friends from Eleuthera to the Okavango — and still going. In his words, on Africa and on vetting every house himself.",
  alternates: { canonical: FOUNDER.path },
  openGraph: {
    type: "profile",
    title: "James Wild — 44 years on the road, and still going",
    description: "Journey design since 1982. The founder of James Wild & Co on Africa, guiding others and vetting every house himself.",
    images: [{ url: FOUNDER_PHOTOS.sundowner.src, width: FOUNDER_PHOTOS.sundowner.w, height: FOUNDER_PHOTOS.sundowner.h, alt: FOUNDER_PHOTOS.sundowner.alt }],
  },
});

function Snap({ p, rotate = 0, height = 420, tape = "/kit/tape-kraft.png", priority = false }: { p: FounderPhoto; rotate?: number; height?: number; tape?: string; priority?: boolean }) {
  return (
    <figure className="polaroid" style={{ margin: 0, transform: `rotate(${rotate}deg)`, width: "100%" }}>
      <img className="tape" src={tape} alt="" aria-hidden="true" />
      <img src={p.src} alt={p.alt} width={p.w} height={p.h} loading={priority ? "eager" : "lazy"} decoding="async" style={{ width: "100%", height, objectFit: "cover", objectPosition: p.focus || "50% 50%", background: "var(--sand)" }} />
      <figcaption className="sig">{p.caption}</figcaption>
    </figure>
  );
}

export default async function Founder() {
  const houses = await getResidences();
  const url = `${SITE}${FOUNDER.path}`;
  const person = {
    "@type": "Person",
    "@id": `${url}#james-wild`,
    name: FOUNDER.name,
    jobTitle: FOUNDER.title,
    description: FOUNDER_LEDE,
    url,
    image: [FOUNDER_PHOTOS.tableMountain.src, FOUNDER_PHOTOS.sundowner.src, FOUNDER_PHOTOS.helicopter.src].map((s) => `${SITE}${s}`),
    worksFor: { "@type": "Organization", name: "James Wild & Co", foundingDate: String(FOUNDER.since) },
    knowsAbout: ["multigenerational family travel", "African safari", "Botswana safari", "South African safari", "malaria-free safari", "family reunion villas", "expedition travel", "Antarctic expeditions", "the Bahamas", "Eleuthera"],
    sameAs: ["https://www.youtube.com/@WildEarthStays1"],
  };

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", name: "James Wild — the founder story", url, dateModified: "2026-10-13", mainEntity: person, about: { "@id": `${url}#james-wild` } }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` }, { "@type": "ListItem", position: 2, name: "The founder", item: url }] }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FOUNDER_FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />

      {/* ── Hero ── */}
      <section className="wrap fd-hero" aria-labelledby="fd-h1">
        <div>
          <p className="eb">The founder · since {FOUNDER.since}</p>
          <hr className="eb-rule" />
          <h1 id="fd-h1" className="dsp" style={{ margin: "26px 0 0", fontSize: "clamp(42px, 5.6vw, 80px)" }}>Forty-four years on the road</h1>
          <p className="it" style={{ margin: "20px 0 0", fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.3 }}>…and still going.</p>
          <p className="body fd-answer" style={{ margin: "22px 0 0", maxWidth: 600 }}>{FOUNDER_LEDE}</p>
          <dl className="fd-facts">
            <div><dt>Since</dt><dd>{FOUNDER.since}</dd></div>
            <div><dt>Years on the road</dt><dd>{FOUNDER.years}</dd></div>
            <div><dt>Houses in the Ledger</dt><dd>{String(houses.length).padStart(2, "0")}</dd></div>
            <div><dt>First journey</dt><dd>Eleuthera</dd></div>
          </dl>
          <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 30 }}>
            <JwcoSeal size={110} rotate={-6} />
            <p className="sig" style={{ margin: 0, fontSize: 44, lineHeight: 1 }}>James Wild</p>
          </div>
        </div>
        <div style={{ maxWidth: 380, justifySelf: "center", width: "100%", paddingTop: 20 }}>
          <Snap p={FOUNDER_PHOTOS.tableMountain} rotate={2} height={520} tape="/kit/tape-cream.png" priority />
        </div>
      </section>

      {/* ── The story ── */}
      <section className="band" style={{ padding: "90px 0" }} aria-labelledby="fd-story">
        <div className="wrap fd-story">
          <div>
            <p className="eb">The story</p>
            <h2 id="fd-story" className="dsp" style={{ margin: "16px 0 30px", fontSize: "clamp(34px, 4vw, 52px)" }}>Go first. Then take the people you love.</h2>
            {FOUNDER_BIO.map((para, i) => (
              <p key={i} className={i === 0 ? "body fd-drop" : "body"} style={{ margin: "0 0 20px", maxWidth: 680, fontSize: 18, lineHeight: 1.7 }}>{para}</p>
            ))}
          </div>
          <aside className="fd-pull" aria-label="In James's words">
            <p className="it" style={{ margin: 0, fontSize: 28, lineHeight: 1.3 }}>“Every house in the Ledger is one I would send my own family to — or I say so.”</p>
            <p className="cp" style={{ margin: "14px 0 0" }}>— James Wild</p>
            <div style={{ marginTop: 34 }}><Stamp kind="Founder favorite" size={150} /></div>
          </aside>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 80 }} aria-labelledby="fd-road">
        <p className="eb">The road so far</p>
        <h2 id="fd-road" className="dsp" style={{ margin: "16px 0 40px", fontSize: "clamp(34px, 4vw, 52px)" }}>1982 to now</h2>
        <ol className="fd-line">
          {FOUNDER_TIMELINE.map((m) => (
            <li key={m.year + m.title}>
              <p className="fd-year">{m.year}</p>
              <div>
                <h3 className="ser" style={{ margin: 0, fontSize: 25, fontWeight: 500 }}>{m.title}</h3>
                <p className="body" style={{ margin: "6px 0 0", fontSize: 16 }}>{m.text}</p>
                {m.href && <Link href={m.href} className="lnk" style={{ marginTop: 10, display: "inline-block" }}>{m.href.startsWith("/houses") ? "See the house" : "Watch the episode"} <span>→</span></Link>}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ── On Africa ── */}
      <section className="navy" aria-labelledby="fd-africa">
        <div className="wrap" style={{ paddingTop: 90, paddingBottom: 90 }}>
          <p className="eb">On Africa · in his words</p>
          <h2 id="fd-africa" className="dsp" style={{ margin: "16px 0 44px", fontSize: "clamp(34px, 4vw, 52px)", color: "var(--on-dark)" }}>Never the same trip twice</h2>
          <div className="fd-africa">
            <div className="fd-quotes">
              {AFRICA_QUOTES.map((q) => (
                <blockquote key={q.text} className="fd-q">
                  <p className="ser">“{q.text}”</p>
                  <footer className="cp">— James Wild{q.place ? ` · ${q.place}` : ""}</footer>
                </blockquote>
              ))}
            </div>
            <div className="fd-snaps">
              <Snap p={FOUNDER_PHOTOS.sundowner} rotate={-2} height={430} />
              <Snap p={FOUNDER_PHOTOS.helicopter} rotate={2.5} height={360} tape="/kit/tape-cream.png" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Guiding others ── */}
      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 80 }} aria-labelledby="fd-guide">
        <p className="eb">Guiding others</p>
        <h2 id="fd-guide" className="dsp" style={{ margin: "16px 0 40px", fontSize: "clamp(34px, 4vw, 52px)" }}>How James guides a family</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 30 }}>
          {GUIDING_PRINCIPLES.map(([icon, t, d]) => (
            <div key={t} style={{ borderTop: "1px solid var(--charcoal)", paddingTop: 22 }}>
              <Icon name={icon} size={30} color="var(--rust)" />
              <h3 className="ser" style={{ margin: "14px 0 8px", fontSize: 26, fontWeight: 500 }}>{t}</h3>
              <p className="body" style={{ margin: 0, fontSize: 16 }}>{d}</p>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", marginTop: 44 }}>
          <Link href="/plan" className="btn">Let James guide you</Link>
          <Link href="/ledger" className="lnk">Open the Ledger <span>→</span></Link>
          <Link href="/journal/wild-together-monwana-thornybush" className="lnk">Watch Wild Together <span>→</span></Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="band" style={{ padding: "80px 0" }} aria-labelledby="fd-faq">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <p className="eb">About James Wild</p>
          <hr className="eb-rule" />
          <h2 id="fd-faq" className="sr-only">Questions about James Wild</h2>
          {FOUNDER_FAQS.map((f) => (
            <div key={f.q} style={{ borderTop: "1px solid rgba(44,42,39,.18)", padding: "22px 0" }}>
              <h3 className="ser" style={{ margin: 0, fontSize: 24, fontWeight: 500 }}>{f.q}</h3>
              <p className="body" style={{ margin: "10px 0 0" }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
      <PageSketch k={"savanna"} label="Africa, again and again" />
    </>
  );
}
