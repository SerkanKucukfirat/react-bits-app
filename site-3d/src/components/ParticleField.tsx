import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A slow, breathing wave of light points; the camera drifts with the mouse and the scroll.
export default function ParticleField() {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    } catch {
      return // no WebGL: the CSS gradient behind stays visible
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    el.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x05060a, 0.055)
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100)
    camera.position.set(0, 2.6, 9)

    const COLS = 180
    const ROWS = 90
    const positions = new Float32Array(COLS * ROWS * 3)
    const seeds = new Float32Array(COLS * ROWS)
    for (let i = 0; i < COLS; i++)
      for (let j = 0; j < ROWS; j++) {
        const k = i * ROWS + j
        positions[k * 3] = (i / COLS - 0.5) * 34
        positions[k * 3 + 1] = 0
        positions[k * 3 + 2] = (j / ROWS - 0.5) * 22 - 4
        seeds[k] = Math.random()
      }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('seed', new THREE.BufferAttribute(seeds, 1))

    const mat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uPixel: { value: renderer.getPixelRatio() } },
      vertexShader: /* glsl */ `
        uniform float uTime; uniform float uPixel;
        attribute float seed;
        varying float vGlow; varying float vSeed;
        void main() {
          vec3 p = position;
          float w = sin(p.x * 0.35 + uTime * 0.6) * 0.55 + cos(p.z * 0.5 + uTime * 0.45) * 0.45
                  + sin((p.x + p.z) * 0.18 - uTime * 0.3) * 0.6;
          p.y += w;
          vGlow = smoothstep(-1.2, 1.4, w);
          vSeed = seed;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.4 + vGlow * 2.6 + step(0.985, seed) * 4.0) * uPixel * (7.0 / -mv.z);
        }`,
      fragmentShader: /* glsl */ `
        varying float vGlow; varying float vSeed;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          vec3 ice = vec3(0.62, 0.84, 1.0);
          vec3 silver = vec3(0.85, 0.88, 0.95);
          vec3 c = mix(silver * 0.5, ice, vGlow);
          float a = (1.0 - d * 2.0) * (0.25 + vGlow * 0.75);
          gl_FragColor = vec4(c, a);
        }`,
    })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    const resize = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(el)

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
    const onMove = (e: PointerEvent) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    let visible = true
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
    io.observe(el)

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const clock = new THREE.Clock()
    let raf = 0
    const tick = () => {
      raf = requestAnimationFrame(tick)
      if (!visible) return
      const t = reduce ? 0 : clock.getElapsedTime()
      mat.uniforms.uTime.value = t
      mouse.x += (mouse.tx - mouse.x) * 0.04
      mouse.y += (mouse.ty - mouse.y) * 0.04
      const scroll = Math.min(window.scrollY / window.innerHeight, 1.5)
      camera.position.x = mouse.x * 1.4
      camera.position.y = 2.6 - mouse.y * 0.6 + scroll * 1.2
      camera.lookAt(0, -scroll * 0.8, -2)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      geo.dispose()
      mat.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={host} className="particles" aria-hidden />
}
