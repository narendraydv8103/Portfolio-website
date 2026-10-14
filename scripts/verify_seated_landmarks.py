import os
from PIL import Image, ImageDraw, ImageFont
import numpy as np

REF_PATH = 'scratch_frames/verify/reference_seated.png'
TEST_PATH = 'scratch_frames/verify/seated_p0.8_clean.png'
OUT_DIFF_PATH = 'scratch_frames/verify/seated_landmark_comparison.png'

# Measured landmarks on reference (1892 x 888, H = 145 px: cap top y=50, chin y=195)
# H = 145 px. Tolerance: 8% of H = 11.6 px.
LANDMARKS_REF = {
    'cap_top': (725, 50),
    'chin': (745, 195),
    'eyes': (750, 140),
    'monitor_tl': (848, 140),
    'monitor_tr': (1024, 140),
    'monitor_bl': (848, 322),
    'monitor_br': (1024, 315),
    'phone_top': (940, 275),
    'keyboard_center': (840, 355),
    'left_fingertips': (815, 345),
    'right_fingertips': (910, 332),
    'desk_corner_left': (630, 385),
    'desk_edge_right': (1150, 362),
    'chair_back': (620, 420),
    'shoes_front': (920, 715),
    'floor_light_center': (780, 710),
}

def analyze():
    if not os.path.exists(REF_PATH):
        print(f"Error: {REF_PATH} not found")
        return
    if not os.path.exists(TEST_PATH):
        print(f"Waiting for {TEST_PATH}...")
        return

    ref_img = Image.open(REF_PATH).convert('RGB')
    test_img = Image.open(TEST_PATH).convert('RGB')

    print(f"Ref size: {ref_img.size}, Test size: {test_img.size}")

    # Skin tone analysis: sample cheek and hands in test_img
    # In test_img, character face is around (720-760, 140-190), hands are around (800-920, 320-360)
    test_np = np.array(test_img)
    
    # Measure face lit skin RGB (around chin/cheek)
    face_sample = test_np[160:180, 730:750]
    face_rgb = face_sample.mean(axis=(0,1))
    
    # Measure left hand RGB
    hand_l_sample = test_np[335:350, 805:825]
    hand_l_rgb = hand_l_sample.mean(axis=(0,1))

    # Measure right hand RGB
    hand_r_sample = test_np[325:340, 895:915]
    hand_r_rgb = hand_r_sample.mean(axis=(0,1))

    print(f"Face RGB: R={face_rgb[0]:.1f}, G={face_rgb[1]:.1f}, B={face_rgb[2]:.1f}")
    print(f"Left Hand RGB: R={hand_l_rgb[0]:.1f}, G={hand_l_rgb[1]:.1f}, B={hand_l_rgb[2]:.1f}")
    print(f"Right Hand RGB: R={hand_r_rgb[0]:.1f}, G={hand_r_rgb[1]:.1f}, B={hand_r_rgb[2]:.1f}")

    # Create side-by-side comparison
    w, h = ref_img.size
    combo = Image.new('RGB', (w * 2, h))
    combo.paste(ref_img, (0, 0))
    combo.paste(test_img, (w, 0))

    draw = ImageDraw.Draw(combo)
    
    # Draw landmarks on ref side
    for name, (lx, ly) in LANDMARKS_REF.items():
        draw.ellipse([lx - 4, ly - 4, lx + 4, ly + 4], outline=(255, 255, 0), width=2)
        # Also mark on test side
        draw.ellipse([w + lx - 4, ly - 4, w + lx + 4, ly + 4], outline=(0, 255, 255), width=2)

    # Save comparison image
    combo.save(OUT_DIFF_PATH)
    print(f"Saved comparison to {OUT_DIFF_PATH}")

if __name__ == '__main__':
    analyze()
