import { fit } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { Stamp } from "@/components/Marks";
import { getPost, getPosts, blocks, quotesOf } from "@/lib/journal";
import { getResidence } from "@/lib/data";
import { getCollection } from "@/lib/collections";
import { VipStamp, JwcoSeal, Postmark, Icon } from "@/components/Marks";
import Film from "@/components/Film";
import { embedUrl, thumbUrl } from "@/lib/video";
import { getOgImageUrl } from "@/lib/cloudinary-loader";
import PageSketch from "@/components/PageSketch";
import { SITE } from "@/lib/site";
import { filmMakers } from "@/lib/wild-together";

export const revalidate = 3600;
const CLOUD = (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "").trim() || "jhlnq5h5";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getPost((await params).slug);
  if (!p) return fit({});
  return fit({
    title: p.seoTitle, description: p.metaDescription, alternates: { canonical: `/journal/${p.slug}` },
    authors: [{ name: p.author }],
    openGraph: { type: "article", title: p.title, description: p.metaDescription, publishedTime: p.date, authors: [p.author],
      images: p.hero ? [getOgImageUrl(p.hero)] : [] },
    robots: p.draft ? { index: false } : undefined,
  });
}

const date = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-US", { month: "long", year: "numeric" });

export default async function Entry({ params }: { params: Promise<{ slug: string }> }) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  const house = p.house ? await getResidence(p.house) : undefined;
  const coll = p.collection ? getCollection(p.collection) : undefined;
  const url = `${SITE}/journal/${p.slug}`;
  let fig = 1;

  return (
    <>
    <article>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BlogPosting", "@id": url, headline: p.title, description: p.metaDescription,
        datePublished: p.date, dateModified: p.date, mainEntityOfPage: url, wordCount: p.body.split(/\s+/).length,
        image: p.hero ? `https://res.cloudinary.com/${CLOUD}/image/upload/${p.hero.publicId}` : undefined,
        author: { "@type": "Person", name: p.author, jobTitle: p.authorTitle, ...(p.author === "James Wild" ? { url: `${SITE}/founder`, "@id": `${SITE}/founder#james-wild` } : {}), worksFor: { "@type": "Organization", name: "James Wild & Co" } },
        publisher: { "@type": "Organization", name: "Wild & Co Gatherings" },
        ...(house ? { about: { "@type": "LodgingBusiness", name: house.name, url: `${SITE}/houses/${house.slug}`, address: { "@type": "PostalAddress", addressLocality: house.place, addressRegion: house.region, addressCountry: house.country } } } : {}),
        // James's quotes, marked up so answer engines can attribute them to him
        hasPart: quotesOf(p.body).map((q) => ({ "@type": "Quotation", text: q, creator: { "@type": "Person", name: p.author } })),
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".dek", "blockquote"] },
      }} />
      {p.video && <JsonLd data={{ "@context": "https://schema.org", "@type": "VideoObject", "@id": `${url}#film`, name: p.video.title, description: p.video.description || p.dek, thumbnailUrl: thumbUrl(p.video) || undefined, uploadDate: p.video.uploadDate || p.date, embedUrl: embedUrl(p.video), contentUrl: `https://www.youtube.com/watch?v=${p.video.id}`, ...(p.video.credit ? { creditText: p.video.credit } : {}), ...filmMakers(p.video) }} />}
      {p.draft && <div className="cp" style={{ background: "var(--oxblood)", color: "var(--paper)", textAlign: "center", padding: "10px 20px" }}>Sample entry · quotes drafted in James&apos;s voice for his approval</div>}

      <header className="wrap" style={{ maxWidth: 900, paddingTop: 70, paddingBottom: 40, textAlign: "center" }}>
        <nav aria-label="Breadcrumb" className="cp muted" style={{ fontSize: 11, marginBottom: 26 }}><Link href="/journal" style={{ textDecoration: "none" }}>The Journal</Link> / No. {p.number}{house ? ` / Ledger Entry ${house.entryNo}` : ""}</nav>
        <p className="eb" style={{ margin: "0 0 18px" }}>{p.kicker}</p>
        <h1 className="ser" style={{ margin: 0, fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.05, fontWeight: 400 }}>{p.title}</h1>
        <p className="it dek" style={{ margin: "26px auto 0", maxWidth: 680, fontSize: 26, lineHeight: 1.4 }}>{p.dek}</p>
        <p className="cp" style={{ margin: "30px 0 0" }}>{p.author === "James Wild" ? <Link href="/founder" className="ser" style={{ fontSize: 18, textTransform: "none", letterSpacing: 0, textDecoration: "none" }}>{p.author}</Link> : <span className="ser" style={{ fontSize: 18, textTransform: "none", letterSpacing: 0 }}>{p.author}</span>} · {p.authorTitle} · {date(p.date)} · {p.readMinutes} min read</p>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 24 }}><Postmark place={house ? `${house.place} · ${house.region}` : coll ? coll.region : "James Wild & Co"} date={date(p.date)} width={250} /></div>
      </header>

      {p.hero && <figure className="wrap" style={{ margin: "0 auto 50px" }}><Photo img={p.hero} priority aspect="16:9" style={{ height: "min(70vh, 600px)" }} />{p.hero.caption && <figcaption className="cp muted" style={{ marginTop: 10, fontSize: 11 }}>{p.hero.caption}</figcaption>}</figure>}

      {(p.video || p.videoPlanned) && (
        <section className="navy" style={{ padding: "70px 0", margin: "0 0 60px" }} aria-label="The episode">
          <div className="wrap" style={{ maxWidth: 1100 }}>
            <p className="eb">The episode · Wild Together</p>
            <h2 className="dsp" style={{ margin: "14px 0 26px", fontSize: "clamp(30px, 3.4vw, 42px)", color: "var(--on-dark)" }}>{p.video?.title || p.videoPlanned}</h2>
            {p.video ? <Film video={p.video} dark /> : (
              <div style={{ position: "relative", paddingTop: "56.25%", background: "#111", border: "1px dashed rgba(244,241,236,.35)" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, textAlign: "center", padding: 20 }}>
                  <Icon name="camera" size={44} color="var(--on-dark-accent)" />
                  <p className="cp" style={{ margin: 0, color: "var(--on-dark-accent)" }}>Film to come · paste the YouTube ID in Airtable › Journal</p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="wrap" style={{ maxWidth: 1100, display: "flex", flexWrap: "wrap", gap: 56, paddingBottom: 60 }}>
        {house && (
          <aside style={{ flex: "1 1 260px", maxWidth: 300 }}>
            <div className="box" style={{ padding: "26px 28px", position: "sticky", top: 120 }}>
              <p className="lbl ox">At a glance</p>
              <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>
                {([["Where", `${house.place}, ${house.region}`], ["Sleeps", house.bedrooms || (house.sleeps ? `Up to ${house.sleeps}` : undefined)], ["Children", house.kidsProgram ? `${house.kidsProgram}${house.kidsAges ? `, ${house.kidsAges}` : ""}` : undefined], ["Fly into", house.airport], ["Status", house.stamp]] as [string, string | undefined][])
                  .filter(([, v]) => v).map(([k, v]) => <div key={k} className="fact" style={{ gridTemplateColumns: "90px 1fr" }}><dt className="cp muted" style={{ fontSize: 10 }}>{k}</dt><dd className="cpn" style={{ margin: 0, fontSize: 14 }}>{v}</dd></div>)}
              </dl>
              <Link href={`/houses/${house.slug}`} className="btn" style={{ marginTop: 22, width: "100%", boxSizing: "border-box", padding: "0 14px", fontSize: 12 }}>Ledger Entry {house.entryNo}</Link>
            </div>
          </aside>
        )}
        <div style={{ flex: "3 1 560px", minWidth: 0 }}>
          {blocks(p.body).map((b, i) => {
            if (b.kind === "h2") return <h2 key={i} className="dsp" style={{ margin: "48px 0 16px", fontSize: 32 }}>{b.text}</h2>;
            if (b.kind === "quote") return (
              <figure key={i} style={{ margin: "40px 0", padding: "30px 0 30px 34px", borderLeft: "2px solid var(--rust)" }}>
                <blockquote className="it" style={{ margin: 0, fontSize: 30, lineHeight: 1.35 }}>&ldquo;{b.text}&rdquo;</blockquote>
                <figcaption className="sig" style={{ marginTop: 16, fontSize: 28 }}>— {p.author === "James Wild" ? "J. W." : p.author}</figcaption>
              </figure>
            );
            if (b.kind === "list") return <ul key={i} className="body" style={{ margin: "0 0 22px", paddingLeft: 22 }}>{b.items.map((x) => <li key={x} style={{ marginBottom: 10 }}>{x}</li>)}</ul>;
            if (b.kind === "figure") { fig++; return (
              <figure key={i} style={{ margin: "40px 0" }}><Photo img={{ publicId: b.publicId, alt: b.caption.replace(/^Fig\. \d+ — /, "") }} sizes="(max-width: 800px) 100vw, 700px" aspect="5:3" style={{ height: 420 }} /><figcaption className="cp muted" style={{ marginTop: 10, fontSize: 11 }}>{b.caption || `Fig. ${fig}`}</figcaption></figure>
            ); }
            return <p key={i} className="body" style={{ margin: "0 0 22px", fontSize: i === 0 ? 19 : undefined }}>{b.text}</p>;
          })}
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 40 }}>
            <JwcoSeal size={92} rotate={-6} />
            <p className="sig" style={{ margin: 0, fontSize: 42 }}>{p.author}</p>
          </div>
          <p className="cp muted" style={{ margin: "8px 0 0", fontSize: 11 }}>{p.authorTitle} · Recorded {date(p.date)}</p>
        </div>
      </div>

      {house && (
        <section className="wrap" style={{ maxWidth: 1100, paddingBottom: 80 }}>
          <div className="box" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 30, padding: "34px 40px" }}>
            <Stamp kind={house.stamp} size={130} />
            <div style={{ flex: "1 1 360px" }}>
              <p className="eb" style={{ margin: "0 0 8px" }}>Ledger Entry {house.entryNo}</p>
              <p className="cas" style={{ margin: "0 0 8px", fontSize: 26 }}>{house.name} — the full entry</p>
              <p className="body" style={{ margin: 0, fontSize: 16 }}>Rooms, what&apos;s included and what isn&apos;t, booking terms, the film, and a sample Family Chapter.</p>
            </div>
            <Link href={`/houses/${house.slug}`} className="btn">See the house</Link>
          </div>
        </section>
      )}
      {coll && (
        <section className="wrap" style={{ maxWidth: 1100, paddingBottom: 80 }}>
          <div className="box" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 30, padding: "34px 40px" }}>
            <VipStamp size={170} note="Visit Aug 2027" />
            <div style={{ flex: "1 1 360px" }}>
              <p className="eb" style={{ margin: "0 0 8px" }}>Gatherings VIP · Vetted in Purpose</p>
              <p className="cas" style={{ margin: "0 0 8px", fontSize: 26 }}>{coll.name} — the stays</p>
              <p className="body" style={{ margin: 0, fontSize: 16 }}>Where to stay on each reserve, what&apos;s included, guide rates and James&apos;s route for August 2027.</p>
            </div>
            <Link href={`/vip/${coll.slug}`} className="btn">See the stays</Link>
          </div>
        </section>
      )}
    </article>
      <PageSketch k={house?.setting || "route"} label={house ? house.place : "The Journal"} />
    </>
  );
}
