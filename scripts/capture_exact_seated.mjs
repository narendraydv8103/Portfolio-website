import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT_DIR = "scratch_frames/verify_final";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });

  console.log("Navigating to http://localhost:5173...");
  await page.goto("http://localhost:5173");
  await page.waitForFunction(() => !!window.__character && !!window.__smoother, { timeout: 30000 });
  await page.waitForTimeout(5000);

  // Function to smoothly or precisely scroll to exact y
  async function scrollToExact(y) {
    console.log(`Scrolling to exact y = ${y}...`);
    await page.evaluate((targetY) => {
      window.__smoother.scrollTo(targetY, false);
    }, y);
    // Poll until smoother scrollTop is close to y
    await page.waitForFunction(
      (targetY) => Math.abs(window.__smoother.scrollTop() - targetY) < 10,
      y,
      { timeout: 10000 }
    );
    // Wait for Three.js render loop to draw frames
    await page.waitForTimeout(2000);
  }

  // 1. Capture at y = 1400 (mid tl2: monitor rising, camera moving back)
  await scrollToExact(1400);
  await page.screenshot({ path: path.join(OUT_DIR, "seated_exact_1400.png") });
  console.log("Saved seated_exact_1400.png");

  // 2. Capture at y = 1750 (settled studio scene: camera z=75, monitor up, photo card revealed)
  await scrollToExact(1750);
  await page.screenshot({ path: path.join(OUT_DIR, "seated_exact_1750.png") });
  console.log("Saved seated_exact_1750.png");

  const state1750 = await page.evaluate(() => {
    const char = window.__character;
    const cam = window.__camera;
    const handL = char.getObjectByName("handL");
    const forearmL = char.getObjectByName("forearmL");
    const thighL = char.getObjectByName("thighL");
    return {
      camZ: cam?.position.z,
      camY: cam?.position.y,
      charRotY: char?.rotation.y,
      standingWeight: char?.userData?.namasteState?.standingWeight,
      handL_rot: handL?.rotation,
      forearmL_rot: forearmL?.rotation,
      thighL_rot: thighL?.rotation,
    };
  });
  console.log("State at 1750:", JSON.stringify(state1750, null, 2));

  await browser.close();
}

main().catch(console.error);
