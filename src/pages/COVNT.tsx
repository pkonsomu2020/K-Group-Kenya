import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown, Menu, X, MessageCircle, Phone } from "lucide-react";
import { GROUP_PHONE, GROUP_PHONE_INTL } from "@/data/subsidiaries";

// Illustrative imagery. Replace with approved COVNT. photography before launch.
const img = (id: string, w = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMAGES = {
  hero: img("1515886657613-9f3515b0c78f", 1600),
  heroCard: img("1617137968427-85924c800a22", 900),
  intro: img("1483985988355-763728e1935b", 1100),
  corporate: img("1521572163474-6864f9cf17ab", 1100),
};

const collections = [
  { no: "01", tag: "Everyday", title: "Everyday Essentials", image: img("1618354691373-d851c5c3a990", 900), alt: "Minimal neutral everyday clothing" },
  { no: "02", tag: "Refined", title: "Smart-Casual", image: img("1617137968427-85924c800a22", 900), alt: "Smart casual menswear styling" },
  { no: "03", tag: "Expression", title: "Purpose Pieces", image: img("1551488831-00ddcb6c6bd3", 900), alt: "Apparel arranged for a clothing collection" },
];

const values = [
  ["Faith", "Grounded in Christ-centred values."],
  ["Integrity", "Choosing honesty and consistency."],
  ["Excellence", "Caring about the details and the craft."],
  ["Authenticity", "Encouraging people to show up as themselves."],
  ["Community", "Building connection through shared purpose."],
];

const corporateList = [
  "Corporate and team apparel",
  "Event and group merchandise",
  "Custom branding and garment enquiries",
  "Bulk order requests",
];

const steps = [
  ["Share your brief", "Tell us the occasion, garment type, quantity and branding needs."],
  ["Discuss the options", "We can review suitable directions, specifications and a quotation."],
  ["Confirm the details", "Orders proceed after product, pricing, timing and approvals are agreed."],
];

const enquiryTypes = [
  "Product availability",
  "Everyday Essentials",
  "Smart-Casual",
  "Purpose Pieces",
  "Corporate & Custom Apparel",
  "Bulk order",
  "Other",
];

const navLinks = [
  ["home", "Home"],
  ["collections", "Collections"],
  ["story", "Our Story"],
  ["corporate", "Corporate & Custom"],
] as const;

/** Fades content in as it scrolls into view. */
const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("cv-in");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`cv-reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const Eyebrow = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <span className={`inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.19em] ${light ? "text-[var(--cv-gold-light)]" : "text-[var(--cv-black)]"}`}>
    <span className="h-px w-6 bg-[var(--cv-gold)]" /> {children}
  </span>
);

const Wordmark = ({ light = false }: { light?: boolean }) => (
  <span className={`text-2xl font-extrabold tracking-[0.13em] ${light ? "text-[var(--cv-pearl)]" : "text-[var(--cv-black)]"}`}>
    COVNT<span className="text-[var(--cv-gold)]">.</span>
  </span>
);

const COVNT = () => {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [interest, setInterest] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
    document.title = "COVNT. | Wear Your Purpose";
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // highlight the nav link for the section in view
  useEffect(() => {
    const ids = ["home", "collections", "story", "corporate", "contact"];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const enquire = (type: string) => {
    setInterest(type);
    setMenu(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const [firstName, ...rest] = String(f.get("name")).trim().split(/\s+/);
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" ") || "-",
          email: f.get("email"),
          phone: f.get("phone") || "Not provided",
          companyEnquire: `COVNT. - ${f.get("type")}`.slice(0, 100),
          additionalDetails: f.get("message"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStatus("sent");
      form.reset();
      setInterest("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const link = (id: string) =>
    `text-[11px] font-bold tracking-[0.08em] transition-colors ${active === id ? "text-[#8d713d]" : "text-[var(--cv-black)] hover:text-[#8d713d]"}`;

  const field =
    "w-full border-0 border-b border-[var(--cv-pearl)]/30 bg-transparent px-0 py-3 text-[var(--cv-pearl)] placeholder:text-[var(--cv-pearl)]/40 outline-none transition-colors focus:border-[var(--cv-gold-light)]";
  const label = "text-[11px] uppercase tracking-[0.12em] text-[#d6d0c5]";

  return (
    <div className="covnt min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:bg-white focus:px-4 focus:py-3">
        Skip to content
      </a>

      {/* Announcement */}
      <div className="flex items-center justify-between gap-4 bg-[var(--cv-black)] px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-[var(--cv-cream)] sm:px-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-[var(--cv-gold-light)] hover:text-white">
          &larr; K Group Kenya
        </Link>
        <span className="hidden sm:inline">COVNT. &mdash; Wear Your Purpose</span>
        <span className="w-24 sm:hidden" aria-hidden="true" />
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 border-b border-black/10 bg-[var(--cv-pearl)]/95 backdrop-blur transition-shadow ${scrolled ? "shadow-[0_8px_24px_-16px_rgba(0,0,0,.35)]" : ""}`}>
        <div className="mx-auto flex min-h-[72px] max-w-[1200px] items-center justify-between gap-6 px-6">
          <a href="#home" aria-label="COVNT. home"><Wordmark /></a>
          <nav className="hidden items-center gap-9 md:flex" aria-label="Main navigation">
            {navLinks.map(([id, text]) => (
              <a key={id} href={`#${id}`} className={link(id)}>{text}</a>
            ))}
            <a href="#contact" className="bg-[var(--cv-black)] px-4 py-3 text-[11px] font-bold tracking-[0.06em] text-[var(--cv-pearl)] transition-colors hover:bg-[#383630]">
              Enquire with COVNT.
            </a>
          </nav>
          <button
            type="button"
            className="inline-flex items-center gap-2 border border-black/15 px-3 py-2 text-xs font-semibold md:hidden"
            aria-expanded={menu}
            aria-controls="covnt-mobile-nav"
            onClick={() => setMenu((m) => !m)}
          >
            Menu {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {menu && (
          <nav id="covnt-mobile-nav" className="border-t border-black/10 bg-[var(--cv-pearl)] px-6 pb-5 md:hidden" aria-label="Mobile navigation">
            {navLinks.map(([id, text]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="block border-b border-black/5 py-3.5 text-sm font-bold">{text}</a>
            ))}
            <a href="#contact" onClick={() => setMenu(false)} className="mt-4 block bg-[var(--cv-black)] px-4 py-3.5 text-center text-sm font-bold text-[var(--cv-pearl)]">
              Enquire with COVNT.
            </a>
          </nav>
        )}
      </header>

      <main id="main">
        {/* HERO */}
        <section id="home" className="relative flex min-h-[640px] max-h-[960px] items-center overflow-hidden md:h-[calc(100vh-110px)] bg-[var(--cv-black)] text-[var(--cv-pearl)]" aria-labelledby="hero-title">
          <div
            className="absolute inset-0 opacity-45"
            style={{ background: `linear-gradient(90deg, #171715 0%, rgba(23,23,21,.72) 38%, rgba(23,23,21,.15) 100%), url(${IMAGES.hero}) center 35%/cover no-repeat` }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute -right-24 top-[12%] hidden h-[480px] w-[480px] rounded-full border border-[var(--cv-gold)]/35 md:block" aria-hidden="true" />
          <div className="pointer-events-none absolute -right-10 top-[18%] hidden h-[380px] w-[380px] rounded-full border border-[var(--cv-gold)]/20 md:block" aria-hidden="true" />

          <div className="relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-24 lg:grid-cols-[1.15fr_.85fr]">
            <div>
              <Eyebrow light>Purpose in every detail</Eyebrow>
              <h1 id="hero-title" className="cv-serif mt-6 text-[clamp(3.2rem,8vw,6.9rem)] leading-[0.98]">
                Wear what<br />you <em className="not-italic text-[var(--cv-gold-light)]">believe.</em>
              </h1>
              <p className="mt-7 max-w-[34rem] text-[clamp(1rem,1.6vw,1.2rem)] text-[#d5d0c5]">
                Considered clothing for everyday life. Rooted in faith, shaped by integrity, and designed to help you show up with confidence and purpose.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#collections" className="inline-flex min-h-[48px] items-center gap-3 bg-[var(--cv-pearl)] px-6 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--cv-black)] transition-all hover:-translate-y-0.5 hover:bg-[var(--cv-cream)]">
                  Explore the collection <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#story" className="inline-flex min-h-[48px] items-center border border-[var(--cv-pearl)]/55 px-6 text-[11px] font-bold uppercase tracking-[0.1em] transition-all hover:-translate-y-0.5 hover:bg-white/10">
                  Discover our story
                </a>
              </div>
            </div>

            {/* arch portrait */}
            <div className="relative mx-auto hidden w-full max-w-[22rem] lg:block">
              <div className="absolute -inset-4 rounded-t-[999px] border border-[var(--cv-gold)]/50" aria-hidden="true" />
              <img src={IMAGES.heroCard} alt="Smart casual menswear styling" className="relative aspect-[3/4] w-full rounded-t-[999px] object-cover" />
              <div className="absolute -bottom-5 left-1/2 w-[85%] -translate-x-1/2 bg-[var(--cv-pearl)] px-4 py-3 text-center text-[10px] font-bold uppercase tracking-[0.14em] text-[var(--cv-black)]">
                Designed for everyday purpose <span className="text-[#8d713d]">&middot; 01</span>
              </div>
            </div>
          </div>

          <a href="#collections" className="cv-bob absolute bottom-20 left-1/2 hidden -translate-x-1/2 text-[var(--cv-gold-light)] md:block" aria-label="Scroll to collections">
            <ArrowDown className="h-5 w-5" />
          </a>

          {/* values ticker */}
          <div className="absolute inset-x-0 bottom-0 overflow-hidden border-t border-white/10 bg-black/30 py-3 text-[11px] uppercase tracking-[0.15em] text-[#c6c0b4]" aria-hidden="true">
            <div className="cv-ticker flex w-max gap-10 whitespace-nowrap">
              {[...values, ...values, ...values, ...values].map(([v], i) => (
                <span key={i} className="flex items-center gap-10">{v}<span className="text-[var(--cv-gold)]">&middot;</span></span>
              ))}
            </div>
          </div>
        </section>

        {/* INTRO */}
        <section className="py-24 md:py-28" aria-labelledby="intro-title">
          <div className="mx-auto grid max-w-[1200px] items-center gap-14 px-6 md:grid-cols-2 md:gap-24">
            <Reveal>
              <Eyebrow>Introducing COVNT.</Eyebrow>
              <h2 id="intro-title" className="cv-serif mt-4 text-[clamp(2.4rem,4.7vw,4.4rem)] leading-[1.05]">Style with a deeper meaning.</h2>
              <p className="mt-5 max-w-[32rem] text-[var(--cv-muted)]">
                COVNT. is a purpose-led clothing brand for people who want their everyday style to reflect what matters. Our direction is understated, versatile and thoughtfully considered &mdash; pieces that feel at home across work, community, church and everyday life.
              </p>
              <p className="mt-4 max-w-[32rem] text-[var(--cv-muted)]">
                We believe what you wear can be an expression of identity, conviction and the person you are becoming.
              </p>
              <a href="#story" className="mt-7 inline-flex items-center gap-2 border-b border-[var(--cv-gold)] pb-1.5 text-[13px] font-bold">
                The meaning behind COVNT. <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative">
                <div className="absolute -bottom-4 -right-4 h-full w-full border border-[var(--cv-gold)]" aria-hidden="true" />
                <img src={IMAGES.intro} alt="Contemporary fashion styling in a neutral palette" loading="lazy" className="relative h-[470px] w-full bg-[var(--cv-cream)] object-cover" />
                <div className="absolute inset-x-5 bottom-5 flex justify-between gap-4 bg-[var(--cv-pearl)]/95 px-5 py-4 text-[11px] uppercase tracking-[0.1em]">
                  <span>Designed for everyday purpose</span>
                  <span className="text-[#8d713d]">COVNT. / 01</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* COLLECTIONS */}
        <section id="collections" className="scroll-mt-24 bg-[var(--cv-cream)] py-24 md:py-28" aria-labelledby="collections-title">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-[44rem]">
                <Eyebrow>Explore COVNT.</Eyebrow>
                <h2 id="collections-title" className="cv-serif mt-4 text-[clamp(2.4rem,4.7vw,4.4rem)] leading-[1.05]">A considered wardrobe.</h2>
                <p className="mt-3 max-w-[27rem] text-[var(--cv-muted)]">
                  Discover the directions shaping our collection. Product availability, designs, sizes and pricing will be confirmed directly with COVNT.
                </p>
              </div>
              <a href="#contact" onClick={() => enquire("Product availability")} className="inline-flex min-h-[48px] items-center gap-3 border border-black/15 px-6 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors hover:border-[var(--cv-gold)]">
                Ask about a piece <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {collections.map((c, i) => (
                <Reveal key={c.title} delay={i * 120}>
                  <article className="group relative h-[470px] overflow-hidden bg-[#d6d0c5]">
                    <img src={c.image} alt={c.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                    <span className="absolute right-5 top-4 text-[11px] font-bold tracking-[0.2em] text-white/80">{c.no}</span>
                    <div className="absolute inset-x-6 bottom-6 text-white">
                      <small className="text-[10px] uppercase tracking-[0.17em] text-[var(--cv-gold-light)]">{c.no} / {c.tag}</small>
                      <h3 className="cv-serif mt-2 text-[1.9rem] leading-tight">{c.title}</h3>
                      <a
                        href="#contact"
                        onClick={() => enquire(c.title)}
                        className="mt-4 inline-flex items-center gap-2 border-b border-[var(--cv-gold-light)] pb-1.5 text-[11px] uppercase tracking-[0.1em] transition-all group-hover:gap-3"
                      >
                        Enquire about this collection <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                    <div className="pointer-events-none absolute inset-3 border border-[var(--cv-gold-light)]/0 transition-colors duration-500 group-hover:border-[var(--cv-gold-light)]/60" />
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 text-xs text-[var(--cv-muted)]">Imagery is illustrative. Replace with approved COVNT. product photography before launch.</p>
          </div>
        </section>

        {/* STORY */}
        <section id="story" className="scroll-mt-24 bg-[var(--cv-soft)] py-24 text-[var(--cv-pearl)] md:py-28" aria-labelledby="story-title">
          <div className="mx-auto grid max-w-[1200px] gap-16 px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <Reveal>
              <Eyebrow light>Our story &amp; values</Eyebrow>
              <h2 id="story-title" className="cv-serif mt-4 max-w-[34rem] text-[clamp(2.4rem,4.7vw,4.4rem)] leading-[1.05]">More than what you wear.</h2>
              <p className="mt-6 text-[#d1ccc2]">
                COVNT. exists to raise a generation clothed in purpose, rooted in faith, and transforming the world through Christ-centred values.
              </p>
              <p className="mt-4 text-[#d1ccc2]">
                Our mission is to create high-quality, stylish and versatile clothing that inspires confidence, expresses individuality, and reflects faith, integrity and purpose in everyday life.
              </p>
              <a href="#contact" className="mt-8 inline-flex min-h-[48px] items-center gap-3 bg-[var(--cv-pearl)] px-6 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--cv-black)] transition-all hover:-translate-y-0.5 hover:bg-[var(--cv-cream)]">
                Start a conversation <ArrowUpRight className="h-4 w-4" />
              </a>
            </Reveal>
            <div>
              <Reveal><Eyebrow light>What guides us</Eyebrow></Reveal>
              <ul className="mt-6 grid gap-x-10 sm:grid-cols-2">
                {values.map(([name, desc], i) => (
                  <Reveal key={name} delay={i * 80}>
                    <li className="group border-t border-[var(--cv-pearl)]/20 py-5 transition-colors hover:border-[var(--cv-gold-light)]">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--cv-gold)]">0{i + 1}</span>
                      <strong className="cv-serif mt-1 block text-[1.45rem] text-[var(--cv-gold-light)]">{name}</strong>
                      <span className="text-sm text-[#c5c0b6]">{desc}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* CORPORATE */}
        <section id="corporate" className="scroll-mt-24 py-24 md:py-28" aria-labelledby="corporate-title">
          <div className="mx-auto max-w-[1200px] px-6">
            <Reveal>
              <div className="grid bg-[var(--cv-cream)] md:grid-cols-2">
                <img src={IMAGES.corporate} alt="Plain apparel ready for custom branding" loading="lazy" className="h-full max-h-[34rem] min-h-[22rem] w-full object-cover" />
                <div className="self-center p-8 sm:p-14 lg:p-20">
                  <Eyebrow>For teams &amp; occasions</Eyebrow>
                  <h2 id="corporate-title" className="cv-serif mt-4 text-[clamp(2rem,3.6vw,3.2rem)] leading-[1.08]">Your identity. Thoughtfully worn.</h2>
                  <p className="mt-4 text-[var(--cv-muted)]">
                    Bring your team, organisation or event together with considered apparel. Tell us what you have in mind and we can discuss the brief, garment options, branding placement, quantities and timeline.
                  </p>
                  <ul className="my-6">
                    {corporateList.map((t) => (
                      <li key={t} className="border-b border-black/10 py-3 text-sm">
                        <span className="mr-3 text-[#987b45]">&mdash;</span>{t}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" onClick={() => enquire("Corporate & Custom Apparel")} className="inline-flex min-h-[48px] items-center gap-3 bg-[var(--cv-black)] px-6 text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--cv-pearl)] transition-all hover:-translate-y-0.5 hover:bg-[#383630]">
                    Request an enquiry <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </Reveal>

            <ol className="relative mt-14 grid gap-8 md:grid-cols-3">
              {steps.map(([title, text], i) => (
                <Reveal key={title} delay={i * 120}>
                  <li className="border-t border-[var(--cv-gold)] pt-5">
                    <span className="text-[11px] tracking-[0.14em] text-[#9a7c43]">STEP 0{i + 1}</span>
                    <h3 className="cv-serif mt-2 text-2xl">{title}</h3>
                    <p className="mt-2 text-sm text-[var(--cv-muted)]">{text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-16 bg-[var(--cv-black)] py-24 text-[var(--cv-pearl)] md:py-28" aria-labelledby="contact-title">
          <div className="mx-auto grid max-w-[1200px] gap-14 px-6 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
            <Reveal>
              <Eyebrow light>Contact &amp; orders</Eyebrow>
              <h2 id="contact-title" className="cv-serif mt-4 text-[clamp(2.4rem,4.7vw,4.4rem)] leading-[1.05]">Let's talk about what you need.</h2>
              <p className="mt-5 max-w-[27rem] text-[#c9c4ba]">
                Interested in a collection, looking for sizing and availability, or planning apparel for a team or event? Send us an enquiry and our team can follow up.
              </p>
              <div className="mt-8 space-y-3 text-sm">
                <a href={`https://wa.me/${GROUP_PHONE_INTL}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[var(--cv-gold-light)] hover:text-white">
                  <MessageCircle className="h-4 w-4" /> WhatsApp {GROUP_PHONE}
                </a>
                <a href={`tel:+${GROUP_PHONE_INTL}`} className="flex items-center gap-3 text-[var(--cv-gold-light)] hover:text-white">
                  <Phone className="h-4 w-4" /> Call {GROUP_PHONE}
                </a>
              </div>
              <p className="mt-8 text-sm text-[var(--cv-gold-light)]">COVNT. &middot; Wear Your Purpose</p>
            </Reveal>

            <Reveal delay={120}>
              <form onSubmit={onSubmit} className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="cv-name" className={label}>Your name *</label>
                  <input id="cv-name" name="name" autoComplete="name" required className={field} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cv-email" className={label}>Email address *</label>
                  <input id="cv-email" name="email" type="email" autoComplete="email" required className={field} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cv-phone" className={label}>Phone / WhatsApp (optional)</label>
                  <input id="cv-phone" name="phone" type="tel" autoComplete="tel" className={field} />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="cv-type" className={label}>Enquiry type *</label>
                  <select id="cv-type" name="type" required value={interest} onChange={(e) => setInterest(e.target.value)} className={field}>
                    <option value="" className="text-black">Choose an option</option>
                    {enquiryTypes.map((t) => <option key={t} value={t} className="text-black">{t}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label htmlFor="cv-message" className={label}>How can we help? *</label>
                  <textarea id="cv-message" name="message" required rows={4} placeholder="Share the items, sizes, quantities or ideas you're enquiring about." className={`${field} resize-y`} />
                </div>
                <div className="sm:col-span-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="inline-flex min-h-[52px] items-center gap-3 bg-[var(--cv-gold-light)] px-8 text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--cv-black)] transition-all hover:-translate-y-0.5 hover:bg-[var(--cv-pearl)] disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending…" : "Send enquiry"} <ArrowUpRight className="h-4 w-4" />
                  </button>
                  <p role="status" aria-live="polite" className={`mt-4 text-sm ${status === "error" ? "text-[#f2a0a0]" : "text-[var(--cv-gold-light)]"}`}>
                    {status === "sent" && "Thank you. Your enquiry has been sent and COVNT. will be in touch."}
                    {status === "error" && `We couldn't send that just now (${errorMsg}). Please WhatsApp or call ${GROUP_PHONE}.`}
                  </p>
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#10100f] px-6 pb-6 pt-14 text-[var(--cv-pearl)]">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col justify-between gap-10 border-b border-white/15 pb-10 md:flex-row">
            <div className="max-w-sm">
              <a href="#home" aria-label="COVNT. back to top"><Wordmark light /></a>
              <p className="mt-4 text-sm text-[#bdb7ac]">Clothing with purpose. Rooted in faith, expressed through everyday style.</p>
              <span className="mt-4 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.19em] text-[var(--cv-gold-light)]">Wear Your Purpose</span>
            </div>
            <nav className="flex flex-wrap content-start gap-x-8 gap-y-3 text-[13px]" aria-label="Footer navigation">
              <a href="#collections" className="text-[#d7d1c6] hover:text-white">Collections</a>
              <a href="#story" className="text-[#d7d1c6] hover:text-white">Our Story</a>
              <a href="#corporate" className="text-[#d7d1c6] hover:text-white">Corporate &amp; Custom</a>
              <a href="#contact" className="text-[#d7d1c6] hover:text-white">Contact &amp; Orders</a>
              <Link to="/" className="text-[#d7d1c6] hover:text-white">K Group Kenya &nearr;</Link>
            </nav>
          </div>
          <div className="flex flex-col justify-between gap-2 pt-5 text-[11px] text-[#a8a298] md:flex-row">
            <span>&copy; {new Date().getFullYear()} COVNT. All rights reserved.</span>
            <span>A brand within the K Group Kenya portfolio &middot; <Link to="/" className="underline">K Group Kenya</Link></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default COVNT;
