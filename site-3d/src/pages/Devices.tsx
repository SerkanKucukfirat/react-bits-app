import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link, useSearchParams } from 'react-router-dom'
import PageHero from '../components/PageHero'
import { tilt, untilt } from '../components/useReveal'
import { categories, cutoutOf, devicePage, devices, type Device } from '../content'

export function DeviceCard({ d }: { d: Device }) {
  const cut = cutoutOf(d)
  const cat = categories.find(c => c.slug === d.categorySlug)?.name
  return (
    <Link to={devicePage(d)} className="dcard" onPointerMove={tilt} onPointerLeave={untilt}>
      <div className="dcard-inner">
        <div className={`dcard-media ${cut ? 'is-cut' : ''}`}>
          <img src={cut ?? d.image} alt={d.name} loading="lazy" />
        </div>
        <div className="dcard-text">
          <span className="dcard-cat">{cat}</span>
          <strong>{d.name}</strong>
        </div>
        <span className="dcard-arrow">↗</span>
      </div>
    </Link>
  )
}

export default function Devices() {
  const [params, setParams] = useSearchParams()
  const active = params.get('kategori') ?? ''
  const list = active ? devices.filter(d => d.categorySlug === active) : devices
  const grid = useRef<HTMLDivElement>(null)
  const activeName = categories.find(c => c.slug === active)?.name

  // cards drop in, staggered, every time the filter changes
  useEffect(() => {
    const cards = grid.current?.querySelectorAll('.dcard')
    if (!cards?.length) return
    const tw = gsap.fromTo(cards, { y: 50, opacity: 0, rotateX: -15 }, { y: 0, opacity: 1, rotateX: 0, duration: 0.9, ease: 'expo.out', stagger: 0.05 })
    return () => {
      tw.kill()
    }
  }, [active])

  return (
    <>
      <PageHero
        eyebrow="Cihazlar"
        title={activeName ?? 'Cihazlarımız'}
        text="Avrupa Birliği’nde üretilen zayıflama, incelme ve wellness teknolojileri. Merkeziniz için doğru cihazı keşfedin."
        crumbs={[{ to: '/cihazlar', label: 'Cihazlar' }]}
      />
      <section className="studio">
        <div className="wrap">
          <div className="filters" role="tablist" aria-label="Kategoriler">
            <button role="tab" aria-selected={!active} className={!active ? 'is-active' : ''} onClick={() => setParams({})}>
              Tümü <em>{devices.length}</em>
            </button>
            {categories.map(c => {
              const n = devices.filter(d => d.categorySlug === c.slug).length
              return (
                <button
                  key={c.slug}
                  role="tab"
                  aria-selected={active === c.slug}
                  className={active === c.slug ? 'is-active' : ''}
                  onClick={() => setParams({ kategori: c.slug })}
                >
                  {c.name} <em>{n}</em>
                </button>
              )
            })}
          </div>
          <div className="dgrid" ref={grid}>
            {list.map(d => (
              <DeviceCard key={d.slug} d={d} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
