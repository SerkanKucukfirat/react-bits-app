import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import ParticleField from './ParticleField'

type Props = {
  eyebrow: string
  title: string
  text?: string
  crumbs?: { to: string; label: string }[]
  children?: ReactNode
}

// Dark, cinematic page header shared by the inner pages: the same wave of light as the home page.
export default function PageHero({ eyebrow, title, text, crumbs = [], children }: Props) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    document.title = `${title} — Slimwell Group`
    const ctx = gsap.context(() => {
      gsap.from('.ph-word > span', { yPercent: 110, rotateX: -50, duration: 1.2, ease: 'expo.out', stagger: 0.06, delay: 0.15 })
      gsap.from('.ph-fade', { opacity: 0, y: 24, duration: 1, ease: 'power3.out', stagger: 0.1, delay: 0.45 })
      gsap.to('.ph-inner', {
        y: -60,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    }, ref)
    return () => ctx.revert()
  }, [title])

  return (
    <section ref={ref} className="page-hero">
      <ParticleField />
      <div className="page-hero-fade" />
      <div className="ph-inner wrap">
        <nav className="crumbs ph-fade" aria-label="Konum">
          <Link to="/">Ana sayfa</Link>
          {crumbs.map(c => (
            <span key={c.to}>
              <i>/</i>
              <Link to={c.to}>{c.label}</Link>
            </span>
          ))}
        </nav>
        <p className="eyebrow ph-fade">
          <span className="dot" /> {eyebrow}
        </p>
        <h1 className="ph-title" aria-label={title}>
          {title.split(' ').map((w, i) => (
            <span key={i} className="ph-word">
              <span>{w}</span>
            </span>
          ))}
        </h1>
        {text && <p className="ph-text ph-fade">{text}</p>}
        {children}
      </div>
    </section>
  )
}
