import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CarModel } from './CarModel'
import { MetricCard } from './MetricCard'
import { METRICS_DATA } from '../data/metrics'
import { ArrowDown, Gauge } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ROAD_PATH_DATA = "M 40,460 C 260,330 460,540 760,400 C 980,260 1160,290 1380,430"

const MILESTONES = [
  { id: '01', code: '01', label: 'IDEAS', stageName: 'JOURNEY', desc: 'WHERE IDEAS MOVE' },
  { id: '02', code: '02', label: 'MOTION', stageName: 'IGNITION', desc: 'MOVE WITH INTENT' },
  { id: '03', code: '03', label: 'IMPACT', stageName: 'MOMENTUM', desc: 'DATA DRIVES PROGRESS' },
  { id: '04', code: '04', label: 'NEXT', stageName: 'ARRIVAL', desc: "BUILT FOR WHAT'S NEXT" },
]

export function RoadScene({ prefersReducedMotion }) {
  const containerRef = useRef(null)
  const trackRef = useRef(null)
  const roadPathRef = useRef(null)
  const trailPathRef = useRef(null)
  const carWrapperRef = useRef(null)

  const headlineRef = useRef(null)
  const sublineRef = useRef(null)
  const badgeRef = useRef(null)
  const cueRef = useRef(null)
  const speedRef = useRef(null)
  const progressTextRef = useRef(null)
  const roadTextRef = useRef(null)
  const arrivalBadgeRef = useRef(null)

  const cardRefs = useRef([])
  const numberRefs = useRef([])

  const [activeStageIndex, setActiveStageIndex] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion) {
      if (trailPathRef.current) trailPathRef.current.style.strokeDashoffset = '0'
      if (headlineRef.current) headlineRef.current.style.opacity = '1'
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
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      loadTl.from(badgeRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.6,
        delay: 0.1,
      })
      .from(headlineRef.current, {
        opacity: 0,
        y: 28,
        duration: 0.85,
      }, '-=0.4')
      .from(sublineRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.65,
      }, '-=0.5')
      .from(cardRefs.current, {
        opacity: 0,
        y: 22,
        scale: 0.94,
        duration: 0.6,
        stagger: 0.14,
      }, '-=0.4')
      .from(cueRef.current, {
        opacity: 0,
        y: 10,
        duration: 0.5,
      }, '-=0.3')

      const updateCarPosition = (progress) => {
        const clampedProgress = Math.min(Math.max(progress, 0), 1)
        const currentLength = clampedProgress * totalLength
        const pt = path.getPointAtLength(currentLength)
        const lookAhead = Math.min(currentLength + 8, totalLength)
        const nextPt = path.getPointAtLength(lookAhead)

        const dx = nextPt.x - pt.x
        const dy = nextPt.y - pt.y
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)

        if (carWrapperRef.current) {
          gsap.set(carWrapperRef.current, {
            x: pt.x - 65,
            y: pt.y - 31,
            rotation: angle,
            transformOrigin: '50% 50%',
          })
        }

        if (trailPathRef.current) {
          const offset = totalLength * (1 - clampedProgress)
          trailPathRef.current.style.strokeDashoffset = `${offset}`
        }

        if (progressTextRef.current) {
          progressTextRef.current.textContent = `${Math.round(clampedProgress * 100)}%`
        }

        if (roadTextRef.current) {
          if (clampedProgress > 0.35) {
            roadTextRef.current.style.opacity = '1'
            roadTextRef.current.style.filter = 'drop-shadow(0 0 12px rgba(0, 240, 255, 0.8))'
          } else {
            roadTextRef.current.style.opacity = `${0.4 + clampedProgress * 1.5}`
            roadTextRef.current.style.filter = 'none'
          }
        }

        if (clampedProgress < 0.25) {
          setActiveStageIndex(0)
        } else if (clampedProgress < 0.52) {
          setActiveStageIndex(1)
        } else if (clampedProgress < 0.82) {
          setActiveStageIndex(2)
        } else {
          setActiveStageIndex(3)
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

            METRICS_DATA.forEach((metric, idx) => {
              const numEl = numberRefs.current[idx]
              if (numEl) {
                const [start, end] = metric.progressRange
                if (p >= start) {
                  const cardProgress = Math.min(Math.max((p - start) / (end - start), 0), 1)
                  const curVal = Math.round(cardProgress * metric.value)
                  numEl.textContent = `${metric.prefix}${curVal}${metric.suffix}`
                }
              }
            })
          },
        },
      })

      masterTl.to(cueRef.current, { opacity: 0, y: -10, duration: 0.05 }, 0)

      masterTl.fromTo(
        arrivalBadgeRef.current,
        { opacity: 0, y: 15, display: 'none' },
        { opacity: 1, y: 0, display: 'flex', duration: 0.1, ease: 'power2.out' },
        0.84
      )
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

  const activeStage = MILESTONES[activeStageIndex] || MILESTONES[0]

  return (
    <section
      ref={containerRef}
      id="journey"
      className="relative w-full h-[340vh] bg-[#030712] text-white"
    >
      <div
        ref={trackRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between pt-16 pb-4 px-4 sm:px-6 md:px-12 bg-[#030712] select-none"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-25"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[#00f0ff]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-[#ccff00]/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative z-30 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
          <div ref={badgeRef} className="flex items-center gap-2 mb-1">
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.3em] uppercase text-[#00f0ff]">
              ITZFIZZ DIGITAL // {activeStage.code} {activeStage.stageName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
          </div>

          <h1
            ref={headlineRef}
            className="headline-text text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white tracking-[0.35em] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] leading-tight"
            aria-label="WELCOME ITZFIZZ"
          >
            W E L C O M E &nbsp; I T Z F I Z Z
          </h1>

          <p
            ref={sublineRef}
            className="mt-1 text-xs sm:text-sm text-white/65 max-w-xl mx-auto tracking-wide"
          >
            Digital experiences designed to move ideas forward.
          </p>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 md:gap-5 w-full">
            {METRICS_DATA.map((metric, idx) => (
              <MetricCard
                key={metric.id}
                metric={metric}
                cardRef={(el) => (cardRefs.current[idx] = el)}
                numberRef={(el) => (numberRefs.current[idx] = el)}
              />
            ))}
          </div>
        </div>

        <div className="relative z-20 w-full my-auto flex items-center justify-center">
          <div className="relative w-full max-w-7xl h-[260px] sm:h-[320px] md:h-[380px] lg:h-[420px] flex items-center justify-center">
            <svg
              viewBox="0 0 1440 680"
              className="absolute inset-0 w-full h-full preserve-3d overflow-visible"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="roadSurfGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#070d18" />
                  <stop offset="50%" stop-color="#0a1222" />
                  <stop offset="100%" stop-color="#070c17" />
                </linearGradient>

                <linearGradient id="trailCyanLimeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="#00f0ff" stop-opacity="0.9" />
                  <stop offset="70%" stop-color="#00f0ff" stop-opacity="1" />
                  <stop offset="100%" stop-color="#ccff00" stop-opacity="1" />
                </linearGradient>

                <filter id="superGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="8" result="blur1" />
                  <feGaussianBlur stdDeviation="18" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="7" flood-color="#00f0ff" flood-opacity="0.8" />
                </filter>
              </defs>

              <g opacity="0.08" stroke="#00f0ff" strokeWidth="1" fill="none">
                <ellipse cx="260" cy="330" rx="200" ry="100" />
                <ellipse cx="260" cy="330" rx="280" ry="140" />
                <ellipse cx="760" cy="400" rx="240" ry="120" />
                <ellipse cx="760" cy="400" rx="340" ry="170" />
                <ellipse cx="1200" cy="360" rx="180" ry="90" />
              </g>

              <path
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="#00f0ff"
                strokeWidth="138"
                strokeLinecap="round"
                strokeOpacity="0.18"
                filter="url(#cyanGlow)"
              />

              <path
                ref={roadPathRef}
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="url(#roadSurfGrad)"
                strokeWidth="128"
                strokeLinecap="round"
              />

              <path
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="#00f0ff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.85"
                filter="url(#cyanGlow)"
                style={{ transform: 'translateY(-60px)' }}
              />
              <path
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="#00f0ff"
                strokeWidth="4"
                strokeLinecap="round"
                strokeOpacity="0.85"
                filter="url(#cyanGlow)"
                style={{ transform: 'translateY(60px)' }}
              />

              <path
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray="18, 24"
                strokeOpacity="0.3"
              />

              <path
                ref={trailPathRef}
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="url(#trailCyanLimeGrad)"
                strokeWidth="84"
                strokeLinecap="round"
                filter="url(#superGlow)"
              />

              <path
                id="headlineRoadGuideline"
                d={ROAD_PATH_DATA}
                fill="none"
                stroke="none"
              />

              <text
                ref={roadTextRef}
                fill="#ffffff"
                fontSize="24"
                fontFamily="'Space Grotesk', 'Plus Jakarta Sans', sans-serif"
                fontWeight="900"
                letterSpacing="0.32em"
                className="select-none pointer-events-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] transition-all duration-300"
              >
                <textPath
                  href="#headlineRoadGuideline"
                  startOffset="48%"
                  textAnchor="middle"
                >
                  — &nbsp;W E L C O M E &nbsp;&nbsp;
                  <tspan fill="#00f0ff" filter="url(#cyanGlow)">
                    I T Z F I Z Z
                  </tspan>
                  &nbsp; —
                </textPath>
              </text>

              <g transform="translate(1370, 420)">
                <circle cx="0" cy="0" r="14" fill="#ccff00" filter="url(#superGlow)" />
                <circle cx="0" cy="0" r="6" fill="#ffffff" />
              </g>

              <foreignObject
                ref={carWrapperRef}
                x="0"
                y="0"
                width="150"
                height="80"
                className="overflow-visible pointer-events-none"
              >
                <CarModel width={130} height={62} />
              </foreignObject>
            </svg>

            <div
              ref={arrivalBadgeRef}
              className="absolute bottom-2 z-30 hidden opacity-0 flex-col items-center text-center pointer-events-none"
            >
              <div className="flex items-center gap-2 px-6 py-2 rounded-full bg-[#ccff00]/10 border border-[#ccff00]/30 shadow-[0_0_20px_rgba(204,255,0,0.3)]">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
                <span className="text-xs font-mono font-bold tracking-widest text-[#ccff00] uppercase">
                  100% JOURNEY COMPLETE
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-30 w-full flex items-end justify-between text-xs font-mono border-t border-white/10 pt-2.5">
          <div className="flex items-center gap-5 sm:gap-7">
            {MILESTONES.map((m, idx) => {
              const isActive = idx === activeStageIndex
              return (
                <div key={m.id} className="flex flex-col gap-0.5 items-start">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full border transition-all ${
                      isActive
                        ? 'bg-[#00f0ff] border-[#00f0ff] shadow-[0_0_8px_#00f0ff]'
                        : 'bg-transparent border-white/20'
                    }`} />
                    <span className={`text-[10px] tracking-wider uppercase font-bold transition-colors ${
                      isActive ? 'text-[#00f0ff]' : 'text-white/40'
                    }`}>
                      {m.code}
                    </span>
                  </div>
                  <span className={`text-[9px] tracking-widest uppercase font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-white/30'
                  }`}>
                    {m.label}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex items-center gap-5 text-white/50">
            <div className="flex items-center gap-2">
              <Gauge size={13} className="text-[#00f0ff]" />
              <span ref={speedRef} className="font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">
                0 KM/H
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-white/50">
              <span className="text-[10px]">STAGE</span>
              <span ref={progressTextRef} className="font-bold text-[#ccff00]">
                0%
              </span>
            </div>

            <div ref={cueRef} className="flex items-center gap-1.5 text-[#00f0ff] animate-bounce">
              <span className="text-[10px] tracking-widest uppercase">SCROLL</span>
              <ArrowDown size={11} />
            </div>

            <div className="hidden sm:flex flex-col text-right text-[9px] text-white/40 leading-tight">
              <span>ITZFIZZ DIGITAL</span>
              <span>SCROLL ANIMATION</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
