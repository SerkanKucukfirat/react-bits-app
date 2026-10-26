import { Composition } from 'remotion'
import { Akademi, TOTAL } from './Akademi'
import { Cumhuriyet, CUMHURIYET_FRAMES } from './Cumhuriyet'

export const Root = () => (
  <>
    <Composition id="Akademi" component={Akademi} durationInFrames={TOTAL} fps={30} width={1920} height={1080} defaultProps={{ withAudio: false }} />
    <Composition id="Cumhuriyet" component={Cumhuriyet} durationInFrames={CUMHURIYET_FRAMES} fps={30} width={1080} height={1920} />
  </>
)
