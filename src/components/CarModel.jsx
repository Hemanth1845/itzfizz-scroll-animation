import React from 'react'

export function CarModel({ width = 120, height = 58, className = '' }) {
  return (
    <div
      className={`relative select-none pointer-events-none will-change-transform ${className}`}
      style={{ width, height }}
    >
      <div
        className="absolute -right-10 top-1/2 -translate-y-1/2 w-16 h-12 bg-[#00f0ff]/30 rounded-full blur-md pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#00f0ff]/20 rounded-full blur-md pointer-events-none"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 240 116"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
      >
        <defs>
          <linearGradient id="silverBody" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#334155" />
            <stop offset="25%" stop-color="#64748b" />
            <stop offset="60%" stop-color="#94a3b8" />
            <stop offset="85%" stop-color="#cbd5e1" />
            <stop offset="100%" stop-color="#38bdf8" />
          </linearGradient>

          <linearGradient id="cockpitGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#020617" />
            <stop offset="50%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>

          <linearGradient id="headlightBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#00f0ff" stop-opacity="0" />
          </linearGradient>

          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#00f0ff" flood-opacity="0.8" />
          </filter>
        </defs>

        <rect x="42" y="4" width="28" height="10" rx="2" fill="#090d16" />
        <rect x="170" y="4" width="28" height="10" rx="2" fill="#090d16" />
        <rect x="42" y="102" width="28" height="10" rx="2" fill="#090d16" />
        <rect x="170" y="102" width="28" height="10" rx="2" fill="#090d16" />

        <path
          d="M 16 48 C 14 52 14 64 16 68 L 24 72 L 23 80 C 23 84 27 88 34 88 L 44 88 L 48 94 C 52 100 60 102 70 102 L 86 102 C 94 102 102 98 106 94 L 130 92 L 160 96 C 172 98 182 104 194 104 L 210 104 C 220 104 228 98 232 90 L 236 78 C 238 72 239 65 239 58 C 239 51 238 44 236 38 L 232 26 C 228 18 220 12 210 12 L 194 12 C 182 12 172 18 160 20 L 130 24 L 106 22 C 102 18 94 14 86 14 L 70 14 C 60 14 52 16 48 22 L 44 28 L 34 28 C 27 28 23 32 23 36 L 24 44 Z"
          fill="url(#silverBody)"
        />

        <path
          d="M 78 34 C 98 30 156 30 180 35 C 196 39 206 48 210 58 C 206 68 196 77 180 81 C 156 86 98 86 78 82 C 68 78 62 68 62 58 C 62 48 68 38 78 34 Z"
          fill="url(#cockpitGlass)"
          stroke="#0284c7"
          stroke-width="1"
        />

        <path
          d="M 96 36 C 114 34 150 34 168 37 C 158 43 132 46 106 44 Z"
          fill="#ffffff"
          fill-opacity="0.25"
        />

        <path
          d="M 160 38 C 175 41 184 48 188 58 C 184 68 175 75 160 78 L 152 58 Z"
          fill="#020617"
          fill-opacity="0.9"
        />

        <path
          d="M 216 32 C 224 34 230 40 234 46 L 230 48 C 226 44 220 40 214 38 Z"
          fill="#00f0ff"
          filter="url(#neonGlow)"
        />
        <path
          d="M 216 84 C 224 82 230 76 234 70 L 230 68 C 226 72 220 76 214 78 Z"
          fill="#00f0ff"
          filter="url(#neonGlow)"
        />

        <line x1="18" y1="46" x2="18" y2="70" stroke="#f43f5e" stroke-width="2.5" />
        <circle cx="16" cy="52" r="2" fill="#00f0ff" />
        <circle cx="16" cy="64" r="2" fill="#00f0ff" />

        <path d="M 235 44 L 280 20 L 280 48 Z" fill="url(#headlightBeam)" />
        <path d="M 235 72 L 280 96 L 280 68 Z" fill="url(#headlightBeam)" />
      </svg>
    </div>
  )
}
