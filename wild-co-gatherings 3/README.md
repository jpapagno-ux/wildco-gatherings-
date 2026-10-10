# Wild & Co Gatherings

A house of James Wild & Co. Next.js site, deployed on Vercel from GitHub. Content comes from Airtable; photos from Cloudinary.

## Pages
- `/` Home — hero with coordinates, archive strip, Gathering Formula, Gatherings Ledger, Land & Water, FAQ
- `/ledger` The Gatherings Ledger — every house, entry number, stamp, first visited
- `/houses/[slug]` Ledger Entry — The Line, Verdict, Facts, Field Notes, The Film (YouTube first, then any others), Booking Facts & Pricing, Included / Not included, Room Categories ("Where everyone sleeps"), Host, Formula, Experiences, Manifest, From the Journal, FAQ
- `/vip` Gatherings VIP — what V-I-P (Vetted in Purpose) means, and the VIP collections
- `/vip/[collection]` a VIP collection hub, e.g. `/vip/ted-turner-reserves` — every stay, why it's on James's list, the wildlife it protects, his visit route
- `/journal` and `/journal/[slug]` The Journal — James's "Why it's in the Ledger" entries, with his quotes
- `/plan` Plan a Gathering — form that saves to the Airtable `Inquiries` table
- `/sitemap.xml`, `/robots.txt` — generated

## Stamps (status ladder)
Under observation → Host met → Field verified → Gathering verified → Founder favorite

## Run it the first time
1. Install Node 20+.
2. `npm install`
3. Copy `.env.example` to `.env.local` and fill in `AIRTABLE_TOKEN` (optional — the site shows the sample houses in `lib/sample-data.ts` until it is set).
4. `npm run dev` → http://localhost:3000

## Push to GitHub and deploy on Vercel
1. GitHub → New repository → `wild-co-gatherings` (private) → Create.
2. In this folder: `git init`, `git add .`, `git commit -m "First build"`, then the two `git remote add origin …` / `git push -u origin main` lines GitHub shows you.
3. vercel.com → Add New → Project → Import `wild-co-gatherings` → Framework: Next.js (auto).
4. Environment Variables: add `AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`, `NEXT_PUBLIC_CLOUDINARY_CLOUD`, `NEXT_PUBLIC_SITE_URL` → Deploy.
5. Every `git push` to `main` redeploys. Airtable edits appear within an hour (pages revalidate hourly).

## Airtable
Base `appnpcCxUZcapAgbo` — tables Residences, Partners, Destinations, Experiences, Images, FAQs. Inquiries live in their own base, **wild_co_gather** (`appOdlDRR4R4YMiuT`), table Inquiries — Status runs New → Replied → Planning → Proposal sent → Booked / Not this time.

Images: drop originals into **Photo (drop file here)** in the Images table (Status: Shot needed → Parked in Airtable → In Cloudinary → On site). 'Suggested public ID' gives the Cloudinary file name. The website only shows photos once they are in Cloudinary.

## Booking facts, pricing and film (Residences table)
- Booking: Booking plan, Book via, Whole-house booking, Minimum stay, Check-in, Check-out, Deposit terms, Cancellation terms, Children policy, Rate basis, Booking facts checked.
- Fees & taxes: one per line as `Label: value` (e.g. `Resort fee: 15%`).
- Included / Not included: one item per line.
- Film: put the 11-character code from a YouTube link in **YouTube ID** (shown first). Use **Vimeo ID** when the house only publishes on Vimeo. Add Video title, description, duration (`PT2M4S`), upload date and credit so Google can show the film in results.
- Anything written as `[confirm …]` shows on the page as still to check — replace before launch.

## Every new house — the standard set
1. Residences row: facts, booking fields, Included / Not included, YouTube ID (+ title, credit).
2. Room Categories rows: one per category, linked to the house, numbered in Order; tick Whole house on the buyout row.
3. Journal row: "Why I put [house] in the Ledger" — Status `Draft preview` until James ticks **Quotes approved by James**, then `Published` (drafts are hidden from Google).
4. FAQs: write headings and FAQ questions the way families ask them ("Where should each generation sleep at …?").

## Gatherings VIP (Vetted in Purpose)
V — Vetted: James has seen it. I — In the land: guided from within by the people who keep it. P — Purpose: every night helps keep the land wild.
To mark a house VIP in Airtable: tick **VIP (Vetted in Purpose)**, fill Collection, Collection slug, Visit planned (shown on the stamp), Why on J.W.'s list, Family fit. VIP houses show on the site even while Status is Prospect. The collection page text lives in `lib/collections.ts`.
Partner photos: the Ted Turner images are linked from the reserves' own site for the sample. Confirm permission with the contact, then move them into Cloudinary and swap the address for the Cloudinary ID.

## Journal body format
Blank line = new paragraph · `## ` heading · `> ` James quote · `- ` bullet · `![Fig. 2 — caption](cloudinary-public-id)` photo.

## Brand marks
- James Wild & Co founder seal: `public/brand/jwco-seal-{240,600}.png` (oxblood) and `jwco-seal-cream-*.png` (reversed). Transparent PNGs. Use `<JwcoSeal tone="light" />` over photos or charcoal.
- Shown in: footer, the Plan a Gathering band, the home page founder block, every journal sign-off; also the site icon and the logo in Google's Organization data.
- Stamps (Ledger, Host met, VIP) are transparent with a worn-ink grunge filter; pass `tone="light"` for the reversed cream version over photographs.

## Images
Cloudinary public IDs follow `gatherings/[house-slug]/[what-it-shows]-[place]`. Put the public ID in the Images table; alt text and credit come from the same row.
