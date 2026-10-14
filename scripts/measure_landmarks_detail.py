import numpy as np
from PIL import Image

ref = Image.open('scratch_frames/verify/reference_seated.png').convert('RGB')
test = Image.open('scratch_frames/verify/seated_p0.8_clean.png').convert('RGB')

ref_arr = np.array(ref)
test_arr = np.array(test)

print("Size ref:", ref.size, "Size test:", test.size)

# Head size H in ref: cap top (y=40) to chin
# Let's find chin in ref: bottom-most point of face skin/contour around x=320..420, y=150..220
# Face skin is R>60 or G>50 in ref
ref_face_y, ref_face_x = np.where((ref_arr[150:230, 320:420, 0] > 40) | (ref_arr[150:230, 320:420, 1] > 40))
ref_chin_y = 150 + ref_face_y.max()
ref_chin_x = 320 + ref_face_x[ref_face_y == ref_face_y.max()].mean()
ref_H = ref_chin_y - 40
print(f"Ref Cap top: (367.5, 40), Chin: ({ref_chin_x:.1f}, {ref_chin_y}), Head size H = {ref_H} px")

# Chin in test
test_face_y, test_face_x = np.where((test_arr[150:230, 320:420, 0] > 40) | (test_arr[150:230, 320:420, 1] > 40))
test_chin_y = 150 + test_face_y.max()
test_chin_x = 320 + test_face_x[test_face_y == test_face_y.max()].mean()
test_H = test_chin_y - 40
print(f"Test Cap top: (367.5, 40), Chin: ({test_chin_x:.1f}, {test_chin_y}), Head size H = {test_H} px")

# Monitor in ref vs test (pink screen)
# R > 170, G < 165, B > 130
def get_monitor_box(arr):
    my, mx = np.where((arr[:500, :1100, 0] > 170) & (arr[:500, :1100, 1] < 165) & (arr[:500, :1100, 2] > 130))
    return {
        'top_left': (mx.min(), my.min()),
        'top_right': (mx.max(), my.min()),
        'bottom_left': (mx.min(), my.max()),
        'bottom_right': (mx.max(), my.max()),
        'center': ((mx.min() + mx.max()) / 2, (my.min() + my.max()) / 2),
        'width': mx.max() - mx.min(),
        'height': my.max() - my.min()
    }

ref_mon = get_monitor_box(ref_arr)
test_mon = get_monitor_box(test_arr)

print("Ref Monitor:", ref_mon)
print("Test Monitor:", test_mon)

# Floor light pool (diff with dark bg in y=620..820, x=50..900)
bg = ref_arr[50, 50]
def get_floor_pool(arr):
    diff = np.abs(arr[620:820, 50:900].astype(float) - bg.astype(float)).sum(axis=2)
    py, px = np.where(diff > 18)
    return {
        'x_span': (50 + px.min(), 50 + px.max()),
        'y_span': (620 + py.min(), 620 + py.max()),
        'center': (50 + (px.min() + px.max()) / 2, 620 + (py.min() + py.max()) / 2)
    }

print("Ref Floor pool:", get_floor_pool(ref_arr))
print("Test Floor pool:", get_floor_pool(test_arr))
