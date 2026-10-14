import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });
  await page.goto("http://localhost:5173");

  // Wait for loading screen to detach completely
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForFunction(() => !!window.__character && !!window.__smoother, { timeout: 20000 });
  await page.waitForTimeout(2000);

  // Unpause smoother if needed, and scroll
  const scrollInfo = await page.evaluate(() => {
    const sm = window.__smoother;
    sm.paused(false);
    sm.scrollTo(1400, false);
    return {
      paused: sm.paused(),
      scrollTop: sm.scrollTop(),
      scrollY: window.scrollY
    };
  });
  console.log("Scroll info:", scrollInfo);

  // Wait 3 seconds for GSAP scrub to render
  await page.waitForTimeout(3000);

  const status = await page.evaluate(() => {
    const char = window.__character;
    const ns = char.userData.namasteState;
    return {
      charRotY: char.rotation.y,
      charRotX: char.rotation.x,
      camZ: window.__camera.position.z,
      camY: window.__camera.position.y,
      standingWeight: ns?.standingWeight,
      relax: ns?.relax,
      thighL: char.getObjectByName('thighL')?.quaternion
    };
  });
  console.log("Seated status at y=1400:", JSON.stringify(status, null, 2));

  await page.screenshot({ path: "scratch_verified_seated_y1400.png" });
  console.log("Saved scratch_verified_seated_y1400.png");

  // Now let's test scroll to photo card reveal (y = 1500..1600)
  await page.evaluate(() => {
    window.__smoother.scrollTo(1550, false);
  });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "scratch_verified_seated_with_photo.png" });
  console.log("Saved scratch_verified_seated_with_photo.png");

  await browser.close();
}

main().catch(console.error);
