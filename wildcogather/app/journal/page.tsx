import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import JsonLd from "@/components/JsonLd";
import { getPosts, quotesOf } from "@/lib/journal";
import PageSketch from "@/components/PageSketch";

export const revalidate = 3600;
export const metadata: Metadata = {
  title: "The Journal — Why James Wild Chose Each House | Wild & Co Gatherings",
  description: "James Wild on the family resort residences in the Gatherings Ledger: why each one was chosen, where each generation should sleep, and what to know before you book.",
  alternates: { canonical: "/journal" },
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export default async function Journal() {
  const posts = await getPosts();
  return (
    <>
    <section className="wrap" style={{ paddingTop: 80, paddingBottom: 100 }}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Blog", name: "The Wild & Co Gatherings Journal", url: `${SITE}/journal`, author: { "@type": "Person", name: "James Wild" },
        blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${SITE}/journal/${p.slug}`, datePublished: p.date })) }} />
      <p className="eb" style={{ margin: "0 0 12px" }}>The Journal</p>
      <h1 className="dsp" style={{ margin: "14px 0 12px", fontSize: "clamp(40px, 5vw, 64px)" }}>Why it&apos;s in the Ledger</h1>
      <p className="body" style={{ margin: "0 0 50px", maxWidth: 640 }}>James Wild on each house he chose — and the ones he hasn&apos;t seen yet.</p>
      <div style={{ display: "grid", gap: 40 }}>
        {posts.map((p) => (
          <Link key={p.slug} href={`/journal/${p.slug}`} className="box" style={{ display: "flex", flexWrap: "wrap", textDecoration: "none" }}>
            <div style={{ flex: "1 1 380px", minHeight: 280 }}><Photo img={p.hero} sizes="(max-width: 800px) 100vw, 50vw" aspect="4:3" style={{ height: "100%", minHeight: 280 }} /></div>
            <div style={{ flex: "1 1 420px", padding: 40 }}>
              <p className="eb" style={{ margin: "0 0 12px" }}>No. {p.number} · {p.kicker}</p>
              <h2 className="ser" style={{ margin: "14px 0 16px", fontSize: 34, lineHeight: 1.15, fontWeight: 500 }}>{p.title}</h2>
              {quotesOf(p.body)[1] && <p className="it" style={{ margin: "0 0 18px", fontSize: 21, lineHeight: 1.45 }}>&ldquo;{quotesOf(p.body)[1]}&rdquo;</p>}
              <p className="cp" style={{ margin: 0, fontSize: 11 }}>{p.author} · {p.readMinutes} min read →</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
      <PageSketch k={"route"} label="The Journal" />
    </>
  );
}
