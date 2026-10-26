import React from 'react'

// CSS 3B laptop: kapak (ekran) menteşeden açılır, gövde menteşeden izleyiciye doğru uzanır
export const LW = 1300 // genişlik (SCREEN_W + 2 * BEZEL)
export const SCREEN_W = 1260
export const BAR_H = 34
export const CONTENT_H = Math.round((SCREEN_W * 962) / 1600)
export const SCREEN_H = BAR_H + CONTENT_H
export const LID_H = SCREEN_H + 40 + 14 // kapak yüksekliği
export const BEZEL = 20
export const BASE_D = 880 // gövde derinliği

type Props = {
  lid: number // -90 kapalı, 0 dik, 10 hafif geride
  screenGlow: number // 0..1 ekran ışığı
  children: React.ReactNode
}

const alu = 'linear-gradient(160deg, #3b3a42 0%, #26252c 45%, #1b1a20 100%)'

export function Laptop({ lid, screenGlow, children }: Props) {
  return (
    <div style={{ position: 'relative', width: LW, height: LID_H, transformStyle: 'preserve-3d' }}>
      {/* gövde */}
      <div
        style={{
          position: 'absolute',
          left: -10,
          top: LID_H,
          width: LW + 20,
          height: BASE_D,
          transformOrigin: '50% 0%',
          transform: 'rotateX(90deg)',
          transformStyle: 'preserve-3d',
          borderRadius: '6px 6px 26px 26px',
          background: alu,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
        }}
      >
        {/* klavye */}
        <div
          style={{
            position: 'absolute',
            left: 120,
            right: 120,
            top: 60,
            height: 420,
            borderRadius: 14,
            background: '#0d0c11',
            backgroundImage:
              'linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.8)',
          }}
        />
        {/* trackpad */}
        <div style={{ position: 'absolute', left: '50%', top: 520, width: 520, height: 300, transform: 'translateX(-50%)', borderRadius: 18, background: 'linear-gradient(160deg, #34333a, #232228)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)' }} />
        {/* ekran ışığının gövdeye yansıması */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 420, background: 'linear-gradient(180deg, rgba(232,121,249,0.16), transparent)', opacity: screenGlow }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 2, background: 'rgba(255,255,255,0.25)' }} />
        {/* ön kenar */}
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 22, transformOrigin: '50% 100%', transform: 'rotateX(-90deg)', background: 'linear-gradient(#2c2b31, #121116)', borderRadius: '0 0 18px 18px' }} />
      </div>

      {/* kapak */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transformOrigin: '50% 100%',
          transform: `rotateX(${lid}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* arka yüz (alüminyum) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 26,
            background: alu,
            transform: 'rotateX(180deg) translateZ(1px)',
            backfaceVisibility: 'hidden',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <div style={{ fontFamily: "'Inter Display', sans-serif", fontSize: 42, letterSpacing: '0.4em', color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>SLIMWELL</div>
        </div>
        {/* ön yüz: çerçeve + ekran */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 26,
            background: '#0b0a0e',
            boxShadow: 'inset 0 0 0 2px #3a3940, 0 0 0 1px #000',
            backfaceVisibility: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', left: '50%', top: 7, width: 10, height: 10, borderRadius: '50%', transform: 'translateX(-50%)', background: '#1d1c22', boxShadow: 'inset 0 0 2px #444' }} />
          <div
            style={{
              position: 'absolute',
              left: BEZEL,
              top: BEZEL,
              width: SCREEN_W,
              height: SCREEN_H,
              borderRadius: 8,
              overflow: 'hidden',
              background: '#000',
            }}
          >
            <div style={{ position: 'absolute', inset: 0, opacity: screenGlow }}>{children}</div>
            {/* cam yansıması */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(125deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 35%)', pointerEvents: 'none' }} />
          </div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 2, textAlign: 'center', fontFamily: "'Inter Display', sans-serif", fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.35)' }}>SLIMWELL</div>
        </div>
      </div>
    </div>
  )
}
