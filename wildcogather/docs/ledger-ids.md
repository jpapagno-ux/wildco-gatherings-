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
| G-009 | JWC-R-0001 (in JWC-P-0009) | fish-eagle-villa-lion-sands | Fish Eagle Villa, Lion Sands | rect9ErQCS2S1rOjs | Savanna | Founder inspected & approved |
| G-010 | JWC-R-0002 (in JWC-P-0010) | hinkwenu-villa-lion-sands | Hinkwenu Villa, Lion Sands | recjo4gzwBAhaqynO | Savanna | Founder inspected & approved |
| G-011 | JWC-R-0003 (in JWC-P-0011) | monwana-villa-thornybush | Monwana Villa | recz5pUi0VjL7R26H | Savanna | Founder inspected & approved |
| G-012 | JWC-P-0012 | lekkerwater-de-hoop | Lekkerwater Beach Lodge, De Hoop | recM0ueGmxq6FUDzo | Coast & Island | Host met |
| G-013 | JWC-P-0013 | gwegwe-beach-lodge-wild-coast | GweGwe Beach Lodge, Wild Coast | recRddcopNw4jdCst | Coast & Island | Host met |
| G-014 | JWC-R-0004 (in JWC-P-0014) | jacis-madikwe-house | Jaci's Madikwe House | recOAKGMJtGla55Vt | Savanna | Founder inspected & approved |
| G-015 | JWC-R-0005 (in JWC-P-0015) | morukuru-farm-house-madikwe | Morukuru Farm House, Madikwe | recROp6M3qMUsD1CW | Savanna | Host met |
| G-016 | JWC-R-0006 (in JWC-P-0015) | morukuru-river-house-madikwe | Morukuru River House & Owner's House | rec38NPfeschPfPgZ | Savanna | Host met |
| G-017 | JWC-P-0016 | leeu-estates-franschhoek | Leeu Estates, Franschhoek | rectcL7yi6iJ0z5gX | Mountain | Founder inspected & approved |
| G-018 | JWC-P-0017 | here-somewhere-nowhere-maldives | .Here — Somewhere & Nowhere | recq4kU25rtnDe2Nh | Coast & Island | Host met |
| G-019 | JWC-P-0018 | villa-ardore-tuscany | Villa Ardore, Chianti | recorDCbgvSYuP7uC | Mountain | Host met |
| G-020 | JWC-P-0019 | ulum-moab | ULUM Moab | recgqsCsjMvXoj3JA | Desert | Founder inspected & approved |

Next free IDs: **G-021** (Gatherings reference) · **JWC-P-0020 / JWC-R-0007** (entity). The G-number is a collection reference; the JWC entity ID is the permanent identity shared across volumes. See docs/ecosystem.md.
