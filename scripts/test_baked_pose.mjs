import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });
  await page.goto("http://localhost:5173");

  await page.waitForFunction(() => !!window.__character && !!window.__smoother, { timeout: 20000 });
  await page.waitForTimeout(4000);

  // Set standingWeight to 0 explicitly
  await page.evaluate(() => {
    window.__character.userData.namasteState.standingWeight = 0;
    window.__character.userData.namasteState.relax = 1;
  });

  // Capture screenshot with standingWeight = 0 (pure baked clips)
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "scratch_pure_baked_hero.png" });
  console.log("Saved scratch_pure_baked_hero.png");

  // Now scroll to seated scene: scroll to center of studio-lead (tl2 seated scene)
  // Let's scroll to studio-lead
  await page.evaluate(() => {
    // Scroll directly to y = 1400 using window.__smoother
    window.__smoother.scrollTop(1400);
  });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: "scratch_seated_studio.png" });
  console.log("Saved scratch_seated_studio.png");

  await browser.close();
}

main().catch(console.error);
