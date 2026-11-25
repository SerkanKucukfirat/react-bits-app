import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Link, useNavigate } from 'react-router-dom'
import { categories, devicePage, showroom } from '../content'

const N = showroom.length
const STEP = (Math.PI * 2) / N

// A 360° turntable of devices standing in a white studio. Drag or use the arrows to spin it;
// the device at the front gets the spotlight and its details.
export default function Showroom() {
  const ring = useRef<HTMLDivElement>(null)
  const items = useRef<(HTMLDivElement | null)[]>([])
  const state = useRef({ angle: 0, target: 0, dragging: false, lastX: 0, downX: 0, picked: -1, idle: 0, spacing: 500 })
  const [active, setActive] = useState(0)
  const navigate = useNavigate()
  const go = useRef(navigate)
  go.current = navigate

  const snapTo = (i: number) => {
    const st = state.current
    // nearest equivalent of -i * STEP to the current angle
    const base = -i * STEP
    const turns = Math.round((st.target - base) / (Math.PI * 2))
    st.target = base + turns * Math.PI * 2
    st.idle = 0
  }

  useEffect(() => {
    const st = state.current
    const el = ring.current
    if (!el) return
    let raf = 0
    let last = performance.now()
    let shown = -1
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const w = el.clientWidth
      // radius of the 360° turntable; devices travel round it and the nearest one faces the viewer
      // the ring grows with the number of devices, so neighbours keep the same spacing as with nine
      const R = (w < 760 ? w * 0.62 : Math.min(w * 0.44, 660)) * Math.max(1, N / 9)
      st.spacing = R * STEP // drag distance that moves one device
      if (!st.dragging) {
        st.idle += dt
        if (st.idle > 4.5) {
          snapTo((((Math.round(-st.target / STEP) + 1) % N) + N) % N)
        }
        st.angle += (st.target - st.angle) * Math.min(dt * 5, 1)
      }
      let front = 0
      let best = -Infinity
      for (let i = 0; i < N; i++) {
        const node = items.current[i]
        if (!node) continue
        const a = st.angle + i * STEP
        const x = Math.sin(a) * R
        const z = Math.cos(a) * R - R
        // fade and shrink by how many places a device is from the front (as with nine devices),
        // so a fuller ring keeps the same airy look
        const wrapped = Math.atan2(Math.sin(a), Math.cos(a))
        const depth = (Math.cos(Math.min(Math.abs(wrapped) * Math.max(1, N / 9), Math.PI)) + 1) / 2 // 1 front, 0 back
        if (depth > best) {
          best = depth
          front = i
        }
        // the front device stands out; those round the back recede, small and faint
        const focus = Math.pow(depth, 4)
        const scale = 0.42 + focus * 0.68
        node.style.transform = `translate3d(${x}px, ${(1 - depth) * -46}px, ${z}px) scale(${scale})`
        node.style.opacity = String(0.12 + focus * 0.88)
        node.style.filter = focus > 0.97 ? 'none' : `blur(${(1 - focus) * 2.5}px) saturate(${0.5 + focus * 0.5})`
        node.style.zIndex = String(Math.round(depth * 100))
        node.style.pointerEvents = depth > 0.5 ? 'auto' : 'none'
      }
      if (front !== shown) {
        shown = front
        setActive(front)
      }
    }
    raf = requestAnimationFrame(tick)

    const down = (e: PointerEvent) => {
      if ((e.target as HTMLElement).closest('button')) return // let the arrow buttons click
      st.dragging = true
      st.lastX = e.clientX
      st.downX = e.clientX
      // which device was pressed: a tap (not a drag) on it opens or turns to it on release
      const dev = (e.target as HTMLElement).closest<HTMLElement>('.device')
      st.picked = dev ? items.current.indexOf(dev as HTMLDivElement) : -1
      st.idle = 0
      el.setPointerCapture(e.pointerId)
    }
    const move = (e: PointerEvent) => {
      if (!st.dragging) return
      const dx = e.clientX - st.lastX
      st.lastX = e.clientX
      st.angle += (dx / st.spacing) * STEP
      st.target = st.angle
    }
    const up = () => {
      if (!st.dragging) return
      st.dragging = false
      const tapped = Math.abs(st.lastX - st.downX) < 6 ? st.picked : -1
      st.picked = -1
      if (tapped >= 0 && tapped === shown) {
        // the device at the front opens its page at the description
        go.current(`${devicePage(showroom[tapped])}#aciklama`)
        return
      }
      if (tapped >= 0) snapTo(tapped)
      else snapTo((((Math.round(-st.angle / STEP)) % N) + N) % N)
    }
    el.addEventListener('pointerdown', down)
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerup', up)
    el.addEventListener('pointercancel', up)
    return () => {
      cancelAnimationFrame(raf)
      el.removeEventListener('pointerdown', down)
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerup', up)
      el.removeEventListener('pointercancel', up)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.showroom-head > *', {
        y: 50,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.showroom', start: 'top 70%' },
      })
      gsap.from('.turntable', {
        rotateX: 40,
        y: 120,
        opacity: 0,
        duration: 1.6,
        ease: 'expo.out',
        scrollTrigger: { trigger: '.turntable', start: 'top 85%' },
      })
    })
    return () => ctx.revert()
  }, [])

  const d = showroom[active]
  const cat = categories.find(c => c.slug === d.categorySlug)?.name

  return (
    <section className="showroom" id="showroom">
      <div className="showroom-head wrap">
        <p className="eyebrow dark">
          <span className="dot" /> 3D Showroom
        </p>
        <h2>
          Cihazlarımızı <span className="ink-grad">her açıdan</span> keşfedin
        </h2>
        <p className="lead">Avrupa Birliği’nde üretilen yeni nesil zayıflama ve wellness teknolojileri.</p>
      </div>

      <div className="turntable" ref={ring}>
        <div className="turntable-floor" />
        <div className="turntable-ring" />
        {showroom.map((dev, i) => (
          <div
            key={dev.slug}
            className={`device ${i === active ? 'is-front' : ''}`}
            ref={n => {
              items.current[i] = n
            }}
            data-label={i === active ? `${dev.name} — açıklamayı gör ↗` : dev.name}
            aria-label={i === active ? `${dev.name}, açıklamaya git` : dev.name}
          >
            <img src={dev.cutout} alt={dev.name} draggable={false} decoding="async" />
          </div>
        ))}
        <button className="tt-arrow left" aria-label="Önceki cihaz" onClick={() => snapTo((active - 1 + N) % N)}>
          ←
        </button>
        <button className="tt-arrow right" aria-label="Sonraki cihaz" onClick={() => snapTo((active + 1) % N)}>
          →
        </button>
      </div>

      <div className="device-info wrap" key={d.slug}>
        <div>
          <p className="device-cat">
            {String(active + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} · {cat}
          </p>
          <h3>{d.name}</h3>
          <p className="device-desc">{d.description[0]}</p>
        </div>
        <div className="device-side">
          <ul className="chips">
            {d.features.slice(0, 6).map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link className="btn dark" to={devicePage(d)}>
            Cihazı incele <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
