import { T, useContent } from "../editable";
import { usePageMeta } from "../seo";
import { Picture } from "../picture";
import Icon from "../components/Icon";
import ContactForm from "../components/ContactForm";

/** The owner's own details, and a message form with a booking's questions. */
export default function Contact() {
  usePageMeta("pages.contact.title", "pages.contact.description");
  const email = useContent("contact.email");
  const emailLabel = useContent("pages.contact.emailLabel");

  return (
    <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
      <div className="border-b border-line pb-[var(--space-8)]">
        <T k="pages.contact.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
        <T k="pages.contact.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
        <T k="pages.contact.sub" as="p" className="mt-[var(--space-4)] max-w-[46ch] text-[16px] leading-relaxed text-ink-soft" />
      </div>

      <div className="mt-[var(--space-8)] flex flex-col gap-[var(--space-12)] lg:flex-row lg:gap-[var(--space-16)]">
        <div className="lg:w-3/5">
          <SectionHead narrow label="pages.contact.formLabel" heading="pages.contact.formHeading" />
          <ContactForm
            className="mt-[var(--space-6)] max-w-[30rem]"
            fields={[{ key: "date", type: "date" }, { key: "people", type: "number" }]}
          />
        </div>

        <aside className="lg:w-2/5">
          <p className="border-t border-line pt-[var(--space-4)] text-[11px] uppercase tracking-[0.14em] text-ink-soft">{emailLabel}</p>
          <a href={`mailto:${email}`} data-testid="contact-email" className="mt-[var(--space-3)] inline-flex items-center gap-[var(--space-2)] font-display text-[24px] text-ink hover:text-accent">
            <Icon name="mail" size={20} className="text-accent" />
            {email}
          </a>
          <div className="mt-[var(--space-8)] aspect-[4/3] w-full overflow-hidden bg-surface">
            <Picture src="/images/tokyo-sensoji.jpg" alt="Senso-ji in Asakusa, Tokyo" className="h-full w-full object-cover" />
          </div>
        </aside>
      </div>
    </div>
  );
}
