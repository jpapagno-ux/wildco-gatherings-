import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import Strip from "@/components/Strip";
import JsonLd from "@/components/JsonLd";
import { Stamp, HostMark, VipStamp, LuggageTag, TapedPhoto, Icon } from "@/components/Marks";
import { SETTINGS } from "@/lib/settings";
import Film from "@/components/Film";
import EpisodeCross from "@/components/EpisodeCross";
import { getWebinarsForPartner, whenLabel } from "@/lib/webinars";
import { embedUrl, thumbUrl } from "@/lib/video";
import { getResidence, getResidences, dms } from "@/lib/data";
import { getPostForHouse, quotesOf } from "@/lib/journal";
import OfferCard from "@/components/OfferCard";
import StayMap from "@/components/StayMap";
import { getOffersForHouse, getItinerariesForHouse } from "@/lib/extras";

export const revalidate = 3600;

export async function generateStaticParams() {
  return (await getResidences()).map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const r = await getResidence((await params).slug);
  if (!r) return {};
  const hero = r.images.find((i) => i.role === "Hero") || r.images[0];
  return {
    title: r.seoTitle,
    description: r.metaDescription,
    alternates: { canonical: `/houses/${r.slug}` },
    openGraph: { title: r.seoTitle, description: r.metaDescription, images: hero ? [`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "jhlnq5h5"}/image/upload/f_jpg,q_auto,w_1200,h_630,c_fill/${hero.publicId}`] : [] },
  };
}

export default async function House({ params }: { params: Promise<{ slug: string }> }) {
  const r = await getResidence((await params).slug);
  if (!r) notFound();
  const hero = r.images.find((i) => i.role === "Hero") || r.images[0];
  const coords = dms(r.lat, r.lng);
  const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
  const b = r.booking;
  const film = r.videos[0];
  const more = r.videos.slice(1);
  const post = await getPostForHouse(r.slug);
  const offer = (await getOffersForHouse(r.slug))[0];
  const trips = await getItinerariesForHouse(r.slug);
  const webinars = await getWebinarsForPartner(r.partner?.name);
  const toTime = (t?: string) => { const m = t?.match(/(\d{1,2})\s*(am|pm)/i); if (!m) return undefined; let h = Number(m[1]) % 12; if (m[2].toLowerCase() === "pm") h += 12; return `${String(h).padStart(2, "0")}:00`; };
  const bookingFacts: [string, string | undefined][] = b ? [
    ["Plan", b.plan], ["Whole house", b.wholeHouse], ["Minimum", b.minStay], ["Book via", b.bookVia],
    ["Check-in", [b.checkIn, b.checkOut && `check-out ${b.checkOut}`].filter(Boolean).join(" · ") || undefined],
    ["Deposit", b.deposit], ["Cancel", b.cancellation], ["Children", b.children],
  ] : [];
  const st = SETTINGS[r.setting];
  const card = r.images.find((i) => i.role === "Card");
  const tagStatus = r.vip ? "Gatherings VIP" : r.stamp;
  const familyNotes: [string, string, string | undefined][] = [
    ["season", "Best season", r.notes?.bestSeason || (r.seasons.length ? r.seasons.join(" & ") : undefined)],
    ["plane", "Last leg", r.airport],
    ["plug", "Power", r.notes?.power],
    ["clock", "Time", r.notes?.timeZone],
    ["family", "Children", r.kidsProgram ? `${r.kidsProgram}${r.kidsAges ? ` · ${r.kidsAges}` : ""}` : b?.children],
    ["water", "Water", r.water],
  ];
  const ledgerCol: [string, string | undefined][] = [
    ["Ledger entry", `No. ${r.entryNo}`],
    ["Coordinates", coords ? coords.replace("   ", "\n") : undefined],
    ["Setting", st.name],
    ["Sleeps", r.sleeps ? `Up to ${r.sleeps}` : r.units ? `${r.units} houses & cabins` : undefined],
    ["Recorded", r.firstVisited ? `${r.firstVisited} · in person` : r.vip?.visit ? `Visit ${r.vip.visit.replace(/^visit\s*/i, "")}` : "On the list"],
  ];
  const facts: [string, string | undefined][] = [
    ["Season", r.seasons.join(" & ")],
    ["Rooms", r.bedrooms || (r.units ? `${r.units} cabins` : undefined)],
    ["Sleeps", r.sleeps ? `Up to ${r.sleeps}` : undefined],
    ["Children", r.kidsProgram ? `${r.kidsProgram}${r.kidsAges ? (/^\d/.test(r.kidsAges) ? `, ages ${r.kidsAges}` : `, ${r.kidsAges}`) : ""}` : undefined],
    ["Last leg", r.airport],
    ["Water", r.water],
    ["From", r.rateFrom ? `$${r.rateFrom.toLocaleString()} ${r.rateUnit || ""}` : "On request"],
  ];

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "LodgingBusiness", name: r.name, description: r.line,
        address: r.address ? { "@type": "PostalAddress", streetAddress: r.address } : { "@type": "PostalAddress", addressLocality: r.place, addressRegion: r.region, addressCountry: r.country },
        ...(r.lat ? { geo: { "@type": "GeoCoordinates", latitude: r.lat, longitude: r.lng } } : {}),
        ...(r.sleeps ? { occupancy: { "@type": "QuantitativeValue", maxValue: r.sleeps } } : {}),
        amenityFeature: [r.kidsProgram, r.water].filter(Boolean).map((v) => ({ "@type": "LocationFeatureSpecification", name: v, value: true })),
        image: r.images.map((i) => ({ "@type": "ImageObject", contentUrl: `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "jhlnq5h5"}/image/upload/${i.publicId}`, caption: i.alt, creditText: r.credit || undefined })),
        sameAs: r.officialUrl,
        priceRange: "$$$$",
        ...(toTime(b?.checkIn) ? { checkinTime: toTime(b?.checkIn) } : {}),
        ...(toTime(b?.checkOut) ? { checkoutTime: toTime(b?.checkOut) } : {}),
        ...(r.rateFrom ? { makesOffer: { "@type": "Offer", url: `${SITE}/houses/${r.slug}`, priceSpecification: { "@type": "UnitPriceSpecification", price: r.rateFrom, priceCurrency: "USD", unitText: r.rateUnit || "per night" }, description: b?.included.join("; ") } } : {}),
        ...(film ? { subjectOf: { "@id": `${SITE}/houses/${r.slug}#film` } } : {}),
      }} />
      {r.videos.map((v, i) => (
        <JsonLd key={v.id} data={{
          "@context": "https://schema.org", "@type": "VideoObject", "@id": `${SITE}/houses/${r.slug}#${i === 0 ? "film" : `film-${i + 1}`}`,
          name: v.title, description: v.description || r.line, thumbnailUrl: thumbUrl(v) || undefined, uploadDate: v.uploadDate,
          duration: v.duration, embedUrl: embedUrl(v), contentUrl: v.provider === "youtube" ? `https://www.youtube.com/watch?v=${v.id}` : `https://vimeo.com/${v.id}`,
          ...(v.credit ? { creditText: v.credit } : {}),
        }} />
      ))}
      {offer && offer.status === "Live" && offer.confirmed && <JsonLd data={{
        "@context": "https://schema.org", "@type": "Offer", name: offer.name, description: [offer.headline, offer.line].filter(Boolean).join(" "),
        url: `${SITE}/houses/${r.slug}#offer`, validFrom: offer.validFrom, validThrough: offer.validTo, availabilityStarts: offer.validFrom, availabilityEnds: offer.validTo,
        eligibleDuration: { "@type": "QuantitativeValue", minValue: offer.stayNights, unitText: "nights" },
        itemOffered: { "@type": "LodgingBusiness", name: r.name, url: `${SITE}/houses/${r.slug}` },
        offeredBy: { "@type": "TravelAgency", name: "Wild & Co Gatherings", url: SITE },
      }} />}
      {r.faqs.length > 0 && <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: r.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }} />}

      <section className="hero" aria-label={r.name}>
        <Photo img={hero} priority style={{ position: "absolute", inset: 0 }} />
        <div className="shade" />
        <div className="ledger-col">
          {ledgerCol.filter(([, v]) => v).map(([k, v]) => <div key={k}><p className="k">{k}</p><p className="v">{v}</p></div>)}
        </div>
        <div className="title">
          <nav aria-label="Breadcrumb" className="cp" style={{ color: "rgba(244,241,236,.78)", marginBottom: 20 }}><Link href="/ledger" style={{ textDecoration: "none" }}>The Ledger</Link> / <Link href={`/houses#${r.setting}`} style={{ textDecoration: "none" }}>{st.name}</Link> / Entry {r.entryNo}</nav>
          <p className="eb" style={{ color: "#F0D9C6" }}>Curated from experience · {r.region}, {r.country}</p>
          <h1 className="dsp" style={{ margin: "18px 0 0", fontSize: "clamp(48px, 6.4vw, 92px)", color: "var(--on-dark)" }}>{r.name}</h1>
          {r.bestFor && <p className="ser" style={{ margin: "18px 0 0", fontStyle: "italic", fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1.3, maxWidth: 760 }}>{r.bestFor}</p>}
        </div>
        <div className="tag"><LuggageTag setting={r.setting} name={r.name} place={`${r.place} · ${r.region}`} entryNo={r.entryNo} status={tagStatus} /></div>
      </section>
      {r.partner && (
        <div className="partner-line wrap">
          <span className="cp muted">In partnership with</span>
          {r.partner.logo ? <Photo img={r.partner.logo} sizes="200px" style={{ width: 170, height: 46, background: "transparent" }} contain /> : <span className="partner-name">{r.partner.name}</span>}
          {webinars[0] && <Link href={`/webinars/${webinars[0].slug}`} className="lnk" style={{ marginLeft: 10 }}>Webinar · {webinars[0].title.split(":")[0]} <span>→</span></Link>}
        </div>
      )}
      <div className="hero-tag-mobile"><LuggageTag setting={r.setting} name={r.name} place={`${r.place} · ${r.region}`} entryNo={r.entryNo} status={tagStatus} width={140} /></div>

      <section className="wrap" style={{ paddingTop: "clamp(50px, 9vw, 120px)", paddingBottom: 80, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: 72, alignItems: "start" }}>
        <div>
          <p className="eb">{st.name} · {r.place}</p>
          <hr className="eb-rule" />
          <h2 className="dsp" style={{ margin: "30px 0 0", fontSize: "clamp(40px, 4.6vw, 60px)" }}>Why it earned its place</h2>
          <p className="it" style={{ margin: "24px 0 0", fontSize: 28, lineHeight: 1.3 }}>{r.line}</p>
          {r.verdict.map((v, i) => <p key={i} className="body" style={{ margin: "22px 0 0", maxWidth: 560 }}>{v}</p>)}
          <hr className="rule" style={{ width: 56, margin: "34px 0 22px" }} />
          <p className="eb" style={{ fontSize: 12 }}>From the personal ledger of James Wild &amp; Co.</p>
          <p className="lab" style={{ margin: "8px 0 0", color: "var(--body)" }}>Still going since 1982.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 26, marginTop: 18, flexWrap: "wrap" }}>
            <p className="sig" style={{ margin: 0, fontSize: 44 }}>James Wild</p>
            <Stamp kind={r.stamp} size={132} />
          </div>
        </div>
        <div className="tag-clear" style={{ position: "relative", display: "grid", gap: 46 }}>
          {card ? <TapedPhoto img={card} caption={card.caption} /> : null}
          <div className="card" style={{ padding: "28px 30px" }}>
            <p className="eb" style={{ fontSize: 12 }}>Not for everyone</p>
            <p className="ser" style={{ margin: "14px 0 0", fontSize: 21, lineHeight: 1.5, color: "var(--charcoal)" }}>{r.notFor}</p>
          </div>
        </div>
      </section>

      {offer && <OfferCard offer={offer} house={r.slug} houseName={r.name.replace(/, a Ted Turner Reserve$/, "")} />}

      {r.vip && (
        <section className="wrap" style={{ paddingBottom: 70 }}>
          <div className="card" style={{ display: "flex", flexWrap: "wrap", gap: 30, padding: "30px 38px", alignItems: "center", background: st.stock }}>
            <Link href={`/vip/${r.vip.collectionSlug}`} aria-label="Gatherings VIP — Vetted in Purpose"><VipStamp setting={r.setting} size={210} /></Link>
            <div style={{ flex: "1 1 420px" }}>
              <p className="eb" style={{ color: st.ink }}>Gatherings VIP · Vetted in Purpose · {r.vip.collection}</p>
              <p className="ser" style={{ margin: "12px 0 6px", fontSize: 23, lineHeight: 1.5, fontStyle: "italic", color: "var(--charcoal)" }}>&ldquo;{r.vip.why}&rdquo;</p>
              <p className="sig" style={{ margin: 0, fontSize: 30 }}>J. Wild</p>
              {r.vip.fit && <p className="cp" style={{ margin: "10px 0 0" }}>Family fit · <span className="ser" style={{ textTransform: "none", letterSpacing: 0, fontSize: 16, fontStyle: "italic" }}>{r.vip.fit}</span></p>}
              <Link href={`/vip/${r.vip.collectionSlug}`} className="lnk" style={{ marginTop: 18, color: st.ink, borderColor: st.ink }}>All of {r.vip.collection} <span>→</span></Link>
            </div>
          </div>
        </section>
      )}

      <section className="wrap" style={{ paddingBottom: 80 }} aria-label="The manifest">
        <div className="card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}>
          {[facts.filter(([, v]) => v).slice(0, 4), facts.filter(([, v]) => v).slice(4)].map((col, ci) => (
            <dl key={ci} style={{ margin: 0, padding: "32px 40px", borderLeft: ci ? "1px solid var(--stone)" : 0 }}>
              <p className="lbl" style={{ paddingBottom: 14, borderBottom: "1px solid var(--charcoal)", margin: 0 }}>{ci ? "\u00a0" : "The Manifest"}</p>
              {col.map(([k, v]) => <div key={k} className="mf"><dt className="cp muted">{k}</dt><dd className="mono" style={{ margin: 0, color: k === "From" ? "var(--rust)" : undefined }}>{v}</dd></div>)}
            </dl>
          ))}
        </div>
      </section>

      {familyNotes.some(([, , v]) => v) && (
        <section className="wrap" style={{ paddingBottom: 90 }} aria-label="Notes for the family">
          <p className="lbl">Notes for the family</p>
          <div className="notes">
            {familyNotes.filter(([, , v]) => v).map(([icon, k, v]) => (
              <div key={k}><Icon name={icon} /><span className="cp" style={{ color: "var(--charcoal)" }}>{k}</span><span className="mono" style={{ fontSize: 12 }}>{v}</span></div>
            ))}
          </div>
        </section>
      )}

      {film && (
        <section className="navy" style={{ padding: "90px 0" }} aria-label="The film">
          <div className="wrap">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 16, marginBottom: 30 }}>
              <div><p className="eb">The Film</p><h2 className="dsp" style={{ margin: "16px 0 0", fontSize: 46, color: "var(--on-dark)" }}>See {r.name.replace(/, a Ted Turner Reserve$/, "")} before you book</h2></div>
            </div>
            <Film video={film} dark />
            {more.length > 0 && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 420px))", gap: 24, marginTop: 24 }}>
                {more.map((v) => <Film key={v.id} video={v} dark />)}
              </div>
            )}
          </div>
        </section>
      )}

      {b && (
        <section className="wrap" style={{ paddingTop: 100, paddingBottom: 90 }} aria-label="Booking facts and pricing">
          <p className="eb">Booking facts &amp; pricing</p>
          <hr className="eb-rule" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 16, margin: "30px 0 34px" }}>
            <h2 className="dsp" style={{ margin: 0, fontSize: 46 }}>How the stay works</h2>
            {b.checked && <p className="cp muted" style={{ margin: 0 }}>Checked with the house · {b.checked}</p>}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 28 }}>
            <div className="card" style={{ padding: "34px 40px" }}>
              <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>
                {bookingFacts.filter(([, v]) => v).map(([k, v]) => (
                  <div key={k} className="mf"><dt className="cp muted">{k}</dt><dd className="cpn" style={{ margin: 0 }}>{v}</dd></div>
                ))}
              </dl>
            </div>
            <div className="card" style={{ padding: "34px 40px", display: "flex", flexDirection: "column" }}>
              <p className="cp muted" style={{ margin: 0 }}>{r.rateFrom ? "From" : "Rates"}</p>
              <p className="ser ox" style={{ margin: "6px 0 0", fontSize: 60, fontWeight: 300, lineHeight: 1 }}>{r.rateFrom ? `$${r.rateFrom.toLocaleString()}` : "On request"}</p>
              {b.rateBasis && <p className="body" style={{ margin: "10px 0 24px", fontSize: 15 }}>{b.rateBasis}</p>}
              <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>
                {b.fees.map((f) => <div key={f.label} className="mf"><dt className="cp muted">{f.label}</dt><dd className="mono" style={{ margin: 0, fontSize: 12 }}>{f.value}</dd></div>)}
              </dl>
              <div style={{ marginTop: "auto", paddingTop: 24 }}><Link href={`/plan?house=${r.slug}`} className="btn" style={{ width: "100%" }}>Request a quote</Link></div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 28, marginTop: 28 }}>
            <div style={{ padding: "30px 0", borderTop: "1px solid var(--charcoal)" }}>
              <h3 className="lbl ox">✓ Included</h3>
              <ul className="body" style={{ margin: 0, paddingLeft: 18, fontSize: 16 }}>{b.included.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
            <div style={{ padding: "30px 0", borderTop: "1px solid var(--charcoal)" }}>
              <h3 className="lbl">✕ Not included</h3>
              <ul className="body" style={{ margin: 0, paddingLeft: 18, fontSize: 16 }}>{b.excluded.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          </div>
        </section>
      )}

      {r.rooms.length > 0 && (
        <section className="band" style={{ padding: "100px 0" }} aria-label="Room categories">
          <div className="wrap">
            <p className="eb">Room categories</p>
            <hr className="eb-rule" />
            <h2 className="dsp" style={{ margin: "30px 0 30px", fontSize: 46 }}>Where everyone sleeps</h2>
            <div className="card" style={{ padding: "8px 40px 26px", overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: 860, borderCollapse: "collapse" }}>
                <thead>
                  <tr className="cp muted" style={{ textAlign: "left", borderBottom: "1px solid var(--charcoal)" }}>
                    {["Category", "Count", "Bedrooms", "Sleeps", "What's inside", "Family fit · J.W."].map((h) => <th key={h} scope="col" style={{ padding: "18px 12px 14px 0", fontWeight: 400 }}>{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {r.rooms.map((m) => (
                    <tr key={m.name} style={{ borderBottom: m.whole ? 0 : "1px solid var(--stone)", background: m.whole ? "var(--paper-2)" : undefined, verticalAlign: "baseline" }}>
                      <th scope="row" className={`ser${m.whole ? " ox" : ""}`} style={{ padding: "18px 12px 18px 0", fontSize: 22, fontWeight: 500, textAlign: "left" }}>{m.name}</th>
                      <td className="mono" style={{ padding: "18px 12px 18px 0" }}>{m.count}</td>
                      <td className="mono" style={{ padding: "18px 12px 18px 0" }}>{m.bedrooms}</td>
                      <td className="mono" style={{ padding: "18px 12px 18px 0" }}>{m.sleeps}</td>
                      <td className="body" style={{ padding: "18px 12px 18px 0", fontSize: 15, lineHeight: 1.55 }}>{m.inside}</td>
                      <td className="it" style={{ padding: "18px 0", fontSize: 19, lineHeight: 1.3 }}>{m.fit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {r.host && (
        <section className="wrap" style={{ paddingTop: 90 }}>
          <div className="card" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48, padding: 40 }}>
            <div style={{ position: "relative", flex: "none" }}>
              <TapedPhoto img={r.host.headshot} caption={r.host.how ? `Met ${r.host.how.toLowerCase()}` : undefined} rotate={-2} tape="cream" height={220} sizes="220px" aspect="1:1" style={{ width: 240 }} />
              {r.host.metOn && <div style={{ position: "absolute", right: -34, bottom: -22, transform: "rotate(12deg)" }}><HostMark /></div>}
            </div>
            <div style={{ flex: "1 1 420px" }}>
              <p className="eb">{r.host.metOn ? "The Host · Vetted in conversation" : "The Host"}</p>
              <p className="ser" style={{ margin: "12px 0 6px", fontSize: 34 }}>{r.host.name}</p>
              <p className="cp muted" style={{ margin: "0 0 20px" }}>{r.host.title}</p>
              <p className="body" style={{ margin: "0 0 16px" }}>{r.host.note}</p>
              {r.host.metOn && <p className="cp" style={{ margin: "0 0 24px" }}>Met by James Wild · {r.host.metOn}{r.host.how ? ` · ${r.host.how}` : ""}</p>}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
                <Link href={`/plan?house=${r.slug}&host=1`} className="btn btn-o">A conversation with the host</Link>
                {webinars[0] && <Link href={`/webinars/${webinars[0].slug}`} className="lnk">Webinar with {r.host.name.split(" ")[0]} · {webinars[0].status === "Recorded" ? "watch" : whenLabel(webinars[0])} <span>→</span></Link>}
              </div>
            </div>
          </div>
        </section>
      )}

      <EpisodeCross from={r.slug} setting={r.setting} fromName={r.name} />

      {trips.length > 0 && (
        <section className="wrap" style={{ paddingTop: 100 }} aria-label="Short itineraries">
          <p className="eb">Short itineraries · {trips.map((t) => `${t.days} days`).join(" · ")}</p>
          <hr className="eb-rule" />
          <h2 className="dsp" style={{ margin: "28px 0 28px", fontSize: 44 }}>A few days from the house</h2>
          <div style={{ display: "grid", gap: 24 }}>
            {trips.map((t) => (
              <Link key={t.slug} href={`/itineraries/${t.slug}`} className="card" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", gap: 30, padding: "30px 36px", textDecoration: "none", alignItems: "center" }}>
                <div>
                  <p className="cp muted" style={{ margin: 0 }}>{t.days} days · {t.nights} nights{t.offer && offer?.slug === t.offer ? " · pairs with Worth Another Night" : ""}</p>
                  <h3 className="ser" style={{ margin: "10px 0 8px", fontSize: 30, fontWeight: 500 }}>{t.title}</h3>
                  <p className="body" style={{ margin: 0, fontSize: 16 }}>{t.dek}</p>
                </div>
                <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--charcoal)" }}>
                  {t.plan.map((d, i) => <li key={i} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 12, padding: "10px 0", borderBottom: "1px solid var(--stone)" }}><span className="mono ox">Day {i + 1}</span><span className="ser" style={{ fontSize: 19 }}>{d.title}</span></li>)}
                </ol>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="wrap" style={{ paddingTop: 100, paddingBottom: 90, display: "flex", flexWrap: "wrap", gap: 56 }}>
        <div style={{ flex: "1 1 300px", maxWidth: 380 }}>
          <p className="eb">The Gathering Formula</p>
          <hr className="eb-rule" />
          <h2 className="dsp" style={{ margin: "28px 0 18px", fontSize: 42 }}>How it measures up</h2>
          <p className="body" style={{ margin: 0 }}>{r.formula.filter((f) => f.pass).length} of 6 tests passed.</p>
        </div>
        <ol style={{ flex: "2 1 560px", listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--charcoal)" }}>
          {r.formula.map((f, i) => (
            <li key={f.test} style={{ display: "grid", gridTemplateColumns: "90px minmax(0,220px) 1fr", gap: 16, padding: "18px 0", borderBottom: "1px solid var(--stone)", alignItems: "baseline" }}>
              <span className={`mono${f.pass ? " ox" : " muted"}`}>{f.pass ? "✓" : "○"} {String(i + 1).padStart(2, "0")}</span>
              <span className="ser" style={{ fontSize: 22, fontWeight: 500 }}>{f.test}</span>
              <span className="body" style={{ fontSize: 16 }}>{f.note}</span>
            </li>
          ))}
        </ol>
      </section>

      {r.experiences.length > 0 && (
        <section aria-label="Experiences" className="band" style={{ padding: "90px 0 50px" }}>
          <Strip label="Recorded from experience" title="On land & water, for every age">
            {r.experiences.map((e) => (
              <article key={e.name} style={{ width: 330, maxWidth: "80vw", textAlign: "center" }}>
                <Photo img={e.image} sizes="330px" aspect="11:10" style={{ height: 300 }} />
                <h3 className="lab" style={{ margin: "20px 0 0", letterSpacing: ".3em" }}>{e.name}</h3>
                <hr style={{ width: 30, height: 1, border: 0, background: "var(--rust)", margin: "12px auto" }} />
                <p className="cp muted" style={{ margin: "0 0 8px" }}>{[...e.ages, ...e.seasons].join(" · ")}</p>
                <p className="body" style={{ margin: 0, fontSize: 15 }}>{e.description}</p>
              </article>
            ))}
          </Strip>
        </section>
      )}

      {r.manifest.length > 0 && (
        <section className="wrap" style={{ paddingTop: 90 }}>
          <div className="card" style={{ padding: "34px 44px", overflowX: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, borderBottom: "1px solid var(--charcoal)", paddingBottom: 14, minWidth: 720 }}>
              <p className="lbl" style={{ margin: 0 }}>The Gathering Log · Sample</p>
              <p className="cp muted" style={{ margin: 0 }}>Sheet {r.entryNo} · {r.manifest.length} days</p>
            </div>
            {[{ day: "Day", morning: "Morning", afternoon: "Afternoon", evening: "Evening" }, ...r.manifest].map((m, i) => (
              <div key={i} className={i === 0 ? "cp muted" : "body"} style={{ display: "grid", gridTemplateColumns: "80px repeat(3, minmax(0,1fr))", gap: 18, padding: "14px 0", borderBottom: "1px solid var(--stone)", minWidth: 720, fontSize: i === 0 ? undefined : 15, lineHeight: i === 0 ? undefined : 1.5 }}>
                <span className={i === 0 ? "" : "mono"}>{m.day}</span><span>{m.morning}</span><span>{m.afternoon}</span><span>{m.evening}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 18, minWidth: 720 }}>
              <p className="cp muted" style={{ margin: 0 }}>Recorded by <span className="sig" style={{ fontSize: 26, verticalAlign: "middle" }}>J. Wild</span></p>
              <Link href={`/plan?house=${r.slug}`} className="lnk">Plan these days <span>→</span></Link>
            </div>
          </div>
        </section>
      )}

      {post && (
        <section className="wrap" style={{ paddingTop: 90 }}>
          <Link href={`/journal/${post.slug}`} className="card" style={{ display: "flex", flexWrap: "wrap", textDecoration: "none" }}>
            <div style={{ flex: "1 1 380px", minHeight: 280 }}><Photo img={post.hero} sizes="(max-width: 800px) 100vw, 50vw" aspect="4:3" style={{ height: "100%", minHeight: 280 }} /></div>
            <div style={{ flex: "1 1 420px", padding: 40 }}>
              <p className="eb">From the Journal · No. {post.number}</p>
              <h2 className="ser" style={{ margin: "14px 0 16px", fontSize: 34, lineHeight: 1.15, fontWeight: 500 }}>{post.title}</h2>
              {quotesOf(post.body)[1] && <p className="it" style={{ margin: "0 0 18px", fontSize: 21, lineHeight: 1.45 }}>&ldquo;{quotesOf(post.body)[1]}&rdquo;</p>}
              <p className="cp" style={{ margin: 0 }}>{post.author} · {post.readMinutes} min read → Read the entry</p>
            </div>
          </Link>
        </section>
      )}

      {r.faqs.length > 0 && (
        <section className="wrap" style={{ paddingTop: 100, paddingBottom: 90, maxWidth: 960 }}>
          <p className="eb">Before you book</p>
          <hr className="eb-rule" />
          <h2 className="dsp" style={{ margin: "28px 0 26px", fontSize: 40 }}>Questions about {r.name}</h2>
          <div style={{ borderTop: "1px solid var(--charcoal)" }}>
            {r.faqs.map((f) => (
              <div key={f.question} style={{ borderBottom: "1px solid var(--stone)", padding: "24px 0" }}>
                <h3 className="ser" style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 500 }}>{f.question}</h3>
                <p className="body" style={{ margin: 0, fontSize: 16 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {r.lat != null && r.lng != null && (
        <section className="wrap location-map" aria-label={`Where ${r.name} is`}>
          <div className="location-map-head">
            <div>
              <p className="eb">Where it is</p>
              <hr className="eb-rule" />
              <h2 className="dsp">Where is {r.name}?</h2>
              <p className="body" style={{ margin: "12px 0 0", maxWidth: 620 }}>
                {r.name} is in {[r.place, r.region, r.country].filter(Boolean).join(", ")}.
              </p>
            </div>
            <p className="cp muted location-map-coords">{coords.replace("   ", " · ")}</p>
          </div>
          <div className="location-map-frame">
            <StayMap residences={[r]} variant="house" label={`Map showing ${r.name}`} />
          </div>
        </section>
      )}
      <div className="wrap" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, paddingBottom: 30 }}>
        {r.credit && <p className="cp muted" style={{ margin: 0 }}>{r.credit}</p>}
        <p className="cp muted" style={{ margin: 0 }}>JW&amp;Co. Ledger · Entry {r.entryNo} · {st.name}</p>
      </div>
    </>
  );
}
