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
import quads from '../public/v3/quads.json'

// Sinematik v7 – v6'nın içeriği; her adım tek çekim, çekimler arası karanlığa yumuşak geçiş (üst üste
// binen iki laptop yok), yavaş ve sabit kamera hareketi, ekran içinde sert zoom yok; ses: public/seslendirme5.mp3
const FPS = 30
const f = (s: number) => Math.round(s * FPS)
export const TOTAL7 = f(73.5)

const FONT = "'Inter Display', 'Inter', sans-serif"
const PINK = '#e879f9'
const VIOLET = '#a78bfa'
const GOLD = '#f5c96a'
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const
const ease = Easing.bezier(0.22, 1, 0.36, 1)
const slow = Easing.bezier(0.45, 0, 0.55, 1)

// Ekran içeriği: seslendirmeye göre sahneler (saniye) – ekranda sırayla oynar
type Zoom = { x: number; y: number; scale: number; from: number; to: number }
// start: kaynakta başlangıç (sn), rate: oynatma hızı, pos: object-position (dar kayıtlar için)
type Scene = { from: number; src: string; still?: boolean; zoom?: Zoom; start?: number; rate?: number; pos?: string }
const scenes: Scene[] = [
  { from: 6.2, src: 'v2/anasayfa.png', still: true },
  { from: 6.8, src: 'v2/site.mp4' },
  { from: 8.65, src: 'v2/site.mp4', start: 2.4 }, // 1.9–2.4 sn arası mavi yükleme ekranı atlanır
  { from: 10.8, src: 'v2/kayit.mp4', rate: 1.25, zoom: { x: 0.5, y: 0.4, scale: 1.08, from: 0, to: 10.4 } },
  { from: 21.2, src: 'v2/giris.mp4', zoom: { x: 0.5, y: 0.42, scale: 1.06, from: 0, to: 3.9 } },
  // Revcell kartı çıkarılmış eğitim listesi (menu.mp4 karesi + liste kartları)
  { from: 25.1, src: 'v2/liste.png', still: true, zoom: { x: 0.5, y: 0.6, scale: 1.05, from: 0, to: 5.3 } },
  { from: 30.4, src: 'v2/satinal.mp4', start: 0.25, rate: 0.555, pos: '0% 50%', zoom: { x: 0.1, y: 0.55, scale: 1.06, from: 0, to: 9.1 } },
  { from: 39.5, src: 'v2/ders.mp4' },
  { from: 46.3, src: 'v2/quiz.mp4', zoom: { x: 0.6, y: 0.35, scale: 1.06, from: 0, to: 6.8 } },
  { from: 53.1, src: 'v2/takip.mp4' },
  { from: 59.6, src: 'v2/sertifika.png', still: true, zoom: { x: 0.6, y: 0.5, scale: 1.05, from: 0, to: 7.4 } },
]
const SCREEN_END = 67.0

// Kamera çekimleri: hangi laptop görseli, ne zaman, kamera nasıl hareket eder
type Cam = { s: number; x: number; y: number } // ölçek ve kayma (px)
type Shot = { img: '2' | '3' | '4' | '5' | '6'; from: number; to: number; a: Cam; b: Cam }
// Her adım tek çekim; kamera yalnızca %4–6 yaklaşır ve en fazla 40 px kayar
const shots: Shot[] = [
  { img: '6', from: 4.0, to: 6.8, a: { s: 1.0, x: 10, y: 20 }, b: { s: 1.04, x: 0, y: 10 } },
  { img: '4', from: 6.8, to: 10.8, a: { s: 1.02, x: 10, y: 0 }, b: { s: 1.06, x: -20, y: 6 } },
  { img: '2', from: 10.8, to: 21.2, a: { s: 1.04, x: 150, y: 30 }, b: { s: 1.1, x: 190, y: 45 } },
  { img: '5', from: 21.2, to: 25.1, a: { s: 1.06, x: 20, y: 10 }, b: { s: 1.1, x: -10, y: 22 } },
  { img: '3', from: 25.1, to: 30.4, a: { s: 1.08, x: 20, y: 0 }, b: { s: 1.12, x: -10, y: 10 } },
  { img: '6', from: 30.4, to: 39.5, a: { s: 1.02, x: 20, y: 0 }, b: { s: 1.08, x: -20, y: 12 } },
  { img: '2', from: 39.5, to: 46.3, a: { s: 1.04, x: 150, y: 30 }, b: { s: 1.09, x: 185, y: 42 } },
  { img: '4', from: 46.3, to: 53.1, a: { s: 1.02, x: 10, y: 0 }, b: { s: 1.07, x: -25, y: 8 } },
  { img: '3', from: 53.1, to: 59.6, a: { s: 1.08, x: 20, y: 0 }, b: { s: 1.12, x: -15, y: 10 } },
  { img: '5', from: 59.6, to: 67.0, a: { s: 1.06, x: 20, y: 10 }, b: { s: 1.12, x: -20, y: 30 } },
]
// Geçiş: eski çekim karanlığa söner, yeni çekim karanlıktan açılır; aradaki ışık sızıntısı geçişi örter
const XOUT = 0.45
const XIN = 0.6

const steps = [
  { at: 6.8, title: 'Siteye girin', text: 'slimwell.heocademy.com' },
  { at: 10.8, title: 'Kayıt olun', text: 'Bilgilerinizi girin, “Hemen Başlayın”' },
  { at: 21.2, title: 'Giriş yapın', text: 'E-posta adresiniz ve şifrenizle' },
  { at: 25.1, title: 'Eğitiminizi seçin', text: 'Birçok markamızın eğitimleri' },
  { at: 30.4, title: 'Eğitimi hesabınıza ekleyin', text: 'Ücretsiz eğitimler de aynı şekilde' },
  { at: 39.5, title: 'Videoları izleyin', text: 'Uzman anlatımı, bölüm bölüm' },
  { at: 46.3, title: 'Quiz’i çözün', text: 'Süreli sorular, anında sonuç' },
  { at: 53.1, title: 'İlerlemenizi takip edin', text: 'Kaldığınız yerden devam edin' },
  { at: 59.6, title: 'Sertifikanızı alın', text: 'Slimwell HEO Academy Bitirme Sertifikası' },
]
const OUTRO = 66.6

// Seslendirmeyle eş zamanlı bilgi kartları (sol bilgi alanında)
type Chip = { at: number; to: number; text: string; icon: string; accent?: string }
const chips: Chip[] = [
  { at: 11.6, to: 13.0, text: 'Kayıt Ol', icon: '↗', accent: PINK },
  { at: 13.09, to: 18.8, text: 'Ad Soyad', icon: '1' },
  { at: 13.72, to: 18.8, text: 'E-posta', icon: '2' },
  { at: 15.04, to: 18.8, text: 'Şifre', icon: '3' },
  { at: 15.84, to: 18.8, text: 'Telefon', icon: '4' },
  { at: 17.18, to: 18.8, text: 'Şirket bilgileri', icon: '5' },
  { at: 19.5, to: 21.0, text: 'Hemen Başlayın', icon: '✓', accent: PINK },
  { at: 23.0, to: 24.9, text: 'E-posta + Şifre', icon: '🔒' },
  { at: 25.7, to: 27.6, text: 'Birçok markamızın eğitimleri', icon: '✦', accent: PINK },
  { at: 29.3, to: 30.3, text: 'İncele →', icon: '▶', accent: PINK },
  { at: 31.92, to: 34.2, text: 'Eğitimi Satın Al', icon: '↗', accent: PINK },
  { at: 34.32, to: 36.2, text: 'Ürünü Hesabıma Ekle', icon: '+', accent: GOLD },
  { at: 36.36, to: 39.3, text: 'Ücretsiz eğitimler', icon: '✓', accent: '#4ade80' },
  { at: 40.71, to: 43.8, text: 'Uzman anlatımı', icon: '★', accent: GOLD },
  { at: 41.64, to: 43.8, text: 'Bölüm bölüm', icon: '▤' },
  { at: 43.92, to: 46.1, text: 'İlerleme anlık görünür', icon: '%' },
  { at: 48.0, to: 50.3, text: 'Kısa quiz · 3 dk', icon: '⏱', accent: VIOLET },
  { at: 51.09, to: 52.9, text: 'Anında sonuç', icon: '✓', accent: '#4ade80' },
  { at: 54.8, to: 59.2, text: 'Eğitimlerim', icon: '☰', accent: VIOLET },
  { at: 57.08, to: 59.2, text: 'Kaldığınız yerden devam', icon: '↻' },
  { at: 64.4, to: 66.7, text: 'Sertifikanı al', icon: '⤓', accent: GOLD },
]

// ---------- homografi: içerik dikdörtgenini ekran dörtgenine eşler (CSS matrix3d) ----------
const CW = 1600
const CH = 962
function solve(A: number[][], b: number[]) {
  const n = b.length
  const M = A.map((r, i) => [...r, b[i]])
  for (let c = 0; c < n; c++) {
    let p = c
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r
    ;[M[c], M[p]] = [M[p], M[c]]
    for (let r = 0; r < n; r++) {
      if (r === c) continue
      const k = M[r][c] / M[c][c]
      for (let j = c; j <= n; j++) M[r][j] -= k * M[c][j]
    }
  }
  return M.map((r, i) => r[n] / r[i])
}
function matrix3d(q: number[][]) {
  const src = [
    [0, 0],
    [CW, 0],
    [CW, CH],
    [0, CH],
  ]
  const A: number[][] = []
  const b: number[] = []
  for (let i = 0; i < 4; i++) {
    const [x, y] = src[i]
    const [u, v] = q[i]
    A.push([x, y, 1, 0, 0, 0, -u * x, -u * y])
    b.push(u)
    A.push([0, 0, 0, x, y, 1, -v * x, -v * y])
    b.push(v)
  }
  const [a, bb, c, d, e, ff, g, h] = solve(A, b)
  return `matrix3d(${a},${d},0,${g},${bb},${e},0,${h},0,0,1,0,${c},${ff},0,1)`
}
const MATS: Record<string, string> = Object.fromEntries(Object.entries(quads as Record<string, number[][]>).map(([k, q]) => [k, matrix3d(q)]))

function currentScene(t: number) {
  let idx = 0
  scenes.forEach((s, i) => {
    if (t >= s.from) idx = i
  })
  return idx
}

function SceneContent({ scene }: { scene: Scene }) {
  const frame = useCurrentFrame()
  const fadeIn = interpolate(frame, [0, 5], [0, 1], clamp)
  let zoom = 1
  let ox = 0.5
  let oy = 0.5
  if (scene.zoom) {
    const z = scene.zoom
    const a = f(z.from)
    const b = f(z.to)
    zoom = interpolate(frame, [a, b], [1, z.scale], { ...clamp, easing: slow })
    ox = z.x
    oy = z.y
  }
  const style: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', objectPosition: scene.pos ?? '50% 50%', display: 'block' }
  return (
    <AbsoluteFill style={{ opacity: fadeIn, transform: `scale(${zoom})`, transformOrigin: `${ox * 100}% ${oy * 100}%` }}>
      {scene.still ? (
        <Img src={staticFile(scene.src)} style={style} />
      ) : (
        <OffthreadVideo src={staticFile(scene.src)} style={style} muted startFrom={f(scene.start ?? 0)} playbackRate={scene.rate ?? 1} />
      )}
    </AbsoluteFill>
  )
}

// Ekran: içerik + cam parlaması + açılış ışığı
function Screen({ img }: { img: string }) {
  const frame = useCurrentFrame()
  const t = frame / FPS
  // ekran 6.0 sn'de yanar (kısa titreme), sonunda kararır
  const on = interpolate(t, [6.15, 6.25, 6.32, 6.5], [0, 0.85, 0.35, 1], clamp) * interpolate(t, [SCREEN_END - 0.6, SCREEN_END], [1, 0], clamp)
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: CW, height: CH, transformOrigin: '0 0', transform: MATS[img], overflow: 'hidden', background: '#07060b' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: on, filter: 'saturate(1.05) contrast(1.03)' }}>
        {scenes.map((s, i) => {
          const end = scenes[i + 1]?.from ?? SCREEN_END
          return (
            <Sequence key={s.src + s.from} from={f(s.from)} durationInFrames={f(end - s.from) + 6}>
              <SceneContent scene={s} />
            </Sequence>
          )
        })}
      </div>
      {/* cam: hafif parlama ve kenar kararması */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(118deg, rgba(255,255,255,0.13) 0%, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0) 46%)' }} />
      <div style={{ position: 'absolute', inset: 0, boxShadow: 'inset 0 0 60px rgba(0,0,0,0.35)' }} />
    </div>
  )
}

function ShotView({ shot, idx }: { shot: Shot; idx: number }) {
  const frame = useCurrentFrame()
  const t = frame / FPS
  if (t < shot.from - 0.01 || t > shot.to + 0.01) return null
  // hareket geçiş boyunca da sürer, böylece kamera hiç durup kalkmaz
  const p = interpolate(t, [shot.from - XIN, shot.to + XOUT], [0, 1], { ...clamp, easing: Easing.inOut(Easing.sin) })
  const s = shot.a.s + (shot.b.s - shot.a.s) * p
  const x = shot.a.x + (shot.b.x - shot.a.x) * p
  const y = shot.a.y + (shot.b.y - shot.a.y) * p
  const isFirst = idx === 0
  const isLast = shot.to >= SCREEN_END - 0.01
  const fadeIn = isFirst ? interpolate(t, [shot.from, shot.from + 1.2], [0, 1], clamp) : interpolate(t, [shot.from, shot.from + XIN], [0, 1], { ...clamp, easing: Easing.out(Easing.quad) })
  const fadeOut = isLast ? 1 : interpolate(t, [shot.to - XOUT, shot.to], [1, 0], { ...clamp, easing: Easing.in(Easing.quad) })
  const blur = isFirst
    ? interpolate(t, [shot.from, shot.from + 1.4], [18, 0], clamp)
    : Math.max(interpolate(t, [shot.from, shot.from + XIN], [4, 0], clamp), isLast ? 0 : interpolate(t, [shot.to - XOUT, shot.to], [0, 4], clamp))
  const lateFade = isLast ? interpolate(t, [OUTRO, OUTRO + 0.7], [1, 0], clamp) : 1
  const k = 1920 / 2000
  return (
    <AbsoluteFill style={{ opacity: fadeIn * fadeOut * lateFade, filter: blur > 0.05 ? `blur(${blur}px)` : undefined }}>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 2000, height: 1125, transformOrigin: '50% 50%', transform: `translate(${(1920 - 2000) / 2 + x}px, ${(1080 - 1125) / 2 + y}px) scale(${k * s})` }}>
        <Img src={staticFile(`v3/laptop${shot.img}.jpg`)} style={{ position: 'absolute', left: 0, top: 0, width: 2000, height: 1125 }} />
        <Screen img={shot.img} />
      </div>
    </AbsoluteFill>
  )
}

function TransitionGlow() {
  const frame = useCurrentFrame()
  const t = frame / FPS
  const cut = shots.slice(1).map(s => s.from).find(c => t > c - XOUT && t < c + XIN)
  if (cut === undefined) return null
  const k = interpolate(t, [cut - XOUT, cut, cut + XIN], [0, 1, 0], { ...clamp, easing: Easing.inOut(Easing.sin) })
  const x = interpolate(t, [cut - XOUT, cut + XIN], [30, 70], clamp)
  return <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 45% at ${x}% 45%, rgba(232,121,249,0.22), transparent 70%)`, opacity: k, mixBlendMode: 'screen', pointerEvents: 'none' }} />
}

function Grade() {
  const frame = useCurrentFrame()
  const t = frame / FPS
  // yavaş hareket eden ışık sızıntısı
  const lx = 30 + Math.sin(t * 0.25) * 25
  return (
    <>
      <AbsoluteFill style={{ background: `radial-gradient(ellipse at ${lx}% 0%, rgba(232,121,249,0.10), transparent 55%)`, mixBlendMode: 'screen', pointerEvents: 'none' }} />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)', pointerEvents: 'none' }} />
      <AbsoluteFill style={{ pointerEvents: 'none', opacity: 0.08, mixBlendMode: 'overlay' }}>
        <svg width="1920" height="1080">
          <filter id="g4">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={frame % 12} />
          </filter>
          <rect width="1920" height="1080" filter="url(#g4)" />
        </svg>
      </AbsoluteFill>
    </>
  )
}

function Letterbox() {
  const frame = useCurrentFrame()
  const t = frame / FPS
  const h = t < 40 ? interpolate(t, [0.1, 1.2], [540, 64], { ...clamp, easing: Easing.inOut(Easing.cubic) }) : interpolate(t, [72.7, 73.5], [64, 540], { ...clamp, easing: Easing.inOut(Easing.cubic) })
  return (
    <>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: h, background: '#000' }} />
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: h, background: '#000' }} />
    </>
  )
}

function InfoPanel() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t < 6.8 || t > OUTRO + 0.5) return null
  let idx = 0
  steps.forEach((s, i) => {
    if (t >= s.at) idx = i
  })
  const step = steps[idx]
  const local = frame - f(step.at)
  const next = steps[idx + 1]?.at ?? OUTRO
  const out = interpolate(frame, [f(next) - 8, f(next)], [1, 0], clamp)
  const sp = (d: number) => spring({ frame: local - d, fps, config: { damping: 22 } })
  const a = sp(0)
  const b = sp(5)
  const c = sp(10)
  const panelVis = interpolate(t, [6.8, 7.4, OUTRO - 0.2, OUTRO + 0.4], [0, 1, 1, 0], clamp)
  return (
    <>
      <AbsoluteFill style={{ background: 'linear-gradient(90deg, rgba(4,3,8,0.78) 0%, rgba(4,3,8,0.45) 30%, transparent 52%)', opacity: panelVis, pointerEvents: 'none' }} />
      <AbsoluteFill style={{ background: 'linear-gradient(0deg, rgba(4,3,8,0.7) 0%, transparent 35%)', opacity: panelVis, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', left: 110, bottom: 130, width: 640, fontFamily: FONT, opacity: out }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, opacity: a, transform: `translateX(${(1 - a) * -30}px)` }}>
          <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '0.3em', color: PINK }}>{String(idx + 1).padStart(2, '0')}</span>
          <span style={{ width: 60 * a, height: 1, background: 'rgba(255,255,255,0.5)' }} />
          <span style={{ fontSize: 20, fontWeight: 500, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.55)' }}>{String(steps.length).padStart(2, '0')}</span>
        </div>
        <div style={{ overflow: 'hidden', marginTop: 18 }}>
          <div style={{ fontSize: 66, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.025em', color: '#fff', transform: `translateY(${(1 - b) * 110}%)`, textShadow: '0 4px 30px rgba(0,0,0,0.5)' }}>{step.title}</div>
        </div>
        <div style={{ marginTop: 16, fontSize: 26, color: 'rgba(255,255,255,0.75)', opacity: c, filter: `blur(${(1 - c) * 8}px)` }}>{step.text}</div>
      </div>
    </>
  )
}

function Chips() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  const active = chips.filter(c => t >= c.at - 0.05 && t <= c.to + 0.35)
  return (
    <div style={{ position: 'absolute', left: 110, top: 150, display: 'flex', flexDirection: 'column', gap: 14, fontFamily: FONT }}>
      {active.map(c => {
        const p = spring({ frame: frame - f(c.at), fps, config: { damping: 16 } })
        const out = interpolate(t, [c.to, c.to + 0.35], [1, 0], clamp)
        const accent = c.accent ?? '#ffffff'
        return (
          <div
            key={c.text + c.at}
            style={{
              alignSelf: 'flex-start',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px 22px 12px 12px',
              borderRadius: 999,
              background: 'rgba(16,12,24,0.72)',
              border: `1px solid ${accent}55`,
              boxShadow: `0 16px 40px rgba(0,0,0,0.45), 0 0 26px ${accent}30`,
              opacity: Math.min(1, p * 1.3) * out,
              transform: `translateX(${(1 - p) * -40}px)`,
              filter: `blur(${(1 - p) * 6}px)`,
            }}
          >
            <span style={{ width: 36, height: 36, borderRadius: '50%', display: 'grid', placeItems: 'center', background: `${accent}26`, color: accent, fontSize: 17, fontWeight: 700 }}>{c.icon}</span>
            <span style={{ fontSize: 26, fontWeight: 600, color: '#fff' }}>{c.text}</span>
          </div>
        )
      })}
    </div>
  )
}

function Words({ words, starts, size, gradient, weight = 800 }: { words: string[]; starts: number[]; size: number; gradient?: boolean; weight?: number }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return (
    <div style={{ display: 'flex', gap: '0.26em', justifyContent: 'center', flexWrap: 'wrap', fontSize: size, fontWeight: weight, letterSpacing: '-0.035em', lineHeight: 1.1 }}>
      {words.map((w, i) => {
        const p = spring({ frame: frame - f(starts[i]), fps, config: { damping: 18 } })
        return (
          <span key={i} style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.12em' }}>
            <span
              style={{
                display: 'inline-block',
                transform: `translateY(${(1 - p) * 105}%)`,
                filter: `blur(${(1 - p) * 6}px)`,
                ...(gradient ? { background: `linear-gradient(135deg, #ffffff 25%, ${PINK} 70%, ${VIOLET})`, WebkitBackgroundClip: 'text', color: 'transparent' } : { color: '#fff' }),
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
  if (t > 6.4) return null
  const out = interpolate(t, [5.6, 6.4], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) })
  const brand = 'SLIMWELL HEO ACADEMY'
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: FONT, opacity: 1 - out, filter: `blur(${out * 10}px)`, transform: `scale(${1 + out * 0.08})` }}>
      <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: '0.5em', marginBottom: 34, display: 'flex' }}>
        {[...brand].map((ch, i) => {
          const p = spring({ frame: frame - f(0.25 + i * 0.045), fps, config: { damping: 22 } })
          return (
            <span key={i} style={{ opacity: p, filter: `blur(${(1 - p) * 8}px)`, color: i > 8 ? PINK : '#fff', whiteSpace: 'pre' }}>
              {ch}
            </span>
          )
        })}
      </div>
      <Words words={['Hoş', 'geldiniz.']} starts={[1.26, 1.49]} size={140} gradient />
      <div style={{ marginTop: 36 }}>
        <Words words={['Estetik', '·', 'Güzellik']} starts={[2.3, 2.69, 2.83]} size={40} weight={500} />
      </div>
      <div style={{ marginTop: 22 }}>
        <Words words={['Tüm', 'eğitimler', 'tek', 'platformda.']} starts={[3.82, 4.05, 5.16, 5.5]} size={30} weight={400} />
      </div>
    </AbsoluteFill>
  )
}

function Outro() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t < OUTRO + 0.3) return null
  const head = spring({ frame: frame - f(67.17), fps, config: { damping: 20 } })
  const pill = spring({ frame: frame - f(71.3), fps, config: { damping: 20 } })
  const flare = interpolate(t, [71.0, 72.3], [-20, 120], clamp)
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: FONT }}>
      <div style={{ opacity: head, letterSpacing: `${interpolate(head, [0, 1], [0.9, 0.5])}em`, fontSize: 32, fontWeight: 600, color: '#fff', marginBottom: 38 }}>
        SLIMWELL <span style={{ color: PINK }}>HEO ACADEMY</span>
      </div>
      <div style={{ position: 'relative' }}>
        <Words words={['Öğrenin.', 'Gelişin.', 'Fark', 'yaratın.']} starts={[68.59, 69.52, 70.18, 70.61]} size={120} gradient />
        <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(100deg, transparent ${flare - 8}%, rgba(255,255,255,0.45) ${flare}%, transparent ${flare + 8}%)`, mixBlendMode: 'overlay' }} />
      </div>
      <div style={{ opacity: pill, transform: `translateY(${(1 - pill) * 24}px)`, marginTop: 50, fontSize: 28, fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.8)' }}>slimwell.heocademy.com</div>
    </AbsoluteFill>
  )
}

export const Akademi7: React.FC<{ withAudio: boolean }> = ({ withAudio }) => {
  const frame = useCurrentFrame()
  const fade = interpolate(frame, [TOTAL7 - 14, TOTAL7], [1, 0], clamp)
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <AbsoluteFill style={{ opacity: fade, background: 'radial-gradient(ellipse at 50% 45%, #14091f 0%, #050308 70%)' }}>
        {shots.map((s, i) => (
          <ShotView key={i} shot={s} idx={i} />
        ))}
        <TransitionGlow />
        <Intro />
        <InfoPanel />
        <Chips />
        <Outro />
        <Grade />
      </AbsoluteFill>
      <Letterbox />
      {withAudio && <Audio src={staticFile('seslendirme5.mp3')} />}
    </AbsoluteFill>
  )
}

export const _unused = random
