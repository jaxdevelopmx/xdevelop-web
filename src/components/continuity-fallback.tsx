export function ContinuityFallback() {
  return (
    <svg className="assembly-fallback" viewBox="0 0 500 500" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="fallbackGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7F00FD" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#2457ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="bracketGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#dce4ef" />
        </linearGradient>
        <linearGradient id="bracketGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#dce4ef" />
          <stop offset="100%" stopColor="#ffffff" />
        </linearGradient>
        <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="16" floodColor="#101b35" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Ambient background aura */}
      <circle cx="250" cy="250" r="190" fill="url(#fallbackGlow)" />
      <ellipse cx="250" cy="410" rx="140" ry="24" fill="#101b35" opacity="0.07" />

      {/* Rotated Diamond Group at 45 degrees */}
      <g transform="translate(250 250) rotate(-45) translate(-250 -250)" filter="url(#softShadow)">
        {/* Upper-Left Bracket */}
        <path
          d="M170 140 H280 A25 25 0 0 1 305 165 V175 A25 25 0 0 1 280 200 H205 A20 20 0 0 0 185 220 V295 A25 25 0 0 1 160 320 H150 A25 25 0 0 1 125 295 V185 A45 45 0 0 1 170 140 Z"
          fill="url(#bracketGrad1)"
          stroke="#c7d3e3"
          strokeWidth="1.5"
        />

        {/* Lower-Right Bracket */}
        <path
          d="M330 360 H220 A25 25 0 0 1 195 335 V325 A25 25 0 0 1 220 300 H295 A20 20 0 0 0 315 280 V205 A25 25 0 0 1 340 180 H350 A25 25 0 0 1 375 205 V315 A45 45 0 0 1 330 360 Z"
          fill="url(#bracketGrad2)"
          stroke="#c7d3e3"
          strokeWidth="1.5"
        />

        {/* Brand Accent Glowing Tracks */}
        <circle cx="295" cy="182" r="4" fill="#2457ff" />
        <circle cx="205" cy="318" r="4" fill="#7F00FD" />
      </g>
    </svg>
  );
}
