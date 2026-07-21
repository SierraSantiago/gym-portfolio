# Santiago Sierra 3D Gym Portfolio

## Objective

Build a professional, maintainable web portfolio with a gym-inspired 3D atmosphere. The long-term goal is to combine a polished React interface with a Three.js scene rendered through React Three Fiber, while keeping the codebase modular enough for future content, interactions, and visual upgrades.

## Stack

- React 19
- TypeScript 6 in strict mode
- Vite 8
- Three.js
- React Three Fiber
- Drei
- Zustand
- Oxlint

## Commands

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

## Structure

```text
src/
  components/
    three/
    ui/
  config/
  data/
  scenes/
  styles/
  types/
docs/
  ASSET_LICENSES.md
  DECORATION_PLAN.md
public/
  models/
    gym/
```

## Phase 1.8 Status

The repository is now in Phase 1.8. It includes:

- normalized GLB assets served from `public/models/gym`;
- a typed model manifest and typed station data, so project-to-machine assignment lives in data instead of JSX;
- the same three real machine integrations:
- `CareerPulse` uses `treadmill.glb`
- `Risk Analysis AI` uses `dumbbell-stand.glb`
- `Automation Pipeline` uses `leg-press.glb`
- a wider presentation camera with responsive configurations for wide desktop, laptop, and narrow screens;
- complete removal of visible roof beams and rails;
- a suspended-light-only ceiling presentation;
- a rebuilt floor layering system with clean elevations instead of intersecting overlays;
- corrected circulation, zone accents, and a more coherent continuous gym floor;
- richer wall paneling, warmer and cooler lighting contrast, and improved mirror readability;
- a decoration planning document for the next asset-integration phase;
- the existing loading system with `Suspense`, `useProgress`, and in-canvas feedback.

## Root Cause Of The Floor Artifacts

The dark floor patches were caused by intersecting floor geometry:

- zone slabs, seam strips, aisle accents, and front-edge strips overlapped vertically;
- the aisle crossed the strength slab with shared volume;
- seam strips and edge strips partially intersected each other;
- the functional mat was also embedded into the zone slab.

Phase 1.8 fixes this by rendering the decorative floor layers as separated horizontal planes above a continuous base floor, with stable height ordering for zones, aisle, seams, and borders.

## Architecture Notes

- Runtime model URLs are centralized in `src/data/gymModelAssets.ts`.
- Project stations stay data-driven through `src/data/projectStations.ts`.
- Camera behavior is centralized in `src/config/gymCamera.ts`.
- Floor zoning, architectural panels, leds, decoration, and lighting positions are configured in `src/data/gymScene.ts`.
- Shared GLTF materials should not be mutated directly without first cloning the instance-local material.

## Performance Notes

- GLBs are loaded from public URLs instead of bundled imports.
- DPR remains capped for stability.
- Only the main directional light casts shadows.
- Decorative LEDs use emissive materials instead of extra real lights.
- No heavy post-processing or new dependencies were added.
- `gym-equipment.glb` remains the heaviest asset in the current set, but it stays close to 1.1 MB and below the 5 MB warning threshold.

## Credits And Licenses

Asset provenance and license placeholders are tracked in [docs/ASSET_LICENSES.md](docs/ASSET_LICENSES.md) and still require source verification.

## Current Limitations

- There is still no player character, WASD movement, third-person camera, or collisions.
- `gym-equipment.glb` still does not expose the "two plates plus mat" structure described in the planning notes; the scene continues to reuse verified named nodes from the actual hierarchy instead.
- Decorative assets for towels, bottles, benches, plants, shelves, and props are still deferred to the next phase.
- Final interactive project panels and proximity behavior are intentionally deferred.

## Next Phase

Phase 1.9 will focus on searching, selecting, and integrating free decorative assets for the prepared gym zones.
