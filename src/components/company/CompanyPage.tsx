import { useEffect, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Facebook, Home, Instagram, Mail, MessageCircle, Phone, Youtube } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BookingForm from "@/components/BookingForm";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import type { CompanyConfig } from "@/data/companyPages";
import { subsidiaries } from "@/data/subsidiaries";

interface Props {
  config: CompanyConfig;
  /** Extra section shown after "about" (for example the live radio player). */
  extra?: ReactNode;
  /** Replaces the default enquiry form. */
  form?: ReactNode;
}

const intl = (phone: string) => `254${phone.replace(/\D/g, "").replace(/^0/, "")}`;
const TAPE = ["#ef0b0d", "#0d0c0c", "#cfcfcf", "#f8b4b5"];
const TILE = ["bg-brand-red text-white", "bg-brand-black text-white", "bg-white text-brand-red", "bg-red-100 text-brand-red"];
const PINS = ["#ef0b0d", "#0d0c0c", "#9ca3af"];
const TILTS = [-1.2, 0.9, -0.6, 1.1];
const socialIcon = { facebook: Facebook, instagram: Instagram, youtube: Youtube };

const Eyebrow = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <span className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] ${light ? "text-white/70" : "text-brand-red"}`}>
    <span className={`h-px w-8 ${light ? "bg-white/60" : "bg-brand-red"}`} /> {children}
  </span>
);

const CompanyPage = ({ config: c, extra, form }: Props) => {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ once: true, duration: 700, offset: 60, disable: reduce });
  }, []);

  const primary = c.phones[0];
  const ticker = [...c.services.map((s) => s.title), ...c.highlights];
  const marquee = (items: string[]) => [...items, ...items];
  const others = subsidiaries.filter((s) => s.slug !== c.slug).slice(0, 4);
  const hasPhotos = c.images.length > 0 && !c.hideGallery;
  const Logo = ({ className }: { className: string }) =>
    c.logo ? (
      <img src={c.logo} alt={`${c.name} logo`} className={`${className} object-contain`} />
    ) : (
      <span className={`${className} flex items-center justify-center text-center font-extrabold leading-none text-brand-black`}>{c.name}</span>
    );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeProvider>
        <Navigation variant="company" />
      </ThemeProvider>

      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-black text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0506] via-brand-black to-brand-black" />
        <div className="absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-brand-red/30 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 pb-20 pt-32 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div>
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
                <li><Link to="/" className="inline-flex items-center gap-1 text-white/80 hover:text-white"><Home className="h-3.5 w-3.5" aria-hidden="true" /> Home</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-white/50" /></li>
                <li className="text-white/80">Our Companies</li>
                <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-white/50" /></li>
                <li aria-current="page">{c.name}</li>
              </ol>
            </nav>
            {c.heroEyebrow && <div className="mb-3"><Eyebrow light>{c.heroEyebrow}</Eyebrow></div>}
            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" data-aos="fade-up">
              {c.headline ? <>{c.headline.before} <span className="text-brand-red">{c.headline.accent}</span></> : c.name}
            </h1>
            {!c.headline && <p className="mt-3 text-xl font-semibold text-brand-red sm:text-2xl" data-aos="fade-up" data-aos-delay="80">{c.tagline}</p>}
            <p className="mt-5 max-w-xl text-base text-white/80 md:text-lg" data-aos="fade-up" data-aos-delay="160">{c.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="240">
              <a href={c.ctaHref ?? "#enquire"} className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-bold shadow-lg shadow-brand-red/30 transition-colors hover:bg-white hover:text-brand-black">
                {c.ctaLabel} <ArrowUpRight className="h-4 w-4" />
              </a>
              <a href={`https://wa.me/${intl(primary)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/50 px-6 py-3 font-bold transition-colors hover:bg-white/10">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-xl" data-aos="zoom-in" data-aos-delay="150">
            {c.images.length > 0 ? (
              <div className="relative overflow-hidden rounded-3xl border border-white/15 shadow-2xl shadow-black/60">
                <img src={c.heroImage ?? c.images[0]} alt="" className="aspect-[4/3] w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-full bg-black/60 py-2 pl-2 pr-5 backdrop-blur">
                  <Logo className="h-12 w-12 rounded-full border-2 border-brand-red bg-white text-[9px]" />
                  <span className="text-sm font-bold">{c.name}</span>
                </div>
              </div>
            ) : (
              <div className="flex aspect-square max-w-sm items-center justify-center rounded-full border-2 border-dashed border-white/20 p-6 mx-auto">
                <Logo className="h-full w-full rounded-full bg-white text-2xl" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="overflow-hidden bg-brand-red py-3 text-white" aria-hidden="true">
        <div className="kg-pause">
          <ul className="kg-scroll flex w-max gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-widest" style={{ ["--kg-speed" as string]: "35s" }}>
            {marquee(ticker).map((t, i) => (
              <li key={i} className="flex items-center gap-10">{t}<span className="h-1.5 w-1.5 rounded-full bg-white/60" /></li>
            ))}
          </ul>
        </div>
      </div>

      <main>
        {/* ABOUT */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div data-aos="fade-right">
              <Eyebrow>{c.aboutEyebrow ?? `About ${c.name}`}</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">{c.aboutHeading ?? c.servicesTitle}</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">{c.about}</p>
              {c.aboutExtra && <p className="mt-4 leading-relaxed text-muted-foreground">{c.aboutExtra}</p>}
              <ul className={`mt-6 grid gap-3 sm:grid-cols-2 ${c.highlights.length ? "" : "hidden"}`}>
                {c.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm font-semibold">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-red text-white"><Check className="h-3 w-3" aria-hidden="true" /></span>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div data-aos="fade-left">
              {c.images.length >= 4 ? (
                <div className="grid grid-cols-2 gap-3">
                  <img src={c.images[2]} alt="" loading="lazy" className="h-64 w-full rounded-2xl object-cover" />
                  <img src={c.images[3]} alt="" loading="lazy" className="mt-8 h-64 w-full rounded-2xl object-cover" />
                </div>
              ) : (
                <div className="flex items-center justify-center rounded-3xl bg-muted p-10">
                  <Logo className="h-56 w-56 rounded-full border-4 border-brand-red bg-white text-3xl shadow-xl" />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="collections" className="scroll-mt-20 bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>{c.servicesIntro ? "Explore " + c.name : "What we do"}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">{c.servicesHeading ?? "Our services"}</h2>
            {c.servicesIntro && <p className="mt-3 max-w-2xl text-muted-foreground">{c.servicesIntro}</p>}
            <div className={`mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 ${c.services.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
              {c.services.map((s, i) => (
                <div key={s.title} data-aos="fade-up" data-aos-delay={(i % 4) * 80}>
                <article
                  style={{ ["--tilt" as string]: `${TILTS[i % TILTS.length]}deg` }}
                  className="group relative rounded-3xl border-2 border-brand-black bg-white p-6 pt-8 text-brand-black shadow-[6px_6px_0_#0d0c0c] transition-all duration-300 [transform:rotate(var(--tilt))] hover:[transform:rotate(0deg)_translateY(-6px)] hover:shadow-[10px_10px_0_#0d0c0c] dark:shadow-[6px_6px_0_#ef0b0d] dark:hover:shadow-[10px_10px_0_#ef0b0d]"
                >
                  <span
                    className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 opacity-90"
                    style={{ background: TAPE[i % TAPE.length], clipPath: "polygon(2% 0, 98% 8%, 100% 92%, 0 100%)" }}
                    aria-hidden="true"
                  />
                  <span className="absolute right-5 top-6 rounded-full bg-neutral-100 px-3 py-1 font-mono text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                  {s.image ? (
                    <img src={s.image} alt={s.title} loading="lazy" className="h-44 w-full rounded-2xl border-2 border-brand-black object-cover" />
                  ) : (
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-brand-black transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${TILE[i % TILE.length]}`}
                    >
                      <s.icon className="h-7 w-7" aria-hidden="true" />
                    </span>
                  )}
                  <h3 className={`${s.image ? "mt-4" : "mt-6"} text-xl font-extrabold leading-tight`}>{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{s.text}</p>
                  <a href="#enquire" className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-extrabold uppercase tracking-wider text-brand-red">
                    Enquire <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </article>
                </div>
              ))}
            </div>
          </div>
        </section>

        {extra}

        {/* WHY */}
        {c.why && (
          <section className="bg-brand-black px-4 py-20 text-white sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <Eyebrow light>{c.why.title}</Eyebrow>
              <div className="mt-14 grid gap-x-6 gap-y-12 md:grid-cols-3">
                {c.why.items.map((w, i) => (
                  <div key={w} data-aos="fade-up" data-aos-delay={i * 100}>
                  <div
                    style={{ ["--tilt" as string]: `${TILTS[(i + 1) % TILTS.length]}deg` }}
                    className="relative min-h-[11rem] rounded-sm bg-white p-7 pt-9 text-brand-black shadow-xl transition-transform duration-300 [transform:rotate(var(--tilt))] hover:[transform:rotate(0deg)_translateY(-6px)]"
                  >
                    <span
                      className="absolute -top-3 left-1/2 h-6 w-6 -translate-x-1/2 rounded-full border-2 border-black/30 shadow-md"
                      style={{ background: PINS[i % PINS.length] }}
                      aria-hidden="true"
                    />
                    <span className="inline-block rounded-sm border-2 border-brand-black bg-red-100 px-2 py-0.5 font-mono text-[11px] font-extrabold uppercase tracking-widest">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {w.includes("::") ? (
                      <>
                        <p className="mt-4 text-2xl font-extrabold leading-snug">{w.split("::")[0]}</p>
                        <p className="mt-2 text-sm text-neutral-600">{w.split("::")[1]}</p>
                      </>
                    ) : (
                      <p className="mt-4 text-2xl font-extrabold leading-snug">{w}</p>
                    )}
                  </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* GALLERY */}
        {hasPhotos && (
          <section className="overflow-hidden py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Eyebrow>Gallery</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">See us in action</h2>
              <p className="mt-2 text-sm text-muted-foreground">Hover to pause, click a photo to enlarge.</p>
            </div>
            <div
              className="kg-pause mt-10"
              style={{ maskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 6%, #000 94%, transparent)" }}
            >
              <ul className="kg-scroll flex w-max gap-4" style={{ ["--kg-speed" as string]: `${Math.max(30, c.images.length * 6)}s` }}>
                {[...c.images, ...c.images, ...(c.images.length < 6 ? [...c.images, ...c.images] : [])].map((src, i) => (
                  <li key={i} className="shrink-0">
                    <button type="button" onClick={() => setLightbox(src)} aria-label="Enlarge photo" className="block overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red">
                      <img src={src} alt="" loading="lazy" className="h-64 w-auto max-w-none object-cover transition-transform duration-300 hover:scale-105 md:h-72" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* ENQUIRE */}
        <section id="enquire" className="scroll-mt-20 bg-gradient-to-br from-brand-red to-[#b00608] px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow light>{c.contactEyebrow ?? "Get in touch"}</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">{c.ctaTitle}</h2>
              <p className="mt-4 max-w-md text-white/90">{c.ctaText}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {c.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\D/g, "")}`} className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-bold text-brand-black transition-colors hover:bg-brand-black hover:text-white">
                    <Phone className="h-4 w-4 text-brand-red" /> {p}
                  </a>
                ))}
                <a href={`https://wa.me/${intl(primary)}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border-2 border-white px-5 py-3 font-bold transition-colors hover:bg-white hover:text-brand-red">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
              {c.email && (
                <a href={`mailto:${c.email}`} className="mt-4 inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline">
                  <Mail className="h-4 w-4" /> {c.email}
                </a>
              )}
              {c.socials.length > 0 && (
                <div className="mt-6 flex gap-3">
                  {c.socials.map((s) => {
                    const Icon = socialIcon[s.kind];
                    return (
                      <a key={s.kind} href={s.url} target="_blank" rel="noopener noreferrer" aria-label={`${c.name} on ${s.kind}`} className="rounded-full bg-white/15 p-3 transition-colors hover:bg-white hover:text-brand-red">
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            <div>{form ?? <BookingForm companyEnquire={c.name} />}</div>
          </div>
        </section>

        {/* MORE COMPANIES */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold md:text-3xl">More from K-GROUP KENYA</h2>
              <Link to="/#companies" className="hidden items-center gap-1 border-b border-brand-red pb-0.5 text-sm font-bold text-brand-red sm:inline-flex">
                All companies <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((s) => (
                <Link key={s.slug} to={s.link} className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-brand-red hover:shadow-lg">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-white text-[10px] font-extrabold text-brand-black">
                    {s.logo ? <img src={s.logo} alt="" className="h-full w-full object-contain" /> : "COVNT."}
                  </span>
                  <span>
                    <span className="block font-bold group-hover:text-brand-red">{s.name}</span>
                    <span className="block text-xs text-muted-foreground">{s.tagline}</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{c.name} photo</DialogTitle>
          {lightbox && <img src={lightbox} alt={`${c.name}, enlarged`} className="max-h-[85vh] w-full rounded-2xl object-contain" />}
        </DialogContent>
      </Dialog>

      <Footer variant="company" />
    </div>
  );
};

export default CompanyPage;
