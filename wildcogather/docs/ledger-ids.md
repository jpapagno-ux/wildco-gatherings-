# Ledger IDs — houses and stays

The permanent ID map for the chat agent, LLM tooling and anyone wiring data between Airtable, the site and Cloudinary.
Snapshot taken 13 Oct 2026 from Airtable base `appnpcCxUZcapAgbo`, table Residences (`tblu56b1GVBBnxJZt`).

**Rules**
- A house's Ledger ID is its Airtable **Entry No.** (`G-###`). It never changes once published. If a house leaves the Ledger, retire the number; never reuse it.
- The **Ledger key** (`<ID> · <slug>`) is a formula field in Airtable (Residences › Ledger key) and is repeated in `/ledger.json`.
- Page path is Airtable **Page path** (`/houses/<slug>`); photos live in Cloudinary under `gatherings/<slug>/`.
- On the Horizon places carry `H-##` IDs (Horizon › Entry No.) until they move into the Ledger and take the next `G-###`.
- Live, always-current data: `/ledger.json` (JSON), `/llms.txt` (index), `/llms-full.txt` (full text). This file is the snapshot that also records Airtable record IDs, which the public endpoints leave out.

| Ledger ID | Slug | House | Airtable record | Setting | Stamp |
|---|---|---|---|---|---|
| G-001 | lone-mountain-ranch | Lone Mountain Ranch | recoQ6f73nW21Razy | Mountain | Host met |
| G-002 | como-shambhala-estate | COMO Shambhala Estate | recYRFWuhxPsiLeeu | Jungle | Field verified |
| G-003 | como-uma-canggu | COMO Uma Canggu | recjflqH8nUkFqVbC | Coast & Island | Field verified |
| G-004 | como-parrot-cay | COMO Parrot Cay | recnnGMwHXtnwCQAI | Coast & Island | Host met |
| G-005 | vermejo-ted-turner-reserve | Vermejo, a Ted Turner Reserve | recDuwaeKFsbLAl9D | Mountain | Host met |
| G-006 | ladder-ted-turner-reserve | Ladder, a Ted Turner Reserve | recd7wVxWbZVQ2eUZ | Desert | Host met |
| G-007 | armendaris-ted-turner-reserve | Armendaris, a Ted Turner Reserve | recvo5rEXfTm9y1oX | Desert | Host met |
| G-008 | sierra-grande-ted-turner-reserve | Sierra Grande Lodge & Spa | reciA2DzctebamoNL | Desert | Host met |
| G-009 | fish-eagle-villa-lion-sands | Fish Eagle Villa, Lion Sands | rect9ErQCS2S1rOjs | Savanna | Field verified |
| G-010 | hinkwenu-villa-lion-sands | Hinkwenu Villa, Lion Sands | recjo4gzwBAhaqynO | Savanna | Field verified |
| G-011 | monwana-villa-thornybush | Monwana Villa | recz5pUi0VjL7R26H | Savanna | Field verified |
| G-012 | lekkerwater-de-hoop | Lekkerwater Beach Lodge, De Hoop | recM0ueGmxq6FUDzo | Coast & Island | Host met |
| G-013 | gwegwe-beach-lodge-wild-coast | GweGwe Beach Lodge, Wild Coast | recRddcopNw4jdCst | Coast & Island | Host met |
| G-014 | jacis-madikwe-house | Jaci's Madikwe House | recOAKGMJtGla55Vt | Savanna | Field verified |
| G-015 | morukuru-farm-house-madikwe | Morukuru Farm House, Madikwe | recROp6M3qMUsD1CW | Savanna | Host met |
| G-016 | morukuru-river-house-madikwe | Morukuru River House & Owner's House | rec38NPfeschPfPgZ | Savanna | Host met |
| G-017 | leeu-estates-franschhoek | Leeu Estates, Franschhoek | rectcL7yi6iJ0z5gX | Mountain | Field verified |
| G-018 | here-somewhere-nowhere-maldives | .Here — Somewhere & Nowhere | recq4kU25rtnDe2Nh | Coast & Island | Host met |
| G-019 | villa-ardore-tuscany | Villa Ardore, Chianti | recorDCbgvSYuP7uC | Mountain | Host met |
| G-020 | ulum-moab | ULUM Moab | recgqsCsjMvXoj3JA | Desert | Field verified |

Next free ID: **G-021**.
