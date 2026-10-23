import { formatPrice } from "../lib/format";
import type { MetricRow } from "../lib/tours";

/** The dashboard's figures: a number set large, its label small under it. */
export default function Figures({ metrics }: { metrics: MetricRow[] }) {
  return (
    <dl className="grid grid-cols-2 gap-[var(--space-6)] lg:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.id} data-record={`metrics:${m.id}`} className="border-t border-line pt-[var(--space-3)]">
          <dd className="tabular font-display text-[32px] leading-none text-ink">
            {m.unit ? formatPrice(m.value, m.unit) : m.value}
          </dd>
          <dt className="mt-[var(--space-2)] text-[12px] leading-snug text-ink-soft">{m.label}</dt>
        </div>
      ))}
    </dl>
  );
}
