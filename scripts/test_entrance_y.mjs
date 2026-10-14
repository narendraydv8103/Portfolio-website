import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/entrance_tuning");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);

  const testY = async (label, yVal) => {
    await page.evaluate((y) => {
      const char = window.__character;
      char.position.y = y;
      char.updateMatrixWorld(true);
    }, yVal);

    await page.waitForTimeout(100);
    const p = path.join(outDir, `${label}.png`);
    await page.screenshot({ path: p });
    console.log(`Saved ${label}.png at y = ${yVal}`);
  };

  await testY("y_minus_1_5", -1.5);
  await testY("y_minus_2_0", -2.0);
  await testY("y_minus_2_5", -2.5);
  await testY("y_minus_3_0", -3.0);
  await testY("y_minus_3_5", -3.5);

  await browser.close();
}

run().catch(console.error);
