import { useEffect, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { T, useList, useContent } from "./editable";
import { useSession, signOut } from "./lib/session";
import Home from "./pages/Home";
import Tours from "./pages/Tours";
import Tour from "./pages/Tour";
import Gallery from "./pages/Gallery";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";
import BookingDone from "./pages/BookingDone";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Supplier from "./pages/Supplier";
import SupplierNew from "./pages/SupplierNew";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import Logo from "./components/Logo";
import Icon from "./components/Icon";
import MenuToggle from "./components/MenuToggle";
import MobileMenu from "./components/MobileMenu";
import ContactDock from "./components/ContactDock";
import PhotoCredits from "./components/PhotoCredits";
import { PageViews } from "./site";

type NavLink = { label: string; href: string };
type Column = { heading: string; links: NavLink[] };

export default function App() {
  return (
    <div className="min-h-screen bg-ground text-ink font-body antialiased">
      <PageViews />
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/tours/:id" element={<Tour />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/book/:id" element={<Book />} />
          <Route path="/checkout/:id" element={<Checkout />} />
          <Route path="/booking/:id" element={<BookingDone />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/supplier/new" element={<SupplierNew />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <ContactDock />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Header() {
  const links = useList<NavLink>("nav.links");
  const name = useContent("site.name");
  const openLabel = useContent("nav.menu.open");
  const accountLabel = useContent("nav.account");
  const [open, setOpen] = useState(false);
  const session = useSession();
  const { pathname } = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  const testid = (href: string) => `nav-${href.replace(/\//g, "") || "home"}`;
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ground/95 backdrop-blur-[2px]">
      <div className="mx-auto flex h-[var(--header-h)] max-w-page items-center justify-between px-[var(--gutter)]">
        <Link to="/" aria-label={name}><Logo /></Link>
        <nav className="hidden items-center gap-[var(--space-8)] text-[14px] lg:flex">
          {links.map((l, i) => (
            <Link key={l.href} to={l.href} data-testid={testid(l.href)} className="text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-ink">
              <T k={`nav.links.${i}.label`} />
            </Link>
          ))}
          {session ? (
            <Link to="/account" aria-label={accountLabel} data-testid="nav-account" className="flex h-10 w-10 items-center justify-center text-ink-soft transition-colors duration-[var(--duration-fast)] hover:text-ink">
              <Icon name="account" label={accountLabel} />
            </Link>
          ) : (
            <Link to="/signin" data-testid="nav-signin" className="border border-line px-[var(--space-4)] py-[var(--space-2)] text-ink transition-colors duration-[var(--duration-fast)] hover:border-accent hover:text-accent">
              <T k="nav.cta.label" />
            </Link>
          )}
        </nav>
        <div className="flex items-center gap-[var(--space-1)] lg:hidden">
          {session && (
            <Link to="/account" aria-label={accountLabel} className="flex h-10 w-10 items-center justify-center text-ink-soft">
              <Icon name="account" label={accountLabel} />
            </Link>
          )}
          <MenuToggle open={open} onToggle={() => setOpen((o) => !o)} />
        </div>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)}>
        {links.map((l, i) => (
          <Link key={l.href} to={l.href} onClick={() => setOpen(false)} className="font-display text-[28px] text-ink">
            <T k={`nav.links.${i}.label`} />
          </Link>
        ))}
        <Link to={session ? "/account" : "/signin"} onClick={() => setOpen(false)} className="font-display text-[28px] text-accent">
          <T k={session ? "nav.account" : "nav.cta.label"} />
        </Link>
        <span className="sr-only">{openLabel}</span>
      </MobileMenu>
    </header>
  );
}

function Footer() {
  const columns = useList<Column>("footer.columns");
  const email = useContent("contact.email");
  const session = useSession();
  return (
    <footer className="mt-[var(--space-16)] border-t border-line pb-[var(--dock-space)] lg:pb-[var(--space-12)]">
      <div className="mx-auto max-w-page px-[var(--gutter)] py-[var(--space-12)]">
        <div className="flex flex-col gap-[var(--space-12)] lg:flex-row lg:justify-between">
          <div className="max-w-[30ch]">
            <Logo />
            <T k="footer.tagline" as="p" className="mt-[var(--space-4)] text-[14px] leading-relaxed text-ink-soft" />
            {email && (
              <a href={`mailto:${email}`} className="mt-[var(--space-4)] inline-flex items-center gap-[var(--space-2)] text-[14px] text-ink hover:text-accent">
                <Icon name="mail" size={16} />
                {email}
              </a>
            )}
          </div>
          <div className="flex flex-wrap gap-[var(--space-12)]">
            {columns.map((col, c) => (
              <nav key={col.heading} className="min-w-[9rem]">
                <T k={`footer.columns.${c}.heading`} as="p" className="text-[11px] uppercase tracking-[0.14em] text-ink-soft" />
                <ul className="mt-[var(--space-4)] flex flex-col gap-[var(--space-2)] text-[14px]">
                  {col.links.map((l, i) => (
                    <li key={l.href}>
                      <Link to={l.href} className="text-ink transition-colors duration-[var(--duration-fast)] hover:text-accent">
                        <T k={`footer.columns.${c}.links.${i}.label`} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-[var(--space-12)] flex flex-col gap-[var(--space-2)] border-t border-line pt-[var(--space-6)] text-[12px] text-ink-soft">
          <T k="footer.line" />
          <PhotoCredits />
          {session && (
            <button type="button" onClick={signOut} className="self-start text-[12px] text-ink-soft underline-offset-4 hover:text-ink hover:underline">
              <T k="pages.account.signout" />
            </button>
          )}
        </div>
      </div>
    </footer>
  );
}
