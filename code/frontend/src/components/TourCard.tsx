import { Link } from "react-router-dom";
import { Picture } from "../picture";
import { formatPrice } from "../lib/format";
import { useContent } from "../editable";
import type { TourRow } from "../lib/tours";

/**
 * A tour, as it appears in any grid on the site: the photograph is the card,
 * edge to edge at one ratio, with the place over it and the name and price
 * set under it on the page's own ground. No white card, no grey caption.
 */
export default function TourCard({ tour, eager = false }: { tour: TourRow; eager?: boolean }) {
  const per = useContent("pages.tour.perPerson");
  return (
    <Link
      to={`/tours/${tour.id}`}
      data-record={`tours:${tour.id}`}
      data-testid={`tour-${tour.id}`}
      className="group block"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface">
        <Picture
          src={tour.image}
          alt={`${tour.name} — ${tour.place}`}
          caption={tour.name}
          loading={eager ? "eager" : "lazy"}
          className="h-full w-full object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:scale-[1.02]"
        />
        <span className="absolute left-0 top-0 bg-ground/80 px-[var(--space-3)] py-[var(--space-1)] text-[11px] uppercase tracking-[0.14em] text-ink">
          {tour.place}
        </span>
      </div>
      <div className="mt-[var(--space-4)] flex items-start justify-between gap-[var(--space-6)] border-t border-line pt-[var(--space-3)]">
        <div>
          <h3 className="font-display text-[20px] text-ink transition-colors duration-[var(--duration-fast)] group-hover:text-accent">{tour.name}</h3>
          <p className="mt-[var(--space-1)] text-[13px] text-ink-soft">
            {tour.duration} · from {tour.starts}
          </p>
        </div>
        <p className="tabular shrink-0 text-right text-[15px] text-ink">
          {formatPrice(tour.price, "JPY")}
          <span className="block text-[11px] text-ink-soft">{per}</span>
        </p>
      </div>
    </Link>
  );
}
