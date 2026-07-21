import { gymTheme } from '../../../config/gymTheme'
import { gymColumns } from '../../../data/gymScene'

export function GymColumns() {
  return (
    <group>
      {gymColumns.map((column) => (
        <mesh
          key={column.id}
          position={column.position}
          castShadow
          receiveShadow
        >
          <boxGeometry args={column.size} />
          <meshStandardMaterial
            color={gymTheme.colors.structure}
            roughness={0.42}
            metalness={0.28}
          />
        </mesh>
      ))}
    </group>
  )
}
