import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { KMark } from "@/components/corp/Logo";

interface BannerProps {
  title: string;
  subtitle?: string;
  /** Small label above the title. */
  eyebrow?: string;
  /** Optional background photo (path in /public). */
  image?: string;
  /** Last item of the breadcrumb. Defaults to the title. */
  crumb?: string;
}

/**
 * Page header for the group site. It sits under the fixed navigation,
 * so it supplies its own top padding.
 */
const Banner: React.FC<BannerProps> = ({ title, subtitle, eyebrow = "K Group Kenya", image, crumb }) => (
  <section className="corp relative overflow-hidden bg-navy text-white">
    {image && <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />}
    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-[#13294B]" style={image ? { opacity: 0.85 } : undefined} />
    <KMark className="pointer-events-none absolute -right-10 -top-6 hidden h-[130%] w-auto opacity-[0.06] md:block" arc="#F8F9FB" />
    <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-32 sm:px-6 md:pb-16 lg:px-8">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
          <li><Link to="/" className="hover:text-gold">Home</Link></li>
          <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5" /></li>
          <li aria-current="page" className="text-white">{crumb ?? title}</li>
        </ol>
      </nav>
      <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold">
        <span className="h-px w-10 bg-gold" /> {eyebrow}
      </span>
      <h1 className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
      {subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">{subtitle}</p>}
    </div>
    <div className="absolute inset-x-0 bottom-0 h-px bg-gold/50" aria-hidden="true" />
  </section>
);

export default Banner;
