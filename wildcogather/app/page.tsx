import { HOME_FAQS } from "@/lib/faqs";
import type { Metadata } from "next";
import { fit } from "@/lib/seo";
import Link from "next/link";
import Photo from "@/components/Photo";
import Film from "@/components/Film";
import JsonLd from "@/components/JsonLd";
import { Icon } from "@/components/Marks";
import { SETTINGS, SETTING_ORDER } from "@/lib/settings";
import { getResidences } from "@/lib/data";
import { BOOKING } from "@/lib/legal";
import { getPostForHouse } from "@/lib/journal";
import { getHorizon } from "@/lib/horizon";
import HorizonCard from "@/components/HorizonCard";
import { getItineraries } from "@/lib/extras";
import { entityForHouse } from "@/lib/entities";
import { FOUNDER_PHOTOS, FOUNDER_LEDE, AFRICA_QUOTES } from "@/lib/founder";
import PageSketch from "@/components/PageSketch";
import { HOME_HERO } from "@/lib/hero-library";

export const revalidate = 3600;
export const metadata: Metadata = fit({
  title: "Multigenerational Family Resort Residences | Wild & Co Gatherings",
  description: "Resort residences and family journeys for every generation, chosen by James Wild after forty-four years on the road. A house of James Wild & Co.",
  alternates: { canonical: "/" },
});

const FORMULA: [string, string][] = [
  ["Room to gather", "One table for all of you, a door to close for each branch."],
  ["A day for every age", "Programs for children, real adventure for teens, an easy pace for elders."],
  ["Water within reach", "A water setting nearby — a river, coast, lake or pool. Swimming and boat days only where the house's notes say so; a wildlife waterhole is for watching."],
  ["Country at the door", "Land to step straight into, with guides who live there."],
  ["A resort behind you", "Someone else runs the house — the kitchen, housekeeping or a team, as each house records it."],
  ["Worth returning to", "The start of a family tradition, not a single trip."],
];

const FAQS = HOME_FAQS;

export default async function Home() {
  const all = await getResidences();
  const featured = all.find((r) => r.featured);
  const featuredPost = featured ? await getPostForHouse(featured.slug) : undefined;
  const horizon = (await getHorizon()).slice(0, 3);
  const settings = SETTING_ORDER.map((k) => ({ s: SETTINGS[k], rows: all.filter((r) => r.setting === k) })).filter((g) => g.rows.length);
  // "Build Your Journey": real links only — a house, the journeys recorded for it, and the other houses those journeys use.
  const trips = (await getItineraries()).filter((t) => !t.draft);
  const bySlug = new Map(all.map((h) => [h.slug, h]));
  const journeys = trips.map((t) => {
    const stops = [t.house, ...(t.stops || []).map((x) => x.house)].filter((v, i, a) => v && a.indexOf(v) === i).map((x) => bySlug.get(x)).filter(Boolean) as typeof all;
    return { t, stops };
  }).filter((j) => j.stops.length).sort((a, b) => b.stops.length - a.stops.length).slice(0, 3);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />

      <section className="hero" aria-label="Wild & Co Gatherings">
        <Photo img={HOME_HERO} priority style={{ position: "absolute", inset: 0 }} />
        <div className="shade shade-strong" />
        <div className="ledger-col">
          <div><p className="k">Journey design</p><p className="v">Since 1982</p></div>
          <div><p className="k">Houses</p><p className="v">{String(all.length).padStart(2, "0")}</p></div>
          <div><p className="k">Settings</p><p className="v">{String(settings.length).padStart(2, "0")}</p></div>
          <div><p className="k">Family journeys</p><p className="v">{String(trips.length).padStart(2, "0")}</p></div>
          <div><p className="k">Vetted by</p><p className="v">James Wild</p></div>
        </div>
        <div className="title">
          <p className="eb" style={{ color: "#F0D9C6" }}>Curated from experience</p>
          <h1 className="dsp" style={{ margin: "18px 0 0", fontSize: "clamp(48px, 7vw, 96px)", color: "var(--on-dark)" }}>One House.<br />Every Generation.</h1>
          <p className="ser" style={{ margin: "18px 0 26px", fontStyle: "italic", fontSize: "clamp(20px, 2.2vw, 27px)", maxWidth: 760, lineHeight: 1.35 }}>Resort residences and journeys for families traveling across generations. Find your house, explore what surrounds it, and bring your plans together in My Folios.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
            <Link href="/houses" className="btn">Explore the Houses</Link>
            <Link href="/plan" className="btn btn-light">Plan Our Gathering</Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "100px 0" }} aria-label="Find your setting">
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="eb">{settings.length} settings · {all.length} houses</p>
          <h2 className="dsp" style={{ margin: "16px 0 0", fontSize: "clamp(36px, 4vw, 50px)" }}>The house is where you gather</h2>
          <p className="it" style={{ margin: "14px auto 0", fontSize: 24, maxWidth: 720 }}>What lies beyond it is the reason. Find your setting.</p>
          <p className="body" style={{ margin: "16px auto 50px", maxWidth: 640 }}>A room for every branch, a table for all of you, and days planned so the youngest and the eldest both come home with a story — each house chosen by James Wild.</p>
          <div className="house-grid">
            {settings.map(({ s, rows }) => {
              const img = rows[0].images.find((i) => i.role === "Hero") || rows[0].images[0];
              return (
                <Link key={s.key} href={`/houses#${s.key}`} className="house-card">
                  <Photo img={img} hint={s.name} sizes="(max-width: 700px) 100vw, 380px" aspect="6:5" style={{ height: 320 }} />
                  <h3 className="lab" style={{ margin: "22px 0 0", letterSpacing: ".3em", display: "inline-flex", alignItems: "center", gap: 10 }}><Icon name={s.key} size={22} color={s.ink} />{s.name}</h3>
                  <hr style={{ width: 30, height: 1, border: 0, background: s.ink, margin: "12px auto" }} />
                  <p className="cp muted" style={{ margin: 0 }}>{rows.length} {rows.length === 1 ? "house" : "houses"} · {s.sub}</p>
                </Link>
              );
            })}
          </div>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 18, marginTop: 44 }}>
            <Link href="/houses" className="btn">All {all.length} houses</Link>
            <Link href="/ledger" className="lnk">Or read the Ledger <span>→</span></Link>
          </div>
        </div>
      </section>

      {featured && (
        <section className="navy" aria-label={`Featured house: ${featured.name}`}>
          <div className="wrap" style={{ paddingTop: 90, paddingBottom: 90, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 56, alignItems: "center" }}>
            {featured.videos[0] || featuredPost?.video ? <Film video={(featured.videos[0] || featuredPost?.video)!} dark /> : <Photo img={featured.images.find((i) => i.role === "Hero") || featured.images[0]} sizes="(max-width: 900px) 100vw, 560px" aspect="5:4" style={{ height: 440 }} />}
            <div>
              <p className="eb">Featured house · {featuredPost?.video || featuredPost?.videoPlanned ? "Wild Together" : "From the Ledger"}</p>
              <h2 className="dsp" style={{ margin: "16px 0 0", fontSize: "clamp(36px, 4vw, 54px)", color: "var(--on-dark)" }}>{featured.name}</h2>
              <p className="cp" style={{ margin: "12px 0 0", color: "rgba(244,241,236,.7)" }}>{featured.place} · {featured.region}, {featured.country} · Entry {featured.entryNo}</p>
              <p className="it" style={{ margin: "20px 0 0", fontSize: 24, lineHeight: 1.35, color: "var(--on-dark-accent)" }}>{featured.line}</p>
              {featuredPost && <p className="body" style={{ margin: "16px 0 0", color: "rgba(244,241,236,.8)" }}>{featuredPost.dek}</p>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", marginTop: 28 }}>
                <Link href={`/houses/${featured.slug}`} className="btn btn-light">See the house</Link>
                {featuredPost && <Link href={`/journal/${featuredPost.slug}`} className="lnk" style={{ color: "var(--on-dark)", borderColor: "var(--on-dark)" }}>{featuredPost.video || featuredPost.videoPlanned ? "Watch the episode" : "Read the story"} <span>→</span></Link>}
              </div>
            </div>
          </div>
        </section>
      )}

      {journeys.length > 0 && (
        <section className="wrap" style={{ paddingTop: 100 }} aria-labelledby="byj-h">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 16, marginBottom: 30 }}>
            <div>
              <p className="eb">From house to journey to Folio</p>
              <h2 id="byj-h" className="dsp" style={{ margin: "14px 0 0", fontSize: "clamp(34px, 4vw, 48px)" }}>Build your journey</h2>
              <p className="it" style={{ margin: "12px 0 0", fontSize: 22 }}>Start with a house, follow the journeys it anchors, and keep the pieces together in My Folios.</p>
            </div>
            <Link href="/itineraries" className="lnk">All family journeys <span>→</span></Link>
          </div>
          <div className="byj">
            {journeys.map(({ t, stops }) => {
              const first = stops[0];
              const others = stops.slice(1);
              return (
                <article key={t.slug} className="byj-card">
                  <div className="byj-step"><span className="cp">The house</span><Link href={`/houses/${first.slug}`}>{first.name} <span className="cp muted" style={{ fontSize: 10 }}>· {first.entryNo}</span></Link></div>
                  <div className="byj-step"><span className="cp">The journey</span><Link href={`/itineraries/${t.slug}`}>{t.title} <span className="cp muted" style={{ fontSize: 10 }}>· {t.days} days</span></Link></div>
                  {others.length > 0 && <div className="byj-step"><span className="cp">Also</span><span style={{ display: "grid", gap: 4 }}>{others.map((h) => <Link key={h.slug} href={`/houses/${h.slug}`}>{h.name} <span className="cp muted" style={{ fontSize: 10 }}>· {h.entryNo}</span></Link>)}</span></div>}
                  <div className="byj-step"><span className="cp">Your Folio</span><Link href="/folios">Save the pieces to My Folios</Link></div>
                  {entityForHouse(first.slug) && <p className="cp muted" style={{ margin: 0, fontSize: 10 }}>{entityForHouse(first.slug)!.id}</p>}
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section className="band" style={{ padding: "90px 0" }} aria-labelledby="home-how">
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 16 }}>
            <div>
              <p className="eb">How it works</p>
              <h2 id="home-how" className="dsp" style={{ margin: "14px 0 0", fontSize: "clamp(34px, 4vw, 48px)" }}>A conversation, then a plan</h2>
            </div>
            <Link href="/how-it-works" className="lnk">How a gathering comes together <span>→</span></Link>
          </div>
          <ol className="home-how">
            <li><span className="mono ox">01</span><p className="ser">Tell us who&apos;s coming</p><p className="body">Ages, dates, the occasion. No payment, no commitment.</p></li>
            <li><span className="mono ox">02</span><p className="ser">We shape the plan</p><p className="body">The right house, a day for every age, and a written quote.</p></li>
            <li><span className="mono ox">03</span><p className="ser">Confirm and gather</p><p className="body">A {BOOKING.depositPct}% deposit holds it; the balance is due {BOOKING.balanceDueDays} days before you travel.</p></li>
          </ol>
          <p className="cp muted" style={{ margin: "26px 0 0" }}>Working with a travel advisor? <Link href="/advisors">Every gathering is advisor-led →</Link></p>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 90, paddingBottom: 90 }} aria-labelledby="home-founder">
        <div className="fd-teaser">
          <figure className="polaroid" style={{ margin: 0, transform: "rotate(-2deg)", maxWidth: 300, justifySelf: "center", width: "100%" }}>
            <img className="tape" src="/kit/tape-kraft.png" alt="" aria-hidden="true" />
            <img src={FOUNDER_PHOTOS.sundowner.src} alt={FOUNDER_PHOTOS.sundowner.alt} width={FOUNDER_PHOTOS.sundowner.w} height={FOUNDER_PHOTOS.sundowner.h} loading="lazy" decoding="async" style={{ width: "100%", height: 340, objectFit: "cover", objectPosition: FOUNDER_PHOTOS.sundowner.focus }} />
            <figcaption className="sig">{FOUNDER_PHOTOS.sundowner.caption}</figcaption>
          </figure>
          <div>
            <p className="eb">The founder · since 1982</p>
            <h2 id="home-founder" className="dsp" style={{ margin: "16px 0 0", fontSize: "clamp(34px, 4vw, 52px)" }}>Forty-four years on the road — and still going</h2>
            <p className="it" style={{ margin: "20px 0 0", fontSize: 24, lineHeight: 1.35, maxWidth: 640 }}>“{AFRICA_QUOTES[0].text}”</p>
            <p className="body" style={{ margin: "18px 0 0", maxWidth: 620 }}>{FOUNDER_LEDE}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center", marginTop: 26 }}>
              <Link href="/founder" className="btn btn-o">Read James's story</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="band" style={{ paddingTop: 90, paddingBottom: 90 }} aria-labelledby="home-formula"><div className="wrap">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 16 }}>
          <div>
            <p className="eb">The Gathering Formula</p>
            <h2 id="home-formula" className="dsp" style={{ margin: "14px 0 0", fontSize: "clamp(34px, 4vw, 48px)" }}>Six tests, written for families</h2>
          </div>
          <p className="body" style={{ margin: 0, maxWidth: 440, fontSize: 16 }}>Every house page shows its result test by test, and how James knows — stayed, inspected in person, or met the host.</p>
        </div>
        <ol className="home-formula">
          {FORMULA.map(([t, n], i) => (
            <li key={t}><span className="mono ox">{String(i + 1).padStart(2, "0")}</span><p className="ser">{t}</p><p className="body">{n}</p></li>
          ))}
        </ol>
      </div></section>

      {horizon.length > 0 && (
        <section className="wrap" style={{ paddingTop: 100, paddingBottom: 100 }} aria-label="On the Horizon — new places">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 34 }}>
            <div>
              <p className="eb">Undiscovered · be the first</p>
              <h2 className="dsp" style={{ margin: "16px 0 0", fontSize: "clamp(36px, 4vw, 50px)" }}>On the Horizon</h2>
              <p className="it" style={{ margin: "12px 0 0", fontSize: 22 }}>New places on James's list — before they've earned their stamp.</p>
            </div>
            <Link href="/horizon" className="lnk">See all that's new <span>→</span></Link>
          </div>
          <div className="hz-grid">{horizon.map((h) => <HorizonCard key={h.slug} h={h} />)}</div>
        </section>
      )}

      <section id="questions" className="wrap" style={{ paddingTop: 20, paddingBottom: 100, maxWidth: 960 }}>
        <p className="eb">Questions families ask</p>
        <hr className="eb-rule" />
        <h2 className="dsp" style={{ margin: "28px 0 26px", fontSize: "clamp(28px, 7vw, 40px)" }}>Planning a multigenerational gathering</h2>
        <div style={{ borderTop: "1px solid var(--charcoal)" }}>
          {FAQS.map((f) => (
            <div key={f.q} style={{ borderBottom: "1px solid var(--stone)", padding: "24px 0" }}>
              <h3 className="ser" style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 500 }}>{f.q}</h3>
              <p className="body" style={{ margin: 0, fontSize: 16 }}>{f.a}</p>
            </div>
          ))}
        </div>
        <p className="cp" style={{ margin: "22px 0 0" }}><Link href="/questions">All questions families ask →</Link> · <Link href="/how-it-works">How booking works →</Link></p>
      </section>
      <PageSketch k={"route"} label="The road since 1982" />
    </>
  );
}
