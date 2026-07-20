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

The repository is currently in Phase 0. It includes:

- a fullscreen React Three Fiber canvas;
- a minimal validation scene with a perspective camera, ambient light, directional light, a temporary floor, and a cube;
- an HTML overlay separated from the 3D layer;
- a small repository-specific `AGENTS.md`;
- documentation aligned with the current architecture and scope.

## Next Phases

- Replace placeholder geometry with a gym-inspired blockout scene.
- Introduce content sections, navigation, and responsive layout behavior.
- Add real portfolio data and state handling where needed.
- Evaluate interaction patterns, camera behavior, and selective motion.
- Add optimized assets only when the scene direction is stable.
