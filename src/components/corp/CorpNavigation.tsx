import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/corp/Logo";
import { portfolio } from "@/data/group";

const CorpNavigation = () => {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const openRef = useRef(false);
  openRef.current = open;
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
    setHidden(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  // Slide away on scroll down, back on scroll up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const d = y - last;
      if (y < 80 || openRef.current) setHidden(false);
      else if (d > 6) setHidden(true);
      else if (d < -6) setHidden(false);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const on = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const link = (active: boolean) =>
    `relative px-3 py-2 text-sm font-semibold tracking-wide transition-colors after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:bg-gold after:transition-transform ${
      active ? "text-gold after:scale-x-100" : "text-white/85 hover:text-white after:scale-x-0 hover:after:scale-x-100"
    }`;
  const portfolioActive = portfolio.some((b) => b.link && pathname.startsWith(b.link));

  return (
    <header
      className={`corp fixed inset-x-0 top-0 z-50 border-b border-gold/40 bg-navy shadow-lg shadow-black/20 transition-transform duration-300 motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link to="/" aria-label="K Group Kenya home">
          <Logo tone="light" />
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          <Link to="/" className={link(on("/"))}>Home</Link>
          <Link to="/about" className={link(on("/about"))}>About</Link>

          <div className="group relative">
            <button type="button" aria-haspopup="true" className={`${link(portfolioActive)} flex items-center gap-1`}>
              Portfolio <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
            </button>
            <div className="invisible absolute left-1/2 top-full w-[30rem] -translate-x-1/2 pt-3 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
              <div className="grid grid-cols-2 gap-1 border border-gold/40 bg-navy p-3 shadow-2xl">
                {portfolio.map((b) =>
                  b.link ? (
                    <Link key={b.name} to={b.link} className="block px-3 py-2.5 outline-none hover:bg-white/10 focus:bg-white/10">
                      <span className="block text-sm font-semibold text-white">{b.name}</span>
                      <span className="block text-xs text-white/60">{b.category}</span>
                    </Link>
                  ) : (
                    <div key={b.name} className="px-3 py-2.5 opacity-70">
                      <span className="block text-sm font-semibold text-white">{b.name}</span>
                      <span className="block text-xs text-white/60">{b.category}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <Link to="/team" className={link(on("/team"))}>Leadership</Link>
          <Link to="/csr" className={link(on("/csr"))}>CSR</Link>
          <Link to="/contacts" className="corp-btn corp-btn-gold corp-btn-sm ml-3">
            Contact Us
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-gold/60 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/10 bg-navy lg:hidden">
          <div className="space-y-1 px-4 py-4">
            <Link to="/" className={`block ${link(on("/"))}`}>Home</Link>
            <Link to="/about" className={`block ${link(on("/about"))}`}>About</Link>
            <p className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gold">Portfolio</p>
            {portfolio.map((b) =>
              b.link ? (
                <Link key={b.name} to={b.link} className="block px-6 py-2 text-sm text-white/85 hover:text-white">{b.name}</Link>
              ) : (
                <span key={b.name} className="block px-6 py-2 text-sm text-white/50">{b.name}</span>
              )
            )}
            <div className="pt-2" />
            <Link to="/team" className={`block ${link(on("/team"))}`}>Leadership</Link>
            <Link to="/csr" className={`block ${link(on("/csr"))}`}>CSR</Link>
            <Link to="/contacts" className="corp-btn corp-btn-gold mt-3 w-full">Contact Us</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default CorpNavigation;
