import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { T, useContent } from "../editable";
import { usePageMeta } from "../seo";
import { signIn } from "../lib/session";
import { Picture } from "../picture";
import Icon from "../components/Icon";

/** Sign in: travellers, operators and the Tabimarket team. */
export default function SignIn() {
  usePageMeta("pages.signin.title", "pages.signin.description");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const submit = useContent("pages.signin.submit");
  const register = useContent("pages.signin.register");
  const field = "w-full border border-field bg-ground px-[var(--space-4)] py-[var(--space-3)] text-[15px] text-ink";

  return (
    <div className="mx-auto flex max-w-page flex-col gap-[var(--space-12)] px-[var(--gutter)] py-[var(--space-12)] lg:flex-row lg:gap-[var(--space-16)]">
      <div className="lg:w-1/2">
        <T k="pages.signin.label" as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
        <T k="pages.signin.heading" as="h1" className="mt-[var(--space-3)] text-[length:var(--size-h1)] text-ink" />
        <T k="pages.signin.sub" as="p" className="mt-[var(--space-4)] max-w-[44ch] text-[16px] leading-relaxed text-ink-soft" />

        <form
          className="mt-[var(--space-8)] flex max-w-[26rem] flex-col gap-[var(--space-4)] border-t border-line pt-[var(--space-6)]"
          onSubmit={(e) => { e.preventDefault(); signIn(email || "ana.ruiz@example.com"); navigate("/account"); }}
        >
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.signin.email" />
            <input id="email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={field} />
          </label>
          <label className="flex flex-col gap-[var(--space-2)] text-[13px] text-ink-soft">
            <T k="pages.signin.password" />
            <input id="password" name="password" type="password" autoComplete="current-password" className={field} />
          </label>
          <button type="submit" data-testid="signin-submit" className="mt-[var(--space-2)] inline-flex items-center gap-[var(--space-2)] self-start whitespace-nowrap bg-accent px-[var(--space-8)] py-[var(--space-3)] text-[14px] text-accent-ink hover:opacity-90">
            {submit}
            <Icon name="arrow" size={16} />
          </button>
          <T k="pages.signin.demo" as="p" className="text-[13px] text-ink-soft" />
          <p className="text-[14px] text-ink-soft">
            <T k="pages.signin.noAccount" />{" "}
            <Link to="/register" data-testid="signin-register" className="text-accent hover:underline">{register}</Link>
          </p>
        </form>
      </div>

      <div className="lg:w-1/2">
        <div className="aspect-[4/5] w-full overflow-hidden bg-surface">
          <Picture src="/images/kyoto-torii.jpg" alt="The gate path at Fushimi Inari, Kyoto" loading="eager" className="h-full w-full object-cover" />
        </div>
      </div>
    </div>
  );
}
