import { Link, useParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useRecord } from "../data";
import { usePageMeta } from "../seo";
import { Picture } from "../picture";
import Icon from "../components/Icon";
import { formatDate, formatPrice } from "../lib/format";
import type { BookingRow, TourRow } from "../lib/tours";

/** The confirmation: what was booked, when, for how many, and what it cost. */
export default function BookingDone() {
  usePageMeta("pages.booking.title", "pages.booking.description");
  const { id } = useParams();
  const { item } = useRecord<BookingRow>("bookings", id);
  const { item: tour } = useRecord<TourRow>("tours", item?.tour);
  const name = useContent("site.name");
  const account = useContent("pages.booking.account");

  if (!item || !tour) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <Link to="/tours" className="font-display text-[24px] text-ink hover:text-accent"><T k="pages.booking.missing" /></Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]" data-record={`bookings:${item.id}`}>
      <div className="border-b border-line pb-[var(--space-8)]">
        <p className="flex items-center gap-[var(--space-2)] text-[11px] uppercase tracking-[0.14em] text-accent">
          <Icon name="done" size={15} />
          <T k="pages.booking.label" />
        </p>
        <T k="pages.booking.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
        <T k="pages.booking.sub" as="p" className="mt-[var(--space-4)] max-w-[48ch] text-[16px] leading-relaxed text-ink-soft" />
      </div>

      <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-12)] lg:flex-row lg:gap-[var(--space-16)]">
        <div className="lg:w-3/5">
          <div className="aspect-[16/9] w-full overflow-hidden bg-surface">
            <Picture src={tour.image} alt={tour.name} caption={tour.name} loading="eager" className="h-full w-full object-cover" />
          </div>
          <h2 className="mt-[var(--space-4)] border-t border-line pt-[var(--space-3)] text-[length:var(--size-h2)] text-ink">{tour.name}</h2>
          <p className="mt-[var(--space-2)] flex flex-wrap gap-[var(--space-4)] text-[13px] text-ink-soft">
            <span className="inline-flex items-center gap-[var(--space-2)]"><Icon name="address" size={15} />{tour.meeting}</span>
            <span className="inline-flex items-center gap-[var(--space-2)]"><Icon name="hours" size={15} />{tour.duration} · from {tour.starts}</span>
          </p>
        </div>

        <aside className="lg:w-2/5">
          <T k="pages.booking.reference" as="p" className="border-t border-line pt-[var(--space-4)] text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
          <p data-testid="booking-reference" className="tabular mt-[var(--space-2)] font-display text-[32px] leading-none text-ink">
            {name} {item.id.toUpperCase()}
          </p>
          <dl className="tabular mt-[var(--space-6)] flex flex-col gap-[var(--space-3)] text-[14px]">
            <div className="flex justify-between border-b border-line pb-[var(--space-2)]"><dt className="text-ink-soft"><T k="pages.book.date" /></dt><dd className="text-right text-ink">{formatDate(item.date, "long")}</dd></div>
            <div className="flex justify-between border-b border-line pb-[var(--space-2)]"><dt className="text-ink-soft"><T k="pages.book.people" /></dt><dd className="text-right text-ink">{item.people}</dd></div>
            <div className="flex justify-between pt-[var(--space-2)]"><dt className="text-ink-soft"><T k="pages.account.paid" /></dt><dd className="text-right font-display text-[28px] leading-none text-accent">{formatPrice(item.total, "JPY")}</dd></div>
          </dl>
          <Link to="/account" data-testid="booking-account" className="mt-[var(--space-8)] inline-flex items-center gap-[var(--space-2)] whitespace-nowrap border border-line px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-ink hover:border-accent hover:text-accent">
            {account}
            <Icon name="arrow" size={16} />
          </Link>
        </aside>
      </div>
    </div>
  );
}
