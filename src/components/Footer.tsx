import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MessageCircle, Phone, Mail } from "lucide-react";
import { subsidiaries, GROUP_PHONE, GROUP_PHONE_INTL, GROUP_EMAIL, WHATSAPP_URL } from "@/data/subsidiaries";

const Footer = () => (
  <footer className="bg-brand-black text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <img src="/COMPANY LOGOS/K-GROUP.jpg" alt="K-GROUP KENYA logo" className="w-14 h-14 rounded-full border-2 border-brand-red bg-white object-contain" />
          <span className="text-xl font-extrabold tracking-wide">K-GROUP KENYA</span>
        </div>
        <p className="text-sm text-white/70 leading-relaxed">
          A multidisciplinary group empowering industries, nurturing creativity and driving innovation across Kenya and beyond.
        </p>
        <div className="flex gap-3 mt-5">
          <a href="https://www.facebook.com/kachsoundntertainment/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="p-2 rounded-full bg-white/10 hover:bg-brand-red transition-colors"><Facebook className="w-5 h-5" /></a>
          <a href="https://www.instagram.com/kachsoundmedia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 rounded-full bg-white/10 hover:bg-brand-red transition-colors"><Instagram className="w-5 h-5" /></a>
          <a href="https://www.youtube.com/@kachsoundmedia4437" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="p-2 rounded-full bg-white/10 hover:bg-brand-red transition-colors"><Youtube className="w-5 h-5" /></a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="p-2 rounded-full bg-white/10 hover:bg-brand-red transition-colors"><MessageCircle className="w-5 h-5" /></a>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-red mb-4">Our Companies</h3>
        <ul className="space-y-2 text-sm">
          {subsidiaries.map((s) => (
            <li key={s.slug}><Link to={s.link} className="text-white/80 hover:text-white">{s.name}</Link></li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-red mb-4">Explore</h3>
        <ul className="space-y-2 text-sm">
          {[
            ["About", "/about"],
            ["Team", "/team"],
            ["CSR", "/csr"],
            ["Events", "/events"],
            ["Gallery", "/gallery"],
            ["Contacts", "/contacts"],
          ].map(([label, href]) => (
            <li key={href}><Link to={href} className="text-white/80 hover:text-white">{label}</Link></li>
          ))}
        </ul>
        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-red mt-6 mb-3">Get in touch</h3>
        <ul className="space-y-2 text-sm text-white/80">
          <li><a href={`tel:+${GROUP_PHONE_INTL}`} className="inline-flex items-center gap-2 hover:text-white"><Phone className="w-4 h-4" />{GROUP_PHONE}</a></li>
          <li><a href={`mailto:${GROUP_EMAIL}`} className="inline-flex items-center gap-2 hover:text-white"><Mail className="w-4 h-4" />{GROUP_EMAIL}</a></li>
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-brand-red mb-4">Our Location</h3>
        <div className="rounded-lg overflow-hidden border border-white/20">
          <iframe
            title="K-GROUP Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6333271673843!2d36.7538822!3d-1.396464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05dd2f51407f%3A0x26d21a166bf5073d!2sKACHSOUND%20MEDIA!5e0!3m2!1sen!2ske!4v1752599751010!5m2!1sen!2ske"
            width="100%"
            height="190"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>

    <div className="border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row gap-3 items-center justify-between text-xs text-white/60">
        <p>
          © {new Date().getFullYear()} K-GROUP KENYA. All rights reserved. | Design by{" "}
          <a href="https://pinchezportfoliodesign.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Peter Pinchez</a>
        </p>
        <div className="flex gap-4">
          <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
          <Link to="/booking-terms" className="hover:text-white">Booking Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
