import React from 'react'

export function CarModel({ width = 130, height = 62, className = '' }) {
  return (
    <div
      className={`relative select-none pointer-events-none will-change-transform ${className}`}
      style={{ width, height }}
    >
      <div
        className="absolute -right-12 top-1/2 -translate-y-1/2 w-20 h-14 bg-[#00f0ff]/35 rounded-full blur-md pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -left-12 top-1/2 -translate-y-1/2 w-16 h-8 bg-[#00f0ff]/40 rounded-full blur-sm pointer-events-none"
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 260 116"
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]"
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
            <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.85" />
            <stop offset="100%" stop-color="#00f0ff" stop-opacity="0" />
          </linearGradient>

          <linearGradient id="thrusterBeam" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#00f0ff" stop-opacity="0" />
          </linearGradient>

          <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#00f0ff" flood-opacity="0.85" />
          </filter>
        </defs>

        <path d="M 32 46 L -10 38 L 8 48 Z" fill="url(#thrusterBeam)" />
        <path d="M 32 70 L -10 78 L 8 68 Z" fill="url(#thrusterBeam)" />

        <rect x="58" y="4" width="28" height="10" rx="2" fill="#090d16" />
        <rect x="186" y="4" width="28" height="10" rx="2" fill="#090d16" />
        <rect x="58" y="102" width="28" height="10" rx="2" fill="#090d16" />
        <rect x="186" y="102" width="28" height="10" rx="2" fill="#090d16" />

        <path
          d="M 32 48 C 30 52 30 64 32 68 L 40 72 L 39 80 C 39 84 43 88 50 88 L 60 88 L 64 94 C 68 100 76 102 86 102 L 102 102 C 110 102 118 98 122 94 L 146 92 L 176 96 C 188 98 198 104 210 104 L 226 104 C 236 104 244 98 248 90 L 252 78 C 254 72 255 65 255 58 C 255 51 254 44 252 38 L 248 26 C 244 18 236 12 226 12 L 210 12 C 198 12 188 18 176 20 L 146 24 L 122 22 C 118 18 110 14 102 14 L 86 14 C 76 14 68 16 64 22 L 60 28 L 50 28 C 43 28 39 32 39 36 L 40 44 Z"
          fill="url(#silverBody)"
        />

        <path
          d="M 94 34 C 114 30 172 30 196 35 C 212 39 222 48 226 58 C 222 68 212 77 196 81 C 172 86 114 86 94 82 C 84 78 78 68 78 58 C 78 48 84 38 94 34 Z"
          fill="url(#cockpitGlass)"
          stroke="#0284c7"
          stroke-width="1"
        />

        <path
          d="M 112 36 C 130 34 166 34 184 37 C 174 43 148 46 122 44 Z"
          fill="#ffffff"
          fill-opacity="0.25"
        />

        <path
          d="M 176 38 C 191 41 200 48 204 58 C 200 68 191 75 176 78 L 168 58 Z"
          fill="#020617"
          fill-opacity="0.9"
        />

        <path
          d="M 232 32 C 240 34 246 40 250 46 L 246 48 C 242 44 236 40 230 38 Z"
          fill="#00f0ff"
          filter="url(#neonGlow)"
        />
        <path
          d="M 232 84 C 240 82 246 76 250 70 L 246 68 C 242 72 236 76 230 78 Z"
          fill="#00f0ff"
          filter="url(#neonGlow)"
        />

        <line x1="34" y1="46" x2="34" y2="70" stroke="#f43f5e" stroke-width="2.5" />
        <circle cx="32" cy="52" r="2.5" fill="#00f0ff" />
        <circle cx="32" cy="64" r="2.5" fill="#00f0ff" />

        <path d="M 251 44 L 290 20 L 290 48 Z" fill="url(#headlightBeam)" />
        <path d="M 251 72 L 290 96 L 290 68 Z" fill="url(#headlightBeam)" />
      </svg>
    </div>
  )
}
