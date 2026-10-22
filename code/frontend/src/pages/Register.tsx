import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { T, useContent } from "../editable";
import { usePageMeta } from "../seo";
import { signIn } from "../lib/session";
import { Picture } from "../picture";
import Icon from "../components/Icon";

/** Create an account: one form, two kinds of person. */
export default function Register() {
  usePageMeta("pages.register.title", "pages.register.description");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("traveller");
  const submit = useContent("pages.register.submit");
  const signin = useContent("pages.register.signin");
  const traveller = useContent("pages.register.roleTraveller");
  const supplier = useContent("pages.register.roleSupplier");
  const field = "w-full border border-field bg-ground px-[var(--space-4)] py-[var(--space-3)] text-[15px] text-ink";

  return (
    <div className="mx-auto flex max-w-page flex-col gap-[var(--space-12)] px-[var(--gutter)] py-[var(--space-12)] lg:flex-row lg:gap-[var(--space-16)]">
      <div className="lg:w-1/2">
        <T k="pages.register.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
        <T k="pages.register.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
        <T k="pages.register.sub" as="p" className="mt-[var(--space-4)] max-w-[44ch] text-[16px] leading-relaxed text-ink-soft" />

        <form
          className="mt-[var(--space-8)] flex max-w-[26rem] flex-col gap-[var(--space-4)] border-t border-line pt-[var(--space-6)]"
          onSubmit={(e) => { e.preventDefault(); signIn(email || "ana.ruiz@example.com", name || undefined); navigate(role === "supplier" ? "/supplier" : "/account"); }}
        >
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.register.name" />
            <input id="name" name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
          </label>
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.register.email" />
            <input id="register-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          </label>
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.register.password" />
            <input id="register-password" name="password" type="password" autoComplete="new-password" className={field} />
          </label>
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.register.role" />
            <select id="role" name="role" value={role} onChange={(e) => setRole(e.target.value)} className={field}>
              <option value="traveller">{traveller}</option>
              <option value="supplier">{supplier}</option>
            </select>
          </label>
          <button type="submit" data-testid="register-submit" className="mt-[var(--space-2)] inline-flex items-center gap-[var(--space-2)] self-start whitespace-nowrap bg-accent px-[var(--space-8)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90">
            {submit}
            <Icon name="arrow" size={16} />
          </button>
          <p className="text-[14px] text-ink-soft">
            <T k="pages.register.haveAccount" />{" "}
            <Link to="/signin" data-testid="register-signin" className="text-accent hover:underline">{signin}</Link>
          </p>
        </form>
      </div>

      <div className="lg:w-1/2">
        <div className="aspect-[4/5] w-full overflow-hidden bg-surface">
          <Picture src="/images/nara-deer.jpg" alt="Sika deer in the park at Nara" loading="eager" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
