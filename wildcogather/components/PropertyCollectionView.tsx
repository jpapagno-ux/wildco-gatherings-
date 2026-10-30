import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import Film from "@/components/Film";
import StayCard from "@/components/StayCard";
import PageSketch from "@/components/PageSketch";
import { Stamp, VipStamp } from "@/components/Marks";
import { collectionPath, VIP_MEANING, type PropertyCollection } from "@/lib/collections";
import { MORE_COLLECTION_SLUG, MORE_FAQS, MORE_PAIRINGS, moreVilla } from "@/lib/more";
import { getResidences } from "@/lib/data";
import { buildCloudinaryUrl } from "@/lib/cloudinary-loader";
import { embedUrl, thumbUrl, watchUrl } from "@/lib/video";
import { SITE } from "@/lib/site";
import { filmMakers } from "@/lib/wild-together";
import { scrub } from "@/lib/scrub";
import { entityForHouse } from "@/lib/entities";

// A partner's houses on one page (lib/collections.ts › propertyCollections): the houses, the pairings between them,
// the film, the family questions (FAQPage), the credit and the facts. Cross-sell stays inside Gatherings; no partner links.
// With `vip` (a Gatherings VIP collection, e.g. /vip/more) the page also carries the VIP stamp, the Vetted in Purpose
// meaning and each house's VIP stamp and "why it's on my list"; without it (/collections/[slug]) it has no VIP stamp.
export default async function PropertyCollectionView({ collection }: { collection: PropertyCollection }) {
  // scrub() hides review notes such as [Draft — J.W. to approve] from the page, as it does for houses.
  const c = scrub(collection);
  const vip = !!c.vip;
  const path = collectionPath(c);
  const all = await getResidences();
  // Only houses whose rows are visible appear; the order is the collection's own.
  const houses = c.houses.map((s) => all.find((h) => h.slug === s)).filter((h): h is NonNullable<typeof h> => !!h);
  const isMore = c.slug === MORE_COLLECTION_SLUG;
  const shown = new Set(houses.map((h) => h.slug));
  const pairings = isMore ? MORE_PAIRINGS.filter((p) => p.houses.every((s) => shown.has(s))) : [];
  const faqs = isMore ? scrub(MORE_FAQS) : [];
  const byslug = (s: string) => houses.find((h) => h.slug === s);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: `${c.name} — ${vip ? "Gatherings VIP" : "Wild & Co Gatherings"}`, url: `${SITE}${path}`, numberOfItems: houses.length,
        itemListElement: houses.map((h, i) => ({ "@type": "ListItem", position: i + 1, item: {
          "@type": ["LodgingBusiness", "VacationRental"], name: h.name, url: `${SITE}/houses/${h.slug}`,
          identifier: [h.entryNo, entityForHouse(h.slug)?.id].filter(Boolean),
          address: { "@type": "PostalAddress", addressLocality: h.place, addressRegion: h.region, addressCountry: h.country },
          ...(h.sleeps ? { occupancy: { "@type": "QuantitativeValue", maxValue: h.sleeps } } : {}),
          image: h.images[0] ? { "@type": "ImageObject", contentUrl: buildCloudinaryUrl({ src: h.images[0].publicId, width: 1200, quality: "auto" }), creditText: c.credit } : undefined,
        } })) }} />
      {faqs.length > 0 && <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) }} />}
      {(c.films || []).map((v) => (
        <JsonLd key={v.id} data={{ "@context": "https://schema.org", "@type": "VideoObject", name: v.title, description: v.description || `${v.title} — ${c.name}`, thumbnailUrl: thumbUrl(v) || undefined, embedUrl: embedUrl(v), contentUrl: watchUrl(v), ...(v.credit ? { creditText: v.credit } : {}), ...filmMakers(v) }} />
      ))}
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Wild & Co Gatherings", item: `${SITE}/` },
        vip ? { "@type": "ListItem", position: 2, name: "Gatherings VIP", item: `${SITE}/vip` } : { "@type": "ListItem", position: 2, name: "The Houses", item: `${SITE}/houses` },
        { "@type": "ListItem", position: 3, name: c.name, item: `${SITE}${path}` },
      ] }} />

      <section style={{ position: "relative" }}>
        <Photo img={c.hero} priority style={{ height: "min(78vh, 720px)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(30,42,56,0) 40%, rgba(30,42,56,.72) 100%)" }} />
        <div className="wrap" style={{ position: "absolute", left: 0, right: 0, bottom: 56, color: "var(--paper)" }}>
          <p className="eb" style={{ margin: "0 0 14px", color: "#F0D9C6" }}>{vip ? "Gatherings VIP · Vetted in Purpose" : "A collection"} · {c.partner} · {c.region}</p>
          <h1 className="dsp" style={{ margin: 0, fontSize: "clamp(48px, 7vw, 100px)" }}>{c.name}</h1>
          <p className="cas dek" style={{ margin: "18px 0 0", maxWidth: 720, fontSize: 22, lineHeight: 1.45, fontStyle: "italic" }}>{c.tagline}</p>
        </div>
        {vip && <div style={{ position: "absolute", right: 48, top: 44, filter: "drop-shadow(0 1px 3px rgba(0,0,0,.4))" }}><VipStamp size={210} note={c.stampNote} tone="light" /></div>}
      </section>

      <section className="wrap" style={{ paddingTop: 70, paddingBottom: 40, display: "flex", flexWrap: "wrap", gap: 56 }}>
        <div style={{ flex: "2 1 560px" }}>
          <p className="lbl ox">{vip ? "Why it carries the VIP stamp" : "Why these houses"}</p>
          <p className="cas" style={{ margin: "0 0 22px", fontSize: 26, lineHeight: 1.45 }}>{c.intro[0]}</p>
          {c.intro.slice(1).map((t) => <p key={t} className="body" style={{ margin: "0 0 18px" }}>{t}</p>)}
          <p className="sig" style={{ margin: 0, fontSize: 34 }}>— J. W.</p>
        </div>
        <div className="box" style={{ flex: "1 1 300px", padding: "28px 30px", alignSelf: "flex-start" }}>
          <p className="lbl">At a glance</p>
          <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>{c.facts.map(([k, v]) => <div key={k} className="fact"><dt className="cp muted" style={{ fontSize: 11 }}>{k}</dt><dd className="cpn" style={{ margin: 0 }}>{v}</dd></div>)}</dl>
        </div>
      </section>

      {vip && (
        <section className="wrap" style={{ paddingBottom: 40 }} aria-label="What VIP means">
          <dl className="box" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 24, padding: "26px 34px", margin: 0 }}>
            {VIP_MEANING.map((m) => <div key={m.letter}><dt className="cas" style={{ fontSize: 20 }}><span className="disp ox" style={{ fontSize: 34, marginRight: 8 }}>{m.letter}</span>{m.word}</dt><dd className="body" style={{ margin: "6px 0 0", fontSize: 15 }}>{m.text}</dd></div>)}
          </dl>
        </section>
      )}

      {houses.map((h, i) => {
        const v = isMore ? moreVilla(h.slug) : undefined;
        return (
          <section key={h.slug} id={h.slug} className="wrap" style={{ paddingTop: 60, paddingBottom: 20 }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 48, flexDirection: i % 2 ? "row-reverse" : "row" }}>
              <div style={{ flex: "1 1 520px", minWidth: 0 }}>
                <Photo img={h.images.find((x) => x.role === "Hero") || h.images[0]} sizes="(max-width: 900px) 100vw, 50vw" style={{ height: 440 }} />
                <div style={{ display: "flex", gap: 12, marginTop: 12 }}>{h.images.filter((x) => x.role !== "Hero").slice(0, 3).map((im) => <div key={im.publicId} style={{ flex: 1 }}><Photo img={im} sizes="200px" style={{ height: 140 }} /></div>)}</div>
              </div>
              <div style={{ flex: "1 1 440px", minWidth: 0 }}>
                <div style={{ float: "right", margin: "-6px -6px 10px 16px" }}>{vip && h.vip ? <VipStamp setting={h.setting} size={150} rotate={7} /> : <Stamp kind={h.stamp} size={120} />}</div>
                <p className="cp" style={{ margin: "0 0 10px" }}>Ledger Entry {h.entryNo} · {h.stamp}</p>
                <h2 className="dsp" style={{ margin: 0, fontSize: "clamp(32px, 3.4vw, 46px)", hyphens: "manual" }}>{h.name}</h2>
                <p className="cp muted" style={{ margin: "10px 0 22px" }}>{v?.where || `${h.place}, ${h.region}`}</p>
                {vip && h.vip?.why ? (
                  <>
                    <p className="lbl ox" style={{ clear: "both" }}>Why it&apos;s on my list</p>
                    <p className="ser" style={{ margin: "0 0 6px", fontSize: 21, lineHeight: 1.5, fontStyle: "italic" }}>&ldquo;{h.vip.why}&rdquo;</p>
                    <p className="sig" style={{ margin: "0 0 14px", fontSize: 27 }}>— J. W.</p>
                    <p className="body" style={{ margin: "0 0 22px", fontSize: 16 }}>{h.line}</p>
                  </>
                ) : <p className="ser" style={{ margin: "0 0 22px", fontSize: 21, lineHeight: 1.5, fontStyle: "italic", clear: "both" }}>{h.line}</p>}
                <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>
                  {([["Family fit", vip ? h.vip?.fit : undefined], ["Sleeps", v ? `${v.adults + v.children} (${v.adults} adults, ${v.children} children)` : h.sleeps ? `Up to ${h.sleeps}` : undefined], ["Rooms", h.bedrooms], ["Children", h.kidsProgram ? `${h.kidsProgram}${h.kidsAges ? ` · ${h.kidsAges}` : ""}` : undefined], ["Fly into", h.airport]] as [string, string | undefined][]).filter(([, x]) => x).map(([k, x]) => <div key={k} className="fact"><dt className="cp muted" style={{ fontSize: 11 }}>{k}</dt><dd className="cpn" style={{ margin: 0 }}>{x}</dd></div>)}
                </dl>
                <Link href={`/houses/${h.slug}`} className="btn" style={{ marginTop: 22 }}>The full entry</Link>
              </div>
            </div>
          </section>
        );
      })}

      {pairings.length > 0 && (
        <section className="band" style={{ padding: "90px 0", marginTop: 80 }} aria-labelledby="pair-h">
          <div className="wrap">
            <p className="eb">Two villas, one journey</p>
            <hr className="eb-rule" />
            <h2 id="pair-h" className="dsp" style={{ margin: "28px 0 30px", fontSize: 44 }}>Pair the villas</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", gap: 24 }}>
              {pairings.map((p) => (
                <article key={p.title} className="box" style={{ padding: "26px 28px" }}>
                  <h3 className="cas" style={{ margin: "0 0 8px", fontSize: 24 }}>{p.title}</h3>
                  <p className="cp muted" style={{ margin: "0 0 12px" }}>{p.houses.map((s) => byslug(s)?.name).join(" + ")}</p>
                  <p className="body" style={{ margin: "0 0 18px", fontSize: 15 }}>{p.why}</p>
                  <Link href={`/plan?house=${p.houses[0]}&also=${p.houses[1]}`} className="lnk">Plan both villas <span>→</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {c.films && c.films.length > 0 && (
        <section className="navy" style={{ padding: "90px 0" }} aria-label="The film">
          <div className="wrap">
            <p className="eb">Wild Together</p>
            <h2 className="dsp" style={{ margin: "16px 0 34px", fontSize: 46, color: "var(--on-dark)" }}>James and Miriam at Monwana</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", gap: 28 }}>
              {c.films.map((v) => <Film key={v.id} video={v} dark />)}
            </div>
          </div>
        </section>
      )}

      {faqs.length > 0 && (
        <section className="wrap" style={{ paddingTop: 100, paddingBottom: 60, maxWidth: 960 }}>
          <p className="eb">Before you book</p>
          <hr className="eb-rule" />
          <h2 className="dsp" style={{ margin: "28px 0 26px", fontSize: 40 }}>Questions families ask about {c.name.replace(/^The /, "the ")}</h2>
          <div style={{ borderTop: "1px solid var(--charcoal)" }}>
            {faqs.map((f) => (
              <div key={f.question} style={{ borderBottom: "1px solid var(--stone)", padding: "24px 0" }}>
                <h3 className="ser" style={{ margin: "0 0 8px", fontSize: 24, fontWeight: 500 }}>{f.question}</h3>
                <p className="body" style={{ margin: 0, fontSize: 16 }}>{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {houses.length > 0 && (
        <section className="wrap" style={{ paddingTop: 40, paddingBottom: 60 }} aria-label="All the villas">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", gap: 32 }}>
            {houses.map((h) => <StayCard key={h.slug} r={h} sizes="300px" />)}
          </div>
          <p style={{ margin: "40px 0 0" }}><Link href={`/plan?trip=${encodeURIComponent(c.name)}`} className="btn">Plan a gathering in these villas</Link></p>
        </section>
      )}
      <p className="wrap cp muted" style={{ fontSize: 11, paddingBottom: 30 }}>{c.credit}</p>
      <PageSketch k={houses[0]?.setting || "route"} label={c.name} />
    </>
  );
}
