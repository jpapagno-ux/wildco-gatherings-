# Image Management, Cloudinary Integration & Airtable Architecture

*Wild & Co Gatherings — Asset Pipeline, Editorial Standards, and Storage Strategy*

---

## 1. System Architecture & Responsibility Separation

To maintain high visual performance, robust SEO/AEO machine-discoverability, and maintainable editorial workflows, image management is split into three clean layers:

```
┌─────────────────────────────────┐      ┌─────────────────────────────────┐
│           CLOUDINARY            │      │            AIRTABLE             │
│   (Asset Store & Delivery CDN)  │      │  (Metadata & Content Workflow)  │
├─────────────────────────────────┤      ├─────────────────────────────────┤
│ • Master high-res image files   │      │ • Images table (1 row / asset)  │
│ • Automatic format (f_auto)     │      │ • Linked Residences & Stays     │
│ • Automatic quality (q_auto)    │      │ • Factual alt text & captions   │
│ • Dynamic responsive resizing   │      │ • Photog credits & permissions  │
│ • Subject-aware crops (g_auto)  │      │ • Crop overrides & focal points │
└────────────────┬────────────────┘      └────────────────┬────────────────┘
                 │                                        │
                 └───────────────────┬────────────────────┘
                                     │
                                     ▼
                  ┌─────────────────────────────────────┐
                  │          NEXT.JS CODEBASE           │
                  │            (wildcogather/)          │
                  ├─────────────────────────────────────┤
                  │ • Custom loader (cloudinary-loader) │
                  │ • Responsive Photo component        │
                  │ • Aspect-ratio chaining             │
                  │ • Schema.org & OpenGraph metadata   │
                  │ • Fallback handling & type safety   │
                  └─────────────────────────────────────┘
```

1. **Cloudinary (Storage & Delivery)**:
   - Holds master originals and generates derivative transformations on demand.
   - Never edit originals destructively. Let Cloudinary handle responsive widths (`w_...`), format selection (`f_auto`), compression quality (`q_auto`), and subject-aware smart cropping (`c_fill,g_auto`).
   - Cloud Name configured via `NEXT_PUBLIC_CLOUDINARY_CLOUD` (defaulting to `jhlnq5h5`).

2. **Airtable (Metadata & Editorial Workflow)**:
   - The single source of truth for business metadata: which house or experience an image belongs to, visual order, editorial role (`Hero`, `Card`, `Gallery strip`, `Feature`), rights/permissions, verified alt text, and James's captions.
   - Do **not** create a redundant second table or duplicate image rows across content types.

3. **Next.js Codebase (Rendering & Semantics)**:
   - Reads metadata via `wildcogather/lib/data.ts`.
   - Generates valid transformation chains via `wildcogather/lib/cloudinary-loader.ts`.
   - Renders semantic, accessible HTML `<img fill>` elements via `wildcogather/components/Photo.tsx`.
   - Constructs Open Graph (`og:image`) and Schema.org (`ImageObject`) structured metadata for search engines and answer engines.

---

## 2. Airtable Storage Strategy: Single Table vs. Duplicate Tables

### Recommendation: Extend Existing `Images` Table
**Do not create a duplicate all-content table.**
The existing Airtable `Images` table in base `appnpcCxUZcapAgbo` is already designed to hold one record per unique image asset and link to residences via the `Residence` linked record field.

### Key Principles:
1. **Deduplicate by Cloudinary Public ID**:
   - Each unique photograph in Cloudinary gets exactly **one row** in the `Images` table.
   - The primary key / identifier is the `Cloudinary public ID` (e.g. `gatherings/vermejo-ted-turner-reserve/castle-rock-bison-vermejo`).
2. **Linked Relationships**:
   - Link the image record to its parent `Residences` record.
   - Can also link to `Experiences`, `Journal`, or `Itineraries` records as needed without duplicating the image row.
3. **Future Extensibility (Image Placements Junction Table)**:
   - Today, field-level attributes on the `Images` table (e.g., `Role`, `Order`, `Aspect ratio`) satisfy all page needs.
   - If in the future the exact same image is used in multiple places with conflicting requirements (e.g., a 16:9 hero on a house page with focal point `center top`, but a 1:1 square thumbnail on an itinerary with focal point `left center`), an optional `Image Placements` junction table can be introduced linking `Image ID` + `Page/Residence ID` + `Contextual Crop`. For now, this is not needed and simple asset fields are optimal.

---

## 3. Airtable `Images` Table Schema

The repository code in `wildcogather/lib/data.ts` and `wildcogather/lib/types.ts` is fully backward-compatible with existing rows while supporting optional enhancement fields.

### Existing Core Fields
| Field Name | Type | Description | Example |
|---|---|---|---|
| `Cloudinary public ID` | Single line text | Cloudinary public identifier or full URL | `gatherings/vermejo/vermejo-bison-snow` |
| `Alt text` | Long text / Single line | Concise, factual description of visible subject | `American bison herd grazing across snow-dusted grasslands at Vermejo Reserve` |
| `Caption` | Single line text | James's editorial caption or note | `Bison at golden hour` |
| `Credit` | Single line text | Rights holder / photographer attribution | `Courtesy of Ted Turner Reserves` |
| `Role` | Single select | Usage role on page | `Hero`, `Card`, `Gallery strip`, `Feature`, `Experience` |
| `Order` | Number | Sorting order (supports 0, 1, 2...) | `0` |
| `Residence` | Linked record | Link to parent row in `Residences` table | `Vermejo, a Ted Turner Reserve` |
| `Status` | Single select | Asset pipeline lifecycle stage | `Shot needed`, `Parked in Airtable`, `In Cloudinary`, `On site` |
| `Suggested public ID` | Single line text | Standardized naming proposal | `gatherings/vermejo/vermejo-bison-snow` |

### New Optional Extension Fields (Supported in Code)
| Field Name | Type | Description | Example |
|---|---|---|---|
| `Aspect ratio` | Single select / Text | Intended crop ratio for display | `16:9`, `4:3`, `1:1`, `5:4`, `3:2` |
| `Crop mode` | Single select | Cloudinary crop mode (default: `fill`) | `fill`, `limit`, `fit`, `crop` |
| `Gravity` | Single select | Cloudinary gravity mode (default: `auto`) | `auto`, `face`, `center`, `north` |
| `Focal point` | Single line text | Cloudinary focal point / CSS position override | `center 30%`, `50% 25%` |
| `Object position` | Single line text | CSS `object-position` for `<img />` styling | `center top`, `50% 20%` |
| `Permission` | Single select | Rights status | `Confirmed`, `Pending`, `Partner-approved`, `Review required` |
| `Alt review status` | Single select | Editorial alt text quality check | `Draft`, `Approved`, `Needs review` |
| `Original width` | Number | Pixel width of master file | `2400` |
| `Original height` | Number | Pixel height of master file | `1600` |
| `Subject description` | Long text | Detailed internal notes on what photo depicts | `Winter grazing scene on Costilla meadow` |

A sample CSV import template is provided at `wildcogather/docs/airtable-images-template.csv`.

---

## 4. Rights, Permissions & Asset Resolution Audit

### Partner Image Status Summary
1. **Ted Turner Reserves (Casa Grande, Vermejo, Sierra Grande, Armendaris)**:
   - **Status**: **Permission Confirmed**.
   - Approved by partner contact on October 10, 2026.
   - Master files stored in Cloudinary under folder path: `gatherings/[reserve-slug]/...`.
   - Required attribution credit: `"Courtesy of Ted Turner Reserves"`.
2. **Natural Selection (Lekkerwater Beach Lodge, GweGwe Beach Lodge)**:
   - **Status**: **Permission Pending**.
   - Images in repository references are cataloged under `gatherings/[house-slug]/...` with `permission-pending` status.
   - Current assets are low-resolution previews (~1100px wide).
   - **Action Required**: Do not publish these assets to live public campaigns as "approved" until commercial usage rights are officially confirmed. High-resolution master assets (2400px+ width) must be requested upon contract completion.
3. **MORE Family Collection (Lion Sands, Monwana, etc.)**:
   - Verify specific property-level licensing terms before high-resolution publication.
4. **Local / Brand Kit Assets**:
   - Brand logos and seals (`/brand/jwco-hare-*.png`) are local static assets hosted directly in `/public`. The image loader automatically passes local `/...` paths through without attempting to route them through Cloudinary.

---

## 5. Accessible Alt Text & SEO/AEO Best Practices

### The Purpose of Alt Text
Alternative text (`alt`) serves two critical functions:
1. **Accessibility**: It is read by screen readers for users with visual impairments.
2. **Search & Answer Engines (SEO & AEO)**: It provides unambiguous semantic ground truth for search engine indexing and LLM-based answer engines (Google AI Overviews, Perplexity, Claude, ChatGPT).

### Clear Distinctions
- **`Alt text`**: Describes **what is visibly depicted** in the photo. Factual, concise, and objective.
  - *Good*: "Family on horseback riding a pine forest trail at Lone Mountain Ranch in Big Sky, Montana"
  - *Bad*: "Best luxury family vacation dude ranch summer deal Montana horseback cabin buyout"
- **`Caption`**: Editorial color, context, or James's personal commentary displayed below or beside the image.
  - *Example*: "Into the backcountry — the morning ride before supper."
- **`Credit`**: Legal and copyright attribution.
  - *Example*: "Courtesy of Ted Turner Reserves"

### Standards for Alt Text
- **Concise & Direct**: Aim for 8 to 16 words.
- **Factual Subjects**: State the subject, action/setting, and location if clearly established.
- **No Keyword Stuffing**: Never repeat promotional slogans ("exclusive luxury buyout", "top rated villa") in alt text. Search engines penalize keyword stuffing, and screen reader users find it intrusive.
- **No Hallucinated Visuals**: Do not invent species, architectural styles, or unverified people names by parsing file paths.
- **Decorative Images**: Any purely decorative graphic or textural background must have empty alt (`alt=""`), allowing screen readers to skip it naturally.

### Why Standard Accessibility Foundations are the Best "AEO"
Answer Engine Optimization (AEO) does not require specialized, keyword-crammed markup. Modern LLMs and answer engines evaluate source pages for **factual consistency, entity clarity, and structured semantics**. When:
1. The image is an HTML `<img>` with clean, descriptive `alt`.
2. The page includes matching Schema.org JSON-LD structured data (`ImageObject` with `contentUrl`, `caption`, `creditText`).
3. The Open Graph tags (`og:image`, `og:image:alt`) correctly reference high-resolution canonical images.
AI models can reliably extract and quote the residence facts without confusion.

---

## 6. Action Items Requiring External Account Access

The following operations cannot be performed inside the Git repository and require user actions in external dashboards:

1. **Cloudinary Management Console (`jhlnq5h5`)**:
   - Upload high-resolution originals (minimum 2000px wide, 72–150 DPI) for any newly acquired properties.
   - Retain folder structure conventions: `gatherings/[residence-slug]/[subject-description]`.
   - Verify that incoming requests allow automatic transformations (`f_auto,q_auto`).
2. **Airtable Workspace (`appnpcCxUZcapAgbo`)**:
   - Open the `Images` table.
   - Add the new optional fields (`Aspect ratio`, `Focal point`, `Object position`, `Permission`, `Alt review status`, etc.) using the schema defined in Section 3.
   - Import or sync records using `wildcogather/docs/airtable-images-template.csv` as a template.
   - When Natural Selection or other partner agreements are formalized, update the `Permission` status from `Pending` to `Confirmed`.
3. **Vercel Project Settings**:
   - Confirm the project **Root Directory** is configured to `wildcogather`.
   - Ensure environment variables are set: `NEXT_PUBLIC_CLOUDINARY_CLOUD=jhlnq5h5`, `AIRTABLE_BASE_ID=appnpcCxUZcapAgbo`, and `AIRTABLE_TOKEN`.
