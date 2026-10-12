"use client";
import { useState } from "react";

// "Be the first" sign-up. Saves to Airtable › Inquiries (Occasion = "Be the first · On the Horizon")
// so James can write when dates open. One field pair, no account, no newsletter checkbox games.
export default function BeFirst({ slug, name, dark = false }: { slug?: string; name?: string; dark?: boolean }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const fg = dark ? "var(--on-dark)" : "var(--charcoal)";
  const field: React.CSSProperties = { flex: "1 1 200px", height: 50, padding: "0 14px", border: `1px solid ${fg}`, background: "transparent", color: fg, fontFamily: "var(--f-sans), sans-serif", fontSize: 15 };
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: f.get("name"), email: f.get("email"), houses: name || "All of On the Horizon", occasion: "Be the first · On the Horizon", house: slug ? `/horizon/${slug}` : "/horizon" }) });
    setState(res.ok ? "done" : "error");
  }
  if (state === "done") return <p className="it" style={{ margin: 0, fontSize: 24, color: dark ? "var(--on-dark-accent)" : "var(--rust)" }}>You're on the list. James will write the moment {name || "these places"} open their first dates.</p>;
  return (
    <form onSubmit={submit} style={{ display: "flex", flexWrap: "wrap", gap: 12 }} aria-label={`Be the first to hear about ${name || "new places"}`}>
      <label className="sr-only" htmlFor={`bf-n-${slug || "all"}`}>Your name</label>
      <input id={`bf-n-${slug || "all"}`} name="name" required placeholder="Your name" style={field} />
      <label className="sr-only" htmlFor={`bf-e-${slug || "all"}`}>Email</label>
      <input id={`bf-e-${slug || "all"}`} name="email" type="email" required placeholder="Email" style={field} />
      <button className={dark ? "btn btn-light" : "btn"} disabled={state === "sending"} style={{ flex: "0 0 auto" }}>{state === "sending" ? "Saving…" : "Be the first"}</button>
      {state === "error" && <p className="cp" style={{ width: "100%", margin: 0, color: "var(--rust)" }}>That didn't save — please try again, or write to James directly.</p>}
    </form>
  );
}
