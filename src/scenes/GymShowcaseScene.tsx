import { ProjectStation } from '../components/three/machines/ProjectStation'
import { GymRoom } from '../components/three/gym/GymRoom'
import { SceneCamera } from '../components/three/SceneCamera'
import { SceneLights } from '../components/three/SceneLights'
import { ReceptionArea } from '../components/three/reception/ReceptionArea'
import { gymTheme } from '../config/gymTheme'
import { projectStations } from '../data/projectStations'

export function GymShowcaseScene() {
  return (
    <>
      <color attach="background" args={[gymTheme.colors.background]} />
      <fog
        attach="fog"
        args={[
          gymTheme.colors.fog,
          gymTheme.render.fogNear,
          gymTheme.render.fogFar,
        ]}
      />
      <SceneCamera />
      <SceneLights />
      <GymRoom />
      <ReceptionArea />
      {projectStations.map((station) => (
        <ProjectStation key={station.id} station={station} />
      ))}
    </>
  )
}
