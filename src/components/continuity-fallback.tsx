import { brandBracketBottom, brandBracketTop, brandMarkViewBox } from "@/lib/brand-mark";

export function ContinuityFallback() {
  return (
    <svg className="assembly-fallback" viewBox={brandMarkViewBox} fill="none" aria-hidden="true">
      <ellipse cx="280" cy="445" rx="160" ry="30" fill="#101b35" opacity=".08" />
      <g className="fb-float">
        <g className="fb-bracket fb-bracket-bottom">
          <path d={brandBracketBottom} fill="#101b35" />
          <line x1="155" y1="395" x2="180" y2="370" stroke="#7F00FD" strokeWidth="4" strokeLinecap="round" />
        </g>
        <g className="fb-bracket fb-bracket-top">
          <path d={brandBracketTop} fill="#2457ff" />
          <line x1="380" y1="170" x2="405" y2="195" stroke="#7F00FD" strokeWidth="4" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
}
