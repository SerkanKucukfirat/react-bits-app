import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link, useParams } from 'react-router-dom'
import ParticleField from '../components/ParticleField'
import { useReveal } from '../components/useReveal'
import { PHONE, PHONE_HREF, WHATSAPP, bySlug, categories, cutoutOf, devicePage, devices } from '../content'
import { DeviceCard } from './Devices'
import NotFound from './NotFound'

export default function DeviceDetail() {
  const { slug } = useParams()
  const d = bySlug(slug)
  const page = useRef<HTMLDivElement>(null)
  const stage = useRef<HTMLDivElement>(null)

  useReveal(page, [slug])

  useEffect(() => {
    if (!d) return
    document.title = `${d.name} — Slimwell Group`
    const ctx = gsap.context(() => {
      gsap.from('.dd-device', { y: 120, rotateY: -35, opacity: 0, duration: 1.6, ease: 'expo.out' })
      gsap.from('.dd-copy > *', { y: 30, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.25 })
      gsap.to('.dd-device', { y: -14, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.6 })
    }, page)
    return () => ctx.revert()
  }, [d])

  // the device turns toward the pointer, as if standing on a turntable
  useEffect(() => {
    const el = stage.current
    if (!el || window.matchMedia('(hover: none)').matches) return
    const ry = gsap.quickTo(el, 'rotateY', { duration: 1, ease: 'power3.out' })
    const rx = gsap.quickTo(el, 'rotateX', { duration: 1, ease: 'power3.out' })
    const onMove = (e: PointerEvent) => {
      ry((e.clientX / window.innerWidth - 0.5) * 26)
      rx(-(e.clientY / window.innerHeight - 0.5) * 8)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [slug])

  if (!d) return <NotFound />

  const cat = categories.find(c => c.slug === d.categorySlug)
  const cut = cutoutOf(d)
  const idx = devices.indexOf(d)
  const prev = devices[(idx - 1 + devices.length) % devices.length]
  const next = devices[(idx + 1) % devices.length]
  // first sentence as the lead; the full text follows below
  const lead = d.description[0].split(/(?<=[.!])\s/)[0]
  const related = devices.filter(x => x.categorySlug === d.categorySlug && x.slug !== d.slug)

  return (
    <div ref={page} key={d.slug}>
      <section className="dd-hero">
        <ParticleField />
        <div className="page-hero-fade" />
        <div className="dd-grid wrap">
          <div className="dd-stage">
            <div className="dd-glow" />
            <div className="dd-turn" ref={stage}>
              <div className={`dd-device ${cut ? 'is-cut' : 'is-card'}`}>
                <img src={cut ?? d.image} alt={d.name} />
              </div>
            </div>
            <div className="dd-disc" />
          </div>
          <div className="dd-copy">
            <nav className="crumbs" aria-label="Konum">
              <Link to="/">Ana sayfa</Link>
              <i>/</i>
              <Link to="/cihazlar">Cihazlar</Link>
              <i>/</i>
              <Link to={`/cihazlar?kategori=${d.categorySlug}`}>{cat?.name}</Link>
            </nav>
            <p className="eyebrow">
              <span className="dot" /> {cat?.name}
            </p>
            <h1 className="dd-title">{d.name}</h1>
            <p className="dd-lead">{lead}</p>
            <div className="dd-actions">
              <a className="btn light" href={WHATSAPP} target="_blank" rel="noreferrer">
                Bilgi al <span>↗</span>
              </a>
              <a className="btn glass" href={PHONE_HREF}>
                {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="studio">
        <div className="wrap dd-body">
          <div className="dd-text">
            <p className="eyebrow dark reveal">
              <span className="dot" /> Cihaz hakkında
            </p>
            {d.description.map(p => (
              <p key={p.slice(0, 32)} className="reveal">
                {p}
              </p>
            ))}
          </div>
          <div className="dd-features">
            <p className="eyebrow dark reveal">
              <span className="dot" /> Özellikler
            </p>
            <ul>
              {d.features.map((f, i) => (
                <li key={f} className="reveal">
                  <em>{String(i + 1).padStart(2, '0')}</em>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {related.length > 0 && (
          <div className="wrap dd-related">
            <h2 className="reveal">Aynı seriden</h2>
            <div className="dgrid">
              {related.map(r => (
                <DeviceCard key={r.slug} d={r} />
              ))}
            </div>
          </div>
        )}

        <div className="wrap dd-pager">
          <Link to={devicePage(prev)}>
            <span>← Önceki</span>
            <strong>{prev.name}</strong>
          </Link>
          <Link to={devicePage(next)} className="next">
            <span>Sonraki →</span>
            <strong>{next.name}</strong>
          </Link>
        </div>
      </section>
    </div>
  )
}
