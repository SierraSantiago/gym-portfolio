import { useMemo } from 'react'
import { CanvasTexture } from 'three'
import { gymTheme } from '../../../config/gymTheme'
import {
  projectTourPathSegments,
  projectTourStops,
  socialTourPathSegments,
  socialTourStops,
  type TourStopConfig,
} from '../../../data/projectRoute'

interface RoutePalette {
  path: string
  pathGlow: string
  disc: string
  discGlow: string
}

function TourStopMarker({
  stop,
  palette,
}: {
  stop: TourStopConfig
  palette: RoutePalette
}) {
  const numberTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 256

    const context = canvas.getContext('2d')
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.fillStyle = '#f7ebc6'
      context.font = stop.badge ? '700 72px Bahnschrift, Aptos, Segoe UI, sans-serif' : '700 132px Bahnschrift, Aptos, Segoe UI, sans-serif'
      context.textAlign = 'center'
      context.textBaseline = 'middle'
      context.fillText(
        stop.badge ?? String(stop.order),
        canvas.width / 2,
        canvas.height / 2 + 4,
      )
    }

    const texture = new CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [stop.order])

  return (
    <group position={stop.position}>
      <mesh>
        <cylinderGeometry args={[0.24, 0.24, 0.018, 28]} />
        <meshStandardMaterial
          color={palette.disc}
          emissive={palette.discGlow}
          emissiveIntensity={0.9}
          roughness={0.24}
          metalness={0.1}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.28, 0.28]} />
        <meshBasicMaterial map={numberTexture} transparent toneMapped={false} />
      </mesh>
    </group>
  )
}

export function GymTourRoute() {
  const projectPalette: RoutePalette = {
    path: gymTheme.colors.routePath,
    pathGlow: gymTheme.colors.routePathGlow,
    disc: gymTheme.colors.routeDisc,
    discGlow: gymTheme.colors.routeDiscGlow,
  }

  const socialPalette: RoutePalette = {
    path: gymTheme.colors.socialRoutePath,
    pathGlow: gymTheme.colors.socialRoutePathGlow,
    disc: gymTheme.colors.socialRouteDisc,
    discGlow: gymTheme.colors.socialRouteDiscGlow,
  }

  return (
    <group>
      <group>
        {projectTourPathSegments.map((segment) => (
          <group
            key={segment.id}
            position={segment.position}
            rotation={segment.rotation ?? [0, 0, 0]}
          >
            <mesh>
              <boxGeometry args={segment.size} />
              <meshStandardMaterial
                color={projectPalette.path}
                emissive={projectPalette.pathGlow}
                emissiveIntensity={1.15}
                roughness={0.34}
                metalness={0.08}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {projectTourStops.map((stop) => (
          <TourStopMarker key={stop.id} stop={stop} palette={projectPalette} />
        ))}
      </group>

      <group>
        {socialTourPathSegments.map((segment) => (
          <group
            key={segment.id}
            position={segment.position}
            rotation={segment.rotation ?? [0, 0, 0]}
          >
            <mesh>
              <boxGeometry args={segment.size} />
              <meshStandardMaterial
                color={socialPalette.path}
                emissive={socialPalette.pathGlow}
                emissiveIntensity={1.15}
                roughness={0.34}
                metalness={0.08}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}

        {socialTourStops.map((stop) => (
          <TourStopMarker key={stop.id} stop={stop} palette={socialPalette} />
        ))}
      </group>
    </group>
  )
}
