import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { VipStamp } from "@/components/Marks";
import { collections, getCollection, VIP_MEANING } from "@/lib/collections";
import { getResidences } from "@/lib/data";
import { getPost } from "@/lib/journal";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export async function generateStaticParams() { return collections.map((c) => ({ collection: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ collection: string }> }): Promise<Metadata> {
  const c = getCollection((await params).collection);
  if (!c) return {};
  return { title: c.seoTitle, description: c.metaDescription, alternates: { canonical: `/vip/${c.slug}` }, openGraph: { title: c.seoTitle, description: c.metaDescription, images: [c.hero.publicId] } };
}

export default async function CollectionPage({ params }: { params: Promise<{ collection: string }> }) {
  const c = getCollection((await params).collection);
  if (!c) notFound();
  const houses = (await getResidences()).filter((r) => r.vip?.collectionSlug === c.slug);
  const post = c.journal ? await getPost(c.journal) : undefined;

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: `${c.name} — Gatherings VIP`, url: `${SITE}/vip/${c.slug}`,
        itemListElement: houses.map((h, i) => ({ "@type": "ListItem", position: i + 1, item: { "@type": "LodgingBusiness", name: h.name, url: `${SITE}/houses/${h.slug}`, address: { "@type": "PostalAddress", addressLocality: h.place, addressRegion: h.region, addressCountry: h.country }, image: h.images[0]?.publicId } })) }} />

      <section className="collection-hero" style={{ position: "relative" }}>
        <Photo img={c.hero} priority style={{ height: "min(78vh, 720px)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(43,43,43,0) 40%, rgba(43,43,43,.72) 100%)" }} />
        <div className="wrap collection-hero-copy" style={{ color: "var(--paper)" }}>
          <p className="cp" style={{ margin: "0 0 14px" }}>Gatherings VIP · Vetted in Purpose · {c.region}</p>
          <h1 className="disp hero-heading" style={{ margin: 0, letterSpacing: ".03em", textTransform: "uppercase" }}>{c.name}</h1>
          <p className="cas dek editorial-lead" style={{ margin: "18px 0 0", maxWidth: 720, fontStyle: "italic" }}>{c.tagline}</p>
        </div>
        <div className="collection-hero-stamp" style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,.4))" }}><VipStamp size={210} note="J.W. · Visit Aug 2027" tone="light" /></div>
      </section>

      <section className="wrap" style={{ paddingTop: 70, paddingBottom: 40, display: "flex", flexWrap: "wrap", gap: 56 }}>
        <div style={{ flex: "2 1 560px" }}>
          <p className="lbl ox">Why it carries the VIP stamp</p>
          <p className="cas" style={{ margin: "0 0 22px", fontSize: 26, lineHeight: 1.45 }}>{c.intro[0]}</p>
          {c.intro.slice(1).map((t) => <p key={t} className="body" style={{ margin: "0 0 18px" }}>{t}</p>)}
          <p className="hand ox" style={{ margin: 0, fontSize: 18 }}>— J. W.</p>
        </div>
        <div className="box" style={{ flex: "1 1 300px", padding: "28px 30px", alignSelf: "flex-start" }}>
          <p className="lbl">At a glance</p>
          <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>{c.facts.map(([k, v]) => <div key={k} className="fact"><dt className="cp muted">{k}</dt><dd className="cpn" style={{ margin: 0 }}>{v}</dd></div>)}</dl>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: 40 }}>
        <dl className="box" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 24, padding: "26px 34px", margin: 0 }}>
          {VIP_MEANING.map((m) => <div key={m.letter}><dt className="cas" style={{ fontSize: 20 }}><span className="disp ox" style={{ fontSize: 34, marginRight: 8 }}>{m.letter}</span>{m.word}</dt><dd className="body" style={{ margin: "6px 0 0" }}>{m.text}</dd></div>)}
        </dl>
      </section>

      {houses.map((h, i) => (
        <section key={h.slug} id={h.slug} className="wrap" style={{ paddingTop: 60, paddingBottom: 20 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 48, flexDirection: i % 2 ? "row-reverse" : "row" }}>
            <div style={{ flex: "1 1 520px", minWidth: 0 }}>
              <Photo img={h.images[0]} sizes="(max-width: 900px) 100vw, 50vw" style={{ height: 440 }} />
              <div style={{ display: "flex", gap: 12, marginTop: 12 }}>{h.images.slice(1, 4).map((im) => <div key={im.publicId} style={{ flex: 1 }}><Photo img={im} sizes="200px" style={{ height: 140 }} /></div>)}</div>
            </div>
            <div style={{ flex: "1 1 440px", minWidth: 0 }}>
              <p className="cp" style={{ margin: "0 0 10px" }}>Ledger Entry {h.entryNo} · {h.stamp}</p>
              <h2 className="disp section-heading" style={{ margin: 0, textTransform: "uppercase", letterSpacing: ".03em" }}>{h.name.replace(", a Ted Turner Reserve", "")}</h2>
              <p className="cp muted" style={{ margin: "10px 0 22px" }}>{h.place}, {h.region}</p>
              <p className="lbl ox">Why it&apos;s on my list</p>
              <p className="cas" style={{ margin: "0 0 6px", fontSize: 20, lineHeight: 1.5, fontStyle: "italic" }}>&ldquo;{h.vip?.why}&rdquo;</p>
              <p className="hand ox" style={{ margin: "0 0 22px", fontSize: 14 }}>— J. W.</p>
              <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>
                {([["Stay", h.bedrooms], ["Water", h.water], ["Fly into", h.airport], ["Guide rate", h.booking?.rateBasis]] as [string, string | undefined][]).filter(([, v]) => v).map(([k, v]) => <div key={k} className="fact"><dt className="cp muted">{k}</dt><dd className="cpn" style={{ margin: 0 }}>{v}</dd></div>)}
              </dl>
              <Link href={`/houses/${h.slug}`} className="btn" style={{ marginTop: 22 }}>The full entry</Link>
            </div>
          </div>
        </section>
      ))}

      <section aria-label="What your stay protects" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--sand)", borderBottom: "1px solid var(--sand)", padding: "80px 0", marginTop: 80 }}>
        <div className="wrap">
          <p className="cp ox" style={{ margin: "0 0 10px" }}>What your stay protects</p>
          <h2 className="cas section-heading" style={{ margin: "0 0 30px" }}>Living laboratories</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 24 }}>
            {c.protects.map((x) => <article key={x.name} className="box"><Photo img={x.image} sizes="(max-width: 700px) calc(100vw - 40px), (max-width: 1100px) 45vw, 380px" style={{ height: 200 }} /><div style={{ padding: 18 }}><h3 className="cas card-heading" style={{ margin: "0 0 8px" }}>{x.name}</h3><p className="body" style={{ margin: 0 }}>{x.text}</p></div></article>)}
          </div>
          {post && <Link href={`/journal/${post.slug}`} className="btn" style={{ marginTop: 36 }}>Read: {post.title}</Link>}
        </div>
      </section>

      {c.route && (
        <section className="wrap" style={{ paddingTop: 80, paddingBottom: 80 }}>
          <div className="box scroll-region" tabIndex={0} role="region" aria-label="Proposed visit route, scroll for all columns" style={{ padding: "34px var(--gutter)" }}>
            <p className="cp" style={{ margin: "0 0 14px", fontSize: 13, borderBottom: "1.5px solid var(--charcoal)", paddingBottom: 14 }}>J.W.&apos;s visit · August 2027 · proposed route</p>
            {c.route.map((r) => <div key={r.when} className="cpn" style={{ display: "grid", gridTemplateColumns: "100px minmax(0,1fr) minmax(0,2fr)", gap: 16, padding: "14px 0", borderBottom: "1px solid var(--stone)", minWidth: 640 }}><span className="cp">{r.when}</span><span className="cas" style={{ fontSize: 19 }}>{r.where}</span><span>{r.what}</span></div>)}
          </div>
        </section>
      )}
      <p className="wrap cp caption muted" style={{ paddingBottom: 30 }}>{c.credit}</p>
    </>
  );
}
