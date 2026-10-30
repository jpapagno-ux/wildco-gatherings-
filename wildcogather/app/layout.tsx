import { LEGAL } from "@/lib/legal";
import { fit } from "@/lib/seo";
import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, IBM_Plex_Mono, Mrs_Saint_Delafield } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JourneyProvider from "@/components/JourneyProvider";
import JsonLd from "@/components/JsonLd";
import { getResidences } from "@/lib/data";
import { browseNav } from "@/lib/browse";
import { SITE } from "@/lib/site";
import { SAFARIS_URL } from "@/lib/ecosystem";

// Self-hosted at build time by next/font: no layout shift, no request to Google from the visitor's browser.
const serif = Cormorant_Garamond({ weight: ["300", "400", "500", "600"], style: ["normal", "italic"], subsets: ["latin"], variable: "--f-serif", display: "swap" });
const sans = DM_Sans({ weight: ["300", "400", "500"], subsets: ["latin"], variable: "--f-sans", display: "swap" });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--f-mono", display: "swap" });
const script = Mrs_Saint_Delafield({ weight: "400", subsets: ["latin"], variable: "--f-script", display: "swap" });


export const metadata: Metadata = fit({
  metadataBase: new URL(SITE),
  title: { default: "Multigenerational Family Resort Residences | Wild & Co Gatherings", template: "%s" },
  description: "Resort residences for families travelling across generations, chosen by James Wild after forty-four years on the road. A house of James Wild & Co.",
  openGraph: { siteName: "Wild & Co Gatherings", type: "website", images: ["/brand/og-default.jpg"] },
  other: { "theme-color": "#F2EEE7" },
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Counts for the "Stays" menu; same cached Airtable read the pages use.
  const nav = browseNav(await getResidences());
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable} ${script.variable}`}>
      <body>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": ["Organization", "TravelAgency"],
          name: "Wild & Co Gatherings",
          url: SITE,
          description: "Resort residences and family journeys on land and water, across generations, chosen by James Wild.",
          logo: `${SITE}/brand/jwco-hare-600.png`,
          parentOrganization: { "@type": "Organization", name: "James Wild & Co", foundingDate: "1982", ...(process.env.NEXT_PUBLIC_JWCO_HOME_URL ? { url: process.env.NEXT_PUBLIC_JWCO_HOME_URL } : {}), subOrganization: [{ "@type": "Organization", name: "Wild & Co Safaris", url: SAFARIS_URL }], slogan: "Ledgered & Vetted · Journey design since 1982", logo: `${SITE}/brand/jwco-hare-600.png` },
          founder: { "@type": "Person", "@id": `${SITE}/founder#james-wild`, name: "James Wild", url: `${SITE}/founder`, jobTitle: "Founder, James Wild & Co" },
          slogan: "Family and generational residences, vetted by James Wild — advisor-led since 1982",
          knowsAbout: ["multigenerational travel", "family reunion travel", "generational residences", "family villas", "exclusive-use safari villas", "family ranch vacations", "travel advisor partnerships", "friends' gathering trips"],
          audience: [{ "@type": "PeopleAudience", audienceType: "Multigenerational families" }, { "@type": "BusinessAudience", audienceType: "Travel advisors" }],
          sameAs: ["https://www.youtube.com/@WildEarthStays1"],
          ...(LEGAL.reviewed ? {
            legalName: LEGAL.legalName || undefined,
            email: LEGAL.email || undefined,
            telephone: LEGAL.phone ? `+1-${LEGAL.phone}` : undefined,
            address: { "@type": "PostalAddress", addressLocality: "Miami", addressRegion: "FL", addressCountry: "US" },
            identifier: [
              ...(LEGAL.flSellerOfTravelNo ? [{ "@type": "PropertyValue", propertyID: "Florida Seller of Travel Registration", value: LEGAL.flSellerOfTravelNo }] : []),
              ...(LEGAL.iataNo ? [{ "@type": "PropertyValue", propertyID: "IATA", value: LEGAL.iataNo }] : []),
            ],
          } : {}),
        }} />
        <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "Wild & Co Gatherings", url: SITE, inLanguage: "en-US", publisher: { "@type": "Organization", name: "James Wild & Co" } }} />
        <JourneyProvider>
          <a href="#main" className="skip-link">Skip to content</a>
          <Header nav={nav} />
          <main id="main">{children}</main>
          <Footer />
        </JourneyProvider>
      </body>
    </html>
  );
}
