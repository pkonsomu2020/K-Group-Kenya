import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Banknote, ChevronRight, Compass, Facebook, Gauge, Hammer, Instagram, Menu, MessageCircle, Phone, Power, Repeat, Search, Send, ShieldCheck, Sparkles, Truck, Car, X, ClipboardCheck, KeyRound, Wrench, Handshake, Brain, Infinity as InfinityIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

/* ------------------------------------------------------------------ */
/* Content: from the Links Auto Motors design pack                     */
/* ------------------------------------------------------------------ */

const PHONE = { display: "0768 550 331", tel: "+254768550331", wa: "254768550331" };
const HANDLE = "@linksautomotors";
const FACEBOOK = "https://www.facebook.com/linksautomotors";

const NAV = [
  ["about", "About"],
  ["services", "Services"],
  ["journey", "Journey"],
  ["vision", "Vision"],
  ["contact", "Contact"],
] as const;

const services = [
  { icon: Car, title: "Vehicle Sales", text: "Helping customers identify and acquire vehicles suited to their needs." },
  { icon: Search, title: "Vehicle Sourcing", text: "Finding suitable vehicles according to requirements and preferences." },
  { icon: Compass, title: "Consultation", text: "Practical guidance before customers commit to an automotive decision." },
  { icon: Truck, title: "Vehicle Logistics", text: "Supporting the movement and delivery of vehicles." },
  { icon: Banknote, title: "Financing", text: "Helping customers navigate vehicle-financing options." },
  { icon: Repeat, title: "Trade-ins & Resale", text: "Helping customers transition from an existing vehicle to another." },
  { icon: Wrench, title: "Ownership Support", text: "Remaining a useful automotive partner beyond the purchase." },
  { icon: Hammer, title: "Restoration", text: "Developing capability to preserve, rebuild and revitalise vehicles." },
];

const journey = [
  { icon: Compass, title: "Consult", text: "Understand your needs, budget and intended use." },
  { icon: Search, title: "Source", text: "Identify suitable vehicle options." },
  { icon: ClipboardCheck, title: "Evaluate", text: "Support informed assessment and verification." },
  { icon: Handshake, title: "Acquire", text: "Facilitate the purchase process." },
  { icon: Truck, title: "Move", text: "Coordinate logistics and delivery." },
  { icon: KeyRound, title: "Own", text: "Support you throughout ownership." },
  { icon: Repeat, title: "Trade / Sell", text: "Help when it is time for a change." },
  { icon: Hammer, title: "Restore", text: "Preserve vehicles worth keeping." },
];

const why = [
  { icon: Brain, title: "Knowledge", text: "Practical automotive understanding informs our approach." },
  { icon: ShieldCheck, title: "Trust", text: "We aim for transparent, customer-centred decisions." },
  { icon: Sparkles, title: "Professionalism", text: "A structured service experience from first conversation onward." },
  { icon: InfinityIcon, title: "Long-Term Support", text: "The relationship continues beyond the transaction." },
];

const workshop = [4, 5, 6, 1, 2, 3].map((n) => ({
  src: `/GALLERY/links auto motors/links ${n}.jpg`,
  alt: ["Vehicle being checked in the workshop", "Technician inspecting a car", "Technician working on a car", "Engine bay inspection", "Engine bay check", "Interior condition check"][[4, 5, 6, 1, 2, 3].indexOf(n)],
}));

const needs = ["Buy a vehicle", "Source a vehicle", "Get advice", "Finance a vehicle", "Trade in or sell", "Restore a vehicle"];
const bodyTypes = ["SUV", "Sedan", "Pickup / truck", "Van", "Hatchback", "Not sure yet"];

/* ------------------------------------------------------------------ */
/* Car illustration                                                    */
/* ------------------------------------------------------------------ */

const Wheel = ({ cx }: { cx: number }) => (
  <g>
    <circle cx={cx} cy={168} r={37} fill="#0c0e12" stroke="#2a2f38" strokeWidth="3" />
    <g className="lam-wheel">
      <circle cx={cx} cy={168} r={24} fill="#1a1e26" stroke="#c9ced6" strokeWidth="3" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1={cx} y1={168} x2={cx + 22 * Math.cos((a * Math.PI) / 180)} y2={168 + 22 * Math.sin((a * Math.PI) / 180)} stroke="#c9ced6" strokeWidth="3" strokeLinecap="round" />
      ))}
      <circle cx={cx} cy={168} r={6} fill="#ed1c24" />
    </g>
  </g>
);

const CarArt = ({ on }: { on: boolean }) => (
  <svg viewBox="0 0 640 230" className="h-auto w-full overflow-visible" role="img" aria-label="Stylised car illustration">
    <defs>
      <linearGradient id="lam-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2b303a" />
        <stop offset="1" stopColor="#0f1217" />
      </linearGradient>
      <linearGradient id="lam-glass" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#59657a" />
        <stop offset="1" stopColor="#1b2230" />
      </linearGradient>
      <linearGradient id="lam-beam-g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff6d8" stopOpacity=".75" />
        <stop offset="1" stopColor="#fff6d8" stopOpacity="0" />
      </linearGradient>
    </defs>
    <ellipse cx="320" cy="208" rx="270" ry="10" fill="#000" opacity=".5" />
    <polygon className="lam-beam" points="596,150 760,108 760,200 596,168" fill="url(#lam-beam-g)" style={{ opacity: on ? 0.85 : 0.5 }} />
    <g className={`lam-body ${on ? "lam-on" : ""}`}>
      {/* body */}
      <path d="M36 168 C34 148 52 136 92 130 L168 78 C186 64 208 60 236 60 L396 60 C428 60 448 70 470 92 L520 128 C568 134 598 146 600 168 L600 176 L36 176 Z" fill="url(#lam-body)" stroke="#3a404c" strokeWidth="2" />
      {/* glass */}
      <path d="M182 92 L214 74 L300 74 L300 124 L150 124 Z" fill="url(#lam-glass)" />
      <path d="M312 74 L396 74 C412 74 424 80 436 92 L470 124 L312 124 Z" fill="url(#lam-glass)" />
      {/* accents */}
      <path d="M60 150 L560 150" stroke="#ed1c24" strokeWidth="3" strokeLinecap="round" opacity=".9" />
      <path d="M96 116 L420 116" stroke="#fff" strokeWidth="1" opacity=".12" />
      <rect x="305" y="128" width="20" height="4" rx="2" fill="#aab0bb" />
      {/* lights */}
      <path d="M560 140 L596 146 L598 158 L556 154 Z" fill="#fff6d8" />
      <path d="M36 142 L58 140 L58 156 L36 160 Z" fill="#ed1c24" />
      {/* arches */}
      <path d="M92 176 A48 48 0 0 1 188 176" fill="#06070a" />
      <path d="M416 176 A48 48 0 0 1 512 176" fill="#06070a" />
      <Wheel cx={140} />
      <Wheel cx={464} />
    </g>
  </svg>
);

/* ------------------------------------------------------------------ */
/* Engine: tachometer plus synthesised engine sound                    */
/* ------------------------------------------------------------------ */

const useEngine = () => {
  const [on, setOn] = useState(false);
  const [rpm, setRpm] = useState(0);
  const rpmRef = useRef(0);
  const target = useRef(0);
  const audio = useRef<{ ctx: AudioContext; o1: OscillatorNode; o2: OscillatorNode; f: BiquadFilterNode; g: GainNode } | null>(null);

  const ensure = () => {
    if (audio.current) return audio.current;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const o1 = ctx.createOscillator(); o1.type = "sawtooth";
    const o2 = ctx.createOscillator(); o2.type = "square";
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 300; f.Q.value = 4;
    const g = ctx.createGain(); g.gain.value = 0;
    o1.connect(f); o2.connect(f); f.connect(g); g.connect(ctx.destination);
    o1.start(); o2.start();
    audio.current = { ctx, o1, o2, f, g };
    return audio.current;
  };

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      rpmRef.current += (target.current - rpmRef.current) * 0.08;
      const r = rpmRef.current;
      setRpm(Math.round(r));
      const a = audio.current;
      if (a) {
        const hz = Math.max(18, (r / 60) * 2);
        const t = a.ctx.currentTime;
        a.o1.frequency.setTargetAtTime(hz, t, 0.03);
        a.o2.frequency.setTargetAtTime(hz * 0.5, t, 0.03);
        a.f.frequency.setTargetAtTime(200 + r * 0.45, t, 0.05);
        a.g.gain.setTargetAtTime(r < 50 ? 0 : 0.05 + (r / 7000) * 0.12, t, 0.05);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); audio.current?.ctx.close(); };
  }, []);

  const toggle = () => {
    const a = ensure();
    a.ctx.resume();
    setOn((v) => { target.current = v ? 0 : 900; return !v; });
  };
  const rev = (down: boolean) => {
    if (!on) return;
    target.current = down ? 6800 : 900;
  };
  return { on, rpm, toggle, rev };
};

const Tachometer = ({ rpm, on }: { rpm: number; on: boolean }) => {
  const max = 8000;
  const ang = -120 + (Math.min(rpm, max) / max) * 240;
  const pt = (a: number, r: number) => [100 + r * Math.sin((a * Math.PI) / 180), 100 - r * Math.cos((a * Math.PI) / 180)];
  const arc = (a1: number, a2: number, r: number) => {
    const [x1, y1] = pt(a1, r); const [x2, y2] = pt(a2, r);
    return `M${x1} ${y1} A${r} ${r} 0 ${a2 - a1 > 180 ? 1 : 0} 1 ${x2} ${y2}`;
  };
  return (
    <svg viewBox="0 0 200 200" className="mx-auto w-full max-w-[250px]" role="img" aria-label={`Tachometer showing ${rpm} revolutions per minute`}>
      <circle cx="100" cy="100" r="96" fill="#0d1015" stroke="#2a2f38" strokeWidth="4" />
      <path d={arc(-120, 120, 80)} stroke="#2a2f38" strokeWidth="10" fill="none" strokeLinecap="round" />
      <path d={arc(-120, ang, 80)} stroke="#ed1c24" strokeWidth="10" fill="none" strokeLinecap="round" style={{ opacity: on ? 1 : 0.25 }} />
      <path d={arc(70, 120, 80)} stroke="#ed1c24" strokeWidth="3" fill="none" opacity=".5" />
      {Array.from({ length: 9 }).map((_, i) => {
        const a = -120 + i * 30;
        const [x1, y1] = pt(a, 68); const [x2, y2] = pt(a, 60); const [tx, ty] = pt(a, 48);
        return (
          <g key={i}>
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#8b929e" strokeWidth="2" />
            <text x={tx} y={ty + 3} textAnchor="middle" fontSize="9" fill="#aab0bb" fontFamily="Montserrat, sans-serif">{i}</text>
          </g>
        );
      })}
      <g style={{ transform: `rotate(${ang}deg)`, transformOrigin: "100px 100px", transition: "none" }}>
        <polygon points="98,100 100,28 102,100" fill="#fff" />
      </g>
      <circle cx="100" cy="100" r="9" fill="#ed1c24" />
      <text x="100" y="142" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="Montserrat, sans-serif">{rpm.toLocaleString()}</text>
      <text x="100" y="156" textAnchor="middle" fontSize="8" letterSpacing="2" fill="#8b929e" fontFamily="Montserrat, sans-serif">RPM x 1</text>
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const Kicker = ({ children, light = false }: { children: ReactNode; light?: boolean }) => (
  <span className={`inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.25em] ${light ? "text-[#ff4a50]" : "text-[var(--lam-red)]"}`}>
    <span className="h-0.5 w-6 bg-current" /> {children}
  </span>
);

const emptyForm = { need: "", body: "", name: "", email: "", phone: "", message: "" };

const LinksAutoMotors = () => {
  const engine = useEngine();
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [step, setStep] = useState(0);
  const [stepAuto, setStepAuto] = useState(true);
  const [wiz, setWiz] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [photo, setPhoto] = useState<number | null>(null);
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  useEffect(() => {
    document.title = "Links Auto Motors | Drive the Future with Confidence";
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  // the journey advances by itself until the visitor takes over
  useEffect(() => {
    if (!stepAuto) return;
    const t = window.setInterval(() => setStep((s) => (s + 1) % journey.length), 3200);
    return () => window.clearInterval(t);
  }, [stepAuto]);

  const ask = useCallback((need: string) => {
    setForm((f) => ({ ...f, need }));
    setWiz(need ? 1 : 0);
    setMenu(false);
    setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 50);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

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
          phone: form.phone,
          companyEnquire: `Links Auto Motors - ${form.need}`.slice(0, 100),
          additionalDetails: [form.body && `Vehicle type: ${form.body}`, form.message].filter(Boolean).join("\n"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed");
      setStatus("sent");
      setForm(emptyForm);
      setWiz(0);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  const J = journey[step];
  const btnRed = "inline-flex items-center justify-center rounded-full bg-[var(--lam-red)] px-8 py-4 text-base font-bold text-white shadow-lg shadow-red-900/30 transition-all hover:bg-[var(--lam-red-dark)] active:translate-y-px";
  const btnGhost = "inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-4 text-base font-bold text-white transition-colors hover:border-white hover:bg-white/10";
  const input = "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none transition-colors placeholder:text-white/40 focus:border-[var(--lam-red)]";

  return (
    <div className="lam min-h-screen overflow-x-clip">
      {/* group bar */}
      <div className="flex items-center justify-between gap-4 bg-black px-4 py-2 text-[11px] uppercase tracking-[0.15em] text-white/60 sm:px-8">
        <Link to="/" className="font-semibold text-[#ff4a50] hover:text-white">&larr; K Group Kenya</Link>
        <span className="hidden sm:inline">Automotive wing of K Group Kenya</span>
      </div>

      {/* header */}
      <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? "border-black/10 bg-white/95 shadow-md backdrop-blur" : "border-transparent bg-white"}`}>
        <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-3" aria-label="Links Auto Motors home">
            <img src="/COMPANY LOGOS/LINKSAUTOMOTORS.jpg" alt="" className="h-11 w-11 rounded-full border-2 border-[var(--lam-red)] bg-white object-contain" />
            <span className="font-heading text-[15px] font-extrabold leading-tight">LINKS AUTO MOTORS<span className="block text-[10px] font-semibold tracking-wider text-[var(--lam-red)]">Automotive Wing of K Group Kenya</span></span>
          </a>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {NAV.map(([id, label]) => (
              <a key={id} href={`#${id}`} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${active === id ? "bg-black text-white" : "text-gray-700 hover:text-[var(--lam-red)]"}`}>{label}</a>
            ))}
            <button type="button" onClick={() => ask("")} className="ml-2 rounded-full bg-[var(--lam-red)] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[var(--lam-red-dark)]">Talk to Links</button>
          </nav>
          <button type="button" className="rounded-full border border-gray-300 p-2.5 md:hidden" aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {menu && (
          <nav className="border-t bg-white px-4 pb-5 md:hidden" aria-label="Mobile navigation">
            {NAV.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className="block border-b border-gray-100 py-3.5 text-sm font-bold">{label}</a>)}
            <button type="button" onClick={() => ask("")} className="mt-4 w-full rounded-full bg-[var(--lam-red)] px-6 py-3 text-sm font-bold text-white">Talk to Links</button>
          </nav>
        )}
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden bg-[var(--lam-dark)] text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_28%,rgba(237,28,36,.35),transparent_32%),linear-gradient(115deg,#07090c,#12161c_58%,#08090b)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-6 pt-16 lg:grid-cols-[1.1fr_.9fr] lg:pt-20">
            <div>
              <Kicker light>K Group Kenya &bull; Automotive</Kicker>
              <h1 className="mt-5 text-[clamp(2.8rem,7vw,5.4rem)] font-extrabold leading-[0.95] tracking-tight">
                Drive the Future <span className="text-[var(--lam-red)]">with Confidence.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg text-gray-300">
                <b className="text-white">Your Automotive Journey. Our Expertise.</b><br />
                From sourcing and acquisition to ownership, trade, resale and restoration, Links helps you make better automotive decisions.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#services" className={btnRed}>Explore services</a>
                <button type="button" onClick={() => ask("")} className={btnGhost}>Talk to Links</button>
              </div>
            </div>

            {/* engine */}
            <div className="mx-auto w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur">
              <Tachometer rpm={engine.rpm} on={engine.on} />
              <div className="mt-4 flex items-center justify-center gap-3">
                <button type="button" onClick={engine.toggle} aria-pressed={engine.on} className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-colors ${engine.on ? "bg-white text-black" : "bg-[var(--lam-red)] text-white lam-pulse"}`}>
                  <Power className="h-4 w-4" /> {engine.on ? "Stop engine" : "Start engine"}
                </button>
                <button
                  type="button"
                  disabled={!engine.on}
                  onPointerDown={() => engine.rev(true)}
                  onPointerUp={() => engine.rev(false)}
                  onPointerLeave={() => engine.rev(false)}
                  onKeyDown={(e) => (e.key === " " || e.key === "Enter") && engine.rev(true)}
                  onKeyUp={(e) => (e.key === " " || e.key === "Enter") && engine.rev(false)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-bold transition-colors enabled:hover:bg-white/10 disabled:opacity-40"
                >
                  <Gauge className="h-4 w-4" /> Hold to rev
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-400">Turn your sound on, then start the engine.</p>
            </div>
          </div>

          {/* road + car */}
          <div className="relative mx-auto mt-4 max-w-6xl px-4">
            <div className="lam-drive mx-auto w-full max-w-3xl">
              <div style={{ ["--wheel" as string]: engine.on ? (engine.rpm > 3000 ? "0.25s" : "0.6s") : "2.4s" }}>
                <CarArt on={engine.on} />
              </div>
            </div>
          </div>
          <div className="relative h-10 overflow-hidden bg-[#0d0f13]" aria-hidden="true">
            <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
            <div className="lam-roadline absolute left-0 top-1/2 flex w-[calc(100%+240px)] -translate-y-1/2 gap-[60px]" style={{ ["--road" as string]: engine.on ? (engine.rpm > 3000 ? "0.35s" : "0.9s") : "6s" }}>
              {Array.from({ length: 44 }).map((_, i) => <span key={i} className="h-1 w-[60px] shrink-0 rounded bg-white/25" />)}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-20 py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-2">
            <Reveal>
              <Kicker>Who we are</Kicker>
              <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight">More than a dealership.</h2>
              <p className="mt-5 text-lg leading-relaxed text-gray-600">
                Links Auto Motors is an automotive consultancy and solutions company built around one simple purpose: <b className="text-black">to help people make better automotive decisions.</b>
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                Born from a genuine passion for cars, automotive sports, building and restoration, Links brings practical automotive understanding into the buying and ownership journey.
              </p>
              <blockquote className="mt-8 border-l-4 border-[var(--lam-red)] pl-5 font-heading text-2xl font-extrabold leading-snug">
                &ldquo;We don't just help you buy a car. We help you make the right automotive decision.&rdquo;
              </blockquote>
            </Reveal>
            <Reveal delay={120}>
              <div className="relative mx-auto max-w-lg pb-10 pr-6">
                <div className="absolute -left-4 -top-4 h-[calc(100%-2.5rem)] w-[calc(100%-1.5rem)] rounded-2xl bg-[var(--lam-red)]" aria-hidden="true" />
                <img src="/GALLERY/links auto motors/links 4.jpg" alt="Technician working on a car in the Links workshop" loading="lazy" decoding="async" className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-2xl" />
                <img src="/GALLERY/links auto motors/links 2.jpg" alt="Engine bay inspection" loading="lazy" decoding="async" className="absolute -bottom-0 right-0 aspect-square w-2/5 rounded-2xl border-8 border-white object-cover shadow-2xl" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-20 bg-[var(--lam-dark)] py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <Kicker light>What we do</Kicker>
              <h2 className="mt-4 max-w-2xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight">Automotive solutions built around you.</h2>
              <p className="mt-4 text-lg text-gray-400">One trusted partner across the vehicle life cycle.</p>
            </Reveal>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={(i % 4) * 80}>
                  <button type="button" onClick={() => ask(s.title)} className="group relative flex h-full min-h-[15rem] w-full flex-col overflow-hidden rounded-2xl border border-[var(--lam-line)] bg-[var(--lam-panel)] p-6 text-left transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--lam-red)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--lam-red)]">
                    <span className="absolute -right-2 -top-4 select-none font-heading text-7xl font-extrabold text-white/[0.04] transition-colors group-hover:text-[var(--lam-red)]/20">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--lam-red)] text-white transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
                      <s.icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-heading text-lg font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.text}</p>
                    <span className="mt-auto inline-flex items-center gap-1 pt-5 text-xs font-bold uppercase tracking-wider text-[#ff4a50] opacity-0 transition-opacity group-hover:opacity-100">Ask about this <ChevronRight className="h-4 w-4" /></span>
                  </button>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* JOURNEY */}
        <section id="journey" className="scroll-mt-20 py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <Kicker>The Links customer journey</Kicker>
              <h2 className="mt-4 max-w-2xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight">From sourcing to ownership, and beyond.</h2>
              <p className="mt-4 text-lg text-gray-600">One customer. One vehicle. One complete journey.</p>
            </Reveal>

            {/* the road */}
            <div className="relative mt-14 hidden md:block">
              <div className="absolute left-0 right-0 top-[34px] h-1 rounded bg-gray-200" />
              <div className="absolute left-0 top-[34px] h-1 rounded bg-[var(--lam-red)] transition-all duration-700" style={{ width: `${(step / (journey.length - 1)) * 100}%` }} />
              <ol className="relative grid grid-cols-8">
                {journey.map((j, i) => (
                  <li key={j.title} className="text-center">
                    <button type="button" onClick={() => { setStep(i); setStepAuto(false); }} aria-current={i === step} aria-label={`Step ${i + 1}: ${j.title}`} className="group mx-auto block focus:outline-none">
                      <span className={`mx-auto flex h-[68px] w-[68px] items-center justify-center rounded-full border-4 transition-all duration-300 ${i === step ? "scale-110 border-[var(--lam-red)] bg-[var(--lam-red)] text-white shadow-xl shadow-red-500/30" : i < step ? "border-[var(--lam-red)] bg-white text-[var(--lam-red)]" : "border-gray-200 bg-white text-gray-400 group-hover:border-gray-400"}`}>
                        <j.icon className="h-7 w-7" aria-hidden="true" />
                      </span>
                      <span className={`mt-3 block text-sm font-bold ${i === step ? "text-black" : "text-gray-500"}`}>{j.title}</span>
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            {/* mobile: horizontal pills */}
            <div className="mt-10 flex gap-2 overflow-x-auto pb-2 md:hidden" role="tablist" aria-label="Journey steps">
              {journey.map((j, i) => (
                <button key={j.title} type="button" role="tab" aria-selected={i === step} onClick={() => { setStep(i); setStepAuto(false); }} className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition-colors ${i === step ? "bg-[var(--lam-red)] text-white" : "bg-gray-100 text-gray-700"}`}>{i + 1}. {j.title}</button>
              ))}
            </div>

            <div className="mx-auto mt-10 grid max-w-3xl items-center gap-6 rounded-3xl bg-[var(--lam-dark)] p-8 text-white shadow-2xl sm:grid-cols-[auto_1fr]" aria-live="polite">
              <span className="font-heading text-7xl font-extrabold leading-none text-[var(--lam-red)]">{String(step + 1).padStart(2, "0")}</span>
              <div key={step}>
                <h3 className="font-heading text-2xl font-extrabold">{J.title}</h3>
                <p className="mt-2 text-lg text-gray-300">{J.text}</p>
              </div>
            </div>
            <div className="mt-5 text-center">
              <button type="button" onClick={() => setStepAuto((a) => !a)} className="text-sm font-semibold text-gray-500 underline-offset-4 hover:text-black hover:underline">{stepAuto ? "Pause the tour" : "Play the tour"}</button>
            </div>
          </div>
        </section>

        {/* WORKSHOP */}
        <section className="bg-gray-50 py-16 md:py-20">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <Kicker>Hands-on</Kicker>
              <h2 className="mt-4 max-w-2xl text-[clamp(1.9rem,4vw,2.8rem)] font-extrabold leading-tight tracking-tight">Real checks on real vehicles.</h2>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
              {workshop.map((p, i) => (
                <button key={p.src} type="button" onClick={() => setPhoto(i)} aria-label={`Enlarge photo: ${p.alt}`} className={`group relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-red-300 ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}>
                  <img src={p.src} alt={p.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section className="bg-[var(--lam-dark)] py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <Kicker light>Why Links</Kicker>
              <h2 className="mt-4 max-w-2xl text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight">Built on knowledge. Driven by trust.</h2>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-[var(--lam-line)] sm:grid-cols-2 lg:grid-cols-4">
              {why.map((w, i) => (
                <Reveal key={w.title} delay={i * 90} className="bg-[var(--lam-dark)]">
                  <div className="group h-full p-8 transition-colors hover:bg-[var(--lam-panel)]">
                    <w.icon className="h-9 w-9 text-[var(--lam-red)] transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
                    <h3 className="mt-5 font-heading text-xl font-bold">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-400">{w.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FOUNDER */}
        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 lg:grid-cols-[.8fr_1.2fr]">
            <Reveal>
              <img src="/links/founder.jpg" alt="Daniel Nyandega Osoro" loading="lazy" decoding="async" className="mx-auto aspect-[3/4] w-full max-w-sm rounded-2xl object-cover object-top shadow-2xl" />
            </Reveal>
            <Reveal delay={120}>
              <Kicker>Leadership</Kicker>
              <h2 className="mt-4 text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-[1.02] tracking-tight">Daniel Nyandega Osoro</h2>
              <h3 className="mt-2 font-heading text-lg font-bold text-[var(--lam-red)]">Founder &amp; Director</h3>
              <p className="mt-5 text-lg leading-relaxed text-gray-700">
                Links began with a love for cars and automotive sports, developed through building and restoring vehicles and a growing understanding of how people can make better automotive decisions.
              </p>
              <p className="mt-4 leading-relaxed text-gray-600">
                As people began seeking advice and asking for help buying cars, a clear gap emerged: customers needed more than a seller. They needed someone who understood their needs and could guide the journey.
              </p>
              <p className="mt-4 font-heading text-xl font-extrabold">That idea is at the heart of Links Auto Motors today.</p>
            </Reveal>
          </div>
        </section>

        {/* VISION */}
        <section id="vision" className="scroll-mt-20 bg-[var(--lam-dark)] py-20 text-white md:py-28">
          <div className="mx-auto max-w-6xl px-4">
            <Reveal>
              <div className="relative overflow-hidden rounded-3xl border border-[#343943] bg-gradient-to-br from-[#11141a] to-[#08090b] p-8 sm:p-14">
                <span className="pointer-events-none absolute -right-4 -top-12 select-none font-heading text-[16rem] font-extrabold leading-none text-white/[0.05] sm:text-[22rem]" aria-hidden="true">10</span>
                <Kicker light>The 10-year vision</Kicker>
                <h2 className="relative mt-4 max-w-3xl text-[clamp(2rem,4.6vw,3.6rem)] font-extrabold leading-[1.05] tracking-tight">To become the number one automotive consultancy firm.</h2>
                <p className="relative mt-5 text-xl text-gray-300">Beginning in Kenya and expanding capabilities across East Africa.</p>
                <p className="relative mt-4 max-w-3xl leading-relaxed text-gray-400">
                  Our ambition is to become the company people turn to whenever they need automotive advice, sourcing, acquisition support, ownership guidance, trade, resale or restoration.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CONTACT / WIZARD */}
        <section id="contact" className="scroll-mt-16 bg-[var(--lam-red)] py-20 text-white md:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <h2 className="text-[clamp(2.4rem,5.4vw,4rem)] font-extrabold leading-[0.98] tracking-tight">Have an automotive question?</h2>
              <p className="mt-5 max-w-md text-lg text-white/90">Start with Links. Let's make your next automotive decision with clarity and confidence.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={`https://wa.me/${PHONE.wa}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-bold text-black transition-colors hover:bg-black hover:text-white"><MessageCircle className="h-5 w-5" /> WhatsApp Links</a>
                <a href={`tel:${PHONE.tel}`} className="inline-flex items-center gap-2 rounded-full border-2 border-white px-7 py-3.5 font-bold transition-colors hover:bg-white hover:text-[var(--lam-red)]"><Phone className="h-5 w-5" /> Call Links</a>
              </div>
              <ul className="mt-8 space-y-2 text-sm text-white/90">
                <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> Phone / WhatsApp: {PHONE.display}</li>
                <li className="flex items-center gap-2"><Instagram className="h-4 w-4" /> Social media: {HANDLE}</li>
                <li><a href={FACEBOOK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline"><Facebook className="h-4 w-4" /> Facebook: linksautomotors</a></li>
              </ul>
            </Reveal>

            <Reveal delay={120}>
              <form onSubmit={onSubmit} className="rounded-3xl bg-[var(--lam-dark)] p-6 shadow-2xl sm:p-9">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl font-extrabold">Tell us what you need</h3>
                  <span className="text-xs font-bold text-white/50">Step {Math.min(wiz + 1, 3)} of 3</span>
                </div>
                <div className="mt-3 flex gap-1.5" aria-hidden="true">
                  {[0, 1, 2].map((i) => <span key={i} className={`h-1 flex-1 rounded transition-colors ${i <= wiz ? "bg-[var(--lam-red)]" : "bg-white/15"}`} />)}
                </div>

                {wiz === 0 && (
                  <fieldset className="mt-6">
                    <legend className="text-sm font-semibold text-white/80">What do you need help with?</legend>
                    <div className="mt-4 grid gap-2 sm:grid-cols-2">
                      {needs.map((n) => (
                        <button key={n} type="button" onClick={() => { setForm((f) => ({ ...f, need: n })); setWiz(1); }} className={`rounded-xl border px-4 py-3.5 text-left text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-[var(--lam-red)] ${form.need === n ? "border-[var(--lam-red)] bg-[var(--lam-red)]/20" : "border-white/15 bg-white/5"}`}>{n}</button>
                      ))}
                    </div>
                  </fieldset>
                )}

                {wiz === 1 && (
                  <fieldset className="mt-6">
                    <legend className="text-sm font-semibold text-white/80">What kind of vehicle? <span className="text-white/40">(for {form.need.toLowerCase()})</span></legend>
                    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {bodyTypes.map((b) => (
                        <button key={b} type="button" onClick={() => { setForm((f) => ({ ...f, body: b })); setWiz(2); }} className={`rounded-xl border px-3 py-3.5 text-sm font-bold transition-all hover:-translate-y-0.5 hover:border-[var(--lam-red)] ${form.body === b ? "border-[var(--lam-red)] bg-[var(--lam-red)]/20" : "border-white/15 bg-white/5"}`}>{b}</button>
                      ))}
                    </div>
                    <button type="button" onClick={() => setWiz(0)} className="mt-4 text-sm font-semibold text-white/60 hover:text-white">&larr; Back</button>
                  </fieldset>
                )}

                {wiz >= 2 && (
                  <div className="mt-6 space-y-4">
                    <p className="text-sm text-white/70">{form.need}{form.body && ` · ${form.body}`}</p>
                    <input name="name" value={form.name} onChange={onChange} required autoComplete="name" placeholder="Your name" aria-label="Your name" className={input} />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <input name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" placeholder="Email" aria-label="Email" className={input} />
                      <input name="phone" type="tel" value={form.phone} onChange={onChange} required autoComplete="tel" placeholder="Phone / WhatsApp" aria-label="Phone or WhatsApp" className={input} />
                    </div>
                    <textarea name="message" value={form.message} onChange={onChange} rows={3} placeholder="Anything else we should know?" aria-label="Message" className={input} />
                    <div className="flex items-center gap-3">
                      <button type="button" onClick={() => setWiz(1)} className="rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold hover:bg-white/10">Back</button>
                      <button type="submit" disabled={status === "sending"} className={`${btnRed} flex-1 disabled:opacity-60`}>
                        {status === "sending" ? "Sending…" : "Send to Links"} <Send className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                <p role="status" aria-live="polite" className={`mt-4 text-sm ${status === "error" ? "text-[#ff8a8f]" : "font-semibold text-green-400"}`}>
                  {status === "sent" && "Thank you. Links has your request and will be in touch."}
                  {status === "error" && `We couldn't send that just now (${errorMsg}). Please WhatsApp or call ${PHONE.display}.`}
                </p>
              </form>
            </Reveal>
          </div>
        </section>
      </main>

      {/* footer */}
      <footer className="bg-[#08090b] px-4 py-12 text-white">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 md:flex-row">
          <div>
            <p className="font-heading text-xl font-extrabold"><span className="text-[var(--lam-red)]">LINKS</span> AUTO MOTORS</p>
            <p className="mt-1 text-sm text-gray-500">Automotive Wing of K Group Kenya</p>
            <p className="mt-4 text-sm text-gray-400">Drive the Future with Confidence.</p>
          </div>
          <div className="text-sm text-gray-400">
            <p>Phone / WhatsApp: {PHONE.display}</p>
            <p className="mt-1">Social: {HANDLE}</p>
            <p className="mt-4"><Link to="/" className="underline hover:text-white">K Group Kenya</Link> &middot; &copy; {new Date().getFullYear()} K Group Kenya</p>
          </div>
        </div>
      </footer>

      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top" className={`fixed bottom-6 left-6 z-40 rounded-full bg-[var(--lam-red)] p-3 text-white shadow-xl transition-all hover:scale-110 ${scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}>
        <ArrowUp className="h-5 w-5" />
      </button>

      <Dialog open={photo !== null} onOpenChange={(o) => !o && setPhoto(null)}>
        <DialogContent className="max-w-4xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{photo !== null ? workshop[photo].alt : "Photo"}</DialogTitle>
          <DialogDescription className="sr-only">Enlarged workshop photo</DialogDescription>
          {photo !== null && <img src={workshop[photo].src} alt={workshop[photo].alt} className="max-h-[85vh] w-full rounded-2xl object-contain" />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LinksAutoMotors;
