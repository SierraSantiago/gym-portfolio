import { gymTheme } from '../../../config/gymTheme'
import {
  exerciseMats,
  functionalBoxes,
  gymEquipmentPlacements,
  secondaryGymModels,
} from '../../../data/gymScene'
import { GymEquipmentProps } from '../models/GymEquipmentProps'
import { GymModel } from '../models/GymModel'

export function GymDecoration() {
  return (
    <group>
      {secondaryGymModels.map((model) => (
        <GymModel
          key={model.id}
          assetId={model.assetId}
          position={model.position}
          rotation={model.rotation}
          scale={model.scale}
        />
      ))}

      {gymEquipmentPlacements.map((placement) => (
        <GymEquipmentProps key={placement.id} placement={placement} />
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
            roughness={0.7}
            metalness={0.14}
          />
        </mesh>
      ))}
    </group>
  )
}
