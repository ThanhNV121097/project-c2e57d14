import type { MonthRow } from "../lib/tours";

/**
 * Bookings by month, as hairline-ruled columns on the page's own ground.
 * The tallest column is amber; the rest are the hairline colour, so the
 * chart reads as a figure rather than as decoration.
 */
export default function Bars({ months }: { months: MonthRow[] }) {
  const top = Math.max(1, ...months.map((m) => m.bookings));
  return (
    <div className="flex items-end gap-[var(--space-3)] border-b border-line pb-[var(--space-2)]" style={{ height: "160px" }}>
      {months.map((m) => (
        <div key={m.id} data-record={`months:${m.id}`} className="flex h-full flex-1 flex-col justify-end gap-[var(--space-2)]">
          <span className="tabular text-center text-[11px] text-ink-soft">{m.bookings}</span>
          <div
            className={m.bookings === top ? "w-full bg-accent" : "w-full bg-surface"}
            style={{ height: `${Math.round((m.bookings / top) * 100)}%` }}
          />
          <span className="text-center text-[11px] uppercase tracking-[0.14em] text-ink-soft">{m.month}</span>
        </div>
      ))}
    </div>
  );
}
