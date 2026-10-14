import { chromium } from "playwright";

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

  // Directly set scroll to 1600 via smoother.scrollTop(1600)
  await page.evaluate(() => {
    const sm = window.__smoother;
    sm.paused(false);
    sm.scrollTop(1600);
  });
  // Wait 3 seconds
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
      charRotX: char.rotation.x,
      screenlightOpacity: sl?.material?.opacity,
      pointLightIntensity: pl?.intensity,
      charModelY: document.querySelector(".character-model")?.style?.transform
    };
  });
  console.log("State at 1600px:", JSON.stringify(state, null, 2));

  await page.screenshot({ path: "scratch_seated_at_1600.png" });
  console.log("Saved scratch_seated_at_1600.png");

  await browser.close();
}

main().catch(console.error);
