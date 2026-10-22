import { Link } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { signOut } from "../lib/session";
import { useViewer } from "../lib/viewer";
import Icon from "../components/Icon";
import { Picture } from "../picture";
import { formatDate, formatPrice } from "../lib/format";
import type { BookingRow, TourRow } from "../lib/tours";

/** Who is signed in, what they have booked, and the way out. */
export default function Account() {
  usePageMeta("pages.account.title", "pages.account.description");
  const session = useSession();
  const { items: bookings } = useCollection<BookingRow>("bookings", { pageSize: 12 });
  const { items: tours } = useCollection<TourRow>("tours", { pageSize: 24 });
  const signedInAs = useContent("pages.account.signedInAs");
  const out = useContent("pages.account.signout");
  const browse = useContent("pages.account.browse");

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

  const mine = bookings.filter((b) => b.status === "paid").slice(0, 3);
  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <div className="flex flex-col gap-[var(--space-4)] border-b border-line pb-[var(--space-8)] lg:flex-row lg:items-end lg:justify-between">
        <div>
          <T k="pages.account.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
          <T k="pages.account.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
          <p className="mt-[var(--space-3)] text-[14px] text-ink-soft">{signedInAs} {session.email}</p>
        </div>
        <button type="button" data-testid="account-signout" onClick={signOut} className="inline-flex shrink-0 items-center gap-[var(--space-2)] self-start whitespace-nowrap border border-line px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-ink hover:border-accent hover:text-accent">
          <Icon name="logout" size={16} />
          {out}
        </button>
      </div>

      {mine.length === 0 ? (
        <div className="py-[var(--space-12)]">
          <T k="pages.account.none" as="p" className="text-[16px] text-ink-soft" />
          <Link to="/tours" className="mt-[var(--space-4)] inline-block bg-accent px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90">{browse}</Link>
        </div>
      ) : (
        <ul className="mt-[var(--space-8)] flex flex-col">
          {mine.map((b) => {
            const tour = tours.find((t) => t.id === b.tour);
            return (
              <li key={b.id} data-record={`bookings:${b.id}`} className="flex flex-col gap-[var(--space-4)] border-b border-line py-[var(--space-6)] sm:flex-row sm:items-center">
                <div className="aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface sm:w-40">
                  <Picture src={tour?.image ?? ""} alt={tour?.name ?? b.tour} caption={tour?.name} className="h-full w-full object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link to={`/tours/${b.tour}`} className="font-display text-[20px] text-ink hover:text-accent">{tour?.name ?? b.tour}</Link>
                  <p className="tabular mt-[var(--space-1)] text-[13px] text-ink-soft">
                    <T k="pages.account.when" /> {formatDate(b.date, "medium")} · <T k="pages.account.people" /> {b.people}
                  </p>
                </div>
                <p className="tabular shrink-0 text-right">
                  <span className="block font-display text-[24px] leading-none text-ink">{formatPrice(b.total, "JPY")}</span>
                  <span className="mt-[var(--space-1)] block text-[12px] text-ink-soft"><T k="pages.account.paid" /></span>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
