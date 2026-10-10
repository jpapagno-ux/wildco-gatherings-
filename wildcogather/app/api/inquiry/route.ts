import { NextResponse } from "next/server";

// Saves Plan-a-Gathering requests to the Airtable "Inquiries" table (create it with the columns below).
export async function POST(req: Request) {
  const d = await req.json();
  if (!d?.email || !d?.name) return NextResponse.json({ error: "Missing name or email" }, { status: 400 });
  const token = process.env.AIRTABLE_TOKEN;
  const base = process.env.AIRTABLE_BASE_ID || "appnpcCxUZcapAgbo";
  if (!token) { console.log("Inquiry (no Airtable token set):", d); return NextResponse.json({ ok: true }); }
  const ages = ["Under 6", "6–12", "Teens", "Adults", "70+"].map((a) => `${a}: ${d[`age_${a}`] || 0}`).join(" · ");
  const res = await fetch(`https://api.airtable.com/v0/${base}/Inquiries`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ records: [{ fields: { Name: String(d.name), Email: String(d.email), Dates: d.dates || "", Occasion: d.occasion || "", "Guests by age": ages, "Must-haves": d.musts || "", "Houses of interest": d.houses || "" } }], typecast: true }),
  });
  if (!res.ok) { console.error(await res.text()); return NextResponse.json({ error: "Could not save" }, { status: 502 }); }
  return NextResponse.json({ ok: true });
}
