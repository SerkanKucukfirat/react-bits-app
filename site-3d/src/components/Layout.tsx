import { useEffect, useRef, useState, type RefObject } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { CLASSIC, LOGO, WHATSAPP, categories, corporatePages } from '../content'
import { Footer } from './Sections'

gsap.registerPlugin(ScrollTrigger)

let lenis: Lenis | null = null

// Smooth scrolling for the whole site; in-page "#anchor" links glide to their section.
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.09 })
    lenis.on('scroll', ScrollTrigger.update)
    const raf = (t: number) => lenis?.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!a || !lenis) return
      e.preventDefault()
      lenis.scrollTo(a.getAttribute('href')!, { duration: 1.6 })
    }
    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
      gsap.ticker.remove(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

// Each route starts at the top behind a short curtain wipe, and scroll animations are re-measured.
function usePageChange(curtain: RefObject<HTMLDivElement | null>) {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    // force: the mobile menu stops Lenis while it is open, and a new page must still start at the top
    window.scrollTo(0, 0)
    lenis?.scrollTo(0, { immediate: true, force: true })
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120)
    if (first.current) {
      first.current = false
    } else if (curtain.current) {
      gsap.fromTo(curtain.current, { scaleY: 1, transformOrigin: '50% 0%' }, { scaleY: 0, duration: 0.9, ease: 'expo.inOut' })
    }
    return () => window.clearTimeout(id)
  }, [pathname, curtain])
}

function Nav() {
  const ref = useRef<HTMLElement>(null)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    if (open) lenis?.stop()
    else lenis?.start()
  }, [open])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: self => {
        el.classList.toggle('is-scrolled', self.scroll() > 80)
        el.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 600)
      },
    })
    return () => st.kill()
  }, [])

  return (
    <>
      <header ref={ref} className="nav">
        <Link to="/" className="nav-logo" aria-label="Slimwell Group ana sayfa">
          <img src={LOGO} alt="Slimwell Group" />
        </Link>
        <nav className="nav-links" aria-label="Ana menü">
          <div className="nav-item">
            <NavLink to="/cihazlar">Cihazlar</NavLink>
            <div className="nav-drop">
              <Link to="/cihazlar">Tüm cihazlar</Link>
              {categories.map(c => (
                <Link key={c.slug} to={`/cihazlar?kategori=${c.slug}`}>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/markalar">Markalar</NavLink>
          <div className="nav-item">
            <NavLink to="/hakkimizda" className={() => (corporatePages.some(p => p.to === pathname) ? 'active' : '')}>
              Kurumsal
            </NavLink>
            <div className="nav-drop">
              {corporatePages.map(p => (
                <Link key={p.to} to={p.to}>
                  {p.label}
                </Link>
              ))}
            </div>
          </div>
          <NavLink to="/iletisim">İletişim</NavLink>
        </nav>
        <div className="nav-actions">
          <a className="btn glass nav-cta" href={WHATSAPP} target="_blank" rel="noreferrer">
            Bilgi al <span>↗</span>
          </a>
          <button
            className={`burger ${open ? 'is-open' : ''}`}
            aria-label={open ? 'Menüyü kapat' : 'Menüyü aç'}
            aria-expanded={open}
            onClick={() => setOpen(o => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          <Link to="/">Ana sayfa</Link>
          <Link to="/cihazlar">Cihazlar</Link>
          <Link to="/markalar">Markalar</Link>
          <span className="mobile-label">Kurumsal</span>
          {corporatePages.map(p => (
            <Link key={p.to} to={p.to} className="small">
              {p.label}
            </Link>
          ))}
          <Link to="/iletisim">İletişim</Link>
          <a className="btn light" href={WHATSAPP} target="_blank" rel="noreferrer">
            WhatsApp’tan yazın <span>↗</span>
          </a>
          <a className="mobile-classic" href={CLASSIC}>
            Klasik siteye geç
          </a>
        </div>
      </div>
    </>
  )
}

export default function Layout() {
  const curtain = useRef<HTMLDivElement>(null)
  useSmoothScroll()
  usePageChange(curtain)
  return (
    <>
      <div className="grain" aria-hidden />
      <div className="curtain" ref={curtain} aria-hidden />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
