import Link from "next/link";
import DestinationExplorer from "@/components/DestinationExplorer";
import { getResidences } from "@/lib/data";

const regionMeta: Record<string, { label: string; intro: string; description: string }> = {
  "usa-mexico": { label: "USA & Mexico", intro: "Big sky, desert light, mountain air and warm-water escapes for large family groups.", description: "A blend of western ranches, desert hideaways and coastal stays for long gatherings across generations." },
  caribbean: { label: "Caribbean", intro: "Soft shorelines, reef blues and private island ease for beach-centric chapters.", description: "Island homes, beachfront villas and private hideaways for relaxed family weeks by the sea." },
  "latin-america": { label: "Latin America", intro: "Cloud forests, coastlines and mountain homes shaped for slow and generous travel.", description: "A mix of cultural stays and oceanfront homes designed for beautifully paced family weeks." },
  europe: { label: "Europe", intro: "Historic homes, alpine stillness and warm coastal classics for elegant family reunion travel.", description: "Timeless houses in coastal, alpine and countryside settings for unforgettable gatherings." },
  asia: { label: "Asia", intro: "Rice terraces, jungle views and glowing water villas shaped for immersive family escapes.", description: "Wellness-forward, nature-rich residences for families seeking cultural depth and quiet luxury." },
  oceania: { label: "Oceania", intro: "Wide horizons, remote beaches and landscape-led stays shaped for long, spacious family chapters.", description: "Beachfront, vineyard and bush-country residences that feel as expansive as the view." },
};

function regionForResidence(property: { place: string; region: string; country: string }) {
  const value = `${property.region} ${property.country}`.toLowerCase();
  if (value.includes("montana") || value.includes("mexico") || value.includes("california") || value.includes("arizona")) return "usa-mexico";
  if (value.includes("turks") || value.includes("caicos") || value.includes("bahamas") || value.includes("caribbean")) return "caribbean";
  if (value.includes("bali") || value.includes("indonesia") || value.includes("thailand") || value.includes("japan") || value.includes("vietnam") || value.includes("asia")) return "asia";
  if (value.includes("australia") || value.includes("new zealand") || value.includes("fiji") || value.includes("oceania")) return "oceania";
  if (value.includes("france") || value.includes("italy") || value.includes("spain") || value.includes("greece") || value.includes("portugal") || value.includes("croatia") || value.includes("europe")) return "europe";
  if (value.includes("mexico") || value.includes("brazil") || value.includes("argentina") || value.includes("chile") || value.includes("peru") || value.includes("colombia") || value.includes("latin")) return "latin-america";
  return "usa-mexico";
}

export function generateStaticParams() {
  return Object.keys(regionMeta).map((region) => ({ region }));
}

export default async function DestinationPage({ params }: { params: Promise<{ region: string }> }) {
  const region = (await params).region;
  const residences = (await getResidences()).filter((property) => regionForResidence(property) === region);
  const meta = regionMeta[region] ?? { label: region.replace(/-/g, " "), intro: "A restful collection of homes for memorable family gatherings.", description: "A curated selection of family-friendly stays chosen for their scale, ease and sense of place." };

  return (
    <>
      <section className="wrap region-page-hero">
        <div>
          <p className="cp ox region-tag"><span aria-hidden="true">✳</span> The collection · {String(residences.length).padStart(2, "0")} stays</p>
          <h1 className="disp page-heading">{meta.label}</h1>
          <p className="cas editorial-lead region-intro">{meta.intro}</p>
          <p className="body region-description">{meta.description}</p>
          <Link href="/plan" className="btn region-enquiry">Plan a gathering in {meta.label}</Link>
        </div>
      </section>

      <section className="wrap region-page-content">
        {residences.length ? (
          <DestinationExplorer residences={residences} />
        ) : (
          <div className="region-empty">
            <p className="cp ox" style={{ margin: "0 0 10px" }}>Coming soon</p>
            <h2 className="cas section-heading" style={{ margin: "0 0 12px" }}>This region is being curated.</h2>
            <p className="body" style={{ margin: "0 0 18px" }}>We’re preparing a new set of homes for this destination with family-friendly stays, private villas and the right pacing for a gathering.</p>
            <Link href="/plan" className="btn">Enquire about this region</Link>
          </div>
        )}
      </section>
    </>
  );
}
