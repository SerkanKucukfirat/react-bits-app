import React from 'react'
import {
  AbsoluteFill,
  Audio,
  Easing,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  random,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion'

// Sinematik v2 – yeni ekran kaydı (public/v2) ve kesilmiş seslendirme (public/seslendirme2.wav)
const FPS = 30
const f = (s: number) => Math.round(s * FPS)
export const TOTAL2 = f(67)

const FONT = "'Inter Display', 'Inter', sans-serif"
const DOMAIN = 'slimwell.heocademy.com'
const PINK = '#e879f9'
const VIOLET = '#a78bfa'
const GOLD = '#f5c96a'
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const
const ease = Easing.bezier(0.22, 1, 0.36, 1)

type Zoom = { x: number; y: number; scale: number; from: number; to: number }
type Shot = { rotY: number; rotX: number; scale: number; dx: number }
type Scene = { from: number; src: string; step: number; path?: string; still?: boolean; zoom?: Zoom; shot: Shot }

// Seslendirme zamanlamalarına göre sahneler (saniye)
const scenes: Scene[] = [
  { from: 6.9, src: 'v2/site.mp4', step: 0, shot: { rotY: -16, rotX: 7, scale: 0.94, dx: 0 } },
  { from: 11.0, src: 'v2/kayit.mp4', step: 1, path: '/kayit-ol', shot: { rotY: 11, rotX: 4, scale: 0.97, dx: 10 }, zoom: { x: 0.5, y: 0.45, scale: 1.45, from: 2.4, to: 11.6 } },
  { from: 23.3, src: 'v2/giris.mp4', step: 2, shot: { rotY: -11, rotX: 5, scale: 0.96, dx: 0 }, zoom: { x: 0.5, y: 0.42, scale: 1.4, from: 0.3, to: 3.4 } },
  { from: 27.45, src: 'v2/menu.mp4', step: 3, shot: { rotY: 7, rotX: 3, scale: 0.97, dx: 0 }, zoom: { x: 0.92, y: 0.12, scale: 1.7, from: 0.05, to: 1.5 } },
  { from: 30.8, src: 'v2/incele.mp4', step: 3, shot: { rotY: -6, rotX: 3, scale: 0.98, dx: 0 } },
  { from: 33.65, src: 'v2/ders.mp4', step: 4, shot: { rotY: -2, rotX: 1, scale: 1.04, dx: -10 } },
  { from: 40.45, src: 'v2/quiz.mp4', step: 5, shot: { rotY: 12, rotX: 4, scale: 0.97, dx: 0 }, zoom: { x: 0.62, y: 0.3, scale: 1.35, from: 0.4, to: 4.6 } },
  { from: 47.5, src: 'v2/takip.mp4', step: 6, shot: { rotY: -12, rotX: 4, scale: 0.97, dx: 0 } },
  { from: 54.2, src: 'v2/sertifika.png', step: 7, still: true, path: '/get-certificate', shot: { rotY: 0, rotX: 2, scale: 1.0, dx: 0 }, zoom: { x: 0.62, y: 0.55, scale: 1.12, from: 0.2, to: 7.2 } },
]
const OUTRO = 61.4

const steps = [
  { title: 'Siteye girin', text: 'Slimwell Akademi web sitesi' },
  { title: 'Kayıt olun', text: 'Bilgilerinizi girin, “Hemen Başlayın”' },
  { title: 'Giriş yapın', text: 'E-posta adresiniz ve şifrenizle' },
  { title: 'Eğitiminizi seçin', text: 'Eğitimlerim › Videolu Eğitimler' },
  { title: 'Videoları izleyin', text: 'Uzman anlatımı, bölüm bölüm' },
  { title: 'Quiz’i çözün', text: 'Süreli sorular, anında sonuç' },
  { title: 'İlerlemenizi takip edin', text: 'Kaldığınız yerden devam edin' },
  { title: 'Sertifikanızı alın', text: 'Slimwell Akademi Bitirme Sertifikası' },
]
const stepStart = steps.map((_, i) => scenes.find(s => s.step === i)!.from)

// Ekrandan fırlayan kartlar (seslendirmedeki kelimelerle eş zamanlı)
type Chip = { at: number; to: number; text: string; x: number; y: number; icon?: string; accent?: string; big?: boolean }
const chips: Chip[] = [
  { at: 11.9, to: 13.6, text: 'Kayıt Ol', x: 1520, y: 170, icon: '↗', accent: PINK },
  { at: 13.76, to: 19.5, text: 'Ad Soyad', x: 1530, y: 300, icon: '①' },
  { at: 14.52, to: 19.5, text: 'E-posta', x: 1590, y: 390, icon: '②' },
  { at: 15.92, to: 19.5, text: 'Şifre', x: 1550, y: 480, icon: '③' },
  { at: 16.71, to: 19.5, text: 'Telefon', x: 1600, y: 570, icon: '④' },
  { at: 18.06, to: 19.5, text: 'Şirket bilgileri', x: 1540, y: 660, icon: '⑤' },
  { at: 21.2, to: 23.1, text: 'Hemen Başlayın', x: 1290, y: 840, icon: '✓', accent: PINK, big: true },
  { at: 25.36, to: 27.3, text: 'E-posta + Şifre', x: 1430, y: 220, icon: '🔒' },
  { at: 27.68, to: 30.7, text: 'Eğitimlerim', x: 1460, y: 220, icon: '☰', accent: VIOLET },
  { at: 29.12, to: 30.7, text: 'Videolu Eğitimler', x: 1420, y: 320, icon: '▶', accent: PINK },
  { at: 32.6, to: 33.6, text: 'İncele →', x: 1380, y: 820, icon: '✦', accent: PINK, big: true },
  { at: 34.73, to: 38.0, text: 'Uzman anlatımı', x: 1530, y: 190, icon: '★', accent: GOLD },
  { at: 35.77, to: 38.0, text: 'Bölüm bölüm', x: 1580, y: 290, icon: '▤' },
  { at: 42.36, to: 45.3, text: 'Kısa quiz', x: 1520, y: 200, icon: '?', accent: VIOLET },
  { at: 45.4, to: 47.3, text: 'Anında sonuç', x: 1480, y: 820, icon: '✓', accent: '#4ade80', big: true },
  { at: 49.4, to: 54.0, text: 'Eğitimlerim', x: 1520, y: 200, icon: '☰', accent: VIOLET },
  { at: 51.72, to: 54.0, text: 'Kaldığınız yerden devam', x: 1360, y: 840, icon: '↻' },
  { at: 58.84, to: 61.2, text: 'Sertifikanı al', x: 1400, y: 840, icon: '⤓', accent: GOLD, big: true },
]

// Pencere geometrisi
const CW = 1240
const CH = Math.round((CW * 962) / 1600)
const BAR = 44
const WX = 600
const WY = Math.round((1080 - CH - BAR) / 2) + 6

function currentScene(t: number) {
  let idx = -1
  scenes.forEach((s, i) => {
    if (t >= s.from) idx = i
  })
  return idx
}

function Background() {
  const frame = useCurrentFrame()
  const t = frame / FPS
  const beams = [
    { c: 'rgba(232,121,249,0.22)', r: -28 + Math.sin(t * 0.2) * 8, x: 1300 },
    { c: 'rgba(167,139,250,0.18)', r: 22 + Math.cos(t * 0.17) * 8, x: 420 },
    { c: 'rgba(125,211,252,0.10)', r: -8 + Math.sin(t * 0.13) * 6, x: 900 },
  ]
  return (
    <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a1029 0%, #0a0711 55%, #030206 100%)', overflow: 'hidden' }}>
      {beams.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: b.x - 160,
            top: -300,
            width: 320,
            height: 1700,
            transform: `rotate(${b.r}deg)`,
            transformOrigin: '50% 0%',
            background: `linear-gradient(180deg, ${b.c} 0%, transparent 85%)`,
            filter: 'blur(40px)',
            opacity: 0.8 + Math.sin(t * 0.7 + i) * 0.2,
          }}
        />
      ))}
      <Particles />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%)' }} />
    </AbsoluteFill>
  )
}

function Particles() {
  const frame = useCurrentFrame()
  const t = frame / FPS
  return (
    <>
      {new Array(70).fill(0).map((_, i) => {
        const x0 = random(`px${i}`) * 1920
        const y0 = random(`py${i}`) * 1080
        const sp = 8 + random(`ps${i}`) * 24
        const size = 1.5 + random(`sz${i}`) * 3.5
        const y = (((y0 - t * sp) % 1180) + 1180) % 1180 - 50
        const x = x0 + Math.sin(t * 0.5 + i) * 18
        const tw = 0.25 + 0.75 * Math.abs(Math.sin(t * (0.6 + random(`tw${i}`)) + i))
        const col = i % 3 === 0 ? PINK : i % 3 === 1 ? VIOLET : '#ffffff'
        return <div key={i} style={{ position: 'absolute', left: x, top: y, width: size, height: size, borderRadius: '50%', background: col, opacity: tw * 0.55, boxShadow: `0 0 ${size * 4}px ${col}` }} />
      })}
    </>
  )
}

function Grain() {
  const frame = useCurrentFrame()
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.07, mixBlendMode: 'overlay' }}>
      <svg width="1920" height="1080">
        <filter id="g">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed={frame % 12} />
        </filter>
        <rect width="1920" height="1080" filter="url(#g)" />
      </svg>
    </AbsoluteFill>
  )
}

function Letterbox() {
  const frame = useCurrentFrame()
  const t = frame / FPS
  const open = interpolate(t, [0.1, 1.1], [540, 52], { ...clamp, easing: Easing.inOut(Easing.cubic) })
  const close = interpolate(t, [66.2, 67], [52, 540], { ...clamp, easing: Easing.inOut(Easing.cubic) })
  const h = t < 30 ? open : close
  return (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: h, background: '#000' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: h, background: '#000' }} />
    </>
  )
}

function SceneContent({ scene }: { scene: Scene }) {
  const frame = useCurrentFrame()
  const fadeIn = interpolate(frame, [0, 6], [0, 1], clamp)
  const blur = interpolate(frame, [0, 7], [10, 0], clamp)
  let zoom = 1
  let ox = 0.5
  let oy = 0.5
  if (scene.zoom) {
    const z = scene.zoom
    const a = f(z.from)
    const b = f(z.to)
    zoom = scene.still
      ? interpolate(frame, [a, b], [1, z.scale], { ...clamp, easing: Easing.inOut(Easing.quad) })
      : interpolate(frame, [a, a + 20, b - 16, b], [1, z.scale, z.scale, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) })
    ox = z.x
    oy = z.y
  }
  const style: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
  return (
    <AbsoluteFill style={{ opacity: fadeIn, filter: `blur(${blur}px)`, transform: `scale(${zoom})`, transformOrigin: `${ox * 100}% ${oy * 100}%` }}>
      {scene.still ? <Img src={staticFile(scene.src)} style={style} /> : <OffthreadVideo src={staticFile(scene.src)} style={style} muted />}
    </AbsoluteFill>
  )
}

function UrlText({ t, frame }: { t: number; frame: number }) {
  const idx = currentScene(t)
  let text = DOMAIN + (scenes[idx]?.path ?? '')
  const typing = t >= 7.4 && t < 10.6
  if (t < 11.0) text = DOMAIN.slice(0, Math.floor(interpolate(t, [7.4, 10.4], [0, DOMAIN.length], clamp)))
  return (
    <span>
      <span style={{ color: '#f3f4f6' }}>{text.slice(0, DOMAIN.length)}</span>
      <span style={{ color: '#9ca3af' }}>{text.slice(DOMAIN.length)}</span>
      {typing && <span style={{ color: PINK, opacity: Math.floor(frame / 8) % 2 ? 0 : 1 }}>|</span>}
    </span>
  )
}

function BrowserWindow() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  // giriş: derinlikten uçarak gelir
  const enter = spring({ frame: frame - f(5.4), fps, config: { damping: 16, mass: 1.3 } })
  const exit = interpolate(t, [OUTRO, OUTRO + 0.9], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) })
  const idx = Math.max(0, currentScene(t))
  const sc = scenes[idx]
  const prev = scenes[Math.max(0, idx - 1)]
  // sahne geçişi: hızlı savrulma (whip) ve yeni açıya yerleşme
  const local = frame - f(sc.from)
  const k = idx === 0 ? 1 : spring({ frame: local, fps, config: { damping: 15, mass: 0.9 } })
  const lerp = (a: number, b: number) => a + (b - a) * k
  const whip = idx === 0 ? 0 : Math.sin(Math.min(1, local / 10) * Math.PI) * (sc.shot.rotY > prev.shot.rotY ? 1 : -1) * 16
  const rotY = lerp(prev.shot.rotY, sc.shot.rotY) + whip + Math.sin(t * 0.45) * 1.5
  const rotX = lerp(prev.shot.rotX, sc.shot.rotX) + Math.cos(t * 0.4) * 0.8
  const scale = lerp(prev.shot.scale, sc.shot.scale) * (1 - exit * 0.25)
  const floatY = Math.sin(t * 0.9) * 7
  const z = interpolate(enter, [0, 1], [-1800, 0])
  const rxIn = interpolate(enter, [0, 1], [48, 0])
  const opacity = interpolate(enter, [0, 0.25], [0, 1], clamp) * (1 - exit)
  // pencere üzerinde ışık süpürmesi
  const sweep = interpolate(local, [0, 16], [-40, 140], clamp)

  return (
    <AbsoluteFill style={{ perspective: 2200 }}>
      <div
        style={{
          position: 'absolute',
          left: WX + sc.shot.dx,
          top: WY,
          width: CW,
          height: CH + BAR,
          transform: `translateZ(${z}px) translateY(${floatY + exit * -60}px) rotateX(${rotX + rxIn}deg) rotateY(${rotY}deg) scale(${scale})`,
          transformOrigin: '50% 50%',
          opacity,
          borderRadius: 20,
          overflow: 'hidden',
          background: '#17141f',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.14), 0 50px 140px rgba(0,0,0,0.75), 0 0 160px rgba(232,121,249,0.28)',
        }}
      >
        <div style={{ height: BAR, display: 'flex', alignItems: 'center', gap: 16, padding: '0 18px', background: 'linear-gradient(#27232f, #1c1924)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div style={{ flex: 1, maxWidth: 700, margin: '0 auto', height: 28, borderRadius: 14, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 9, padding: '0 14px', fontFamily: FONT, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            <svg width="12" height="14" viewBox="0 0 13 15" fill="none">
              <rect x="1" y="6" width="11" height="8" rx="2" fill="#9ca3af" />
              <path d="M3.5 6V4.5a3 3 0 0 1 6 0V6" stroke="#9ca3af" strokeWidth="1.6" />
            </svg>
            <UrlText t={t} frame={frame} />
          </div>
          <div style={{ width: 60 }} />
        </div>
        <div style={{ position: 'relative', width: CW, height: CH, overflow: 'hidden', background: '#fff' }}>
          <Sequence durationInFrames={f(6.9) + 8}>
            <Img src={staticFile('v2/anasayfa.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Sequence>
          {scenes.map((s, i) => {
            const end = scenes[i + 1]?.from ?? OUTRO + 1
            return (
              <Sequence key={s.src + s.from} from={f(s.from)} durationInFrames={f(end - s.from) + 8}>
                <SceneContent scene={s} />
              </Sequence>
            )
          })}
          <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(105deg, transparent ${sweep - 20}%, rgba(255,255,255,0.28) ${sweep}%, transparent ${sweep + 20}%)`, pointerEvents: 'none' }} />
        </div>
      </div>
    </AbsoluteFill>
  )
}

function StepPanel() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t < 6.9 || t > OUTRO + 0.4) return null
  let idx = 0
  stepStart.forEach((s, i) => {
    if (t >= s) idx = i
  })
  const step = steps[idx]
  const local = frame - f(stepStart[idx])
  const next = stepStart[idx + 1] ?? OUTRO
  const out = interpolate(frame, [f(next) - 7, f(next)], [1, 0], clamp)
  const p = (d: number) => spring({ frame: local - d, fps, config: { damping: 18 } })
  const num = p(0)
  const title = p(5)
  const sub = p(10)
  return (
    <div style={{ position: 'absolute', left: 96, top: 0, bottom: 0, width: 460, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: FONT, opacity: out }}>
      <div style={{ position: 'relative', height: 190 }}>
        <div
          style={{
            position: 'absolute',
            fontSize: 210,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.06em',
            color: 'transparent',
            WebkitTextStroke: '2px rgba(255,255,255,0.18)',
            transform: `translateX(${(1 - num) * -80}px) scale(${0.8 + num * 0.2})`,
            opacity: num,
          }}
        >
          {String(idx + 1).padStart(2, '0')}
        </div>
        <div
          style={{
            position: 'absolute',
            fontSize: 210,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: '-0.06em',
            background: `linear-gradient(135deg, #fdf4ff, ${PINK} 45%, ${VIOLET})`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            clipPath: `inset(${(1 - num) * 100}% 0 0 0)`,
          }}
        >
          {String(idx + 1).padStart(2, '0')}
        </div>
      </div>
      <div style={{ overflow: 'hidden', marginTop: 26 }}>
        <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.025em', color: '#fff', transform: `translateY(${(1 - title) * 110}%)` }}>{step.title}</div>
      </div>
      <div style={{ height: 3, width: 120 * sub, marginTop: 22, borderRadius: 2, background: `linear-gradient(90deg, ${PINK}, ${VIOLET})`, boxShadow: `0 0 18px ${PINK}` }} />
      <div style={{ marginTop: 20, fontSize: 24, lineHeight: 1.4, color: 'rgba(255,255,255,0.72)', opacity: sub, filter: `blur(${(1 - sub) * 8}px)` }}>{step.text}</div>
    </div>
  )
}

function Chips() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  return (
    <>
      {chips.map((c, i) => {
        if (t < c.at - 0.1 || t > c.to + 0.4) return null
        const p = spring({ frame: frame - f(c.at), fps, config: { damping: 11, stiffness: 140 } })
        const out = interpolate(t, [c.to, c.to + 0.35], [1, 0], clamp)
        const accent = c.accent ?? '#ffffff'
        const bob = Math.sin(t * 1.6 + i) * 5
        const ring = interpolate(frame - f(c.at), [0, 18], [0, 1], clamp)
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: c.x,
              top: c.y + bob,
              transform: `translate(-50%, -50%) translateY(${(1 - p) * 60}px) scale(${0.4 + p * 0.6}) rotate(${(1 - p) * -8}deg)`,
              opacity: Math.min(1, p * 1.4) * out,
              fontFamily: FONT,
            }}
          >
            {c.big && (
              <div style={{ position: 'absolute', left: '50%', top: '50%', width: 120 + ring * 260, height: 120 + ring * 260, transform: 'translate(-50%,-50%)', borderRadius: '50%', border: `2px solid ${accent}`, opacity: 1 - ring }} />
            )}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: c.big ? '20px 34px' : '14px 24px',
                borderRadius: 999,
                background: 'linear-gradient(135deg, rgba(40,30,58,0.92), rgba(20,16,30,0.92))',
                border: `1px solid ${accent}66`,
                boxShadow: `0 20px 50px rgba(0,0,0,0.55), 0 0 40px ${accent}40, inset 0 1px 0 rgba(255,255,255,0.15)`,
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ width: c.big ? 40 : 32, height: c.big ? 40 : 32, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `${accent}26`, color: accent, fontSize: c.big ? 22 : 17, fontWeight: 700 }}>{c.icon}</span>
              <span style={{ fontSize: c.big ? 34 : 26, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>{c.text}</span>
            </div>
          </div>
        )
      })}
    </>
  )
}

function QuizTimer() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t < 43.4 || t > 47.4) return null
  const p = spring({ frame: frame - f(43.5), fps, config: { damping: 13 } })
  const out = interpolate(t, [47.0, 47.4], [1, 0], clamp)
  const prog = interpolate(t, [43.6, 47.0], [0, 1], clamp)
  return (
    <div style={{ position: 'absolute', left: 1640, top: 720, transform: `translate(-50%,-50%) scale(${0.5 + p * 0.5})`, opacity: p * out, fontFamily: FONT }}>
      <div style={{ position: 'relative', width: 230, height: 230 }}>
        <svg width="230" height="230" style={{ position: 'absolute' }}>
          <circle cx="115" cy="115" r="100" stroke="rgba(255,255,255,0.12)" strokeWidth="10" fill="rgba(20,16,30,0.9)" />
          <circle cx="115" cy="115" r="100" stroke={VIOLET} strokeWidth="10" fill="none" strokeLinecap="round" strokeDasharray={628} strokeDashoffset={628 * prog} transform="rotate(-90 115 115)" style={{ filter: `drop-shadow(0 0 10px ${VIOLET})` }} />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
          <div style={{ fontSize: 26 }}>⏱</div>
          <div style={{ fontSize: 54, fontWeight: 800, lineHeight: 1 }}>3 DK</div>
          <div style={{ fontSize: 18, fontWeight: 500, opacity: 0.7, marginTop: 6 }}>süreli sorular</div>
        </div>
      </div>
    </div>
  )
}

function ProgressBar() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t < 38.1 || t > 40.5) return null
  const p = spring({ frame: frame - f(38.16), fps, config: { damping: 16 } })
  const fill = interpolate(t, [38.4, 40.1], [0, 100], { ...clamp, easing: ease })
  const out = interpolate(t, [40.1, 40.45], [1, 0], clamp)
  return (
    <div style={{ position: 'absolute', left: 1560, top: 860, transform: `translate(-50%,-50%) translateY(${(1 - p) * 50}px)`, opacity: p * out, fontFamily: FONT, width: 420, padding: '20px 26px', borderRadius: 24, background: 'rgba(20,16,30,0.92)', border: '1px solid rgba(255,255,255,0.14)', boxShadow: '0 20px 50px rgba(0,0,0,0.55)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fff', fontSize: 22, fontWeight: 600 }}>
        <span>İlerlemeniz</span>
        <span style={{ fontVariantNumeric: 'tabular-nums', color: PINK }}>%{Math.round(fill)}</span>
      </div>
      <div style={{ marginTop: 14, height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.12)', overflow: 'hidden' }}>
        <div style={{ width: `${fill}%`, height: '100%', background: `linear-gradient(90deg, ${PINK}, ${VIOLET})`, boxShadow: `0 0 16px ${PINK}` }} />
      </div>
    </div>
  )
}

function CertificateHero() {
  // sertifika pencereden öne çıkar, altın parıltı ve konfeti
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t < 55.2 || t > OUTRO + 0.3) return null
  const p = spring({ frame: frame - f(55.3), fps, config: { damping: 14, mass: 1.2 } })
  const out = interpolate(t, [OUTRO - 0.4, OUTRO + 0.2], [1, 0], clamp)
  const shine = interpolate(t, [56.0, 57.4], [-30, 130], clamp)
  const W = 760
  const H = 470
  return (
    <AbsoluteFill style={{ perspective: 1800, opacity: out }}>
      {new Array(46).fill(0).map((_, i) => {
        const a = random(`ca${i}`) * Math.PI * 2
        const d = (t - 55.4) * (260 + random(`cd${i}`) * 420)
        if (t < 55.4) return null
        const x = 1180 + Math.cos(a) * d
        const y = 520 + Math.sin(a) * d + (t - 55.4) ** 2 * 140
        const o = interpolate(t, [55.4, 57.6], [1, 0], clamp)
        const col = [GOLD, PINK, '#ffffff', VIOLET][i % 4]
        return <div key={i} style={{ position: 'absolute', left: x, top: y, width: 10, height: 5, background: col, opacity: o, transform: `rotate(${a * 57 + t * 400}deg)`, boxShadow: `0 0 8px ${col}` }} />
      })}
      <div
        style={{
          position: 'absolute',
          left: 1180 - W / 2,
          top: 520 - H / 2,
          width: W,
          height: H,
          transform: `translateZ(${(1 - p) * -900}px) rotateY(${(1 - p) * -70}deg) rotateX(${(1 - p) * 20}deg)`,
          opacity: Math.min(1, p * 1.5),
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: `0 40px 120px rgba(0,0,0,0.7), 0 0 90px ${GOLD}66, 0 0 0 2px ${GOLD}aa`,
          background: '#fff',
        }}
      >
        <Img
          src={staticFile('v2/sertifika.png')}
          style={{ position: 'absolute', width: 1600 * 0.62, height: 962 * 0.62, left: -1600 * 0.62 * 0.29, top: -962 * 0.62 * 0.07 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(115deg, transparent ${shine - 15}%, rgba(255,236,170,0.55) ${shine}%, transparent ${shine + 15}%)` }} />
      </div>
    </AbsoluteFill>
  )
}

function Words({ words, starts, size, gradient, weight = 800 }: { words: string[]; starts: number[]; size: number; gradient?: boolean; weight?: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return (
    <div style={{ display: 'flex', gap: '0.26em', justifyContent: 'center', flexWrap: 'wrap', fontSize: size, fontWeight: weight, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
      {words.map((w, i) => {
        const p = spring({ frame: frame - f(starts[i]), fps, config: { damping: 15 } })
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.12em' }}>
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${(1 - p) * 105}%) rotate(${(1 - p) * 6}deg)`,
                filter: `blur(${(1 - p) * 6}px)`,
                ...(gradient ? { background: `linear-gradient(135deg, #ffffff 25%, ${PINK} 65%, ${VIOLET})`, WebkitBackgroundClip: 'text', color: 'transparent' } : { color: '#fff' }),
              }}
            >
              {w}
            </span>
          </span>
        )
      })}
    </div>
  )
}

function Intro() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t > 6.6) return null
  const out = interpolate(t, [5.2, 6.2], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) })
  const brand = 'SLIMWELL AKADEMİ'
  const flare = interpolate(t, [0.3, 1.6], [-20, 120], clamp)
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: FONT, opacity: 1 - out, transform: `scale(${1 + out * 0.35})`, filter: `blur(${out * 12}px)` }}>
      <div style={{ position: 'relative', fontSize: 34, fontWeight: 600, letterSpacing: '0.5em', color: '#fff', marginBottom: 36, display: 'flex' }}>
        {[...brand].map((ch, i) => {
          const p = spring({ frame: frame - f(0.25 + i * 0.045), fps, config: { damping: 20 } })
          return (
            <span key={i} style={{ opacity: p, transform: `translateY(${(1 - p) * 24}px)`, filter: `blur(${(1 - p) * 8}px)`, color: i > 8 ? PINK : '#fff', whiteSpace: 'pre' }}>
              {ch}
            </span>
          )
        })}
        <div style={{ position: 'absolute', inset: '-20px -40px', background: `linear-gradient(100deg, transparent ${flare - 10}%, rgba(255,255,255,0.5) ${flare}%, transparent ${flare + 10}%)`, mixBlendMode: 'overlay' }} />
      </div>
      <Words words={['Hoş', 'geldiniz.']} starts={[0.9, 1.15]} size={150} gradient />
      <div style={{ display: 'flex', gap: 26, marginTop: 46 }}>
        {['Estetik', 'Güzellik', 'Zayıflama'].map((w, i) => {
          const at = [1.86, 2.59, 3.24][i]
          const p = spring({ frame: frame - f(at), fps, config: { damping: 12 } })
          return (
            <div key={w} style={{ opacity: p, transform: `scale(${0.5 + p * 0.5}) translateY(${(1 - p) * 30}px)`, padding: '14px 32px', borderRadius: 999, border: '1px solid rgba(232,121,249,0.45)', background: 'rgba(232,121,249,0.08)', fontSize: 32, fontWeight: 600, color: '#fff', boxShadow: `0 0 30px rgba(232,121,249,${0.25 * p})` }}>
              {w}
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 40 }}>
        <Words words={['Tüm', 'eğitimler', 'tek', 'platformda.']} starts={[4.3, 4.5, 4.7, 4.85]} size={40} weight={500} />
      </div>
    </AbsoluteFill>
  )
}

function Outro() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t < OUTRO + 0.2) return null
  const head = spring({ frame: frame - f(61.6), fps, config: { damping: 18 } })
  const pill = spring({ frame: frame - f(65.3), fps, config: { damping: 18 } })
  const flare = interpolate(t, [65.2, 66.4], [-20, 120], clamp)
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: FONT }}>
      <div style={{ opacity: head, letterSpacing: `${interpolate(head, [0, 1], [0.9, 0.5])}em`, fontSize: 34, fontWeight: 600, color: '#fff', marginBottom: 40 }}>
        SLIMWELL <span style={{ color: PINK }}>AKADEMİ</span>
      </div>
      <div style={{ position: 'relative' }}>
        <Words words={['Öğrenin.', 'Gelişin.', 'Fark', 'yaratın.']} starts={[62.69, 63.52, 64.22, 64.42]} size={128} gradient />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(100deg, transparent ${flare - 8}%, rgba(255,255,255,0.45) ${flare}%, transparent ${flare + 8}%)`, mixBlendMode: 'overlay' }} />
      </div>
      <div style={{ opacity: pill, transform: `translateY(${(1 - pill) * 30}px)`, marginTop: 54, padding: '16px 38px', borderRadius: 999, border: '1px solid rgba(232,121,249,0.5)', background: 'rgba(232,121,249,0.1)', fontSize: 30, fontWeight: 500, color: '#fff' }}>
        {DOMAIN}
      </div>
    </AbsoluteFill>
  )
}

function Progress() {
  const frame = useCurrentFrame()
  const t = frame / FPS
  const vis = interpolate(t, [6.6, 7.4, OUTRO - 0.2, OUTRO + 0.4], [0, 1, 1, 0], clamp)
  let idx = -1
  stepStart.forEach((s, i) => {
    if (t >= s) idx = i
  })
  return (
    <div style={{ opacity: vis, fontFamily: FONT }}>
      <div style={{ position: 'absolute', left: 96, top: 84, fontSize: 19, fontWeight: 600, letterSpacing: '0.34em', color: 'rgba(255,255,255,0.85)' }}>
        SLIMWELL <span style={{ color: PINK }}>AKADEMİ</span>
      </div>
      <div style={{ position: 'absolute', left: 96, bottom: 92, display: 'flex', gap: 10 }}>
        {steps.map((_, i) => {
          const p = interpolate(frame, [f(stepStart[i]), f(stepStart[i + 1] ?? OUTRO)], [0, 1], clamp)
          return (
            <div key={i} style={{ width: i === idx ? 70 : 32, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
              <div style={{ width: `${p * 100}%`, height: '100%', background: `linear-gradient(90deg, ${PINK}, ${VIOLET})` }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const Akademi2: React.FC<{ withAudio: boolean }> = ({ withAudio }) => {
  const frame = useCurrentFrame()
  const fade = interpolate(frame, [TOTAL2 - 14, TOTAL2], [1, 0], clamp)
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <AbsoluteFill style={{ opacity: fade }}>
        <Background />
        <Intro />
        <StepPanel />
        <BrowserWindow />
        <Chips />
        <QuizTimer />
        <ProgressBar />
        <CertificateHero />
        <Progress />
        <Outro />
        <Grain />
      </AbsoluteFill>
      <Letterbox />
      {withAudio && <Audio src={staticFile('seslendirme2.wav')} />}
    </AbsoluteFill>
  )
}
