import React from 'react'

export function BrandHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md bg-[#050811]/85 border-b border-[#00f0ff]/10">
      <div className="flex items-center gap-3">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-base md:text-lg font-black tracking-[0.2em] text-white">
            VOLT
          </span>
          <span className="text-base md:text-lg font-black text-[#00f0ff]">
            /
          </span>
          <span className="text-base md:text-lg font-black tracking-[0.2em] text-white group-hover:text-[#00f0ff] transition-colors">
            DRIVE
          </span>
        </a>

        <span className="hidden sm:inline-block w-px h-3.5 bg-white/20" aria-hidden="true" />

        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-[10px] font-mono tracking-widest text-[#94a3b8] uppercase">
            KINETIC SYSTEMS
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20">
            ITZFIZZ
          </span>
        </div>
      </div>

      <nav aria-label="Primary navigation" className="flex items-center gap-6 md:gap-8">
        <div className="hidden md:flex items-center gap-6 text-xs font-mono tracking-widest text-[#94a3b8]">
          <a href="#hero" className="text-white hover:text-[#00f0ff] transition-colors">
            HOME
          </a>
          <a href="#journey" className="hover:text-[#00f0ff] transition-colors">
            WORK
          </a>
          <a href="#closing" className="hover:text-[#00f0ff] transition-colors">
            ABOUT
          </a>
          <a href="#closing" className="hover:text-[#00f0ff] transition-colors">
            CONTACT
          </a>
        </div>

        <a
          href="#closing"
          className="text-[11px] font-mono font-bold tracking-wider px-3.5 py-1.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 hover:bg-[#00f0ff] hover:text-black transition-all"
        >
          ENGAGE
        </a>
      </nav>
    </header>
  )
}
