import Link from "next/link";
import Photo from "@/components/Photo";
import Film from "@/components/Film";
import Strip from "@/components/Strip";
import LedgerTable from "@/components/LedgerTable";
import JsonLd from "@/components/JsonLd";
import { JwcoSeal, TapedPhoto, Icon } from "@/components/Marks";
import { SETTINGS, SETTING_ORDER } from "@/lib/settings";
import { getResidences, dms } from "@/lib/data";
import { getPostForHouse } from "@/lib/journal";
import { getHorizon } from "@/lib/horizon";
import HorizonCard from "@/components/HorizonCard";

export const revalidate = 3600;
const LEDGER_PREVIEW = 8;

const FORMULA: [string, string][] = [
  ["Room to gather", "One table for all of you, a door to close for each branch."],
  ["A day for every age", "Programs for children, real adventure for teens, an easy pace for elders."],
  ["Water within reach", "A river, a lake or a harbour — boat days belong in the plan."],
  ["Country at the door", "Land to step straight into, with guides who live there."],
  ["A resort behind you", "Kitchens, housekeeping and a safety net. Nobody spends the week as host."],
  ["Worth returning to", "The start of a family tradition, not a single trip."],
];

const FAQS = [
  { q: "What is a resort residence?", a: "A private, multi-bedroom home inside or beside a resort: your own space and kitchen, with the resort's dining, housekeeping, children's programs and activities close at hand." },
  { q: "Is a resort residence better than a villa for a family reunion?", a: "For three generations, usually. You keep a villa's privacy, nobody has to run the house, and every age has something waiting." },
  { q: "How does James vet each house?", a: "Against the six tests of the Gathering Formula, drawing on forty-four years of travel. He has met the team at every house in the Ledger, and each one carries the stamp it has earned, from Host met to Founder favorite." },
];

export default async function Home() {
  const all = await getResidences();
  const lead = all[0];
  const hero = lead.images.find((i) => i.role === "Hero") || lead.images[0];
  const card = lead.images.find((i) => i.role === "Card") || lead.images[1];
  const strip = all.flatMap((r) => r.images.filter((i) => i.role === "Gallery strip").map((i) => ({ ...i, house: r.name }))).slice(0, 8);
  const feature = lead.images.find((i) => i.role === "Feature");
  const featured = all.find((r) => r.featured);
  const featuredPost = featured ? await getPostForHouse(featured.slug) : undefined;
  const horizon = (await getHorizon()).slice(0, 3);
  const settings = SETTING_ORDER.map((k) => ({ s: SETTINGS[k], rows: all.filter((r) => r.setting === k) })).filter((g) => g.rows.length);

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />

      <section className="hero" aria-label="Wild & Co Gatherings">
        <Photo img={hero} priority style={{ position: "absolute", inset: 0 }} />
        <div className="shade" />
        <div className="ledger-col">
          <div><p className="k">Ledger entry</p><p className="v">No. {lead.entryNo}</p></div>
          {lead.lat != null && <div><p className="k">Coordinates</p><p className="v">{dms(lead.lat, lead.lng).replace("   ", "\n")}</p></div>}
          <div><p className="k">Houses</p><p className="v">{String(all.length).padStart(2, "0")}</p></div>
          <div><p className="k">Settings</p><p className="v">{String(settings.length).padStart(2, "0")}</p></div>
          <div><p className="k">Since</p><p className="v">1982</p></div>
        </div>
        <div className="title">
          <p className="eb" style={{ color: "#F0D9C6" }}>Curated from experience</p>
          <h1 className="dsp" style={{ margin: "18px 0 0", fontSize: "clamp(48px, 7vw, 96px)", color: "var(--on-dark)" }}>One house.<br />Every generation.</h1>
          <p className="ser" style={{ margin: "18px 0 26px", fontStyle: "italic", fontSize: "clamp(22px, 2.4vw, 30px)" }}>Resort residences for families travelling across generations.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}>
            <Link href="/houses" className="btn">Explore the houses</Link>
            <Link href="/plan" className="lnk" style={{ color: "var(--on-dark)", borderColor: "var(--on-dark)" }}>Let James guide you</Link>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 110, paddingBottom: 100, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 440px), 1fr))", gap: 72, alignItems: "start" }}>
        <div>
          <p className="eb">By land &amp; water</p>
          <hr className="eb-rule" />
          <h2 className="dsp" style={{ margin: "30px 0 0", fontSize: "clamp(40px, 4.8vw, 64px)" }}>The house is where<br />you gather</h2>
          <p className="it" style={{ fontSize: 30, lineHeight: 1.3, margin: "26px 0 0" }}>What lies beyond it is the reason.</p>
          <p className="body" style={{ maxWidth: 540, margin: "26px 0 0" }}>A room for every branch, a table for all of you, and days planned so the youngest and the eldest both come home with a story. Each house is chosen by James Wild after forty-four years on the road.</p>
          <hr className="rule" style={{ width: 56, margin: "34px 0 22px" }} />
          <p className="eb" style={{ fontSize: 12 }}>Discovered by James Wild. Chosen for your family.</p>
          <p className="lab" style={{ margin: "8px 0 0", color: "var(--body)" }}>Still going since 1982.</p>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 26 }}>
            <JwcoSeal size={130} rotate={-5} />
            <p className="sig" style={{ margin: 0, fontSize: 46, lineHeight: 1 }}>James Wild</p>
          </div>
        </div>
        <div style={{ paddingTop: 40, display: "grid", gap: 48, justifyItems: "center" }}>
          <TapedPhoto img={card} caption={card?.caption ? `${lead.name.split(",")[0]} — ${card.caption}` : undefined} rotate={2} height={380} style={{ width: "100%", maxWidth: 440 }} />
          <Link href="/ledger" className="btn btn-o">Open the Ledger</Link>
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

      <section className="band" style={{ padding: "80px 0" }} aria-label="For families and for advisors">
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))", gap: 50 }}>
          <div>
            <p className="eb">For families</p>
            <h2 className="dsp" style={{ margin: "14px 0 12px", fontSize: "clamp(30px, 3.4vw, 42px)" }}>One house for every generation</h2>
            <p className="body" style={{ margin: "0 0 20px" }}>Villas, ranches, lodges and safari houses that sleep the whole family — with a day for every age, from the youngest to the eldest, and one long table at night.</p>
            <Link href="/plan" className="btn">Plan a gathering</Link>
          </div>
          <div>
            <p className="eb">For travel advisors</p>
            <h2 className="dsp" style={{ margin: "14px 0 12px", fontSize: "clamp(30px, 3.4vw, 42px)" }}>Advisor-led, always</h2>
            <p className="body" style={{ margin: "0 0 20px" }}>Vetted houses, the family facts your clients ask for, host webinars and first word on new openings. We're always looking for advisors who care how a family remembers the trip.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 18, alignItems: "center" }}><Link href="/advisors" className="btn btn-o">For advisors</Link><Link href="/webinars" className="lnk">Webinars <span>→</span></Link></div>
          </div>
        </div>
      </section>

      <section className="band" style={{ padding: "100px 0" }} aria-label="Houses by natural setting">
        <div className="wrap" style={{ textAlign: "center" }}>
          <p className="eb">Recorded from experience</p>
          <h2 className="dsp" style={{ margin: "16px 0 0", fontSize: "clamp(36px, 4vw, 50px)" }}>Worth another night</h2>
          <p className="it" style={{ margin: "14px 0 50px", fontSize: 24 }}>Houses grouped by the land around them.</p>
          <div className="house-grid">
            {settings.map(({ s, rows }) => {
              const img = rows[0].images.find((i) => i.role === "Hero") || rows[0].images[0];
              return (
                <Link key={s.key} href={`/houses#${s.key}`} className="house-card">
                  <Photo img={img} sizes="(max-width: 700px) 100vw, 380px" aspect="6:5" style={{ height: 320 }} />
                  <h3 className="lab" style={{ margin: "22px 0 0", letterSpacing: ".3em", display: "inline-flex", alignItems: "center", gap: 10 }}><Icon name={s.key} size={22} color={s.ink} />{s.name}</h3>
                  <hr style={{ width: 30, height: 1, border: 0, background: s.ink, margin: "12px auto" }} />
                  <p className="cp muted" style={{ margin: 0 }}>{rows.length} {rows.length === 1 ? "house" : "houses"} · {s.sub}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {strip.length > 0 && (
        <section aria-label="Archive" style={{ padding: "90px 0 40px" }}>
          <Strip label="From the archive" title="The days together">
            {strip.map((img, i) => (
              <figure key={img.publicId} style={{ margin: i % 2 ? "50px 0 0" : 0 }}>
                <TapedPhoto img={img} caption={img.caption} rotate={i % 2 ? 1 : -1.2} tape={i % 3 === 1 ? "cream" : "kraft"} sizes="360px" height={i % 3 === 2 ? 300 : 400} style={{ width: i % 3 === 2 ? 440 : 350, maxWidth: "78vw" }} />
                <p className="cp muted" style={{ margin: "16px 0 0" }}>Fig. {String(i + 1).padStart(2, "0")} — {img.house}</p>
              </figure>
            ))}
          </Strip>
        </section>
      )}

      <section className="wrap" style={{ paddingTop: 100, paddingBottom: 100, display: "flex", flexWrap: "wrap", gap: 64 }}>
        <div style={{ flex: "1 1 320px", maxWidth: 400 }}>
          <p className="eb">The Gathering Formula</p>
          <hr className="eb-rule" />
          <h2 className="dsp" style={{ margin: "28px 0 22px", fontSize: 44 }}>Six tests. Every house passes all of them.</h2>
          <p className="body" style={{ margin: 0 }}>The James Wild &amp; Co way, written for families. A house that fails one is not entered in the Ledger.</p>
        </div>
        <ol style={{ flex: "2 1 560px", listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--charcoal)" }}>
          {FORMULA.map(([t, n], i) => (
            <li key={t} style={{ display: "grid", gridTemplateColumns: "70px 1fr", gap: 16, padding: "20px 0", borderBottom: "1px solid var(--stone)" }}>
              <span className="mono ox">{String(i + 1).padStart(2, "0")}</span>
              <div><p className="ser" style={{ margin: "0 0 4px", fontSize: 25, fontWeight: 500 }}>{t}</p><p className="body" style={{ margin: 0, fontSize: 16 }}>{n}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="band" style={{ padding: "90px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
            <div><p className="eb">A personal archive</p><h2 className="dsp" style={{ margin: "14px 0 0", fontSize: 44 }}>The Gatherings Ledger</h2></div>
            <p className="cp muted" style={{ margin: 0 }}>Entries {String(all.length).padStart(3, "0")}</p>
          </div>
          {/* A preview, so the home page stays the same length however many houses join the Ledger. */}
          <LedgerTable rows={all.slice(0, LEDGER_PREVIEW)} />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginTop: 22 }}>
            <p className="cp muted" style={{ margin: 0 }}>New entries added when earned.</p>
            {all.length > LEDGER_PREVIEW && <Link href="/ledger" className="lnk">All {all.length} entries <span>→</span></Link>}
          </div>
        </div>
      </section>

      <section id="land-and-water" className="wrap" style={{ paddingTop: 100, paddingBottom: 100, display: "flex", flexWrap: "wrap", gap: 64, alignItems: "center" }}>
        <div style={{ flex: "1 1 380px" }}>
          <p className="eb">Land &amp; Water</p>
          <hr className="eb-rule" />
          <h2 className="dsp" style={{ margin: "28px 0 26px", fontSize: 44 }}>Days arranged by age, not by brochure</h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--charcoal)" }}>
            {[["On the water", "Skippered boat days, offshore fishing, paddling"], ["On the land", "Riding, wildlife, trails set to the slowest walker"], ["The young ones", "Programs of their own, so evenings are yours"], ["Together", "The photograph, the long supper, the friendly rivalry"]].map(([k, v]) => (
              <li key={k} style={{ display: "grid", gridTemplateColumns: "150px 1fr", gap: 16, padding: "16px 0", borderBottom: "1px solid var(--stone)" }}><span className="cp">{k}</span><span className="body" style={{ fontSize: 16 }}>{v}</span></li>
            ))}
          </ul>
        </div>
        <Photo img={feature} sizes="(max-width: 900px) 100vw, 560px" aspect="7:6" style={{ flex: "1 1 420px", height: 480 }} />
      </section>

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
      </section>
    </>
  );
}
