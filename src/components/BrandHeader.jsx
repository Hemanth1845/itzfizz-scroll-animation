import React from 'react'
import { ArrowRight } from 'lucide-react'

export function BrandHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md bg-[#050811]/80 border-b border-[#00f0ff]/10">
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

        <div className="hidden sm:flex items-center gap-2">
          <span className="text-[10px] font-mono tracking-widest text-[#94a3b8] uppercase">
            DIGITAL EXPERIENCES
          </span>
          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/25 font-bold">
            ITZFIZZ
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <a
          href="https://www.linkedin.com/in/ravada-hemanth-248622330/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-[11px] font-mono font-bold tracking-wider px-4 py-1.5 rounded-full bg-transparent text-[#00f0ff] border border-[#00f0ff]/40 hover:bg-[#00f0ff] hover:text-[#050811] hover:shadow-[0_0_16px_rgba(0,240,255,0.6)] transition-all cursor-pointer"
        >
          <span>LET'S BUILD</span>
          <ArrowRight size={12} />
        </a>
      </div>
    </header>
  )
}
