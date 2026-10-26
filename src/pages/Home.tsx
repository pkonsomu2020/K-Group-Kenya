import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight, Phone, MessageCircle, Tv, CalendarDays, Car, GraduationCap, Music2, Shirt } from "lucide-react";
import DJHero from "@/components/home/DJHero";
import { subsidiaries, GROUP_PHONE, GROUP_PHONE_INTL, WHATSAPP_URL } from "@/data/subsidiaries";

const sectors = [
  { name: "Media & Broadcasting", icon: Tv, href: "/kbr-tv" },
  { name: "Event Management", icon: CalendarDays, href: "/breakout-events" },
  { name: "Automotive", icon: Car, href: "/links-auto-motors" },
  { name: "Education & Skills Training", icon: GraduationCap, href: "/kbr-academy" },
  { name: "Creative Arts & Entertainment", icon: Music2, href: "/kach-sound-media" },
  { name: "Apparel & Fashion", icon: Shirt, href: "/covnt" },
];

const coreValues = [
  { name: "Innovation", desc: "Always evolving with the trends." },
  { name: "Integrity", desc: "Upholding professionalism and ethics." },
  { name: "Excellence", desc: "Delivering the best in every service." },
  { name: "Community", desc: "Empowering youth and promoting local talent." },
];

const SectionHeading = ({ eyebrow, title, light = false }: { eyebrow: string; title: string; light?: boolean }) => (
  <div className="max-w-2xl mb-10">
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">{eyebrow}</span>
    <h2 className={`mt-2 text-3xl md:text-4xl font-extrabold leading-tight ${light ? "text-white" : "text-foreground"}`}>{title}</h2>
  </div>
);

const CompanyCard = ({ s }: { s: (typeof subsidiaries)[number] }) => (
  <Link
    to={s.link}
    className="group relative flex h-full min-h-[20rem] flex-col justify-end overflow-hidden rounded-2xl bg-brand-black text-white"
  >
    {s.image ? (
      <img
        src={s.image}
        alt=""
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-105"
      />
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-[#2a0a0b] via-brand-black to-[#3b0d0f]" />
    )}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
    <div className="relative p-6">
      <span className="text-[11px] font-semibold uppercase tracking-wider text-white/70">{s.sector}</span>
      <h3 className="mt-1 text-2xl font-extrabold">{s.name}</h3>
      <p className="mt-1 text-sm font-medium text-white/85">{s.tagline}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold border-b border-brand-red pb-0.5">
        Visit {s.name} <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </div>
  </Link>
);

const Home = () => {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ once: true, duration: 700, offset: 60, disable: reduce });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted pt-16">
        <div className="absolute -right-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-red/10 blur-3xl" aria-hidden="true" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:min-h-[85vh] lg:grid-cols-2 lg:px-8 lg:py-10">
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
              <span className="h-px w-8 bg-brand-red" /> K-GROUP KENYA
            </span>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-foreground sm:text-4xl lg:text-5xl" data-aos="fade-up">
              Empowering Industries.<br />
              Nurturing <span className="text-brand-red">Creativity.</span><br />
              Driving Innovation.
            </h1>
            <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base" data-aos="fade-up" data-aos-delay="100">
              Eight Kenyan brands across media, events, automotive, education and fashion, working together under one standard of quality and impact.
            </p>
            <div className="mt-6 flex flex-wrap gap-3" data-aos="fade-up" data-aos-delay="200">
              <a href="#companies" className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-brand-red/25 transition-colors hover:bg-brand-black">
                Our Companies <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link to="/contacts" className="inline-flex items-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:border-brand-red hover:text-brand-red">
                Talk to Us
              </Link>
            </div>
          </div>
          <DJHero />
        </div>
      </section>

      {/* GROUP INTRO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-2 items-center">
          <div data-aos="fade-right">
            <SectionHeading eyebrow="Who we are" title="One group. Many ventures. A shared standard." />
            <p className="text-muted-foreground leading-relaxed">
              K-GROUP KENYA is a multidisciplinary holding company with a footprint in media, automotive, events, education, digital broadcasting and fashion. Each company operates as an independent brand, all sharing a commitment to quality, impact and innovation.
            </p>
            <Link to="/about" className="mt-6 inline-flex items-center gap-1 font-bold text-brand-red border-b border-brand-red pb-0.5">
              Read our story <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3" data-aos="fade-left">
            <img src="/GALLERY/break out events/breakout 2.jpg" alt="Breakout Events team at work" loading="lazy" className="h-64 w-full object-cover rounded-2xl" />
            <img src="/GALLERY/kachsound media/kachsound media 12.jpg" alt="Kach Sound Media live event" loading="lazy" className="h-64 w-full object-cover rounded-2xl mt-8" />
          </div>
        </div>
      </section>

      {/* SECTORS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Sectors" title="Where we operate" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {sectors.map((s, i) => (
              <Link
                key={s.name}
                to={s.href}
                data-aos="fade-up"
                data-aos-delay={i * 60}
                className="group rounded-xl bg-card p-5 border border-border hover:border-brand-red hover:-translate-y-1 transition-all"
              >
                <s.icon className="w-8 h-8 text-brand-red" aria-hidden="true" />
                <p className="mt-4 text-sm font-bold leading-snug text-card-foreground">{s.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* COMPANIES */}
      <section id="companies" className="py-20 px-4 sm:px-6 lg:px-8 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Our companies" title="Eight brands, one family." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {subsidiaries.map((s, i) => (
              <div key={s.slug} data-aos="fade-up" data-aos-delay={(i % 3) * 80}>
                <CompanyCard s={s} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-black text-white">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="What guides us" title="Our core values" light />
          <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden">
            {coreValues.map((v, i) => (
              <div key={v.name} className="bg-brand-black p-8" data-aos="fade-up" data-aos-delay={i * 80}>
                <span className="text-xs font-bold text-brand-red">0{i + 1}</span>
                <h3 className="mt-3 text-2xl font-extrabold">{v.name}</h3>
                <p className="mt-2 text-sm text-white/70">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CSR */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid gap-10 lg:grid-cols-2 items-center">
          <div data-aos="fade-right">
            <SectionHeading eyebrow="Giving back" title="Community is at the heart of what we do." />
            <p className="text-muted-foreground leading-relaxed">
              Beyond business, K-GROUP KENYA empowers young people, promotes local talent and supports the communities we serve.
            </p>
            <Link to="/csr" className="mt-6 inline-flex rounded-md bg-brand-red px-6 py-3 font-bold text-white hover:bg-brand-black transition-colors">
              See our CSR work
            </Link>
          </div>
          <img src="/CSR PAGE/nyumba ya tumaini 1.jpg" alt="K-GROUP KENYA community outreach" loading="lazy" className="w-full h-72 object-cover rounded-2xl" data-aos="fade-left" />
        </div>
      </section>

      {/* CONTACT BAND */}
      <section className="bg-brand-red text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold">Have a project in mind?</h2>
            <p className="mt-2 text-white/90 max-w-xl">Tell us what you need and we'll point you to the right team in the group.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`tel:+${GROUP_PHONE_INTL}`} className="inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 font-bold text-brand-black hover:bg-brand-black hover:text-white transition-colors">
              <Phone className="w-4 h-4" /> Call {GROUP_PHONE}
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border-2 border-white px-6 py-3 font-bold hover:bg-white hover:text-brand-red transition-colors">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
