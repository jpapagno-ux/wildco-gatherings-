import Link from "next/link";
import Photo from "@/components/Photo";
import { Icon } from "@/components/Marks";
import type { TableCard } from "@/lib/table";

// "At the Table" cards — one per dining or shared-table experience. A card stands on its own
// without a photo (setting-ink header with the table mark); with an Image it leads with the photo.
export default function TableCards({ cards, house, ink }: { cards: TableCard[]; house: string; ink: string }) {
  return (
    <div className="tbl-grid">
      {cards.map((c, i) => (
        <article key={c.slug} id={`table-${c.slug}`} className="tbl-card" style={{ ["--ink" as string]: ink }}>
          {c.image ? (
            <Photo img={c.image} hint="dinner table" sizes="(max-width: 700px) 100vw, 380px" aspect="4:3" style={{ height: 230 }} />
          ) : (
            <div className="tbl-head" aria-hidden="true">
              <Icon name="table" size={30} color="var(--paper)" stroke={1.4} />
              <span className="tbl-no">No. {String(i + 1).padStart(2, "0")}</span>
            </div>
          )}
          <div className="tbl-body">
            <p className="tbl-kind">{c.kind}</p>
            <h3 className="tbl-name">{c.name}</h3>
            <p className="tbl-where">{c.where}</p>
            <dl className="tbl-facts">
              <div><dt>When</dt><dd>{c.when}</dd></div>
              <div><dt>Who</dt><dd>{c.who}</dd></div>
            </dl>
            <p className="tbl-why">{c.gathering}</p>
            {c.menu.length > 0 && (
              <>
                <p className="tbl-label">On the table</p>
                <ul className="tbl-menu">{c.menu.map((m) => <li key={m}>{m}</li>)}</ul>
              </>
            )}
            <div className="tbl-foot">
              <span>{c.booking}</span>
              <Link href={`/plan?house=${house}&also=${encodeURIComponent(c.name)}`}>Add to our plan →</Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
