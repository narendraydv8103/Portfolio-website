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

  // 8 wheel events
  console.log("Scrolling 8 wheel steps...");
  for (let i = 0; i < 8; i++) {
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(100);
  }

  await page.waitForTimeout(2500);

  const curState = await page.evaluate(() => {
    const sm = window.__smoother;
    const char = window.__character;
    const cam = window.__camera;
    return {
      scrollTop: sm.scrollTop(),
      scrollY: window.scrollY,
      camZ: cam.position.z,
      camY: cam.position.y,
      charRotY: char.rotation.y,
      monitorOpacity: char.getObjectByName("Plane010")?.material?.opacity,
      screenLightOpacity: char.getObjectByName("screenlight")?.material?.opacity,
    };
  });
  console.log("State at 8 steps:", JSON.stringify(curState, null, 2));

  await page.screenshot({ path: "scratch_seated_8steps.png" });
  console.log("Saved scratch_seated_8steps.png");

  // Also do 10 wheel steps (around 1500px, full seated shot with photo card)
  for (let i = 0; i < 2; i++) {
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(100);
  }
  await page.waitForTimeout(2500);
  const state10 = await page.evaluate(() => {
    const sm = window.__smoother;
    const cam = window.__camera;
    return {
      scrollTop: sm.scrollTop(),
      scrollY: window.scrollY,
      camZ: cam.position.z,
      camY: cam.position.y
    };
  });
  console.log("State at 10 steps:", JSON.stringify(state10, null, 2));
  await page.screenshot({ path: "scratch_seated_10steps.png" });
  console.log("Saved scratch_seated_10steps.png");

  await browser.close();
}

main().catch(console.error);
