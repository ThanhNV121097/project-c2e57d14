import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useRecord } from "../data";
import { usePageMeta } from "../seo";
import { useSession } from "../lib/session";
import { useDemo } from "../lib/demo";
import Icon from "../components/Icon";
import { formatDate, formatPrice } from "../lib/format";
import { clearDraft, readDraft, type Draft, type TourRow } from "../lib/tours";

/**
 * The booking being paid for: what the visitor chose, or — when the page is
 * being drawn, walked or shown in the Studio — a representative one, so the
 * totals and the card are never reviewed empty.
 */
function draftFor(id: string | undefined, tour: TourRow | undefined, demo: boolean): Draft | null {
  const stored = readDraft();
  if (stored && stored.tour === id) return stored;
  if (!tour) return null;
  const people = demo ? 2 : 1;
  return { tour: tour.id, date: tour.dates[0], people, total: tour.price * people };
}

/**
 * Payment: Visa and Mastercard through Stripe, with Apple Pay where the
 * device offers it. Nothing is charged — this is the design.
 */
export default function Checkout() {
  usePageMeta("pages.checkout.title", "pages.checkout.description");
  const { id } = useParams();
  const navigate = useNavigate();
  const session = useSession();
  const demo = useDemo();
  const { item } = useRecord<TourRow>("tours", id);
  const [paying, setPaying] = useState(false);
  const pay = useContent("pages.checkout.pay");
  const applepay = useContent("pages.checkout.applepay");
  const or = useContent("pages.checkout.or");

  const draft = draftFor(id, item, demo);

  if (!item || !draft) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <Link to="/tours" className="font-display text-[24px] text-ink hover:text-accent"><T k="pages.tour.missing" /></Link>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <T k="pages.book.signin" as="p" className="text-[16px] text-ink-soft" />
        <Link to="/signin" className="mt-[var(--space-4)] inline-block bg-accent px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90">
          <T k="pages.signin.submit" />
        </Link>
      </div>
    );
  }

  function finish() {
    setPaying(true);
    clearDraft();
    window.setTimeout(() => navigate("/booking/bk-2411"), 400);
  }

  const field = "w-full border border-field bg-ground px-[var(--space-4)] py-[var(--space-3)] text-[15px] text-ink";
  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <div className="border-b border-line pb-[var(--space-8)]">
        <T k="pages.checkout.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
        <T k="pages.checkout.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
      </div>

      <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-12)] lg:flex-row lg:gap-[var(--space-16)]">
        <form className="lg:w-3/5" onSubmit={(e) => { e.preventDefault(); finish(); }}>
          <button type="button" data-testid="apple-pay" className="flex w-full items-center justify-center gap-[var(--space-2)] border border-line bg-surface px-[var(--space-6)] py-[var(--space-4)] text-[15px] text-ink hover:border-accent">
            <Icon name="wallet" size={18} />
            {applepay}
          </button>
          <p className="my-[var(--space-6)] flex items-center gap-[var(--space-4)] text-[12px] uppercase tracking-[0.14em] text-ink-soft">
            <span className="h-px flex-1 bg-line" />{or}<span className="h-px flex-1 bg-line" />
          </p>

          <div className="flex flex-col gap-[var(--space-4)]">
            <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
              <T k="pages.checkout.name" />
              <input id="card-name" name="card-name" autoComplete="cc-name" className={field} defaultValue={demo ? session.name : ""} />
            </label>
            <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
              <T k="pages.checkout.cardNumber" />
              <input id="card-number" name="card-number" inputMode="numeric" autoComplete="cc-number" className={`tabular ${field}`} defaultValue={demo ? "4242 4242 4242 4242" : ""} />
            </label>
            <div className="flex gap-[var(--space-4)]">
              <label className="flex flex-1 flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
                <T k="pages.checkout.expiry" />
                <input id="card-expiry" name="card-expiry" inputMode="numeric" autoComplete="cc-exp" className={`tabular ${field}`} defaultValue={demo ? "04/29" : ""} />
              </label>
              <label className="flex flex-1 flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
                <T k="pages.checkout.cvc" />
                <input id="card-cvc" name="card-cvc" inputMode="numeric" autoComplete="cc-csc" className={`tabular ${field}`} defaultValue={demo ? "123" : ""} />
              </label>
            </div>
          </div>

          <p className="mt-[var(--space-4)] flex items-center gap-[var(--space-2)] text-[13px] text-ink-soft">
            <Icon name="secure" size={16} className="text-accent" />
            <T k="pages.checkout.secure" />
          </p>

          <button type="submit" data-testid="pay-now" disabled={paying} className="mt-[var(--space-8)] inline-flex items-center gap-[var(--space-2)] whitespace-nowrap bg-accent px-[var(--space-8)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90 disabled:opacity-60">
            <Icon name="card" size={16} />
            {pay} {formatPrice(draft.total, "JPY")}
          </button>
          <T k="pages.checkout.note" as="p" className="mt-[var(--space-3)] text-[13px] text-ink-soft" />
        </form>

        <aside className="lg:w-2/5" data-record={`tours:${item.id}`}>
          <T k="pages.checkout.summary" as="p" className="border-t border-line pt-[var(--space-4)] text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
          <h2 className="mt-[var(--space-3)] text-[length:var(--size-h2)] text-ink">{item.name}</h2>
          <dl className="tabular mt-[var(--space-6)] flex flex-col gap-[var(--space-3)] text-[14px]">
            <div className="flex justify-between border-b border-line pb-[var(--space-2)]"><dt className="text-ink-soft"><T k="pages.book.date" /></dt><dd className="text-right text-ink">{formatDate(draft.date, "medium")}</dd></div>
            <div className="flex justify-between border-b border-line pb-[var(--space-2)]"><dt className="text-ink-soft"><T k="pages.book.people" /></dt><dd className="text-right text-ink">{draft.people}</dd></div>
            <div className="flex justify-between border-b border-line pb-[var(--space-2)]"><dt className="text-ink-soft"><T k="pages.tour.perPerson" /></dt><dd className="text-right text-ink">{formatPrice(item.price, "JPY")}</dd></div>
            <div className="flex justify-between pt-[var(--space-2)]">
              <dt className="text-ink-soft"><T k="pages.book.total" /></dt>
              <dd data-testid="checkout-total" className="text-right font-display text-[32px] leading-none text-accent">{formatPrice(draft.total, "JPY")}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </div>
  );
}
