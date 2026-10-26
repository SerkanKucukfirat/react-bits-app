import '@fontsource/playfair-display/500.css'
import React, { useEffect, useState } from 'react'
import { AbsoluteFill, Img, continueRender, delayRender, interpolate, staticFile, useCurrentFrame } from 'remotion'

const FPS = 30
export const CUMHURIYET_FRAMES = Math.round(24.98 * FPS)

// Kaynak videodaki altyazı zamanları (saniye)
const lines: { text: string; from: number; to: number }[] = [
  { text: 'Ey büyük Atatürk!', from: 0.0, to: 1.95 },
  { text: 'Açtığın yolda', from: 2.3, to: 4.8 },
  { text: 'Gösterdiğin hedefe!', from: 4.9, to: 7.95 },
  { text: 'Durmadan yürüyeceğime!', from: 8.0, to: 10.9 },
  { text: 'Ant içerim!', from: 10.95, to: 13.6 },
  { text: 'Varlığım!', from: 13.7, to: 16.3 },
  { text: 'Türk varlığına!', from: 16.4, to: 17.95 },
  { text: 'Armağan olsun!', from: 18.5, to: 20.5 },
  { text: 'Ne mutlu!', from: 20.6, to: 21.8 },
  { text: 'Türküm diyene!', from: 21.85, to: 24.98 },
]

const REVEAL = 0.8 // harf harf yazılma süresi
const FADE = 0.25

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const

function useFont() {
  const [handle] = useState(() => delayRender('font'))
  useEffect(() => {
    document.fonts.load("500 56px 'Playfair Display'").then(() => document.fonts.ready).then(() => continueRender(handle))
  }, [handle])
}

function Caption({ text, from, to }: { text: string; from: number; to: number }) {
  const frame = useCurrentFrame()
  const t = frame / FPS
  if (t < from || t > to) return null
  const chars = [...text]
  const out = interpolate(t, [to - FADE, to], [1, 0], clamp)
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: CAPTION_Y,
        textAlign: 'center',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 500,
        fontSize: 56,
        lineHeight: 1.15,
        color: '#fff',
        opacity: out,
        textShadow: '0 2px 6px rgba(0,0,0,0.7), 0 0 28px rgba(0,0,0,0.6)',
      }}
    >
      {chars.map((c, i) => {
        const at = from + (REVEAL * i) / chars.length
        const p = interpolate(t, [at, at + 0.18], [0, 1], clamp)
        return (
          <span key={i} style={{ opacity: p, filter: `blur(${(1 - p) * 6}px)`, whiteSpace: 'pre' }}>
            {c}
          </span>
        )
      })}
    </div>
  )
}

// Altyazı üstte, bayrağın kırmızı kısmında (başın ve hilalin üzerinde)
const CAPTION_Y = 262

export const Cumhuriyet: React.FC = () => {
  useFont()
  const frame = useCurrentFrame()
  // afişe hafif bir yakınlaşma
  const zoom = interpolate(frame, [0, CUMHURIYET_FRAMES], [1, 1.035])
  return (
    <AbsoluteFill style={{ background: '#000' }}>
      <AbsoluteFill style={{ transform: `scale(${zoom})`, transformOrigin: '55% 88%' }}>
        <Img src={staticFile('cumhuriyet-afis.jpg')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </AbsoluteFill>
      {lines.map(l => (
        <Caption key={l.text} {...l} />
      ))}
    </AbsoluteFill>
  )
}
