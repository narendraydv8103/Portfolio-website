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
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1904, height: 908 },
    deviceScaleFactor: 1,
  });

  const progressPoints = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.65, 0.8, 0.92, 1.0];

  // 1. Capture each progress point
  for (const p of progressPoints) {
    console.log(`Capturing progress point P = ${p}...`);
    const page = await context.newPage();
    await page.goto(`http://127.0.0.1:5173/?progress=${p}`);
    // Wait for canvas to be attached in DOM
    await page.waitForSelector(".character-container canvas", { state: "attached", timeout: 25000 });
    // Wait for preloader to fully exit and detach
    await page.waitForSelector(".loading-screen", { state: "detached", timeout: 25000 }).catch(() => {});
    // Wait ~3 s for WebGL animation/rendering frames to settle
    await page.waitForTimeout(3000);

    const outPath = path.join(OUT_DIR, `p_${p}.png`);
    await page.screenshot({ path: outPath });
    console.log(`Saved: ${outPath}`);
    await page.close();
  }

  // 2. Real scroll test with mouse wheel
  console.log("Running real mouse-wheel scroll test...");
  const scrollPage = await context.newPage();
  await scrollPage.goto("http://127.0.0.1:5173/");
  await scrollPage.waitForSelector(".character-container canvas", { state: "attached", timeout: 25000 });
  await scrollPage.waitForSelector(".loading-screen", { state: "detached", timeout: 25000 }).catch(() => {});
  await scrollPage.waitForTimeout(2000);

  // Mouse wheel down through hero & studio sections
  let step = 0;
  for (let i = 0; i < 14; i++) {
    await scrollPage.mouse.wheel(0, 350);
    await scrollPage.waitForTimeout(500);
    const scrollPath = path.join(OUT_DIR, `scroll_wheel_${step}.png`);
    await scrollPage.screenshot({ path: scrollPath });
    console.log(`Saved scroll wheel step ${step}`);
    step++;
  }

  // Scroll back up to verify clean reversal
  console.log("Scrolling back up to verify clean reversal...");
  for (let i = 0; i < 14; i++) {
    await scrollPage.mouse.wheel(0, -350);
    await scrollPage.waitForTimeout(300);
  }
  await scrollPage.waitForTimeout(1500);
  const scrollUpPath = path.join(OUT_DIR, "scroll_up_reversal.png");
  await scrollPage.screenshot({ path: scrollUpPath });
  console.log(`Saved scroll up reversal: ${scrollUpPath}`);

  await scrollPage.close();
  await browser.close();
  console.log("Verification capture complete!");
}

run().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
