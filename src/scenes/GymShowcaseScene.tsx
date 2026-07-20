import { PerspectiveCamera } from '@react-three/drei'
import { DebugCube } from '../components/three/DebugCube'
import { SceneFloor } from '../components/three/SceneFloor'
import { SceneLights } from '../components/three/SceneLights'

export function GymShowcaseScene() {
  return (
    <>
      <color attach="background" args={['#05070b']} />
      <PerspectiveCamera
        makeDefault
        position={[5, 4.5, 7]}
        fov={45}
        near={0.1}
        far={50}
        onUpdate={(camera) => {
          camera.lookAt(0, -0.2, 0)
        }}
      />
      <SceneLights />
      <SceneFloor />
      <DebugCube />
    </>
  )
}
