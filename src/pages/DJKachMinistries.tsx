import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight, ArrowUp, Calendar, Camera, Check, ChevronLeft, ChevronRight, Home, MapPin, Mail, Menu, MessageCircle,
  Music, Phone, Play, Send, User, X, Clock, Users, Headphones,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import DJHero from "@/components/home/DJHero";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  DJK, about, events, galleryCategories, included, logo, moments, services, slides, stats, tickerItems, videos,
  type DJEvent,
} from "@/data/djKach";

const NAV = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: User },
  { id: "services", label: "Services", icon: Music },
  { id: "events", label: "Events", icon: Calendar },
  { id: "gallery", label: "Gallery", icon: Camera },
  { id: "contact", label: "Contact", icon: Phone },
] as const;

/* ---------- small hooks ---------- */

const useInView = <T extends HTMLElement>(threshold = 0.3) => {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
};

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const [ref, seen] = useInView<HTMLSpanElement>();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1600);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
};

const Typewriter = ({ words }: { words: string[] }) => {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = words[i % words.length];
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setText(word); const t = setTimeout(() => setI((x) => x + 1), 2200); return () => clearTimeout(t); }
    let t: number;
    if (!del && text === word) t = window.setTimeout(() => setDel(true), 1400);
    else if (del && text === "") { setDel(false); setI((x) => x + 1); return; }
    else t = window.setTimeout(() => setText(del ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1)), del ? 40 : 80);
    return () => window.clearTimeout(t);
  }, [text, del, i, words]);
  return <span>{text}<span className="djk-caret ml-0.5 text-red-500">|</span></span>;
};

const fmtDate = (d: string, long = false) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-KE", long ? { weekday: "long", day: "numeric", month: "long", year: "numeric" } : { day: "numeric", month: "short", year: "numeric" });
const isPast = (d: string) => new Date(d + "T23:59:59") < new Date();

const Eyebrow = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <span className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] ${light ? "text-red-400" : "text-red-600"}`}>
    <Headphones className="h-4 w-4" aria-hidden="true" /> {children}
  </span>
);

/* ---------- lightbox ---------- */

const Lightbox = ({ photos, index, onClose, onIndex }: { photos: string[]; index: number; onClose: () => void; onIndex: (i: number) => void }) => {
  const touch = useRef<number | null>(null);
  const go = useCallback((d: number) => onIndex((index + d + photos.length) % photos.length), [index, photos.length, onIndex]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", key);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [go, onClose]);
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      onTouchStart={(e) => { touch.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const d = e.changedTouches[0].clientX - touch.current;
        if (Math.abs(d) > 50) go(d < 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      <button type="button" onClick={onClose} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-white/15 p-3 text-white hover:bg-red-600"><X className="h-5 w-5" /></button>
      <button type="button" onClick={(e) => { e.stopPropagation(); go(-1); }} aria-label="Previous photo" className="absolute left-3 rounded-full bg-white/15 p-3 text-white hover:bg-red-600"><ChevronLeft className="h-6 w-6" /></button>
      <img src={photos[index]} alt={`Gallery photo ${index + 1} of ${photos.length}`} onClick={(e) => e.stopPropagation()} className="max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl" />
      <button type="button" onClick={(e) => { e.stopPropagation(); go(1); }} aria-label="Next photo" className="absolute right-3 rounded-full bg-white/15 p-3 text-white hover:bg-red-600"><ChevronRight className="h-6 w-6" /></button>
      <span className="absolute bottom-4 rounded-full bg-black/60 px-4 py-1 text-xs font-semibold text-white">{index + 1} / {photos.length}</span>
    </div>
  );
};

/* ---------- page ---------- */

const emptyForm = { name: "", email: "", phone: "", type: "", date: "", venue: "", message: "" };

const DJKachMinistries = () => {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [slide, setSlide] = useState(0);
  const [seenSlides, setSeenSlides] = useState<Set<number>>(new Set([0]));
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [moment, setMoment] = useState(moments[0].id);
  const [openService, setOpenService] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");
  const [event, setEvent] = useState<DJEvent | null>(null);
  const [cat, setCat] = useState(galleryCategories[0].id);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [video, setVideo] = useState<number | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
    document.title = "DJ KACH Ministries | Gospel DJ & Music Minister, Nairobi";
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = window.setInterval(
      () => setSlide((s) => {
        const next = (s + 1) % slides.length;
        setSeenSlides((seen) => new Set(seen).add(s).add(next));
        return next;
      }),
      6000
    );
    return () => window.clearInterval(t);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const book = (type?: string) => {
    if (type) setForm((f) => ({ ...f, type }));
    setMenu(false);
    setEvent(null);
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const [firstName, ...rest] = form.name.trim().split(/\s+/);
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName: rest.join(" ") || "-",
          email: form.email,
          phone: form.phone || "Not provided",
          companyEnquire: `DJ KACH Ministries - ${form.type}`.slice(0, 100),
          additionalDetails: [form.date && `Event date: ${form.date}`, form.venue && `Venue: ${form.venue}`, form.message].filter(Boolean).join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStatus("sent");
      setForm(emptyForm);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const types = ["All", ...Array.from(new Set(events.map((e) => e.type)))];
  const shownEvents = events.filter((e) => filter === "All" || e.type === filter);
  const m = moments.find((x) => x.id === moment)!;
  const mService = services.find((s) => s.id === m.serviceId)!;
  const photos = galleryCategories.find((c) => c.id === cat)!.photos;

  const field = "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-shadow focus:border-red-500 focus:ring-4 focus:ring-red-100";

  return (
    <div className="djk min-h-screen overflow-x-clip">
      {/* K Group bar */}
      <div className="flex items-center justify-between gap-4 bg-black px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-white/70 sm:px-8">
        <Link to="/" className="font-semibold text-red-400 hover:text-white">&larr; K Group Kenya</Link>
        <span className="hidden sm:inline">{DJK.ministry} &middot; {DJK.tagline}</span>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-lg backdrop-blur-md" : "bg-white"}`}>
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" aria-label="DJ Kach home" className="group flex items-center gap-3">
            <img src={logo} alt="" className="h-12 w-12 rounded-full bg-black object-contain p-1 ring-2 ring-black transition-transform duration-500 group-hover:rotate-[360deg]" />
            <span className="hidden font-heading text-lg font-extrabold leading-none sm:block">DJ <span className="text-red-600">KACH</span><span className="block text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">Ministries</span></span>
          </a>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${active === n.id ? "bg-red-50 text-red-600" : "text-gray-700 hover:text-red-600"}`}>
                <n.icon className="h-4 w-4" aria-hidden="true" /> {n.label}
              </a>
            ))}
            <button type="button" onClick={() => book()} className="ml-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105">
              Book DJ Kach
            </button>
          </nav>
          <button type="button" className="rounded-full border border-gray-300 p-2.5 lg:hidden" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu((o) => !o)}>
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menu && (
          <nav className="border-t bg-white px-4 pb-5 lg:hidden" aria-label="Mobile navigation">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={() => setMenu(false)} className="flex items-center gap-3 border-b border-gray-100 py-3.5 text-sm font-semibold">
                <n.icon className="h-4 w-4 text-red-600" aria-hidden="true" /> {n.label}
              </a>
            ))}
            <button type="button" onClick={() => book()} className="mt-4 w-full rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white">Book DJ Kach</button>
          </nav>
        )}
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative flex min-h-[640px] items-center justify-center overflow-hidden bg-black text-white md:h-[calc(100vh-110px)] md:max-h-[920px]"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setMouse({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
          }}
        >
          <div className="absolute -inset-6" style={{ transform: `translate(${mouse.x * -14}px, ${mouse.y * -10}px)`, transition: "transform .3s ease-out" }}>
            {slides.map((s, i) =>
              seenSlides.has(i) || i === slide || i === (slide + 1) % slides.length ? (
                <img
                  key={s}
                  src={s}
                  alt=""
                  decoding="async"
                  fetchPriority={i === 0 ? "high" : "low"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ${i === slide ? "djk-ken opacity-100" : "opacity-0"}`}
                />
              ) : null
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
          {/* rising notes */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            {[8, 22, 37, 52, 66, 80, 92].map((left, i) => (
              <Music key={left} className="djk-rise absolute bottom-0 text-red-500/60" style={{ left: `${left}%`, width: 18 + (i % 3) * 8, height: 18 + (i % 3) * 8, animationDelay: `${i * 2}s`, animationDuration: `${12 + (i % 4) * 2}s` }} />
            ))}
          </div>

          <div className="relative z-10 mx-auto max-w-4xl px-4 text-center" style={{ transform: `translate(${mouse.x * 10}px, ${mouse.y * 8}px)` }}>
            <img src={logo} alt="" className="mx-auto mb-6 h-24 w-24 rounded-full bg-black object-contain p-1.5 ring-4 ring-red-600" />
            <h1 className="font-heading text-6xl font-extrabold leading-none tracking-tight sm:text-7xl md:text-8xl">
              DJ <span className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">KACH</span>
            </h1>
            <p className="mt-5 h-9 text-2xl font-light sm:text-3xl" aria-live="polite"><Typewriter words={DJK.roles} /></p>
            <p className="mx-auto mt-5 max-w-xl text-base text-white/80 sm:text-lg">{DJK.intro}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button type="button" onClick={() => book()} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-8 py-4 text-base font-bold shadow-xl transition-transform hover:scale-105 sm:w-auto">
                <Calendar className="h-5 w-5" /> Book DJ Kach
              </button>
              <a href="#videos" className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white px-8 py-4 text-base font-bold transition-colors hover:bg-white hover:text-black sm:w-auto">
                <Play className="h-5 w-5" /> Watch the highlights
              </a>
            </div>
          </div>

          {/* slide dots */}
          <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            {slides.map((_, i) => (
              <button key={i} type="button" aria-label={`Show slide ${i + 1}`} onClick={() => setSlide(i)} className={`h-2.5 rounded-full transition-all ${i === slide ? "w-8 bg-red-500" : "w-2.5 bg-white/40 hover:bg-white/70"}`} />
            ))}
          </div>

          {/* equaliser */}
          <div className="absolute inset-x-0 bottom-0 flex h-16 items-end justify-center gap-[3px] px-2 opacity-80" aria-hidden="true">
            {Array.from({ length: 56 }).map((_, i) => (
              <span key={i} className="djk-eq w-1 flex-1 max-w-[6px] rounded-t bg-gradient-to-t from-red-700 to-red-400" style={{ height: `${30 + ((i * 37) % 70)}%`, animationDelay: `${(i % 9) * 0.12}s`, animationDuration: `${0.8 + (i % 5) * 0.18}s` }} />
            ))}
          </div>
        </section>

        {/* TICKER */}
        <div className="overflow-hidden bg-red-600 py-3 text-white" aria-hidden="true">
          <div className="kg-pause">
            <ul className="kg-scroll flex w-max gap-10 whitespace-nowrap text-sm font-bold uppercase tracking-widest" style={{ ["--kg-speed" as string]: "40s" }}>
              {[...tickerItems, ...tickerItems].map((t, i) => (
                <li key={i} className="flex items-center gap-10">{t}<span className="h-1.5 w-1.5 rounded-full bg-white/60" /></li>
              ))}
            </ul>
          </div>
        </div>

        {/* STATS */}
        <section className="bg-gray-50 py-14">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="rounded-2xl bg-white p-6 text-center shadow-lg">
                <div className="bg-gradient-to-br from-red-500 to-red-700 bg-clip-text font-heading text-4xl font-extrabold text-transparent sm:text-5xl">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-sm font-medium text-gray-600">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <Reveal>
              <Eyebrow>About DJ Kach</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">{about.title}</h2>
              {about.paragraphs.map((p) => <p key={p} className="mt-4 leading-relaxed text-gray-600">{p}</p>)}
              <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.25em] text-gray-500">Specialisations</h3>
              <ul className="mt-3 grid gap-x-8 sm:grid-cols-2">
                {about.specializations.map((s) => (
                  <li key={s} className="group flex items-center gap-3 border-b border-gray-200 py-3 text-[15px] font-semibold text-gray-800 transition-colors hover:border-red-500">
                    <span className="h-0.5 w-4 bg-red-600 transition-all duration-300 group-hover:w-7" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative mx-auto max-w-lg">
                <img src={slides[1]} alt="DJ Kach performing at a gospel event" loading="lazy" decoding="async" className="relative z-10 w-full -rotate-2 rounded-3xl border-8 border-white object-cover shadow-2xl transition-transform duration-500 hover:rotate-0" />
                <img src={slides[4]} alt="DJ Kach at the decks" loading="lazy" decoding="async" className="absolute -bottom-10 -right-4 z-20 w-1/2 rotate-3 rounded-2xl border-8 border-white object-cover shadow-2xl transition-transform duration-500 hover:rotate-0 sm:-right-10" />
                <div className="absolute -left-4 -top-4 h-full w-full rounded-3xl bg-gradient-to-br from-red-500 to-red-700" aria-hidden="true" />
              </div>
            </Reveal>
          </div>

          <div className="mx-auto mt-24 grid max-w-7xl gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
            {about.values.map((v, i) => (
              <Reveal key={v.title} delay={i * 100}>
                <div className="group h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-red-200 hover:shadow-2xl">
                  <span className="block h-1 w-10 rounded-full bg-red-600 transition-all duration-300 group-hover:w-16" aria-hidden="true" />
                  <h3 className="mt-5 font-heading text-xl font-bold">{v.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mx-auto mt-16 max-w-4xl px-4 text-center">
            <h3 className="font-heading text-sm font-bold uppercase tracking-[0.3em] text-red-600">Our mission</h3>
            <p className="mt-4 font-heading text-xl font-semibold leading-relaxed text-gray-800 sm:text-2xl">&ldquo;{about.mission}&rdquo;</p>
          </Reveal>
        </section>

        {/* PICK YOUR MOMENT */}
        <section className="bg-gradient-to-br from-red-600 to-red-800 py-20 text-white sm:py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <Eyebrow light>Plan your sound</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">What are you celebrating?</h2>
              <p className="mx-auto mt-3 max-w-xl text-white/80">Pick your moment and see what DJ Kach brings to it.</p>
            </Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-2" role="tablist" aria-label="Choose an occasion">
              {moments.map((x) => (
                <button key={x.id} type="button" role="tab" aria-selected={moment === x.id} onClick={() => setMoment(x.id)} className={`rounded-full px-5 py-2.5 text-sm font-bold transition-all ${moment === x.id ? "scale-105 bg-white text-red-700 shadow-xl" : "bg-white/15 hover:bg-white/30"}`}>
                  {x.label}
                </button>
              ))}
            </div>
            <div key={m.id} className="mt-10 grid items-center gap-8 overflow-hidden rounded-3xl bg-white text-gray-900 shadow-2xl md:grid-cols-2">
              <img src={m.photo} alt={m.label} className="h-72 w-full object-cover md:h-full md:min-h-[22rem]" />
              <div className="p-8 md:p-10">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-red-600">{mService.title}</span>
                <h3 className="mt-2 font-heading text-2xl font-extrabold sm:text-3xl">{m.label}</h3>
                <p className="mt-3 text-gray-600">{m.line}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {mService.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm font-semibold"><span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-white"><Check className="h-3 w-3" /></span>{b}</li>
                  ))}
                </ul>
                <button type="button" onClick={() => book(mService.title)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 font-bold text-white transition-transform hover:scale-105">
                  Book for my {m.label.toLowerCase()} <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <Eyebrow>Our services</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Professional DJ services for every occasion</h2>
              <p className="mx-auto mt-3 max-w-xl text-gray-600">Tap a service to see what is included.</p>
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => {
                const open = openService === s.id;
                return (
                  <Reveal key={s.id} delay={(i % 3) * 100}>
                    <div className={`group h-full overflow-hidden rounded-3xl border bg-white transition-all duration-300 ${open ? "border-red-300 shadow-2xl" : "border-gray-100 shadow-md hover:-translate-y-1 hover:shadow-xl"}`}>
                      <button type="button" onClick={() => setOpenService(open ? null : s.id)} aria-expanded={open} className="w-full p-7 text-left">
                        <span className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${open ? "rotate-6 bg-black text-white" : "bg-red-600 text-white group-hover:bg-black"}`}>
                          <s.icon className="h-7 w-7" aria-hidden="true" />
                        </span>
                        <h3 className="mt-5 font-heading text-lg font-bold">{s.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.text}</p>
                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-red-600">
                          {open ? "Hide details" : "What's included"} <ChevronRight className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`} />
                        </span>
                      </button>
                      <div className={`grid transition-all duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                        <div className="overflow-hidden">
                          <ul className="space-y-2 px-7 pb-2">
                            {s.bullets.map((b) => <li key={b} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-red-600" /> {b}</li>)}
                          </ul>
                          <div className="px-7 pb-7 pt-3">
                            <button type="button" onClick={() => book(s.title)} className="rounded-full bg-red-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-red-700">Book now</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* TAKE THE DECKS */}
        <section className="overflow-hidden bg-neutral-950 py-20 text-white sm:py-24" aria-labelledby="decks-title">
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
            <Reveal>
              <Eyebrow light>Try it yourself</Eyebrow>
              <h2 id="decks-title" className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Take the decks.</h2>
              <p className="mt-4 text-white/70">
                Two decks, a crossfader and a pad sampler. Press play on both, match the BPM, then blend a benga groove into a gengetone beat. Drag a platter to scratch.
              </p>
              <button type="button" onClick={() => book("Gospel DJ Services")} className="mt-6 inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3.5 font-bold transition-transform hover:scale-105">
                Want the real thing? Book DJ Kach <ArrowRight className="h-4 w-4" />
              </button>
            </Reveal>
            <div className="[&_p.text-muted-foreground]:text-white/60"><DJHero logo={logo} title="DJ KACH DECK" /></div>
          </div>
        </section>

        {/* EVENTS */}
        <section id="events" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <Eyebrow>Events &amp; performances</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">On stage, on air, in worship</h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter events">
              {types.map((t) => (
                <button key={t} type="button" aria-pressed={filter === t} onClick={() => setFilter(t)} className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${filter === t ? "border-red-600 bg-red-600 text-white" : "border-gray-200 hover:border-red-400 hover:text-red-600"}`}>{t}</button>
              ))}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {shownEvents.map((ev) => (
                <button key={ev.title} type="button" onClick={() => setEvent(ev)} className="group relative overflow-hidden rounded-3xl bg-black text-left shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300">
                  <img src={ev.image} alt={`${ev.title} poster`} loading="lazy" decoding="async" className="aspect-[3/4] w-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105 group-hover:opacity-60" />
                  <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${isPast(ev.date) ? "bg-black/70 text-white" : "bg-red-600 text-white"}`}>{isPast(ev.date) ? "Past event" : "Upcoming"}</span>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5 pt-16 text-white">
                    <span className="text-xs font-bold uppercase tracking-wider text-red-400">{ev.type}</span>
                    <h3 className="mt-1 font-heading text-lg font-bold leading-snug">{ev.title}</h3>
                    <p className="mt-1 text-xs text-white/70">{fmtDate(ev.date)} &middot; {ev.venue}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-white/90 opacity-0 transition-opacity group-hover:opacity-100">View details <ArrowRight className="h-3.5 w-3.5" /></span>
                  </div>
                </button>
              ))}
            </div>

          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="scroll-mt-20 bg-gray-50 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <Eyebrow>Gallery</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">Moments of joy, celebration and inspiration</h2>
            </Reveal>
            <div className="mt-8 flex flex-wrap justify-center gap-2" role="group" aria-label="Gallery categories">
              {galleryCategories.map((c) => (
                <button key={c.id} type="button" aria-pressed={cat === c.id} onClick={() => setCat(c.id)} className={`rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors ${cat === c.id ? "border-red-600 bg-red-600 text-white" : "border-gray-200 bg-white hover:border-red-400 hover:text-red-600"}`}>
                  {c.label} <span className="opacity-60">({c.photos.length})</span>
                </button>
              ))}
            </div>
            <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
              {photos.map((p, i) => (
                <button key={p} type="button" onClick={() => setLightbox(i)} aria-label={`Open photo ${i + 1}`} className="group relative mb-4 block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300">
                  <img src={p} alt="" loading="lazy" decoding="async" className="w-full transition-transform duration-500 group-hover:scale-110" />
                  <span className="absolute inset-0 flex items-center justify-center bg-red-600/0 text-white opacity-0 transition-all group-hover:bg-red-600/40 group-hover:opacity-100"><Camera className="h-8 w-8" /></span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* VIDEOS */}
        <section id="videos" className="scroll-mt-20 py-20 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Reveal className="text-center">
              <Eyebrow>Video highlights</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-extrabold sm:text-4xl">See and hear it live</h2>
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {videos.map((v, i) => (
                <Reveal key={v.src} delay={(i % 2) * 100}>
                  <button type="button" onClick={() => setVideo(i)} className="group relative block w-full overflow-hidden rounded-3xl bg-black text-left shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300">
                    <img src={v.poster} alt={`${v.title} video thumbnail`} loading="lazy" decoding="async" className="aspect-video w-full object-cover opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-60" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-transform duration-300 group-hover:scale-110"><Play className="ml-1 h-9 w-9" /></span>
                    </span>
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-5 text-white">
                      <span className="block font-heading font-bold">{v.title}</span>
                      <span className="text-sm text-white/70">{v.text}</span>
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-20 bg-gradient-to-br from-gray-950 to-black py-20 text-white sm:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
            <Reveal>
              <Eyebrow light>Get in touch</Eyebrow>
              <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight sm:text-4xl">Ready to make your event unforgettable?</h2>
              <p className="mt-4 text-white/70">Let's create the perfect soundtrack for your special occasion.</p>
              <ul className="mt-8 space-y-3">
                {DJK.phones.map((p) => (
                  <li key={p.tel} className="flex flex-wrap items-center gap-3">
                    <a href={`tel:${p.tel}`} className="flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 font-semibold transition-colors hover:bg-red-600"><Phone className="h-5 w-5" /> {p.display}</a>
                    <a href={`https://wa.me/${p.wa}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-2xl border border-white/30 px-4 py-3 text-sm font-semibold transition-colors hover:bg-white hover:text-black"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                  </li>
                ))}
                <li><a href={`mailto:${DJK.email}`} className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 font-semibold transition-colors hover:bg-red-600"><Mail className="h-5 w-5" /> {DJK.email}</a></li>
                <li className="flex items-center gap-3 px-1 text-white/80"><MapPin className="h-5 w-5 text-red-400" /> {DJK.place}</li>
                <li className="flex items-center gap-3 px-1 text-white/80"><Clock className="h-5 w-5 text-red-400" /> Response time: {DJK.response}</li>
              </ul>
              <h3 className="mt-8 font-heading text-sm font-bold uppercase tracking-[0.25em] text-red-400">What's included</h3>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {included.map((x) => <li key={x} className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-red-400" /> {x}</li>)}
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <form onSubmit={onSubmit} className="relative overflow-hidden rounded-3xl bg-white p-6 text-gray-900 shadow-2xl sm:p-9">
                <h3 className="font-heading text-xl font-extrabold">Book your event</h3>
                <p className="mt-1 text-sm text-gray-500">Free consultation, no obligation.</p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Your name *
                    <input name="name" value={form.name} onChange={onChange} required autoComplete="name" className={`${field} mt-1.5 normal-case tracking-normal font-normal`} />
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Email *
                    <input name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" className={`${field} mt-1.5 normal-case tracking-normal font-normal`} />
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Phone
                    <input name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel" className={`${field} mt-1.5 normal-case tracking-normal font-normal`} />
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Event type *
                    <select name="type" value={form.type} onChange={onChange} required className={`${field} mt-1.5 normal-case tracking-normal font-normal`}>
                      <option value="">Select event type</option>
                      {services.map((s) => <option key={s.id} value={s.title}>{s.title}</option>)}
                    </select>
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Event date
                    <input name="date" type="date" value={form.date} onChange={onChange} className={`${field} mt-1.5 normal-case tracking-normal font-normal`} />
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600">Venue / location
                    <input name="venue" value={form.venue} onChange={onChange} className={`${field} mt-1.5 normal-case tracking-normal font-normal`} />
                  </label>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-600 sm:col-span-2">Tell us more
                    <textarea name="message" value={form.message} onChange={onChange} rows={4} className={`${field} mt-1.5 normal-case tracking-normal font-normal`} />
                  </label>
                </div>
                <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-8 py-4 font-bold text-white shadow-lg transition-transform hover:scale-[1.02] disabled:opacity-60">
                  {status === "sending" ? "Sending…" : "Send inquiry"} <Send className="h-4 w-4" />
                </button>
                <p role="status" aria-live="polite" className={`mt-4 text-center text-sm ${status === "error" ? "text-red-600" : "font-semibold text-green-700"}`}>
                  {status === "sent" && "Thank you! Your inquiry is on its way. DJ Kach's team will be in touch."}
                  {status === "error" && `We couldn't send that just now (${errorMsg}). Please WhatsApp or call instead.`}
                </p>
                {status === "sent" && (
                  <div className="pointer-events-none absolute left-1/2 top-1/2" aria-hidden="true">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <span
                        key={i}
                        className="djk-confetti absolute h-2.5 w-2.5 rounded-sm"
                        style={{
                          background: ["#dc2626", "#111", "#f59e0b", "#fff", "#ef4444"][i % 5],
                          border: "1px solid #0001",
                          ["--dx" as string]: `${Math.cos(i * 0.9) * (120 + (i % 6) * 40)}px`,
                          ["--dy" as string]: `${Math.sin(i * 0.9) * (100 + (i % 5) * 40) - 60}px`,
                          ["--rot" as string]: `${(i * 67) % 720}deg`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black px-4 pb-8 pt-14 text-white sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 border-b border-white/10 pb-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-14 w-14 rounded-full bg-black object-contain p-1 ring-2 ring-white/60" />
              <span className="font-heading text-xl font-extrabold">DJ <span className="text-red-500">KACH</span></span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-white/60">{DJK.intro}</p>
            <p className="mt-3 text-sm italic text-red-400">{DJK.tagline}</p>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">Services</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {services.slice(0, 6).map((s) => <li key={s.id}><button type="button" onClick={() => book(s.title)} className="hover:text-white">{s.title}</button></li>)}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">Quick links</h3>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {NAV.map((n) => <li key={n.id}><a href={`#${n.id}`} className="hover:text-white">{n.label}</a></li>)}
            </ul>
          </div>
        </div>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 pt-6 text-xs text-white/50 md:flex-row">
          <span>&copy; {new Date().getFullYear()} DJ Kach. All rights reserved.</span>
          <span>A ministry within the <Link to="/" className="underline hover:text-white">K Group Kenya</Link> portfolio</span>
        </div>
      </footer>

      {/* back to top */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`fixed bottom-6 left-6 z-40 rounded-full bg-red-600 p-3 text-white shadow-xl transition-all hover:scale-110 ${scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>

      {/* event modal */}
      <Dialog open={event !== null} onOpenChange={(o) => !o && setEvent(null)}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden border-0 bg-white p-0 text-gray-900 sm:rounded-3xl">
          {event && (
            <div className="grid max-h-[88vh] overflow-y-auto md:grid-cols-[.9fr_1.1fr]">
              <img src={event.image} alt={`${event.title} poster`} className="h-full max-h-[28rem] w-full object-cover md:max-h-none" />
              <div className="p-6 sm:p-8">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">{event.type}</span>
                <DialogTitle className="mt-2 font-heading text-2xl font-extrabold leading-tight">{event.title}</DialogTitle>
                <DialogDescription className="sr-only">Details of {event.title}</DialogDescription>
                <ul className="mt-5 space-y-3 text-sm">
                  <li className="flex gap-3"><Calendar className="h-5 w-5 shrink-0 text-red-600" /> {fmtDate(event.date, true)}</li>
                  <li className="flex gap-3"><Clock className="h-5 w-5 shrink-0 text-red-600" /> {event.time}</li>
                  <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-red-600" /> {event.venue}</li>
                  <li className="flex gap-3"><Users className="h-5 w-5 shrink-0 text-red-600" /> {event.attendees}+ expected attendees</li>
                </ul>
                <p className={`mt-5 inline-block rounded-full px-3 py-1 text-xs font-bold ${isPast(event.date) ? "bg-gray-100 text-gray-600" : "bg-red-100 text-red-700"}`}>
                  {isPast(event.date) ? "Past event" : "Upcoming"}
                </p>
                <button type="button" onClick={() => book("Gospel DJ Services")} className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-6 py-3.5 font-bold text-white hover:bg-red-700">
                  Book DJ Kach for your event <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* video modal */}
      <Dialog open={video !== null} onOpenChange={(o) => !o && setVideo(null)}>
        <DialogContent className="max-w-4xl border-0 bg-black p-0 sm:rounded-3xl">
          <DialogTitle className="sr-only">{video !== null ? videos[video].title : "Video"}</DialogTitle>
          <DialogDescription className="sr-only">Video highlight</DialogDescription>
          {video !== null && <video src={videos[video].src} poster={videos[video].poster} controls autoPlay playsInline preload="auto" className="max-h-[85vh] w-full rounded-3xl bg-black" />}
        </DialogContent>
      </Dialog>

      {lightbox !== null && <Lightbox photos={photos} index={lightbox} onClose={() => setLightbox(null)} onIndex={setLightbox} />}
    </div>
  );
};

export default DJKachMinistries;
