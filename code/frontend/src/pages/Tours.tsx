import { useSearchParams } from "react-router-dom";
import { T, useContent } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import Grid from "../components/Grid";
import TourCard from "../components/TourCard";
import type { PlaceRow, TourRow } from "../lib/tours";

/** Every approved tour, narrowed by place. */
export default function Tours() {
  usePageMeta("pages.tours.title", "pages.tours.description");
  const [params, setParams] = useSearchParams();
  const placeId = params.get("place") ?? "";
  const { items: places } = useCollection<PlaceRow>("places", { pageSize: 12 });
  const place = places.find((p) => p.id === placeId);
  const { items, total, hasMore, loading, loadMore } = useCollection<TourRow>("tours", {
    where: place ? { status: "approved", place: place.name } : { status: "approved" },
    pageSize: 6,
  });
  const allLabel = useContent("pages.tours.filterAll");
  const countLabel = useContent("pages.tours.count");
  const more = useContent("pages.tours.more");

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <div className="border-b border-line pb-[var(--space-8)]">
        <T k="pages.tours.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
        <T k="pages.tours.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
        <T k="pages.tours.sub" as="p" className="mt-[var(--space-4)] max-w-[46ch] text-[16px] leading-relaxed text-ink-soft" />
      </div>

      <div className="flex flex-col gap-[var(--space-4)] border-b border-line py-[var(--space-4)] lg:flex-row lg:items-center lg:justify-between">
        <ul className="flex flex-wrap gap-[var(--space-2)]">
          <li>
            <button
              type="button"
              data-testid="filter-all"
              onClick={() => setParams({})}
              className={`border px-[var(--space-4)] py-[var(--space-2)] text-[13px] transition-colors duration-[var(--duration-fast)] ${placeId === "" ? "border-accent text-accent" : "border-line text-ink-soft hover:text-ink"}`}
            >
              {allLabel}
            </button>
          </li>
          {places.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                data-testid={`filter-${p.id}`}
                onClick={() => setParams({ place: p.id })}
                className={`border px-[var(--space-4)] py-[var(--space-2)] text-[13px] transition-colors duration-[var(--duration-fast)] ${placeId === p.id ? "border-accent text-accent" : "border-line text-ink-soft hover:text-ink"}`}
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
        <p data-testid="tour-count" className="tabular shrink-0 text-[13px] text-ink-soft lg:text-right">
          {total} {countLabel}{place ? ` · ${place.name}` : ""}
        </p>
      </div>

      {loading ? (
        <p className="py-[var(--space-12)] text-[14px] text-ink-soft">…</p>
      ) : total === 0 ? (
        <T k="pages.tours.empty" as="p" className="py-[var(--space-12)] text-[15px] text-ink-soft" />
      ) : (
        <>
          <Grid max={3} phone={1} className="py-[var(--space-8)]">
            {items.map((t, i) => <TourCard key={t.id} tour={t} eager={i < 3} />)}
          </Grid>
          {hasMore && (
            <button
              type="button"
              onClick={loadMore}
              data-testid="tours-more"
              className="mx-auto block border border-line px-[var(--space-8)] py-[var(--space-3)] text-[14px] text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent hover:text-accent"
            >
              {more}
            </button>
          )}
        </>
      )}
    </div>
  );
}
