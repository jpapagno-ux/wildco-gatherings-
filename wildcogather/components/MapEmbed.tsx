type MapEmbedProps = {
  items: Array<{ name: string; lat?: number; lng?: number }>;
  label?: string;
  height?: number;
  className?: string;
};

export default function MapEmbed({ items, label = "Map", height = 420, className = "" }: MapEmbedProps) {
  const valid = items.filter((item) => typeof item.lat === "number" && typeof item.lng === "number");

  if (!valid.length) {
    return <div className={`map-panel ${className}`} style={{ height, display: "grid", placeItems: "center", padding: "1.5rem" }}>Map coming soon.</div>;
  }

  const latitudes = valid.map((item) => item.lat as number);
  const longitudes = valid.map((item) => item.lng as number);
  const minLat = Math.min(...latitudes);
  const maxLat = Math.max(...latitudes);
  const minLng = Math.min(...longitudes);
  const maxLng = Math.max(...longitudes);
  const padLat = Math.max(0.35, (maxLat - minLat) * 0.35);
  const padLng = Math.max(0.45, (maxLng - minLng) * 0.35);
  const bbox = `${minLng - padLng},${minLat - padLat},${maxLng + padLng},${maxLat + padLat}`;
  const marker = `${valid[0].lat},${valid[0].lng}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${encodeURIComponent(marker)}`;

  return (
    <div className={`map-panel ${className}`}> 
      <iframe
        title={label}
        src={src}
        loading="lazy"
        style={{ width: "100%", minHeight: height, border: 0 }}
      />
    </div>
  );
}
