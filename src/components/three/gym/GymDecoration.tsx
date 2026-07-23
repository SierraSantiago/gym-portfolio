import { gymTheme } from '../../../config/gymTheme'
import {
  exerciseMats,
  functionalBoxes,
  gymEquipmentPlacements,
  rubberFloorOverlays,
  secondaryGymModels,
  wallCoverPanels,
} from '../../../data/gymScene'
import { GymEquipmentProps } from '../models/GymEquipmentProps'
import { GymModel } from '../models/GymModel'

export function GymDecoration() {
  return (
    <group>
      {rubberFloorOverlays.map((overlay) => (
        <group key={overlay.id} position={overlay.position}>
          <mesh receiveShadow>
            <boxGeometry args={overlay.size} />
            <meshStandardMaterial
              color={gymTheme.colors.floorOverlay}
              roughness={0.96}
              metalness={0.02}
            />
          </mesh>
          <mesh position={[0, overlay.size[1] * 0.52, 0]} receiveShadow>
            <boxGeometry args={[overlay.size[0] - 0.12, 0.002, overlay.size[2] - 0.12]} />
            <meshStandardMaterial
              color={gymTheme.colors.floorOverlayInset}
              roughness={0.98}
              metalness={0.01}
            />
          </mesh>
        </group>
      ))}

      {wallCoverPanels.map((panel) => {
        const isCenterCover = panel.id === 'cover-under-sign-center'

        return (
          <group
            key={panel.id}
            position={panel.position}
            rotation={panel.rotation ?? [0, 0, 0]}
          >
            <mesh castShadow receiveShadow>
              <boxGeometry args={panel.size} />
              <meshStandardMaterial
                color={isCenterCover ? gymTheme.colors.wallPanelMid : gymTheme.colors.wall}
                roughness={isCenterCover ? 0.9 : 0.92}
                metalness={isCenterCover ? 0.03 : 0.05}
              />
            </mesh>
          </group>
        )
      })}

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
