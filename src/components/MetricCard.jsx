import React from 'react'

export function MetricCard({ metric, numberRef, cardRef }) {
  const isLime = metric.color === 'lime'
  const accentColor = isLime ? '#ccff00' : '#00f0ff'

  return (
    <div
      ref={cardRef}
      className={`p-3 sm:p-4 rounded-xl bg-[#070b14]/90 backdrop-blur-md border ${metric.accentBorder} shadow-[0_8px_24px_rgba(0,0,0,0.6)] flex flex-col gap-1.5 w-[140px] sm:w-[170px] md:w-[190px] lg:w-[210px] transition-transform duration-300 hover:scale-105`}
    >
      <div className="flex items-center justify-between gap-1">
        <span className={`text-[8px] sm:text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded-full ${metric.badgeBg}`}>
          {metric.category}
        </span>
        <span
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
        />
      </div>

      <div className="flex items-baseline gap-1">
        <span
          ref={numberRef}
          className="metric-number text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-none text-white drop-shadow-[0_2px_12px_rgba(0,240,255,0.3)]"
        >
          {metric.prefix}{metric.value}{metric.suffix}
        </span>
      </div>

      <p className="text-[10px] sm:text-xs font-medium text-[#94a3b8] leading-tight line-clamp-2">
        {metric.label}
      </p>

      <div className="w-full h-0.5 bg-white/10 rounded-full overflow-hidden mt-0.5">
        <div
          className="h-full rounded-full"
          style={{
            width: `${Math.min(metric.value * 1.5, 100)}%`,
            backgroundColor: accentColor,
            boxShadow: `0 0 6px ${accentColor}`,
          }}
        />
      </div>
    </div>
  )
}
