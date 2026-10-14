import os
from PIL import Image
import numpy as np

IMG_PATH = "scratch_frames/verify_final/seated_exact_1750.png"
OUT_DIR = "scratch_frames/verify_final"

def main():
    if not os.path.exists(IMG_PATH):
        print(f"Error: {IMG_PATH} not found.")
        return

    img = Image.open(IMG_PATH).convert("RGB")
    arr = np.array(img)
    w, h = img.size
    print(f"Loaded {IMG_PATH} ({w}x{h})")

    # 1. Close-up: Hands on keyboard
    # In camera fov 14.5, (0, 8.4, 75), character is centered in left-middle area
    # Let's crop hands/keyboard area: x around 600..950, y around 400..600
    # Let's inspect character bounds or take a focused crop
    hands_crop = img.crop((600, 400, 1000, 650))
    hands_crop.save(os.path.join(OUT_DIR, "crop_hands_keyboard.png"))
    print("Saved crop_hands_keyboard.png")

    # 2. Close-up: Face with cyan screen light
    face_crop = img.crop((550, 150, 850, 450))
    face_crop.save(os.path.join(OUT_DIR, "crop_face_screenlight.png"))
    print("Saved crop_face_screenlight.png")

    # 3. Close-up: Feet on floor
    feet_crop = img.crop((600, 700, 950, 920))
    feet_crop.save(os.path.join(OUT_DIR, "crop_feet_floor.png"))
    print("Saved crop_feet_floor.png")

    # 4. Measure Face vs Hand skin color
    # Face cheek sample around (680, 280)
    face_sample = arr[250:290, 660:700]
    face_rgb = face_sample.mean(axis=(0, 1))

    # Hand skin sample around (750, 460)
    hand_sample = arr[450:480, 740:770]
    hand_rgb = hand_sample.mean(axis=(0, 1))

    print(f"Face Sample Mean RGB: R={face_rgb[0]:.1f}, G={face_rgb[1]:.1f}, B={face_rgb[2]:.1f}")
    print(f"Hand Sample Mean RGB: R={hand_rgb[0]:.1f}, G={hand_rgb[1]:.1f}, B={hand_rgb[2]:.1f}")

if __name__ == "__main__":
    main()
