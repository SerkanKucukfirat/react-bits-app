import { Composition } from 'remotion'
import { Akademi, TOTAL } from './Akademi'
import { Akademi2, TOTAL2 } from './Akademi2'
import { Cumhuriyet, CUMHURIYET_FRAMES } from './Cumhuriyet'

export const Root = () => (
  <>
    <Composition id="Akademi" component={Akademi} durationInFrames={TOTAL} fps={30} width={1920} height={1080} defaultProps={{ withAudio: false }} />
    <Composition id="Akademi2" component={Akademi2} durationInFrames={TOTAL2} fps={30} width={1920} height={1080} defaultProps={{ withAudio: false }} />
    <Composition id="Cumhuriyet" component={Cumhuriyet} durationInFrames={CUMHURIYET_FRAMES} fps={30} width={1080} height={1920} />
  </>
)
