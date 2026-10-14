import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/verify_seated");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });
  await page.goto("http://localhost:5173");

  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForFunction(() => !!window.__character && !!window.__smoother, { timeout: 20000 });
  await page.waitForTimeout(2000);

  // Scroll smoother directly to target seated position (1750px)
  await page.evaluate(() => {
    window.__smoother.scrollTo(1750, false);
  });
  await page.waitForTimeout(3000);

  const state = await page.evaluate(() => {
    const char = window.__character;
    const cam = window.__camera;
    const scene = window.__scene;
    const pl = scene.children.find(c => c.isPointLight);
    const sl = char.getObjectByName("screenlight");
    return {
      scrollTop: window.__smoother.scrollTop(),
      camZ: cam.position.z,
      camY: cam.position.y,
      charRotY: char.rotation.y,
      screenlightOpacity: sl?.material?.opacity,
      pointLightIntensity: pl?.intensity,
      wristL: char.getObjectByName("handL")?.position,
      wristR: char.getObjectByName("handR")?.position,
    };
  });
  console.log("Seated state at 1750px:", JSON.stringify(state, null, 2));

  // Full screenshot
  const fullPath = path.join(outDir, "seated_full_1750.png");
  await page.screenshot({ path: fullPath });
  console.log("Saved", fullPath);

  await browser.close();
}

main().catch(console.error);
