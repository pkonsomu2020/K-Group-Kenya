import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BannerProps {
  title: string;
  subtitle?: string;
  /** Small label above the title. Defaults to the group name. */
  eyebrow?: string;
  /** Background photo (path in /public). */
  image?: string;
  /** Last item of the breadcrumb. Defaults to the title. */
  crumb?: string;
}

/**
 * Page header for inner pages. It sits under the floating navbar, so it
 * supplies its own top padding and pages should not add `pt-16`.
 */
const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  eyebrow = "K-GROUP KENYA",
  image = "/banner-img.jpg",
  crumb,
}) => {
  return (
    <section className="relative overflow-hidden bg-brand-black text-white">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/30" />
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-red/25 blur-3xl" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-32 sm:px-6 md:pb-16 lg:px-8">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold backdrop-blur">
            <li>
              <Link to="/" className="inline-flex items-center gap-1 text-white/80 hover:text-white">
                <Home className="h-3.5 w-3.5" aria-hidden="true" /> Home
              </Link>
            </li>
            <li aria-hidden="true"><ChevronRight className="h-3.5 w-3.5 text-white/50" /></li>
            <li aria-current="page" className="text-white">{crumb ?? title}</li>
          </ol>
        </nav>

        <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.25em] text-brand-red">
          <span className="h-px w-8 bg-brand-red" /> {eyebrow}
        </span>
        <h1 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-base text-white/80 md:text-lg">{subtitle}</p>}
      </div>
    </section>
  );
};

export default Banner;
