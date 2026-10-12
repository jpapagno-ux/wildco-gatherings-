# Wild & Co Gatherings — SEO & AEO playbook
*Families searching for family and generational residences · advisors planning family and friend gatherings · October 2026*

The site serves two searchers with different questions. Families ask "where can all of us stay together?" Advisors ask "where can I send this family, and who will help me plan it?" Every page should answer one of those questions directly in its first lines, because that is what Google's AI Overviews, ChatGPT, Perplexity and Claude quote.

Search volumes are not included here; check each cluster in Google Search Console (once the site has impressions) and Google Keyword Planner before choosing which to push first.

---

## 1. Keyword and question clusters → the page that answers them

### Families
| Cluster | Example searches | Page that should rank |
|---|---|---|
| Generational / multigenerational stays | multigenerational family vacation, generational residences, three-generation trip, family reunion villa | Home, /houses |
| Whole-family houses | villa that sleeps 12, family resort with private villa, exclusive-use villa for families, buyout lodge for family reunion | each /houses/[slug] |
| Destination + family | family villas Bali, family safari South Africa, family ranch Montana, New Mexico family ranch | /destinations/[region], house pages |
| Safari with children | family safari villa Kruger, private safari house kids, treehouse sleep-out children | Fish Eagle, Hinkwenu, Monwana, Lion Sands itinerary |
| Short trips | 4 days at Lion Sands, 3 day family itinerary Ubud | /itineraries/[slug] |
| Occasions | 80th birthday trip family, milestone birthday villa, family reunion ideas, friends' reunion trip | Journal posts (to write), /plan |
| New openings | new family resorts 2027, Zest Ibiza opening, .Here Maldives families | /horizon/[slug] |
| Film / proof | Monwana safari video, Wild Together Monwana | Journal No. 03, Monwana page |

### Advisors
| Cluster | Example searches | Page that should rank |
|---|---|---|
| Supplier discovery | multigenerational travel supplier for advisors, family villa partner for travel agents, luxury family travel host agency partner | /advisors |
| Training / FAM | Ted Turner Reserves webinar, travel advisor webinar family travel, Livestorm travel webinar | /webinars, /webinars/[slug] |
| Planning help | how to plan a multigenerational trip for clients, family reunion travel planning advisor | /advisors (How we help), Journal guides (to write) |
| Partner names | Ted Turner Reserves advisor, MORE Family Collection advisor, Lion Sands for families | house pages, webinar page |

---

## 2. The answer-first pattern (AEO)
Every page in the build already follows this; keep it for every new house and post.
1. **Question as the heading** — written the way a family types it: "Can children stay at Amor Arenal?"
2. **A 40–60 word answer straight after it** — name the place, the number, the age, the price; no warm-up.
3. **Then the detail** — bullets, rooms, days.
4. **A dated fact line** — "Facts checked October 2026". AI engines favour content they can date.
5. **Sources and a named person** — James by name, the host by name (Harry Tyner for Ted Turner Reserves). Named expertise is what answer engines cite.

### Question bank to add (Airtable › FAQs, 40–60 words each)
**Families**
- Which family villas sleep 10 or more people?
- What is a generational residence?
- How do you plan a family reunion trip for three generations?
- Which safari lodges allow young children on game drives?
- What is the best age for a first family safari?
- How far in advance should we book an exclusive-use villa?
- Can grandparents with limited mobility enjoy [house]?
- What does "all-inclusive" cover at a private safari villa?

**Advisors**
- How do travel advisors book Wild & Co houses?
- How does Wild & Co vet a family residence?
- Do you hold dates for an advisor's client?
- Which houses suit a family of 20 or more?
- How do I combine two houses in one trip (e.g. Lion Sands and Monwana)?
- When is the next advisor webinar?

---

## 3. Structured data in this build
| Page | Schema | Status |
|---|---|---|
| Every page | Organization + TravelAgency (knowsAbout: multigenerational travel, generational residences…; audiences: families and advisors), WebSite | Live |
| House | LodgingBusiness / Resort, FAQPage, ImageObject, VideoObject (when a YouTube link is set), Offer (Live offers only) | Live |
| Destination | CollectionPage + ItemList | New |
| Itinerary | TouristTrip | Live |
| Journal | BlogPosting + Quotation + VideoObject + Speakable | Live |
| On the Horizon | BlogPosting about a Resort, FAQPage, BreadcrumbList, citations | Live (drafts hidden from Google) |
| Advisors | WebPage with BusinessAudience, FAQPage | New |
| Webinar | EducationEvent (online, Livestorm) once a date and link are set; VideoObject for recordings | New |

---

## 4. Ten pages to write next (highest value first)
1. **Journal: "How to plan a three-generation trip"** — the core family question; links to every house.
2. **Journal: "Your first family safari: ages, seasons and which house"** — Lion Sands, Monwana.
3. **Advisors guide: "Planning a family reunion for clients: a checklist"** — downloadable house sheet links.
4. **Each new house** (see README · Adding 10–12 properties) — every one is a new search entry point.
5. **Destination intros** — 150 words of answer-first copy per region with 3 FAQs.
6. **Webinar recordings** — put the YouTube link in Webinars › Recording; each becomes a video result.
7. **Occasion pages** — milestone birthdays, family reunions, friends' gatherings, weddings weekends.
8. **"Houses that sleep 12+, 20+, 30+"** — filtered lists; strong for advisors.
9. **Wild Together episodes** — one per house James and Miriam film.
10. **On the Horizon updates** — when a place opens or moves into the Ledger.

---

## 5. Off-site signals that AI engines read
- **YouTube** — title each film "[House], [Place]: family stay | Wild Together", link to the house page in the description's first line.
- **Google Business Profile** for James Wild & Co (travel agency), linked to the site.
- **Partner links** — ask Ted Turner Reserves and MORE to link to their house pages and the webinar.
- **Advisor networks** — list the advisor page with host agencies and consortia you work with.
- **Consistent name** — always "Wild & Co Gatherings, a James Wild & Co house".

---

## 6. Measure monthly
- Google Search Console: impressions and clicks for the clusters above; which questions trigger the site.
- AI visibility: ask ChatGPT, Perplexity, Gemini and Claude the question bank; note whether Wild & Co is cited.
- Airtable › Inquiries: count by Occasion — family plans, "Be the first", advisor applications, webinar seats.
- YouTube: views and click-through to house pages.
