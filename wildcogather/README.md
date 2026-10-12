# Wild & Co Gatherings

A house of James Wild & Co. Next.js site, deployed on Vercel from GitHub. Content comes from Airtable; photos from Cloudinary.

## Pages
- `/` Home — hero, curated stay collection with scrollable cards, archive strip, Gathering Formula, destination links
- `/destinations/[region]` Region landing pages — editorial stay list beside a live, scroll-synced Leaflet map (stacked on mobile)
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

`lib/destinations.ts` is the shared source for navigation, routes, sitemap, map views and residence assignment. The six routes are `/destinations/usa-mexico`, `/destinations/caribbean`, `/destinations/latin-america`, `/destinations/europe`, `/destinations/asia`, and `/destinations/oceania`. Unknown route slugs return 404.

Assignment uses a residence’s optional `destinationRegion` slug first, then its exact country, then a recognized broad `region` label. In Airtable, set `Destination region` on a Residence or `Region` on its linked Destination to a label above or its route slug. Local `Destination` names still supply the place/region display text. Country matching takes precedence over local region names (for example, New Mexico is in the United States, not Latin America); Mexico belongs to USA & Mexico and Caribbean islands belong to Caribbean. Add country aliases to the shared mapping when needed. Unknown countries are **not** silently assigned to USA & Mexico: the server logs an assignment warning; correct the source or set an explicit supported group. Content outside these six groups needs an editorial decision, not an invented location.

### Live map examples
- `/destinations/usa-mexico`: supplied GPS pins for Lone Mountain Ranch and Vermejo.
- `/destinations/asia`: supplied GPS pin for COMO Shambhala Estate.
- `/destinations/caribbean`: Parrot Cay is listed, but its sample data does not yet supply GPS.
- Europe, Latin America and Oceania currently have no sample stays. They still show real draggable/zoomable regional maps and an enquiry/browse-all empty state, not fictional residences or placeholder maps.

Destination maps load Leaflet only in the browser and use live OpenStreetMap tiles, with attribution and no API key. Drag, pinch or use + / − to explore; “Enable scroll zoom” opts into wheel zoom without hijacking page scrolling. Numbered pins select/focus the matching card, while scrolling the list highlights a pin and flies to its supplied GPS location. Reduced-motion preferences disable animated fly-to. “Show all locations” restores the overview. Only finite, in-range Latitude/Longitude values are pinned; missing GPS stays remain visible with a clear notice. Do not add approximate coordinates without checking them with the property.

Map tiles require access to `https://tile.openstreetmap.org`; blocked requests show a network notice while cards and GPS details remain usable. Production availability depends on deployment and tile connectivity; a repository push alone is not a production visual check.

## Run it the first time
1. Install Node 20+.
2. `npm install`
3. `npm run dev` → http://localhost:3000
4. `npm run build` to verify the app compiles.

## Visual verification
Run `npm run build` and `npx tsc --noEmit` from `wildcogather/` to confirm the navigation, region pages, and property cards render without type errors.

In `npm run dev`, open each of the six destination routes. Check the Stays dropdown by touch/keyboard, pan and zoom the map, reset its overview, select a numbered pin, and scroll through the USA & Mexico list to verify pin/card synchronization. Check the empty regions and missing-GPS cards on mobile too. Google Fonts must be reachable for the existing `next/font` build step.
