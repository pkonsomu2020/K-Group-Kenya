import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight, Eye, Target, Compass } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GROUP, about, growth, portfolio, values } from "@/data/group";

const Eyebrow = ({ children, light = false }: { children: string; light?: boolean }) => (
  <span className={`flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] ${light ? "text-gold" : "text-gold-deep"}`}>
    <span className="h-px w-10 bg-gold" /> {children}
  </span>
);

const About = () => {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ once: true, duration: 700, offset: 60, disable: reduce });
  }, []);

  return (
    <div className="corp min-h-screen bg-background text-foreground">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner title="About K Group Kenya" subtitle={GROUP.tagline} eyebrow="The group" crumb="About" />

      <main>
        {/* Who we are */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div data-aos="fade-right">
              <Eyebrow>Who we are</Eyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-navy md:text-4xl">{GROUP.statement}</h2>
              <div className="mt-6 h-1 w-16 bg-gold" />
              <div className="mt-8 flex flex-wrap gap-2">
                {GROUP.personality.map((p) => (
                  <span key={p} className="border border-navy/25 px-3 py-1.5 text-xs font-semibold text-navy">{p}</span>
                ))}
              </div>
            </div>
            <div className="space-y-5 leading-relaxed text-muted-foreground" data-aos="fade-left">
              <p>{about.intro}</p>
              <p>{about.identity}</p>
              <p className="border-l-4 border-gold pl-5 font-heading text-lg font-semibold italic text-navy">Faith · Business · Impact</p>
            </div>
          </div>
        </section>

        {/* Vision, mission, purpose */}
        <section className="bg-navy px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-px bg-white/15 md:grid-cols-3">
            {[
              { icon: Eye, title: "Vision", text: about.vision },
              { icon: Target, title: "Mission", text: about.mission },
              { icon: Compass, title: "Purpose", text: about.purpose },
            ].map((c, i) => (
              <div key={c.title} className="bg-navy p-8 lg:p-10" data-aos="fade-up" data-aos-delay={i * 100}>
                <c.icon className="h-8 w-8 text-gold" aria-hidden="true" />
                <h3 className="mt-5 font-heading text-xl font-bold">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/75">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
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

        {/* Approach */}
        <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <Eyebrow>Business approach</Eyebrow>
              <h2 className="mt-4 font-heading text-3xl font-bold leading-tight text-navy md:text-4xl">Evidence first, then expansion.</h2>
            </div>
            <p className="leading-relaxed text-muted-foreground">{about.approach}</p>
          </div>
        </section>

        {/* Growth */}
        <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-7xl">
            <Eyebrow>Growth direction</Eyebrow>
            <h2 className="mt-4 max-w-2xl font-heading text-3xl font-bold leading-tight text-navy md:text-4xl">
              From foundation to international growth.
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

        {/* Leadership + portfolio */}
        <section className="bg-navy px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Leadership</span>
              <h2 className="mt-4 font-heading text-2xl font-bold md:text-3xl">{GROUP.founder.name}</h2>
              <p className="mt-1 text-sm font-semibold text-gold">{GROUP.founder.title}</p>
              <p className="mt-4 text-sm leading-relaxed text-white/75">{about.leadership}</p>
              <Link to="/team" className="mt-6 inline-flex items-center gap-2 border-b-2 border-gold pb-1 text-sm font-bold">
                Leadership <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">Portfolio</span>
              <ul className="mt-4 divide-y divide-white/10 border-y border-white/10">
                {portfolio.map((b) => (
                  <li key={b.name} className="flex items-center justify-between gap-4 py-3 text-sm">
                    <span className="font-semibold">{b.name}</span>
                    <span className="text-right text-xs text-white/60">{b.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
