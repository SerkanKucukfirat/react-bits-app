import { Composition } from 'remotion'
import { Akademi, TOTAL } from './Akademi'
import { Akademi2, TOTAL2 } from './Akademi2'
import { Akademi3, TOTAL3 } from './Akademi3'
import { Akademi4, TOTAL4 } from './Akademi4'
import { LaptopTest } from './LaptopTest'
import { Cumhuriyet, CUMHURIYET_FRAMES } from './Cumhuriyet'

export const Root = () => (
  <>
    <Composition id="Akademi" component={Akademi} durationInFrames={TOTAL} fps={30} width={1920} height={1080} defaultProps={{ withAudio: false }} />
    <Composition id="Akademi2" component={Akademi2} durationInFrames={TOTAL2} fps={30} width={1920} height={1080} defaultProps={{ withAudio: false }} />
    <Composition id="Cumhuriyet" component={Cumhuriyet} durationInFrames={CUMHURIYET_FRAMES} fps={30} width={1080} height={1920} />
    <Composition id="Akademi3" component={Akademi3} durationInFrames={TOTAL3} fps={30} width={1920} height={1080} defaultProps={{ withAudio: false }} />
    <Composition id="Akademi4" component={Akademi4} durationInFrames={TOTAL4} fps={30} width={1920} height={1080} defaultProps={{ withAudio: false }} />
    <Composition id="LaptopTest" component={LaptopTest} durationInFrames={1} fps={30} width={1920} height={1080} defaultProps={{ lid: 8, rx: -14, ry: -18, s: 0.6 }} />
  </>
)
