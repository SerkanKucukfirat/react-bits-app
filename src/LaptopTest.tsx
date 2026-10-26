import React from 'react'
import { AbsoluteFill, Img, staticFile } from 'remotion'
import { Laptop, LID_H, LW } from './Laptop'

export const LaptopTest: React.FC<{ lid: number; rx: number; ry: number; s: number }> = ({ lid, rx, ry, s }) => (
  <AbsoluteFill style={{ background: 'radial-gradient(ellipse at 50% 40%, #1a1029, #030206)', perspective: 2600 }}>
    <div style={{ position: 'absolute', left: 960 - LW / 2, top: 540 - LID_H / 2 - 60, width: LW, height: LID_H, transformStyle: 'preserve-3d', transform: `scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg)` }}>
      <Laptop lid={lid} screenGlow={1}>
        <Img src={staticFile('v2/anasayfa.png')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Laptop>
    </div>
  </AbsoluteFill>
)
