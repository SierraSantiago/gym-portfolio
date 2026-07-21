import { gymTheme } from '../../config/gymTheme'
import { zoneAccentLights } from '../../data/gymScene'

export function SceneLights() {
  return (
    <>
      <hemisphereLight
        color={gymTheme.colors.hemisphereSky}
        groundColor={gymTheme.colors.hemisphereGround}
        intensity={0.84}
      />
      <ambientLight color={gymTheme.colors.ambientLight} intensity={0.26} />
      <directionalLight
        castShadow
        color={gymTheme.colors.keyLight}
        intensity={2.25}
        position={[11, 12, 7.5]}
        shadow-bias={-0.00015}
        shadow-camera-bottom={-14}
        shadow-camera-far={36}
        shadow-camera-left={-16}
        shadow-camera-right={16}
        shadow-camera-top={16}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
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
