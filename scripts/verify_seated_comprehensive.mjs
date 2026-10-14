import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT_DIR = path.resolve("scratch_frames/verify");
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log("Launching Chromium with SwiftShader...");
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1892, height: 888 },
    deviceScaleFactor: 1,
  });

  const progressPoints = [0.10, 0.15, 0.20, 0.25, 0.30, 0.36, 0.42, 0.50, 0.58, 0.65, 0.72, 0.80, 0.88];

  for (const p of progressPoints) {
    console.log(`Capturing progress point P = ${p.toFixed(2)}...`);
    const page = await context.newPage();
    await page.goto(`http://localhost:5173/?progress=${p}`);
    await page.waitForSelector(".character-container canvas", { state: "attached", timeout: 30000 });
    await page.waitForSelector(".loading-screen", { state: "detached", timeout: 30000 }).catch(() => {});
    await page.waitForTimeout(3500);

    const outPath = path.join(OUT_DIR, `seated_p${p.toFixed(2)}.png`);
    await page.screenshot({ path: outPath });
    console.log(`Saved: ${outPath}`);
    await page.close();
  }

  // Real mouse wheel scroll test
  console.log("Running mouse wheel scroll test...");
  const scrollPage = await context.newPage();
  await scrollPage.goto("http://localhost:5173/");
  await scrollPage.waitForSelector(".character-container canvas", { state: "attached", timeout: 30000 });
  await scrollPage.waitForSelector(".loading-screen", { state: "detached", timeout: 30000 }).catch(() => {});
  await scrollPage.waitForTimeout(2500);

  for (let i = 0; i <= 12; i++) {
    await scrollPage.mouse.wheel(0, 400);
    await scrollPage.waitForTimeout(400);
    const scrollPath = path.join(OUT_DIR, `seated_scroll_${i}.png`);
    await scrollPage.screenshot({ path: scrollPath });
    console.log(`Saved scroll step ${i}`);
  }

  await scrollPage.close();
  await browser.close();
  console.log("Comprehensive verification capture complete!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
