import { gymTheme } from '../../../config/gymTheme'

const dumbbellOffsets = [-0.8, -0.3, 0.3, 0.8]
const dumbbellRows = [0.82, 1.28]

export function DumbbellRack() {
  return (
    <group>
      <mesh position={[0, 0.08, 0]} receiveShadow>
        <boxGeometry args={[2.7, 0.16, 1.2]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineBase}
          roughness={gymTheme.materials.machineBase.roughness}
          metalness={gymTheme.materials.machineBase.metalness}
        />
      </mesh>

      {[-1.05, 1.05].map((offset) => (
        <mesh
          key={`support-${offset}`}
          position={[offset, 0.92, 0]}
          rotation={[0, 0, offset < 0 ? 0.2 : -0.2]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.18, 1.8, 0.18]} />
          <meshStandardMaterial
            color={gymTheme.colors.machineFrame}
            roughness={gymTheme.materials.machineFrame.roughness}
            metalness={gymTheme.materials.machineFrame.metalness}
          />
        </mesh>
      ))}

      {[0.78, 1.24].map((height, index) => (
        <mesh
          key={`shelf-${height}`}
          position={[0, height, 0.02]}
          rotation={[0.1 + index * 0.02, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[2.1, 0.14, 0.38]} />
          <meshStandardMaterial
            color={gymTheme.colors.machineAccent}
            roughness={gymTheme.materials.machineAccent.roughness}
            metalness={gymTheme.materials.machineAccent.metalness}
          />
        </mesh>
      ))}

      {dumbbellRows.map((height) =>
        dumbbellOffsets.map((offset) => (
          <group key={`${height}-${offset}`} position={[offset, height, 0.02]}>
            <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.24, 12]} />
              <meshStandardMaterial
                color={gymTheme.colors.machineDetail}
                roughness={gymTheme.materials.machineMetal.roughness}
                metalness={gymTheme.materials.machineMetal.metalness}
              />
            </mesh>
            {[-0.14, 0.14].map((side) => (
              <mesh
                key={`${height}-${offset}-${side}`}
                position={[side, 0, 0]}
                castShadow
                receiveShadow
              >
                <cylinderGeometry args={[0.11, 0.11, 0.1, 16]} />
                <meshStandardMaterial
                  color={gymTheme.colors.machineFrame}
                  roughness={gymTheme.materials.machineFrame.roughness}
                  metalness={gymTheme.materials.machineFrame.metalness}
                />
              </mesh>
            ))}
          </group>
        )),
      )}
    </group>
  )
}
