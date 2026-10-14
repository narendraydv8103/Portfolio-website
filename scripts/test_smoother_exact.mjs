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

  // Let's scroll using wheel events over 10 steps to reach the seated scene
  console.log("Starting wheel scroll...");
  for (let i = 0; i < 15; i++) {
    await page.mouse.wheel(0, 200);
    await page.waitForTimeout(100);
  }

  // Wait for smoother to settle
  await page.waitForTimeout(2500);

  const curState = await page.evaluate(() => {
    const sm = window.__smoother;
    const char = window.__character;
    const cam = window.__camera;
    const ns = char.userData.namasteState;
    return {
      scrollTop: sm.scrollTop(),
      scrollY: window.scrollY,
      camZ: cam.position.z,
      camY: cam.position.y,
      charRotY: char.rotation.y,
      standingWeight: ns?.standingWeight,
      relax: ns?.relax,
      monitorOpacity: char.getObjectByName("Plane010")?.material?.opacity,
      screenLightOpacity: char.getObjectByName("screenlight")?.material?.opacity,
    };
  });
  console.log("State after wheel scroll:", JSON.stringify(curState, null, 2));

  await page.screenshot({ path: "scratch_wheel_seated.png" });
  console.log("Saved scratch_wheel_seated.png");

  await browser.close();
}

main().catch(console.error);
