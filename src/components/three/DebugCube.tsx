export function DebugCube() {
  return (
    <mesh position={[0, -0.2, 0]} castShadow>
      <boxGeometry args={[1.6, 1.6, 1.6]} />
      <meshStandardMaterial color="#f97316" roughness={0.35} metalness={0.2} />
    </mesh>
  )
}
