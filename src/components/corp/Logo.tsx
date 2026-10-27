/**
 * K Group Kenya mark, redrawn as vector from the master logo concept
 * (gold K with a sweeping arc). Replace with the final artwork when approved.
 */
export const KMark = ({ className = "h-10 w-10", arc = "#F8F9FB" }: { className?: string; arc?: string }) => (
  <svg viewBox="0 0 450 460" className={className} role="img" aria-label="K Group Kenya mark" fill="none">
    <g fill="#D4AF37">
      <rect x="30" y="20" width="120" height="430" />
      <polygon points="150,190 300,20 440,20 270,215" />
      <polygon points="150,280 270,215 445,450 305,450" />
    </g>
    <path d="M0 232 Q225 40 440 240" stroke={arc} strokeWidth="14" strokeLinecap="round" />
    <path d="M10 250 Q225 70 445 262" stroke="#D4AF37" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

/** Mark plus wordmark. `tone` is the colour of the "K GROUP" text. */
export const Logo = ({ tone = "light", className = "" }: { tone?: "light" | "dark"; className?: string }) => (
  <span className={`inline-flex items-center gap-3 ${className}`}>
    <KMark className="h-9 w-9" arc={tone === "light" ? "#F8F9FB" : "#0B1F3B"} />
    <span className="leading-none">
      <span className={`block font-heading text-lg font-extrabold tracking-wide ${tone === "light" ? "text-white" : "text-navy"}`}>K GROUP</span>
      <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.5em] text-gold">Kenya</span>
    </span>
  </span>
);
