import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });
  await page.goto("http://localhost:5173");

  await page.waitForFunction(() => !!window.__character && !!window.__smoother, { timeout: 20000 });
  await page.waitForTimeout(3000);

  // In page context, disable namasteState
  await page.evaluate(() => {
    // If namasteState standingWeight is 0 and relax is 0, what does it look like?
    // Let's test if standingWeight is 0:
    if (window.__character?.userData?.namasteState) {
      window.__character.userData.namasteState.standingWeight = 0;
      window.__character.userData.namasteState.relax = 0;
    }
  });

  await page.waitForTimeout(500);
  await page.screenshot({ path: "scratch_hero_no_namaste.png" });
  console.log("Captured scratch_hero_no_namaste.png");

  // Now test scroll to 500
  await page.evaluate(() => {
    window.__smoother.scrollTop(500);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "scratch_scroll_500.png" });
  console.log("Captured scratch_scroll_500.png");

  // Now test scroll to 1600 (studio lead)
  await page.evaluate(() => {
    window.__smoother.scrollTop(1600);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "scratch_scroll_1600.png" });
  console.log("Captured scratch_scroll_1600.png");

  // Now test scroll to 2200 (seated desk typing)
  await page.evaluate(() => {
    window.__smoother.scrollTop(2200);
  });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "scratch_scroll_2200.png" });
  console.log("Captured scratch_scroll_2200.png");

  await browser.close();
}

main().catch(console.error);
