import { ReceptionDesk } from './ReceptionDesk'
import { ReceptionInteractionZone } from './ReceptionInteractionZone'

export function ReceptionArea() {
  return (
    <group>
      <ReceptionDesk />
      <ReceptionInteractionZone position={[0, 0, 4.45]} />
    </group>
  )
}
