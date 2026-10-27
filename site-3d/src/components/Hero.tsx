import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { slides } from '../content'
import ParticleField from './ParticleField'

gsap.registerPlugin(ScrollTrigger)

const DURATION = 6500

export default function Hero() {
  const section = useRef<HTMLElement>(null)
  const unfold = useRef<HTMLDivElement>(null)
  const tilt = useRef<HTMLDivElement>(null)
  const copy = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const [prev, setPrev] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  const go = (to: number) => {
    setIndex(cur => {
      const next = (to + slides.length) % slides.length
      if (next !== cur) setPrev(cur)
      return next
    })
  }

  useEffect(() => {
    if (paused) return
    const id = window.setTimeout(() => go(index + 1), DURATION)
    return () => window.clearTimeout(id)
  }, [index, paused])

  // The screen lies tilted back in space and unfolds flat as you scroll.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mobile = window.matchMedia('(max-width: 760px)').matches
      const scrub = { trigger: section.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 }
      gsap.fromTo(
        unfold.current,
        { rotateX: mobile ? 14 : 26, scale: mobile ? 0.92 : 0.56 },
        { rotateX: 0, scale: 1, ease: 'none', scrollTrigger: scrub },
      )
      if (!mobile) gsap.fromTo(stageRef.current, { y: 28 }, { y: 0, ease: 'none', scrollTrigger: { ...scrub } })
      gsap.to(copy.current, {
        opacity: 0,
        y: -80,
        filter: 'blur(8px)',
        ease: 'none',
        scrollTrigger: { trigger: section.current, start: 'top top', end: '35% top', scrub: 0.4 },
      })
      gsap.from('.hero-word > span', { yPercent: 110, rotateX: -60, duration: 1.3, ease: 'expo.out', stagger: 0.05, delay: 0.35 })
      gsap.from('.hero-fade', { opacity: 0, y: 24, duration: 1.2, ease: 'power3.out', stagger: 0.12, delay: 0.8 })
      gsap.from(unfold.current, { opacity: 0, z: -400, duration: 1.8, ease: 'expo.out', delay: 0.2 })
    }, section)
    return () => ctx.revert()
  }, [])

  // Pointer tilt on the screen
  useEffect(() => {
    const el = tilt.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const rx = gsap.quickTo(el, 'rotateX', { duration: 0.8, ease: 'power3.out' })
    const ry = gsap.quickTo(el, 'rotateY', { duration: 0.8, ease: 'power3.out' })
    const onMove = (e: PointerEvent) => {
      rx(-(e.clientY / window.innerHeight - 0.5) * 6)
      ry((e.clientX / window.innerWidth - 0.5) * 9)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const s = slides[index]

  return (
    <section ref={section} className="hero" id="top">
      <div className="hero-sticky">
        <ParticleField />
        <div className="hero-glow" style={{ background: `radial-gradient(50% 45% at 50% 62%, ${s.tone}33, transparent 70%)` }} />

        <div ref={copy} className="hero-copy">
          <p className="eyebrow hero-fade">
            <span className="dot" /> Slimwell Group · 2015’ten bu yana
          </p>
          <h1 className="hero-title" aria-label="İncelmede Devrim">
            {['İncelmede', 'Devrim'].map((w, i) => (
              <span key={w} className={`hero-word ${i ? 'outline' : ''}`}>
                <span>{w}</span>
              </span>
            ))}
          </h1>
          <p className="hero-sub hero-fade">Zayıflama, wellness ve güzellik teknolojilerinde yeni nesil cihazlar ve dünya markaları.</p>
        </div>

        <div ref={stageRef} className="stage">
          <div ref={unfold} className="unfold">
            <div
              ref={tilt}
              className="screen"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              {slides.map((sl, i) => (
                <div
                  key={sl.title}
                  className={`slide ${i === index ? 'is-active' : ''} ${i === prev ? 'is-prev' : ''}`}
                  aria-hidden={i !== index}
                >
                  <img src={sl.image} alt={sl.title} loading={i < 2 ? 'eager' : 'lazy'} draggable={false} />
                </div>
              ))}
              <div className="screen-sheen" />
              <div className="screen-caption" key={index}>
                <span className="eyebrow">{s.eyebrow}</span>
                <strong>{s.title}</strong>
                <span>{s.text}</span>
              </div>
              <button className="screen-arrow left" aria-label="Önceki" onClick={() => go(index - 1)}>
                ←
              </button>
              <button className="screen-arrow right" aria-label="Sonraki" onClick={() => go(index + 1)}>
                →
              </button>
            </div>
            <div className="screen-reflection" />
          </div>

          <div className="slide-tabs" role="tablist">
            {slides.map((sl, i) => (
              <button
                key={sl.title}
                role="tab"
                aria-selected={i === index}
                className={i === index ? 'is-active' : ''}
                onClick={() => go(i)}
              >
                <span className="tab-bar">
                  <span
                    key={`${index}-${paused}`}
                    style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? 'paused' : 'running' }}
                  />
                </span>
                <span className="tab-label">
                  <em>{String(i + 1).padStart(2, '0')}</em> {sl.tab}
                </span>
              </button>
            ))}
          </div>
        </div>

        <a href="#showroom" className="scroll-cue hero-fade" aria-label="Aşağı kaydır">
          <span />
          Keşfet
        </a>
      </div>
    </section>
  )
}
