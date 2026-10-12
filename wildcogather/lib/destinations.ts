export const destinations = [
  { slug: "usa-mexico", label: "USA & Mexico", center: [27, -105], zoom: 3, intro: "Big sky, desert light, mountain air and warm-water escapes for large family groups.", description: "A blend of western ranches, desert hideaways and coastal stays for long gatherings across generations." },
  { slug: "caribbean", label: "Caribbean", center: [19, -70], zoom: 4, intro: "Soft shorelines, reef blues and private island ease for beach-centric chapters.", description: "Island homes, beachfront villas and private hideaways for relaxed family weeks by the sea." },
  { slug: "latin-america", label: "Latin America", center: [-12, -70], zoom: 3, intro: "Cloud forests, coastlines and mountain homes shaped for slow and generous travel.", description: "A mix of cultural stays and oceanfront homes designed for beautifully paced family weeks." },
  { slug: "europe", label: "Europe", center: [48, 12], zoom: 4, intro: "Historic homes, alpine stillness and warm coastal classics for elegant family reunion travel.", description: "Timeless houses in coastal, alpine and countryside settings for unforgettable gatherings." },
  { slug: "asia", label: "Asia", center: [20, 105], zoom: 3, intro: "Rice terraces, jungle views and glowing water villas shaped for immersive family escapes.", description: "Wellness-forward, nature-rich residences for families seeking cultural depth and quiet luxury." },
  { slug: "oceania", label: "Oceania", center: [-25, 155], zoom: 3, intro: "Wide horizons, remote beaches and landscape-led stays shaped for long, spacious family chapters.", description: "Beachfront, vineyard and bush-country residences that feel as expansive as the view." },
] as const;

export type DestinationRegion = (typeof destinations)[number]["slug"];

const normalize = (value: string) => value.trim().toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();

export function destinationRegion(value?: string): DestinationRegion | undefined {
  return destinations.find((d) => normalize(d.slug) === normalize(value || "") || normalize(d.label) === normalize(value || ""))?.slug;
}

const countries: Record<DestinationRegion, string[]> = {
  "usa-mexico": ["United States", "United States of America", "USA", "US", "Mexico", "MX"],
  caribbean: ["Turks & Caicos", "Turks & Caicos Islands", "Turks and Caicos Islands", "TC", "Bahamas", "The Bahamas", "BS", "Anguilla", "Antigua and Barbuda", "Aruba", "Barbados", "Bonaire", "British Virgin Islands", "Cayman Islands", "Cuba", "Curaçao", "Curacao", "Dominica", "Dominican Republic", "Grenada", "Guadeloupe", "Haiti", "Jamaica", "Martinique", "Montserrat", "Puerto Rico", "Saint Barthélemy", "St Barts", "Saint Kitts and Nevis", "Saint Lucia", "St Lucia", "Saint Martin", "Sint Maarten", "Saint Vincent and the Grenadines", "Trinidad and Tobago", "US Virgin Islands", "U.S. Virgin Islands"],
  "latin-america": ["Belize", "Costa Rica", "El Salvador", "Guatemala", "Honduras", "Nicaragua", "Panama", "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "French Guiana", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"],
  europe: ["Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "UK", "England", "Scotland", "Wales", "Northern Ireland", "Vatican City"],
  asia: ["Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "Georgia", "Hong Kong", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Macau", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Türkiye", "Turkmenistan", "United Arab Emirates", "UAE", "Uzbekistan", "Vietnam", "Yemen"],
  oceania: ["Australia", "New Zealand", "Fiji", "French Polynesia", "Cook Islands", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Caledonia", "Niue", "Palau", "Papua New Guinea", "Samoa", "American Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu", "Guam", "Northern Mariana Islands", "Tokelau", "Wallis and Futuna"],
};

export function regionForResidence(property: { destinationRegion?: DestinationRegion; region: string; country: string; place: string }): DestinationRegion | undefined {
  if (property.destinationRegion) return property.destinationRegion;
  const country = normalize(property.country);
  for (const destination of destinations) {
    if (country && countries[destination.slug].some((name) => normalize(name) === country)) return destination.slug;
  }
  // Broad region labels are only a fallback; local names must not override a known country.
  return destinationRegion(property.region);
}

export function hasCoordinates<T extends { lat?: number; lng?: number }>(item: T): item is T & { lat: number; lng: number } {
  return typeof item.lat === "number" && Number.isFinite(item.lat) && Math.abs(item.lat) <= 90
    && typeof item.lng === "number" && Number.isFinite(item.lng) && Math.abs(item.lng) <= 180;
}
