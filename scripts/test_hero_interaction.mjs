import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const outDir = path.resolve("scratch_frames/interaction_test");
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

  // 1. Move mouse around and capture screenshots
  console.log("Testing mouse move left...");
  await page.mouse.move(100, 450);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "mouse_left.png") });

  console.log("Testing mouse move right...");
  await page.mouse.move(1340, 450);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "mouse_right.png") });

  console.log("Testing mouse move top...");
  await page.mouse.move(720, 100);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "mouse_top.png") });

  console.log("Testing mouse move bottom...");
  await page.mouse.move(720, 800);
  await page.waitForTimeout(400);
  await page.screenshot({ path: path.join(outDir, "mouse_bottom.png") });

  await browser.close();
  console.log("Mouse test complete!");
}

run().catch(console.error);
