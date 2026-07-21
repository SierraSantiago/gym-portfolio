# AGENTS.md

- This repository is a phase-based 3D portfolio built with React, TypeScript, Vite and React Three Fiber.
- Keep scene primitives and rendering helpers in `src/components/three`, scene composition in `src/scenes`, and HTML interface in `src/components/ui`.
- Centralize repeated scene dimensions, layout data, and visual tokens in `src/data` or `src/config` instead of scattering them across components.
- Prefer small components with a single responsibility, strict TypeScript, and no `any`.
- Do not add dependencies unless the existing stack cannot solve the task cleanly.
- Keep documentation aligned with the current phase and validate changes with lint and build before finishing.
- Keep early scene work lightweight until later phases explicitly require gameplay systems or external assets.
- Centralize runtime model routes in typed data manifests under `src/data` instead of scattering `/models/...` strings through components.
- When adjusting GLTF materials, clone the instance-local material first rather than mutating a shared material reference.
- Avoid visible roof or ceiling support structure in presentation phases unless a future phase explicitly reintroduces it.
- Keep floor overlays free of coplanar or intersecting geometry so circulation guides and zone accents do not produce rendering artifacts.
