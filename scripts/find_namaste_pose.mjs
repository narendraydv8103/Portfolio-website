import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function run() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);

  const outDir = path.resolve("scratch_frames/namaste_tuning");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Test adjusting the pose
  const results = await page.evaluate(() => {
    const char = window.__character;
    const THREE = window.THREE;
    if (!char || !THREE) return null;

    const upperArmL = char.getObjectByName("upper_armL");
    const upperArmR = char.getObjectByName("upper_armR");
    const forearmL = char.getObjectByName("forearmL");
    const forearmR = char.getObjectByName("forearmR");
    const handL = char.getObjectByName("handL");
    const handR = char.getObjectByName("handR");

    // Return current euler angles
    return {
      armL_e: [upperArmL.rotation.x, upperArmL.rotation.y, upperArmL.rotation.z],
      armL_q: [upperArmL.quaternion.x, upperArmL.quaternion.y, upperArmL.quaternion.z, upperArmL.quaternion.w],
      forearmL_e: [forearmL.rotation.x, forearmL.rotation.y, forearmL.rotation.z],
      forearmL_q: [forearmL.quaternion.x, forearmL.quaternion.y, forearmL.quaternion.z, forearmL.quaternion.w],
      handL_e: [handL.rotation.x, handL.rotation.y, handL.rotation.z],
      handL_q: [handL.quaternion.x, handL.quaternion.y, handL.quaternion.z, handL.quaternion.w],
    };
  });

  console.log("Current pose info:", results);
  await browser.close();
}

run().catch(console.error);
