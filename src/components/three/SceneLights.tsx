import { gymTheme } from '../../config/gymTheme'
import { zoneAccentLights } from '../../data/gymScene'

export function SceneLights() {
  return (
    <>
      <hemisphereLight
        color={gymTheme.colors.hemisphereSky}
        groundColor={gymTheme.colors.hemisphereGround}
        intensity={0.64}
      />
      <ambientLight color={gymTheme.colors.ambientLight} intensity={0.12} />
      <directionalLight
        castShadow
        color={gymTheme.colors.keyLight}
        intensity={1.9}
        position={[9.4, 11.6, 6.8]}
        shadow-bias={-0.00018}
        shadow-normalBias={0.02}
        shadow-camera-bottom={-12}
        shadow-camera-far={36}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-mapSize-height={1536}
        shadow-mapSize-width={1536}
      />
      {zoneAccentLights.map((light) => (
        <pointLight
          key={light.id}
          color={gymTheme.colors[light.colorToken]}
          intensity={light.intensity}
          position={light.position}
          distance={light.distance}
          decay={2}
        />
      ))}
    </>
  )
}
