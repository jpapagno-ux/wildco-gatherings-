import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DestinationBrowser from "@/components/DestinationBrowser";
import { getResidences } from "@/lib/data";
import { destinations, regionForResidence } from "@/lib/destinations";

export const revalidate = 3600;
export const dynamicParams = false;

export function generateStaticParams() {
  return destinations.map(({ slug }) => ({ region: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  const destination = destinations.find((d) => d.slug === region);
  if (!destination) notFound();
  return { title: `${destination.label} Stays | Wild & Co Gatherings`, description: destination.description };
}

export default async function DestinationPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const destination = destinations.find((d) => d.slug === region);
  if (!destination) notFound();
  const residences = (await getResidences()).filter((property) => regionForResidence(property) === region);

  return (
    <>
      <section className="wrap region-page-hero">
        <div>
          <p className="cp ox region-tag">Region · {residences.length} stays</p>
          <h1 className="disp page-heading" style={{ margin: "0.5rem 0 1rem" }}>{destination.label}</h1>
          <p className="cas editorial-lead" style={{ margin: "0 0 1rem", fontStyle: "italic" }}>{destination.intro}</p>
          <p className="body" style={{ margin: 0 }}>{destination.description}</p>
        </div>
      </section>
      <nav className="wrap destination-links cp" aria-label="Destination regions">
        {destinations.map((d) => (
          <Link key={d.slug} href={`/destinations/${d.slug}`} aria-current={d.slug === region ? "page" : undefined}>{d.label}</Link>
        ))}
      </nav>
      <DestinationBrowser residences={residences} region={destination.slug} />
    </>
  );
}
