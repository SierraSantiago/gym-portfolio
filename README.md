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
  data/
  scenes/
  styles/
  types/
```

## Current Status

The repository is currently in Phase 1.5. It includes:

- a fullscreen React Three Fiber canvas with ACESFilmic tone mapping, controlled DPR, and soft shadows;
- an expanded greybox gym of roughly `20 x 14 x 5.2` units, prepared for future third-person navigation;
- differentiated cardio, strength, functional, circulation, and future-project zones;
- visible ceiling fixtures, revised lighting, structural columns, mirrors, benches, a plate tree, mats, and simple functional props;
- three primitive-based machines connected to typed project data:
  - `CareerPulse` as a treadmill in the cardio zone;
  - `Risk Analysis AI` as a dumbbell rack in the strength zone;
  - `Automation Pipeline` as a cable machine in the functional zone;
- a temporary inspection camera with limits chosen to avoid cenital views and floor clipping;
- an HTML overlay separated from the 3D layer and kept visually lighter over the canvas.

## Greybox Notes

- The environment still uses only primitive geometry and simple Three.js materials.
- This phase prioritizes readability, spatial composition, circulation, and lighting over realism.
- The layout intentionally leaves empty room for future project stations.

## Next Phases

- Implement the player layer with movement and collisions.
- Introduce character-scale traversal and camera behavior beyond temporary orbit inspection.
- Replace selected primitives with more refined gym assets once the layout is stable.
- Add richer project interactions only after the environment and traversal feel correct.
