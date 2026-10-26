import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowUpRight } from "lucide-react";
import Banner from "@/components/Banner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";

interface Member {
  name: string;
  role: string;
  company: string;
  photo: string;
  bio: string;
}

const founder: Member = {
  name: "John Kach",
  role: "Founder & CEO",
  company: "K-GROUP KENYA",
  photo: "/COMPANY LOGOS/K-GROUP.jpg",
  bio: "Visionary leader, entrepreneur and music minister with a passion for empowering youth and communities. He leads the group's drive to nurture creativity and build industries across Kenya.",
};

const members: Member[] = [
  {
    name: "Grace Mwangi",
    role: "Head of Events",
    company: "Breakout Events",
    photo: "/COMPANY LOGOS/BREAKOUTEVENTS.jpg",
    bio: "Expert in event planning and logistics, ensuring every event is memorable and impactful.",
  },
  {
    name: "Samuel Otieno",
    role: "Lead Sound Engineer",
    company: "Kach Sound Media",
    photo: "/COMPANY LOGOS/KACHSOUNDMEDIA.jpg",
    bio: "Bringing technical excellence and creativity to every production and live event.",
  },
  {
    name: "Mary Wanjiru",
    role: "Media & Communications",
    company: "KBR TV",
    photo: "/COMPANY LOGOS/KBRTV - WHITE.jpg",
    bio: "Storyteller and media strategist, amplifying the K-GROUP KENYA brand across platforms.",
  },
  {
    name: "David Kimani",
    role: "Automotive Specialist",
    company: "Links Auto Motors",
    photo: "/COMPANY LOGOS/LINKSAUTOMOTORS.jpg",
    bio: "Automotive expert dedicated to quality service and customer satisfaction.",
  },
];

const Team = () => {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ once: true, duration: 700, offset: 60, disable: reduce });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner
        title="Meet Our Team"
        subtitle="Diverse talents and expertise driving K-GROUP KENYA's mission of empowering industries and nurturing creativity."
        eyebrow="The people"
        crumb="Team"
      />

      <main>
        {/* Founder */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div
            className="mx-auto grid max-w-7xl items-center gap-8 overflow-hidden rounded-3xl bg-brand-black text-white md:grid-cols-[18rem_1fr]"
            data-aos="fade-up"
          >
            <div className="flex items-center justify-center bg-gradient-to-br from-[#2a0a0b] to-brand-black p-10 md:h-full">
              <img
                src={founder.photo}
                alt={founder.name}
                className="h-48 w-48 rounded-full border-4 border-brand-red bg-white object-contain shadow-2xl"
              />
            </div>
            <div className="p-8 md:py-12 md:pr-12 md:pl-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brand-red">Leadership</span>
              <h2 className="mt-2 text-3xl font-bold md:text-4xl">{founder.name}</h2>
              <p className="mt-1 font-semibold text-white/80">{founder.role}</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-white/70">{founder.bio}</p>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="bg-muted px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
              <span className="h-px w-8 bg-brand-red" /> Across the group
            </span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">The people behind the brands</h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((m, i) => (
                <article
                  key={m.name}
                  className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-brand-red hover:shadow-xl"
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                >
                  <div className="flex h-44 items-center justify-center bg-white">
                    <img src={m.photo} alt={m.company} loading="lazy" className="h-32 w-32 object-contain transition-transform duration-300 group-hover:scale-110" />
                  </div>
                  <div className="p-5">
                    <span className="inline-block rounded-full bg-brand-red/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand-red">
                      {m.company}
                    </span>
                    <h3 className="mt-3 text-lg font-bold">{m.name}</h3>
                    <p className="text-sm font-semibold text-muted-foreground">{m.role}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.bio}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Join */}
        <section className="bg-brand-red px-4 py-16 text-center text-white sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold md:text-4xl">Want to work with us?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">
            We are always glad to meet creatives, professionals and partners who share our values.
          </p>
          <Link to="/contacts" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-bold text-brand-black transition-colors hover:bg-brand-black hover:text-white">
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Team;
