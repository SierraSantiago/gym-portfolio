# Reception and dialogue system

The entrance now contains a low-poly reception desk and the NPC `Maya`.

## Interaction

- The prompt `Press E to talk` appears inside the reception interaction radius.
- Pressing `E` or clicking the receptionist opens the dialogue.
- `Escape` closes the conversation.
- The dialogue is in English and offers four options:
  - What is this place?
  - How do I explore?
  - Tell me about the projects
  - Start tour

The receptionist explains how the gym portfolio works without duplicating the
project descriptions stored at each machine.

## Connect the future player controller

The proximity system already exposes the integration point required by the
future character controller:

```ts
import { useReceptionStore } from '../state/useReceptionStore'

useReceptionStore.getState().setPlayerPosition([playerX, playerY, playerZ])
```

Call this whenever the player moves, or inside the character controller's frame
loop. Until the player is implemented, the store uses the planned entrance
spawn position so the interaction can be tested immediately.

## Animated receptionist asset

The reception NPC now uses the user-provided Mixamo FBX character and four clips:

- `character.fbx`: skinned character model and textures.
- `idle.fbx`: default loop.
- `talking.fbx`: loop while the dialogue panel is open.
- `waving.fbx`: one-shot greeting when the player enters interaction range.
- `agreeing.fbx`: one-shot response when the visitor starts the tour.

Runtime files are located in `public/models/characters/receptionist/` and are loaded by
`ReceptionistCharacter.tsx`. The component normalizes the imported character to a height
of approximately 1.72 metres, clones skinned meshes safely, enables shadows, and blends
between the available clips.

For production optimization, animations should ideally be downloaded from Mixamo with
`Skin: Without Skin`. The current supplied animation FBX files include their own character
mesh and textures, so they work but increase the initial download considerably.
