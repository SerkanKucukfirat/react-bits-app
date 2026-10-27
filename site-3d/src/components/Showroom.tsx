import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { categories, devicePage, showroom } from '../content'

const N = showroom.length
const STEP = (Math.PI * 2) / N

// A 3D carousel of devices standing in a white studio. Drag or use the arrows to move it;
// the device at the front gets the spotlight and its details, its neighbours stand back at an angle.
export default function Showroom() {
  const ring = useRef<HTMLDivElement>(null)
  const items = useRef<(HTMLDivElement | null)[]>([])
  const state = useRef({ angle: 0, target: 0, dragging: false, lastX: 0, idle: 0, spacing: 500 })
  const [active, setActive] = useState(0)

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
      // distance between neighbours: wide enough that the front device never overlaps the next one
      st.spacing = w < 760 ? w * 0.82 : Math.min(w * 0.4, 620)
      if (!st.dragging) {
        st.idle += dt
        if (st.idle > 4.5) {
          snapTo((((Math.round(-st.target / STEP) + 1) % N) + N) % N)
        }
        st.angle += (st.target - st.angle) * Math.min(dt * 5, 1)
      }
      // position of the carousel in device units; k is each device's offset from the front
      const pos = -st.angle / STEP
      const front = ((Math.round(pos) % N) + N) % N
      for (let i = 0; i < N; i++) {
        const node = items.current[i]
        if (!node) continue
        let k = i - pos
        k = ((((k + N / 2) % N) + N) % N) - N / 2
        const d = Math.min(Math.abs(k), 2.5)
        const x = k * st.spacing
        const scale = 1 - Math.min(d, 1) * 0.3 - Math.max(d - 1, 0) * 0.15
        node.style.transform = `translate3d(${x}px, 0, ${-d * 260}px) rotateY(${Math.max(-1, Math.min(1, k)) * -28}deg) scale(${scale})`
        node.style.opacity = String(Math.max(0, 1 - d * 0.45 - Math.max(d - 1, 0) * 0.6))
        node.style.filter = d > 0.05 ? `blur(${Math.min(d, 1) * 2}px) saturate(${1 - Math.min(d, 1) * 0.5})` : 'none'
        node.style.zIndex = String(100 - Math.round(d * 30))
        node.style.pointerEvents = d < 1.6 ? 'auto' : 'none'
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
      snapTo((((Math.round(-st.angle / STEP)) % N) + N) % N)
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
        <p className="lead">Sürükleyin, döndürün, inceleyin. Avrupa Birliği’nde üretilen yeni nesil zayıflama ve wellness teknolojileri.</p>
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
            onClick={() => snapTo(i)}
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
          <a className="btn dark" href={devicePage(d)}>
            Cihazı incele <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
