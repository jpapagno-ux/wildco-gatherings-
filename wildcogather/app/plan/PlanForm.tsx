"use client";
import { useState } from "react";

const field: React.CSSProperties = { width: "100%", minHeight: 48, padding: "10px 12px", border: "1px solid var(--sand)", background: "var(--card)", fontFamily: "var(--f-courier), monospace", fontSize: "1rem", color: "var(--charcoal)" };
const AGES = ["Under 6", "6–12", "Teens", "Adults", "70+"];

export default function PlanForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    setState(res.ok ? "sent" : "error");
  }
  if (state === "sent") return <p className="cas" style={{ fontSize: 26 }}>Thank you. James will write back personally.</p>;
  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 22 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 18 }}>
        <label className="lbl">Your name<input name="name" required style={field} /></label>
        <label className="lbl">Email<input name="email" type="email" required style={field} /></label>
        <label className="lbl">Dates (or month)<input name="dates" style={field} /></label>
        <label className="lbl">Occasion<input name="occasion" placeholder="80th birthday, reunion…" style={field} /></label>
      </div>
      <fieldset style={{ minWidth: 0, margin: 0, border: "1px solid var(--sand)", padding: "18px 20px" }}>
        <legend className="lbl" style={{ padding: "0 8px" }}>Guests by age</legend>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 120px), 1fr))", gap: 14 }}>
          {AGES.map((a) => <label key={a} className="cp">{a}<input name={`age_${a}`} type="number" min={0} defaultValue={0} style={field} /></label>)}
        </div>
      </fieldset>
      <label className="lbl">Must-haves<textarea name="musts" rows={3} placeholder="Water, kids' program, accessibility…" style={{ ...field, minHeight: 96 }} /></label>
      <label className="lbl">Houses you're curious about<input name="houses" style={field} /></label>
      <div><button type="submit" className="btn" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send to James"}</button></div>
      {state === "error" && <p className="cpn ox">Something went wrong. Please email us directly.</p>}
    </form>
  );
}
