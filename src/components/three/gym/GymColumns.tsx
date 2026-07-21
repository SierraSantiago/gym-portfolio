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
            roughness={gymTheme.materials.structure.roughness}
            metalness={gymTheme.materials.structure.metalness}
          />
        </mesh>
      ))}
    </group>
  )
}
