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

  // Check state at scrollY = 0
  const state0 = await page.evaluate(() => {
    const char = window.__character;
    const ns = char.userData.namasteState;
    return {
      thighL: char.getObjectByName('thighL')?.quaternion,
      handL: char.getObjectByName('handL')?.quaternion,
      standingWeight: ns?.standingWeight,
      relax: ns?.relax
    };
  });
  console.log("At scrollY = 0:", JSON.stringify(state0, null, 2));

  // Scroll smoother to 1.5vh (1388px)
  await page.evaluate(() => {
    window.__smoother.scrollTo(1388, false);
  });
  await page.waitForTimeout(3000);

  const state15 = await page.evaluate(() => {
    const char = window.__character;
    const ns = char.userData.namasteState;
    return {
      thighL: char.getObjectByName('thighL')?.quaternion,
      handL: char.getObjectByName('handL')?.quaternion,
      standingWeight: ns?.standingWeight,
      relax: ns?.relax
    };
  });
  console.log("At scrollY = 1.5vh:", JSON.stringify(state15, null, 2));

  // Also check 2.5vh (seated typing phase)
  await page.evaluate(() => {
    window.__smoother.scrollTo(2313, false);
  });
  await page.waitForTimeout(3000);

  const state25 = await page.evaluate(() => {
    const char = window.__character;
    const ns = char.userData.namasteState;
    return {
      thighL: char.getObjectByName('thighL')?.quaternion,
      handL: char.getObjectByName('handL')?.quaternion,
      standingWeight: ns?.standingWeight,
      relax: ns?.relax
    };
  });
  console.log("At scrollY = 2.5vh:", JSON.stringify(state25, null, 2));

  await browser.close();
}

main().catch(console.error);
