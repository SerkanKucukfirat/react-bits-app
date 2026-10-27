import { useEffect, useRef, type PointerEvent as RPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ABOUT_TEXT,
  ADDRESS,
  CLASSIC,
  EMAIL,
  LOGO,
  categories,
  corporatePages,
  PHONE,
  PHONE_HREF,
  SERVICE_URL,
  WHATSAPP,
  brands,
  stats,
  technologies,
} from '../content'

gsap.registerPlugin(ScrollTrigger)

const YEAR = new Date().getFullYear()

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const words = el.querySelectorAll('span')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 45%',
            scrub: true,
          },
        },
      )
    })
    return () => ctx.revert()
  }, [])
  return (
    <section className="manifesto wrap">
      <p className="eyebrow">
        <span className="dot" /> Biz kimiz
      </p>
      <p ref={ref} className="manifesto-text">
        {ABOUT_TEXT.split(' ').map((w, i) => (
          <span key={i}>{w} </span>
        ))}
      </p>
    </section>
  )
}

export function Marquee() {
  const items = ['Cryo', 'Infra Step', 'Vakum', 'Roll Serisi', 'Aquaslimmer', 'Kolajen', 'IR Infrared', 'Casmara', 'WishPro', 'Playskin']
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {[...items, ...items].map((t, i) => (
          <span key={i}>
            {t} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  )
}

export function Technology() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 761px)', () => {
        const el = track.current!
        const dist = () => el.scrollWidth - window.innerWidth + 64
        gsap.to(el, {
          x: () => -dist(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${dist()}`,
            scrub: 0.6,
            pin: true,
            invalidateOnRefresh: true,
          },
        })
      })
    }, section)
    return () => ctx.revert()
  }, [])

  const tilt = (e: RPointerEvent<HTMLElement>) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--rx', `${-y * 12}deg`)
    el.style.setProperty('--ry', `${x * 14}deg`)
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
  }
  const reset = (e: RPointerEvent<HTMLElement>) => {
    e.currentTarget.style.setProperty('--rx', '0deg')
    e.currentTarget.style.setProperty('--ry', '0deg')
  }

  return (
    // the wrapper belongs to React, so the pin spacer GSAP adds stays inside it and unmounting works
    <div className="tech-wrap">
      <section ref={section} className="tech" id="teknoloji">
        <div className="tech-head wrap">
          <p className="eyebrow">
            <span className="dot" /> Teknoloji
          </p>
          <h2>
            Cihazların ardındaki <span className="grad">teknoloji</span>
          </h2>
        </div>
        <div ref={track} className="tech-track">
          {technologies.map((t, i) => (
            <article key={t.code} className="tech-card" onPointerMove={tilt} onPointerLeave={reset}>
              <div className="tech-card-inner">
                <span className="tech-index">{String(i + 1).padStart(2, '0')}</span>
                <span className="tech-code">{t.code}</span>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

export function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const ctx = gsap.context(() => {
      ref.current!.querySelectorAll<HTMLElement>('[data-to]').forEach(el => {
        const to = Number(el.dataset.to)
        const obj = { v: 0 }
        gsap.to(obj, {
          v: to,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => (el.textContent = Math.round(obj.v).toLocaleString('tr-TR')),
        })
      })
    }, ref)
    return () => ctx.revert()
  }, [])
  return (
    <section className="stats wrap" ref={ref}>
      {stats.map(s => (
        <div key={s.label} className="stat">
          <strong>
            <span data-to={s.value}>0</span>
            {s.suffix}
          </strong>
          <span>{s.label}</span>
        </div>
      ))}
    </section>
  )
}

export function Brands() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.brand-card').forEach((el, i) => {
        gsap.from(el, {
          y: 120,
          rotateX: -25,
          opacity: 0,
          duration: 1.3,
          delay: (i % 2) * 0.12,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
    })
    return () => ctx.revert()
  }, [])
  return (
    <section className="brands wrap" id="markalar">
      <div className="brands-head">
        <p className="eyebrow">
          <span className="dot" /> Markalarımız
        </p>
        <h2>
          Dünya markaları, <span className="grad">tek çatı</span>
        </h2>
      </div>
      <div className="brand-grid">
        {brands.map((b, i) => (
          <a key={b.name} href={b.url} target="_blank" rel="noreferrer" className={`brand-card ${i === 0 ? 'wide' : ''}`}>
            <img src={b.image} alt={b.name} loading="lazy" />
            <span className="brand-name">
              {b.name} <i>↗</i>
            </span>
          </a>
        ))}
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer" id="iletisim">
      <div className="wrap">
        <div className="cta">
          <p className="eyebrow">
            <span className="dot" /> İletişim
          </p>
          <h2>
            Merkezinize <span className="grad">geleceği</span> taşıyalım.
          </h2>
          <div className="cta-actions">
            <a className="btn light" href={WHATSAPP} target="_blank" rel="noreferrer">
              WhatsApp’tan yazın <span>↗</span>
            </a>
            <a className="btn glass" href={PHONE_HREF}>
              {PHONE}
            </a>
          </div>
        </div>
        <div className="footer-grid">
          <div>
            <img src={LOGO} alt="Slimwell Group" className="footer-logo" />
            <p className="footer-note">“İncelmede Devrim” vizyonuyla 2015’ten bu yana profesyonel güzellik ve wellness teknolojileri.</p>
          </div>
          <div>
            <h4>Cihazlar</h4>
            <ul>
              {categories.map(c => (
                <li key={c.slug}>
                  <Link to={`/cihazlar?kategori=${c.slug}`}>{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Kurumsal</h4>
            <ul>
              <li>
                <Link to="/markalar">Markalar</Link>
              </li>
              {corporatePages.map(p => (
                <li key={p.to}>
                  <Link to={p.to}>{p.label}</Link>
                </li>
              ))}
              <li>
                <a href={SERVICE_URL} target="_blank" rel="noreferrer">
                  Teknik servis
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>İletişim</h4>
            <p>{ADDRESS}</p>
            <p>
              <a href={PHONE_HREF}>{PHONE}</a>
              <br />
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
            <p>
              <a href={CLASSIC}>Klasik siteye geç</a>
            </p>
          </div>
        </div>
        <p className="footer-bottom">© {YEAR} Slimwell Group · İncelmede Devrim</p>
      </div>
    </footer>
  )
}
