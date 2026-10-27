import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Sun, Moon, Phone } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { subsidiaries, GROUP_PHONE, GROUP_PHONE_INTL } from "@/data/subsidiaries";

const CompanyNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const [hidden, setHidden] = useState(false);
  const menuOpenRef = useRef(false);
  menuOpenRef.current = isMenuOpen;

  useEffect(() => {
    setIsMenuOpen(false);
    setHidden(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Slide away when scrolling down, come back when scrolling up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80 || menuOpenRef.current) {
        setHidden(false);
      } else if (delta > 6) {
        setHidden(true);
      } else if (delta < -6) {
        setHidden(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);
  const companiesActive = subsidiaries.some((s) => location.pathname.startsWith(s.link));

  const pill = (active: boolean) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
      active ? "bg-foreground text-background" : "text-foreground hover:bg-foreground/10"
    }`;

  const ring = "border-2 border-foreground shadow-[0_5px_0_0_hsl(var(--foreground))]";

  return (
    <nav
      className={`fixed top-2 left-0 right-0 z-50 px-3 sm:px-5 transition-all duration-300 ease-out motion-reduce:transition-none ${
        hidden ? "-translate-y-[150%] opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
      aria-label="Main navigation"
    >
      <div className={`mx-auto max-w-7xl rounded-[2rem] bg-background ${ring}`}>
        <div className="flex h-14 items-center justify-between gap-4 pl-4 pr-2">
          <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="K-GROUP KENYA home">
            <img
              src="/COMPANY LOGOS/K-GROUP.jpg"
              alt=""
              className="h-9 w-9 rounded-full border-2 border-brand-red bg-white object-contain"
            />
            <span className="leading-none">
              <span className="block text-base font-extrabold tracking-wide text-foreground">K-GROUP KENYA</span>
              <span className="block mt-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-red">Empowering Industries</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/" className={pill(isActive("/"))}>Home</Link>
            <Link to="/about" className={pill(isActive("/about"))}>About</Link>

            <div className="relative group">
              <button type="button" aria-haspopup="true" className={`${pill(companiesActive)} flex items-center gap-1`}>
                Our Companies
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
              </button>
              <div className="invisible absolute left-1/2 top-full w-[34rem] -translate-x-1/2 pt-4 opacity-0 transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className={`grid grid-cols-2 gap-1 rounded-3xl bg-background p-3 ${ring}`}>
                  {subsidiaries.map((s) => (
                    <Link
                      key={s.slug}
                      to={s.link}
                      className="flex items-start gap-3 rounded-2xl p-3 outline-none hover:bg-muted focus:bg-muted"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white text-[10px] font-extrabold text-brand-black">
                        {s.logo ? <img src={s.logo} alt="" className="h-full w-full object-contain" /> : "COVNT."}
                      </span>
                      <span>
                        <span className="block text-sm font-bold text-foreground">{s.name}</span>
                        <span className="block text-xs text-muted-foreground">{s.tagline}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/team" className={pill(isActive("/team"))}>Team</Link>
            <Link to="/csr" className={pill(isActive("/csr"))}>CSR</Link>
            <Link to="/contacts" className={pill(isActive("/contacts"))}>Contacts</Link>
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground text-foreground hover:bg-foreground/10"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <a
              href={`tel:+${GROUP_PHONE_INTL}`}
              className="flex h-10 items-center gap-2 rounded-full border-2 border-foreground bg-brand-red px-4 text-sm font-bold text-white hover:bg-foreground hover:text-background transition-colors"
            >
              <Phone className="h-4 w-4" /> Get in Touch
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground text-foreground"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-foreground text-background"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className={`mx-auto mt-3 max-w-7xl max-h-[calc(100vh-6rem)] overflow-y-auto rounded-3xl bg-background p-3 lg:hidden ${ring}`}>
          <div className="space-y-1">
            <Link to="/" className={`block ${pill(isActive("/"))}`}>Home</Link>
            <Link to="/about" className={`block ${pill(isActive("/about"))}`}>About</Link>
            <p className="px-4 pt-3 pb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Our Companies</p>
            {subsidiaries.map((s) => (
              <Link
                key={s.slug}
                to={s.link}
                className={`block rounded-full py-2 pl-7 pr-4 text-sm ${
                  location.pathname.startsWith(s.link) ? "bg-brand-red font-semibold text-white" : "text-foreground hover:bg-foreground/10"
                }`}
              >
                {s.name}
              </Link>
            ))}
            <div className="pt-2" />
            <Link to="/team" className={`block ${pill(isActive("/team"))}`}>Team</Link>
            <Link to="/csr" className={`block ${pill(isActive("/csr"))}`}>CSR</Link>
            <Link to="/contacts" className={`block ${pill(isActive("/contacts"))}`}>Contacts</Link>
            <a
              href={`tel:+${GROUP_PHONE_INTL}`}
              className="mt-2 flex items-center justify-center gap-2 rounded-full border-2 border-foreground bg-brand-red px-4 py-3 text-sm font-bold text-white"
            >
              <Phone className="h-4 w-4" /> Call {GROUP_PHONE}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default CompanyNavigation;
