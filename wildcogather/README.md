# Wild & Co Gatherings

A house of James Wild & Co. Next.js site, deployed on Vercel from GitHub. Content comes from Airtable; photos from Cloudinary.

## Pages
- `/` Home — hero with coordinates, archive strip, Gathering Formula, Gatherings Ledger, Land & Water, FAQ
- `/houses` The Houses — every stay, grouped by natural setting (Mountain, Jungle, Coast & Island, Desert, Savanna, Polar & Ice). New stays appear automatically.
- `/itineraries` and `/itineraries/[slug]` Short inbound itineraries (3–4 days) built around one stay — day by day, included / not included, paired offer
- `/ledger` The Gatherings Ledger — every house, entry number, stamp, first visited
- `/houses/[slug]` Ledger Entry — full-photo hero with ledger column and luggage tag, Why it earned its place (+ James's taped photo and status stamp), The Manifest, Notes for the family (season, last leg, power, time, children, water), Facts, Field Notes, The Film (YouTube first, then any others), Booking Facts & Pricing, Included / Not included, Room Categories ("Where everyone sleeps"), Host, Formula, Experiences, Manifest, From the Journal, FAQ
- `/vip` Gatherings VIP — what V-I-P (Vetted in Purpose) means, and the VIP collections
- `/collections/[collection]` a partner's houses grouped on one page without the VIP stamp (lib/collections.ts › propertyCollections). A property collection marked `vip: true` lives at `/vip/[collection]` instead, e.g. `/vip/more` (the five MORE villas, Gatherings VIP since 30 Oct 2026, with pairings and family FAQs; components/PropertyCollectionView.tsx, lib/more.ts); `/collections/more` redirects there permanently
- `/vip/[collection]` a VIP collection hub, e.g. `/vip/ted-turner-reserves` — every stay, why it's on James's list, the wildlife it protects, his visit route
- `/journal` and `/journal/[slug]` The Journal — James's "Why it's in the Ledger" entries, with his quotes
- `/plan` Plan a Gathering — form that saves to the Airtable `Inquiries` table
- `/destinations/[region]` Stays by region (USA & Mexico, Caribbean, Latin America, Europe, Africa, Asia & Indian Ocean, Oceania) — intro, scroll-synced interactive map and residence cards. Also in the "Stays" menu.

## Navigation & browsing (built to grow)
- **Top nav stays short:** Stays ▾ · Itineraries · Gatherings VIP · The Journal · Advisors, plus Plan a Gathering. New houses never add top-level links.
- **"Stays" mega-menu** (`components/Header.tsx`): Destinations (every region, with a count or "Soon"), By setting (with counts) and Collections (All stays, the Ledger, VIP, On the Horizon). Counts come from `browseNav()` in `lib/browse.ts`, read once in `app/layout.tsx`. On phones it sits inside a single "Menu" button. Escape closes it and returns focus; so does clicking outside or following a link.
- **Pages scroll down; rails scroll sideways.** Use `components/Strip.tsx` only for galleries and card rails (archive photos, experiences, "More stays" at the foot of each house page). The home page shows the first 8 Ledger entries and links to `/ledger` for the rest.
- **One card for every stay:** `components/StayCard.tsx` — fixed 5:4 frame, Cloudinary crops around the subject (`g_auto`), so new photography of any size or orientation lines up. The photo is chosen by `cardImage()` in `lib/browse.ts`: Role Hero, then Card, then the first image.
- A new region: add it to `REGIONS` and its countries to `RULES` in `lib/regions.ts` — the menu, `/destinations/<key>`, the sitemap and the /houses region links pick it up.
- `/horizon` and `/horizon/[slug]` On the Horizon — new places, approved by James
- `/advisors` For travel advisors — why James Wild & Co, what we're building for agents who care, how we plan family & friend gatherings, FAQ, application form
- `/webinars` and `/webinars/[slug]` Webinars on Livestorm — first one: Ted Turner Reserves with host Harry Tyner
- `/sitemap.xml`, `/robots.txt` — generated

## Stamps (status ladder)
Under observation → Vetted partner → Host met → Founder inspected & approved → Gathering verified → Founder favorite

Destination maps use OpenStreetMap tiles and the latitude / longitude values in the residence data. No map API key is required; an internet connection is needed to load map tiles. Map locations are approximate.

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
- Film: paste the whole YouTube link into **YouTube link** (any form works — youtu.be/…, youtube.com/watch?v=…, /shorts/…). Extra films go in **More YouTube links**, one per line (`Title | link`). Use **Vimeo ID** when the house only publishes on Vimeo. Put a still in **Video thumbnail URL** (a Cloudinary URL works): Vimeo films show that still with a play button and load nothing from Vimeo until it is pressed, with the caption "title · credit · Watch on Vimeo". Add Video title, description, duration (`PT2M4S`), upload date and credit so Google can show the film in results.
- Anything written as `[confirm …]` shows on the page as still to check — replace before launch.

## Adding the next stay (about 20 minutes in Airtable — no code)
Everything on the page — the luggage tag, the stamp, the VIP mark, its place on /houses and in the Ledger — is drawn from the Airtable row.
1. **Residences › new row.** Name, Slug (lowercase-with-dashes), Destination, Status (`Vetting` to show it).
2. **Entry No.** — the next free number (G-009, G-010…). Set once, never reuse.
3. **Setting** — Mountain, Jungle, Coast & Island, Desert, Savanna or Polar & Ice. This picks the ink of its tag and VIP stamp and its group on /houses.
4. **Ledger stamp** — its one current status (Under observation → Vetted partner → Host met → Founder inspected & approved → Gathering verified → Founder favorite).
5. **Notes for the family** — Best season, Power & plugs, Time zone (plus Kids' program, Water access). Blank fields are simply hidden.
6. **Facts, booking and film** — The Line, Best for (shown under the name in the hero), Not for, Sleeps, booking fields, Included / Not included, YouTube ID.
7. **Images** — drop photos in the Images table (Role: Hero, Card = James's own photo for the taped frame, Gallery strip, Feature), then say "move the parked photos" to send them to Cloudinary.
8. **Room Categories** rows (Whole house ticked on the buyout row), **FAQs** written the way families ask, and a **Journal** draft "Why I put [house] in the Ledger".
9. **VIP?** Tick VIP (Vetted in Purpose) + Collection, Collection slug, Visit planned, Why on J.W.'s list. Its VIP stamp and card take the Setting's ink.
10. **Optional:** an **Offers** row (Worth Another Night) and an **Itineraries** row (3–4 days) linked to the stay — see the sections below.
The site refreshes from Airtable within the hour (or redeploy on Vercel to see it at once).

## Gatherings VIP (Vetted in Purpose)
V — Vetted: James has seen it. I — In the land: guided from within by the people who keep it. P — Purpose: every night helps keep the land wild.
To mark a house VIP in Airtable: tick **VIP (Vetted in Purpose)**, fill Collection, Collection slug, Visit planned (shown on the stamp), Why on J.W.'s list, Family fit. VIP houses show on the site even while Status is Prospect. The collection page text lives in `lib/collections.ts`.
Partner photos: the 25 Ted Turner images live in Cloudinary under gatherings/<reserve-slug>/ and are tagged permission-confirmed (approved by the reserves' contact, Oct 10, 2026). Always credit them "Courtesy of Ted Turner Reserves". For any new partner, park photos with Permission = Pending and tag permission-pending until the partner says yes.

## Journal body format
Blank line = new paragraph · `## ` heading · `> ` James quote · `- ` bullet · `![Fig. 2 — caption](cloudinary-public-id)` photo.

## Worth Another Night offers (Airtable › Offers)
A stamped ticket on the stay page ("Stay 3 nights. Pay for 2.") with an arrow to the valid dates, what's included and not included, and terms.
- One row per offer, linked to its Residence: Kind, Stay nights, Pay nights, Headline, Line, Included / Not included (one per line), Valid from, Valid to, Book by, Blackout dates, Terms.
- **Status:** `Draft preview` shows it with a "sample — to confirm" ribbon · `Live` + **Confirmed with partner** ticked shows it clean and adds Google Offer markup (valid dates, minimum nights) · `Paused` / `Expired` hide it. Anything past Valid to hides itself.
- The "Ask James for this offer" button opens the Plan form with the offer pre-filled; it is saved to the Inquiries table's **Offer** field.
- Stamp: `OfferStamp` in `components/Marks.tsx` (rust ink, "3rd night on the house" worked out from Stay/Pay). Social copies: `public/kit/offer-stamp-stay3-pay2.png`, `public/kit/offer-ticket-como-shambhala.jpg`.

## Short itineraries (Airtable › Itineraries)
- One row per itinerary, linked to its Residence: Days, Nights, Dek, Best for, Season, Arrive, Depart, Included / Not included, Price note, Pairs with offer (slug), Hero (Cloudinary ID, optional).
- **Day plan** format:
  `## Day 1 · Into the hills` then `Morning: …` `Afternoon: …` `Evening: …` and optional `Note: …` — blank line between days.
- Status `Draft preview` = shown with a sample banner and hidden from Google; `Published` = in the sitemap with TouristTrip markup; `Hidden` = off.
- It appears on its stay's page under "A few days from the house" and on /itineraries automatically.

## Uploading this build to GitHub (Vercel redeploys on its own) — older notes
1. Unzip `wild-co-gatherings.zip`. Open the `wild-co-gatherings` folder — upload what is **inside** it (app, components, lib, public, package.json, …), not the folder itself.
2. On github.com open your repository → **Add file → Upload files**. Drag everything from inside the folder onto the page (about 95 files — under GitHub's 100-file limit for one upload). Do not upload `node_modules` or `.next` (they are not in the zip).
3. Commit message: "New style, hare seal, offers and itineraries" → **Commit changes**.
4. Vercel sees the commit and rebuilds in about two minutes. Check Deployments for "Ready".
5. Files deleted from the project are not removed by an upload — none need deleting this time.

## Style (Oct 2026 — "Wild Earth Stays" look)
- Colours (`app/globals.css`): paper #F4F1EC, ink #2C2A27, body #5E5850, rust #94512F (accent, buttons), navy #1E2A38 (film + Plan bands), oxblood #7A1E1E (seal + ledger stamps only).
- Fonts (`app/layout.tsx`, self-hosted by next/font): Cormorant Garamond (headings in capitals, rust italic pull lines), Jost (labels, menu, body), IBM Plex Mono (facts, coordinates), Mrs Saint Delafield (James's signature).
- Setting inks (`lib/settings.ts`) appear only inside tags, VIP stamps, VIP cards and the Ledger dot: Mountain #33505F · Jungle #2E5A3F · Coast & Island #22656E · Desert #A1512F · Savanna #866127 · Polar & Ice #3C6487.

## Brand marks & the ephemera kit
- James Wild & Co hare seal ("Ledgered & Vetted · Journey design since 1982"): `public/brand/jwco-hare-{240,600}.png` and `jwco-hare-cream-*.png`. Header, footer, Plan band, home founder block, journal sign-off, site icon, share image and Google's Organization logo.
- Live components (`components/Marks.tsx`), drawn from each stay's data: `Stamp` (ledger status), `VipStamp` (setting ink), `LuggageTag`, `Postmark`, `TapedPhoto`, `Icon`, `JwcoSeal`.
- Static copies for social, email and print: `public/kit/*.png` (stamps, postmarks, VIP stamps and cards, tags, tape, photo frame).
- **Use sparingly:** one piece per screen view, three per page at most, never over text. Ledger stamp = the one status a house has earned. VIP pieces = VIP houses only. Tag = one per house, on the hero. Taped photo = James's own pictures. Postmark = journal datelines, the thank-you page, emails.
- The old cheetah seal files (`jwco-seal-*`) are kept in `public/brand` but no longer used.

## Images
Cloudinary public IDs follow `gatherings/[house-slug]/[what-it-shows]-[place]`. Put the public ID in the Images table; alt text and credit come from the same row.

### Replacing an image with the operator's own photo
1. Drop the operator's file into Airtable › Images › "Photo (drop file here)" on the row you want to change (or send the file/link to Claude).
2. It is re-uploaded to Cloudinary **with the same public ID** (overwrite + invalidate), so every page that uses it updates on the next refresh — no code change and no new row.
3. Light edits (crop to the subject, straighten, brighten, warm) are Cloudinary transformations on the same file; nothing is painted over.
4. When the operator's permission is confirmed, switch the tag `permission-pending` → `permission-confirmed` and the Airtable Permission column to "Confirmed".

## Featured house on the home page
Tick **Featured on home** in Airtable › Residences. The first ticked house fills the navy band under the founder note, and its journal story (if one links to the house) adds a "Watch the episode" link. Untick to remove. Currently: Monwana Villa.

## Journal films (Wild Together episodes)
In Airtable › Journal, paste the 11-character **YouTube ID** (the part after `v=` or after `youtu.be/`), plus optional **YouTube title** and **YouTube credit**. The story then shows the film in a navy band and tells Google it is a video (VideoObject). Until then, tick **Film planned** and type the episode name — readers see a tidy "Film to come" slot and nothing is claimed to Google.
Wild Together is James and Miriam's own film series, not a partner's film. The Monwana episode (YR_8uiBObZ4) is credited "Film by Felix Studios and Monwana"; lib/wild-together.ts holds its title, description and credit, and gives its VideoObject Felix Studios as creator and production company and Monwana as contributor.

## The MORE / Lion Sands collection (added Oct 2026)
- Houses: G-009 Fish Eagle Villa (Lion Sands, sleeps 8), G-010 Hinkwenu Villa (Lion Sands, sleeps 6), G-011 Monwana Villa (Thornybush, sleeps 6, featured).
- Package: "A Night Under the Stars: Four Days at Lion Sands" (Itineraries) — three villa nights, one in the Kingston treehouse; Chalkley for couples.
- Story: "Wild Together at Monwana…" (Journal No. 03) with the episode slot.
- James approved the verdicts and his other lines for the MORE villas on 30 Oct 2026 (they were marked as drafts until then). Items marked [confirm] (check-in times, deposit, cancellation, treehouse price) need MORE's answer before Live.

## Image crops (Oct 2026)
- Every framed photo asks Cloudinary for a **subject-aware crop** (`ar_…,c_fill,g_auto`) in the shape of its frame, so a portrait leopard or a wide pool lands on the subject rather than the centre. Shapes: house cards 5:4 · home cards 6:5 · experiences 11:10 · itinerary cards 4:3 · journal hero 16:9 · journal figures 5:3 · taped photos 5:4 · host headshot 1:1.
- Full-bleed heroes are not pre-cropped (their shape changes from phone to desktop); pick a hero that is at least **1920 px wide**, with the subject in the middle third.
- Size guide for operator photos: Hero 2400 px+ (min 1920) landscape · Gallery / Card 1600 px+ · Experience 1200 px+ · any shape works, the crop is automatic.

## Episode cross-sell
The featured house's film (Residences › YouTube ID, or its journal story's) also appears as a "second chapter" band on every other house and itinerary in the **same setting**, with "Plan both houses" (pre-fills the Plan form with both). Today: the Monwana episode on Fish Eagle, Hinkwenu and the Lion Sands package.

## On the Horizon (new places, approved) — Airtable › Horizon
- Pages: `/horizon` (all, with a "Be the first" sign-up) and `/horizon/[slug]` (first-look post). Home shows the first three under the featured house; nav and footer link to it.
- Each row: Entry No. (H-01…, never reuse), Status (**Draft preview** = shown with a "first look" ribbon and hidden from Google · **Live** · **Moved to Ledger** · **Paused**), Setting (picks the ink), Opens (stamp), Facts (`Label: value` per line), Body (journal format), FAQs (`Q:` / `A:` pairs), To confirm, Sources (`Title | URL`), Pairs with (slug).
- No partner photos until the house grants permission — the cards are designed to work without them. Add "Hero (Cloudinary ID)" later.
- When James vets a place: add it to Residences with a G- number, then set the Horizon row to **Moved to Ledger** (it disappears from /horizon).
- "Be the first" sign-ups land in the Inquiries base with Occasion = "Be the first · On the Horizon" and the place in "Houses of interest".
- Emails: `emails/be-the-first-launch.html` (Klaviyo-ready) and `emails/on-the-horizon-series.md` (subjects, preview text, cadence, ideas).


## House films — YouTube in every property (plays inside the site)
1. On YouTube, open the film → **Share** → **Copy link**.
2. Airtable › Residences › the house › paste into **YouTube link**. Add **YouTube title** and **YouTube credit**, worded "Film by …" (e.g. "Film by Nancy D. Brown, travel writer"; the Wild Together episode at Monwana, James and Miriam's own series, is "Film by Felix Studios and Monwana").
3. More than one film? Put the others in **More YouTube links**, one per line: `Treehouse night | https://youtu.be/XXXXXXXXXXX`.
4. Within the hour the house page shows "The Film" band: a still with a play button. Visitors press play and it plays right there (YouTube's privacy-enhanced player loads only on press, so the page stays fast). Google gets a VideoObject for each film.
Journal stories use **YouTube ID** in the Journal table the same way (a full link works there too).

## Advisors (/advisors)
Advisor-led platform page with the application form. Applications land in Airtable › Inquiries (wild_co_gather base) with Occasion = "Advisor application"; answers (agency, host agency/consortium, where based, family-travel focus, a gathering they'd love to plan) are in "Must-haves".

## Webinars (/webinars) — Airtable › Webinars
1. **Announced** (now): the page shows the introduction, host and agenda with **Register interest** — sign-ups land in Inquiries with Occasion "Webinar: [title]".
2. When Livestorm is set up: paste the Livestorm registration link into **Livestorm link**, set **Starts** (date and time, New York), change Status to **Scheduled**. The button becomes **Register on Livestorm**, and Google is told it is an online event.
3. After the session: paste the YouTube link into **Recording (YouTube link)** and set Status to **Recorded** — the recording plays on the page.
4. **Host photo**: when Harry Tyner's photo arrives, upload to Cloudinary (e.g. `gatherings/hosts/harry-tyner`) and paste the ID into **Host photo (Cloudinary ID)** here and **Host headshot (Cloudinary ID)** on each Ted Turner Reserves house.
A webinar shows on every house whose **Partner name** matches its **Partner** (Ted Turner Reserves → all four reserves).

## Partner line, host and logos (Residences)
- **Partner name** shows under the hero: "In partnership with Ted Turner Reserves" (+ a link to that partner's webinar).
- **Partner logo (Cloudinary ID)**: upload the partner's own logo file (from their media kit, with permission) to Cloudinary, e.g. `partners/ted-turner-reserves-logo`, and paste the ID. It replaces the typed name. We don't redraw partner logos.
- **Host name / Host title / Host note / Host headshot** fill the Host card. The "Vetted in conversation" stamp only appears once James has met the host (the sample data's `metOn`).
- Ted Turner Reserves houses: host **Harry Tyner**, "Host, Ted Turner Reserves" — photo to come.

## Adding 10–12 more properties (batch)
Do steps 1–3 for all houses first, then 4–7 house by house.
1. **Cloudinary** — make one folder per house: `gatherings/[house-slug]/`. Name each file what it shows plus the place: `private-pool-[house]`, `family-suite-[house]`, `leopard-[reserve]`. Upload. Tag every file `gatherings` + the house slug + `permission-confirmed` (or `permission-pending` until the partner says yes).
   - Sizes: **Hero 2400 px wide or more** (1920 minimum), landscape, subject in the middle third · Gallery / Card 1600 px+ · Experience 1200 px+. Any shape works — the site crops around the subject automatically.
2. **Airtable › Partners** — one row per operator: Image permission, Image credit line, contact.
3. **Airtable › Residences** — one row per house (see "Adding the next stay" above): Entry No. G-012, G-013… in order, **Setting**, **Country** via Destination (this puts it in the right region automatically), Latitude/Longitude (for the region map), **Partner name**, **YouTube link**.
4. **Airtable › Images** — one row per photo with the Cloudinary public ID, Role (Hero / Card / Gallery strip / Feature / Experience), Order, Alt text (what's in the photo + the place), Credit, Permission.
5. **Room Categories**, **FAQs** (written as families and advisors ask — see `docs/seo-aeo-playbook.md`), **Experiences**.
6. Status **Vetting** to show it; James's verdict written by James.
7. Optional: an Itinerary, an Offer, a Journal story, a Wild Together film.
A new country not yet on the region list? Add it to `lib/regions.ts` (one word in the right list) — or it falls into USA & Mexico.

## Brand kit (approved Oct 2026)
The brand kit (delivered as the `wild-co-brand-kit-*.zip` files — keep them in your Drive, not in GitHub) holds every badge, stamp, luggage tag, VIP card, setting colour card, Horizon stamp, offer stamp, tape and frame as print PNG and email/social JPG, with its `README.md` explaining what each means and how it is set from Airtable. The site draws the same designs live from `components/Marks.tsx`.

## SEO & AEO
See `docs/seo-aeo-playbook.md` — keyword and question clusters for families and advisors, the answer-first pattern, structured data by page, the next ten pages to write, and what to measure.

## Natural Selection Coast (added Oct 12, 2026) — Gatherings VIP
- Houses: **G-012 Lekkerwater Beach Lodge, De Hoop** (7 suites, children 6+, whales Aug–Oct) and **G-013 GweGwe Beach Lodge, Wild Coast** (9 pool suites, all ages). Both Coast & Island, region Africa, stamp Under observation, VIP collection `/vip/natural-selection-coast`.
- Itinerary: "Whale Season: Four Days at Lekkerwater" (Draft preview).
- Partner: Natural Selection (Airtable › Partners, Image permission **Requested**). 20 photos in Cloudinary tagged `permission-pending`; their web images are only 1100 px wide — ask Natural Selection for the hi-res set and replace (same public IDs) so the heroes are sharp.
- Still to confirm with Natural Selection (marked [confirm] on the pages): rate basis (per person or per suite), board/inclusions, exclusive-use terms and maximum guests, check-in/out, deposit, cancellation, GweGwe flight route.

## Maps — Mapbox, in the brand style (added Oct 12, 2026)
Maps now sit at the **bottom** of every stay feature: on region pages (/destinations/…) the stays come first and the map follows; every house page ends with a "Where is …?" section and a zoomed map of that house.

**Turn Mapbox on (5 minutes, no code)**
1. Create a free account at mapbox.com → **Tokens** → *Create a token*. Leave the public scopes as they are and add URL restrictions for your domain(s) and `*.vercel.app` previews.
2. Vercel → wildcogather → Settings → Environment Variables:
   - `NEXT_PUBLIC_MAPBOX_TOKEN` = the `pk.…` token
   - `NEXT_PUBLIC_MAPBOX_THEME` = `paper` (approved look; also `coast` or `night`)
3. Redeploy. Without a token the site keeps the plain OpenStreetMap map, so nothing breaks.

**Optional: your own Mapbox Studio style (the finished "Paper Atlas")**
In Mapbox Studio → New style → **Monochrome** (Light) template → set land `#F4F1EC`, water `#D3DFDC`, parks `#ECE7DB`, roads `#DCCFB6`, labels `#5C564D` with a `#F4F1EC` halo, country borders dashed ink at 50%. Upload the brand fonts (IBM Plex Mono for place names, Cormorant Garamond Italic for water and regions — both open licence) and hide POIs, transit and road labels. Publish, copy the style URL (`mapbox://styles/<you>/<id>`) into `NEXT_PUBLIC_MAPBOX_STYLE`. When that variable is set the site uses the Studio style exactly; when it isn't, the site recolours Mapbox Light to the same palette automatically (`lib/map-theme.ts`).

**Markers** are drawn by the site in each house's setting ink with its list number; houses at the same lodge share one pin (e.g. "01·02"). The popup card links to the house page. Scroll-zoom needs ⌘/Ctrl (two fingers on phones) so the page still scrolls.

Free tier: 50,000 web map loads a month (check mapbox.com/pricing for current terms).

## Approval & sources policy (Oct 12, 2026)
- James has met the team at every house and Horizon place; all content is approved. Houses that were "Under observation" now carry **Host met**; houses James has stayed at keep **Founder inspected & approved**. Statuses are **Approved**.
- **No outside sources or links to other travel companies on the site.** Horizon pages no longer show a Sources list, an "Official site" link or a "still confirming" box, and house/Horizon structured data no longer links to partner sites. Keep source notes in Airtable for our records only (Horizon › Sources and Residences › Official URL are not displayed).
- Empty booking facts (check-in, deposit, cancellation, taxes) are hidden automatically; fill them in Airtable when the house sends them.

## At the Table — dining & shared-table cards (added Oct 12, 2026)
A stay's page can carry an **At the table** section: a question heading ("Where do families eat at …?"), a short answer, and one card per restaurant, dinner experience or family night. First stay: Lone Mountain Ranch (sleigh-ride dinner, Sunday BBQ, Horn & Cantle, day sleigh & lunch, ranch rodeo, Auric Room 1915).

**Add cards for any stay (Airtable › At the Table)** — one row per card: Name, House slug (e.g. `lone-mountain-ranch`), Kind (Restaurant / Dinner experience / Family night / Lunch experience / Bar & lounge / Private dinner), Where, When, Who can come, Why it works for a gathering (30–50 words in James's voice — this is what AI answers quote), On the table (one dish per line), Booking, Order, Status (Live / Hidden). A stay with no rows shows no section. Never paste outside links or booking-platform names — booking goes through us.

**Photos (Cloudinary)** — upload to `gatherings/<house-slug>/table/<card-slug>` (e.g. `gatherings/lone-mountain-ranch/table/sleigh-ride-dinner`), then put that ID in **Image (Cloudinary ID)** with alt text. Only upload photos we own or have permission to use. Cards are designed to stand on their own without a photo.

**Search** — each card adds an amenity to the house's LodgingBusiness schema; restaurants and bars are also listed as places inside the house (Restaurant / BarOrPub), and "Where do families eat at …?" is added to the page's FAQ schema.

## .Here Maldives — photos and partner approval (Oct 12, 2026)
.Here approved us, as a wholesale tour operator, for all image use (logged in Airtable › Partners). 39 photos are in Cloudinary under `gatherings/here-maldives/` with search-friendly names, alt text and the credit "Courtesy of .Here Maldives".
- **Horizon post** (/horizon/here-somewhere-nowhere-maldives): aerial hero, an "Inside .Here" photo strip, "What is there to do at .Here?" experience cards (mantas, diving, ASMAS, sandbank, watersports, Finolhu, spa, yoga) and "At the table" dining cards (SAFAR, dinner at the residence, sandbank lunch, sunset on ASMAS).
- **Airtable › Horizon** has two new fields any Horizon post can use: **Gallery (Cloudinary IDs)** — one photo per line `id | alt text`; **Experiences** — one per line `Name | sentence | image id`.
- **Horizon cards** (home page and /horizon) now lead with the hero photo whenever one is set.
- **The Ledger** shows a photo thumbnail for every house (its Card photo, else its Hero).

## The Cape & a malaria-free safari (Oct 2026)

- New stays G-014 to G-017: Jaci's Madikwe House, Morukuru Farm House, Morukuru River House & Owner's House (Madikwe, malaria-free Big Five) and Leeu Estates (Franschhoek). Data in `lib/sample-capesafari.ts`, mirrored to Airtable (Residences, Images, Experiences, FAQs, Room Categories, Destinations "Madikwe Game Reserve" and "Franschhoek").
- Photos in Cloudinary under `gatherings/jacis-madikwe-house/`, `gatherings/morukuru-farm-house-madikwe/`, `gatherings/morukuru-river-house-madikwe/`, `gatherings/morukuru-madikwe-wildlife/` and `gatherings/leeu-estates-franschhoek/` (tag `cape-and-safari`). Airtable Images › Permission is "Pending" until each partner confirms in writing.
- Multi-stay journeys: Itineraries › **Stops** (one line per chapter: `house-slug | nights | label | other-slugs`). The itinerary page shows each chapter as a card, lists every house in the TouristTrip schema, and the journey appears on each stop's house page. First journey: `/itineraries/cape-winelands-malaria-free-safari-nine-days`.

## .Here and Villa Ardore (Oct 2026)

- .Here moved from On the Horizon into the Ledger as G-018 (`lib/sample-here.ts`); Airtable Horizon › Status = "Moved to Ledger". `/horizon/<slug>` now permanently redirects to `/houses/<slug>` for any Horizon entry that has become a stay.
- Villa Ardore, Chianti (G-019, `lib/sample-italy.ts`) with a 7-day Tuscan reunion itinerary and At the Table cards. Photos in Cloudinary `gatherings/villa-ardore-tuscany/`.

## ULUM Moab (Oct 2026)

- ULUM Moab, Utah (G-020, `lib/sample-utah.ts`): J.W.'s favourite family stay, Founder inspected & approved April 2023, setting Desert. Photos in Cloudinary `gatherings/ulum-moab/` (partner use approved).
- 6-day "Red Rock Family Adventure" itinerary with a one-night White Rim 4x4 trip, and three At the Table cards. All mirrored in Airtable (Residence recgqsCsjMvXoj3JA).

## Founder story (Oct 2026)

- `/founder` — James Wild's story since 1982: bio, the road so far (timeline), "On Africa" quotes, how James guides a family, and an FAQ. Content lives in `lib/founder.ts`; James's own photos are in `public/founder/`.
- Linked from the header ("Our Founder"), footer, home page teaser and every Journal byline by James. Schema: ProfilePage + Person (`/founder#james-wild`, also referenced from the site Organization `founder`), BreadcrumbList and FAQPage.

## Sketch borders and the Ledger registry (Oct 2026)

- Every page ends with one luxe pen-and-ink border (`components/PageSketch.tsx`) above the Plan band: a stay page wears its setting's drawing, a destination its region's (`REGION_SKETCH`), the founder page the savanna, and index pages, itineraries and journal entries without a house the route divider. Drawings live in Cloudinary under `gatherings/sketch-borders/luxe/`; effects and crops in `lib/sketch-borders.ts`. Review board: `/studio/sketch-borders` (noindex).
- Ledger registry for the chat agent and LLMs: `/ledger.json`, `/llms.txt`, `/llms-full.txt`, built by `lib/ledger-registry.ts` from live Airtable data. House IDs are the permanent Entry No. (`G-###`); see `docs/ledger-ids.md` for the ID map with Airtable record IDs. Airtable › Residences now has a **Ledger key** formula and **Page path** points at `/houses/<slug>`.
- Each house page's LodgingBusiness schema carries `@id` (`/houses/<slug>#stay`) and `identifier` (its Ledger ID).

## James Wild & Co ecosystem (Oct 2026)

Gatherings is now one of four volumes (Stays · Safaris · Gatherings · Voyages) with My Folios, Iggi and the shared Ledger. See **docs/ecosystem.md** for the navigation config, the shared record structure (JWC entity IDs, evidence, parent/child residences), what is connected versus saved on the device, and the future connections. Run `npm run check:ledger` before releasing data changes.
