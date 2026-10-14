import { NextResponse } from "next/server";

// Saves Plan-a-Gathering requests to the "Inquiries" table in the wild_co_gather Airtable base.
export async function POST(req: Request) {
  const d = await req.json();
  if (!d?.email || !d?.name) return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.AIRTABLE_INQUIRIES_BASE_ID || "appOdlDRR4R4YMiuT"; // wild_co_gather
  // Only report success once the request is actually stored. Without a token in production, say so.
  if (!token) {
    if (process.env.VERCEL_ENV === "production") return NextResponse.json({ error: "Enquiries are not connected" }, { status: 503 });
    console.log("Inquiry (development, no Airtable token):", d); return NextResponse.json({ ok: true, stored: false });
  }
  const ages = ["Under 6", "6–12", "Teens", "Adults", "70+"].map((a) => `${a}: ${d[`age_${a}`] || 0}`).join(" · ");
  const res = await fetch(`https://api.airtable.com/v0/${base}/Inquiries`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields: { Name: String(d.name), Email: String(d.email), Dates: d.dates || "", Occasion: d.occasion || "", "Guests by age": ages, "Must-haves": d.musts || "", "Houses of interest": d.houses || "", "Came from page": d.house || "", "Wants a conversation with the host": d.host === "1", Offer: d.offer || "", Status: "New",
      "Request type": ["Plan a Gathering", "Advisor review of a Folio", "Iggi question"].includes(d.requestType) ? d.requestType : "Plan a Gathering",
      "Folio summary": String(d.folioSummary || "").slice(0, 20000), "Question for Iggi": String(d.iggi || "").slice(0, 5000), "Entity IDs": String(d.entityIds || "").slice(0, 500) } }], typecast: true }),
  });
  if (!res.ok) { console.error(await res.text()); return NextResponse.json({ error: "Could not save" }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
