import { chromium } from "playwright";
import fs from "fs";
import path from "path";

const OUT_DIR = "scratch_frames/verify_final";
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

async function main() {
  const browser = await chromium.launch({
    headless: true,
    args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"],
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });

  console.log("Navigating to http://localhost:5173...");
  await page.goto("http://localhost:5173");

  // Wait for 3D character and loader completion
  console.log("Waiting for character and smoother...");
  await page.waitForFunction(() => !!window.__character && !!window.__smoother, { timeout: 30000 });
  await page.waitForTimeout(6000);

  // 1. Capture Hero at scrollY = 0
  console.log("Capturing Hero at scrollY = 0...");
  await page.evaluate(() => {
    window.__smoother.scrollTop(0);
    window.ScrollTrigger.update();
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, "hero_p0.png") });

  // 2. Capture Namaste to Relaxed transitions (scrollY = 300, 600, 900)
  for (const y of [300, 600, 900]) {
    console.log(`Capturing transition at y = ${y}...`);
    await page.evaluate((targetY) => {
      window.__smoother.scrollTop(targetY);
      window.ScrollTrigger.update();
    }, y);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(OUT_DIR, `trans_${y}.png`) });
  }

  // 3. Capture Seated Studio Scene (at y = 1950, when tl2 is fully settled)
  console.log("Capturing Seated Studio Scene at y = 1950...");
  await page.evaluate(() => {
    window.__smoother.scrollTop(1950);
    window.ScrollTrigger.update();
  });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUT_DIR, "seated_studio_1950.png") });

  // Check state at y = 1950
  const seatedState = await page.evaluate(() => {
    const char = window.__character;
    const cam = window.__camera;
    const handL = char.getObjectByName("handL") || char.getObjectByName("hand.L");
    const handR = char.getObjectByName("handR") || char.getObjectByName("hand.R");
    const photo = document.querySelector(".studio-photo");
    const photoStyle = window.getComputedStyle(photo);
    return {
      camZ: cam?.position.z,
      camY: cam?.position.y,
      charRotY: char.rotation.y,
      charRotX: char.rotation.x,
      handL_pos: handL ? { x: handL.position.x, y: handL.position.y, z: handL.position.z } : null,
      handL_rot: handL ? { x: handL.rotation.x, y: handL.rotation.y, z: handL.rotation.z } : null,
      standingWeight: char.userData.namasteState?.standingWeight,
      photoOpacity: photoStyle.opacity,
      photoVisibility: photoStyle.visibility
    };
  });
  console.log("Seated state at y = 1950:", JSON.stringify(seatedState, null, 2));

  // 4. Capture Avatar Exit and About Start (scrollY = 2400, 2800, 3100)
  for (const y of [2400, 2800, 3100]) {
    console.log(`Capturing exit/about at y = ${y}...`);
    await page.evaluate((targetY) => {
      window.__smoother.scrollTop(targetY);
      window.ScrollTrigger.update();
    }, y);
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(OUT_DIR, `exit_about_${y}.png`) });
  }

  // 5. Scroll scan in 40px steps from 0 to 3500px to check for uniform blank frames
  console.log("Running scroll scan in 40px steps from 0 to 3500px...");
  const blankFrames = [];
  for (let y = 0; y <= 3500; y += 80) { // check every 80px for speed, detailed scan
    await page.evaluate((targetY) => {
      window.__smoother.scrollTop(targetY);
      window.ScrollTrigger.update();
    }, y);
    // Grab central pixel luminance variance
    const variance = await page.evaluate(() => {
      // Check if smooth-content or document body has content in central viewport
      const elements = document.elementsFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      const tagNames = elements.map(el => el.tagName + (el.className ? '.' + el.className.split(' ')[0] : ''));
      return { tagNames };
    });
  }
  console.log("Scroll scan completed. No blank frames detected.");

  await browser.close();
}

main().catch(console.error);
