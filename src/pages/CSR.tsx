import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight, HeartHandshake, Church, Users, Compass } from "lucide-react";
import Banner from "@/components/Banner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const focusAreas = [
  { icon: HeartHandshake, title: "Children's Home Visits", text: "Regular visits with essential supplies, time and care for children in need." },
  { icon: Church, title: "Missionary Outreach", text: "Christian missionary outreach that shares hope and faith in action." },
  { icon: Users, title: "Community Empowerment", text: "Projects that build dignity and opportunity for local communities." },
  { icon: Compass, title: "Mentorship & Guidance", text: "Mentorship and spiritual guidance for young people." },
];

type Project = "All" | "Miale Home" | "Nyumba ya Tumaini";

const photos = [
  ...[...Array(6)].map((_, i) => ({ src: `/CSR PAGE/miale home ${i + 1}.jpg`, project: "Miale Home" as const })),
  ...[...Array(27)].map((_, i) => ({ src: `/CSR PAGE/nyumba ya tumaini ${i + 1}.jpg`, project: "Nyumba ya Tumaini" as const })),
];

const projects: Project[] = ["All", "Miale Home", "Nyumba ya Tumaini"];
const INITIAL = 12;

const CSR = () => {
  const [project, setProject] = useState<Project>("All");
  const [showAll, setShowAll] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ once: true, duration: 700, offset: 60, disable: reduce });
  }, []);

  const filtered = photos.filter((p) => project === "All" || p.project === project);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner
        title="CSR & Missions"
        subtitle="Compassion in Action. Faith in Motion."
        eyebrow="Giving back"
        image="/CSR PAGE/miale home 1.jpg"
        crumb="CSR"
      />

      <main>
        {/* Intro */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div data-aos="fade-right">
              <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
                <span className="h-px w-8 bg-brand-red" /> Our mission
              </span>
              <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">Living out our faith through action.</h2>
              <p className="mt-5 leading-relaxed text-muted-foreground">
                We believe in giving back to society. Our CSR and Missions work includes regular visits to children's homes, providing essential supplies, mentorship and spiritual support. We partner with local organisations to maximise impact and foster hope, dignity and transformation.
              </p>
            </div>
            <div className="relative" data-aos="fade-left">
              <img
                src="/CSR PAGE/nyumba ya tumaini 1.jpg"
                alt="K-GROUP KENYA team with children during an outreach visit"
                loading="lazy"
                className="h-80 w-full rounded-3xl object-cover"
              />
              <img
                src="/COMPANY LOGOS/K-GROUP KENYA CSR - WHITE BG.jpg"
                alt="K-GROUP KENYA CSR logo"
                className="absolute -bottom-6 -left-2 h-24 w-24 rounded-2xl border-4 border-brand-red bg-white object-contain p-1 shadow-xl sm:left-6"
              />
            </div>
          </div>
        </section>

        {/* Focus areas */}
        <section className="bg-brand-black px-4 py-20 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
              <span className="h-px w-8 bg-brand-red" /> What we do
            </span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Where we focus</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {focusAreas.map((f, i) => (
                <div key={f.title} className="rounded-2xl border border-white/10 bg-white/5 p-6" data-aos="fade-up" data-aos-delay={i * 80}>
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-red">
                    <f.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
                  <span className="h-px w-8 bg-brand-red" /> In pictures
                </span>
                <h2 className="mt-3 text-3xl font-bold md:text-4xl">Moments from our outreach</h2>
              </div>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos by project">
                {projects.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => { setProject(p); setShowAll(false); }}
                    aria-pressed={project === p}
                    className={`rounded-full border-2 px-4 py-1.5 text-sm font-semibold transition-colors ${
                      project === p
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-brand-red hover:text-brand-red"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
              {visible.map((p) => (
                <button
                  key={p.src}
                  type="button"
                  onClick={() => setOpen(p.src)}
                  className="group mb-4 block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                  aria-label={`Open photo from ${p.project}`}
                >
                  <img
                    src={p.src}
                    alt={`Outreach at ${p.project}`}
                    loading="lazy"
                    className="w-full transition-transform duration-300 group-hover:scale-105"
                  />
                </button>
              ))}
            </div>

            {!showAll && filtered.length > INITIAL && (
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="rounded-lg border-2 border-foreground px-6 py-2.5 font-bold transition-colors hover:bg-foreground hover:text-background"
                >
                  Show all {filtered.length} photos
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-brand-red px-4 py-16 text-center text-white sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold md:text-4xl">Partner with us</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            Want to give, volunteer or join an outreach? Get in touch and we'll show you how to be part of it.
          </p>
          <Link to="/contacts" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-brand-black transition-colors hover:bg-brand-black hover:text-white">
            Contact us <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </main>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">Outreach photo</DialogTitle>
          {open && <img src={open} alt="Outreach photo, enlarged" className="max-h-[85vh] w-full rounded-2xl object-contain" />}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default CSR;
