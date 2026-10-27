import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Banner from "@/components/Banner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GROUP, portfolio } from "@/data/group";
import { GROUP_PHONE, GROUP_PHONE_INTL, WHATSAPP_URL } from "@/data/subsidiaries";

const details = [
  { icon: Phone, title: "Call", line: GROUP_PHONE, sub: "020-2113473", href: `tel:+${GROUP_PHONE_INTL}` },
  { icon: MessageCircle, title: "WhatsApp", line: GROUP_PHONE, sub: "Message us", href: WHATSAPP_URL },
  { icon: Mail, title: "Email", line: GROUP.email, sub: "We reply within 24 hours", href: `mailto:${GROUP.email}` },
  { icon: MapPin, title: "Based in", line: GROUP.location, sub: "Serving Kenya and beyond" },
];

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
    <div className="corp min-h-screen bg-background text-foreground">
      <ThemeProvider>
        <Navigation />
      </ThemeProvider>
      <Banner
        title="Contact K Group Kenya"
        subtitle="For partnerships, enquiries about our brands, or to be directed to the right team."
        eyebrow="Get in touch"
        crumb="Contact"
      />

      <main className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div data-aos="fade-right" className="border border-border bg-card p-6 shadow-sm sm:p-10">
            <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-gold-deep">
              <span className="h-px w-10 bg-gold" /> Send a message
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold text-navy md:text-3xl">How can we help?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Tell us what you need and we will respond with the right contact or next step.</p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">First name *</Label>
                  <Input id="firstName" name="firstName" value={form.firstName} onChange={onChange} required className="rounded-none" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Last name *</Label>
                  <Input id="lastName" name="lastName" value={form.lastName} onChange={onChange} required className="rounded-none" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" name="email" type="email" value={form.email} onChange={onChange} required className="rounded-none" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} required className="rounded-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="company">Your enquiry is about *</Label>
                <select
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={onChange}
                  required
                  className="flex h-10 w-full border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select a brand or topic</option>
                  <option value="K Group Kenya (general)">K Group Kenya (general enquiry)</option>
                  {portfolio.map((b) => (
                    <option key={b.name} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" value={form.message} onChange={onChange} rows={5} className="rounded-none" />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="corp-btn corp-btn-navy w-full"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              <p role="status" aria-live="polite" className={`text-center text-sm ${status === "error" ? "text-red-600" : "text-forest"}`}>
                {status === "sent" && "Thank you. Your message has been sent and we will be in touch."}
                {status === "error" && errorMsg}
              </p>
            </form>
          </div>

          <aside className="space-y-4" data-aos="fade-left">
            {details.map((d) => {
              const body = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy text-gold">
                    <d.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold uppercase tracking-[0.2em] text-gold-deep">{d.title}</span>
                    <span className="mt-0.5 block break-words font-semibold text-navy">{d.line}</span>
                    <span className="block text-xs text-muted-foreground">{d.sub}</span>
                  </span>
                </>
              );
              const cls = "flex items-center gap-4 border border-border border-l-4 border-l-gold bg-card p-5";
              return d.href ? (
                <a key={d.title} href={d.href} {...(d.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={`${cls} transition-colors hover:bg-ivory`}>
                  {body}
                </a>
              ) : (
                <div key={d.title} className={cls}>{body}</div>
              );
            })}
            <div className="bg-navy p-6 text-white">
              <p className="font-heading text-lg font-bold">{GROUP.statement}</p>
              <p className="mt-2 text-sm text-white/70">{GROUP.tagline}</p>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contacts;
