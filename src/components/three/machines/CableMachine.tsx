import { gymTheme } from '../../../config/gymTheme'

const towerOffsets = [-0.8, 0.8]
const stackOffsets = [-0.52, 0.52]

export function CableMachine() {
  return (
    <group>
      {towerOffsets.map((offset) => (
        <mesh
          key={`tower-${offset}`}
          position={[offset, 1.7, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.32, 3.4, 0.34]} />
          <meshStandardMaterial
            color={gymTheme.colors.machineFrame}
            roughness={gymTheme.materials.machineFrame.roughness}
            metalness={gymTheme.materials.machineFrame.metalness}
          />
        </mesh>
      ))}

      <mesh position={[0, 3.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.08, 0.22, 0.3]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineFrame}
          roughness={gymTheme.materials.machineFrame.roughness}
          metalness={gymTheme.materials.machineFrame.metalness}
        />
      </mesh>

      <mesh position={[0, 0.24, 0]} receiveShadow>
        <boxGeometry args={[2.1, 0.12, 1.2]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineBase}
          roughness={gymTheme.materials.machineBase.roughness}
          metalness={gymTheme.materials.machineBase.metalness}
        />
      </mesh>

      {stackOffsets.map((offset) => (
        <group key={`stack-${offset}`} position={[offset, 0.5, -0.08]}>
          {Array.from({ length: 5 }, (_, index) => (
            <mesh
              key={`plate-${offset}-${index}`}
              position={[0, index * 0.2, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[0.32, 0.12, 0.42]} />
              <meshStandardMaterial
                color={gymTheme.colors.machineAccent}
                roughness={gymTheme.materials.machineAccent.roughness}
                metalness={gymTheme.materials.machineAccent.metalness}
              />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0, 2.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.12, 1.3, 0.12]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineDetail}
          roughness={gymTheme.materials.machineMetal.roughness}
          metalness={gymTheme.materials.machineMetal.metalness}
        />
      </mesh>

      <mesh position={[0, 2.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, 1.32, 16]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineDetail}
          roughness={gymTheme.materials.machineMetal.roughness}
          metalness={gymTheme.materials.machineMetal.metalness}
        />
      </mesh>
    </group>
  )
}
