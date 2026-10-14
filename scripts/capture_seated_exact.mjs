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

  // Wheel scroll in small increments to reach the seated scene in studio-lead
  console.log("Scrolling 11 wheel steps to seated studio scene...");
  for (let i = 0; i < 11; i++) {
    await page.mouse.wheel(0, 150);
    await page.waitForTimeout(100);
  }

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
  console.log("State in seated scene:", JSON.stringify(curState, null, 2));

  await page.screenshot({ path: "scratch_seated_exact.png" });
  console.log("Saved scratch_seated_exact.png");

  // Also take close-up crops of hands/keyboard, face, feet/floor per Section 8 item C
  await browser.close();
}

main().catch(console.error);
