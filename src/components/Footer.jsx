import React from 'react'
import { ArrowUp } from 'lucide-react'

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full bg-[#04060b] text-[#94a3b8] py-14 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-lg font-black tracking-[0.2em] uppercase text-white">
              VOLT / DRIVE
            </span>
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase px-2 py-0.5 rounded bg-[#00f0ff]/10 border border-[#00f0ff]/20">
              ITZFIZZ
            </span>
          </div>
          <p className="text-xs text-white/50 mt-2 max-w-sm">
            Scroll-driven kinetic engineering study created by Hemanth Ravada for the Itzfizz Digital internship evaluation.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <a
            href="https://github.com/Hemanth1845/itzfizz-scroll-animation"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs font-mono text-white/70 hover:text-[#00f0ff] transition-colors"
          >
            <svg
              className="w-3.5 h-3.5 fill-current"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GITHUB REPOSITORY</span>
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-mono text-white/70 hover:text-[#ccff00] transition-colors cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-white/40 gap-4">
        <span>© {new Date().getFullYear()} VOLT / DRIVE • ITZFIZZ DIGITAL. ALL RIGHTS RESERVED.</span>
        <span>ENGINEERED WITH REACT 19 + GSAP 3 SCROLLTRIGGER + VITE</span>
      </div>
    </footer>
  )
}
