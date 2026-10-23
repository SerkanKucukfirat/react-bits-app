import React from 'react'
import {
  AbsoluteFill,
  Audio,
  Img,
  OffthreadVideo,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  Easing,
} from 'remotion'

const FPS = 30
const f = (s: number) => Math.round(s * FPS)
export const TOTAL = f(70)

const FONT = "'Inter Display', 'Inter', sans-serif"
const DOMAIN = 'slimwell.heocademy.com'
const ease = Easing.bezier(0.22, 1, 0.36, 1)

// Seslendirmenin kelime zamanlamalarına göre (saniye)
type Zoom = { x: number; y: number; scale: number; from: number; to: number }
type Scene = { from: number; to: number; src: string; path: string; step: number; still?: boolean; zoom?: Zoom }

const scenes: Scene[] = [
  { from: 6.9, to: 11.3, src: 'url.mp4', path: '', step: 0 },
  { from: 11.3, to: 23.1, src: 'kayit.mp4', path: '/kayit-ol', step: 1, zoom: { x: 0.45, y: 0.5, scale: 1.32, from: 2.4, to: 10.6 } },
  { from: 23.1, to: 27.0, src: 'giris.mp4', path: '/giris-yap', step: 2, zoom: { x: 0.5, y: 0.45, scale: 1.25, from: 0.6, to: 3.6 } },
  { from: 27.0, to: 33.0, src: 'egitim.mp4', path: '/urunler/videolu-egitimlerim', step: 3 },
  { from: 33.0, to: 36.7, src: 'urun.mp4', path: '/urunler/videolu-egitimlerim', step: 3 },
  { from: 36.7, to: 42.2, src: 'ders.mp4', path: '/urun/84/video/147', step: 4 },
  { from: 42.2, to: 48.7, src: 'quiz.mp4', path: '/urun/84/video/148?quiz=108', step: 5, zoom: { x: 0.75, y: 0.35, scale: 1.18, from: 1.2, to: 6.3 } },
  { from: 48.7, to: 53.0, src: 'profil.mp4', path: '/profilim/videolu-egitimlerim', step: 6 },
  { from: 53.0, to: 56.9, src: 'profil2.mp4', path: '/profilim/videolu-egitimlerim', step: 6 },
  { from: 56.9, to: 64.4, src: 'sertifika.png', path: '/get-certificate/84', step: 7, still: true, zoom: { x: 0.6, y: 0.62, scale: 1.18, from: 0.3, to: 7.5 } },
]

const steps = [
  { title: 'Siteye girin', text: DOMAIN },
  { title: 'Kayıt olun', text: 'Bilgilerinizi girin, “Hemen Başlayın”a tıklayın.' },
  { title: 'Giriş yapın', text: 'E-posta adresiniz ve şifrenizle.' },
  { title: 'Eğitiminizi seçin', text: 'Casmara · WishPro · Revcell · Striort ve daha fazlası' },
  { title: 'Videoları izleyin', text: 'Eğitimler bölüm bölüm ilerler.' },
  { title: 'Quiz’i çözün', text: 'Süreli sorular, anında sonuç.' },
  { title: 'Eğitimlerinizi takip edin', text: 'Profilim › Videolu Eğitimlerim' },
  { title: 'Sertifikanızı alın', text: 'Slimwell Akademi Bitirme Sertifikası' },
]

const stepStart = steps.map((_, i) => scenes.find(s => s.step === i)!.from)

// Pencere geometrisi
const CONTENT_W = 1250
const CONTENT_H = Math.round((CONTENT_W * 576) / 1178)
const BAR_H = 48
const WIN_X = 1920 - 100 - CONTENT_W
const WIN_Y = Math.round((1080 - CONTENT_H - BAR_H) / 2) - 10

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

function Background() {
  const frame = useCurrentFrame()
  const t = frame / FPS
  const blob = (color: string, x: number, y: number, r: number, ax: number, ay: number, sp: number) => (
    <div
      style={{
        position: 'absolute',
        left: x + Math.sin(t * sp) * ax - r,
        top: y + Math.cos(t * sp * 0.8) * ay - r,
        width: r * 2,
        height: r * 2,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
        filter: 'blur(40px)',
      }}
    />
  )
  return (
    <AbsoluteFill style={{ background: '#06050b', overflow: 'hidden' }}>
      {blob('rgba(192, 38, 211, 0.45)', 1500, 180, 620, 120, 80, 0.25)}
      {blob('rgba(124, 58, 237, 0.42)', 300, 900, 680, 140, 90, 0.2)}
      {blob('rgba(56, 189, 248, 0.22)', 1100, 1000, 520, 160, 60, 0.3)}
      <AbsoluteFill
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          backgroundPosition: `${(t * 6) % 80}px ${(t * 6) % 80}px`,
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />
      <AbsoluteFill style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)' }} />
    </AbsoluteFill>
  )
}

function SceneContent({ scene }: { scene: Scene }) {
  const frame = useCurrentFrame()
  const len = f(scene.to - scene.from)
  const fadeIn = interpolate(frame, [0, 9], [0, 1], clamp)
  const settle = interpolate(frame, [0, 14], [1.04, 1], { ...clamp, easing: ease })
  let zoom = 1
  let ox = 0.5
  let oy = 0.5
  if (scene.zoom) {
    const z = scene.zoom
    const a = f(z.from)
    const b = f(z.to)
    zoom = interpolate(frame, [a, a + 22, b - 18, b], [1, z.scale, z.scale, 1], { ...clamp, easing: Easing.inOut(Easing.cubic) })
    if (scene.still) zoom = interpolate(frame, [a, b], [1, z.scale], { ...clamp, easing: Easing.inOut(Easing.quad) })
    ox = z.x
    oy = z.y
  }
  const style: React.CSSProperties = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' }
  return (
    <AbsoluteFill style={{ opacity: fadeIn, transform: `scale(${settle * zoom})`, transformOrigin: `${ox * 100}% ${oy * 100}%` }}>
      {scene.still ? <Img src={staticFile(scene.src)} style={style} /> : <OffthreadVideo src={staticFile(scene.src)} style={style} muted />}
      {len > 0 && null}
    </AbsoluteFill>
  )
}

function UrlText({ frame }: { frame: number }) {
  const t = frame / FPS
  const current = [...scenes].reverse().find(s => t >= s.from)
  let text = DOMAIN + (current?.path ?? '')
  if (t < 11.3) {
    // "slimwell nokta heocademy nokta com" söylenirken yazılır
    const n = Math.floor(interpolate(t, [7.6, 10.7], [0, DOMAIN.length], clamp))
    text = t < 6.9 ? DOMAIN : DOMAIN.slice(0, n)
  }
  const typing = t >= 7.6 && t < 10.9
  const caret = typing && Math.floor(frame / 8) % 2 === 0
  return (
    <span>
      <span style={{ color: '#e5e7eb' }}>{text.slice(0, DOMAIN.length)}</span>
      <span style={{ color: '#9ca3af' }}>{text.slice(DOMAIN.length)}</span>
      {typing && <span style={{ opacity: caret ? 1 : 0, color: '#e879f9' }}>|</span>}
    </span>
  )
}

function BrowserWindow() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  const enter = spring({ frame: frame - f(5.6), fps, config: { damping: 18, mass: 1.1 } })
  const exit = interpolate(t, [63.7, 64.4], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) })
  const floatY = Math.sin(t * 0.9) * 6
  const tiltY = -7 + Math.sin(t * 0.35) * 1.5
  const tiltX = 3 + Math.cos(t * 0.3) * 1
  // her sahne geçişinde küçük bir nefes
  const sceneStarts = scenes.map(s => f(s.from))
  const lastStart = sceneStarts.filter(s => s <= frame).pop() ?? 0
  const pulse = 1 - 0.012 * Math.exp(-(frame - lastStart) / 6) * (frame >= lastStart ? 1 : 0)

  const y = interpolate(enter, [0, 1], [760, 0]) + floatY + exit * 80
  const rx = interpolate(enter, [0, 1], [32, tiltX])
  const opacity = interpolate(enter, [0, 0.3], [0, 1], clamp) * (1 - exit)
  const scale = interpolate(exit, [0, 1], [1, 0.86]) * pulse

  return (
    <AbsoluteFill style={{ perspective: 2600 }}>
      <div
        style={{
          position: 'absolute',
          left: WIN_X,
          top: WIN_Y,
          width: CONTENT_W,
          height: CONTENT_H + BAR_H,
          transform: `translateY(${y}px) rotateX(${rx}deg) rotateY(${tiltY}deg) scale(${scale})`,
          transformOrigin: '30% 50%',
          opacity,
          borderRadius: 22,
          overflow: 'hidden',
          background: '#16141f',
          boxShadow:
            '0 0 0 1px rgba(255,255,255,0.12), 0 40px 120px rgba(0,0,0,0.65), 0 0 120px rgba(192, 38, 211, 0.25)',
        }}
      >
        <div style={{ height: BAR_H, display: 'flex', alignItems: 'center', gap: 18, padding: '0 20px', background: 'linear-gradient(#24212f, #1b1925)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', gap: 9 }}>
            {['#ff5f57', '#febc2e', '#28c840'].map(c => (
              <div key={c} style={{ width: 13, height: 13, borderRadius: '50%', background: c }} />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              maxWidth: 760,
              margin: '0 auto',
              height: 30,
              borderRadius: 15,
              background: 'rgba(255,255,255,0.07)',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '0 16px',
              fontFamily: FONT,
              fontSize: 16,
              color: '#e5e7eb',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
          >
            <svg width="13" height="15" viewBox="0 0 13 15" fill="none">
              <rect x="1" y="6" width="11" height="8" rx="2" fill="#9ca3af" />
              <path d="M3.5 6V4.5a3 3 0 0 1 6 0V6" stroke="#9ca3af" strokeWidth="1.6" />
            </svg>
            <UrlText frame={frame} />
          </div>
          <div style={{ width: 66 }} />
        </div>
        <div style={{ position: 'relative', width: CONTENT_W, height: CONTENT_H, overflow: 'hidden', background: '#fff' }}>
          <Sequence from={0} durationInFrames={f(6.9) + 10}>
            <Img src={staticFile('anasayfa.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Sequence>
          {scenes.map((s, i) => {
            const next = scenes[i + 1]
            const end = next ? next.from : s.to
            return (
              <Sequence key={s.src + s.from} from={f(s.from)} durationInFrames={f(end - s.from) + 10}>
                <SceneContent scene={s} />
              </Sequence>
            )
          })}
        </div>
      </div>
    </AbsoluteFill>
  )
}

function StepPanel() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t < 6.9 || t > 64.6) return null
  let idx = 0
  stepStart.forEach((s, i) => {
    if (t >= s) idx = i
  })
  const step = steps[idx]
  const local = frame - f(stepStart[idx])
  const nextStart = stepStart[idx + 1] ?? 64.0
  const out = interpolate(frame, [f(nextStart) - 8, f(nextStart)], [1, 0], clamp)
  const pin = (delay: number) => spring({ frame: local - delay, fps, config: { damping: 20 } })
  const item = (delay: number): React.CSSProperties => {
    const p = pin(delay)
    return {
      opacity: p * out,
      transform: `translateY(${interpolate(p, [0, 1], [36, 0]) - (1 - out) * 20}px)`,
      filter: `blur(${interpolate(p, [0, 1], [10, 0])}px)`,
    }
  }
  return (
    <div style={{ position: 'absolute', left: 110, top: 0, bottom: 0, width: WIN_X - 110 - 60, display: 'flex', flexDirection: 'column', justifyContent: 'center', fontFamily: FONT }}>
      <div style={{ ...item(0), fontSize: 150, fontWeight: 800, lineHeight: 1, letterSpacing: '-0.04em', background: 'linear-gradient(135deg, #f0abfc, #a78bfa 55%, #7dd3fc)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
        {String(idx + 1).padStart(2, '0')}
      </div>
      <div style={{ ...item(4), marginTop: 18, fontSize: 52, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.02em', color: '#fff' }}>{step.title}</div>
      <div style={{ ...item(9), marginTop: 20, fontSize: 25, fontWeight: 400, lineHeight: 1.4, color: 'rgba(255,255,255,0.68)' }}>{step.text}</div>
    </div>
  )
}

function Chrome() {
  const frame = useCurrentFrame()
  const t = frame / FPS
  const vis = interpolate(t, [6.4, 7.2, 64.0, 64.6], [0, 1, 1, 0], clamp)
  let idx = -1
  stepStart.forEach((s, i) => {
    if (t >= s) idx = i
  })
  return (
    <div style={{ opacity: vis, fontFamily: FONT }}>
      <div style={{ position: 'absolute', left: 110, top: 70, fontSize: 20, fontWeight: 600, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.85)' }}>
        SLIMWELL <span style={{ color: '#e879f9' }}>AKADEMİ</span>
      </div>
      <div style={{ position: 'absolute', left: 110, bottom: 80, display: 'flex', gap: 10 }}>
        {steps.map((_, i) => {
          const start = f(stepStart[i])
          const end = f(stepStart[i + 1] ?? 64.0)
          const p = interpolate(frame, [start, end], [0, 1], clamp)
          return (
            <div key={i} style={{ width: i === idx ? 72 : 34, height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.15)', overflow: 'hidden' }}>
              <div style={{ width: `${p * 100}%`, height: '100%', background: 'linear-gradient(90deg, #e879f9, #a78bfa)' }} />
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Words({ words, starts, style, spanStyle }: { words: string[]; starts: number[]; style: React.CSSProperties; spanStyle?: React.CSSProperties }) {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return (
    <div style={{ display: 'flex', gap: '0.28em', justifyContent: 'center', flexWrap: 'wrap', ...style }}>
      {words.map((w, i) => {
        const p = spring({ frame: frame - f(starts[i]), fps, config: { damping: 16 } })
        return (
          <span key={i} style={{ ...spanStyle, display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 50}px)`, filter: `blur(${(1 - p) * 12}px)` }}>
            {w}
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
  const out = interpolate(t, [5.0, 5.9], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) })
  const eyebrow = spring({ frame: frame - f(0.2), fps, config: { damping: 30 } })
  const pills = ['Estetik', 'Güzellik', 'Zayıflama']
  const pillStarts = [1.8, 2.53, 3.16]
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: FONT, opacity: 1 - out, transform: `translateY(${-out * 140}px) scale(${1 - out * 0.08})` }}>
      <div style={{ opacity: eyebrow, letterSpacing: `${interpolate(eyebrow, [0, 1], [0.8, 0.42])}em`, fontSize: 26, fontWeight: 600, color: 'rgba(255,255,255,0.8)', marginBottom: 28 }}>
        SLIMWELL <span style={{ color: '#e879f9' }}>AKADEMİ</span>
      </div>
      <Words words={['Hoş', 'geldiniz.']} starts={[0.6, 0.9]} style={{ fontSize: 150, fontWeight: 800, letterSpacing: '-0.045em', color: '#fff', lineHeight: 1 }} />
      <div style={{ display: 'flex', gap: 18, marginTop: 50 }}>
        {pills.map((p, i) => {
          const s = spring({ frame: frame - f(pillStarts[i]), fps, config: { damping: 14 } })
          return (
            <div key={p} style={{ opacity: s, transform: `scale(${0.6 + s * 0.4})`, padding: '14px 30px', borderRadius: 999, border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(255,255,255,0.06)', fontSize: 30, fontWeight: 500, color: '#fff' }}>
              {p}
            </div>
          )
        })}
      </div>
      <Words words={['Tüm', 'eğitimler', 'tek', 'platformda.']} starts={[4.2, 4.37, 4.6, 4.8]} style={{ marginTop: 44, fontSize: 36, fontWeight: 400, color: 'rgba(255,255,255,0.7)' }} />
    </AbsoluteFill>
  )
}

function Outro() {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  const t = frame / FPS
  if (t < 64.0) return null
  const head = spring({ frame: frame - f(64.45), fps, config: { damping: 18 } })
  const pill = spring({ frame: frame - f(67.8), fps, config: { damping: 18 } })
  const fadeOut = interpolate(t, [69.3, 70], [1, 0], clamp)
  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', fontFamily: FONT, opacity: fadeOut }}>
      <div style={{ opacity: head, transform: `translateY(${(1 - head) * 40}px)`, fontSize: 30, fontWeight: 600, letterSpacing: '0.42em', color: 'rgba(255,255,255,0.85)', marginBottom: 34 }}>
        SLIMWELL <span style={{ color: '#e879f9' }}>AKADEMİ</span>
      </div>
      <Words
        words={['Öğrenin.', 'Gelişin.', 'Fark', 'yaratın.']}
        starts={[65.2, 66.1, 67.05, 67.25]}
        style={{ fontSize: 120, fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1 }}
        spanStyle={{ background: 'linear-gradient(135deg, #ffffff 20%, #f0abfc 65%, #a78bfa)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingBottom: 12 }}
      />
      <div style={{ opacity: pill, transform: `translateY(${(1 - pill) * 30}px)`, marginTop: 56, padding: '16px 36px', borderRadius: 999, border: '1px solid rgba(232,121,249,0.5)', background: 'rgba(232,121,249,0.1)', fontSize: 30, fontWeight: 500, color: '#fff' }}>
        {DOMAIN}
      </div>
    </AbsoluteFill>
  )
}

export const Akademi: React.FC<{ withAudio: boolean }> = ({ withAudio }) => {
  const frame = useCurrentFrame()
  const fadeIn = interpolate(frame, [0, 12], [0, 1], clamp)
  return (
    <AbsoluteFill style={{ opacity: fadeIn }}>
      <Background />
      <Sequence durationInFrames={f(6.4)}>
        <Intro />
      </Sequence>
      <StepPanel />
      <BrowserWindow />
      <Chrome />
      <Outro />
      {withAudio && <Audio src={staticFile('seslendirme.mp3')} />}
    </AbsoluteFill>
  )
}
