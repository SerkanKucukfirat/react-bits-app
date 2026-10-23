import { Composition } from 'remotion'
import { Akademi, TOTAL } from './Akademi'

export const Root = () => (
  <Composition id="Akademi" component={Akademi} durationInFrames={TOTAL} fps={30} width={1920} height={1080} defaultProps={{ withAudio: false }} />
)
