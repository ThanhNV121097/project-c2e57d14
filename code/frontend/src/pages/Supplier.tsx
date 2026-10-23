import { Link } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { useViewer } from "../lib/viewer";
import Icon from "../components/Icon";
import Bars from "../components/Bars";
import Figures from "../components/Figures";
import { formatPrice } from "../lib/format";
import type { MetricRow, MonthRow, OperatorRow, TourRow } from "../lib/tours";

/** The operator's dashboard: their listings, their figures, their month. */
export default function Supplier() {
  usePageMeta("pages.supplier.title", "pages.supplier.description");
  const session = useViewer();
  const { items: tours } = useCollection<TourRow>("tours", { pageSize: 24 });
  const { items: operators } = useCollection<OperatorRow>("operators", { pageSize: 12 });
  const { items: metrics } = useCollection<MetricRow>("metrics", { pageSize: 8 });
  const { items: months } = useCollection<MonthRow>("months", { pageSize: 12 });
  const newLabel = useContent("pages.supplier.new");

  if (!session) {
    return (
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-16)]">
        <T k="pages.supplier.signin" as="p" className="text-[16px] text-ink-soft" />
        <Link to="/signin" className="mt-[var(--space-4)] inline-block bg-accent px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90">
          <T k="pages.signin.submit" />
        </Link>
      </div>
    );
  }

  // The operator signed in — matched on the address in their record; while the
  // design is being drawn or walked there is no real session, so the first
  // operator stands in rather than an empty table.
  const me = operators.find((o) => o.email === session.email) ?? operators[0];
  const mine = me ? tours.filter((t) => t.operator === me.id) : [];
  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <div className="flex flex-col gap-[var(--space-4)] border-b border-line pb-[var(--space-8)] lg:flex-row lg:items-end lg:justify-between">
        <div>
          <T k="pages.supplier.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
          <T k="pages.supplier.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
        </div>
        <Link to="/supplier/new" data-testid="supplier-new" className="inline-flex shrink-0 items-center gap-[var(--space-2)] self-start whitespace-nowrap bg-accent px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90">
          <Icon name="plus" size={16} />
          {newLabel}
        </Link>
      </div>

      <section className="mt-[var(--space-8)]">
        <T k="pages.supplier.figures" as="h2" className="text-[length:var(--size-h2)] text-ink" />
        <div className="mt-[var(--space-4)]"><Figures metrics={metrics} /></div>
      </section>

      <section className="mt-[var(--space-12)]">
        <T k="pages.supplier.chart" as="h2" className="border-t border-line pt-[var(--space-4)] text-[length:var(--size-h2)] text-ink" />
        <div className="mt-[var(--space-6)]"><Bars months={months} /></div>
      </section>

      <section className="mt-[var(--space-12)]">
        <T k="pages.supplier.heading" as="h2" className="border-t border-line pt-[var(--space-4)] text-[length:var(--size-h2)] text-ink" />
        <table className="mt-[var(--space-4)] w-full border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-line text-left text-[11px] uppercase tracking-[0.14em] text-ink-soft">
              <th scope="col" className="py-[var(--space-2)] font-normal"><T k="pages.supplier.listings" /></th>
              <th scope="col" className="py-[var(--space-2)] font-normal"><T k="pages.supplier.status" /></th>
              <th scope="col" className="py-[var(--space-2)] text-right font-normal"><T k="pages.supplier.dates" /></th>
              <th scope="col" className="py-[var(--space-2)] text-right font-normal"><T k="pages.supplier.price" /></th>
            </tr>
          </thead>
          <tbody>
            {mine.map((t) => (
              <tr key={t.id} data-record={`tours:${t.id}`} className="border-b border-line">
                <td className="py-[var(--space-3)]">
                  <Link to={`/tours/${t.id}`} className="text-ink hover:text-accent">{t.name}</Link>
                  <span className="block text-[12px] text-ink-soft">{t.place}</span>
                </td>
                <td className="py-[var(--space-3)]">
                  <span className="inline-flex items-center gap-[var(--space-2)] text-[13px] text-ink-soft">
                    <span className={`inline-block h-2 w-2 rounded-[var(--radius-pill)] ${t.status === "approved" ? "bg-accent" : "bg-ink-soft"}`} />
                    {t.status === "approved" ? "Live" : "In review"}
                  </span>
                </td>
                <td className="tabular py-[var(--space-3)] text-right text-ink-soft">{t.dates.length}</td>
                <td className="tabular py-[var(--space-3)] text-right text-ink">{formatPrice(t.price, "JPY")}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <T k="pages.supplier.payouts" as="p" className="mt-[var(--space-4)] text-[13px] text-ink-soft" />
      </section>
    </div>
  );
}
