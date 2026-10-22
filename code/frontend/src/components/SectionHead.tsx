import type { ReactNode } from "react";
import { T } from "../editable";

/**
 * Every section on the site is introduced the same way: a full-width hairline
 * rule, an 11px small-caps label sitting in the left margin, and the heading
 * and its supporting line to the right of it.
 */
export default function SectionHead({ label, heading, sub, aside }: {
  label: string;
  heading: string;
  sub?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="border-t border-line pt-[var(--space-6)]">
      <div className="flex flex-col gap-[var(--space-4)] lg:flex-row lg:gap-[var(--space-12)]">
        <T k={label} as="p" className="shrink-0 pt-1 text-[11px] uppercase tracking-[0.14em] text-ink-soft lg:w-40" />
        <div className="flex w-full flex-col gap-[var(--space-3)] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[46ch]">
            <T k={heading} as="h2" className="text-[length:var(--size-h2)] text-ink" />
            {sub && <T k={sub} as="p" className="mt-[var(--space-3)] text-[15px] leading-relaxed text-ink-soft" />}
          </div>
          {aside}
        </div>
      </div>
    </div>
  );
}
