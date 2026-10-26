import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { ArrowRight, Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Send, Youtube } from "lucide-react";
import Banner from "@/components/Banner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { subsidiaries, GROUP_PHONE, GROUP_PHONE_INTL, GROUP_EMAIL, WHATSAPP_URL } from "@/data/subsidiaries";

const quick = [
  { icon: Phone, title: "Call us", line: GROUP_PHONE, sub: "020-2113473", href: `tel:+${GROUP_PHONE_INTL}`, tile: "bg-brand-red text-white", tape: "#ef0b0d" },
  { icon: MessageCircle, title: "WhatsApp", line: GROUP_PHONE, sub: "Chat with us", href: WHATSAPP_URL, tile: "bg-brand-black text-white", tape: "#0d0c0c" },
  { icon: Mail, title: "Email", line: GROUP_EMAIL, sub: "We reply within 24 hours", href: `mailto:${GROUP_EMAIL}`, tile: "bg-white text-brand-red", tape: "#cfcfcf" },
  { icon: MapPin, title: "Visit", line: "Dolfine Plaza, Magadi Rd", sub: "Ongata Rongai", href: "#map", tile: "bg-red-100 text-brand-red", tape: "#f8b4b5" },
];

const socials = [
  { name: "Facebook", icon: Facebook, url: "https://www.facebook.com/kachsoundntertainment/" },
  { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/kachsoundmedia/" },
  { name: "YouTube", icon: Youtube, url: "https://www.youtube.com/@kachsoundmedia4437" },
  { name: "WhatsApp", icon: MessageCircle, url: WHATSAPP_URL },
];

const TILTS = [-1.1, 0.8, -0.6, 1];

const emptyForm = { firstName: "", lastName: "", email: "", phone: "", company: "", message: "" };

const Contacts = () => {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    AOS.init({ once: true, duration: 700, offset: 60, disable: reduce });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          companyEnquire: form.company,
          additionalDetails: form.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong.");
      setStatus("sent");
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Failed to send. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner
        title="Get In Touch"
        subtitle="Ready to book, partner or just say hello? We'd love to hear from you."
        eyebrow="Contact us"
        crumb="Contacts"
      />

      <main>
        {/* Quick contact */}
        <section className="bg-muted px-4 pb-14 pt-14 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {quick.map((q, i) => (
              <div key={q.title} data-aos="fade-up" data-aos-delay={i * 80}>
                <a
                  href={q.href}
                  {...(q.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  style={{ ["--tilt" as string]: `${TILTS[i]}deg` }}
                  className="group relative block rounded-3xl border-2 border-brand-black bg-white p-6 pt-8 text-brand-black shadow-[6px_6px_0_#0d0c0c] transition-all duration-300 [transform:rotate(var(--tilt))] hover:[transform:rotate(0deg)_translateY(-6px)] hover:shadow-[10px_10px_0_#0d0c0c] dark:shadow-[6px_6px_0_#ef0b0d] dark:hover:shadow-[10px_10px_0_#ef0b0d]"
                >
                  <span
                    className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 -rotate-2 opacity-90"
                    style={{ background: q.tape, clipPath: "polygon(2% 0, 98% 8%, 100% 92%, 0 100%)" }}
                    aria-hidden="true"
                  />
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-brand-black transition-transform group-hover:rotate-6 ${q.tile}`}>
                    <q.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-4 text-lg font-extrabold">{q.title}</h2>
                  <p className="mt-1 break-words text-sm font-semibold">{q.line}</p>
                  <p className="text-xs text-neutral-600">{q.sub}</p>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Form + details */}
        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.2fr_1fr]">
            <div data-aos="fade-right" className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
              <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
                <span className="h-px w-8 bg-brand-red" /> Send a message
              </span>
              <h2 className="mt-3 text-2xl font-bold md:text-3xl">How can we help?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Tell us what you need and we'll get back to you with the right team and a quote where it applies.
              </p>

              <form onSubmit={onSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="firstName">First name *</Label>
                    <Input id="firstName" name="firstName" value={form.firstName} onChange={onChange} placeholder="Your first name" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="lastName">Last name *</Label>
                    <Input id="lastName" name="lastName" value={form.lastName} onChange={onChange} placeholder="Your last name" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={onChange} placeholder="you@email.com" required />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} placeholder="+254 700 000 000" required />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="company">Which company is this for? *</Label>
                  <select
                    id="company"
                    name="company"
                    value={form.company}
                    onChange={onChange}
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select a company</option>
                    <option value="K-GROUP KENYA (general)">K-GROUP KENYA (general enquiry)</option>
                    {subsidiaries.map((s) => (
                      <option key={s.slug} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Your message</Label>
                  <Textarea id="message" name="message" value={form.message} onChange={onChange} rows={5} placeholder="Tell us about your event, project or question." />
                </div>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-bold text-white transition-colors hover:bg-brand-black disabled:opacity-60"
                >
                  {status === "sending" ? "Sending…" : "Send message"} <Send className="h-4 w-4" />
                </button>
                <p role="status" aria-live="polite" className={`text-center text-sm ${status === "error" ? "text-red-500" : "text-green-600"}`}>
                  {status === "sent" && "Thank you! Your message has been sent. We'll be in touch."}
                  {status === "error" && errorMsg}
                </p>
              </form>
            </div>

            <div className="space-y-6" data-aos="fade-left">
              <div id="map" className="scroll-mt-24 overflow-hidden rounded-3xl border border-border">
                <iframe
                  title="K-GROUP KENYA location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.6333271673843!2d36.7538822!3d-1.396464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f05dd2f51407f%3A0x26d21a166bf5073d!2sKACHSOUND%20MEDIA!5e0!3m2!1sen!2ske!4v1752599751010!5m2!1sen!2ske"
                  width="100%"
                  height="280"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-brand-black p-5 text-white">
                  <Clock className="h-6 w-6 text-brand-red" aria-hidden="true" />
                  <h3 className="mt-3 font-bold">Opening hours</h3>
                  <p className="mt-1 text-sm text-white/75">Mon–Fri: 9AM–6PM</p>
                  <p className="text-sm text-white/75">Weekends: by appointment</p>
                </div>
                <div className="rounded-2xl border border-border bg-card p-5">
                  <h3 className="font-bold">Follow us</h3>
                  <div className="mt-3 flex gap-2">
                    {socials.map((s) => (
                      <a
                        key={s.name}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.name}
                        className="rounded-full border border-border p-2.5 transition-colors hover:border-brand-red hover:bg-brand-red hover:text-white"
                      >
                        <s.icon className="h-5 w-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Companies */}
        <section className="bg-muted px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xl font-bold md:text-2xl">Looking for a specific company?</h2>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
              {subsidiaries.map((s) => (
                <Link key={s.slug} to={s.link} className="group flex flex-col items-center rounded-2xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-1 hover:border-brand-red hover:shadow-md">
                  <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-border bg-white text-[10px] font-extrabold text-brand-black">
                    {s.logo ? <img src={s.logo} alt="" className="h-full w-full object-contain" /> : "COVNT."}
                  </span>
                  <span className="mt-2 text-xs font-semibold group-hover:text-brand-red">{s.name}</span>
                  <ArrowRight className="mt-1 h-3.5 w-3.5 text-brand-red opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;
