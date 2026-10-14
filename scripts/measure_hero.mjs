import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function measure() {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });
  const page = await browser.newPage({ viewport: { width: 1892, height: 925 } });
  await page.goto("http://localhost:5173/");
  await page.waitForSelector(".loading-screen", { state: "detached", timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);

  const metrics = await page.evaluate(() => {
    const char = window.__character;
    const camera = window.__camera;
    const THREE = window.THREE;
    if (!char || !camera || !THREE) return null;

    // Set camera to target starting values: Y=13.1, Z=12.7, char at Y=0
    char.position.y = 0;
    camera.position.set(0, 13.1, 12.7);
    camera.lookAt(0, 13.1, 0);
    camera.fov = 27.5;
    camera.updateProjectionMatrix();
    char.updateMatrixWorld(true);

    // Project world coordinates to normalized screen coordinates [0, 1]
    const project = (x, y, z) => {
      const v = new THREE.Vector3(x, y, z);
      v.project(camera);
      // v.x is [-1, 1] -> [0, 1] from left
      // v.y is [1, -1] -> [0, 1] from top
      const screenX = (v.x + 1) / 2;
      const screenY = (1 - v.y) / 2;
      return { screenX, screenY };
    };

    // Measured facts from user prompt:
    // Cap top = 14.9, Chin ≈ 11.9, Head cap-to-chin ≈ 3.0
    // Ears: Ear.001_L and Ear.001_R
    const earL = char.getObjectByName("Ear.001_L") || char.getObjectByName("Ear001_L") || char.getObjectByName("ear_L");
    const earR = char.getObjectByName("Ear.001_R") || char.getObjectByName("Ear001_R") || char.getObjectByName("ear_R");

    const capTopProj = project(0, 14.9, 0);
    const chinProj = project(0, 11.9, 0.4);

    let earWidthPct = null;
    if (earL && earR) {
      const pL = new THREE.Vector3();
      const pR = new THREE.Vector3();
      earL.getWorldPosition(pL);
      earR.getWorldPosition(pR);
      const sL = project(pL.x, pL.y, pL.z);
      const sR = project(pR.x, pR.y, pR.z);
      earWidthPct = Math.abs(sL.screenX - sR.screenX) * 100;
    }

    return {
      capTopPct: (capTopProj.screenY * 100).toFixed(2),
      chinPct: (chinProj.screenY * 100).toFixed(2),
      headHeightPct: ((chinProj.screenY - capTopProj.screenY) * 100).toFixed(2),
      earWidthPct: earWidthPct ? earWidthPct.toFixed(2) : null,
    };
  });

  console.log("Measured Hero Metrics on 1892x925 viewport:", metrics);
  const outDir = path.resolve("scratch_frames/verify");
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  await page.screenshot({ path: path.join(outDir, "measured_hero.png") });
  await browser.close();
}

measure().catch(console.error);
