import { useState } from "react";
import { Link } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { useViewer } from "../lib/viewer";
import Icon from "../components/Icon";
import Bars from "../components/Bars";
import Figures from "../components/Figures";
import { Picture } from "../picture";
import { formatDate, formatPrice } from "../lib/format";
import type { BookingRow, MetricRow, MonthRow, OperatorRow, TourRow } from "../lib/tours";

/**
 * The back office. The review queue is a hairline-ruled register with status
 * as a single coloured dot; approving or rejecting a listing answers in
 * place, and a rejection asks for the reason the operator is sent.
 */
export default function Admin() {
  usePageMeta("pages.admin.title", "pages.admin.description");
  const session = useViewer();
  const { items: tours } = useCollection<TourRow>("tours", { pageSize: 24 });
  const { items: bookings } = useCollection<BookingRow>("bookings", { pageSize: 12 });
  const { items: operators } = useCollection<OperatorRow>("operators", { pageSize: 12 });
  const { items: metrics } = useCollection<MetricRow>("metrics", { pageSize: 8 });
  const { items: months } = useCollection<MonthRow>("months", { pageSize: 12 });
  const [open, setOpen] = useState<string | null>(null);
  const [result, setResult] = useState<"approved" | "rejected" | null>(null);
  const cols = useContent<{ tour: string; operator: string; traveller: string; date: string; people: string; total: string; status: string; placed: string }>("pages.admin.columns");
  const approve = useContent("pages.admin.approve");
  const reject = useContent("pages.admin.reject");
  const review = useContent("pages.admin.open");

  if (!session) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <T k="pages.admin.signin" as="p" className="text-[16px] text-ink-soft" />
        <Link to="/signin" className="mt-[var(--space-4)] inline-block bg-accent px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90">
          <T k="pages.signin.submit" />
        </Link>
      </div>
    );
  }

  const queue = tours.filter((t) => t.status === "pending");
  const travellers = Array.from(new Set(bookings.map((b) => b.traveller)));
  const field = "w-full border border-field bg-ground px-[var(--space-4)] py-[var(--space-3)] text-[15px] text-ink";

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <div className="border-b border-line pb-[var(--space-8)]">
        <T k="pages.admin.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
        <T k="pages.admin.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
      </div>

      <section className="mt-[var(--space-8)]">
        {queue.length === 0 ? (
          <T k="pages.admin.queueEmpty" as="p" className="text-[15px] text-ink-soft" />
        ) : (
          <ul className="flex flex-col">
            {queue.map((t) => (
              <li key={t.id} data-record={`tours:${t.id}`} className="border-b border-line">
                <div className="flex flex-col gap-[var(--space-3)] py-[var(--space-4)] sm:flex-row sm:items-center sm:gap-[var(--space-6)]">
                  <span className="inline-block h-2 w-2 shrink-0 rounded-[var(--radius-pill)] bg-accent" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-[20px] text-ink">{t.name}</p>
                    <p className="text-[12px] text-ink-soft">{t.place} · {operators.find((o) => o.id === t.operator)?.name ?? t.operator} · {t.photos.length} photographs</p>
                  </div>
                  <p className="tabular shrink-0 text-right text-[15px] text-ink sm:w-32">{formatPrice(t.price, "JPY")}</p>
                  <button type="button" data-testid={`review-${t.id}`} onClick={() => { setOpen(t.id); setResult(null); }} className="shrink-0 whitespace-nowrap border border-line px-[var(--space-4)] py-[var(--space-2)] text-[13px] text-ink hover:border-accent hover:text-accent">
                    {review}
                  </button>
                </div>

                {open === t.id && (
                  <div className="flex flex-col gap-[var(--space-6)] border-t border-line py-[var(--space-6)] lg:flex-row">
                    <div className="grid grid-cols-2 gap-[var(--space-3)] lg:w-2/5">
                      {t.photos.map((p, i) => (
                        <div key={p} className="aspect-[4/3] w-full overflow-hidden bg-surface">
                          <Picture src={p} alt={`${t.name} ${i + 1}`} caption={t.name} className="h-full w-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <div className="lg:w-3/5">
                      <p className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">{t.summary}</p>
                      <div className="mt-[var(--space-6)] flex flex-wrap items-center gap-[var(--space-3)]">
                        <button type="button" data-testid="approve-listing" onClick={() => setResult("approved")} className="inline-flex items-center gap-[var(--space-2)] whitespace-nowrap bg-accent px-[var(--space-6)] py-[var(--space-2)] text-[14px] text-accent-ink hover:opacity-90">
                          <Icon name="check" size={16} />
                          {approve}
                        </button>
                        <button type="button" data-testid="reject-listing" onClick={() => setResult("rejected")} className="inline-flex items-center gap-[var(--space-2)] whitespace-nowrap border border-line px-[var(--space-6)] py-[var(--space-2)] text-[14px] text-ink hover:border-accent hover:text-accent">
                          <Icon name="close" size={16} />
                          {reject}
                        </button>
                      </div>
                      {result === "rejected" && (
                        <label className="mt-[var(--space-4)] flex max-w-[32rem] flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
                          <T k="pages.admin.reason" />
                          <textarea id="reason" name="reason" rows={3} className={field} />
                          <T k="pages.admin.reasonHint" as="span" className="text-[12px]" />
                        </label>
                      )}
                      {result && (
                        <p data-testid="review-result" className="mt-[var(--space-4)] flex items-center gap-[var(--space-2)] text-[14px] text-accent">
                          <Icon name="done" size={16} />
                          <T k={result === "approved" ? "pages.admin.approved" : "pages.admin.rejected"} />
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-[var(--space-12)]">
        <T k="pages.admin.figures" as="h2" className="border-t border-line pt-[var(--space-4)] text-[length:var(--size-h2)] text-ink" />
        <div className="mt-[var(--space-4)]"><Figures metrics={metrics} /></div>
        <div className="mt-[var(--space-8)]"><Bars months={months} /></div>
      </section>

      <section className="mt-[var(--space-12)]">
        <T k="pages.admin.bookings" as="h2" className="border-t border-line pt-[var(--space-4)] text-[length:var(--size-h2)] text-ink" />
        <div className="mt-[var(--space-4)] overflow-x-auto">
          <table className="w-full min-w-[40rem] border-collapse text-[14px]">
            <thead>
              <tr className="border-b border-line text-left text-[11px] uppercase tracking-[0.14em] text-ink-soft">
                <th scope="col" className="py-[var(--space-2)] font-normal">{cols.tour}</th>
                <th scope="col" className="py-[var(--space-2)] font-normal">{cols.traveller}</th>
                <th scope="col" className="py-[var(--space-2)] text-right font-normal">{cols.date}</th>
                <th scope="col" className="py-[var(--space-2)] text-right font-normal">{cols.people}</th>
                <th scope="col" className="py-[var(--space-2)] text-right font-normal">{cols.total}</th>
                <th scope="col" className="py-[var(--space-2)] text-right font-normal">{cols.status}</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b.id} data-record={`bookings:${b.id}`} className="border-b border-line">
                  <td className="py-[var(--space-3)] text-ink">{tours.find((t) => t.id === b.tour)?.name ?? b.tour}</td>
                  <td className="py-[var(--space-3)] text-ink-soft">{b.traveller}</td>
                  <td className="tabular py-[var(--space-3)] text-right text-ink-soft">{formatDate(b.date)}</td>
                  <td className="tabular py-[var(--space-3)] text-right text-ink-soft">{b.people}</td>
                  <td className="tabular py-[var(--space-3)] text-right text-ink">{formatPrice(b.total, "JPY")}</td>
                  <td className="py-[var(--space-3)] text-right text-ink-soft">{b.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-[var(--space-12)] flex flex-col gap-[var(--space-12)] lg:flex-row lg:gap-[var(--space-16)]">
        <section className="lg:w-1/2">
          <T k="pages.admin.operators" as="h2" className="border-t border-line pt-[var(--space-4)] text-[length:var(--size-h2)] text-ink" />
          <ul className="mt-[var(--space-4)] flex flex-col">
            {operators.map((o) => (
              <li key={o.id} data-record={`operators:${o.id}`} className="flex items-baseline justify-between gap-[var(--space-4)] border-b border-line py-[var(--space-3)] text-[14px]">
                <span className="text-ink">{o.name}</span>
                <span className="tabular shrink-0 text-right text-[13px] text-ink-soft">{o.base} · {o.since}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="lg:w-1/2">
          <T k="pages.admin.travellers" as="h2" className="border-t border-line pt-[var(--space-4)] text-[length:var(--size-h2)] text-ink" />
          <ul className="mt-[var(--space-4)] flex flex-col">
            {travellers.map((name) => (
              <li key={name} className="flex items-baseline justify-between gap-[var(--space-4)] border-b border-line py-[var(--space-3)] text-[14px]">
                <span className="text-ink">{name}</span>
                <span className="tabular shrink-0 text-right text-[13px] text-ink-soft">
                  {bookings.filter((b) => b.traveller === name).length}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-[var(--space-12)]">
        <T k="pages.admin.terms" as="h2" className="border-t border-line pt-[var(--space-4)] text-[length:var(--size-h2)] text-ink" />
        <T k="pages.admin.termsSub" as="p" className="mt-[var(--space-3)] max-w-[56ch] text-[14px] leading-relaxed text-ink-soft" />
        <ul className="mt-[var(--space-6)] flex flex-col">
          {terms.map((t) => (
            <li key={t.id} data-record={`terms:${t.id}`} className="flex flex-col gap-[var(--space-2)] border-b border-line py-[var(--space-4)] sm:flex-row sm:items-baseline sm:justify-between sm:gap-[var(--space-8)]">
              <span className="text-[15px] text-ink">{t.question}</span>
              <span className="shrink-0 text-[13px] sm:text-right">
                {t.answer ? (
                  <span className="text-ink-soft">{t.answer}</span>
                ) : (
                  <span className="inline-flex items-center gap-[var(--space-2)] text-accent">
                    <Icon name="alert" size={14} />
                    {waiting}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
