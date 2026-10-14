import Film from "./Film";
import type { WhyHere as WhyHereT } from "@/lib/types";

// "Why here" — sits directly under a house's hero: James's reason in his words, beside a short film.
export default function WhyHere({ why, name }: { why: WhyHereT; name: string }) {
  return (
    <section className="why-here" aria-labelledby="why-here-h">
      <div className="wrap why-here-grid">
        <figure className="why-here-quote">
          <p className="eb" id="why-here-h">Why here · in James&apos;s words</p>
          <hr className="eb-rule" />
          {why.quote && <blockquote><p>&ldquo;{why.quote}&rdquo;</p></blockquote>}
          <figcaption className="cp">James Wild · Founder, James Wild &amp; Co</figcaption>
          {why.watch && <p className="why-here-watch">{why.watch}</p>}
        </figure>
        {why.film && (
          <div className="why-here-film">
            <Film video={{ ...why.film, title: why.film.title || `${name} — the film` }} />
          </div>
        )}
      </div>
    </section>
  );
}
