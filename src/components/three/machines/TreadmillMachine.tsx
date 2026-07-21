import { gymTheme } from '../../../config/gymTheme'

const railOffsets = [-0.34, 0.34]

export function TreadmillMachine() {
  return (
    <group>
      <mesh position={[0, 0.12, 0]} receiveShadow>
        <boxGeometry args={[2.45, 0.24, 1.1]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineBase}
          roughness={gymTheme.materials.machineBase.roughness}
          metalness={gymTheme.materials.machineBase.metalness}
        />
      </mesh>

      <mesh position={[-0.1, 0.27, 0]} receiveShadow>
        <boxGeometry args={[1.9, 0.08, 0.68]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineAccent}
          roughness={gymTheme.materials.machineAccent.roughness}
          metalness={gymTheme.materials.machineAccent.metalness}
        />
      </mesh>

      {railOffsets.map((offset) => (
        <group key={`rail-${offset}`} position={[0.68, 0.95, offset]}>
          <mesh
            position={[-0.34, -0.34, 0]}
            rotation={[0, 0, offset < 0 ? 0.32 : -0.32]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.05, 0.05, 1.2, 12]} />
            <meshStandardMaterial
              color={gymTheme.colors.machineFrame}
              roughness={gymTheme.materials.machineFrame.roughness}
              metalness={gymTheme.materials.machineFrame.metalness}
            />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.04, 0.04, 0.78, 12]} />
            <meshStandardMaterial
              color={gymTheme.colors.machineDetail}
              roughness={gymTheme.materials.machineMetal.roughness}
              metalness={gymTheme.materials.machineMetal.metalness}
            />
          </mesh>
        </group>
      ))}

      <mesh position={[0.92, 1.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.28, 0.9, 0.86]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineFrame}
          roughness={gymTheme.materials.machineFrame.roughness}
          metalness={gymTheme.materials.machineFrame.metalness}
        />
      </mesh>

      <mesh position={[1.08, 1.38, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.08, 0.7, 0.92]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineDetail}
          roughness={gymTheme.materials.machineMetal.roughness}
          metalness={gymTheme.materials.machineMetal.metalness}
        />
      </mesh>
    </group>
  )
}
