import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/corp/Logo";
import { GROUP, portfolio } from "@/data/group";
import { GROUP_PHONE, GROUP_PHONE_INTL } from "@/data/subsidiaries";

const CorpFooter = () => (
  <footer className="corp bg-navy text-white">
    <div className="h-1 bg-gradient-to-r from-gold via-gold/60 to-transparent" aria-hidden="true" />
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
      <div>
        <Logo tone="light" />
        <p className="mt-5 text-sm font-semibold uppercase leading-relaxed tracking-wider text-white/90">{GROUP.tagline}</p>
        <p className="mt-3 text-sm leading-relaxed text-white/60">{GROUP.descriptor}</p>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Portfolio</h3>
        <ul className="mt-4 space-y-2 text-sm">
          {portfolio.map((b) => (
            <li key={b.name}>
              {b.link ? (
                <Link to={b.link} className="text-white/75 transition-colors hover:text-white">{b.name}</Link>
              ) : (
                <span className="text-white/50">{b.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">The Group</h3>
        <ul className="mt-4 space-y-2 text-sm">
          {[
            ["About", "/about"],
            ["Leadership", "/team"],
            ["CSR", "/csr"],
            ["Contact", "/contacts"],
          ].map(([label, href]) => (
            <li key={href}><Link to={href} className="text-white/75 transition-colors hover:text-white">{label}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Contact</h3>
        <ul className="mt-4 space-y-3 text-sm text-white/75">
          <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" /> {GROUP.location}</li>
          <li><a href={`tel:+${GROUP_PHONE_INTL}`} className="flex items-center gap-2 hover:text-white"><Phone className="h-4 w-4 shrink-0 text-gold" /> {GROUP_PHONE}</a></li>
          <li><a href={`mailto:${GROUP.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="h-4 w-4 shrink-0 text-gold" /> {GROUP.email}</a></li>
        </ul>
        <p className="mt-5 text-xs italic text-gold">Faith · Business · Impact</p>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/50 sm:px-6 md:flex-row lg:px-8">
        <p>© {new Date().getFullYear()} {GROUP.name}. All rights reserved.</p>
        <div className="flex gap-5">
          <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
          <Link to="/booking-terms" className="hover:text-white">Booking Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default CorpFooter;
