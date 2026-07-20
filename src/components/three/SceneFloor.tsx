export function SceneFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
      <planeGeometry args={[24, 24]} />
      <meshStandardMaterial color="#111827" roughness={0.9} metalness={0.05} />
    </mesh>
  )
}
