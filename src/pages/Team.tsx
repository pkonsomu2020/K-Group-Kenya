import { Link } from "react-router-dom";
import Banner from "@/components/Banner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { KMark } from "@/components/corp/Logo";
import { ThemeProvider } from "@/components/ThemeProvider";
import { GROUP, about } from "@/data/group";

const Team = () => (
  <div className="corp min-h-screen bg-background text-foreground">
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
    <Banner
      title="Leadership"
      subtitle="Visionary leadership, guided by faith, integrity and stewardship."
      eyebrow="The group"
      crumb="Leadership"
    />

    <main>
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-5xl overflow-hidden border border-border bg-card shadow-sm md:grid-cols-[18rem_1fr]">
          <div className="relative flex min-h-[16rem] items-center justify-center bg-navy p-10">
            <KMark className="h-40 w-40" arc="#F8F9FB" />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gold" aria-hidden="true" />
          </div>
          <div className="p-8 md:p-12">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold-deep">Founder</span>
            <h2 className="mt-3 font-heading text-3xl font-bold text-navy">{GROUP.founder.name}</h2>
            <p className="mt-1 text-sm font-semibold text-muted-foreground">
              {GROUP.founder.title} &middot; also known as {GROUP.founder.alias}
            </p>
            <div className="my-6 h-px w-16 bg-gold" />
            <p className="leading-relaxed text-muted-foreground">{about.leadership}</p>
          </div>
        </div>

        <p className="mx-auto mt-8 max-w-5xl text-sm leading-relaxed text-muted-foreground">
          As the portfolio grows, this page will introduce the group's advisers and the leaders of each brand.
        </p>
      </section>

      <section className="bg-navy px-4 py-14 text-center text-white sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold md:text-3xl">Work with K Group Kenya</h2>
        <p className="mx-auto mt-3 max-w-xl text-white/70">
          We welcome conversations with partners, professionals and organisations who share our values.
        </p>
        <Link to="/contacts" className="corp-btn corp-btn-gold mt-6">Get in touch</Link>
      </section>
    </main>
    <Footer />
  </div>
);

export default Team;
