import { Canvas } from '@react-three/fiber'
import { GymShowcaseScene } from '../../scenes/GymShowcaseScene'

export function PortfolioCanvas() {
  return (
    <div className="canvas-shell" aria-hidden="true">
      <Canvas
        dpr={[1, 2]}
        shadows
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <GymShowcaseScene />
      </Canvas>
    </div>
  )
}
