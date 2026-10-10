import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
        <p className="cas wordmark">Wild &amp; Co Gatherings</p>
        <p className="cp byline" style={{ margin: "8px 0 0" }}>By James Wild &amp; Co.</p>
      </Link>
      <nav aria-label="Main" className="cp site-nav">
        <Link href="/houses/lone-mountain-ranch">The Houses</Link>
        <Link href="/ledger">The Ledger</Link>
        <Link href="/vip">Gatherings VIP</Link>
        <Link href="/journal">The Journal</Link>
        <Link href="/plan" className="ox">Plan a Gathering</Link>
      </nav>
    </header>
  );
}
