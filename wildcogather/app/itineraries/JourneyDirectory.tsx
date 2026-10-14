"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import Photo from "@/components/Photo";
import type { Img } from "@/lib/types";

export type JourneyCard = {
  slug: string; title: string; img?: Img; days: number; nights: number;
  region: string; regionKey: string; setting: string; settingName: string; ink: string;
  scope: "One house" | "Several stays"; band: string; from: string; templateId?: string; draft: boolean;
};

const ALL = "all";

export default function JourneyDirectory({ cards, bands }: { cards: JourneyCard[]; bands: string[] }) {
  const [f, setF] = useState({ region: ALL, band: ALL, setting: ALL, scope: ALL });
  const opts = useMemo(() => ({
    region: Array.from(new Map(cards.map((c) => [c.regionKey, c.region])).entries()),
    setting: Array.from(new Map(cards.map((c) => [c.setting, c.settingName])).entries()),
    band: bands.filter((b) => cards.some((c) => c.band === b)),
    scope: Array.from(new Set(cards.map((c) => c.scope))),
  }), [cards, bands]);
  const shown = cards.filter((c) => (f.region === ALL || c.regionKey === f.region) && (f.band === ALL || c.band === f.band) && (f.setting === ALL || c.setting === f.setting) && (f.scope === ALL || c.scope === f.scope));
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  return (
    <>
      <form className="jf" aria-label="Filter journeys" onSubmit={(e) => e.preventDefault()}>
        {opts.region.length > 1 && <label className="cp" htmlFor="jf-r">Destination<select id="jf-r" value={f.region} onChange={set("region")}><option value={ALL}>All</option>{opts.region.map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>}
        {opts.band.length > 1 && <label className="cp" htmlFor="jf-d">Duration<select id="jf-d" value={f.band} onChange={set("band")}><option value={ALL}>Any length</option>{opts.band.map((b) => <option key={b} value={b}>{b}</option>)}</select></label>}
        {opts.setting.length > 1 && <label className="cp" htmlFor="jf-s">Setting<select id="jf-s" value={f.setting} onChange={set("setting")}><option value={ALL}>All</option>{opts.setting.map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></label>}
        {opts.scope.length > 1 && <label className="cp" htmlFor="jf-j">Journey scope<select id="jf-j" value={f.scope} onChange={set("scope")}><option value={ALL}>All</option>{opts.scope.map((v) => <option key={v} value={v}>{v}</option>)}</select></label>}
        <p className="cp muted jf-count" role="status" aria-live="polite">{shown.length} of {cards.length} journeys</p>
      </form>
      {shown.length === 0 ? (
        <p className="body" style={{ textAlign: "center", padding: "40px 0" }}>No journeys match those filters yet. <button type="button" className="tr-link" onClick={() => setF({ region: ALL, band: ALL, setting: ALL, scope: ALL })}>Clear filters</button></p>
      ) : (
        <div className="house-grid" style={{ marginTop: 34 }}>
          {shown.map((t) => (
            <Link key={t.slug} href={`/itineraries/${t.slug}`} className="house-card">
              <Photo img={t.img} sizes="(max-width: 700px) 100vw, 380px" aspect="4:3" style={{ height: 280 }} />
              <p className="cp muted" style={{ margin: "18px 0 0" }}>{t.days} days · {t.nights} nights · {t.region}</p>
              <h2 className="ser" style={{ margin: "8px 0 0", fontSize: 26, fontWeight: 500 }}>{t.title}</h2>
              <hr style={{ width: 30, height: 1, border: 0, background: t.ink, margin: "12px auto" }} />
              <p className="cp" style={{ margin: 0 }}>{t.scope === "Several stays" ? `${t.from} and more` : `From ${t.from}`}{t.draft ? " · sample" : ""}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
