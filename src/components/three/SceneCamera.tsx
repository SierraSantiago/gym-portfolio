import {
  extend,
  useFrame,
  useThree,
  type ThreeElement,
} from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three'
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import type { Tuple3 } from '../../types/project'

extend({ OrbitControls: ThreeOrbitControls })

declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: ThreeElement<typeof ThreeOrbitControls>
  }
}

const desktopCameraTarget: Tuple3 = [0, 1.8, -1]
const compactCameraTarget: Tuple3 = [0, 1.8, -0.35]

export function SceneCamera() {
  const controlsRef = useRef<ThreeOrbitControls | null>(null)
  const { camera, gl, size } = useThree()
  const isCompactViewport = size.width < 900
  const position = useMemo<Tuple3>(
    () => (isCompactViewport ? [15.4, 8.8, 22.2] : [14, 7.2, 18]),
    [isCompactViewport],
  )
  const target = isCompactViewport ? compactCameraTarget : desktopCameraTarget
  const fov = isCompactViewport ? 46 : 41

  useEffect(() => {
    if (!(camera instanceof ThreePerspectiveCamera)) {
      return
    }

    camera.position.set(...position)
    camera.fov = fov
    camera.near = 0.1
    camera.far = 72
    camera.lookAt(...target)
    camera.updateProjectionMatrix()

    if (controlsRef.current) {
      controlsRef.current.target.set(...target)
      controlsRef.current.update()
    }
  }, [camera, fov, position, target])

  useFrame(() => {
    controlsRef.current?.update()
  })

  return (
    /* Temporary inspection controls for the greybox phase. */
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.09}
      enablePan={false}
      minDistance={13}
      maxDistance={26}
      minPolarAngle={0.9}
      maxPolarAngle={1.32}
      minAzimuthAngle={-0.7}
      maxAzimuthAngle={1.05}
      rotateSpeed={0.62}
      zoomSpeed={0.72}
    />
  )
}
