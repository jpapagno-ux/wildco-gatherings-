# James Wild & Co · Ephemera kit (approved Oct 2026)

The badges, stamps, luggage tags, VIP cards, setting colour cards, tape and photo frames used across Wild & Co Gatherings.

**Two versions of every piece**
- **On the website** they are drawn live by code (`components/Marks.tsx`) from each house's own data — name, entry number, setting, status. A new house gets its tag, stamp and VIP mark automatically; nobody has to make artwork.
- **This folder** holds high-resolution copies for everything else: social posts, email, print, slides and partner decks.
  - `png/` — transparent, print resolution (use on photos and coloured backgrounds)
  - `jpg/` — on paper stock, smaller files (use in email and social)
- `../public/kit/` holds web-size copies that the site and emails link to directly.

## The pieces and what they mean

| Piece | Files | Means | Where it appears on the site | Set by (Airtable) |
|---|---|---|---|---|
| Ledger stamps (oxblood, round) | `stamp-under-observation`, `stamp-host-met`, `stamp-field-verified`, `stamp-gathering-verified`, `stamp-founder-favorite` | The one status a house has earned | Beside James's signature on each house; the Ledger | Residences › **Ledger stamp** (or Status) |
| Entry stamp / archive image | `stamp-entry`, `stamp-archive-image` | Ledger number; "from the archive" photos | Journal, archive strip | automatic |
| Luggage tag (by setting) | `tag-mountain`, `-jungle`, `-coast`, `-desert`, `-savanna`, `-polar` | Which natural setting the house belongs to | Hanging on each house hero | Residences › **Setting** + **Entry No.** |
| Gatherings VIP stamp (oval) | `vip-stamp-[setting]`, `vip-stamp-house`, `vip-stamp-cream` | Vetted in Purpose — VIP houses only | VIP block on VIP houses; /vip | Residences › **VIP (Vetted in Purpose)** |
| VIP cards (setting colour cards) | `vip-card-[setting]` | The VIP card in each setting's ink | /vip, partner decks, social | Residences › **Setting** |
| On the Horizon stamp (rectangular) | `horizon-stamp-[setting]` | New place, **not yet vetted** | /horizon cards and posts | Horizon › **Setting**, **Entry No.**, **Opens (stamp)** |
| Worth Another Night stamp + ticket | `offer-stamp-stay3-pay2`, `offer-ticket-como-shambhala` | Stay 3, pay 2 offers | Offer ticket on the house page | Offers table |
| Postmarks | `postmark-nassau`, `postmark-ubud` | Dateline | Journal posts, thank-you page, emails | automatic (place + date) |
| Tape + photo frame | `tape-cream`, `tape-kraft`, `tape-cream-long`, `photo-frame` | James's own photographs | Taped photo on the house page; host photo | Images › Role = **Card** |
| Taped photo cards (samples) | `photo-card-mountain`, `-jungle`, `-coast` | Social/email examples | not on site | — |
| Hare seal | `../public/brand/jwco-hare-*.png` | James Wild & Co · Ledgered & Vetted · since 1982 | Header, footer, sign-offs, icon, share image | — |

## Setting inks (one colour per natural setting)
Mountain `#33505F` · Jungle `#2E5A3F` · Coast & Island `#22656E` · Desert `#A1512F` · Savanna `#866127` · Polar & Ice `#3C6487`. Interface colours stay paper `#F4F1EC`, ink `#2C2A27`, rust `#94512F`, navy `#1E2A38`; oxblood `#7A1E1E` is for the seal and Ledger stamps only.

## Use sparingly
One piece per screen view, three per page at most, never over text. A Ledger stamp is only ever the status a house has actually earned; VIP pieces only on VIP houses; the Horizon stamp never on a Ledger house; a taped photo only for James's own pictures.

## Configure on the site (no code)
1. **Setting** in Airtable picks the ink for the tag, VIP stamp and Horizon stamp.
2. **Ledger stamp** sets the round stamp. Leave blank to let Status decide.
3. **VIP (Vetted in Purpose)** turns the VIP block on.
4. **Entry No.** (G-0xx for houses, H-0x for Horizon) is printed on the tag and stamps — set once, never reuse.
5. To change the kit itself (colours, wording, wear), edit `components/Marks.tsx` — the PNGs here are exports of the same designs.
