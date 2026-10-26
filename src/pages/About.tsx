import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight, Lightbulb, ShieldCheck, Award, Users, Eye, Target } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { subsidiaries } from "@/data/subsidiaries";

const journey = [
  { year: "2010", title: "Founded", text: "K-GROUP KENYA began as a vision to unite creative industries under one faith-driven brand." },
  { year: "2015", title: "Expansion", text: "New subsidiaries launched in media, events and automotive, reaching more communities." },
  { year: "2020", title: "Digital Era", text: "Digital broadcasting and online outreach reached thousands of people across Kenya." },
  { year: "2024", title: "Innovation & Growth", text: "Continuing to empower, inspire and serve with excellence in every sector." },
];

const values = [
  { icon: Lightbulb, name: "Innovation", desc: "Always evolving with the trends." },
  { icon: ShieldCheck, name: "Integrity", desc: "Upholding professionalism and ethics." },
  { icon: Award, name: "Excellence", desc: "Delivering the best in every service." },
  { icon: Users, name: "Community", desc: "Empowering youth and promoting local talent." },
];

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
    <span className="h-px w-8 bg-brand-red" /> {children}
  </span>
);

const About = () => {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ once: true, duration: 700, offset: 60, disable: reduce });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner title="About Us" subtitle="Empowering Industries. Nurturing Creativity. Driving Innovation." eyebrow="Our story" />

      <main>
        {/* STORY */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div data-aos="fade-right">
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">A vision to empower industries and nurture creativity.</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                K-GROUP KENYA began with media and events and has grown into a multidisciplinary group with a footprint in automotive, education, broadcasting and fashion. Each company runs as its own brand, and all of them share one commitment to quality, impact and innovation.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Our journey is defined by innovation, integrity and a drive to make a positive difference in every sector we touch.
              </p>
            </div>
            <div className="relative" data-aos="fade-left">
              <div className="grid grid-cols-2 gap-3">
                <img src="/GALLERY/break out events/breakout 2.jpg" alt="Breakout Events team at work" loading="lazy" className="h-72 w-full rounded-2xl object-cover" />
                <img src="/GALLERY/kachsound media/kachsound media 12.jpg" alt="Kach Sound Media at a live event" loading="lazy" className="mt-10 h-72 w-full rounded-2xl object-cover" />
              </div>
              <img src="/COMPANY LOGOS/K-GROUP.jpg" alt="K-GROUP KENYA logo" className="absolute -bottom-6 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full border-4 border-brand-red bg-white object-contain shadow-xl" />
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
            {[
              { icon: Eye, title: "Our Vision", text: "To be the leading catalyst for positive change in Africa, inspiring excellence and innovation across industries." },
              { icon: Target, title: "Our Mission", text: "To empower communities, nurture talent and deliver exceptional value through our diverse companies, while upholding the highest standards of integrity and service." },
            ].map((c, i) => (
              <div key={c.title} data-aos="fade-up" data-aos-delay={i * 100} className="rounded-3xl bg-brand-black p-8 text-white md:p-10">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red">
                  <c.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-2xl font-bold">{c.title}</h3>
                <p className="mt-3 leading-relaxed text-white/75">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* JOURNEY */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>Our journey</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">How we got here</h2>
            <ol className="mt-12 grid gap-6 md:grid-cols-4">
              {journey.map((j, i) => (
                <li key={j.year} className="relative pt-10" data-aos="fade-up" data-aos-delay={i * 100}>
                  <span className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-brand-red ring-4 ring-background" aria-hidden="true" />
                  {i < journey.length - 1 && <span className="absolute left-5 right-[-1.5rem] top-[9px] hidden h-[2px] bg-border md:block" aria-hidden="true" />}
                  <div className="h-full rounded-2xl border border-border bg-card p-6">
                    <span className="text-3xl font-extrabold text-brand-red">{j.year}</span>
                    <h3 className="mt-2 text-lg font-bold">{j.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{j.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* VALUES */}
        <section className="bg-brand-black px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>What guides us</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Our core values</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((v, i) => (
                <div key={v.name} data-aos="fade-up" data-aos-delay={i * 80} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <v.icon className="h-8 w-8 text-brand-red" aria-hidden="true" />
                  <h3 className="mt-4 text-xl font-bold">{v.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-[auto_1fr]">
            <img src="/COMPANY LOGOS/K-GROUP.jpg" alt="" className="mx-auto h-40 w-40 rounded-full border-4 border-brand-red bg-white object-contain shadow-lg" />
            <div>
              <Eyebrow>Leadership</Eyebrow>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">John Kach, Founder & CEO</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
                A visionary leader, entrepreneur and music minister with a passion for empowering youth and communities. He leads a team of professionals whose expertise spans media, business, education and community development.
              </p>
              <Link to="/team" className="mt-5 inline-flex items-center gap-1 border-b border-brand-red pb-0.5 font-bold text-brand-red">
                Meet the team <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* COMPANIES */}
        <section className="overflow-hidden bg-muted py-16" aria-label="The K-GROUP family">
          <style>{`
            @keyframes kg-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            .kg-marquee-track { animation: kg-marquee 30s linear infinite; }
            .kg-marquee:hover .kg-marquee-track, .kg-marquee:focus-within .kg-marquee-track { animation-play-state: paused; }
            @media (prefers-reduced-motion: reduce) { .kg-marquee-track { animation: none; flex-wrap: wrap; justify-content: center; width: auto !important; } .kg-dup { display: none; } }
          `}</style>
          <h2 className="text-center text-2xl font-bold">The K-GROUP family</h2>
          <div
            className="kg-marquee mt-10"
            style={{ maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)" }}
          >
            <ul className="kg-marquee-track flex w-max gap-10">
              {[...subsidiaries, ...subsidiaries].map((s, i) => (
                <li key={`${s.slug}-${i}`} className={`w-32 shrink-0 ${i >= subsidiaries.length ? "kg-dup" : ""}`} aria-hidden={i >= subsidiaries.length}>
                  <Link to={s.link} tabIndex={i >= subsidiaries.length ? -1 : 0} className="group flex flex-col items-center text-center">
                    <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-transparent bg-white text-xs font-extrabold text-brand-black shadow transition-all group-hover:-translate-y-1 group-hover:border-brand-red">
                      {s.logo ? <img src={s.logo} alt="" className="h-full w-full object-contain" /> : "COVNT."}
                    </span>
                    <span className="mt-3 text-sm font-semibold group-hover:text-brand-red">{s.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-red px-4 py-16 text-center text-white sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold md:text-4xl">Join our journey</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Whether you are a creative, an entrepreneur or a community leader, K-GROUP KENYA welcomes you to partner with us.
          </p>
          <Link to="/contacts" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-brand-black transition-colors hover:bg-brand-black hover:text-white">
            Contact us <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
