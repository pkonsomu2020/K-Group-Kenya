import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { KMark } from "@/components/corp/Logo";
import { GROUP, about, growth, portfolio, values } from "@/data/group";
import { GROUP_PHONE, GROUP_PHONE_INTL } from "@/data/subsidiaries";

const Eyebrow = ({ children, light = false }: { children: string; light?: boolean }) => (
  <span className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] ${light ? "text-gold" : "text-gold-deep"}`}>
    <span className="h-px w-10 bg-gold" /> {children}
  </span>
);

const Home = () => {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ once: true, duration: 700, offset: 60, disable: reduce });
  }, []);

  return (
    <div className="corp min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-[#13294B]" />
        <div className="absolute -right-32 top-1/4 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <KMark className="pointer-events-none absolute -right-16 top-10 hidden h-[110%] w-auto opacity-[0.07] lg:block" arc="#F8F9FB" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-24 pt-36 sm:px-6 lg:px-8 lg:pb-32 lg:pt-44">
          <Eyebrow light>{GROUP.name}</Eyebrow>
          <h1 className="mt-6 max-w-4xl font-heading text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl" data-aos="fade-up">
            Building Businesses.<br />
            Transforming Lives.<br />
            <span className="text-gold">Shaping Generations.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg" data-aos="fade-up" data-aos-delay="100">
            {GROUP.descriptor} We build and develop enterprises that combine commercial discipline with integrity, service and lasting impact.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="200">
            <a href="#portfolio" className="corp-btn corp-btn-gold">Explore our portfolio</a>
            <Link to="/contacts" className="corp-btn corp-btn-outline">Contact us</Link>
          </div>
        </div>
        <div className="relative z-10 border-t border-white/10 bg-black/20">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white/70 sm:px-6 lg:px-8">
            {GROUP.pillars.map((p) => <span key={p}>{p}</span>)}
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          <div data-aos="fade-right">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-navy md:text-4xl">{GROUP.statement}</h2>
            <div className="mt-6 h-1 w-16 bg-gold" />
          </div>
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground" data-aos="fade-left">
            <p>{about.intro}</p>
            <p>{about.identity}</p>
            <Link to="/about" className="inline-flex items-center gap-2 border-b-2 border-gold pb-1 text-sm font-bold text-navy">
              About K Group Kenya <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* VISION & MISSION */}
      <section className="bg-navy px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-px bg-white/15 md:grid-cols-3">
          {[
            ["Vision", about.vision],
            ["Mission", about.mission],
            ["Purpose", about.purpose],
          ].map(([title, text], i) => (
            <div key={title} className="bg-navy p-8 lg:p-10" data-aos="fade-up" data-aos-delay={i * 100}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{title}</span>
              <p className="mt-4 text-sm leading-relaxed text-white/80">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div id="companies" className="mx-auto max-w-7xl">
          <Eyebrow>Our portfolio</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold leading-tight text-navy md:text-4xl">
            Brands built to create value for customers and communities.
          </h2>
          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {portfolio.map((b, i) => {
              const inner = (
                <>
                  <span className="font-heading text-xs font-bold tracking-[0.3em] text-gold-deep">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-6 font-heading text-xl font-bold text-navy">{b.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.category}</p>
                  {b.tagline && <p className="mt-4 text-sm italic text-navy/70">&ldquo;{b.tagline}&rdquo;</p>}
                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-navy">
                    {b.link ? (
                      <>View brand <ArrowRight className="h-4 w-4 text-gold-deep transition-transform group-hover:translate-x-1" /></>
                    ) : (
                      <span className="text-muted-foreground">Profile coming soon</span>
                    )}
                  </span>
                </>
              );
              const cls = "group relative flex h-full flex-col bg-card p-7 transition-colors";
              return (
                <div key={b.name} data-aos="fade-up" data-aos-delay={(i % 4) * 70} className="bg-card">
                  {b.link ? (
                    <Link to={b.link} className={`${cls} hover:bg-ivory`}>
                      <span className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-300 group-hover:scale-x-100" />
                      {inner}
                    </Link>
                  ) : (
                    <div className={cls}>{inner}</div>
                  )}
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Each brand operates with its own offer and customers. Legal forms and ownership are confirmed separately for each business.
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>What guides us</Eyebrow>
          <h2 className="mt-4 font-heading text-3xl font-bold text-navy md:text-4xl">Our core values</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div key={v.name} className="border-t-2 border-gold bg-card p-6 shadow-sm" data-aos="fade-up" data-aos-delay={(i % 4) * 70}>
                <v.icon className="h-8 w-8 text-forest" aria-hidden="true" />
                <h3 className="mt-5 font-heading text-base font-bold leading-snug text-navy">{v.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-gold-deep">{v.line}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GROWTH */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>Growth direction</Eyebrow>
          <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold leading-tight text-navy md:text-4xl">
            Disciplined growth, from Kenya to Africa and beyond.
          </h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-5">
            {growth.map((g, i) => (
              <li key={g.step} className="relative border-t-2 border-navy pt-5" data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="absolute -top-[7px] left-0 h-3 w-3 bg-gold" aria-hidden="true" />
                <span className="font-heading text-xs font-bold tracking-[0.3em] text-gold-deep">{g.step}</span>
                <h3 className="mt-2 font-heading text-base font-bold text-navy">{g.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{g.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-navy px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-heading text-2xl font-bold md:text-3xl">Let's talk about building something lasting.</h2>
            <p className="mt-2 max-w-xl text-white/70">For partnerships, enquiries about our brands, or to find the right team, get in touch.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:+${GROUP_PHONE_INTL}`} className="corp-btn corp-btn-gold">Call {GROUP_PHONE}</a>
            <a href={`mailto:${GROUP.email}`} className="corp-btn corp-btn-outline">Email us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
