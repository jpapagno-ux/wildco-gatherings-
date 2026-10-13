import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import OfferCard from "@/components/OfferCard";
import EpisodeCross from "@/components/EpisodeCross";
import { Icon } from "@/components/Marks";
import { getItineraries, getItinerary, getOffer } from "@/lib/extras";
import { getResidence } from "@/lib/data";
import { SETTINGS } from "@/lib/settings";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "jhlnq5h5";

export async function generateStaticParams() { return (await getItineraries()).map((i) => ({ slug: i.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const t = await getItinerary((await params).slug);
  if (!t) return {};
  return { title: t.seoTitle, description: t.metaDescription, alternates: { canonical: `/itineraries/${t.slug}` }, robots: t.draft ? { index: false } : undefined, openGraph: { title: t.title, description: t.metaDescription } };
}

export default async function ItineraryPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getItinerary((await params).slug);
  if (!t) notFound();
  const r = await getResidence(t.house);
  if (!r) notFound();
  const st = SETTINGS[r.setting];
  const offer = t.offer ? await getOffer(t.offer) : undefined;
  // Multi-stay journeys: resolve each chapter's house (and its alternatives).
  const stops = t.stops ? (await Promise.all(t.stops.map(async (s) => ({ ...s, r: await getResidence(s.house), alts: (await Promise.all((s.or || []).map((h) => getResidence(h)))).filter(Boolean) as NonNullable<Awaited<ReturnType<typeof getResidence>>>[] })))).filter((s) => s.r) : [];
  const hero = t.hero ? { publicId: t.hero, alt: `${t.title} — ${r.name}` } : r.images.find((i) => i.role === "Hero") || r.images[0];
  const facts: [string, string | undefined][] = [
    ["Length", `${t.days} days · ${t.nights} nights`], stops.length ? ["Stays", stops.map((s) => `${s.r!.name} · ${s.nights} nights`).join("\n")] : ["Base", r.name], ["Arrive", t.arrive], ["Depart", t.depart],
    ["Best for", t.bestFor], ["Season", t.season], ["Price", t.priceNote],
  ];
  return (
    <article>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "TouristTrip", name: t.title, description: t.dek, url: `${SITE}/itineraries/${t.slug}`,
        touristType: ["Multigenerational families", "Family reunions"],
        ...(hero?.publicId ? { image: `https://res.cloudinary.com/${CLOUD}/image/upload/${hero.publicId}` } : {}),
        provider: { "@type": "TravelAgency", name: "Wild & Co Gatherings", url: SITE },
        subjectOf: stops.length
          ? stops.flatMap((s) => [s.r!, ...s.alts]).map((h) => ({ "@type": "LodgingBusiness", name: h.name, url: `${SITE}/houses/${h.slug}`, address: { "@type": "PostalAddress", addressLocality: h.place, addressRegion: h.region, addressCountry: h.country } }))
          : { "@type": "LodgingBusiness", name: r.name, url: `${SITE}/houses/${r.slug}` },
        itinerary: { "@type": "ItemList", numberOfItems: t.plan.length, itemListElement: t.plan.map((d, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "TouristAttraction", name: `Day ${i + 1} · ${d.title}`, description: [d.morning, d.afternoon, d.evening].filter(Boolean).join(" · ") } })) },
      }} />
      {t.draft && <div className="cp" style={{ background: "var(--oxblood)", color: "var(--paper)", textAlign: "center", padding: "10px 20px" }}>Sample itinerary · draft for James&apos;s approval</div>}

      <section className="hero" style={{ minHeight: "min(70vh, 640px)" }} aria-label={t.title}>
        <Photo img={hero} priority style={{ position: "absolute", inset: 0 }} />
        <div className="shade" />
        <div className="title" style={{ left: 48, right: 48 }}>
          <nav aria-label="Breadcrumb" className="cp" style={{ color: "rgba(244,241,236,.78)", marginBottom: 20 }}><Link href="/itineraries" style={{ textDecoration: "none" }}>Itineraries</Link> / <Link href={`/houses/${r.slug}`} style={{ textDecoration: "none" }}>{r.name}</Link></nav>
          <p className="eb" style={{ color: "#F0D9C6" }}>{stops.length ? "Journey" : "Short itinerary"} · {t.days} days · {t.nights} nights · {stops.length ? r.country : r.region}</p>
          <h1 className="dsp" style={{ margin: "18px 0 0", fontSize: "clamp(32px, 6vw, 86px)", color: "var(--on-dark)", maxWidth: 1000 }}>{t.title}</h1>
          <p className="ser" style={{ margin: "18px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.2vw, 27px)", lineHeight: 1.35, maxWidth: 780 }}>{t.dek}</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 80, paddingBottom: 60 }}>
        <div className="card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}>
          {[facts.filter(([, v]) => v).slice(0, 4), facts.filter(([, v]) => v).slice(4)].map((col, ci) => (
            <dl key={ci} style={{ margin: 0, padding: "30px 40px", borderLeft: ci ? "1px solid var(--stone)" : 0 }}>
              <p className="lbl" style={{ paddingBottom: 14, borderBottom: "1px solid var(--charcoal)", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>{ci ? " " : <><Icon name="route" size={22} color={st.ink} /> The Manifest</>}</p>
              {col.map(([k, v]) => <div key={k} className="mf"><dt className="cp muted">{k}</dt><dd className="mono" style={{ margin: 0, whiteSpace: "pre-line" }}>{k === "Base" ? <Link href={`/houses/${r.slug}`}>{v}</Link> : v}</dd></div>)}
            </dl>
          ))}
        </div>
      </section>

      {stops.length > 0 && (
        <section className="wrap" style={{ paddingBottom: 80 }} aria-labelledby="journey-stays">
          <p className="eb">The stays</p>
          <hr className="eb-rule" />
          <h2 id="journey-stays" className="dsp" style={{ margin: "26px 0 0", fontSize: "clamp(30px, 3.4vw, 44px)" }}>{stops.length} chapters, {t.nights} nights</h2>
          <div className="jr-stops">
            {stops.map((s, i) => {
              const h = s.r!;
              const img = h.images.find((x) => x.role === "Card") || h.images.find((x) => x.role === "Hero") || h.images[0];
              return (
                <article key={s.house} className="jr-stop">
                  <Link href={`/houses/${h.slug}`} className="jr-photo" aria-label={h.name}>{img && <Photo img={img} sizes="(max-width: 760px) 100vw, 560px" style={{ position: "absolute", inset: 0 }} />}</Link>
                  <div className="jr-body">
                    <p className="mono ox" style={{ margin: 0, fontSize: 13 }}>Chapter {String(i + 1).padStart(2, "0")} · {s.nights} nights</p>
                    <h3 className="dsp" style={{ margin: "10px 0 0", fontSize: 28 }}>{s.label}</h3>
                    <p className="lbl" style={{ margin: "14px 0 0" }}><Link href={`/houses/${h.slug}`}>{h.name}</Link> · {h.place}</p>
                    <p className="body" style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.6 }}>{h.line}</p>
                    {s.alts.length > 0 && (
                      <p className="cp muted" style={{ margin: "14px 0 0", textTransform: "none", letterSpacing: ".02em" }}>
                        Or stay at {s.alts.map((a, j) => <span key={a.slug}>{j ? " or " : ""}<Link href={`/houses/${a.slug}`}>{a.name}</Link></span>)}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      <section className="wrap" style={{ paddingBottom: 80 }} aria-label="Day by day">
        <p className="eb">Day by day</p>
        <hr className="eb-rule" />
        <div style={{ marginTop: 34, borderTop: "1px solid var(--charcoal)" }}>
          {t.plan.map((d, i) => (
            <section key={i} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: "14px 40px", padding: "32px 0", borderBottom: "1px solid var(--stone)" }}>
              <div>
                <p className="mono ox" style={{ margin: 0, fontSize: 14 }}>Day {String(i + 1).padStart(2, "0")}</p>
                <h2 className="dsp" style={{ margin: "10px 0 0", fontSize: 34 }}>{d.title}</h2>
              </div>
              <dl style={{ margin: 0, gridColumn: "span 2", minWidth: 0 }}>
                {([["Morning", d.morning], ["Afternoon", d.afternoon], ["Evening", d.evening]] as [string, string | undefined][]).filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="mf" style={{ gridTemplateColumns: "120px 1fr" }}><dt className="cp muted">{k}</dt><dd className="body" style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>{v}</dd></div>
                ))}
                {d.note && <p className="cp muted" style={{ margin: "10px 0 0", textTransform: "none", letterSpacing: ".02em" }}>{d.note}</p>}
              </dl>
            </section>
          ))}
        </div>
        <p className="cp muted" style={{ margin: "18px 0 0" }}>Planned by <span className="sig" style={{ fontSize: 26, verticalAlign: "middle" }}>J. Wild</span> · adjusted to every family</p>
      </section>

      {offer && <OfferCard offer={offer} house={r.slug} houseName={r.name} />}
      <EpisodeCross from={r.slug} setting={r.setting} fromName={r.name} />

      <section className="wrap" style={{ paddingBottom: 90 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 28 }}>
          <div style={{ padding: "30px 0", borderTop: "1px solid var(--charcoal)" }}>
            <h2 className="lbl ox">✓ Included</h2>
            <ul className="body" style={{ margin: 0, paddingLeft: 18, fontSize: 16 }}>{t.included.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
          <div style={{ padding: "30px 0", borderTop: "1px solid var(--charcoal)" }}>
            <h2 className="lbl">✕ Not included</h2>
            <ul className="body" style={{ margin: 0, paddingLeft: 18, fontSize: 16 }}>{t.excluded.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", marginTop: 26 }}>
          <Link href={`/plan?house=${r.slug}${t.offer ? `&offer=${t.offer}` : ""}`} className="btn">Plan these {t.days} days</Link>
          <Link href={`/houses/${r.slug}`} className="lnk">The house: {r.name} <span>→</span></Link>
        </div>
      </section>
    </article>
  );
}
