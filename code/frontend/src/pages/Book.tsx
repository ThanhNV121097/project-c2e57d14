import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useRecord } from "../data";
import { usePageMeta } from "../seo";
import { useSession } from "../lib/session";
import { Picture } from "../picture";
import Icon from "../components/Icon";
import { formatDate, formatPrice } from "../lib/format";
import { saveDraft, type TourRow } from "../lib/tours";

/** Pick a date the operator set and say how many are going. */
export default function Book() {
  usePageMeta("pages.book.title", "pages.book.description");
  const { id } = useParams();
  const navigate = useNavigate();
  const session = useSession();
  const { item } = useRecord<TourRow>("tours", id);
  const [date, setDate] = useState("");
  const [people, setPeople] = useState(2);
  const perLabel = useContent("pages.book.perPerson");
  const totalLabel = useContent("pages.book.total");
  const dateLabel = useContent("pages.book.date");
  const peopleLabel = useContent("pages.book.people");
  const slot = useContent("pages.book.slot");
  const cont = useContent("pages.book.continue");

  if (!item) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <Link to="/tours" className="font-display text-[24px] text-ink hover:text-accent"><T k="pages.tour.missing" /></Link>
      </div>
    );
  }

  const chosen = date || item.dates[0];
  const total = item.price * people;

  function go() {
    if (!item) return;
    saveDraft({ tour: item.id, date: chosen, people, total });
    navigate(session ? `/checkout/${item.id}` : "/signin");
  }

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <div className="border-b border-line pb-[var(--space-8)]">
        <T k="pages.book.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
        <T k="pages.book.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
      </div>

      <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-12)] lg:flex-row lg:gap-[var(--space-16)]">
        <form className="lg:w-3/5" onSubmit={(e) => { e.preventDefault(); go(); }}>
          <fieldset className="border-t border-line pt-[var(--space-4)]">
            <legend className="sr-only">{dateLabel}</legend>
            <p className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">{dateLabel}</p>
            <ul className="mt-[var(--space-3)] flex flex-col" id="dates">
              {item.dates.map((d) => (
                <li key={d}>
                  <label className="tabular flex cursor-pointer items-center justify-between border-b border-line py-[var(--space-3)] text-[15px] text-ink">
                    <span className="flex items-center gap-[var(--space-3)]">
                      <input type="radio" name="date" value={d} checked={chosen === d} onChange={() => setDate(d)} className="accent-accent" />
                      {formatDate(d, "long")}
                    </span>
                    <span className="text-[12px] text-ink-soft">{slot}</span>
                  </label>
                </li>
              ))}
            </ul>
          </fieldset>

          <div className="mt-[var(--space-8)] border-t border-line pt-[var(--space-4)]">
            <label htmlFor="people" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">{peopleLabel}</label>
            <div className="mt-[var(--space-3)] flex items-center gap-[var(--space-3)]">
              <button type="button" aria-label={peopleLabel} onClick={() => setPeople((n) => Math.max(1, n - 1))} className="flex h-10 w-10 items-center justify-center border border-line text-ink hover:border-accent hover:text-accent">
                <Icon name="minus" size={16} />
              </button>
              <input
                id="people"
                name="people"
                type="number"
                min={1}
                max={12}
                value={people}
                onChange={(e) => setPeople(Math.max(1, Math.min(12, Number(e.target.value) || 1)))}
                className="tabular w-20 border border-field bg-ground px-[var(--space-3)] py-[var(--space-2)] text-center text-[16px] text-ink"
              />
              <button type="button" aria-label={peopleLabel} onClick={() => setPeople((n) => Math.min(12, n + 1))} className="flex h-10 w-10 items-center justify-center border border-line text-ink hover:border-accent hover:text-accent">
                <Icon name="plus" size={16} />
              </button>
            </div>
            <T k="pages.book.note" as="p" className="mt-[var(--space-4)] text-[13px] text-ink-soft" />
          </div>

          <button type="submit" data-testid="booking-continue" className="mt-[var(--space-8)] inline-flex items-center gap-[var(--space-2)] whitespace-nowrap bg-accent px-[var(--space-8)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90">
            {cont}
            <Icon name="arrow" size={16} />
          </button>
          {!session && <T k="pages.book.signin" as="p" className="mt-[var(--space-3)] text-[13px] text-ink-soft" />}
        </form>

        <aside className="lg:w-2/5" data-record={`tours:${item.id}`}>
          <div className="aspect-[4/3] w-full overflow-hidden bg-surface">
            <Picture src={item.image} alt={item.name} caption={item.name} className="h-full w-full object-cover" />
          </div>
          <h2 className="mt-[var(--space-4)] border-t border-line pt-[var(--space-3)] text-[length:var(--size-h2)] text-ink">{item.name}</h2>
          <p className="mt-[var(--space-1)] text-[13px] text-ink-soft">{item.place} · {item.duration} · from {item.starts}</p>
          <dl className="tabular mt-[var(--space-6)] flex flex-col gap-[var(--space-2)] border-t border-line pt-[var(--space-4)] text-[14px]">
            <div className="flex justify-between"><dt className="text-ink-soft">{formatPrice(item.price, "JPY")} {perLabel}</dt><dd className="text-right text-ink">× {people}</dd></div>
            <div className="flex justify-between border-t border-line pt-[var(--space-3)]">
              <dt className="text-ink-soft">{totalLabel}</dt>
              <dd data-testid="booking-total" className="text-right font-display text-[28px] leading-none text-accent">{formatPrice(total, "JPY")}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
