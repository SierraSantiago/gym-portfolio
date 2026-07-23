# Blender gym environment

The web runtime uses:

```text
public/models/gym/gym-environment.glb
```

That GLB contains the non-interactive gym architecture and environmental decoration. The three project machines remain separate React Three Fiber objects so they can keep their own labels and future interactions.

## Create the editable `.blend`

From the repository root, run Blender in background mode:

```bash
blender --background --python tools/blender/build_gym_environment.py
```

On Windows, when Blender is not in `PATH`:

```powershell
& "C:\Program Files\Blender Foundation\Blender 4.5\blender.exe" `
  --background `
  --python tools/blender/build_gym_environment.py
```

Output:

```text
tools/blender/output/gym-environment.blend
```

The generated Blender file includes:

- organized architecture, floor-zone, mirror, light-fixture and decoration collections;
- player spawn, camera target and project anchor empties;
- simplified wall, floor and perimeter-prop colliders;
- a Blender-only preview camera and light rig;
- metric units and stable semantic object names.

## Editing workflow

1. Generate and open `tools/blender/output/gym-environment.blend`.
2. Edit only the visual collections unless you intentionally need to change markers or colliders.
3. Keep the room origin and scale unchanged because the project-machine coordinates are configured in `src/data/projectStations.ts`.
4. Export the visual scene as binary glTF to:

```text
public/models/gym/gym-environment.glb
```

5. Use these export settings:
   - Format: `glTF Binary (.glb)`
   - Include: visible objects
   - Transform: `+Y Up`
   - Geometry: apply modifiers
   - Materials: export
   - Cameras and punctual lights: disabled
   - Custom properties: enabled when markers are exported intentionally

The web project preloads the GLB through `src/data/gymModelAssets.ts`.
