import { useState } from "react";
import { Link } from "react-router-dom";
import { T, useContent } from "../editable";
import { usePageMeta } from "../seo";
import { useSession } from "../lib/session";
import Icon from "../components/Icon";
import { Picture } from "../picture";

/**
 * The listing form. Four photographs is the rule the brief sets, so the
 * submit button is held until four slots are filled and the rule is stated
 * on the page rather than inside an error.
 */
export default function SupplierNew() {
  usePageMeta("pages.supplierNew.title", "pages.supplierNew.description");
  const session = useSession();
  const [photos, setPhotos] = useState<string[]>(["/images/ginzan-onsen.jpg", "/images/hokkaido-snow.jpg"]);
  const [sent, setSent] = useState(false);
  const add = useContent("pages.supplierNew.photoAdd");
  const submit = useContent("pages.supplierNew.submit");
  const fullDay = useContent("pages.supplierNew.fullDay");
  const pool = ["/images/hokkaido-furano.jpg", "/images/kyoto-torii.jpg", "/images/osaka-street.jpg", "/images/nara-deer.jpg"];
  const enough = photos.length >= 4;
  const field = "w-full border border-field bg-ground px-[var(--space-4)] py-[var(--space-3)] text-[15px] text-ink";

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

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <div className="border-b border-line pb-[var(--space-8)]">
        <T k="pages.supplierNew.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
        <T k="pages.supplierNew.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
        <T k="pages.supplierNew.sub" as="p" className="mt-[var(--space-4)] max-w-[46ch] text-[16px] leading-relaxed text-ink-soft" />
      </div>

      <form className="mt-[var(--space-8)] flex flex-col gap-[var(--space-12)] lg:flex-row lg:gap-[var(--space-16)]" onSubmit={(e) => { e.preventDefault(); if (enough) setSent(true); }}>
        <div className="flex flex-col gap-[var(--space-4)] lg:w-3/5">
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.supplierNew.titleField" />
            <input id="title" name="title" className={field} />
          </label>
          <div className="flex gap-[var(--space-4)]">
            <label className="flex flex-1 flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
              <T k="pages.supplierNew.place" />
              <input id="place" name="place" className={field} />
            </label>
            <label className="flex flex-1 flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
              <T k="pages.supplierNew.price" />
              <input id="price" name="price" type="number" inputMode="numeric" className={`tabular ${field}`} />
            </label>
          </div>
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.supplierNew.duration" />
            <select id="duration" name="duration" className={field}>
              <option value="full-day">{fullDay}</option>
            </select>
          </label>
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.supplierNew.summaryField" />
            <textarea id="summary" name="summary" rows={4} className={field} />
          </label>
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.supplierNew.included" />
            <textarea id="included" name="included" rows={3} className={field} />
          </label>
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.supplierNew.dates" />
            <textarea id="dates" name="dates" rows={3} className={field} />
          </label>
        </div>

        <aside className="lg:w-2/5">
          <T k="pages.supplierNew.photos" as="p" className="border-t border-line pt-[var(--space-4)] text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
          <p data-testid="photo-rule" className="mt-[var(--space-3)] flex items-start gap-[var(--space-2)] text-[13px] text-ink-soft">
            <Icon name={enough ? "done" : "alert"} size={16} className={enough ? "mt-[2px] text-accent" : "mt-[2px] text-ink-soft"} />
            <T k="pages.supplierNew.photoRule" />
          </p>
          <ul className="mt-[var(--space-4)] grid grid-cols-2 gap-[var(--space-3)]">
            {[0, 1, 2, 3].map((i) => (
              <li key={i} className="aspect-[4/3] w-full overflow-hidden bg-surface">
                <Picture src={photos[i] ?? ""} alt={`Photograph ${i + 1}`} caption={`Photograph ${i + 1}`} className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
          <button
            type="button"
            data-testid="add-photo"
            onClick={() => setPhotos((p) => (p.length < 4 ? [...p, pool[p.length - 2] ?? pool[0]] : p))}
            className="mt-[var(--space-4)] inline-flex items-center gap-[var(--space-2)] border border-line px-[var(--space-6)] py-[var(--space-2)] text-[14px] text-ink hover:border-accent hover:text-accent"
          >
            <Icon name="photo" size={16} />
            {add}
          </button>

          <button
            type="submit"
            data-testid="submit-tour"
            disabled={!enough}
            className="mt-[var(--space-8)] inline-flex w-full items-center justify-center gap-[var(--space-2)] whitespace-nowrap bg-accent px-[var(--space-8)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90 disabled:opacity-40"
          >
            {submit}
            <Icon name="arrow" size={16} />
          </button>
          <T k={sent ? "pages.supplierNew.submitted" : enough ? "pages.supplierNew.photoRule" : "pages.supplierNew.blocked"} as="p" className="mt-[var(--space-3)] text-[13px] text-ink-soft" />
        </aside>
      </form>
    </div>
  );
}
