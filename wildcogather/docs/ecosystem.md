# Wild & Co Gatherings in the James Wild & Co ecosystem

Gatherings is one of four volumes of **James Wild & Co** (the master house): **Stays · Safaris · Gatherings · Voyages**.
Shared services: **The Ledger** (approved portfolio knowledge and evidence), **My Folios** (the traveller's private shelf),
**Journey Folio** (one trip's selections), **Iggi** (the shared conversation guide) and **Safari CRUX** (a separate Safari discovery tool).

Rollback point before this update: `6ec99e18c5dccf580b2edf163d91c7394516d09b` (main, 14 Oct 2026).

## Navigation (lib/ecosystem.ts)
One config drives the ecosystem bar, the footer and "Build Your Journey". Override in Vercel without code changes:

| Variable | Default | Status |
|---|---|---|
| `NEXT_PUBLIC_JWCO_HOME_URL` | — | Master homepage not yet verified, so the House seal does not link out |
| `NEXT_PUBLIC_STAYS_URL` | https://www.wildearthstays.com/ | Legacy Stays site |
| `NEXT_PUBLIC_SAFARIS_URL` | https://wildandcosafarisfinal.vercel.app/ | Verified: production alias of the `wildandcosafarisfinal` project |
| `NEXT_PUBLIC_VOYAGES_URL` | — | Shown as "Coming soon" until set |

## Shared record structure (lib/entities.ts, data/*.json)
Permanent IDs are allocated once, persisted in `data/entities.json` and in Airtable, and never derived from names, slugs or positions.
`npm run check:ledger` validates uniqueness, parent links and evidence subjects.

| Type | ID | Airtable | Notes |
|---|---|---|---|
| Property | `JWC-P-####` | Residences › Entity ID (Entity type = Property) | A lodge, ranch or resort |
| Residence | `JWC-R-####` | Residences › Entity ID, Parent entity ID, Parent property | A villa or house inside a property (e.g. Monwana Villa → Monwana Lodge) |
| Configuration | — | Room Categories | Rooms, cabins, whole-residence and whole-property buyouts are kept distinct on the page |
| Itinerary template | `JWC-I-####` | Itineraries › Template ID | A suggestion, never a booking |
| Evidence | `JWC-V-####` | Evidence table | Reviewer, role, method, date + precision, scope, source, approved wording, review status |
| Offer | `JWC-O-####` | Offers | "Time Rewarded" shows only when Live, confirmed, with terms, travel window, book-by, exclusions and expiry |
| Experience / Destination | Airtable record ID (legacy) | Experiences / Destinations | Ready for JWC IDs when the shared service allocates them |
| Traveller Folio | `F-xxxxxxxx` | — (device only) | See My Folios |

Collection references (`G-###` for Gatherings) are kept but are **not** identity. A property in Gatherings, Stays and Safaris must resolve
to the same `JWC-` ID with one collection reference per volume (`collectionRefs`). Facts are referenced, not copied.

Next free IDs: JWC-P-0020 · JWC-R-0007 · JWC-I-0007 · JWC-O-0002 · JWC-V-0045.

## Evidence rules (shown on every house page under "How we know")
Personally Stayed · Personally Inspected · Host / Partner Reviewed · Host Met · House Selected · Founder Favorite · On the Horizon.
Founder Favorite is an opinion; Host Met does not verify every fact; a past visit does not verify current rates or policies.
Only `Approved` evidence is shown. Records marked `Needs confirmation` stay hidden until approved (none pending as of 14 Oct 2026; Hinkwenu Villa inspection confirmed).
Prices show only with currency, rate basis, occupancy, dates, exclusions and source (`isVerifiedRate`); otherwise "Request a quote".

## What is connected vs device-local
| Capability | State |
|---|---|
| House, itinerary, evidence and ID data | Connected — Airtable base appnpcCxUZcapAgbo, falling back to the repo copy |
| Advisor enquiry, advisor review of a Folio, Iggi questions | Connected — Airtable base appOdlDRR4R4YMiuT › Inquiries (new fields: Request type, Folio summary, Question for Iggi, Entity IDs). Success is shown only after Airtable accepts the record; in production without a token the API returns 503 |
| My Folios | **Saved on this device** (browser storage) — create, rename, open, delete, add/remove houses and journeys, notes, dates, party, decisions, recorded changes, JSON export/import, trip pack. No accounts, cloud sync or cross-site persistence |
| Iggi | **Not live.** The panel introduces Iggi and hands a prepared question (with page and Folio context) to an advisor. No simulated conversation. Internal agent ID `jwco-journey-guide` |
| Travel Mode | Not available: there are no confirmed trip records. Folios offer a planning summary and a downloadable trip pack with an export timestamp |

## Future connections
1. **Shared accounts + cloud Folios** — implement `FolioStore` (lib/folios.ts) against the account service and pass it to `<JourneyProvider store={…}>`. Use the service's ownership model; restrict each Folio to its owners; share with advisors by grant. Migrate device Folios via the existing JSON export.
2. **Shared Ledger service** — replace the two JSON loaders in lib/entities.ts with the service API; keep the shapes. Stays and Safaris then reference the same JWC IDs.
3. **Live Iggi** — a server route that receives `{ agentId, entityId | templateId, folioId? }`, retrieves approved Ledger records and evidence with source dates, separates suggestions / requests / confirmations, and keeps keys server-side. Flip `IGGI.live` only when it answers for real.
4. **Travel Mode** — needs confirmed trip records (bookings, meeting points, verified contacts, authorised documents) from the booking system.
