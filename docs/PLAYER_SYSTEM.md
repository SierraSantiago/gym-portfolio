# Player System

## Runtime flow

`PlayerCharacter.tsx` owns keyboard input, movement, animation state, facing,
and simplified collision resolution. Every frame it publishes the player's
position to both `usePlayerStore` and `useReceptionStore`.

`SceneCamera.tsx` reads the player store and provides a smoothed third-person
camera. Dragging the canvas changes yaw and pitch; the wheel changes distance.

## Controls

- W/A/S/D: move
- Shift: run
- Drag mouse: rotate camera
- Mouse wheel: zoom
- E: interact
- Esc: close dialogue

## Animation assets

The base player FBX includes skin and textures. Animation FBXs are downloaded
without skin and are normalized to in-place movement at runtime.

The receptionist's optimized animation files use a different Mixamo namespace
prefix from her base model. `ReceptionistCharacter.tsx` remaps `mixamorig7:` to
`mixamorig:` when creating the clips.

## Collision model

Collision is intentionally implemented with low-cost 2D circle-versus-AABB
checks. This is appropriate for the current flat gym floor and avoids using the
full render meshes as colliders. Update the boxes in `PlayerCharacter.tsx` when
machine positions change.
