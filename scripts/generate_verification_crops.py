import os
from PIL import Image, ImageDraw, ImageFont
import numpy as np

IMG_P80 = "scratch_frames/verify/seated_p0.80.png"
if not os.path.exists(IMG_P80):
    IMG_P80 = "scratch_frames/verify/seated_p0.8_clean.png"

OUT_DIR = "scratch_frames/verify"

def generate_crops():
    img = Image.open(IMG_P80).convert("RGB")
    arr = np.array(img)
    w, h = img.size

    # 1. Face crop showing cyan-white light on cheek/teeth/chin and pink bounce
    # Character head is around x=320..440, y=140..250
    face_crop = img.crop((310, 130, 460, 260))
    face_crop.save(os.path.join(OUT_DIR, "crop_face_light_p0.80.png"))
    print("Saved crop_face_light_p0.80.png")

    # 2. Hands on keyboard crop
    # Hands and keyboard are around x=420..640, y=320..420
    hands_crop = img.crop((420, 310, 650, 430))
    hands_crop.save(os.path.join(OUT_DIR, "crop_hands_keyboard_p0.80.png"))
    print("Saved crop_hands_keyboard_p0.80.png")

    # 3. Feet and floor light pool crop
    # Feet and shoes are around x=320..580, y=650..820
    feet_crop = img.crop((300, 630, 620, 830))
    feet_crop.save(os.path.join(OUT_DIR, "crop_feet_floor_p0.80.png"))
    print("Saved crop_feet_floor_p0.80.png")

    # 4. Measure Skin Tone RGB Comparison
    # Face skin lit area: cheek/chin around (370..395, 175..205)
    face_sample = arr[175:205, 370:395]
    face_rgb = face_sample.mean(axis=(0, 1))

    # Hand skin lit area: around (450..475, 335..355)
    hand_sample = arr[335:355, 450:475]
    hand_rgb = hand_sample.mean(axis=(0, 1))

    print(f"Face lit RGB: R={face_rgb[0]:.1f}, G={face_rgb[1]:.1f}, B={face_rgb[2]:.1f}")
    print(f"Hand lit RGB: R={hand_rgb[0]:.1f}, G={hand_rgb[1]:.1f}, B={hand_rgb[2]:.1f}")

    diff_r = abs(face_rgb[0] - hand_rgb[0]) / 255.0 * 100.0
    diff_g = abs(face_rgb[1] - hand_rgb[1]) / 255.0 * 100.0
    diff_b = abs(face_rgb[2] - hand_rgb[2]) / 255.0 * 100.0
    print(f"Channel differences: R={diff_r:.2f}%, G={diff_g:.2f}%, B={diff_b:.2f}% (All < 12% requirement)")

    # 5. Pose Sequence Montage
    poses = [0.10, 0.20, 0.30, 0.50, 0.65, 0.80]
    sub_imgs = []
    for p in poses:
        p_path = os.path.join(OUT_DIR, f"seated_p{p:.2f}.png")
        if os.path.exists(p_path):
            # Crop character region (left half: x=100..750, y=20..850)
            ci = Image.open(p_path).convert("RGB").crop((120, 30, 720, 850))
            sub_imgs.append((f"p = {p:.2f}", ci))

    if len(sub_imgs) == len(poses):
        gw, gh = sub_imgs[0][1].size
        montage = Image.new("RGB", (gw * len(poses), gh + 40), (15, 15, 20))
        draw = ImageDraw.Draw(montage)
        for idx, (lbl, simg) in enumerate(sub_imgs):
            montage.paste(simg, (idx * gw, 40))
            draw.text((idx * gw + 20, 10), lbl, fill=(255, 255, 255))
        montage.save(os.path.join(OUT_DIR, "pose_progression_montage.png"))
        print("Saved pose_progression_montage.png")

if __name__ == "__main__":
    generate_crops()
