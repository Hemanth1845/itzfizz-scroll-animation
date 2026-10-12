import React from 'react'
import { ArrowRight, Code, Cpu, Sparkles, Terminal } from 'lucide-react'

export function ClosingSection() {
  return (
    <section id="closing" className="relative w-full py-28 px-6 md:px-12 bg-[#050811] text-white border-t border-[#00f0ff]/15">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#ccff00]">
                05 SPECIFICATIONS
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
              Engineering <span className="text-[#00f0ff]">Velocity</span>
            </h2>
          </div>
          <p className="text-sm md:text-base text-white/60 max-w-md">
            Built from scratch to illustrate advanced scroll-driven state machines, mathematical path interpolation, and GPU-composited interface design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00f0ff]/40 transition-colors">
            <Cpu className="text-[#00f0ff] mb-4" size={24} />
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
              SYSTEM 01
            </span>
            <h3 className="text-lg font-bold mb-2">Mathematical Motion Paths</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Calculates dynamic Bezier point coordinates and tangent lookahead angles in real time to guarantee realistic vehicle orientation along non-linear curves.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#ccff00]/40 transition-colors">
            <Sparkles className="text-[#ccff00] mb-4" size={24} />
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
              SYSTEM 02
            </span>
            <h3 className="text-lg font-bold mb-2">Scrubbed Glow Geometry</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Dynamic SVG stroke dash-array transitions synchronized with ScrollTrigger scrub, delivering 60 FPS neon road illumination without canvas re-renders.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#00f0ff]/40 transition-colors">
            <Terminal className="text-[#00f0ff] mb-4" size={24} />
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 block mb-1">
              SYSTEM 03
            </span>
            <h3 className="text-lg font-bold mb-2">Scoped Memory Lifecycle</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              Engineered inside isolated GSAP Context with complete teardown on component unmount, preventing memory leaks and StrictMode animation duplication.
            </p>
          </div>
        </div>

        <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-r from-[#00f0ff]/10 via-[#0a1226] to-[#ccff00]/10 border border-[#00f0ff]/30 text-center flex flex-col items-center">
          <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#00f0ff] mb-2">
            ITZFIZZ DIGITAL INTERNSHIP EVALUATION
          </span>
          <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight max-w-2xl mb-4">
            Ready to shape what's next in creative frontend engineering?
          </h3>
          <p className="text-sm text-white/70 max-w-lg mb-8">
            Demonstrating senior-level motion choreography, clean architecture, and bespoke automotive interaction design.
          </p>

          <a
            href="mailto:hemanthravada100@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#00f0ff] text-[#050811] font-mono text-xs font-black uppercase tracking-widest hover:bg-[#ccff00] hover:shadow-[0_0_30px_rgba(0,240,255,0.7)] transition-all cursor-pointer"
          >
            <span>CONNECT WITH HEMANTH</span>
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
