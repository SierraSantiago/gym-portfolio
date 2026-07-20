export function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight
        castShadow
        intensity={1.6}
        position={[6, 8, 5]}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
      />
    </>
  )
}
