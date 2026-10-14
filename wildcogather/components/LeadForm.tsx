"use client";
import { useState } from "react";
import Link from "next/link";

type Field = { name: string; label: string; type?: "text" | "email" | "textarea" | "select"; required?: boolean; options?: string[]; full?: boolean };

// One form for advisor applications and webinar registrations. Saves to Airtable › Inquiries
// (Occasion = the `occasion` prop; every extra answer is written into "Must-haves", one per line).
export default function LeadForm({ id, occasion, fields, submit, done, from, dark = false }: { id: string; occasion: string; fields: Field[]; submit: string; done: string; from: string; dark?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const fg = dark ? "var(--on-dark)" : "var(--charcoal)";
  const box: React.CSSProperties = { width: "100%", boxSizing: "border-box", minHeight: 50, padding: "12px 14px", border: `1px solid ${fg}`, background: "transparent", color: fg, fontFamily: "var(--f-sans), sans-serif", fontSize: 15 };
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const f = new FormData(e.currentTarget);
    const extra = fields.filter((x) => !["name", "email"].includes(x.name)).map((x) => `${x.label}: ${f.get(x.name) || "—"}`).join("\n");
    try {
      const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.get("name"), email: f.get("email"), occasion, musts: extra, house: from }) });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }
  if (state === "done") return <p className="it" role="status" style={{ margin: 0, fontSize: 24, color: dark ? "var(--on-dark-accent)" : "var(--rust)" }}>{done}</p>;
  return (
    <form id={id} onSubmit={onSubmit} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: 14 }}>
      {fields.map((x) => (
        <label key={x.name} htmlFor={`${id}-${x.name}`} className="lab" style={{ display: "grid", gap: 6, gridColumn: x.full || x.type === "textarea" ? "1 / -1" : undefined, color: dark ? "rgba(244,241,236,.75)" : undefined }}>
          {x.label}{x.required ? " *" : ""}
          {x.type === "textarea" ? <textarea id={`${id}-${x.name}`} name={x.name} required={x.required} rows={4} style={{ ...box, resize: "vertical" }} />
            : x.type === "select" ? <select id={`${id}-${x.name}`} name={x.name} required={x.required} style={box}><option value="">Choose…</option>{x.options?.map((o) => <option key={o}>{o}</option>)}</select>
            : <input id={`${id}-${x.name}`} name={x.name} type={x.type || "text"} required={x.required} style={box} />}
        </label>
      ))}
      <p className="form-consent" style={{ gridColumn: "1 / -1", color: dark ? "rgba(244,241,236,.7)" : undefined }}>By sending, you agree we may use these details to reply. See our <Link href="/privacy" style={{ color: "inherit" }}>Privacy Policy</Link>.</p>
      <div style={{ gridColumn: "1 / -1", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }}>
        <button className={dark ? "btn btn-light" : "btn"} disabled={state === "sending"}>{state === "sending" ? "Sending…" : submit}</button>
        {state === "error" && <p className="cp" role="alert" style={{ margin: 0, color: "var(--rust)" }}>That didn't send. Please try again in a moment.</p>}
      </div>
    </form>
  );
}
