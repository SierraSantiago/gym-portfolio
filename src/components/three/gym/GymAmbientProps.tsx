import { gymTheme } from '../../../config/gymTheme'
import {
  benches,
  exerciseMats,
  functionalBoxes,
  plateTree,
  zoneSigns,
} from '../../../data/gymScene'
import { GymZoneSign } from './GymZoneSign'

function Bench() {
  return (
    <group>
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.58, 0.14, 0.46]} />
        <meshStandardMaterial
          color={gymTheme.colors.benchPad}
          roughness={0.62}
          metalness={0.16}
        />
      </mesh>
      <mesh position={[-0.48, 0.96, -0.12]} rotation={[-0.35, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.16, 1.08, 0.48]} />
        <meshStandardMaterial
          color={gymTheme.colors.benchPad}
          roughness={0.62}
          metalness={0.16}
        />
      </mesh>
      {[
        [-0.58, 0.2, -0.16],
        [-0.58, 0.2, 0.16],
        [0.58, 0.2, -0.16],
        [0.58, 0.2, 0.16],
      ].map((position) => (
        <mesh
          key={position.join('-')}
          position={position as [number, number, number]}
          rotation={[0.12, 0, 0]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[0.08, 0.42, 0.08]} />
          <meshStandardMaterial
            color={gymTheme.colors.machineFrame}
            roughness={gymTheme.materials.structure.roughness}
            metalness={gymTheme.materials.structure.metalness}
          />
        </mesh>
      ))}
    </group>
  )
}

function PlateTree() {
  return (
    <group position={plateTree.position}>
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <boxGeometry args={[1, 0.2, 1]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineBase}
          roughness={gymTheme.materials.machineBase.roughness}
          metalness={gymTheme.materials.machineBase.metalness}
        />
      </mesh>
      <mesh position={[0, 1.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.08, 0.08, 2.1, 14]} />
        <meshStandardMaterial
          color={gymTheme.colors.machineFrame}
          roughness={gymTheme.materials.machineFrame.roughness}
          metalness={gymTheme.materials.machineFrame.metalness}
        />
      </mesh>
      {[-0.48, 0.48].map((xOffset) =>
        [0.74, 1.14, 1.54].map((height) => (
          <mesh
            key={`${xOffset}-${height}`}
            position={[xOffset, height, 0]}
            rotation={[0, 0, Math.PI / 2]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.04, 0.04, 0.86, 12]} />
            <meshStandardMaterial
              color={gymTheme.colors.machineDetail}
              roughness={gymTheme.materials.machineMetal.roughness}
              metalness={gymTheme.materials.machineMetal.metalness}
            />
          </mesh>
        )),
      )}
      {[-0.5, 0.5].map((xOffset) =>
        [0.74, 1.14, 1.54].map((height) => (
          <mesh
            key={`disc-${xOffset}-${height}`}
            position={[xOffset * 0.66, height, 0]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
            receiveShadow
          >
            <cylinderGeometry args={[0.22, 0.22, 0.08, 20]} />
            <meshStandardMaterial
              color={gymTheme.colors.plate}
              roughness={0.44}
              metalness={0.34}
            />
          </mesh>
        )),
      )}
    </group>
  )
}

export function GymAmbientProps() {
  return (
    <group>
      {benches.map((bench) => (
        <group
          key={bench.id}
          position={bench.position}
          rotation={bench.rotation ?? [0, 0, 0]}
        >
          <Bench />
        </group>
      ))}

      {exerciseMats.map((mat) => (
        <mesh key={mat.id} position={mat.position} receiveShadow>
          <boxGeometry args={mat.size} />
          <meshStandardMaterial
            color={gymTheme.colors.mat}
            roughness={gymTheme.materials.mat.roughness}
            metalness={gymTheme.materials.mat.metalness}
          />
        </mesh>
      ))}

      {functionalBoxes.map((box) => (
        <mesh key={box.id} position={box.position} castShadow receiveShadow>
          <boxGeometry args={box.size} />
          <meshStandardMaterial
            color={gymTheme.colors.machineAccent}
            roughness={0.66}
            metalness={0.16}
          />
        </mesh>
      ))}

      <PlateTree />

      {zoneSigns.map((sign) => (
        <GymZoneSign key={sign.id} sign={sign} />
      ))}
    </group>
  )
}
