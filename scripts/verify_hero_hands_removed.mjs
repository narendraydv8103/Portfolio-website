import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });
  await page.goto("http://localhost:5173");

  // Wait for loading screen to finish and character to load
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 20000 }).catch(() => {});
  await page.waitForFunction(() => !!window.__character && !!window.__smoother, { timeout: 20000 });
  await page.waitForTimeout(3000);

  // Capture initial hero
  await page.screenshot({ path: "final_hero_scrollY_0.png" });
  console.log("Captured final_hero_scrollY_0.png");

  // Capture during initial scroll (y = 200)
  await page.evaluate(() => {
    window.__smoother.scrollTop(200);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "final_hero_scrollY_200.png" });
  console.log("Captured final_hero_scrollY_200.png");

  // Capture at studio lead (y = 1600)
  await page.evaluate(() => {
    window.__smoother.scrollTop(1600);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "final_studio_scrollY_1600.png" });
  console.log("Captured final_studio_scrollY_1600.png");

  // Capture at desk seated typing (y = 2200)
  await page.evaluate(() => {
    window.__smoother.scrollTop(2200);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "final_studio_scrollY_2200.png" });
  console.log("Captured final_studio_scrollY_2200.png");

  await browser.close();
}

main().catch(console.error);
