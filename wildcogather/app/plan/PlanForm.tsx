"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Postmark } from "@/components/Marks";
import { useJourney } from "@/components/JourneyProvider";
import { entityIdsOf, folioSummary } from "@/lib/folios";

const field: React.CSSProperties = { width: "100%", minHeight: 48, padding: "10px 12px", border: "1px solid var(--stone)", background: "var(--card)", fontFamily: "var(--f-sans), sans-serif", fontSize: 16, color: "var(--charcoal)", fontWeight: 300 };
const AGES = ["Under 6", "6–12", "Teens", "Adults", "70+"];

export default function PlanForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  // Arriving from a house page (/plan?house=lone-mountain-ranch&host=1) pre-fills the house and the host request.
  // Preserves the existing deep links (?house=…&also=…&host=1&offer=…) and adds ?review=1&folio=F-… for an advisor review of a Folio.
  const [from, setFrom] = useState({ house: "", host: "", offer: "", review: false, folioId: "", trip: "" });
  const { ready, folios } = useJourney();
  useEffect(() => { const q = new URLSearchParams(window.location.search); setFrom({ house: [q.get("house"), q.get("also")].filter(Boolean).join(", ") || "", host: q.get("host") || "", offer: q.get("offer") || "", review: q.get("review") === "1", folioId: q.get("folio") || "", trip: q.get("trip") || "" }); }, []);
  const folio = from.folioId ? folios.find((f) => f.id === from.folioId) : undefined;
  const [attach, setAttach] = useState(true);
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const withFolio = attach && folio;
    const data = {
      ...Object.fromEntries(new FormData(e.currentTarget).entries()),
      house: [from.house, from.trip && `itinerary: ${from.trip}`].filter(Boolean).join(", "), host: from.host, offer: from.offer,
      requestType: from.review || withFolio ? "Advisor review of a Folio" : "Plan a Gathering",
      folioSummary: withFolio ? folioSummary(withFolio, window.location.origin) : "",
      entityIds: withFolio ? entityIdsOf(withFolio) : "",
    };
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }
  if (state === "sent") return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 30 }}>
      <Postmark place="Received · James Wild & Co" date={new Date().toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })} width={300} />
      <p className="ser" style={{ fontSize: 28, margin: 0 }}>Thank you. James will write back personally.</p>
    </div>
  );
  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 22 }}>
      {from.offer && <p className="cp" style={{ margin: 0, padding: "10px 14px", border: "1px solid var(--rust)", color: "var(--rust)" }}>Asking about the offer: Time Rewarded · {from.offer.replace(/-/g, " ")}</p>}
      {from.review && <p className="cp" style={{ margin: 0, padding: "10px 14px", border: "1px solid var(--rust)", color: "var(--rust)" }}>Advisor review request{from.trip ? ` · journey: ${from.trip.replace(/-/g, " ")}` : ""}</p>}
      {ready && folio && (
        <fieldset style={{ border: "1px solid var(--stone)", padding: "16px 18px", background: "var(--card)" }}>
          <legend className="lbl" style={{ padding: "0 8px" }}>From My Folios · saved on this device</legend>
          <label className="iggi-chk"><input type="checkbox" checked={attach} onChange={(e) => setAttach(e.target.checked)} /> Send “{folio.name}” ({folio.items.length} saved{folio.dates ? ` · ${folio.dates}` : ""}) with this request</label>
          <details style={{ marginTop: 10 }}><summary className="cp">What the advisor will see</summary><pre style={{ whiteSpace: "pre-wrap", font: "12px/1.55 var(--f-mono), monospace", margin: "10px 0 0" }}>{folioSummary(folio)}</pre></details>
        </fieldset>
      )}
      {ready && from.folioId && !folio && <p className="cpn" style={{ margin: 0 }}>We couldn&apos;t find that Folio on this device. You can still send your request below.</p>}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 18 }}>
        <label className="lbl">Your name<input name="name" required style={field} /></label>
        <label className="lbl">Email<input name="email" type="email" required style={field} /></label>
        <label className="lbl">Dates (or month)<input name="dates" style={field} /></label>
        <label className="lbl">Occasion<input name="occasion" placeholder="80th birthday, reunion…" style={field} /></label>
      </div>
      <fieldset style={{ border: "1px solid var(--stone)", padding: "18px 20px" }}>
        <legend className="lbl" style={{ padding: "0 8px" }}>Guests by age</legend>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 14 }}>
          {AGES.map((a) => <label key={a} className="cp" style={{ fontSize: 11 }}>{a}<input name={`age_${a}`} type="number" min={0} defaultValue={0} style={field} /></label>)}
        </div>
      </fieldset>
      <label className="lbl">Must-haves<textarea name="musts" rows={3} placeholder="Water, kids' program, accessibility…" style={{ ...field, minHeight: 96 }} /></label>
      <label className="lbl">Houses you're curious about<input name="houses" key={from.house} defaultValue={from.house.replace(/-/g, " ").replace(/ ,/g, ",")} style={field} /></label>
      <p className="form-consent">By sending, you agree we may use these details to reply and plan your journey. See our <Link href="/privacy">Privacy Policy</Link>.</p>
      <div><button type="submit" className="btn" disabled={state === "sending"}>{state === "sending" ? "Sending…" : from.review ? "Request advisor review" : "Send to James"}</button></div>
      {state === "error" && <p className="cpn ox" role="alert">Your request didn&apos;t send — nothing was saved. Please try again in a moment.</p>}
    </form>
  );
}
