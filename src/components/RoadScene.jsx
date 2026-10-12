import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CarModel } from './CarModel'
import { MetricCard } from './MetricCard'
import { METRICS_DATA } from '../data/metrics'
import { ArrowDown, ArrowRight, Gauge, Sparkles } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ROAD_PATH_DATA = "M 80,380 C 340,160 520,580 820,380 C 1040,220 1200,260 1380,360"

const STAGES = [
  { id: '01', key: 'idle', label: 'IDLE' },
  { id: '02', key: 'ignition', label: 'IGNITION' },
  { id: '03', key: 'momentum', label: 'MOMENTUM' },
  { id: '04', key: 'arrival', label: 'ARRIVAL' },
]

export function RoadScene({ prefersReducedMotion }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const svgRef = useRef(null)
  const roadPathRef = useRef(null)
  const trailPathRef = useRef(null)
  const carWrapperRef = useRef(null)

  const stage1Ref = useRef(null)
  const stage2Ref = useRef(null)
  const stage3Ref = useRef(null)
  const stage4Ref = useRef(null)

  const speedRef = useRef(null)
  const progressTextRef = useRef(null)
  const progressBarRef = useRef(null)
  const activePillRef = useRef(null)

  const cardRefs = useRef([])
  const numberRefs = useRef([])

  const [currentStage, setCurrentStage] = useState('01')

  useEffect(() => {
    if (prefersReducedMotion) {
      if (trailPathRef.current) {
        trailPathRef.current.style.strokeDashoffset = '0'
      }
      if (stage1Ref.current) stage1Ref.current.style.opacity = '1'
      if (stage3Ref.current) stage3Ref.current.style.opacity = '1'
      cardRefs.current.forEach((c) => {
        if (c) c.style.opacity = '1'
      })
      return
    }

    const path = roadPathRef.current
    if (!path) return
    const totalLength = path.getTotalLength()

    if (trailPathRef.current) {
      trailPathRef.current.style.strokeDasharray = `${totalLength} ${totalLength}`
      trailPathRef.current.style.strokeDashoffset = `${totalLength}`
    }

    const ctx = gsap.context(() => {
      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      introTl.from(stage1Ref.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
      })

      const updateCarPosition = (progress) => {
        const clampedProgress = Math.min(Math.max(progress, 0), 1)
        const currentLength = clampedProgress * totalLength
        const pt = path.getPointAtLength(currentLength)
        const lookAheadLength = Math.min(currentLength + 8, totalLength)
        const nextPt = path.getPointAtLength(lookAheadLength)

        const dx = nextPt.x - pt.x
        const dy = nextPt.y - pt.y
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)

        if (carWrapperRef.current) {
          gsap.set(carWrapperRef.current, {
            x: pt.x - 60,
            y: pt.y - 29,
            rotation: angle,
            transformOrigin: '50% 50%',
          })
        }

        if (trailPathRef.current) {
          const offset = totalLength * (1 - clampedProgress)
          trailPathRef.current.style.strokeDashoffset = `${offset}`
        }

        if (progressBarRef.current) {
          progressBarRef.current.style.height = `${clampedProgress * 100}%`
        }

        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${Math.round(clampedProgress * 100)}%`
        }

        if (clampedProgress < 0.25) {
          setCurrentStage('01')
        } else if (clampedProgress < 0.52) {
          setCurrentStage('02')
        } else if (clampedProgress < 0.82) {
          setCurrentStage('03')
        } else {
          setCurrentStage('04')
        }
      }

      updateCarPosition(0)

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          pin: trackRef.current,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const p = self.progress
            updateCarPosition(p)

            if (speedRef.current) {
              const velocity = Math.min(Math.round(Math.abs(self.getVelocity() / 25)), 280)
              speedRef.current.textContent = `${velocity} KM/H`
            }
          },
        },
      })

      masterTl.fromTo(
        stage1Ref.current,
        { opacity: 1, y: 0 },
        { opacity: 0, y: -24, ease: 'power2.in', duration: 0.2 },
        0.12
      )

      masterTl.fromTo(
        stage2Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.15 },
        0.25
      )
      masterTl.to(
        stage2Ref.current,
        { opacity: 0, y: -20, ease: 'power2.in', duration: 0.15 },
        0.48
      )

      masterTl.fromTo(
        stage3Ref.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.15 },
        0.52
      )
      masterTl.to(
        stage3Ref.current,
        { opacity: 0, y: -20, ease: 'power2.in', duration: 0.15 },
        0.78
      )

      masterTl.fromTo(
        stage4Ref.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out', duration: 0.2 },
        0.82
      )

      METRICS_DATA.forEach((metric, idx) => {
        const card = cardRefs.current[idx]
        if (!card) return
        const [start, end] = metric.progressRange

        masterTl.fromTo(
          card,
          { opacity: 0, scale: 0.9, y: 20 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            ease: 'power2.out',
            duration: end - start,
            onUpdate: function () {
              const numEl = numberRefs.current[idx]
              if (numEl) {
                const curVal = Math.round(this.progress() * metric.value)
                numEl.textContent = `${metric.prefix}${curVal}${metric.suffix}`
              }
            },
          },
          start
        )
      })
    }, containerRef)

    const handleResize = () => {
      ScrollTrigger.refresh()
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      ctx.revert()
    }
  }, [prefersReducedMotion])

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative w-full h-[360vh] bg-[#050811] text-white"
    >
      <div
        ref={trackRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-20 pb-8 px-4 md:px-12 bg-[#050811]"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f0ff]/15 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-30 w-full flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-[#00f0ff] font-bold">
              {currentStage}
            </span>
            <span className="text-white/40">/</span>
            <span className="text-white font-bold tracking-widest uppercase">
              {STAGES.find((s) => s.id === currentStage)?.label}
            </span>
            <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden sm:flex items-center gap-2 text-white/50">
              <Gauge size={14} className="text-[#00f0ff]" />
              <span ref={speedRef} className="font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">
                0 KM/H
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/50">STAGE PROGRESS</span>
              <span
                ref={progressTextRef}
                className="font-bold text-[#ccff00] bg-[#ccff00]/10 px-2 py-0.5 rounded border border-[#ccff00]/20"
              >
                0%
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-20 w-full my-auto flex items-center justify-center">
          <div className="relative w-full max-w-7xl h-[400px] sm:h-[480px] md:h-[540px] flex items-center justify-center">
            <svg
              ref={svgRef}
              viewBox="0 0 1440 700"
              className="absolute inset-0 w-full h-full preserve-3d overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="roadSurfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#0a0f1d" />
                  <stop offset="50%" stop-color="#0d1424" />
                  <stop offset="100%" stop-color="#090d18" />
                </linearGradient>

                <linearGradient id="trailCyanLimeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.9" />
                  <stop offset="70%" stop-color="#00f0ff" stop-opacity="1" />
                  <stop offset="100%" stop-color="#ccff00" stop-opacity="1" />
                </linearGradient>

                <filter id="superGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="8" result="blur1" />
                  <feGaussianBlur stdDeviation="16" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="cyanGlow" x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="0" stdDeviation="6" flood-color="#00f0ff" flood-opacity="0.6" />
                </filter>
              </defs>

              <g opacity="0.12" stroke="#00f0ff" strokeWidth="1" fill="none">
                <ellipse cx="280" cy="240" rx="180" ry="90" />
                <ellipse cx="280" cy="240" rx="260" ry="130" />
                <ellipse cx="880" cy="460" rx="220" ry="110" />
                <ellipse cx="880" cy="460" rx="320" ry="160" />
                <ellipse cx="1280" cy="300" rx="160" ry="80" />
              </g>

              <path
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="#00f0ff"
                strokeWidth="116"
                strokeLinecap="round"
                strokeOpacity="0.15"
                filter="url(#cyanGlow)"
              />

              <path
                ref={roadPathRef}
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="url(#roadSurfGrad)"
                strokeWidth="108"
                strokeLinecap="round"
              />

              <path
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="#00f0ff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.75"
                filter="url(#cyanGlow)"
                style={{ transform: 'translateY(-52px)' }}
              />
              <path
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="#00f0ff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.75"
                filter="url(#cyanGlow)"
                style={{ transform: 'translateY(52px)' }}
              />

              <path
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2"
                strokeDasharray="16, 22"
                strokeOpacity="0.3"
              />

              <path
                ref={trailPathRef}
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="url(#trailCyanLimeGrad)"
                strokeWidth="70"
                strokeLinecap="round"
                filter="url(#superGlow)"
              />

              <g transform="translate(1360, 310)">
                <line x1="0" y1="0" x2="0" y2="100" stroke="#ccff00" strokeWidth="8" strokeDasharray="10, 10" filter="url(#superGlow)" />
                <circle cx="0" cy="50" r="12" fill="#ccff00" />
              </g>

              <foreignObject
                ref={carWrapperRef}
                x="0"
                y="0"
                width="140"
                height="70"
                className="overflow-visible pointer-events-none"
              >
                <CarModel width={120} height={58} />
              </foreignObject>
            </svg>

            <div
              ref={stage1Ref}
              className="absolute left-6 md:left-14 top-6 sm:top-12 max-w-lg z-30 pointer-events-none"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#00f0ff]">
                  VOLT / DRIVE // 01 IDLE
                </span>
              </div>
              <h1
                className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[0.95]"
                aria-label="WELCOME ITZFIZZ"
              >
                WHERE IDEAS <br />
                <span className="text-[#00f0ff] drop-shadow-[0_0_24px_rgba(0,240,255,0.6)]">
                  MOVE
                </span>
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-white/70 max-w-sm tracking-wide">
                Scroll to experience motion, technology, and what's next for ITZFIZZ.
              </p>
              <div className="mt-4 flex items-center gap-2 text-[10px] font-mono tracking-widest text-[#00f0ff]">
                <span>SCROLL TO ENGAGE</span>
                <ArrowDown size={12} className="animate-bounce" />
              </div>
            </div>

            <div
              ref={stage2Ref}
              className="absolute left-6 md:left-14 top-8 sm:top-14 max-w-lg z-30 opacity-0 pointer-events-none"
            >
              <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#ccff00] mb-2 block">
                02 IGNITION // VELOCITY
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[0.95]">
                MOVE WITH <br />
                <span className="text-[#ccff00] drop-shadow-[0_0_24px_rgba(204,255,0,0.6)]">
                  INTENT
                </span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm font-mono text-white/70 tracking-widest">
                TECHNOLOGY • DESIGN • IMPACT
              </p>
            </div>

            <div
              ref={stage3Ref}
              className="absolute left-6 md:left-14 top-6 sm:top-10 max-w-lg z-30 opacity-0 pointer-events-none"
            >
              <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#00f0ff] mb-2 block">
                03 MOMENTUM // METRICS
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[0.95]">
                DATA DRIVES <br />
                <span className="text-[#00f0ff] drop-shadow-[0_0_24px_rgba(0,240,255,0.6)]">
                  PROGRESS
                </span>
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/70">
                Precision metrics delivering measurable user conversion and performance lift.
              </p>
            </div>

            <div
              ref={stage4Ref}
              className="absolute right-6 md:right-14 top-6 sm:top-10 max-w-md z-30 opacity-0 pointer-events-auto text-right md:text-right"
            >
              <span className="text-[10px] md:text-xs font-mono font-bold tracking-[0.3em] uppercase text-[#ccff00] mb-2 block">
                04 ARRIVAL // COMPLETE
              </span>
              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight uppercase leading-[0.95]">
                BUILT FOR WHAT'S <br />
                <span className="text-[#ccff00] drop-shadow-[0_0_24px_rgba(204,255,0,0.6)]">
                  NEXT
                </span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-white/70">
                Ideas in motion. Brands in progress. A brighter tomorrow.
              </p>
              <div className="mt-6 flex justify-end">
                <a
                  href="#closing"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#ccff00] text-[#050811] font-mono text-xs font-bold uppercase tracking-wider hover:bg-white hover:shadow-[0_0_24px_rgba(204,255,0,0.8)] transition-all cursor-pointer"
                >
                  <span>LET'S BUILD TOGETHER</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            <div className="absolute bottom-2 sm:bottom-4 left-4 right-4 md:left-12 md:right-12 z-30 flex flex-wrap items-center justify-center md:justify-end gap-3 sm:gap-4 pointer-events-none">
              {METRICS_DATA.map((metric, idx) => (
                <div key={metric.id} className="pointer-events-auto">
                  <MetricCard
                    metric={metric}
                    cardRef={(el) => (cardRefs.current[idx] = el)}
                    numberRef={(el) => (numberRefs.current[idx] = el)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-30 w-full flex items-center justify-between pt-2 border-t border-white/10 text-[10px] font-mono">
          <div className="flex items-center gap-2">
            {STAGES.map((stage) => {
              const isActive = stage.id === currentStage
              return (
                <div
                  key={stage.id}
                  className={`px-2.5 py-1 rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'bg-[#00f0ff]/15 border-[#00f0ff] text-[#00f0ff]'
                      : 'border-white/10 text-white/40'
                  }`}
                >
                  <span>{stage.id} {stage.label}</span>
                </div>
              )
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-white/40">
            <span>ITZFIZZ DIGITAL // VOLT DRIVE V2.0</span>
          </div>
        </div>
      </div>
    </section>
  )
}
