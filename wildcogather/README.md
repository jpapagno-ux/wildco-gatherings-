# Wild & Co Gatherings

A house of James Wild & Co. Next.js site, deployed on Vercel from GitHub. Content comes from Airtable; photos from Cloudinary.

## Pages
- `/` Home — hero, curated stay collection with scrollable cards, archive strip, Gathering Formula, destination links
- `/destinations/[region]` Region landing pages — region intro, map, and a horizontally scrollable property gallery
- `/ledger` The Gatherings Ledger — every house, entry number, stamp, first visited
- `/houses/[slug]` Ledger Entry
- `/vip` Gatherings VIP
- `/journal` and `/journal/[slug]` The Journal
- `/plan` Plan a Gathering — form that saves to the Airtable `Inquiries` table

## Destination regions
- `USA & Mexico`
- `Caribbean`
- `Latin America`
- `Europe`
- `Asia`
- `Oceania`

To add or adjust a property’s destination group, update the `regionForResidence` mapping in `app/destinations/[region]/page.tsx` and set a property’s `region` / `country` values in the content source. Each property card can then render the correct region landing page and map anchor.

## Run it the first time
1. Install Node 20+.
2. `npm install`
3. `npm run dev` → http://localhost:3000
4. `npm run build` to verify the app compiles.

## Visual verification
Run `npm run build` and `npx tsc --noEmit` from `wildcogather/` to confirm the navigation, region pages, and property cards render without type errors.
