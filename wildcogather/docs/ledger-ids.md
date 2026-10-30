# Ledger IDs — houses and stays

The permanent ID map for the chat agent, LLM tooling and anyone wiring data between Airtable, the site and Cloudinary.
Snapshot taken 13 Oct 2026 from Airtable base `appnpcCxUZcapAgbo`, table Residences (`tblu56b1GVBBnxJZt`).

**Rules**
- A house's Ledger ID is its Airtable **Entry No.** (`G-###`). It never changes once published. If a house leaves the Ledger, retire the number; never reuse it.
- The **Ledger key** (`<ID> · <slug>`) is a formula field in Airtable (Residences › Ledger key) and is repeated in `/ledger.json`.
- Page path is Airtable **Page path** (`/houses/<slug>`); photos live in Cloudinary under `gatherings/<slug>/`.
- On the Horizon places carry `H-##` IDs (Horizon › Entry No.) until they move into the Ledger and take the next `G-###`.
- Live, always-current data: `/ledger.json` (JSON), `/llms.txt` (index), `/llms-full.txt` (full text). This file is the snapshot that also records Airtable record IDs, which the public endpoints leave out.

| Ledger ID | Entity ID | Slug | House | Airtable record | Setting | Stamp |
|---|---|---|---|---|---|---|
| G-001 | JWC-P-0001 | lone-mountain-ranch | Lone Mountain Ranch | recoQ6f73nW21Razy | Mountain | Host met |
| G-002 | JWC-P-0002 | como-shambhala-estate | COMO Shambhala Estate | recYRFWuhxPsiLeeu | Jungle | Founder inspected & approved |
| G-003 | JWC-P-0003 | como-uma-canggu | COMO Uma Canggu | recjflqH8nUkFqVbC | Coast & Island | Founder inspected & approved |
| G-004 | JWC-P-0004 | como-parrot-cay | COMO Parrot Cay | recnnGMwHXtnwCQAI | Coast & Island | Host met |
| G-005 | JWC-P-0005 | vermejo-ted-turner-reserve | Vermejo, a Ted Turner Reserve | recDuwaeKFsbLAl9D | Mountain | Host met |
| G-006 | JWC-P-0006 | ladder-ted-turner-reserve | Ladder, a Ted Turner Reserve | recd7wVxWbZVQ2eUZ | Desert | Host met |
| G-007 | JWC-P-0007 | armendaris-ted-turner-reserve | Armendaris, a Ted Turner Reserve | recvo5rEXfTm9y1oX | Desert | Host met |
| G-008 | JWC-P-0008 | sierra-grande-ted-turner-reserve | Sierra Grande Lodge & Spa | reciA2DzctebamoNL | Desert | Host met |
| G-009 | JWC-R-0001 (in JWC-P-0009) | fish-eagle-villa-lion-sands | Fish Eagle Villa, Lion Sands (also Safaris WCS-ZA-SAB-25) | rect9ErQCS2S1rOjs | Savanna | Founder inspected & approved |
| G-010 | JWC-R-0002 (in JWC-P-0010) | hinkwenu-villa-lion-sands | Hinkwenu Villa, Lion Sands (also Safaris WCS-ZA-SAB-24) | recjo4gzwBAhaqynO | Savanna | Founder inspected & approved |
| G-011 | JWC-R-0003 (in JWC-P-0011) | monwana-villa-thornybush | Monwana Villa (also Safaris WCS-ZA-THB-07) | recz5pUi0VjL7R26H | Savanna | Founder inspected & approved |
| G-012 | JWC-P-0012 | lekkerwater-de-hoop | Lekkerwater Beach Lodge, De Hoop | recM0ueGmxq6FUDzo | Coast & Island | Host met |
| G-013 | JWC-P-0013 | gwegwe-beach-lodge-wild-coast | GweGwe Beach Lodge, Wild Coast | recRddcopNw4jdCst | Coast & Island | Host met |
| G-014 | JWC-R-0004 (in JWC-P-0014) | jacis-madikwe-house | Jaci's Madikwe House | recOAKGMJtGla55Vt | Savanna | Founder inspected & approved |
| G-015 | JWC-R-0005 (in JWC-P-0015) | morukuru-farm-house-madikwe | Morukuru Farm House, Madikwe | recROp6M3qMUsD1CW | Savanna | Host met |
| G-016 | JWC-R-0006 (in JWC-P-0015) | morukuru-river-house-madikwe | Morukuru River House & Owner's House | rec38NPfeschPfPgZ | Savanna | Host met |
| G-017 | JWC-P-0016 | leeu-estates-franschhoek | Leeu Estates, Franschhoek | rectcL7yi6iJ0z5gX | Mountain | Founder inspected & approved |
| G-018 | JWC-P-0017 | here-somewhere-nowhere-maldives | .Here — Somewhere & Nowhere | recq4kU25rtnDe2Nh | Coast & Island | Host met |
| G-019 | JWC-P-0018 | villa-ardore-tuscany | Villa Ardore, Chianti | recorDCbgvSYuP7uC | Mountain | Host met |
| G-020 | JWC-P-0019 | ulum-moab | ULUM Moab | recgqsCsjMvXoj3JA | Desert | Founder inspected & approved |
| G-028 | JWC-R-0008 (in JWC-P-0027) | fort-house-kwandwe | Fort House, Kwandwe (also Safaris WCS-ZA-ECP-06) | rec4pLHT4hfvP7vvY | Savanna | Vetted partner |
| G-029 | JWC-R-0009 (in JWC-P-0027) | melton-manor-kwandwe | Melton Manor, Kwandwe (also Safaris WCS-ZA-ECP-07) | recQr7s0yUUi80Tqm | Savanna | Vetted partner |
| G-030 | JWC-R-0010 (in JWC-P-0027) | uplands-homestead-kwandwe | Uplands Homestead, Kwandwe (also Safaris WCS-ZA-ECP-08) | rec5PskhMZ50nXe6S | Savanna | Vetted partner |
| G-031 | JWC-R-0011 (in JWC-P-0028) | pioneer-camp-londolozi | Pioneer Camp, Londolozi (also Safaris WCS-ZA-SAB-15) | recm9wvsx8iMW9cAk | Savanna | Founder inspected & approved |
| G-032 | JWC-R-0012 (in JWC-P-0028) | private-granite-suites-londolozi | Private Granite Suites, Londolozi (also Safaris WCS-ZA-SAB-29) | recC5JVy99ekJ4vxn | Savanna | Founder inspected & approved |
| G-033 | JWC-R-0013 (in JWC-P-0029) | marataba-villa-marakele | Marataba Villa (also Safaris WCS-ZA-MRT-03) | recxfYkdOqMfsIvUf (Prospect until merge) | Savanna | Vetted partner |
| G-034 | JWC-R-0014 (in JWC-P-0030) | cape-cadogan-villa-cape-town | Cape Cadogan Villa (also Safaris WCS-ZA-CPT-05) | recny63Q2oVju0tzQ (Prospect until merge) | Mountain | Vetted partner |

Next free IDs: **G-035** (Gatherings reference) · **JWC-P-0031 / JWC-R-0015** (entity) · **JWC-V-0070** (evidence). G-021 to G-027 are the drafts added 14–21 Oct (see data/entities.json); G-028 to G-030 are the Kwandwe villas and G-031 / G-032 the two Londolozi camps booked whole, all cross-listed with the Safaris volume (30 Oct 2026). G-033 / G-034 are the MORE villas at Marataba and Cape Cadogan; with G-009 to G-011 they make the MORE collection at /collections/more (not Gatherings VIP). Safaris IDs are kept for matching only and are never rendered as links (James, 30 Oct 2026). The G-number is a collection reference; the JWC entity ID is the permanent identity shared across volumes. See docs/ecosystem.md.
