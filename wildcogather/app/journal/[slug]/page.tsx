import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { Stamp } from "@/components/Marks";
import { getPost, getPosts, blocks, quotesOf } from "@/lib/journal";
import { getResidence } from "@/lib/data";
import { getCollection } from "@/lib/collections";
import { VipStamp, JwcoSeal } from "@/components/Marks";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD || "jhlnq5h5";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = await getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.seoTitle, description: p.metaDescription, alternates: { canonical: `/journal/${p.slug}` },
    authors: [{ name: p.author }],
    openGraph: { type: "article", title: p.title, description: p.metaDescription, publishedTime: p.date, authors: [p.author],
      images: p.hero ? [`https://res.cloudinary.com/${CLOUD}/image/upload/f_jpg,q_auto,w_1200,h_630,c_fill/${p.hero.publicId}`] : [] },
    robots: p.draft ? { index: false } : undefined,
  };
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
    <article>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BlogPosting", "@id": url, headline: p.title, description: p.metaDescription,
        datePublished: p.date, dateModified: p.date, mainEntityOfPage: url, wordCount: p.body.split(/\s+/).length,
        image: p.hero ? `https://res.cloudinary.com/${CLOUD}/image/upload/${p.hero.publicId}` : undefined,
        author: { "@type": "Person", name: p.author, jobTitle: p.authorTitle, worksFor: { "@type": "Organization", name: "James Wild & Co" } },
        publisher: { "@type": "Organization", name: "Wild & Co Gatherings" },
        ...(house ? { about: { "@type": "LodgingBusiness", name: house.name, url: `${SITE}/houses/${house.slug}`, address: { "@type": "PostalAddress", addressLocality: house.place, addressRegion: house.region, addressCountry: house.country } } } : {}),
        // James's quotes, marked up so answer engines can attribute them to him
        hasPart: quotesOf(p.body).map((q) => ({ "@type": "Quotation", text: q, creator: { "@type": "Person", name: p.author } })),
        speakable: { "@type": "SpeakableSpecification", cssSelector: [".dek", "blockquote"] },
      }} />
      {p.draft && <div className="cp" style={{ background: "var(--oxblood)", color: "var(--paper)", textAlign: "center", padding: "10px 20px" }}>Sample entry · quotes drafted in James&apos;s voice for his approval</div>}

      <header className="wrap" style={{ maxWidth: 900, paddingTop: 70, paddingBottom: 40, textAlign: "center" }}>
        <nav aria-label="Breadcrumb" className="cp muted" style={{ marginBottom: 26 }}><Link href="/journal" style={{ textDecoration: "none" }}>The Journal</Link> / No. {p.number}{house ? ` / Ledger Entry ${house.entryNo}` : ""}</nav>
        <p className="cp ox" style={{ margin: "0 0 18px" }}>{p.kicker}</p>
        <h1 className="disp hero-heading" style={{ margin: 0, letterSpacing: ".02em" }}>{p.title}</h1>
        <p className="cas dek editorial-lead" style={{ margin: "26px auto 0", maxWidth: 680, fontStyle: "italic" }}>{p.dek}</p>
        <p className="cp" style={{ margin: "30px 0 0" }}><span className="cas" style={{ fontSize: 16, textTransform: "none", letterSpacing: 0 }}>{p.author}</span> · {p.authorTitle} · {date(p.date)} · {p.readMinutes} min read</p>
      </header>

      {p.hero && <figure className="wrap" style={{ margin: "0 auto 50px" }}><Photo img={p.hero} priority style={{ height: "min(70vh, 600px)" }} />{p.hero.caption && <figcaption className="cp caption muted" style={{ marginTop: 10 }}>{p.hero.caption}</figcaption>}</figure>}

      <div className="wrap" style={{ maxWidth: 1100, display: "flex", flexWrap: "wrap", gap: 56, paddingBottom: 60 }}>
        {house && (
          <aside style={{ flex: "1 1 260px", maxWidth: 300 }}>
            <div className="box journal-sidebar" style={{ padding: "26px 28px" }}>
              <p className="lbl ox">At a glance</p>
              <dl style={{ margin: 0, borderTop: "1px solid var(--charcoal)" }}>
                {([["Where", `${house.place}, ${house.region}`], ["Sleeps", house.bedrooms || (house.sleeps ? `Up to ${house.sleeps}` : undefined)], ["Children", house.kidsProgram ? `${house.kidsProgram}${house.kidsAges ? `, ${house.kidsAges}` : ""}` : undefined], ["Fly into", house.airport], ["Status", house.stamp]] as [string, string | undefined][])
                  .filter(([, v]) => v).map(([k, v]) => <div key={k} className="fact"><dt className="cp muted">{k}</dt><dd className="cpn" style={{ margin: 0 }}>{v}</dd></div>)}
              </dl>
              <Link href={`/houses/${house.slug}`} className="btn" style={{ marginTop: 22, width: "100%", boxSizing: "border-box", padding: "0 14px", fontSize: 12 }}>Ledger Entry {house.entryNo}</Link>
            </div>
          </aside>
        )}
        <div className="reading-column" style={{ flex: "3 1 560px", minWidth: 0 }}>
          {blocks(p.body).map((b, i) => {
            if (b.kind === "h2") return <h2 key={i} className="cas section-heading" style={{ margin: "44px 0 16px" }}>{b.text}</h2>;
            if (b.kind === "quote") return (
              <figure key={i} style={{ margin: "40px 0", padding: "30px 0 30px 34px", borderLeft: "3px solid var(--oxblood)" }}>
                <blockquote className="cas editorial-lead" style={{ margin: 0, fontStyle: "italic" }}>&ldquo;{b.text}&rdquo;</blockquote>
                <figcaption className="hand ox" style={{ marginTop: 16, fontSize: 15 }}>— {p.author === "James Wild" ? "J. W." : p.author}</figcaption>
              </figure>
            );
            if (b.kind === "list") return <ul key={i} className="body" style={{ margin: "0 0 22px", paddingLeft: 22 }}>{b.items.map((x) => <li key={x} style={{ marginBottom: 10 }}>{x}</li>)}</ul>;
            if (b.kind === "figure") { fig++; return (
              <figure key={i} style={{ margin: "40px 0" }}><Photo img={{ publicId: b.publicId, alt: b.caption.replace(/^Fig\. \d+ — /, "") }} sizes="(max-width: 800px) 100vw, 700px" style={{ height: 420 }} /><figcaption className="cp caption muted" style={{ marginTop: 10 }}>{b.caption || `Fig. ${fig}`}</figcaption></figure>
            ); }
            return <p key={i} className="body" style={{ margin: "0 0 22px" }}>{b.text}</p>;
          })}
          <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 40 }}>
            <JwcoSeal size={92} rotate={-6} />
            <p className="hand ox" style={{ margin: 0, fontSize: 22 }}>{p.author}</p>
          </div>
          <p className="cp muted" style={{ margin: "8px 0 0" }}>{p.authorTitle} · Recorded {date(p.date)}</p>
        </div>
      </div>

      {house && (
        <section className="wrap" style={{ maxWidth: 1100, paddingBottom: 80 }}>
          <div className="box" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 30, padding: "34px 40px" }}>
            <div style={{ flex: "none", transform: "scale(.6)", transformOrigin: "left center", width: 130 }}><Stamp kind={house.stamp} /></div>
            <div style={{ flex: "1 1 360px" }}>
              <p className="cp ox" style={{ margin: "0 0 8px" }}>Ledger Entry {house.entryNo}</p>
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
            <VipStamp size={150} note="J.W. · Visit Aug 2027" />
            <div style={{ flex: "1 1 360px" }}>
              <p className="cp ox" style={{ margin: "0 0 8px" }}>Gatherings VIP · Vetted in Purpose</p>
              <p className="cas" style={{ margin: "0 0 8px", fontSize: 26 }}>{coll.name} — the stays</p>
              <p className="body" style={{ margin: 0, fontSize: 16 }}>Where to stay on each reserve, what&apos;s included, guide rates and James&apos;s route for August 2027.</p>
            </div>
            <Link href={`/vip/${coll.slug}`} className="btn">See the stays</Link>
          </div>
        </section>
      )}
    </article>
  );
}
