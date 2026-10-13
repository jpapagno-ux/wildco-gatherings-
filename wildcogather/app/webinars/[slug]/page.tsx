import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import Photo from "@/components/Photo";
import Film from "@/components/Film";
import LeadForm from "@/components/LeadForm";
import { JwcoSeal, TapedPhoto } from "@/components/Marks";
import { getWebinar, getWebinars, whenLabel } from "@/lib/webinars";
import { getResidences } from "@/lib/data";
import PageSketch from "@/components/PageSketch";

export const revalidate = 3600;
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export async function generateStaticParams() { return (await getWebinars()).map((w) => ({ slug: w.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const w = await getWebinar((await params).slug);
  if (!w) return {};
  return { title: `${w.title} | Webinar · Wild & Co Gatherings`, description: w.dek.slice(0, 158), alternates: { canonical: `/webinars/${w.slug}` } };
}

export default async function WebinarPage({ params }: { params: Promise<{ slug: string }> }) {
  const w = await getWebinar((await params).slug);
  if (!w) notFound();
  const all = await getResidences();
  const houses = w.houses.map((s) => all.find((h) => h.slug === s)).filter(Boolean) as typeof all;
  const url = `${SITE}/webinars/${w.slug}`;
  const live = w.status === "Scheduled" && w.registerUrl && w.startsAt;
  return (
    <>
    <article>
      {live && <JsonLd data={{
        "@context": "https://schema.org", "@type": "EducationEvent", name: w.title, description: w.dek, url, startDate: w.startsAt,
        endDate: new Date(new Date(w.startsAt!).getTime() + w.minutes * 60000).toISOString(),
        eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode", eventStatus: "https://schema.org/EventScheduled",
        location: { "@type": "VirtualLocation", url: w.registerUrl }, isAccessibleForFree: true,
        organizer: { "@type": "Organization", name: "Wild & Co Gatherings", url: SITE },
        performer: { "@type": "Person", name: w.host.name, jobTitle: w.host.title },
        audience: w.audience.map((a) => ({ "@type": "Audience", audienceType: a })),
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD", url: w.registerUrl, availability: "https://schema.org/InStock" },
      }} />}
      {w.recording && <JsonLd data={{ "@context": "https://schema.org", "@type": "VideoObject", name: w.title, description: w.dek, thumbnailUrl: `https://i.ytimg.com/vi/${w.recording}/hqdefault.jpg`, uploadDate: (w.startsAt || new Date().toISOString()).slice(0, 10), embedUrl: `https://www.youtube-nocookie.com/embed/${w.recording}` }} />}

      <header className="wrap" style={{ maxWidth: 940, paddingTop: 70, paddingBottom: 40, textAlign: "center" }}>
        <nav aria-label="Breadcrumb" className="cp muted" style={{ fontSize: 11, marginBottom: 26 }}><Link href="/webinars" style={{ textDecoration: "none" }}>Webinars</Link>{w.partner ? ` / ${w.partner}` : ""}</nav>
        <p className="eb" style={{ margin: "0 0 18px" }}>Webinar · on Livestorm · {w.minutes} minutes</p>
        <h1 className="ser" style={{ margin: 0, fontSize: "clamp(40px, 5.4vw, 70px)", lineHeight: 1.05, fontWeight: 400 }}>{w.title}</h1>
        <p className="it dek" style={{ margin: "24px auto 0", maxWidth: 720, fontSize: 25, lineHeight: 1.4 }}>{w.dek}</p>
        <p className="cp" style={{ margin: "24px 0 0", color: "var(--rust)" }}>{w.status === "Recorded" ? "Recorded session" : whenLabel(w)}</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginTop: 26 }}>
          {live ? <a href={w.registerUrl} target="_blank" rel="noopener" className="btn">Register on Livestorm</a> : w.status !== "Recorded" && <a href="#register" className="btn">Register interest</a>}
          <Link href="/advisors" className="lnk">For advisors <span>→</span></Link>
        </div>
      </header>

      {w.recording && <section className="navy" style={{ padding: "60px 0" }}><div className="wrap"><Film video={{ provider: "youtube", id: w.recording, title: w.title }} dark /></div></section>}

      <div className="wrap" style={{ maxWidth: 1100, display: "flex", flexWrap: "wrap", gap: 56, paddingTop: 30, paddingBottom: 60 }}>
        <aside style={{ flex: "1 1 260px", maxWidth: 320 }}>
          <div style={{ position: "relative", width: 240 }}>
            <TapedPhoto img={w.host.photo} caption={w.host.name} rotate={-2} tape="cream" height={220} sizes="220px" aspect="1:1" style={{ width: 240 }} />
          </div>
          <p className="ser" style={{ margin: "34px 0 4px", fontSize: 30 }}>{w.host.name}</p>
          <p className="cp muted" style={{ margin: 0 }}>{w.host.title}</p>
          <p className="lbl" style={{ margin: "26px 0 8px" }}>Who it's for</p>
          <ul className="body" style={{ margin: 0, paddingLeft: 20, fontSize: 15 }}>{w.audience.map((a) => <li key={a} style={{ marginBottom: 6 }}>{a}</li>)}</ul>
        </aside>
        <div style={{ flex: "3 1 560px", minWidth: 0 }}>
          <p className="eb">An introduction from James</p>
          <hr className="eb-rule" />
          {w.intro.map((p, i) => <p key={i} className="body" style={{ margin: i ? "0 0 20px" : "24px 0 20px", fontSize: i ? undefined : 19 }}>{p}</p>)}
          <div style={{ display: "flex", alignItems: "center", gap: 16, margin: "8px 0 40px" }}><JwcoSeal size={76} rotate={-6} /><p className="sig" style={{ margin: 0, fontSize: 38 }}>James Wild</p></div>
          <h2 className="dsp" style={{ margin: "0 0 16px", fontSize: 32 }}>What we'll cover</h2>
          <ol className="body" style={{ margin: 0, paddingLeft: 24 }}>{w.agenda.map((a) => <li key={a} style={{ marginBottom: 10 }}>{a}</li>)}</ol>
        </div>
      </div>

      {houses.length > 0 && (
        <section className="wrap" style={{ paddingTop: 30, paddingBottom: 80 }} aria-label="Houses in this webinar">
          <p className="eb">The houses</p>
          <hr className="eb-rule" />
          <div className="house-grid" style={{ marginTop: 26 }}>
            {houses.map((h) => {
              const img = h.images.find((i) => i.role === "Hero") || h.images[0];
              return (
                <Link key={h.slug} href={`/houses/${h.slug}`} className="house-card">
                  <Photo img={img} sizes="(max-width: 700px) 100vw, 380px" aspect="5:4" style={{ height: 280 }} />
                  <p className="cp muted" style={{ margin: "18px 0 0" }}>Entry {h.entryNo} · {h.place}</p>
                  <h3 className="ser" style={{ margin: "8px 0 0", fontSize: 26, fontWeight: 500 }}>{h.name}</h3>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {!live && w.status !== "Recorded" && (
        <section id="register" className="navy" aria-label="Register interest">
          <div className="wrap" style={{ paddingTop: 70, paddingBottom: 70, maxWidth: 900 }}>
            <p className="eb">Register interest</p>
            <h2 className="dsp" style={{ margin: "14px 0 10px", fontSize: "clamp(30px, 3.4vw, 44px)", color: "var(--on-dark)" }}>Save your seat</h2>
            <p className="body" style={{ margin: "0 0 26px", color: "rgba(244,241,236,.8)" }}>The date is being set. Leave your details and we'll send the Livestorm link the day registration opens.</p>
            <LeadForm id="webinar" dark occasion={`Webinar: ${w.title}`} from={`/webinars/${w.slug}`} submit="Save my seat" done="You're on the list — the Livestorm link will come to your inbox."
              fields={[
                { name: "name", label: "Your name", required: true },
                { name: "email", label: "Email", type: "email", required: true },
                { name: "role", label: "I'm joining as", type: "select", options: ["A travel advisor", "A family planning a gathering", "Other"] },
                { name: "agency", label: "Agency (advisors)" },
              ]} />
          </div>
        </section>
      )}
    </article>
      <PageSketch k={"route"} label="Webinars" />
    </>
  );
}
