import { Canvas } from '@react-three/fiber'
import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  SRGBColorSpace,
} from 'three'
import { gymTheme } from '../../config/gymTheme'
import { GymShowcaseScene } from '../../scenes/GymShowcaseScene'

export function PortfolioCanvas() {
  return (
    <div className="canvas-shell" aria-hidden="true">
      <Canvas
        dpr={gymTheme.render.dpr}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace
          gl.toneMapping = ACESFilmicToneMapping
          gl.toneMappingExposure = gymTheme.render.exposure
          gl.shadowMap.enabled = true
          gl.shadowMap.type = PCFSoftShadowMap
          gl.setClearColor(gymTheme.colors.background)
        }}
      >
        <GymShowcaseScene />
      </Canvas>
    </div>
  )
}
