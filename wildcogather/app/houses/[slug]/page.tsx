import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import Strip from "@/components/Strip";
import JsonLd from "@/components/JsonLd";
import { Stamp, HostMark, VipStamp } from "@/components/Marks";
import Film from "@/components/Film";
import { embedUrl, thumbUrl } from "@/lib/video";
import { getResidence, getResidences, dms } from "@/lib/data";
import { getPostForHouse, quotesOf } from "@/lib/journal";

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
  const toTime = (t?: string) => { const m = t?.match(/(\d{1,2})\s*(am|pm)/i); if (!m) return undefined; let h = Number(m[1]) % 12; if (m[2].toLowerCase() === "pm") h += 12; return `${String(h).padStart(2, "0")}:00`; };
  const bookingFacts: [string, string | undefined][] = b ? [
    ["Plan", b.plan], ["Whole house", b.wholeHouse], ["Minimum", b.minStay], ["Book via", b.bookVia],
    ["Check-in", [b.checkIn, b.checkOut && `check-out ${b.checkOut}`].filter(Boolean).join(" · ") || undefined],
    ["Deposit", b.deposit], ["Cancel", b.cancellation], ["Children", b.children],
  ] : [];
  const facts: [string, string | undefined][] = [
    ["Season", r.seasons.join(" & ")],
    ["Rooms", r.bedrooms || (r.units ? `${r.units} cabins` : undefined)],
    ["Sleeps", r.sleeps ? `Up to ${r.sleeps}` : undefined],
    ["Children", r.kidsProgram ? `${r.kidsProgram}${r.kidsAges ? `, ages ${r.kidsAges}` : ""}` : undefined],
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
      {r.faqs.length > 0 && <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: r.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }} />}

      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 40, display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 32, alignItems: "flex-start" }}>
        <div style={{ flex: "3 1 600px" }}>
          <nav aria-label="Breadcrumb" className="cp muted" style={{ marginBottom: 28 }}><Link href="/ledger" style={{ textDecoration: "none" }}>The Ledger</Link> / {r.region} / Entry {r.entryNo}</nav>
          <p className="cp" style={{ margin: "0 0 12px" }}>Entry No. {r.entryNo}</p>
          <h1 className="disp hero-heading" style={{ margin: 0, letterSpacing: ".03em", textTransform: "uppercase" }}>{r.name}</h1>
          <p className="cp" style={{ margin: "18px 0 4px", fontSize: 14 }}>{r.place}, {r.region} · {r.country}</p>
          {coords && <p className="cp muted" style={{ margin: 0, fontSize: 14 }}>{coords}</p>}
          <p className="cp" style={{ margin: "22px 0 0" }}>
            {r.host?.metOn ? `Host met by J.W. ${r.host.metOn} · ` : ""}First visited {r.firstVisited || "— not yet"}{r.returned ? ` · Returned ${r.returned}` : ""}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
          <Stamp kind={r.stamp} />
          {r.vip && <Link href={`/vip/${r.vip.collectionSlug}`} aria-label="Gatherings VIP — Vetted in Purpose"><VipStamp size={170} note={`J.W. · ${r.vip.visit || "VIP"}`} /></Link>}
        </div>
      </section>

      {r.vip && (
        <section className="wrap" style={{ paddingBottom: 30 }}>
          <div className="box" style={{ display: "flex", flexWrap: "wrap", gap: 30, padding: "26px 34px", alignItems: "center" }}>
            <div style={{ flex: "1 1 520px" }}>
              <p className="lbl ox">Gatherings VIP · Vetted in Purpose · {r.vip.collection}</p>
              <p className="cas" style={{ margin: "0 0 6px", fontSize: 21, lineHeight: 1.5, fontStyle: "italic" }}>&ldquo;{r.vip.why}&rdquo;</p>
              <p className="hand ox" style={{ margin: 0, fontSize: 14 }}>— J. W.</p>
            </div>
            <div style={{ flex: "0 1 280px" }}>
              {r.vip.fit && <p className="cp" style={{ margin: "0 0 10px" }}>Family fit · <span className="cas ox" style={{ textTransform: "none", letterSpacing: 0, fontSize: "1rem" }}>{r.vip.fit}</span></p>}
              <Link href={`/vip/${r.vip.collectionSlug}`} className="cp">See all of {r.vip.collection} →</Link>
            </div>
          </div>
        </section>
      )}

      <section className="wrap"><Photo img={hero} priority style={{ height: "min(70vh, 640px)" }} /></section>

      <section className="wrap" style={{ paddingTop: 56, paddingBottom: 56 }}>
        <div className="box" style={{ display: "flex", flexWrap: "wrap" }}>
          <div style={{ flex: "2 1 520px", padding: 40, borderRight: "1px solid var(--sand)" }}>
            <p className="lbl">The Line</p>
            <p className="cas" style={{ margin: "0 0 34px", fontSize: 26, lineHeight: 1.4 }}>{r.line}</p>
            {r.verdict.length > 0 && <><p className="lbl">The Verdict</p>{r.verdict.map((v, i) => <p key={i} className="cpn" style={{ margin: "0 0 16px" }}>{v}</p>)}<p className="hand ox" style={{ margin: "14px 0 0", fontSize: 16 }}>— J. W.</p></>}
          </div>
          <div style={{ flex: "1 1 300px", padding: 40 }}>
            <p className="lbl">The Facts</p>
            <div style={{ borderTop: "1px solid var(--charcoal)" }}>
              {facts.filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="fact"><span className="cp muted">{k}</span><span className="cpn">{v}</span></div>
              ))}
            </div>
          </div>
          <div style={{ flex: "1 1 100%", display: "flex", flexWrap: "wrap", borderTop: "1px solid var(--sand)" }}>
            {r.fieldNotes.length > 0 && <div style={{ flex: "1 1 340px", padding: "34px 40px", borderRight: "1px solid var(--sand)" }}><p className="lbl">Field Notes</p><ul className="cpn" style={{ margin: 0, paddingLeft: 18 }}>{r.fieldNotes.map((n) => <li key={n}>{n}</li>)}</ul></div>}
            <div style={{ flex: "1 1 300px", padding: "34px 40px" }}><p className="lbl">Not for everyone</p><p className="cpn" style={{ margin: 0 }}>{r.notFor}</p></div>
          </div>
        </div>
      </section>

      {film && (
        <section className="wrap" style={{ paddingBottom: 56 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
            <div><p className="cp ox" style={{ margin: "0 0 10px" }}>The Film</p><h2 className="cas section-heading" style={{ margin: 0 }}>See {r.name} before you book</h2></div>
          </div>
          <Film video={film} />
          {more.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 420px))", gap: 24, marginTop: 24 }}>
              {more.map((v) => <Film key={v.id} video={v} />)}
            </div>
          )}
        </section>
      )}

      {b && (
        <section className="wrap" style={{ paddingBottom: 56 }} aria-label="Booking facts and pricing">
          <div className="box">
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, padding: "22px 40px", borderBottom: "1.5px solid var(--charcoal)" }}>
              <h2 className="cas section-heading" style={{ margin: 0 }}>Booking Facts &amp; Pricing</h2>
              {b.checked && <p className="cp muted" style={{ margin: 0, fontSize: 13 }}>Checked with the house · {b.checked}</p>}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 380px", padding: "34px 40px", borderRight: "1px solid var(--sand)" }}>
                <p className="lbl">How the stay works</p>
                <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>
                  {bookingFacts.filter(([, v]) => v).map(([k, v]) => (
                    <div key={k} className="fact"><dt className="cp muted">{k}</dt><dd className="cpn" style={{ margin: 0 }}>{v}</dd></div>
                  ))}
                </dl>
              </div>
              <div style={{ flex: "1 1 380px", padding: "34px 40px" }}>
                <p className="lbl">Pricing</p>
                <p className="cas ox editorial-lead" style={{ margin: "0 0 4px" }}>{r.rateFrom ? `From $${r.rateFrom.toLocaleString()}` : "Rates on request"}</p>
                {b.rateBasis && <p className="cp muted" style={{ margin: "0 0 22px" }}>{b.rateBasis}</p>}
                <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>
                  {b.fees.map((f) => <div key={f.label} className="fact"><dt className="cp muted">{f.label}</dt><dd className="cpn" style={{ margin: 0 }}>{f.value}</dd></div>)}
                </dl>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", borderTop: "1px solid var(--sand)" }}>
              <div style={{ flex: "1 1 380px", padding: "34px 40px", borderRight: "1px solid var(--sand)" }}>
                <h3 className="lbl ox">✓ Included</h3>
                <ul className="cpn" style={{ margin: 0, paddingLeft: 18 }}>{b.included.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div style={{ flex: "1 1 380px", padding: "34px 40px" }}>
                <h3 className="lbl">✕ Not included</h3>
                <ul className="cpn" style={{ margin: 0, paddingLeft: 18 }}>{b.excluded.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {r.rooms.length > 0 && (
        <section className="wrap" style={{ paddingBottom: 56 }} aria-label="Room categories">
          <p className="cp ox" style={{ margin: "0 0 10px" }}>Room Categories</p>
          <h2 className="cas section-heading" style={{ margin: "0 0 18px" }}>Where everyone sleeps</h2>
          <div className="box scroll-region" tabIndex={0} role="region" aria-label="Room categories, scroll for all columns" style={{ padding: "10px var(--gutter) 30px" }}>
            <table style={{ width: "100%", minWidth: 860, borderCollapse: "collapse" }}>
              <thead>
                <tr className="cp muted" style={{ textAlign: "left", borderBottom: "1.5px solid var(--charcoal)" }}>
                  {["Category", "Count", "Bedrooms", "Sleeps", "What's inside", "Family fit · J.W."].map((h) => <th key={h} scope="col" style={{ padding: "16px 12px 12px 0", fontWeight: 400 }}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {r.rooms.map((m) => (
                  <tr key={m.name} style={{ borderBottom: m.whole ? 0 : "1px solid var(--stone)", background: m.whole ? "var(--paper)" : undefined, verticalAlign: "baseline" }}>
                    <th scope="row" className={`cas${m.whole ? " ox" : ""}`} style={{ padding: "16px 12px 16px 0", fontSize: 19, fontWeight: 400, textAlign: "left" }}>{m.name}</th>
                    <td className="cpn" style={{ padding: "16px 12px 16px 0" }}>{m.count}</td>
                    <td className="cpn" style={{ padding: "16px 12px 16px 0" }}>{m.bedrooms}</td>
                    <td className="cpn" style={{ padding: "16px 12px 16px 0" }}>{m.sleeps}</td>
                    <td className="body" style={{ padding: "16px 12px 16px 0" }}>{m.inside}</td>
                    <td className="cas ox" style={{ padding: "16px 0", fontSize: "1rem", lineHeight: 1.6 }}>{m.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {r.host && (
        <section className="wrap" style={{ paddingBottom: 50 }}>
          <div className="box" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 48, padding: 40 }}>
            <div style={{ position: "relative", flex: "none" }}>
              <figure className="polaroid" style={{ margin: 0, padding: 12, width: 210, transform: "rotate(-2deg)" }}>
                <Photo img={r.host.headshot} sizes="200px" style={{ height: 220 }} />
                <figcaption className="hand" style={{ fontSize: 12 }}>Met {r.host.how ? r.host.how.toLowerCase() : ""}</figcaption>
              </figure>
              <div style={{ position: "absolute", right: -34, bottom: -22, transform: "rotate(12deg)" }}><HostMark /></div>
            </div>
            <div style={{ flex: "1 1 420px" }}>
              <p className="lbl ox">The Host · Vetted in conversation</p>
              <p className="cas" style={{ margin: "0 0 6px", fontSize: 32 }}>{r.host.name}</p>
              <p className="cp muted" style={{ margin: "0 0 20px" }}>{r.host.title}</p>
              <p className="cpn" style={{ margin: "0 0 16px" }}>{r.host.note}</p>
              <p className="cp" style={{ margin: "0 0 24px" }}>Met by James Wild · {r.host.metOn} · {r.host.how}</p>
              <Link href={`/plan?house=${r.slug}&host=1`} className="btn">A conversation with the host</Link>
            </div>
          </div>
        </section>
      )}

      <section className="wrap" style={{ paddingTop: 30, paddingBottom: 80, display: "flex", flexWrap: "wrap", gap: 56 }}>
        <div style={{ flex: "1 1 300px", maxWidth: 380 }}>
          <p className="cp ox" style={{ margin: "0 0 14px" }}>The Gathering Formula</p>
          <h2 className="cas section-heading" style={{ margin: "0 0 18px" }}>How it measures up.</h2>
          <p className="body" style={{ margin: 0 }}>{r.formula.filter((f) => f.pass).length} of 6 tests passed.</p>
        </div>
        <ol style={{ flex: "2 1 560px", listStyle: "none", margin: 0, padding: 0, borderTop: "1.5px solid var(--charcoal)" }}>
          {r.formula.map((f, i) => (
            <li key={f.test} className="formula-row" style={{ padding: "16px 0", borderBottom: "1px solid var(--stone)", alignItems: "baseline" }}>
              <span className="cp ox">{f.pass ? "✓" : "○"} No. {String(i + 1).padStart(2, "0")}</span>
              <span className="cas" style={{ fontSize: 20 }}>{f.test}</span>
              <span className="body" style={{ fontSize: 16 }}>{f.note}</span>
            </li>
          ))}
        </ol>
      </section>

      {r.experiences.length > 0 && (
        <section aria-label="Experiences" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--sand)", borderBottom: "1px solid var(--sand)", padding: "70px 0 40px" }}>
          <Strip label="Experiences" title="On land and water, for every age">
            {r.experiences.map((e) => (
              <article key={e.name} style={{ width: 320, maxWidth: "80vw", background: "var(--card)", border: "1px solid var(--sand)" }}>
                <Photo img={e.image} sizes="320px" style={{ height: 220 }} />
                <div style={{ padding: 20 }}>
                  <p className="cp ox" style={{ margin: "0 0 8px" }}>{[...e.ages, ...e.seasons].join(" · ")}</p>
                  <h3 className="cas card-heading" style={{ margin: "0 0 8px" }}>{e.name}</h3>
                  <p className="body" style={{ margin: 0 }}>{e.description}</p>
                </div>
              </article>
            ))}
          </Strip>
        </section>
      )}

      {r.manifest.length > 0 && (
        <section className="wrap" style={{ paddingTop: 80, paddingBottom: 40 }}>
          <div className="box scroll-region" tabIndex={0} role="region" aria-label="Family chapter manifest, scroll for all columns" style={{ padding: "34px var(--gutter)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, borderBottom: "1.5px solid var(--charcoal)", paddingBottom: 14, minWidth: 720 }}>
              <p className="cp" style={{ margin: 0, fontSize: 13 }}>Family Chapter Manifest · Sample</p>
              <p className="cp" style={{ margin: 0, fontSize: 13 }}>Sheet No. 01 · {r.manifest.length} days</p>
            </div>
            {[{ day: "Day", morning: "Morning", afternoon: "Afternoon", evening: "Evening" }, ...r.manifest].map((m, i) => (
              <div key={i} className={i === 0 ? "cp muted" : "cpn"} style={{ display: "grid", gridTemplateColumns: "90px repeat(3, minmax(0,1fr))", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--stone)", minWidth: 720 }}>
                <span className="cp">{m.day}</span><span>{m.morning}</span><span>{m.afternoon}</span><span>{m.evening}</span>
              </div>
            ))}
            <p className="cp" style={{ margin: "18px 0 0" }}>Recorded by <span className="hand" style={{ textTransform: "none", letterSpacing: 0, fontSize: 14 }}>J. Wild</span></p>
          </div>
        </section>
      )}

      {post && (
        <section className="wrap" style={{ paddingTop: 70 }}>
          <Link href={`/journal/${post.slug}`} className="box" style={{ display: "flex", flexWrap: "wrap", textDecoration: "none" }}>
            <div style={{ flex: "1 1 380px", minHeight: 280 }}><Photo img={post.hero} sizes="(max-width: 800px) 100vw, 50vw" style={{ height: "100%", minHeight: 280 }} /></div>
            <div style={{ flex: "1 1 420px", padding: 40 }}>
              <p className="cp ox" style={{ margin: "0 0 12px" }}>From the Journal · No. {post.number}</p>
              <h2 className="cas card-heading" style={{ margin: "0 0 16px" }}>{post.title}</h2>
              {quotesOf(post.body)[1] && <p className="cas" style={{ margin: "0 0 18px", fontSize: 19, fontStyle: "italic", lineHeight: 1.5 }}>&ldquo;{quotesOf(post.body)[1]}&rdquo;</p>}
              <p className="cp" style={{ margin: 0 }}>{post.author} · {post.readMinutes} min read → Read the entry</p>
            </div>
          </Link>
        </section>
      )}

      {r.faqs.length > 0 && (
        <section className="wrap" style={{ paddingTop: 70, paddingBottom: 90, maxWidth: 980 }}>
          <p className="cp ox" style={{ margin: "0 0 14px" }}>Before you book</p>
          <h2 className="cas section-heading" style={{ margin: "0 0 26px" }}>Questions about {r.name}</h2>
          <div style={{ borderTop: "1.5px solid var(--charcoal)" }}>
            {r.faqs.map((f) => (
              <div key={f.question} style={{ borderBottom: "1px solid var(--stone)", padding: "22px 0" }}>
                <h3 className="cas card-heading" style={{ margin: "0 0 8px" }}>{f.question}</h3>
                <p className="body" style={{ margin: 0, fontSize: 16 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {r.credit && <p className="wrap cp caption muted" style={{ paddingBottom: 30 }}>{r.credit}</p>}
    </>
  );
}
