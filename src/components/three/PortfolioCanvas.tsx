import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  ACESFilmicToneMapping,
  PCFSoftShadowMap,
  SRGBColorSpace,
} from 'three'
import { gymTheme } from '../../config/gymTheme'
import { GymShowcaseScene } from '../../scenes/GymShowcaseScene'
import { SceneErrorBoundary } from './SceneErrorBoundary'
import { SceneLoader } from './SceneLoader'
import './models/preloadGymModels'

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
        <SceneErrorBoundary>
          <Suspense fallback={<SceneLoader />}>
            <GymShowcaseScene />
          </Suspense>
        </SceneErrorBoundary>
      </Canvas>
    </div>
  )
}
