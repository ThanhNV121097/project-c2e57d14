import { Link } from "react-router-dom";
import { T } from "../editable";
import { useCollection } from "../data";
import { usePageMeta } from "../seo";
import { Picture } from "../picture";
import type { TourRow } from "../lib/tours";

/**
 * The photographs, shown large: every picture the operators uploaded, laid
 * out as a two-column editorial run where the first of each pair is tall.
 */
export default function Gallery() {
  usePageMeta("pages.gallery.title", "pages.gallery.description");
  const { items, loading } = useCollection<TourRow>("tours", { where: { status: "approved" }, pageSize: 12 });
  const shots = items.flatMap((t) => t.photos.map((src, i) => ({ src, tour: t, key: `${t.id}-${i}` })));

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <div className="border-b border-line pb-[var(--space-8)]">
        <T k="pages.gallery.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
        <T k="pages.gallery.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
        <T k="pages.gallery.sub" as="p" className="mt-[var(--space-4)] max-w-[46ch] text-[16px] leading-relaxed text-ink-soft" />
      </div>

      {loading ? (
        <p className="py-[var(--space-12)] text-[14px] text-ink-soft">…</p>
      ) : (
        <div className="mt-[var(--space-8)] grid gap-[var(--space-6)] sm:grid-cols-2">
          {shots.map((s, i) => (
            <figure key={s.key} className={i % 3 === 0 ? "sm:col-span-2" : ""}>
              <Link to={`/tours/${s.tour.id}`} data-record={`tours:${s.tour.id}`} className="group block">
                <div className={`w-full overflow-hidden bg-surface ${i % 3 === 0 ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
                  <Picture
                    src={s.src}
                    alt={`${s.tour.name} — ${s.tour.place}`}
                    caption={s.tour.name}
                    loading={i < 2 ? "eager" : "lazy"}
                    className="h-full w-full object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:scale-[1.02]"
                  />
                </div>
                <figcaption className="mt-[var(--space-3)] flex items-baseline justify-between gap-[var(--space-4)] border-t border-line pt-[var(--space-2)]">
                  <span className="text-[14px] text-ink group-hover:text-accent">{s.tour.name}</span>
                  <span className="shrink-0 text-[11px] uppercase tracking-[0.14em] text-ink-soft">{s.tour.place}</span>
                </figcaption>
              </Link>
            </figure>
          ))}
        </div>
      )}
    </div>
  );
}
