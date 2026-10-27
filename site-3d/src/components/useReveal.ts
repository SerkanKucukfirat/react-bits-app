import { useEffect, type PointerEvent as RPointerEvent, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Elements marked .reveal inside the scope rise into place as they scroll into view.
export function useReveal(scope: RefObject<HTMLElement | null>, deps: unknown[] = []) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          rotateX: -12,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%' },
        })
      })
    }, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

// Pointer tilt for cards: sets --rx/--ry/--mx/--my that the CSS turns into a 3D lean and a light spot.
export function tilt(e: RPointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.setProperty('--rx', `${-y * 10}deg`)
  el.style.setProperty('--ry', `${x * 12}deg`)
  el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
  el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
}
export function untilt(e: RPointerEvent<HTMLElement>) {
  e.currentTarget.style.setProperty('--rx', '0deg')
  e.currentTarget.style.setProperty('--ry', '0deg')
}
