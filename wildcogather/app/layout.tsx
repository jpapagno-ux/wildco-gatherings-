import type { Metadata } from "next";
import { Libre_Caslon_Display, Libre_Caslon_Text, Libre_Franklin, Courier_Prime, Homemade_Apple } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

const caslonDisplay = Libre_Caslon_Display({ weight: "400", subsets: ["latin"], variable: "--f-caslon-display" });
const caslon = Libre_Caslon_Text({ weight: ["400", "700"], style: ["normal", "italic"], subsets: ["latin"], variable: "--f-caslon" });
const franklin = Libre_Franklin({ weight: "400", subsets: ["latin"], variable: "--f-franklin" });
const courier = Courier_Prime({ weight: ["400", "700"], subsets: ["latin"], variable: "--f-courier" });
const hand = Homemade_Apple({ weight: "400", subsets: ["latin"], variable: "--f-hand" });

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://www.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: "Multigenerational Family Resort Residences | Wild & Co Gatherings", template: "%s" },
  description: "Resort residences for families travelling across generations, chosen by James Wild after forty-four years on the road. A house of James Wild & Co.",
  openGraph: { siteName: "Wild & Co Gatherings", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caslonDisplay.variable} ${caslon.variable} ${franklin.variable} ${courier.variable} ${hand.variable}`}>
      <body>
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": ["Organization", "TravelAgency"],
          name: "Wild & Co Gatherings",
          url: SITE,
          description: "Resort residences and family journeys on land and water, across generations, chosen by James Wild.",
          logo: `${SITE}/brand/jwco-seal-600.png`,
          parentOrganization: { "@type": "Organization", name: "James Wild & Co", logo: `${SITE}/brand/jwco-seal-600.png` },
          founder: { "@type": "Person", name: "James Wild" },
        }} />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
