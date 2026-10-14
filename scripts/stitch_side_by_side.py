import os
from PIL import Image, ImageDraw, ImageFont

out_dir = 'scratch_frames/side_by_side'
offsets = ["0.0vh", "0.3vh", "0.6vh", "1.0vh", "1.5vh", "2.0vh", "2.5vh", "3.0vh", "3.5vh"]

for step in offsets:
    ref_path = os.path.join(out_dir, f"ref_{step}.png")
    mine_path = os.path.join(out_dir, f"mine_{step}.png")
    if not (os.path.exists(ref_path) and os.path.exists(mine_path)):
        print(f"Skipping {step}, files not found.")
        continue

    img_ref = Image.open(ref_path).convert('RGB')
    img_mine = Image.open(mine_path).convert('RGB')

    # Half width for each image: 946 x 462 or full 1892 side-by-side
    w, h = img_ref.size
    # Let's downscale each to width 946, height 462 to make a nice 1892 x 462 comparison image
    thumb_w, thumb_h = w // 2, h // 2
    r_thumb = img_ref.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)
    m_thumb = img_mine.resize((thumb_w, thumb_h), Image.Resampling.LANCZOS)

    combined = Image.new('RGB', (thumb_w * 2, thumb_h + 40), (10, 14, 23))
    combined.paste(r_thumb, (0, 40))
    combined.paste(m_thumb, (thumb_w, 40))

    draw = ImageDraw.Draw(combined)
    draw.text((20, 10), f"REFERENCE ({step})", fill=(94, 234, 212))
    draw.text((thumb_w + 20, 10), f"MINE - CODE BY NEERAJ ({step})", fill=(94, 234, 212))

    save_path = os.path.join(out_dir, f"comparison_{step}.png")
    combined.save(save_path)
    print(f"Generated side-by-side: {save_path}")
