"""Prepare the runtime gym GLB as an editable Blender scene.

Run from the repository root:

    blender --background --python tools/blender/build_gym_environment.py

The script imports ``public/models/gym/gym-environment.glb``, organizes the
objects into semantic collections, adds non-rendered gameplay markers and
colliders, creates a preview camera/light rig, and saves an editable .blend.

The visual GLB is intentionally committed to the repository so the web project
works without requiring Blender during development or deployment.
"""

from __future__ import annotations

import math
from pathlib import Path
import sys

import bpy
from mathutils import Vector


SCRIPT_PATH = Path(bpy.path.abspath(__file__)).resolve()
REPO_ROOT = SCRIPT_PATH.parents[2]
SOURCE_GLB = REPO_ROOT / "public" / "models" / "gym" / "gym-environment.glb"
OUTPUT_DIR = SCRIPT_PATH.parent / "output"
OUTPUT_BLEND = OUTPUT_DIR / "gym-environment.blend"
RUNTIME_GLB = REPO_ROOT / "public" / "models" / "gym" / "gym-environment.glb"

COLLECTION_PREFIXES = {
    "ARCH_": "01_ARCHITECTURE",
    "ZONE_": "02_FLOOR_ZONES",
    "FLOOR_": "02_FLOOR_ZONES",
    "MIRROR_": "03_MIRRORS",
    "LIGHT_": "04_LIGHT_FIXTURES",
    "LED_": "04_LIGHT_FIXTURES",
    "DECOR_": "05_DECORATION",
    "MARKER_": "90_MARKERS_IMPORTED",
}


def clear_scene() -> None:
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete(use_global=False)

    for collection in list(bpy.data.collections):
        if collection.name != "Collection":
            bpy.data.collections.remove(collection)


def ensure_collection(name: str) -> bpy.types.Collection:
    collection = bpy.data.collections.get(name)
    if collection is None:
        collection = bpy.data.collections.new(name)
        bpy.context.scene.collection.children.link(collection)
    return collection


def move_to_collection(obj: bpy.types.Object, target: bpy.types.Collection) -> None:
    for collection in list(obj.users_collection):
        collection.objects.unlink(obj)
    target.objects.link(obj)


def collection_for_object(name: str) -> str:
    for prefix, collection_name in COLLECTION_PREFIXES.items():
        if name.startswith(prefix):
            return collection_name
    return "06_MISC"


def three_to_blender(position: tuple[float, float, float]) -> tuple[float, float, float]:
    """Convert Three.js/glTF coordinates to Blender's native Z-up coordinates."""
    x, y, z = position
    return (x, -z, y)


def add_empty(name: str, position: tuple[float, float, float], collection: bpy.types.Collection,
              display_type: str = "PLAIN_AXES", display_size: float = 0.45) -> bpy.types.Object:
    obj = bpy.data.objects.new(name, None)
    obj.empty_display_type = display_type
    obj.empty_display_size = display_size
    obj.location = three_to_blender(position)
    obj["semantic_marker"] = True
    collection.objects.link(obj)
    return obj


def add_collider(name: str, center: tuple[float, float, float], size: tuple[float, float, float],
                 collection: bpy.types.Collection) -> bpy.types.Object:
    bpy.ops.mesh.primitive_cube_add(location=three_to_blender(center))
    obj = bpy.context.active_object
    assert obj is not None
    obj.name = name

    sx, sy, sz = size
    obj.dimensions = (sx, sz, sy)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    obj.display_type = "WIRE"
    obj.color = (1.0, 0.22, 0.05, 1.0)
    obj.hide_render = True
    obj["collider"] = True
    obj["collider_shape"] = "box"
    move_to_collection(obj, collection)
    return obj


def organize_imported_objects() -> None:
    collections = {
        name: ensure_collection(name)
        for name in set(COLLECTION_PREFIXES.values()) | {"06_MISC"}
    }

    imported = list(bpy.context.selected_objects)
    for obj in imported:
        target_name = collection_for_object(obj.name)
        move_to_collection(obj, collections[target_name])

        if obj.type == "MESH":
            for polygon in obj.data.polygons:
                polygon.use_smooth = False

            obj["runtime_asset"] = True


def add_gameplay_helpers() -> None:
    marker_collection = ensure_collection("90_GAMEPLAY_MARKERS")
    collider_collection = ensure_collection("91_COLLIDERS")

    add_empty("SPAWN_Player", (0.0, 0.0, 5.2), marker_collection, "ARROWS", 0.6)
    add_empty("TARGET_Camera", (0.2, 1.6, -1.55), marker_collection, "SPHERE", 0.35)
    add_empty("ANCHOR_Project_CareerPulse", (-6.75, 0.0, 0.35), marker_collection)
    add_empty("ANCHOR_Project_RiskAnalysis", (0.55, 0.0, -4.82), marker_collection)
    add_empty("ANCHOR_Project_Automation", (6.05, 0.0, -3.3), marker_collection)

    add_empty("ZONE_Cardio", (-6.55, 0.0, 0.85), marker_collection, "CUBE", 0.75)
    add_empty("ZONE_Strength", (0.25, 0.0, -4.15), marker_collection, "CUBE", 0.75)
    add_empty("ZONE_Functional", (6.72, 0.0, 1.2), marker_collection, "CUBE", 0.75)

    add_collider("COLLIDER_Floor", (0.0, -0.16, 0.0), (20.0, 0.24, 14.0), collider_collection)
    add_collider("COLLIDER_BackWall", (0.0, 2.6, -7.0), (20.0, 5.2, 0.32), collider_collection)
    add_collider("COLLIDER_LeftWall", (-10.0, 2.6, 0.0), (0.32, 5.2, 14.0), collider_collection)
    add_collider("COLLIDER_RightWall", (10.0, 2.6, 0.0), (0.32, 5.2, 14.0), collider_collection)
    add_collider("COLLIDER_Lockers", (-9.48, 1.03, 4.63), (0.62, 2.1, 3.55), collider_collection)
    add_collider("COLLIDER_FunctionalRack", (9.35, 0.78, 1.45), (0.62, 1.58, 2.0), collider_collection)
    add_collider("COLLIDER_EntryBench", (8.75, 0.38, 4.75), (2.55, 0.75, 0.6), collider_collection)


def add_preview_camera_and_lights() -> None:
    preview_collection = ensure_collection("99_BLENDER_PREVIEW")

    camera_data = bpy.data.cameras.new("PreviewCamera")
    camera = bpy.data.objects.new("PreviewCamera", camera_data)
    preview_collection.objects.link(camera)
    camera.location = three_to_blender((12.8, 5.4, 15.9))
    camera_data.lens = 47.0
    camera_data.sensor_width = 36.0

    target = Vector(three_to_blender((0.2, 1.6, -1.55)))
    direction = target - camera.location
    camera.rotation_euler = direction.to_track_quat("-Z", "Y").to_euler()
    bpy.context.scene.camera = camera

    sun_data = bpy.data.lights.new("PreviewSun", type="SUN")
    sun_data.energy = 2.0
    sun_data.angle = math.radians(18)
    sun = bpy.data.objects.new("PreviewSun", sun_data)
    preview_collection.objects.link(sun)
    sun.rotation_euler = (math.radians(28), math.radians(-18), math.radians(-34))

    area_data = bpy.data.lights.new("PreviewArea", type="AREA")
    area_data.energy = 950
    area_data.shape = "RECTANGLE"
    area_data.size = 8.0
    area = bpy.data.objects.new("PreviewArea", area_data)
    preview_collection.objects.link(area)
    area.location = three_to_blender((0.0, 5.0, 1.5))
    area.rotation_euler = (0.0, 0.0, 0.0)



def configure_scene() -> None:
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0
    scene.render.engine = "BLENDER_EEVEE_NEXT"
    scene.render.resolution_x = 1600
    scene.render.resolution_y = 900
    scene.render.resolution_percentage = 100

    scene.world.color = (0.008, 0.012, 0.018)

    scene["runtime_glb"] = str(RUNTIME_GLB.relative_to(REPO_ROOT))
    scene["coordinate_system"] = "Three.js Y-up; Blender Z-up"
    scene["project"] = "Santiago Sierra 3D Gym Portfolio"


def main() -> None:
    if not SOURCE_GLB.exists():
        raise FileNotFoundError(f"Runtime environment not found: {SOURCE_GLB}")

    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    clear_scene()
    configure_scene()

    bpy.ops.import_scene.gltf(filepath=str(SOURCE_GLB))
    organize_imported_objects()
    add_gameplay_helpers()
    add_preview_camera_and_lights()

    bpy.ops.wm.save_as_mainfile(filepath=str(OUTPUT_BLEND))
    print(f"Saved editable Blender scene: {OUTPUT_BLEND}")


if __name__ == "__main__":
    main()
