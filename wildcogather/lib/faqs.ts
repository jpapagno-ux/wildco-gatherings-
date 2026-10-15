// ——— Questions families and advisors ask — one source for the home page, How It Works, Advisors and /questions ———
// Booking answers are built from lib/legal.ts, so a change to the deposit or schedule updates every answer.
import { BOOKING, LEGAL } from "./legal";

export type QA = { q: string; a: string };

export const HOME_FAQS: QA[] = [
  { q: "What is a resort residence?", a: "A private, multi-bedroom home inside or beside a resort: your own space and kitchen, with the resort's dining, housekeeping, children's programs and activities close at hand." },
  { q: "Is a resort residence better than a villa for a family reunion?", a: "For three generations, usually. You keep a villa's privacy, nobody has to run the house, and every age has something waiting." },
  { q: "How does James vet each house?", a: "Against the six tests of the Gathering Formula, drawing on forty-four years of travel. Every house in the Ledger shows its evidence — whether James stayed, inspected and approved it in person, or met the host, and when — so you can see exactly what each claim rests on." },
];

export const ADVISOR_FAQS: QA[] = [
  { q: "What does advisor-led mean at Wild & Co Gatherings?", a: "Every gathering is planned with a travel advisor in the room. We vet the houses and supply the family facts; the advisor owns the client relationship, the plan and the booking." },
  { q: "Can travel advisors book Wild & Co houses for their clients?", a: "Yes. Apply below and we will set you up with house sheets, availability holds and a direct line to the team for each family you are planning for." },
  { q: "How does Wild & Co vet a family residence?", a: "James Wild inspects or speaks with each house and scores it against six tests — room to gather, a day for every age, water within reach, country at the door, a resort behind you and worth returning to. Each house page shows its evidence: whether James stayed, inspected and approved it, or met the host, and when." },
  { q: "What is a generational residence?", a: "A villa, lodge or private house that sleeps a whole extended family under one roof or one booking, with space for grandparents, parents and children to be together and apart in the same stay." },
  { q: "Do you help plan gatherings of friends as well as families?", a: "Yes. Milestone birthdays, reunions of old friends and weddings weekends work the same way: one house, a plan for every age and pace, and one long table." },
];

const band = (from: number, to: number | null) => (to === null ? `${from}+ days before departure` : from === 0 ? `within ${to} days` : `${from}–${to} days before`);

export const BOOKING_FAQS: QA[] = [
  { q: "How do we start planning a family gathering?", a: "Tell us who is coming, roughly when, and the occasion — through Plan Our Gathering, a question to Iggi, or by sending a Folio. James and an advisor reply personally. There is no payment or commitment until you accept a written quote." },
  { q: "What deposit does Wild & Co Gatherings take?", a: `${BOOKING.depositPct}% of the total trip cost confirms the booking. Some lodges, private villas and peak dates ask for a higher or non-refundable deposit; when they do, the quote shows the higher amount before you pay.` },
  { q: "When is the final balance due?", a: `${BOOKING.balanceDueDays} days before departure. If you book within ${BOOKING.balanceDueDays} days of travel, the full cost is due at booking.` },
  { q: "What happens if we cancel?", a: `Once a booking is confirmed, cancelling costs: ${BOOKING.schedule.map((r) => `${band(r.from, r.to)}, ${r.charge.replace(/ \(.*\)$/, "")}`).join("; ")}. Where a supplier's own terms are stricter, theirs apply to that part of the trip and are listed on the quote.` },
  { q: "How quickly are refunds paid?", a: `Within ${BOOKING.refundDays} days of your written cancellation, or within ${BOOKING.refundDays} days of the supplier refunding us, whichever is later.` },
  { q: "Is Wild & Co a travel agent or a tour operator?", a: "Both, and your confirmation says which applies to each part of the trip. When we book a lodge or flight at the supplier's price we act as your travel advisor; when we design and sell a journey under our own name at one price we act as tour operator." },
  { q: "Why are prices quoted rather than published?", a: "Lodge and villa rates change by season, party size and currency, and many houses price the whole house rather than a room. A quote for your family's dates is the only number worth trusting." },
  { q: "Do we need travel insurance?", a: "We strongly recommend it from the day you pay a deposit, covering cancellation, medical care and — for safari and remote areas — emergency evacuation." },
  { q: "Is Wild & Co Gatherings registered?", a: `Yes. ${LEGAL.legalName} is registered with the State of Florida as a Seller of Travel, Registration No. ${LEGAL.flSellerOfTravelNo}${LEGAL.iataNo ? `, and holds IATA No. ${LEGAL.iataNo}` : ""}.` },
];

/** Dedupe by question text, first one wins. */
export const uniqueQA = (...groups: QA[][]) => {
  const seen = new Set<string>();
  return groups.flat().filter((x) => (seen.has(x.q.toLowerCase()) ? false : (seen.add(x.q.toLowerCase()), true)));
};
