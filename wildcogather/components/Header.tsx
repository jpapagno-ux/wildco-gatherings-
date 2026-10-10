import Link from "next/link";

const stays = [
  { label: "USA & Mexico", href: "/destinations/usa-mexico" },
  { label: "Caribbean", href: "/destinations/caribbean" },
  { label: "Latin America", href: "/destinations/latin-america" },
  { label: "Europe", href: "/destinations/europe" },
  { label: "Asia", href: "/destinations/asia" },
  { label: "Oceania", href: "/destinations/oceania" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <nav aria-label="Main navigation" className="site-nav site-nav-left cp">
          <Link href="/ledger">The Ledger</Link>
          <div className="nav-dropdown">
            <button type="button" aria-expanded="false" className="nav-dropdown-trigger cp">
              Stays
            </button>
            <div className="nav-dropdown-menu">
              {stays.map((item) => (
                <Link key={item.href} href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <Link href="/" className="brand-lockup" aria-label="Wild & Co Gatherings home">
          <span className="wordmark cas">Wild &amp; Co</span>
          <span className="wordmark wordmark-sub cp">Gatherings</span>
        </Link>

        <nav aria-label="Secondary navigation" className="site-nav site-nav-right cp">
          <Link href="/vip">Gatherings VIP</Link>
          <Link href="/journal">The Journal</Link>
          <Link href="/plan" className="cta-link">
            Plan a Gathering
          </Link>
        </nav>
      </div>
    </header>
  );
}
