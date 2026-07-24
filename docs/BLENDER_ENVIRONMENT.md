# Blender Environment Integration

## Runtime ownership

The scene is deliberately split into two layers.

### Blender-authored environment

`public/models/gym/gym-environment.glb` owns:

- the continuous floor and separated zone inlays;
- the three perimeter walls;
- baseboards and architectural wall panels;
- the mirror wall;
- suspended light-fixture geometry;
- lockers, hydration station, bench, plant, plate tree, functional rack and small perimeter props.

### React Three Fiber runtime

The application continues to own:

- the real project-machine GLBs;
- project titles and future interaction states;
- zone labels and the `BUILD YOUR CAREER` sign;
- real-time lights, shadows, fog and camera controls;
- the front glazed facade and entrance framing that closes the presentation side;
- the secondary real equipment models currently placed by `GymDecoration`.

This separation prevents the project stations from becoming difficult to select or animate after a Blender re-export.

## Design constraints addressed

- No roof beams or exposed pipes.
- No central structural columns.
- No floating decoration.
- No intersecting floor overlays.
- Front facade closed with a centered entrance aligned to the approach route.
- Perimeter decoration that does not block the central circulation route.
- Existing project-machine coordinates remain valid.

## Stable coordinates

The environment keeps the original 20 m × 14 m footprint and a 5.2 m wall height. The primary project anchors remain:

| Project | Position in Three.js |
|---|---:|
| CareerPulse | `[-6.75, 0, 0.35]` |
| Risk Analysis AI | `[0.55, 0, -4.82]` |
| Automation Pipeline | `[6.05, 0, -3.3]` |

Future player movement should use the colliders and markers generated in the editable Blender source rather than high-detail render meshes.
