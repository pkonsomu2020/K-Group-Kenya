import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

// C major pentatonic, the scale behind most benga guitar lines.
const N = { G1: 49.0, A1: 55.0, C2: 65.41, G2: 98.0, C3: 130.81, C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.0, A4: 440.0, C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99 };

type Pad = { label: string; kind: "pluck" | "shaker" | "bell"; freq?: number };
const PADS: Pad[] = [
  { label: "C", kind: "pluck", freq: N.C4 },
  { label: "D", kind: "pluck", freq: N.D4 },
  { label: "E", kind: "pluck", freq: N.E4 },
  { label: "G", kind: "pluck", freq: N.G4 },
  { label: "A", kind: "pluck", freq: N.A4 },
  { label: "high C", kind: "pluck", freq: N.C5 },
  { label: "kayamba shaker", kind: "shaker" },
  { label: "kengele bell", kind: "bell" },
];

const BARS = 14;
const PITCH_RANGE = 10; // percent
const DECKS = [
  { id: "A", name: "Benga", bpm: 118, file: "/audio/deck-a.mp3" },
  { id: "B", name: "Gengetone", bpm: 110, file: "/audio/deck-b.mp3" },
] as const;
const stepMs = (bpm: number) => 60000 / bpm / 4;

// Deck A: bouncy benga guitars over a steady kick
const LEAD: Record<number, number>[] = [
  { 0: N.E5, 2: N.G5, 3: N.E5, 5: N.D5, 6: N.E5, 8: N.C5, 10: N.D5, 11: N.E5, 13: N.G5, 14: N.E5 },
  { 0: N.G5, 2: N.E5, 3: N.D5, 5: N.E5, 6: N.G5, 8: N.A4 * 2, 10: N.G5, 11: N.E5, 13: N.D5, 14: N.C5 },
];
const RHYTHM: Record<number, number> = { 1: N.G4, 3: N.A4, 5: N.G4, 7: N.E4, 9: N.G4, 11: N.A4, 13: N.G4, 15: N.E4 };
const BASS_A: Record<number, number> = { 0: N.C2, 3: N.C2, 6: N.G1, 8: N.A1, 11: N.A1, 14: N.G1 };

// Deck B: gengetone-style 3-3-2 kicks, deep 808 bass and short stabs
const KICK_B = [0, 3, 6, 8, 11, 14];
const BASS_B: Record<number, number> = { 0: N.C2, 6: N.C2, 8: N.G1, 14: N.A1 };
const STAB_B: Record<number, number> = { 2: N.E4, 5: N.G4, 9: N.A4, 13: N.G4 };

/** A platter you can grab and scrub, like vinyl. */
const Platter = ({
  label,
  logo,
  spinning,
  onGrab,
  onScratch,
}: {
  label: string;
  logo: string;
  spinning: boolean;
  onGrab: (grabbed: boolean) => void;
  onScratch: (speed: number) => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ a: number; t: number } | null>(null);
  const [angle, setAngle] = useState(0);
  const [grabbed, setGrabbed] = useState(false);

  const angleOf = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return (Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180) / Math.PI;
  };

  const end = () => {
    if (!drag.current) return;
    drag.current = null;
    setGrabbed(false);
    onGrab(false);
  };

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`${label} platter. Drag to scratch.`}
      className="relative aspect-square w-full cursor-grab touch-none rounded-full bg-[#111] shadow-[inset_0_0_0_6px_#1c1c1c,0_6px_14px_rgba(0,0,0,.45)] active:cursor-grabbing"
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        drag.current = { a: angleOf(e), t: performance.now() };
        setGrabbed(true);
        onGrab(true);
      }}
      onPointerMove={(e) => {
        if (!drag.current) return;
        const a = angleOf(e);
        let d = a - drag.current.a;
        if (d > 180) d -= 360;
        if (d < -180) d += 360;
        const now = performance.now();
        const speed = Math.abs(d) / Math.max(1, now - drag.current.t);
        drag.current = { a, t: now };
        setAngle((x) => x + d);
        if (Math.abs(d) > 0.5) onScratch(speed);
      }}
      onPointerUp={end}
      onPointerCancel={end}
    >
      <div className="absolute inset-[7%] rounded-full" style={{ transform: `rotate(${angle}deg)` }}>
        <div
          className={`absolute inset-0 rounded-full ${spinning && !grabbed ? "dj-spin" : ""}`}
          style={{ background: "repeating-radial-gradient(circle, #1a1a1a 0 2px, #0b0b0b 2px 4px)" }}
        >
          <div className="absolute left-1/2 top-[6%] h-[10%] w-[3px] -translate-x-1/2 rounded bg-white/50" />
          <img
            src={logo}
            alt=""
            draggable={false}
            className="absolute inset-[30%] h-[40%] w-[40%] rounded-full border-2 border-brand-red bg-white object-contain"
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Interactive two-deck DJ set for the home hero. Press play on each deck,
 * match the tempos with the pitch sliders (or SYNC), then blend with the
 * crossfader. Drag a platter to scratch. All sound is synthesised with the
 * Web Audio API and only starts after a click or tap.
 */
const DJHero = ({ logo = "/COMPANY LOGOS/K-GROUP.jpg", title = "K·GROUP DECK" }: { logo?: string; title?: string }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const deckGainRef = useRef<GainNode[]>([]);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const noiseRef = useRef<AudioBuffer | null>(null);
  const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const stepRef = useRef([0, 0]);
  const customRef = useRef<(AudioBufferSourceNode | null)[]>([null, null]);
  const customBufRef = useRef<(AudioBuffer | null | undefined)[]>([undefined, undefined]);
  const lastScratch = useRef(0);

  const [playing, setPlaying] = useState([false, false]);
  const [pitch, setPitch] = useState([0, 0]); // percent
  const [grabbed, setGrabbed] = useState([false, false]);
  const [cross, setCross] = useState(0.5);
  const [volume, setVolume] = useState(0.7);
  const [activePad, setActivePad] = useState<number | null>(null);

  const pitchRef = useRef(pitch);
  pitchRef.current = pitch;

  const bpmOf = (d: number) => DECKS[d].bpm * (1 + pitch[d] / 100);
  const inSync = playing[0] && playing[1] && Math.abs(bpmOf(0) - bpmOf(1)) < 0.6;

  const ensureAudio = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0.7;
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      master.connect(analyser);
      analyser.connect(ctx.destination);
      deckGainRef.current = [0, 1].map(() => {
        const g = ctx.createGain();
        g.connect(master);
        return g;
      });

      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.5, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

      ctxRef.current = ctx;
      masterRef.current = master;
      analyserRef.current = analyser;
      noiseRef.current = buf;
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume();
    return ctxRef.current;
  }, []);

  // ---- instruments -------------------------------------------------------
  const kick = (ctx: AudioContext, out: AudioNode, vol = 1) => {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.frequency.setValueAtTime(140, t);
    osc.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.28);
    osc.connect(g).connect(out);
    osc.start(t);
    osc.stop(t + 0.3);
  };

  const noiseHit = (ctx: AudioContext, out: AudioNode, freq: number, dur: number, vol: number, type: BiquadFilterType = "highpass") => {
    if (!noiseRef.current) return;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = noiseRef.current;
    const filter = ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(filter).connect(g).connect(out);
    src.start(t);
    src.stop(t + dur);
  };

  // Plucked string, a bit like a benga guitar or a nyatiti.
  const pluck = (ctx: AudioContext, out: AudioNode, freq: number, vol = 0.35, dur = 0.45) => {
    const t = ctx.currentTime;
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(freq * 7, t);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.5, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.006);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    filter.connect(g).connect(out);
    [-6, 6].forEach((detune) => {
      const osc = ctx.createOscillator();
      osc.type = "sawtooth";
      osc.frequency.value = freq;
      osc.detune.value = detune;
      osc.connect(filter);
      osc.start(t);
      osc.stop(t + dur + 0.05);
    });
  };

  const bass = (ctx: AudioContext, out: AudioNode, freq: number, dur = 0.3, type: OscillatorType = "triangle") => {
    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = type;
    osc.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.7, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    osc.connect(g).connect(out);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  };

  const bell = (ctx: AudioContext, out: AudioNode, vol = 0.25) => {
    const t = ctx.currentTime;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 900;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    filter.connect(g).connect(out);
    [540, 810].forEach((f) => {
      const osc = ctx.createOscillator();
      osc.type = "square";
      osc.frequency.value = f;
      osc.connect(filter);
      osc.start(t);
      osc.stop(t + 0.2);
    });
  };

  // Kayamba-style rattle
  const shaker = (ctx: AudioContext, out: AudioNode, long = false) =>
    noiseHit(ctx, out, 5200, long ? 0.35 : 0.05, long ? 0.4 : 0.14);

  // One 16th-note step of each deck's groove
  const playStep = (deck: number, ctx: AudioContext, out: AudioNode) => {
    const n = stepRef.current[deck];
    const s = n % 16;
    if (deck === 0) {
      const bar = Math.floor(n / 16) % 2;
      if (s % 4 === 0) kick(ctx, out, s === 0 ? 1 : 0.75);
      if (s === 10) kick(ctx, out, 0.5);
      if (s === 4 || s === 12) noiseHit(ctx, out, 1800, 0.12, 0.45);
      shaker(ctx, out);
      if ([0, 3, 8, 11].includes(s)) bell(ctx, out);
      if (BASS_A[s]) bass(ctx, out, BASS_A[s]);
      if (RHYTHM[s]) pluck(ctx, out, RHYTHM[s], 0.16, 0.25);
      if (LEAD[bar][s]) pluck(ctx, out, LEAD[bar][s], 0.28, 0.4);
    } else {
      if (KICK_B.includes(s)) kick(ctx, out, s === 0 ? 1 : 0.8);
      if (s === 4 || s === 12) noiseHit(ctx, out, 1500, 0.14, 0.5);
      if (s % 4 === 2) noiseHit(ctx, out, 6500, 0.12, 0.2);
      else if (s % 2 === 1) noiseHit(ctx, out, 8000, 0.03, 0.1);
      if (BASS_B[s]) bass(ctx, out, BASS_B[s], 0.45, "sine");
      if (STAB_B[s]) pluck(ctx, out, STAB_B[s], 0.2, 0.18);
    }
    stepRef.current[deck] = n + 1;
  };

  // ---- optional real tracks ---------------------------------------------
  const loadCustom = useCallback(async (deck: number, ctx: AudioContext) => {
    if (customBufRef.current[deck] !== undefined) return customBufRef.current[deck];
    try {
      const res = await fetch(DECKS[deck].file);
      if (!res.ok || !(res.headers.get("content-type") || "").startsWith("audio")) throw new Error("none");
      customBufRef.current[deck] = await ctx.decodeAudioData(await res.arrayBuffer());
    } catch {
      customBufRef.current[deck] = null;
    }
    return customBufRef.current[deck] ?? null;
  }, []);

  // ---- deck playback -----------------------------------------------------
  const startDeck = (deck: number) => {
    const ctx = ensureAudio();
    const out = deckGainRef.current[deck];
    let timer = 0;
    let cancelled = false;
    loadCustom(deck, ctx).then((buf) => {
      if (cancelled) return;
      if (buf) {
        const src = ctx.createBufferSource();
        src.buffer = buf;
        src.loop = true;
        src.playbackRate.value = 1 + pitchRef.current[deck] / 100;
        src.connect(out);
        src.start();
        customRef.current[deck] = src;
        return;
      }
      const tick = () => {
        if (cancelled) return;
        playStep(deck, ctx, out);
        timer = window.setTimeout(tick, stepMs(DECKS[deck].bpm * (1 + pitchRef.current[deck] / 100)));
      };
      tick();
    });
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      try { customRef.current[deck]?.stop(); } catch { /* already stopped */ }
      customRef.current[deck] = null;
    };
  };

  useEffect(() => (playing[0] ? startDeck(0) : undefined), [playing[0]]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => (playing[1] ? startDeck(1) : undefined), [playing[1]]); // eslint-disable-line react-hooks/exhaustive-deps

  // real tracks follow the pitch slider
  useEffect(() => {
    [0, 1].forEach((d) => {
      const src = customRef.current[d];
      if (src) src.playbackRate.value = 1 + pitch[d] / 100;
    });
  }, [pitch]);

  // crossfader (equal power), master volume and platter-hold ducking
  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx || deckGainRef.current.length === 0) return;
    const gains = [Math.cos((cross * Math.PI) / 2), Math.sin((cross * Math.PI) / 2)];
    deckGainRef.current.forEach((g, d) => g.gain.setTargetAtTime(gains[d] * (grabbed[d] ? 0.2 : 1), ctx.currentTime, 0.02));
  }, [cross, grabbed, playing]);

  useEffect(() => {
    if (masterRef.current && ctxRef.current) {
      masterRef.current.gain.setTargetAtTime(volume, ctxRef.current.currentTime, 0.02);
    }
  }, [volume, playing]);

  // equaliser bars
  const anyPlaying = playing[0] || playing[1];
  useEffect(() => {
    let raf = 0;
    const data = new Uint8Array(32);
    const tick = () => {
      const analyser = analyserRef.current;
      if (analyser && anyPlaying) analyser.getByteFrequencyData(data);
      barRefs.current.forEach((el, i) => {
        if (!el) return;
        const v = anyPlaying && analyser ? data[Math.min(i + 1, 31)] / 255 : 0.08;
        el.style.transform = `scaleY(${Math.max(0.08, v)})`;
      });
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, [anyPlaying]);

  useEffect(() => () => { ctxRef.current?.close(); }, []);

  // ---- controls ----------------------------------------------------------
  const toggleDeck = (d: number) => {
    ensureAudio();
    setPlaying((p) => p.map((v, i) => (i === d ? !v : v)));
  };
  const setDeckPitch = (d: number, v: number) => setPitch((p) => p.map((x, i) => (i === d ? v : x)));
  const sync = (d: number) => {
    const other = 1 - d;
    const target = (bpmOf(other) / DECKS[d].bpm - 1) * 100;
    setDeckPitch(d, Math.max(-PITCH_RANGE, Math.min(PITCH_RANGE, Math.round(target * 10) / 10)));
  };
  const onGrab = (d: number, g: boolean) => {
    if (g) ensureAudio();
    setGrabbed((p) => p.map((v, i) => (i === d ? g : v)));
  };
  const onScratch = (speed: number) => {
    const now = performance.now();
    if (now - lastScratch.current < 45) return;
    lastScratch.current = now;
    const ctx = ensureAudio();
    noiseHit(ctx, masterRef.current!, 600 + Math.min(speed, 4) * 1200, 0.08, Math.min(0.45, 0.1 + speed * 0.3), "bandpass");
  };
  const onPad = (i: number) => {
    const ctx = ensureAudio();
    const pad = PADS[i];
    const out = masterRef.current!;
    if (pad.kind === "pluck") pluck(ctx, out, pad.freq!, 0.5, 0.7);
    else if (pad.kind === "shaker") shaker(ctx, out, true);
    else bell(ctx, out, 0.5);
    setActivePad(i);
    window.setTimeout(() => setActivePad((p) => (p === i ? null : p)), 160);
  };

  // pointer tilt
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = sceneRef.current;
    if (!el || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${22 - y * 14}deg) rotateY(${x * 22}deg)`;
  };
  const onLeave = () => {
    if (sceneRef.current) sceneRef.current.style.transform = "perspective(1100px) rotateX(22deg) rotateY(0deg)";
  };

  const deckControls = (d: 0 | 1) => (
    <div className="mt-2 space-y-2">
      <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/70">
        <span>Deck {DECKS[d].id} · {DECKS[d].name}</span>
        <span className="font-mono text-white">{bpmOf(d).toFixed(1)} <span className="text-white/50">BPM</span></span>
      </div>
      <div className="flex gap-1.5">
        <button
          type="button"
          onClick={() => toggleDeck(d)}
          aria-pressed={playing[d]}
          aria-label={`${playing[d] ? "Pause" : "Play"} deck ${DECKS[d].id}`}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded-full bg-brand-red px-2 py-1.5 text-[11px] font-bold text-white shadow transition-colors hover:bg-white hover:text-brand-black"
        >
          {playing[d] ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          {playing[d] ? "Pause" : "Play"}
        </button>
        <button
          type="button"
          onClick={() => sync(d)}
          aria-label={`Match deck ${DECKS[d].id} tempo to deck ${DECKS[1 - d].id}`}
          className="rounded-full border border-white/30 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white hover:bg-white/15"
        >
          Sync
        </button>
      </div>
      <label className="block text-[9px] font-bold uppercase tracking-widest text-white/50">
        Pitch {pitch[d] > 0 ? "+" : ""}{pitch[d].toFixed(1)}%
        <input
          type="range"
          min={-PITCH_RANGE}
          max={PITCH_RANGE}
          step={0.1}
          value={pitch[d]}
          onChange={(e) => setDeckPitch(d, parseFloat(e.target.value))}
          className="mt-0.5 w-full accent-[#ef0b0d]"
          aria-label={`Deck ${DECKS[d].id} pitch`}
        />
      </label>
    </div>
  );

  return (
    <div className="relative mx-auto w-full max-w-[600px] select-none" onPointerMove={onMove} onPointerLeave={onLeave}>
      <style>{`
        @keyframes dj-spin { to { transform: rotate(360deg); } }
        @keyframes dj-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .dj-spin { animation: dj-spin 2.4s linear infinite; }
        .dj-float { animation: dj-float 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .dj-spin, .dj-float { animation: none; } }
      `}</style>

      <div className="dj-float">
        <div
          ref={sceneRef}
          className="relative transition-transform duration-200 ease-out"
          style={{ transform: "perspective(1100px) rotateX(22deg) rotateY(0deg)", transformStyle: "preserve-3d" }}
        >
          {/* glass platform */}
          <div
            className="absolute -inset-x-6 -bottom-10 top-10 rounded-[3rem] border border-white/60 bg-gradient-to-br from-rose-100/80 via-white/60 to-red-200/70 shadow-[0_40px_60px_-20px_rgba(239,11,13,.35)] backdrop-blur-md dark:border-white/10 dark:from-red-500/20 dark:via-white/5 dark:to-red-500/25"
            style={{ transform: "translateZ(-40px)" }}
            aria-hidden="true"
          />

          {/* controller */}
          <div className="relative rounded-3xl bg-gradient-to-b from-[#2a2a2a] to-[#0f0f0f] p-4 shadow-[0_30px_50px_-15px_rgba(0,0,0,.55)] ring-1 ring-white/10">
            <div className="mb-3 flex items-center justify-between px-1">
              <span className="text-[10px] font-extrabold tracking-[0.25em] text-white/80">
                {title}
              </span>
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  inSync ? "bg-green-500 text-white" : "bg-white/10 text-white/50"
                }`}
                role="status"
              >
                {inSync ? "In sync" : "Match the BPM"}
              </span>
            </div>

            <div className="grid grid-cols-[1fr_.5fr_1fr] items-start gap-3">
              <div>
                <Platter logo={logo} label="Deck A" spinning={playing[0]} onGrab={(g) => onGrab(0, g)} onScratch={onScratch} />
                {deckControls(0)}
              </div>

              {/* mixer */}
              <div className="flex flex-col items-center gap-3 rounded-xl bg-black/40 p-2">
                <div className="flex h-24 w-full items-end justify-between gap-[2px]" aria-hidden="true">
                  {Array.from({ length: BARS }).map((_, i) => (
                    <span
                      key={i}
                      ref={(el) => { barRefs.current[i] = el; }}
                      className="h-full flex-1 origin-bottom rounded-sm bg-gradient-to-t from-brand-red to-amber-300 transition-transform duration-75"
                      style={{ transform: "scaleY(.08)" }}
                    />
                  ))}
                </div>
                <div className="flex gap-2" aria-hidden="true">
                  {[0, 1].map((k) => (
                    <span key={k} className="h-5 w-5 rounded-full bg-gradient-to-br from-neutral-300 to-neutral-600 ring-2 ring-black/60" />
                  ))}
                </div>
                <label className="w-full text-center text-[9px] font-bold uppercase tracking-widest text-white/60">
                  Master
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="mt-1 w-full accent-[#ef0b0d]"
                    aria-label="Master volume"
                  />
                </label>
              </div>

              <div>
                <Platter logo={logo} label="Deck B" spinning={playing[1]} onGrab={(g) => onGrab(1, g)} onScratch={onScratch} />
                {deckControls(1)}
              </div>
            </div>

            {/* crossfader */}
            <div className="mt-4 flex items-center gap-3 rounded-xl bg-black/40 px-3 py-2">
              <span className="text-xs font-extrabold text-white">A</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={cross}
                onChange={(e) => setCross(parseFloat(e.target.value))}
                className="h-2 w-full accent-[#ef0b0d]"
                aria-label="Crossfader: left is deck A, right is deck B"
              />
              <span className="text-xs font-extrabold text-white">B</span>
            </div>

            {/* pads */}
            <div className="mt-3 grid grid-cols-8 gap-2">
              {PADS.map((pad, i) => (
                <button
                  key={pad.label}
                  type="button"
                  onPointerDown={() => onPad(i)}
                  aria-label={`Play ${pad.label}`}
                  className={`aspect-square rounded-md border border-white/10 transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                    activePad === i ? "scale-95 bg-brand-red shadow-[0_0_18px_#ef0b0d]" : "bg-neutral-700 hover:bg-neutral-500"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="mt-16 text-center text-xs text-muted-foreground">
        Play both decks, match the BPM with Pitch or Sync, then slide the crossfader. Drag a platter to scratch.
      </p>
    </div>
  );
};

export default DJHero;
