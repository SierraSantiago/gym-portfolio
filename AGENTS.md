# AGENTS.md

- This repository is a phase-based 3D portfolio built with React, TypeScript, Vite and React Three Fiber.
- Keep scene primitives and rendering helpers in `src/components/three`, scene composition in `src/scenes`, and HTML interface in `src/components/ui`.
- Prefer small components with a single responsibility, strict TypeScript, and no `any`.
- Do not add dependencies unless the existing stack cannot solve the task cleanly.
- Keep documentation aligned with the current phase and validate changes with lint and build before finishing.
- Phase 0 must stay lightweight: no physics, GLB assets, characters, postprocessing, or complex animation.
