import {
  extend,
  useFrame,
  useThree,
  type ThreeElement,
} from '@react-three/fiber'
import { useEffect, useRef } from 'react'
import { PerspectiveCamera as ThreePerspectiveCamera } from 'three'
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { getCameraViewConfig } from '../../config/gymCamera'

extend({ OrbitControls: ThreeOrbitControls })

declare module '@react-three/fiber' {
  interface ThreeElements {
    orbitControls: ThreeElement<typeof ThreeOrbitControls>
  }
}

export function SceneCamera() {
  const controlsRef = useRef<ThreeOrbitControls | null>(null)
  const { camera, gl, size } = useThree()
  const cameraConfig = getCameraViewConfig(size.width)

  useEffect(() => {
    if (!(camera instanceof ThreePerspectiveCamera)) {
      return
    }

    camera.position.set(...cameraConfig.position)
    camera.fov = cameraConfig.fov
    camera.near = 0.1
    camera.far = 72
    camera.lookAt(...cameraConfig.target)
    camera.updateProjectionMatrix()

    if (controlsRef.current) {
      controlsRef.current.target.set(...cameraConfig.target)
      controlsRef.current.update()
    }
  }, [camera, cameraConfig])

  useFrame(() => {
    controlsRef.current?.update()
  })

  return (
    /* Temporary inspection controls until the player camera replaces orbit view. */
    <orbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.075}
      enablePan={false}
      minDistance={cameraConfig.minDistance}
      maxDistance={cameraConfig.maxDistance}
      minPolarAngle={cameraConfig.minPolarAngle}
      maxPolarAngle={cameraConfig.maxPolarAngle}
      minAzimuthAngle={cameraConfig.minAzimuthAngle}
      maxAzimuthAngle={cameraConfig.maxAzimuthAngle}
      rotateSpeed={cameraConfig.rotateSpeed}
      zoomSpeed={cameraConfig.zoomSpeed}
    />
  )
}
