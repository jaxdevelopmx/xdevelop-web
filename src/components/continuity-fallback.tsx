export function ContinuityFallback() {
  return (
    <svg className="assembly-fallback" viewBox="0 0 560 560" fill="none" aria-hidden="true">
      <ellipse cx="280" cy="447" rx="172" ry="34" fill="#101b35" opacity=".06" />
      {[0, 1, 2, 3].map((level) => <g key={level} transform={`translate(0 ${level * -65})`}>
        <path d="M109 337 292 271 455 349 273 422Z" fill="#aeb7c6" stroke="#8996aa" />
        <path d="M109 337v12l164 86 182-74v-12l-182 73Z" fill="#8996aa" />
        <path d="m131 325 160-58 142 68-161 63Z" fill={level === 2 ? "#2457ff" : "#ffffff"} stroke="#d1d8e2" />
        <path d="M131 325v20l141 73v-20Z" fill={level === 2 ? "#1945d4" : "#e5eaf0"} />
        <path d="m272 398 161-63v20l-161 63Z" fill={level === 2 ? "#1740bb" : "#d1d8e2"} />
        <path d="m149 345 30 15" stroke="#2457ff" strokeWidth="4" />
      </g>)}
    </svg>
  );
}
