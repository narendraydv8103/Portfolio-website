import numpy as np
from PIL import Image

img = Image.open('scratch_test_timeline_long.png').convert('RGB')
w, h = img.size
arr = np.array(img)

# Head region is centered around x: 700..1200, y: 150..700
# Background color is (153, 157, 158)
bg = np.array([153, 157, 158], dtype=float)

# 1. Cap Top:
# The little button at the top of the cap
cap_mask = (arr[150:250, 900:1000, 0] < 50) & (arr[150:250, 900:1000, 1] < 50) & (arr[150:250, 900:1000, 2] < 50)
cap_ys, cap_xs = np.where(cap_mask)
cap_top_y = 150 + cap_ys.min()
print(f"Cap top Y: {cap_top_y} px ({cap_top_y / h * 100:.2f}%)")

# 2. Ear-to-ear:
# Ears are located around y: 400..500
# Left ear outer edge is around x: 680..750
# Right ear outer edge is around x: 1150..1220
# Let's inspect rows 420..480 in columns 650..800 (left ear) and 1100..1250 (right ear)
# Pixels in ears are reddish skin (r > 150, diff with bg > 30)
left_ear_mask = (arr[420:480, 680:780, 0] > 140) & (np.abs(arr[420:480, 680:780, 0].astype(float) - arr[420:480, 680:780, 1].astype(float)) > 20)
ley, lex = np.where(left_ear_mask)
left_ear_x = 680 + lex.min()

right_ear_mask = (arr[420:480, 1130:1230, 0] > 140) & (np.abs(arr[420:480, 1130:1230, 0].astype(float) - arr[420:480, 1130:1230, 1].astype(float)) > 20)
rey, rex = np.where(right_ear_mask)
right_ear_x = 1130 + rex.max()

ear_width = right_ear_x - left_ear_x
print(f"Left ear outer X: {left_ear_x} px, Right ear outer X: {right_ear_x} px")
print(f"Ear-to-ear width: {ear_width} px ({ear_width / w * 100:.2f}%)")

# 3. Chin:
# The face is pink/reddish skin. Below the mouth (which has pink lips and white teeth), the chin curves down.
# Below the chin is the black collar (r<50, g<50, b<50) at around y: 640..660!
# Let's inspect column x=946 for y from 580 to 670:
for y in range(580, 670):
    r, g, b = arr[y, 946]
    # Print the profile
    # print(f"y={y}: RGB=({r}, {g}, {b})")

# The chin bottom is right where the pink chin skin transitions into the dark collar
# Find the lowest y where pixel is chin skin (e.g. r > 160, g > 80, b > 90) before dark collar (r < 50)
chin_mask = (arr[580:660, 940:955, 0] > 150) & (arr[580:660, 940:955, 1] > 60) & (arr[580:660, 940:955, 2] > 70)
chy, chx = np.where(chin_mask)
chin_y = 580 + chy.max()
print(f"Chin Y: {chin_y} px ({chin_y / h * 100:.2f}%)")

print("\n--- TARGET COMPARISON ---")
print(f"Cap top:    Target 20.5% ± 2.0% (18.5% - 22.5%) -> Found: {cap_top_y / h * 100:.2f}% (PASS: {18.5 <= cap_top_y / h * 100 <= 22.5})")
print(f"Chin:       Target 69.0% ± 3.0% (66.0% - 72.0%) -> Found: {chin_y / h * 100:.2f}% (PASS: {66.0 <= chin_y / h * 100 <= 72.0})")
print(f"Ear-to-ear: Target 24.6% ± 2.0% (22.6% - 26.6%) -> Found: {ear_width / w * 100:.2f}% (PASS: {22.6 <= ear_width / w * 100 <= 26.6})")
