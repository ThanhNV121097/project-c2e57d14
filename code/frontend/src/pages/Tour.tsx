import { Link, useParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useRecord } from "../data";
import { usePageMeta } from "../seo";
import { Picture } from "../picture";
import Icon from "../components/Icon";
import SectionHead from "../components/SectionHead";
import { formatDate, formatPrice } from "../lib/format";
import type { OperatorRow, TourRow } from "../lib/tours";

/**
 * One tour. The first photograph runs edge to edge of the viewport; the price
 * is the second-largest thing on the first screen; the remaining photographs
 * are a 2/3 – 1/3 pair beneath, never four equal thumbnails.
 */
export default function Tour() {
  usePageMeta("pages.tour.title", "pages.tour.description");
  const { id } = useParams();
  const { item } = useRecord<TourRow>("tours", id);
  const { item: operator } = useRecord<OperatorRow>("operators", item?.operator);
  const per = useContent("pages.tour.perPerson");
  const book = useContent("pages.tour.book");

  if (!item) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <Link to="/tours" className="font-display text-[24px] text-ink hover:text-accent">
          <T k="pages.tour.missing" />
        </Link>
      </div>
    );
  }

  const rest = item.photos.filter((p) => p !== item.image);
  return (
    <article data-record={`tours:${item.id}`}>
      <div className="relative h-[clamp(320px,52vh,520px)] w-full overflow-hidden">
        <Picture src={item.image} alt={`${item.name} — ${item.place}`} loading="eager" className="settle h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--ground)_2%,rgba(12,13,12,0.55)_40%,rgba(12,13,12,0.1)_100%)]" />
      </div>

      <div className="mx-auto max-w-page px-[var(--gutter)]">
        <div className="-mt-[var(--space-16)] flex flex-col gap-[var(--space-8)] lg:flex-row lg:items-end lg:justify-between">
          <div className="relative max-w-[40rem]">
            <p className="text-[11px] uppercase tracking-[0.14em] text-accent">{item.place}</p>
            <h1 className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink">{item.name}</h1>
            <p className="mt-[var(--space-4)] flex flex-wrap items-center gap-[var(--space-4)] text-[13px] text-ink-soft">
              <span className="inline-flex items-center gap-[var(--space-2)]"><Icon name="hours" size={15} />{item.duration} · from {item.starts}</span>
              <span className="inline-flex items-center gap-[var(--space-2)]"><Icon name="secure" size={15} /><T k="pages.tour.approved" /></span>
            </p>
          </div>
          <div className="relative shrink-0 lg:text-right">
            <p className="tabular font-display text-[52px] leading-none text-ink">{formatPrice(item.price, "JPY")}</p>
            <p className="mt-[var(--space-1)] text-[12px] text-ink-soft">{per}</p>
            <Link to={`/book/${item.id}`} data-testid="tour-book" className="mt-[var(--space-4)] inline-flex items-center gap-[var(--space-2)] whitespace-nowrap bg-accent px-[var(--space-8)] py-[var(--space-3)] text-[14px] text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-90">
              {book}
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-[var(--space-12)] flex flex-col gap-[var(--space-12)] border-t border-line pt-[var(--space-8)] lg:flex-row lg:gap-[var(--space-16)]">
          <div className="max-w-[56ch] lg:w-3/5">
            <p className="text-[17px] leading-relaxed text-ink">{item.summary}</p>

            <div className="mt-[var(--space-12)]">
              <SectionHead narrow label="pages.tour.includedLabel" heading="pages.tour.included" />
            </div>
            <ul className="mt-[var(--space-4)] grid gap-[var(--space-3)] sm:grid-cols-2">
              {item.included.map((inc) => (
                <li key={inc} className="flex items-start gap-[var(--space-2)] text-[14px] text-ink-soft">
                  <Icon name="check" size={16} className="mt-[2px] text-accent" />
                  {inc}
                </li>
              ))}
            </ul>

            {rest.length >= 2 && (
              <>
                <div className="mt-[var(--space-12)]">
                  <SectionHead narrow label="pages.tour.photosLabel" heading="pages.tour.photos" />
                </div>
                <div className="mt-[var(--space-4)] flex gap-[var(--space-3)]">
                  <div className="aspect-[4/3] w-2/3 overflow-hidden bg-surface">
                    <Picture src={rest[0]} alt={`${item.name} — ${item.place}`} caption={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="aspect-[2/3] w-1/3 overflow-hidden bg-surface">
                    <Picture src={rest[1]} alt={`${item.name} — ${item.place}`} caption={item.name} className="h-full w-full object-cover" />
                  </div>
                </div>
                {rest.slice(2).map((photo) => (
                  <div key={photo} className="mt-[var(--space-3)] aspect-[16/9] w-full overflow-hidden bg-surface">
                    <Picture src={photo} alt={`${item.name} — ${item.place}`} caption={item.name} className="h-full w-full object-cover" />
                  </div>
                ))}
              </>
            )}
          </div>

          <aside className="lg:w-2/5">
            <div className="border-t border-line pt-[var(--space-4)]">
              <T k="pages.tour.dates" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
              <ul className="mt-[var(--space-3)] flex flex-col">
                {item.dates.map((d) => (
                  <li key={d} className="tabular flex items-center justify-between border-b border-line py-[var(--space-2)] text-[14px] text-ink">
                    <span>{formatDate(d, "medium")}</span>
                    <span className="text-[12px] text-ink-soft">{item.duration}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-[var(--space-8)] border-t border-line pt-[var(--space-4)]">
              <T k="pages.tour.meeting" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
              <p className="mt-[var(--space-2)] flex items-start gap-[var(--space-2)] text-[14px] text-ink">
                <Icon name="address" size={16} className="mt-[2px] text-accent" />
                {item.meeting}
              </p>
            </div>

            {operator && (
              <div className="mt-[var(--space-8)] border-t border-line pt-[var(--space-4)]" data-record={`operators:${operator.id}`}>
                <T k="pages.tour.operator" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
                <p className="mt-[var(--space-2)] font-display text-[20px] text-ink">{operator.name}</p>
                <p className="mt-[var(--space-2)] text-[14px] leading-relaxed text-ink-soft">{operator.blurb}</p>
              </div>
            )}
          </aside>
        </div>
      </div>
    </article>
  );
}
