import { Link } from "react-router-dom";
import { T, useContent, useList } from "../editable";
import { useCollection } from "../data";
import { Picture } from "../picture";
import Icon from "../components/Icon";
import Grid from "../components/Grid";
import SectionHead from "../components/SectionHead";
import TourCard from "../components/TourCard";
import { formatPrice } from "../lib/format";
import type { PlaceRow, TourRow } from "../lib/tours";

/**
 * The home page. One photograph fills the window; a gradient comes in from
 * the left and carries the headline, whose last line is amber and crosses
 * off the gradient onto the picture; three tall place tiles sit low on the
 * right over the same photograph.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <div className="mx-auto flex max-w-page flex-col gap-[var(--space-16)] px-[var(--gutter)] py-[var(--space-16)]">
        <Places />
        <LiveTours />
        <Gate />
        <ForOperators />
      </div>
    </>
  );
}

function Hero() {
  const { items: places } = useCollection<PlaceRow>("places", { pageSize: 3 });
  const tilesLabel = useContent("hero.tiles");
  const cta = useContent<{ label: string; href: string }>("hero.cta");
  const second = useContent<{ label: string; href: string }>("hero.second");
  return (
    <section className="relative isolate min-h-[clamp(560px,calc(100svh-var(--header-h)),760px)] w-full overflow-hidden">
      <Picture
        src="/images/fuji-clouds.jpg"
        alt="Mount Fuji above the cloud line at first light"
        loading="eager"
        className="settle absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--ground)_8%,rgba(12,13,12,0.82)_38%,rgba(12,13,12,0.25)_66%,rgba(12,13,12,0.45)_100%)]" />
      <div className="relative mx-auto flex h-full max-w-page flex-col justify-between gap-[var(--space-8)] px-[var(--gutter)] py-[var(--space-12)] lg:flex-row lg:items-end">
        <div className="max-w-[34rem] lg:pb-[var(--space-8)]">
          <T k="hero.eyebrow" as="p" className="rise text-[11px] uppercase tracking-[0.14em] text-accent" />
          <h1 className="rise mt-[var(--space-4)] text-[length:var(--size-h1)] text-ink" style={{ animationDelay: "80ms" }}>
            <T k="hero.headline" as="span" className="block" />
            <T k="hero.headlineAccent" as="span" className="block text-accent" />
          </h1>
          <T k="hero.sub" as="p" className="rise mt-[var(--space-6)] max-w-[44ch] text-[17px] leading-relaxed text-ink-soft" style={{ animationDelay: "160ms" }} />
          <div className="rise mt-[var(--space-8)] flex flex-wrap items-center gap-[var(--space-4)]" style={{ animationDelay: "220ms" }}>
            <Link to={cta.href} data-testid="hero-tours" className="inline-flex items-center gap-[var(--space-2)] whitespace-nowrap bg-accent px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-90">
              <T k="hero.cta.label" />
              <Icon name="arrow" size={16} />
            </Link>
            <Link to={second.href} className="inline-flex items-center gap-[var(--space-2)] whitespace-nowrap border border-line px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent hover:text-accent">
              <T k="hero.second.label" />
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-[25rem]">
          <p className="text-[11px] uppercase tracking-[0.14em] text-ink-soft">{tilesLabel}</p>
          <ul className="mt-[var(--space-3)] grid grid-cols-3 gap-[var(--space-3)]">
            {places.map((p, i) => (
              <li key={p.id} data-record={`places:${p.id}`} className="rise" style={{ animationDelay: `${300 + i * 90}ms` }}>
                <Link to={`/tours?place=${p.id}`} className="group block">
                  <div className="aspect-[3/4] w-full overflow-hidden bg-surface">
                    <Picture src={p.image} alt={p.name} caption={p.name} className="h-full w-full object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:scale-[1.03]" />
                  </div>
                  <p className="mt-[var(--space-2)] border-t border-line pt-[var(--space-2)] text-[14px] text-ink group-hover:text-accent">{p.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Places() {
  const { items, loading } = useCollection<PlaceRow>("places", { pageSize: 6 });
  return (
    <section>
      <SectionHead label="home.places.label" heading="home.places.heading" sub="home.places.sub" />
      {loading ? (
        <p className="mt-[var(--space-8)] text-[14px] text-ink-soft">…</p>
      ) : (
        <Grid max={3} phone={2} className="mt-[var(--space-8)]">
          {items.map((p) => (
            <Link key={p.id} to={`/tours?place=${p.id}`} data-record={`places:${p.id}`} className="group block">
              <div className="aspect-[4/3] w-full overflow-hidden bg-surface">
                <Picture src={p.image} alt={p.name} caption={p.name} className="h-full w-full object-cover transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] group-hover:scale-[1.02]" />
              </div>
              <div className="mt-[var(--space-3)] border-t border-line pt-[var(--space-2)]">
                <h3 className="font-display text-[19px] text-ink group-hover:text-accent">{p.name}</h3>
                <p className="mt-[var(--space-1)] text-[13px] text-ink-soft">{p.note}</p>
              </div>
            </Link>
          ))}
        </Grid>
      )}
    </section>
  );
}

function LiveTours() {
  const { items, loading } = useCollection<TourRow>("tours", { where: { status: "approved" }, pageSize: 3 });
  const all = useContent("home.tours.all");
  return (
    <section>
      <SectionHead
        label="home.tours.label"
        heading="home.tours.heading"
        sub="home.tours.sub"
        aside={
          <Link to="/tours" data-testid="home-all-tours" className="inline-flex shrink-0 items-center gap-[var(--space-2)] whitespace-nowrap text-[14px] text-ink hover:text-accent">
            {all}
            <Icon name="arrow" size={16} />
          </Link>
        }
      />
      {loading ? (
        <p className="mt-[var(--space-8)] text-[14px] text-ink-soft">…</p>
      ) : (
        <Grid max={3} phone={1} className="mt-[var(--space-8)]">
          {items.map((t) => <TourCard key={t.id} tour={t} />)}
        </Grid>
      )}
    </section>
  );
}

function Gate() {
  const steps = useList<{ title: string; body: string }>("home.gate.steps");
  return (
    <section>
      <SectionHead label="home.gate.label" heading="home.gate.heading" />
      <ol className="mt-[var(--space-8)] flex flex-col">
        {steps.map((s, i) => (
          <li key={s.title} className="flex flex-col gap-[var(--space-2)] border-t border-line py-[var(--space-6)] lg:flex-row lg:gap-[var(--space-12)]">
            <span className="tabular shrink-0 text-[13px] text-accent lg:w-40">{String(i + 1).padStart(2, "0")}</span>
            <div className="lg:flex lg:w-full lg:gap-[var(--space-12)]">
              <T k={`home.gate.steps.${i}.title`} as="h3" className="font-display text-[22px] text-ink lg:w-[18rem] lg:shrink-0" />
              <T k={`home.gate.steps.${i}.body`} as="p" className="mt-[var(--space-2)] max-w-[52ch] text-[15px] leading-relaxed text-ink-soft lg:mt-0" />
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ForOperators() {
  const { items } = useCollection<TourRow>("tours", { where: { status: "approved" }, pageSize: 1 });
  const cta = useContent("home.supplier.cta");
  const cheapest = items[0];
  return (
    <section className="border-t border-line pt-[var(--space-6)]">
      <div className="flex flex-col gap-[var(--space-8)] lg:flex-row lg:gap-[var(--space-12)]">
        <T k="home.supplier.label" as="p" className="shrink-0 pt-1 text-[11px] uppercase tracking-[0.14em] text-ink-soft lg:w-40" />
        <div className="flex w-full flex-col gap-[var(--space-8)] lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[44ch]">
            <T k="home.supplier.heading" as="h2" className="text-[length:var(--size-h2)] text-ink" />
            <T k="home.supplier.body" as="p" className="mt-[var(--space-3)] text-[15px] leading-relaxed text-ink-soft" />
            <Link to="/supplier" data-testid="home-supplier" className="mt-[var(--space-6)] inline-flex items-center gap-[var(--space-2)] whitespace-nowrap bg-accent px-[var(--space-6)] py-[var(--space-3)] text-[14px] text-accent-ink transition-opacity duration-[var(--duration-fast)] hover:opacity-90">
              {cta}
              <Icon name="arrow" size={16} />
            </Link>
          </div>
          {cheapest && (
            <p className="tabular text-right text-[13px] text-ink-soft">
              <span className="block font-display text-[40px] leading-none text-ink">{formatPrice(cheapest.price, "JPY")}</span>
              <span className="mt-[var(--space-2)] block">{cheapest.name}</span>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
