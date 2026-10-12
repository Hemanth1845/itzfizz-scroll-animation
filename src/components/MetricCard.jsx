import React from 'react'

export function MetricCard({ metric, numberRef, cardRef }) {
  const isLime = metric.color === 'lime'
  const accentColor = isLime ? '#ccff00' : '#00f0ff'

  return (
    <div
      ref={cardRef}
      className={`p-4 sm:p-5 rounded-2xl bg-[#070b14]/90 backdrop-blur-md border ${metric.accentBorder} shadow-[0_12px_32px_rgba(0,0,0,0.65)] flex flex-col gap-2 min-w-[170px] sm:min-w-[210px] md:min-w-[230px] transition-all duration-300 hover:scale-105 hover:border-[${accentColor}] group`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[9px] sm:text-[10px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full ${metric.badgeBg}`}>
          {metric.category}
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full animate-ping"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      <div className="flex items-baseline gap-1 mt-1">
        <span
          ref={numberRef}
          className="metric-number text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-none text-white drop-shadow-[0_2px_12px_rgba(0,240,255,0.3)]"
        >
          {metric.prefix}{metric.value}{metric.suffix}
        </span>
      </div>

      <p className="text-xs sm:text-sm font-medium text-[#94a3b8] leading-snug">
        {metric.label}
      </p>

      <div className="w-full h-0.5 bg-white/5 rounded-full overflow-hidden mt-1">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${Math.min(metric.value * 1.4, 100)}%`,
            backgroundColor: accentColor,
            boxShadow: `0 0 8px ${accentColor}`,
          }}
        />
      </div>
    </div>
  )
}
